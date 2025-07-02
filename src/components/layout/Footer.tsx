import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Instagram, Facebook, Twitter, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-600 text-white py-6">
      <div className="container-custom">        <div className="flex flex-col md:flex-row gap-6 justify-between mb-4">
          {/* Brand and Social */}
          <div className="max-w-xs">
            <Link to="/" className="flex items-center mb-3">
            
              <Coffee className="h-6 w-6 text-white" strokeWidth={2.5} />
              <span className="ml-2 font-serif font-bold text-lg text-white">Qargo Coffee</span>
            </Link>
            <p className="text-white text-xs mb-3">
              Combining Italian coffee tradition with American lifestyle to offer products of the highest quality.
            </p>
            <div className="flex space-x-3">
              <a href="#" aria-label="Instagram" className="text-white hover:text-accent-200 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" aria-label="Facebook" className="text-white hover:text-accent-200 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="text-white hover:text-accent-200 transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-8">
            {/* Navigation */}
            <div>
              <h4 className="font-serif text-sm font-semibold mb-2 text-white">Navigate</h4>
              <ul className="space-y-1 text-sm">
                <li><Link to="/terms" className="text-white hover:text-accent-200 transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/privacy" className="text-white hover:text-accent-200 transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Access */}
            <div>
              <h4 className="font-serif text-sm font-semibold mb-2 text-white">Access</h4>
              <ul className="space-y-1 text-sm">
                <li><Link to="/admin" className="text-white hover:text-accent-200 transition-colors">Admin Dashboard</Link></li>
                <li><Link to="/supplier" className="text-white hover:text-accent-200 transition-colors">Supplier Portal</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-serif text-sm font-semibold mb-2 text-white">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Mail className="h-4 w-4 text-white mr-2 flex-shrink-0" />
                  <span className="text-white">info@qargocoffee.com</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-4 w-4 text-white mr-2 flex-shrink-0" />
                  <span className="text-white">+1 (305) 555-0123</span>
                </li>
              </ul>            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;