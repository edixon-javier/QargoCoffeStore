import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div className="flex items-center justify-center w-full h-full min-h-[100px]">
      <div 
        className={`${sizeClasses[size]} rounded-full border-primary-200 border-t-primary-600 animate-spin ${className}`}
      />
    </div>
  );
};

export default LoadingSpinner;