"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TooltipProps = {
  children: React.ReactNode;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
};

export function Tooltip({
  children,
  content,
  position = "top",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowStyles = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-gray-900 dark:border-t-gray-800 border-l-transparent border-r-transparent border-b-transparent",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 dark:border-b-gray-800 border-l-transparent border-r-transparent border-t-transparent",
    left: "left-full top-1/2 -translate-y-1/2 border-l-gray-900 dark:border-l-gray-800 border-t-transparent border-b-transparent border-r-transparent",
    right: "right-full top-1/2 -translate-y-1/2 border-r-gray-900 dark:border-r-gray-800 border-t-transparent border-b-transparent border-l-transparent",
  };

  return (
    <div
      className="relative inline-flex items-center cursor-help"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: position === 'top' ? 5 : position === 'bottom' ? -5 : 0, x: position === 'left' ? 5 : position === 'right' ? -5 : 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-gray-800 rounded-md shadow-lg backdrop-blur-sm border border-gray-700/30 dark:border-gray-600/30 whitespace-nowrap break-words max-w-xs overflow-visible ${positionStyles[position]}`}
            >
              {content}
              <span
                className={`absolute w-0 h-0 border-4 ${arrowStyles[position]}`}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
