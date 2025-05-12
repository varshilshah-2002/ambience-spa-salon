import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCategories } from '../api/services';

const ServicesPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    getCategories();

    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  const handleBookNowClick = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    navigate('/book');
  };

  return (
    <div className="pt-24 bg-beige-light min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative text-center mb-16">
          <h1 className="text-5xl font-serif text-custom-black relative z-10">
            All Services
          </h1>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-['Allura'] text-custom-black opacity-[0.03] whitespace-nowrap z-0">
            Ambience
          </div>
        </div>

        {categories.map((category) => (
          <section
            key={category.id}
            id={category.name.toLowerCase()}
            className="mb-20"
          >
            <div className="relative h-[300px] mb-12 overflow-hidden rounded-sm">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col md:flex-row md:items-center justify-between bg-gradient-to-t from-black/60 to-transparent">
                <h2 className="text-4xl font-serif text-beige-light mb-4 md:mb-0">
                  {category.name}
                </h2>
                <button
                  onClick={handleBookNowClick}
                  className="inline-flex items-center justify-center px-6 py-3 bg-beige text-custom-black hover:bg-beige-dark hover:text-beige-light transition-all duration-300 rounded-sm transform hover:scale-105 shadow-lg hover:shadow-xl w-full md:w-auto text-center"
                >
                  Book Now
                </button>
              </div>
            </div>

            <div className="bg-white rounded-sm shadow-md p-8">
              <div className="grid grid-cols-1 gap-6">
                {category.services.map((service, serviceIndex) => (
                  <div
                    key={serviceIndex}
                    className="flex justify-between items-start border-b border-beige-light/50 pb-4 last:border-0"
                  >
                    <div>
                      <h3 className="text-lg font-serif text-custom-black mb-1">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {service.description}
                      </p>
                    </div>
                    <p className="text-navy-DEFAULT font-semibold whitespace-nowrap ml-4">
                      {service.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;