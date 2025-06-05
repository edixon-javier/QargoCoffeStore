import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Instagram, Facebook, Twitter, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-800 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <Coffee className="h-8 w-8 text-primary-100" strokeWidth={2.5} />
              <span className="ml-2 font-serif font-bold text-xl text-white">
                Qargo Coffee
              </span>
            </Link>
            <p className="text-primary-100 text-sm">
              Combinando la tradición cafetera italiana con el estilo de vida estadounidense para ofrecer productos de la más alta calidad.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="#" 
                aria-label="Instagram"
                className="text-primary-100 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                aria-label="Facebook"
                className="text-primary-100 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                aria-label="Twitter"
                className="text-primary-100 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-white">Navegar</h4>
            <ul className="space-y-2">
              <li><Link to="/catalogo" className="text-primary-100 hover:text-white transition-colors">Catálogo</Link></li>
              <li><Link to="/nosotros" className="text-primary-100 hover:text-white transition-colors">Nosotros</Link></li>
              <li><Link to="/contacto" className="text-primary-100 hover:text-white transition-colors">Contacto</Link></li>
              <li><Link to="/terminos" className="text-primary-100 hover:text-white transition-colors">Términos y Condiciones</Link></li>
              <li><Link to="/privacidad" className="text-primary-100 hover:text-white transition-colors">Política de Privacidad</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-white">Accesos</h4>
            <ul className="space-y-2">
              <li><Link to="/login" className="text-primary-100 hover:text-white transition-colors">Iniciar Sesión</Link></li>
              <li><Link to="/registro" className="text-primary-100 hover:text-white transition-colors">Registrarse</Link></li>
              <li><Link to="/admin" className="text-primary-100 hover:text-white transition-colors">Panel Administrativo</Link></li>
              <li><Link to="/proveedor" className="text-primary-100 hover:text-white transition-colors">Portal de Proveedores</Link></li>
              <li><Link to="/franquiciado" className="text-primary-100 hover:text-white transition-colors">Portal de Franquiciados</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-white">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-primary-200 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-primary-100">info@qargocoffee.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-primary-200 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-primary-100">+52 (55) 1234 5678</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-10 pt-6 text-primary-200 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Qargo Coffee. Todos los derechos reservados.</p>
          <p className="mt-2 md:mt-0">Diseñado con ♥ para amantes del café.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;