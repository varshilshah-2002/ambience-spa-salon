import { collection, getDocs, doc, setDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const COLLECTION_NAME = 'serviceCategories';

const defaultCategories = [
  {
    name: "Haircuts",
    description: "Professional haircuts and styling services",
    image: "https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg",
    services: [
      {
        title: "Women's Haircut",
        description: "Precision cut and style",
        price: "$45+"
      },
      {
        title: "Men's Haircut",
        description: "Classic or modern styles",
        price: "$30+"
      }
    ]
  },
  {
    name: "Eyebrows",
    description: "Expert eyebrow shaping and enhancement",
    image: "https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg",
    services: [
      {
        title: "Eyebrow Threading",
        description: "Traditional threading technique",
        price: "$15"
      },
      {
        title: "Eyebrow Tinting",
        description: "Semi-permanent color enhancement",
        price: "$25"
      }
    ]
  },
  {
    name: "Facials",
    description: "Luxurious facial treatments",
    image: "https://images.pexels.com/photos/3985333/pexels-photo-3985333.jpeg",
    services: [
      {
        title: "Classic Facial",
        description: "Deep cleansing and rejuvenation",
        price: "$75"
      },
      {
        title: "Anti-Aging Facial",
        description: "Advanced treatment for mature skin",
        price: "$95"
      }
    ]
  }
];

export const fetchCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const categories = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return categories.length > 0 ? categories : defaultCategories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return defaultCategories;
  }
};

export const addCategory = async (category) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), category);
    return { id: docRef.id, ...category };
  } catch (error) {
    console.error('Error adding category:', error);
    return null;
  }
};

export const updateCategory = async (category) => {
  try {
    const { id, ...data } = category;
    const docRef = doc(db, COLLECTION_NAME, id);
    await setDoc(docRef, data);
    return true;
  } catch (error) {
    console.error('Error updating category:', error);
    return false;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, categoryId));
    return true;
  } catch (error) {
    console.error('Error deleting category:', error);
    return false;
  }
};

export const initializeDefaultCategories = async () => {
  try {
    const existingCategories = await fetchCategories();
    if (existingCategories.length === 0) {
      for (const category of defaultCategories) {
        await addCategory(category);
      }
    }
  } catch (error) {
    console.error('Error initializing categories:', error);
  }
};