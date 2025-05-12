import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon as MenuIcon, XMarkIcon as XIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { fetchCategories } from '../api/services';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (hash) => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
    
    if (location.pathname !== '/services') {
      window.location.href = `/services${hash}`;
    } else {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled || location.pathname !== '/' ? 'bg-beige-light/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <Link to="/" className="text-3xl font-serif font-bold">
              <span className={`${isScrolled || location.pathname !== '/' ? 'text-beige-dark' : 'text-beige-light'} transition-colors duration-300`}>
                AMBIENCE
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`font-medium tracking-wide transition-colors duration-300 ${
                isScrolled || location.pathname !== '/' ? 'text-custom-black hover:text-beige-dark' : 'text-beige-light hover:text-beige-DEFAULT'
              }`}>
                Home
              </Link>
              
              <div className="relative group">
                <button
                  className={`font-medium tracking-wide transition-colors duration-300 flex items-center ${
                    isScrolled || location.pathname !== '/' ? 'text-custom-black hover:text-beige-dark' : 'text-beige-light hover:text-beige-DEFAULT'
                  }`}
                >
                  Services
                  <ChevronDownIcon className="h-4 w-4 ml-1" />
                </button>

                <div
                  className="absolute left-0 mt-2 w-48 rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                >
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleNavigation(`#${category.name.toLowerCase()}`)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-beige-light transition-colors duration-200"
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => {
                  if (location.pathname === '/') {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/#contact';
                  }
                }}
                className={`font-medium tracking-wide transition-colors duration-300 ${
                  isScrolled || location.pathname !== '/' ? 'text-custom-black hover:text-beige-dark' : 'text-beige-light hover:text-beige-DEFAULT'
                }`}
              >
                Contact
              </button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (location.pathname === '/') {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/#contact';
                  }
                }}
                className="px-6 py-2 bg-beige text-custom-black hover:bg-beige-dark hover:text-beige-light transition-colors duration-300"
              >
                Book Now
              </motion.button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-md ${
                  isScrolled || location.pathname !== '/' ? 'text-custom-black' : 'text-beige-light'
                }`}
              >
                {isMobileMenuOpen ? (
                  <XIcon className="h-6 w-6" />
                ) : (
                  <MenuIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-24 bottom-0 w-64 bg-beige-light shadow-xl p-6"
            >
              <div className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className="text-custom-black hover:text-beige-dark py-2 text-lg font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleNavigation(`#${category.name.toLowerCase()}`)}
                    className="text-custom-black hover:text-beige-dark py-2 text-lg font-medium pl-4 text-left"
                  >
                    {category.name}
                  </button>
                ))}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (location.pathname === '/') {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.href = '/#contact';
                    }
                  }}
                  className="text-custom-black hover:text-beige-dark py-2 text-lg font-medium"
                >
                  Contact
                </button>

                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (location.pathname === '/') {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.href = '/#contact';
                    }
                  }}
                  className="mt-4 w-full py-3 bg-beige-DEFAULT text-custom-black hover:bg-beige-dark hover:text-beige-light transition-colors duration-300"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;