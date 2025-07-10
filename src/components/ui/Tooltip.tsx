import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  side?: 'right' | 'top' | 'bottom' | 'left';
}

const Tooltip: React.FC<TooltipProps> = ({ 
  children, 
  content,
  side = 'right'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      let x = 0;
      let y = 0;

      switch (side) {
        case 'right':
          x = rect.right + 8 + scrollX;
          y = rect.top + (rect.height / 2) + scrollY;
          break;
        case 'left':
          x = rect.left - 8 + scrollX;
          y = rect.top + (rect.height / 2) + scrollY;
          break;
        case 'top':
          x = rect.left + (rect.width / 2) + scrollX;
          y = rect.top - 8 + scrollY;
          break;
        case 'bottom':
          x = rect.left + (rect.width / 2) + scrollX;
          y = rect.bottom + 8 + scrollY;
          break;
      }

      setPosition({ x, y });
    }
  }, [isVisible, side]);

  const tooltipContent = isVisible && createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.1 }}
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          transform: `translate(${side === 'left' ? '-100%' : side === 'right' ? '0' : '-50%'}, ${side === 'top' ? '-100%' : side === 'bottom' ? '0' : '-50%'})`,
          zIndex: 9999,
        }}
      >
        <div className="bg-gray-800 text-white text-sm px-2 py-1 rounded shadow-lg whitespace-nowrap">
          {content}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );

  return (
    <div 
      ref={triggerRef}
      className="inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {tooltipContent}
    </div>
  );
};

export default Tooltip;
