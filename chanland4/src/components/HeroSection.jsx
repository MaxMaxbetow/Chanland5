import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1536566482680-fca31930a0bd?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-white/80" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      {/* Floating Orbs */}
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-white/30 rounded-full blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/25 backdrop-blur-2xl border border-white/50 rounded-[2.5rem] p-10 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.6)]"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 rounded-full text-sm text-slate-600 font-medium mb-6 border border-white/50"
          >
            <Sparkles className="w-4 h-4" />
            Сезон 4 уже здесь
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-800 mb-4 tracking-tight"
          >
            Chan<span className="text-slate-600">Land</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-xl md:text-2xl text-slate-600 font-light mb-10 max-w-md mx-auto"
          >
            Твой любимый приватный Minecraft сервер
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-full font-semibold text-slate-800 border border-white/70 shadow-lg transition-all duration-300"
            >
              Узнать больше
            </motion.a>
            <motion.a
              href="https://discord.gg/XQ6JaNbDuB"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-slate-800/80 hover:bg-slate-900/90 backdrop-blur-sm rounded-full font-semibold text-white border border-slate-700/50 shadow-lg transition-all duration-300"
            >
              Присоединиться
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-2 rounded-full bg-white/30 backdrop-blur-sm border border-white/40"
          >
            <ArrowDown className="w-5 h-5 text-slate-600" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}