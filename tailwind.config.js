/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },      colors: {
        primary: {
          50: '#E6F0F9',  // Azul muy claro
          100: '#CCE0F2', // Azul claro
          200: '#99C1E6', // Azul suave
          300: '#66A3D9', // Azul medio-claro
          400: '#3384CC', // Azul medio
          500: '#0065BF', // Azul intenso
          600: '#00377A', // Azul profundo (color principal)
          700: '#002D62', // Azul oscuro
          800: '#00234A', // Azul muy oscuro
          900: '#001932', // Azul casi negro
        },
        secondary: {
          50: '#FFFFFF',  // Blanco puro
          100: '#F9F9F9', // Casi blanco
          200: '#F0F0F0', // Gris muy claro
          300: '#E0E0E0', // Gris claro
          400: '#BDBDBD', // Gris medio
          500: '#9E9E9E', // Gris
          600: '#757575', // Gris oscuro
          700: '#616161', // Gris muy oscuro
          800: '#424242', // Casi negro
          900: '#212121', // Negro suave
        },
        accent: {
          50: '#FFF8E1',  // Beige muy claro
          100: '#FFECB3', // Beige claro
          200: '#FFE082', // Beige medio
          300: '#FFD54F', // Ocre claro
          400: '#FFCA28', // Ocre
          500: '#FFC107', // Amber
          600: '#FFB300', // Intense amber
          700: '#FFA000', // Dark amber
          800: '#FF8F00', // Light brown
          900: '#FF6F00', // Warm brown
        },        success: {
          50: '#EDFCF2', // Verde muy claro
          100: '#D1FADF', // Verde claro
          200: '#A3F0C0', // Verde suave
          300: '#76E5A1', // Verde medio
          400: '#48DA82', // Verde intenso
          500: '#22C55E', // Verde principal
          600: '#16A34A', // Verde oscuro
          700: '#15803D', // Verde muy oscuro
          800: '#166534', // Verde profundo
          900: '#14532D', // Verde casi negro
        },
        warning: {
          50: '#FFFBEB', // Amarillo muy claro
          100: '#FEF3C7', // Amarillo claro
          200: '#FDE68A', // Amarillo suave
          300: '#FCD34D', // Amarillo medio
          400: '#FBBF24', // Amarillo intenso
          500: '#F59E0B', // Naranja amarillento
          600: '#D97706', // Naranja
          700: '#B45309', // Naranja oscuro
          800: '#92400E', // Marrón naranja
          900: '#78350F', // Marrón oscuro
        },
        error: {
          50: '#FEF2F2', // Rojo muy claro
          100: '#FEE2E2', // Rojo claro
          200: '#FECACA', // Rojo suave
          300: '#FCA5A5', // Rojo medio
          400: '#F87171', // Rojo intenso
          500: '#EF4444', // Rojo principal
          600: '#DC2626', // Rojo oscuro
          700: '#B91C1C', // Rojo muy oscuro
          800: '#991B1B', // Rojo profundo
          900: '#7F1D1D', // Rojo casi negro
        },
        info: {
          50: '#EFF6FF', // Azul info muy claro
          100: '#DBEAFE', // Azul info claro
          200: '#BFDBFE', // Azul info suave
          300: '#93C5FD', // Azul info medio
          400: '#60A5FA', // Azul info intenso
          500: '#3B82F6', // Azul info principal
          600: '#2563EB', // Azul info oscuro
          700: '#1D4ED8', // Azul info muy oscuro
          800: '#1E40AF', // Azul info profundo
          900: '#1E3A8A', // Azul info casi negro
        },
        earth: {
          50: '#F9F6F2', // Beige muy claro
          100: '#F0EBE3', // Beige claro
          200: '#E7DFD3', // Beige suave
          300: '#D4C5B0', // Beige medio
          400: '#C2AB8D', // Beige oscuro
          500: '#B0916A', // Marrón claro
          600: '#9C7C4F', // Marrón medio
          700: '#7D623D', // Marrón oscuro
          800: '#5E492C', // Marrón muy oscuro
          900: '#40311D', // Marrón casi negro
        },
      },
      backgroundImage: {
        'hero-pattern': "url('/images/hero-bg.jpg')",
        'texture-light': "url('/images/texture-light.png')",
      },      boxShadow: {
        'soft': '0 2px 15px rgba(0, 55, 122, 0.06)',
        'medium': '0 4px 20px rgba(0, 55, 122, 0.1)',
        'button': '0 2px 5px rgba(0, 55, 122, 0.15)',
        'card': '0 10px 30px rgba(0, 55, 122, 0.07)',
        'input': '0 1px 3px rgba(0, 55, 122, 0.05)',
        'hover': '0 8px 30px rgba(0, 55, 122, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-soft': 'pulseSoft 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.85 },
        },
      },
    },
  },
  plugins: [],
};