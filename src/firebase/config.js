import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSy...JLcfC0C9tZlnqI",
  authDomain: "ambience-salon.firebaseapp.com",
  databaseURL: "https://ambience-salon-default-rtdb.firebaseio.com",
  projectId: "ambience-salon",
  storageBucket: "ambience-salon.firebasestorage.app",
  messagingSenderId: "524588285472",
  appId: "1:5245882...6cf71d9deac0645",
  measurementId: "G-JHB99B5172"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);