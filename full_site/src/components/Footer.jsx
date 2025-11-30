import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-16">
      {/* Glass Background */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-xl border-t border-white/50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Logo */}
          <div className="inline-flex items-center gap-3 mb-6">
            <img 
              src="https://easydonate.s3.easyx.ru/images/sides/84/bc/84bcc9aab09ae4d54ddc34c092a960407160139d8c0628ce914ce0f43e4d7bff.png" 
              alt="ChanLand" 
              className="w-12 h-12 rounded-2xl object-cover"
            />
            <span className="text-2xl font-bold text-slate-800">ChanLand</span>
          </div>

          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            Приватный Minecraft сервер с активным сообществом и уникальными механиками
          </p>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <a 
              href="https://discord.gg/XQ6JaNbDuB" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              Discord
              <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://docs.google.com/document/d/1sEyfJkmkkf5YVV5XCS5Y7kxNYjW-pmFpTOZCBmgY11I/edit?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              Документация
              <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://chanland.vercel.app/cities/index.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              Карта городов
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Server Address */}
          <div className="inline-block px-6 py-3 bg-white/50 backdrop-blur-sm rounded-full border border-white/60 mb-8">
            <code className="text-slate-700 font-mono text-sm">chanland.play-network.io</code>
          </div>

          {/* Copyright */}
          <div className="flex items-center justify-center gap-1 text-sm text-slate-500">
            <span>© 2025 ChanLand. Сделано с</span>
            <Heart className="w-4 h-4 text-red-400 fill-red-400" />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}