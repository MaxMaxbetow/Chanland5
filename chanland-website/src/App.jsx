import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ExternalLink, Sparkles, ArrowDown, Gamepad2, Users, Zap, Heart, Search, Plus } from 'lucide-react';

// Theme Switcher Component
function ThemeSwitcher({ currentTheme, setTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { id: 'sheep', label: 'Sheep (Светлая)', color: 'bg-white border border-gray-300' },
    { id: 'wither', label: 'Wither (Тёмная)', color: 'bg-slate-800' },
    { id: 'bedrock', label: 'Bedrock (Чёрная)', color: 'bg-black' },
  ];

  const toggleOpen = () => setIsOpen(!isOpen);

  // Закрытие при клике вне меню
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.theme-switcher-container')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative theme-switcher-container shrink-0">
      <button
        onClick={toggleOpen}
        className="p-2 sm:p-3 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-sm border border-white/40 transition-all duration-300 flex items-center gap-1 text-slate-700 dark:text-white dark:bg-black/30 dark:border-white/20 dark:hover:bg-black/50"
      >
        <Palette className="w-5 h-5" />
        <span className="hidden sm:inline font-semibold">Темы</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-48 bg-white/80 dark:bg-black/80 backdrop-blur-2xl rounded-2xl border border-white/50 dark:border-white/10 shadow-xl p-2 origin-top-right animate-in fade-in zoom-in-95">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-3 py-1 mb-1">
            Выберите тему
          </p>
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
                setTheme(theme.id);
                setIsOpen(false);
              }}
              className="w-full text-left flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-200 font-medium rounded-xl hover:bg-white/50 dark:hover:bg-white/10 transition-colors"
            >
              {theme.label}
              <div className="ml-auto relative">
                {/* Круг темы */}
                <div className={`w-4 h-4 rounded-full ${theme.color}`}></div>
                {/* Зеленое выделение, если тема выбрана */}
                {currentTheme === theme.id && (
                  <div className="absolute inset-0 rounded-full ring-2 ring-offset-1 ring-green-500 ring-offset-transparent"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
// Main App Component
export default function App() {
  // 1. Состояние для текущей темы, по умолчанию 'sheep' (светлая)
  const [theme, setTheme] = useState(() => {
    // Получаем тему из localStorage или устанавливаем по умолчанию
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'sheep';
    }
    return 'sheep';
  });

  // 2. Эффект для применения класса темы к элементу body
  useEffect(() => {
    document.body.className = ''; // Сначала сбросим все классы тем
    if (theme !== 'sheep') {
      document.body.classList.add(`theme-${theme}`);
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // 3. Добавляем новый CSS для тем в конце файла App.js (см. ниже)

  return (
    // Применяем класс темы к главному контейнеру,
    // чтобы стили работали и до полной загрузки body
    <div className={`min-h-screen overflow-x-hidden ${theme === 'sheep' ? 'bg-gradient-to-br from-slate-100 via-white to-slate-50' : 'bg-black'}`} >
      {/* ... (фиксированные фоны) ... */}
      
      <div className="fixed inset-0 pointer-events-none">
         {/* Фоны Hero, адаптирующиеся под светлую/темную тему */}
        <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl ${theme === 'sheep' ? 'bg-gradient-to-br from-blue-100/30 to-purple-100/20' : 'bg-blue-900/10'}`} />
        <div className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl ${theme === 'sheep' ? 'bg-gradient-to-br from-amber-100/20 to-rose-100/20' : 'bg-rose-900/10'}`} />
      </div>

      <Header theme={theme} setTheme={setTheme} />
      
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <CitiesSection />
      </main>
      
      <Footer />

      <style>{`
        // ... (Ваши общие стили: Inter font, scroll-behavior) ...

        // ===================================
        // СТИЛИ ТЕМ (ДОБАВЛЕНЫ)
        // ===================================

        /* Тема SHEEP (Default/White) - уже в Tailwind */

        /* Тема WITHER (Dark) */
        .theme-wither {
          --color-bg-primary: #1e293b;
          --color-text-primary: #f8fafc;
          --color-text-secondary: #cbd5e1;
          --color-card-bg: #334155;
          --color-border: rgba(255, 255, 255, 0.15);
          --color-accent-bg: rgba(255, 255, 255, 0.1);
        }

        /* Тема BEDROCK (OLED Black) */
        .theme-bedrock {
          --color-bg-primary: #000000;
          --color-text-primary: #f0f0f0;
          --color-text-secondary: #a0a0a0;
          --color-card-bg: #111111;
          --color-border: rgba(255, 255, 255, 0.1);
          --color-accent-bg: rgba(255, 255, 255, 0.05);
        }

        .theme-wither main, .theme-bedrock main {
          background-color: var(--color-bg-primary);
        }

        /* Адаптация секций */
        .theme-wither #about, .theme-bedrock #about {
          background-color: var(--color-bg-primary);
        }
        .theme-wither #about h2, .theme-bedrock #about h2 {
          color: var(--color-text-primary);
        }
        .theme-wither #about p, .theme-bedrock #about p {
          color: var(--color-text-secondary);
        }
        .theme-wither .feature-card, .theme-bedrock .feature-card {
          background-color: var(--color-card-bg);
          border-color: var(--color-border);
        }
        .theme-wither .feature-card h3, .theme-bedrock .feature-card h3 {
          color: var(--color-text-primary);
        }
        .theme-wither .feature-card p, .theme-bedrock .feature-card p {
          color: var(--color-text-secondary);
        }
        .theme-wither footer, .theme-bedrock footer {
          background: var(--color-card-bg);
          border-top: 1px solid var(--color-border);
        }

        /* Адаптация Hero */
        .theme-wither .hero-card, .theme-bedrock .hero-card {
           background: rgba(0, 0, 0, 0.4);
           backdrop-filter: blur(12px);
           border: 1px solid rgba(255, 255, 255, 0.1);
           box-shadow: none;
        }
        .theme-wither .hero-card h1, .theme-bedrock .hero-card h1 {
          color: var(--color-text-primary);
        }
        .theme-wither .hero-card p, .theme-bedrock .hero-card p {
          color: var(--color-text-secondary);
        }
        .theme-wither .hero-card .hero-button, .theme-bedrock .hero-card .hero-button {
          background-color: var(--color-card-bg);
          color: var(--color-text-primary);
          border-color: var(--color-border);
        }

        /* Адаптация Header */
        .theme-wither header.scrolled, .theme-bedrock header.scrolled {
           background-color: rgba(0, 0, 0, 0.4);
           border-color: var(--color-border);
           box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }
        .theme-wither header:not(.scrolled), .theme-bedrock header:not(.scrolled) {
           background-color: rgba(0, 0, 0, 0.2);
           border-color: var(--color-border);
        }
        .theme-wither header span, .theme-bedrock header span {
          color: var(--color-text-primary);
        }
        .theme-wither header a, .theme-bedrock header a {
          color: var(--color-text-secondary);
        }
        .theme-wither header a:hover, .theme-bedrock header a:hover {
          color: var(--color-text-primary);
          background-color: var(--color-accent-bg);
        }
      `}</style>
    </div>
  );
}
// Header Component (Исправленный)
function Header({ theme, setTheme }) { // Принимаем props темы
  const [menuOpen, setMenuOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Правила', href: '#hero' },
    { label: 'О сервере', href: '#about' },
    { label: 'Территории', href: '#cities' },
  ];

  return (
    <div className="fixed z-50 w-full flex justify-center top-0"> 
      <header 
        // Добавляем класс 'scrolled' для адаптации стилей в темной теме
        className={`transition-header-smooth ${isScrolled ? 'scrolled w-[calc(100%-2rem)] max-w-5xl rounded-full bg-white/60 backdrop-blur-2xl border border-white/70 shadow-[0_8px_32px_rgba(0,0,0,0.12)] mt-4' : 'w-full bg-white/20 backdrop-blur-xl border-b border-white/30 rounded-none'}`}
      >
        <div className="mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          
          {/* ... (Логотип ChanLand) ... */}

          <nav className="hidden lg:flex items-center gap-1">
            {/* ... (Ссылки навигации) ... */}
             <a
              href="https://docs.google.com/document/d/1sEyfJkmkkf5YVV5XCS5Y7kxNYjW-pmFpTOZCBmgY11I/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium transition-all duration-300 rounded-full hover:bg-white/40 flex items-center gap-1"
            >
              Доп. инфо
              <ExternalLink className="w-3 h-3" />
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* НОВАЯ КНОПКА ТЕМЫ */}
            <ThemeSwitcher currentTheme={theme} setTheme={setTheme} />

            {/* КНОПКА DISCORD */}
            <a
              href="https://discord.gg/9WsxwGyVkE"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-5 py-2 sm:py-2.5 bg-white/50 hover:bg-white/70 backdrop-blur-sm rounded-full font-semibold text-slate-700 border border-white/60 shadow-lg transition-all duration-300 flex items-center gap-2 dark:bg-black/30 dark:hover:bg-black/50 dark:text-white dark:border-white/20"
            >
              {/* ... (SVG Discord) ... */}
              <svg className="w-5 h-5 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <span className="hidden sm:inline">Discord</span>
            </a>

            {/* ... (Кнопка бургер-меню) ... */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-sm border border-white/40 transition-all duration-300 dark:bg-black/30 dark:hover:bg-black/50"
            >
              {menuOpen ? <X className="w-5 h-5 text-slate-700 dark:text-white" /> : <Menu className="w-5 h-5 text-slate-700 dark:text-white" />}
            </button>
          </div>
        </div>

        {/* ... (Мобильное меню) ... */}
      </header>
    </div>
  );
}

// Hero Section Component
function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://i.ytimg.com/vi/aVNTGDMU8Wc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLChiqqQRUuqISvvoZ-k2Efnzo-NjA')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-white/80" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-white/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 text-center px-4">
        <div className="bg-white/25 backdrop-blur-2xl border border-white/50 rounded-[2.5rem] p-10 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.6)]">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 rounded-full text-sm text-slate-600 font-medium mb-6 border border-white/50">
            <Sparkles className="w-4 h-4" />
            Сезон 4 уже здесь
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-800 mb-4 tracking-tight">
            Chan<span className="text-sky-200">Land</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 font-light mb-10 max-w-md mx-auto">
            Твой любимый приватный Minecraft сервер
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#about"
              className="px-8 py-4 bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-full font-semibold text-slate-800 border border-white/70 shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
            >
              Узнать больше
            </a>
            <a
              href="https://discord.gg/9WsxwGyVkE"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-slate-800/80 hover:bg-slate-900/90 backdrop-blur-sm rounded-full font-semibold text-white border border-slate-700/50 shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
            >
              Присоединиться
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="p-2 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 animate-bounce">
            <ArrowDown className="w-5 h-5 text-slate-600" />
          </div>
        </div>
      </div>
    </section>
  );
}

// About Section Component
function AboutSection() {
  const features = [
    {
      icon: Gamepad2,
      title: 'Уникальный геймплей',
      description: 'Приватный сервер с сезонной системой и уникальными механиками, которые вы не найдете нигде.',
      image: 'https://miro.medium.com/0*Pb9jYCvEqtSHEgMz.jpeg'
    },
    {
      icon: Users,
      title: 'Активное сообщество',
      description: 'Новые ивенты, декор и вечеринки. Место, где игроки создают историю вместе.',
      image: 'https://ccdn.g-portal.com/large_News_header_image_1920px_MC_Shader_50568f29e1.jpg'
    },
    {
      icon: Zap,
      title: 'Без лагов',
      description: 'Оптимизированный сервер с минимальными задержками для комфортной игры.',
      image: 'https://i.imgur.com/NoG7pEF_d.webp?maxwidth=1520&fidelity=grand'
    },
    {
      icon: Heart,
      title: 'Дружелюбная атмосфера',
      description: 'Мы ценим каждого игрока и создаём уютное пространство для всех.',
      image: 'https://i.tlauncher.org/images/2020-10-07-05.png'
    }
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/80 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-white/40 backdrop-blur-sm rounded-full text-sm text-slate-600 font-medium mb-4 border border-white/50">
            Почему мы?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            О сервере
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            ChanLand — это не просто сервер, это сообщество единомышленников
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div key={feature.title} className="bg-white/20 backdrop-blur-xl border border-white/40 rounded-3xl p-6 h-full transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:bg-white/35 shadow-[0_8px_32px_rgba(255,255,255,0.1),inset_0_0_0_1px_rgba(255,255,255,0.1)]">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Cities Section Component
function CitiesSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const cities = [
    {
      id: 1,
      name: 'Ivan-City',
      logo: 'https://i.imgur.com/rqEIUG0.png',
      players: 6,
      isOpen: false
    },
    {
      id: 2,
      name: 'Lunarium',
      logo: 'https://media.forgecdn.net/avatars/thumbnails/1332/904/256/256/638866425234937229.png',
      players: 1,
      isOpen: true
    },
    {
      id: 3,
      name: 'ShrekБург',
      logo: 'https://images.bauerhosting.com/legacy/empire-images/articles/5be1b60cfd0c0bc844479a97/shrek.jpg?ar=16%3A9&fit=crop&crop=top&auto=format&w=1440&q=80',
      players: 3,
      isOpen: true
    },
    {
      id: 4,
      name: 'Альфорд',
      logo: 'https://www.minecraft.net/content/dam/minecraftnet/franchise/photography/things/polar_realworld2.jpg',
      players: 1,
      isOpen: true
    },
  ];

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
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-purple-900/60 to-black/80" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <p className="text-white/90 text-lg leading-relaxed">
              Города - это центры экономики и социальной жизни. Вы сможете устанавливать свои законы, 
              привлекать новых жителей и заключать союзы и мирные договоры с соседними поселениями. 
              Развивайте торговлю, создавайте собственные магазины и аукционы, чтобы обеспечить 
              процветание своих граждан.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  placeholder="Найти город..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
                />
              </div>
              <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl px-6 py-3 font-semibold flex items-center gap-2 transition-colors">
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Основать город</span>
              </button>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <div
                    key={city.id}
                    className="relative z-10 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-all shadow-lg hover:shadow-xl hover:border-white/50 hover:-translate-y-1 hover:bg-white/35"
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
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-white/50">
                  Города не найдены
                </div>
              )}
            </div>

            <a
              href="https://chanland.vercel.app/cities/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-4 text-white/70 hover:text-white transition-colors font-medium"
            >
              Посмотреть все города на карте →
            </a>
          </div>
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

// Footer Component
function Footer() {
  return (
    <footer className="relative py-16">
      <div className="absolute inset-0 bg-white/40 backdrop-blur-xl border-t border-white/50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
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

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <a 
              href="https://discord.gg/9WsxwGyVkE" 
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

          <div className="inline-block px-6 py-3 bg-white/50 backdrop-blur-sm rounded-full border border-white/60 mb-8">
            <code className="text-slate-700 font-mono text-sm">chanland.play-network.io</code>
          </div>

          <div className="flex items-center justify-center gap-1 text-sm text-slate-500">
            <span>© 2025 ChanLand. all rights reserved , Создано с</span>
            <Heart className="w-4 h-4 text-red-400 fill-red-400" />
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-50 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/30 to-purple-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-amber-100/20 to-rose-100/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/50 to-transparent rounded-full" />
      </div>

      <Header />
      
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <CitiesSection />
      </main>
      
      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(100, 116, 139, 0.3);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 0.5);
        }
      `}</style>
    </div>
  );
}
