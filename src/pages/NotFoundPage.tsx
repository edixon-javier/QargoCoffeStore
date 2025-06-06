import React from 'react';
import { Coffee, Home } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-12 px-4 text-center">
      <Coffee className="h-20 w-20 text-primary-300 mb-6" strokeWidth={1.5} />
      
      <h1 className="text-5xl font-serif mb-4">404</h1>
      <h2 className="text-2xl font-medium mb-6">Página no encontrada</h2>
      
      <p className="text-secondary-600 max-w-md mb-8">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
        Puedes volver al catálogo para continuar explorando nuestros productos.
      </p>
      
      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          variant="primary"
          leftIcon={<Home size={18} />}
          onClick={() => window.location.href = '/'}
        >
          Ir al catálogo
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;