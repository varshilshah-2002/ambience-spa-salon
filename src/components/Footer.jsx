import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const Footer = () => {
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const mapUrl = 'https://www.google.com/maps/place/540+S+Mendenhall+Rd+%238,+Memphis,+TN+38117,+USA';
  const privacyPolicyUrl = 'https://www.freeprivacypolicy.com/live/f7ad288c-19c2-4f14-80fa-a92643b5ada7';

  return (
    <footer className="bg-custom-red text-beige-light relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div>
            <h3 className="text-3xl font-serif mb-6">AMBIENCE</h3>
            <p className="text-beige-light/80 mb-6">
              Where luxury meets exceptional service. Experience the pinnacle of
              beauty and wellness.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-beige-light/60 hover:text-beige-light transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-beige-light/60 hover:text-beige-light transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
  <h4 className="text-xl font-serif mb-6">Contact Info</h4>
  <address className="not-italic space-y-4">
    <div className="flex items-start">
      <MapPinIcon className="h-6 w-6 text-beige-DEFAULT mr-3 flex-shrink-0" />
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-beige-light/80 hover:text-beige-light transition-colors"
      >
        540 SOUTH MENDENHALL RD, #8<br />
        MEMPHIS, TN, 38117
      </a>
    </div>
    <div className="flex items-center">
      <PhoneIcon className="h-5 w-5 text-beige-DEFAULT mr-3" />
      <a
        href="tel:5551234567"
        className="text-beige-light/80 hover:text-beige-light transition-colors"
      >
        (555) 123-4567
      </a>
    </div>
    <div className="flex items-center space-x-3">
  <EnvelopeIcon className="h-5 w-5 text-beige-DEFAULT" />
  <a 
    href="mailto:ambience.salon.spa2025@gmail.com"
    className="truncate max-w-full hover:text-beige-DEFAULT transition-colors duration-300"
  >
    ambience.salon.spa2025@gmail.com
  </a>
</div>


  </address>
</div>


          {/* Opening Hours */}
          <div>
            <h4 className="text-xl font-serif mb-6">Opening Hours</h4>
            <ul className="space-y-4">
              <li className="flex items-center">
                <ClockIcon className="h-5 w-5 text-beige-DEFAULT mr-3" />
                <div className="text-beige-light/80">
                  <p>Mon - Fri: 9:00 AM - 8:00 PM</p>
                  <p>Saturday: 9:00 AM - 6:00 PM</p>
                  <p>Sunday: 10:00 AM - 5:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-serif mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-beige-light/80 hover:text-beige-light transition-colors"
                  onClick={handleLinkClick}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-beige-light/80 hover:text-beige-light transition-colors"
                  onClick={handleLinkClick}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/book"
                  className="text-beige-light/80 hover:text-beige-light transition-colors"
                  onClick={handleLinkClick}
                >
                  Book Appointment
                </Link>
              </li>
              <li>
                <a
                  href={privacyPolicyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-beige-light/80 hover:text-beige-light transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-beige-DEFAULT/20 mt-12 pt-8 text-center">
          <p className="text-beige-light/60">
            &copy; {new Date().getFullYear()} Ambience Salon and Spa. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;