import React from 'react';

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div 
      className={`animate-pulse bg-gradient-to-r from-primary-50 via-primary-100 to-primary-50 rounded-md ${className}`}
      style={{ 
        backgroundSize: '200% 100%',
        animation: 'pulse 1.5s ease-in-out infinite, shimmer 2s infinite linear'
      }}
    />
  );
};

export default Skeleton;
