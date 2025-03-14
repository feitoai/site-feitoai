"use client";

import { useState, useEffect } from "react";

// Format numbers consistently
const formatNumber = (num: number) => {
  return new Intl.NumberFormat('pt-BR').format(num);
};

// AnimatedCounter component 
export const AnimatedCounter = ({ value, prefix = "", suffix = "", className }: { 
  value: number; 
  prefix?: string; 
  suffix?: string; 
  className?: string; 
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    // Simple animation approach
    let startValue = displayValue; // Start from current value for smoother transitions
    const duration = 1500;
    const startTime = Date.now();
    let animationFrame: number;
    
    const updateValue = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smoother animation - using exponential ease-out
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentValue = Math.round(startValue + (value - startValue) * easedProgress);
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateValue);
      }
    };
    
    animationFrame = requestAnimationFrame(updateValue);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, displayValue]);
  
  return (
    <div className={`${className} animated-gradient-text font-bold`}>
      {prefix}{formatNumber(displayValue)}{suffix}
    </div>
  );
};
