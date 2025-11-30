import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const cities = [
  {
    id: 1,
    name: 'Ivan-City',
    logo: 'https://i.imgur.com/rqEIUG0.png',
    players: 6,
    isOpen: true
  },
  {
    id: 2,
    name: 'SkyTown',
    logo: 'https://i.imgur.com/rqEIUG0.png',
    players: 4,
    isOpen: false
  },
  {
    id: 3,
    name: 'NewWorld',
    logo: 'https://i.imgur.com/rqEIUG0.png',
    players: 8,
    isOpen: true
  }
];

function CityCard({ city }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.35)' }}
      transition={{ duration: 0.2 }}
      className="relative z-10 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-all shadow-lg hover:shadow-xl hover:border-white/50"
    >
      <img 
        src={city.logo} 
        alt={city.name}
        className="w-14 h-14 rounded-xl object-cover border border-white/40"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-lg font-bold text-white truncate">{city.name}</h3>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            city.isOpen 
              ? 'bg-green-500/30 text-green-300' 
              : 'bg-red-500/30 text-red-300'
          }`}>
            {city.isOpen ? 'Набор открыт' : 'Набор закрыт'}
          </span>
        </div>
        <div className="flex items-center gap-1 text-white/70 text-sm mt-1">
          <Users className="w-4 h-4" />
          <span>Игроков: {city.players}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function CitiesSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section 
      id="cities" 
      className="relative min-h-screen py-24"
      style={{
        backgroundImage: "url('https://www.complementary.dev/assets/img/newScreenshots/both5_endCity.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-purple-900/60 to-black/80" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - Description */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
          >
            <p className="text-white/90 text-lg leading-relaxed">
              Города - это центры экономики и социальной жизни. Вы сможете устанавливать свои законы, 
              привлекать новых жителей и заключать союзы и мирные договоры с соседними поселениями. 
              Развивайте торговлю, создавайте собственные магазины и аукционы, чтобы обеспечить 
              процветание своих граждан.
            </p>
          </motion.div>

          {/* Right Side - Search and Cities */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Search Bar */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <Input
                  placeholder="Найти город..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-6 bg-white/10 backdrop-blur-xl border-white/20 rounded-2xl text-white placeholder:text-white/50 focus:border-white/40 focus:ring-0"
                />
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl px-6 py-6 font-semibold flex items-center gap-2">
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Основать город</span>
              </Button>
            </div>

            {/* Cities List */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar overflow-visible">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <CityCard key={city.id} city={city} />
                ))
              ) : (
                <div className="text-center py-8 text-white/50">
                  Города не найдены
                </div>
              )}
            </div>

            {/* View All Link */}
            <a
              href="https://chanland.vercel.app/cities/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-4 text-white/70 hover:text-white transition-colors font-medium"
            >
              Посмотреть все города на карте →
            </a>
          </motion.div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </section>
  );
}