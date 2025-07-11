import React from 'react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

type ButtonBaseProps = {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  as?: React.ElementType;
  to?: string;
}

type ButtonAsButtonProps = ButtonBaseProps & 
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button';
  };

type ButtonAsLinkProps = ButtonBaseProps & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: typeof Link;
    to: string;
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    disabled,
    as: Component = 'button',
    ...props
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-400 disabled:opacity-50 disabled:pointer-events-none shadow-button';

    const variants = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700',
      secondary: 'bg-white text-primary-600 hover:bg-secondary-100 border border-primary-200',
      accent: 'bg-accent-500 text-white hover:bg-accent-600',
      outline: 'border border-primary-300 bg-transparent hover:bg-primary-50 text-primary-600',
      ghost: 'bg-transparent hover:bg-primary-50 text-primary-600',
    };

    const sizes = {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-5 py-2.5',
    };

    const widthClass = fullWidth ? 'w-full' : '';

  const classes = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      widthClass,
      className
    );

    // Si es un enlace (Link de react-router-dom)
    if (Component === Link) {
      const { to, ...restProps } = props as ButtonAsLinkProps;
      return (
        <Component
          to={to}
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...restProps}
        >
          {isLoading ? (
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : leftIcon ? (
            <span className="mr-2">{leftIcon}</span>
          ) : null}
          
          {children}
          
          {rightIcon && !isLoading && <span className="ml-2">{rightIcon}</span>}
        </Component>
      );
    }

    // Si es un botón normal
    return (
      <Component
        className={classes}
        disabled={disabled || isLoading}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : leftIcon ? (
          <span className="mr-2">{leftIcon}</span>
        ) : null}
        
        {children}
        
        {rightIcon && !isLoading && <span className="ml-2">{rightIcon}</span>}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export default Button;