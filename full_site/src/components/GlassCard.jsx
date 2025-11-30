import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hover = true }) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -4 } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`
        bg-white/20 
        backdrop-blur-xl 
        border border-white/40 
        rounded-3xl 
        shadow-[0_8px_32px_rgba(255,255,255,0.1),inset_0_0_0_1px_rgba(255,255,255,0.1)]
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}