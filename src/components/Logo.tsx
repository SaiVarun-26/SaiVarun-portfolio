import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioConfig } from '@/config/portfolio';

const Logo = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed top-8 left-8 z-50">
      <motion.button
        onClick={handleClick}
        className="flex items-center justify-start font-bold text-2xl text-foreground hover:text-hero-accent transition-colors duration-300 focus:outline-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.span
              key="short"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden whitespace-nowrap"
            >
              {portfolioConfig.personal.shortName}
            </motion.span>
          ) : (
            <motion.span
              key="full"
              initial={{ opacity: 0, width: 0 }}
              animate={{ 
                opacity: 1, 
                width: "auto",
                transition: { duration: 0.4, ease: "easeInOut" }
              }}
              exit={{ 
                opacity: 0, 
                width: 0,
                transition: { duration: 0.3, ease: "easeInOut" }
              }}
              className="overflow-hidden whitespace-nowrap"
            >
              {portfolioConfig.personal.name}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default Logo;