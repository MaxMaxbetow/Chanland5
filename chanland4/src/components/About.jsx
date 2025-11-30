import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Users, Zap, Heart } from 'lucide-react';
import GlassCard from './GlassCard';

const features = [
  {
    icon: Gamepad2,
    title: 'Уникальный геймплей',
    description: 'Приватный сервер с сезонной системой и уникальными механиками, которые вы не найдете нигде.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80'
  },
  {
    icon: Users,
    title: 'Активное сообщество',
    description: 'Новые ивенты, декор и вечеринки. Место, где игроки создают историю вместе.',
    image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=600&q=80'
  },
  {
    icon: Zap,
    title: 'Без лагов',
    description: 'Оптимизированный сервер с минимальными задержками для комфортной игры.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80'
  },
  {
    icon: Heart,
    title: 'Дружелюбная атмосфера',
    description: 'Мы ценим каждого игрока и создаём уютное пространство для всех.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80'
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/80 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-white/40 backdrop-blur-sm rounded-full text-sm text-slate-600 font-medium mb-4 border border-white/50">
            Почему мы?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            О сервере
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            ChanLand — это не просто сервер, это сообщество единомышленников
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="p-6 h-full">
                <div className="relative h-48 rounded-2xl overflow-hidden mb-6 group">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 p-3 bg-white/30 backdrop-blur-md rounded-xl border border-white/40">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}