import React, { useState, useEffect, useCallback } from 'react';
import { Edit, Save, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchCategories, updateCategory, addCategory, deleteCategory } from '../api/services';
import debounce from 'lodash.debounce';

const AdminPanel = () => {
  const [categories, setCategories] = useState([]);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [password, setPassword] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingData, setEditingData] = useState({});

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsPasswordCorrect(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category.id);
    setEditingData(category);
  };

  const debouncedUpdateCategory = useCallback(
    debounce(async (category) => {
      await updateCategory(category);
    }, 500),
    []
  );

  const handleUpdateField = (field, value) => {
    const updatedData = { ...editingData, [field]: value };
    setEditingData(updatedData);
    debouncedUpdateCategory(updatedData);
  };

  const handleSaveCategory = async () => {
    const success = await updateCategory(editingData);
    if (success) {
      setEditingCategory(null);
      const updatedCategories = await fetchCategories();
      setCategories(updatedCategories);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      const success = await deleteCategory(categoryId);
      if (success) {
        const updatedCategories = await fetchCategories();
        setCategories(updatedCategories);
      }
    }
  };

  const handleAddCategory = async () => {
    const newCategory = {
      name: 'New Category',
      description: 'Category description',
      image: 'https://example.com/placeholder.jpg',
      services: []
    };

    const result = await addCategory(newCategory);
    if (result) {
      const updatedCategories = await fetchCategories();
      setCategories(updatedCategories);
    }
  };

  const handleAddService = async (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    const newService = {
      title: 'New Service',
      description: 'Service description',
      price: '$0'
    };

    const updatedCategory = {
      ...category,
      services: [...category.services, newService]
    };

    await updateCategory(updatedCategory);
    const updatedCategories = await fetchCategories();
    setCategories(updatedCategories);
  };

  const handleUpdateService = async (categoryId, serviceIndex, field, value) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    const updatedServices = [...category.services];
    updatedServices[serviceIndex] = {
      ...updatedServices[serviceIndex],
      [field]: value
    };

    const updatedCategory = {
      ...category,
      services: updatedServices
    };

    debouncedUpdateCategory(updatedCategory);
    
    // Update local state immediately for smooth UI
    setCategories(categories.map(c => 
      c.id === categoryId ? updatedCategory : c
    ));
  };

  const handleDeleteService = async (categoryId, serviceIndex) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    const updatedServices = category.services.filter((_, index) => index !== serviceIndex);
    const updatedCategory = {
      ...category,
      services: updatedServices
    };

    await updateCategory(updatedCategory);
    const updatedCategories = await fetchCategories();
    setCategories(updatedCategories);
  };

  if (!isPasswordCorrect) {
    return (
      <div className="min-h-screen bg-beige-light flex items-center justify-center">
        <div className="bg-white p-8 rounded-sm shadow-xl max-w-md w-full">
          <h2 className="text-2xl font-serif mb-4 text-center">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full p-2 border border-beige-DEFAULT mb-4 rounded-sm"
            />
            <button 
              type="submit"
              className="w-full bg-beige-DEFAULT text-custom-black py-2 hover:bg-beige-dark transition-colors rounded-sm"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige-light p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-serif">Manage Services</h2>
          <div className="flex gap-4">
            <button
              onClick={handleAddCategory}
              className="px-4 py-2 bg-beige-DEFAULT text-custom-black hover:bg-beige-dark transition-colors rounded-sm flex items-center gap-2"
            >
              <Plus size={20} />
              Add Category
            </button>
            <Link 
              to="/"
              className="px-4 py-2 bg-beige-DEFAULT text-custom-black hover:bg-beige-dark transition-colors rounded-sm"
            >
              Go to Website
            </Link>
            <button 
              onClick={() => setIsPasswordCorrect(false)}
              className="text-red-400 hover:text-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-sm shadow-lg p-6">
              {editingCategory === category.id ? (
                <div className="space-y-4 mb-6">
                  <input
                    value={editingData.name || ''}
                    onChange={(e) => handleUpdateField('name', e.target.value)}
                    className="w-full p-2 border rounded-sm"
                    placeholder="Category Name"
                  />
                  <input
                    value={editingData.description || ''}
                    onChange={(e) => handleUpdateField('description', e.target.value)}
                    className="w-full p-2 border rounded-sm"
                    placeholder="Category Description"
                  />
                  <input
                    value={editingData.image || ''}
                    onChange={(e) => handleUpdateField('image', e.target.value)}
                    className="w-full p-2 border rounded-sm"
                    placeholder="Image URL"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveCategory}
                      className="bg-beige-DEFAULT text-custom-black px-4 py-2 rounded-sm hover:bg-beige-dark"
                    >
                      <Save size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-serif mb-2">{category.name}</h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="text-beige-dark hover:text-beige-DEFAULT"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {category.services.map((service, index) => (
                  <div key={index} className="border-t pt-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-grow">
                        <input
                          value={service.title}
                          onChange={(e) => handleUpdateService(category.id, index, 'title', e.target.value)}
                          className="w-full p-2 border rounded-sm mb-2"
                        />
                        <input
                          value={service.description}
                          onChange={(e) => handleUpdateService(category.id, index, 'description', e.target.value)}
                          className="w-full p-2 border rounded-sm mb-2"
                        />
                        <input
                          value={service.price}
                          onChange={(e) => handleUpdateService(category.id, index, 'price', e.target.value)}
                          className="w-full p-2 border rounded-sm"
                        />
                      </div>
                      <button
                        onClick={() => handleDeleteService(category.id, index)}
                        className="text-red-400 hover:text-red-600 ml-4"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => handleAddService(category.id)}
                  className="mt-4 flex items-center gap-2 text-beige-dark hover:text-beige-DEFAULT"
                >
                  <Plus size={20} />
                  Add Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;