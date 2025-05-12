import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PhoneIcon, EnvelopeIcon as MailIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/outline';
import { fetchCategories } from '../api/services';
import emailjs from '@emailjs/browser';
import { Toaster, toast } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });

  const [categories, setCategories] = useState([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();

    emailjs.init("vUM1kTvr9a3d3fYbi");
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await emailjs.send(
        "service_5068iu8",
        "template_j4no50m",
        {
          to_name: "Sachi and Sandy",
          from_name: formData.name,
          from_email: formData.email,
          from_phone: formData.phone,
          service_requested: formData.service,
          appointment_date: formData.date,
          appointment_time: formData.time,
          message: formData.message
        }
      );

      toast.success(
        'Thank you! Your booking request has been sent. Please note that your selected appointment time is tentative and subject to availability. We will contact you shortly via phone or email to confirm or reschedule if needed.',
        {
          duration: 6000,
        }
      );
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-beige-light to-white relative overflow-hidden">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-custom-black mb-6">Book Your Luxury Experience</h2>
          <p className="text-beige-dark max-w-2xl mx-auto">
            Transform your look with our expert services. Complete the form below and our team will contact you to confirm your appointment.
          </p>
          <p className="text-beige-dark/80 max-w-2xl mx-auto mt-2 text-sm italic">
            * Please note: All appointment times are tentative and subject to availability. We will contact you to confirm or reschedule if needed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-sm shadow-xl p-8 md:p-12 relative z-10"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-beige-DEFAULT" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Full Name"
                    className="pl-10 w-full px-4 py-3 bg-beige-light/20 border border-beige-DEFAULT/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-beige-DEFAULT focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MailIcon className="h-5 w-5 text-beige-DEFAULT" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email Address"
                    className="pl-10 w-full px-4 py-3 bg-beige-light/20 border border-beige-DEFAULT/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-beige-DEFAULT focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PhoneIcon className="h-5 w-5 text-beige-DEFAULT" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Phone Number"
                    className="pl-10 w-full px-4 py-3 bg-beige-light/20 border border-beige-DEFAULT/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-beige-DEFAULT focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-beige-light/20 border border-beige-DEFAULT/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-beige-DEFAULT focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select Service</option>
                  {categories.map((category) => (
                    <optgroup key={category.id} label={category.name}>
                      {category.services.map((service, index) => (
                        <option key={`${category.id}-${index}`} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CalendarIcon className="h-5 w-5 text-beige-DEFAULT" />
                    </div>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="pl-10 w-full px-4 py-3 bg-beige-light/20 border border-beige-DEFAULT/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-beige-DEFAULT focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-beige-light/20 border border-beige-DEFAULT/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-beige-DEFAULT focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select Time</option>
                    {Array.from({ length: 11 }, (_, i) => i + 9).map((hour) => (
                      <React.Fragment key={hour}>
                        <option value={`${hour}:00`}>{`${hour}:00 ${hour < 12 ? 'AM' : 'PM'}`}</option>
                        <option value={`${hour}:30`}>{`${hour}:30 ${hour < 12 ? 'AM' : 'PM'}`}</option>
                      </React.Fragment>
                    ))}
                  </select>
                </div>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Special Requests or Notes"
                  rows={4}
                  className="w-full px-4 py-3 bg-beige-light/20 border border-beige-DEFAULT/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-beige-DEFAULT focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-beige text-custom-black hover:bg-beige-dark hover:text-beige-light transition-colors duration-300 text-lg font-medium py-4 rounded-sm"
            >
              Book Your Appointment
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;