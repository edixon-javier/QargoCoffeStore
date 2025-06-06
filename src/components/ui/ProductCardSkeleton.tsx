import React from 'react';
import Skeleton from './Skeleton';
import { motion } from 'framer-motion';

interface ProductCardSkeletonProps {
  layout?: 'grid' | 'list';
}

const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({ layout = 'grid' }) => {
  if (layout === 'list') {
    return (
      <motion.div 
        className="product-card flex flex-row mb-4 overflow-hidden h-[150px] bg-white shadow-soft"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <Skeleton className="w-1/4 h-full" />
        <div className="w-3/4 p-4 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div className="w-full">
              <Skeleton className="w-1/4 h-4 mb-1" />
              <Skeleton className="w-2/3 h-6 mb-2" />
            </div>
          </div>
          
          <div className="space-y-2 flex-grow">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-3/4 h-4" />
          </div>
          
          <div className="flex justify-between items-center mt-auto">
            <Skeleton className="w-1/4 h-6" />
            <Skeleton className="w-24 h-8 rounded-md" />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="product-card h-full bg-white shadow-soft"
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
    >
      <div className="relative overflow-hidden pb-[100%]">
        <Skeleton className="absolute inset-0" />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Skeleton className="w-1/3 h-4" />
        </div>
        
        <Skeleton className="w-full h-6 mb-2" />
        
        <div className="flex justify-between items-center mt-6">
          <Skeleton className="w-1/3 h-6" />
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCardSkeleton;
