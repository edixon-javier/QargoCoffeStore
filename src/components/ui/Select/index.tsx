import React, { SelectHTMLAttributes, forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import './select.css';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[];
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  error?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  helperText?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      label,
      size = 'md',
      variant = 'default',
      error,
      fullWidth = false,
      className = '',
      icon,
      helperText,
      disabled,
      ...props
    },
    ref
  ) => {
    // Combinación de clases basadas en las props
    const sizeClasses = {
      sm: 'text-xs py-1 px-2',
      md: 'text-sm py-2 px-3',
      lg: 'text-base py-2.5 px-4',
    };

    const variantClasses = {
      default: 'bg-white border-primary-200 hover:border-primary-300',
      outline: 'bg-transparent border-secondary-200 hover:border-secondary-300',
      ghost: 'bg-transparent border-transparent hover:bg-secondary-50',
    };

    const selectClasses = `
      select-component
      block rounded border 
      focus:outline-none focus:ring-1 focus:ring-primary-400
      appearance-none
      transition-colors
      pr-9 
      ${sizeClasses[size]} 
      ${variantClasses[variant]}
      ${disabled ? 'opacity-60 cursor-not-allowed bg-gray-100' : 'cursor-pointer'}
      ${fullWidth ? 'w-full' : ''}
      ${error ? 'border-error-500 focus:ring-error-500' : ''}
      ${className}
    `;

    return (
      <div className={`select-container ${fullWidth ? 'w-full' : 'inline-block'}`}>
        {label && (
          <label className="block text-sm font-medium text-secondary-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && <span className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</span>}
          <select
            ref={ref}
            className={`${selectClasses} ${icon ? 'pl-9' : ''}`}
            disabled={disabled}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown 
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none ${disabled ? 'text-gray-400' : 'text-gray-600'}`}
            size={16}
          />
        </div>
        {helperText && !error && (
          <p className="mt-1 text-xs text-secondary-500">{helperText}</p>
        )}
        {error && (
          <p className="mt-1 text-xs text-error-500">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
