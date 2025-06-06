import React from 'react';
import { Coffee, Home } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-12 px-4 text-center">
      <Coffee className="h-20 w-20 text-primary-300 mb-6" strokeWidth={1.5} />
      
      <h1 className="text-5xl font-serif mb-4">404</h1>
      <h2 className="text-2xl font-medium mb-6">Page Not Found</h2>
      
      <p className="text-secondary-600 max-w-md mb-8">
        Sorry, the page you are looking for doesn't exist or has been moved.
        You can return to the catalog to continue exploring our products.
      </p>
      
      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          variant="primary"
          leftIcon={<Home size={18} />}
          onClick={() => window.location.href = '/'}
        >
          Go to Catalog
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;