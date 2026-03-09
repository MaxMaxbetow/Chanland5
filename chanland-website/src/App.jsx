import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ExternalLink, Sparkles, ArrowDown, Gamepad2, Users, Zap, Heart, Search, Plus } from 'lucide-react';

// Header Component
// Вставь этот импорт в СУЩЕСТВУЮЩУЮ строку импортов наверху App.jsx:
// import { useState, useRef, useEffect } from "react";  ← уже есть, добавь только useRef если нет

const NAV_LINKS = [
  {
    href: "/documents",
    label: "Legal",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
        <path d="M14 2v5a1 1 0 0 0 1 1h5" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
      </svg>
    ),
  },
  {
    href: "/purchase",
    label: "Purchase",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 10a4 4 0 0 1-8 0" />
        <path d="M3.103 6.034h17.794" />
        <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
      </svg>
    ),
  },
  {
    href: "https://ashfield.cc/support",
    label: "Support",
    external: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
      </svg>
    ),
  },
];

const LANGUAGES = ["EN", "DE", "FR", "ES", "RU", "ZH"];

function NavDivider() {
  return (
    <div style={{
      width: "1px", height: "16px",
      backgroundColor: "rgba(255,255,255,0.08)",
      margin: "0 4px", opacity: 0.5,
    }} />
  );
}

const navStyles = `
  .exp-nav {
    font-family: 'Onest', sans-serif;
    display: flex; align-items: center; gap: 4px;
    border-radius: 9999px;
    border: 1px solid rgba(255,255,255,0.08);
    background-color: rgba(255,255,255,0.04);
    backdrop-filter: blur(24px);
    padding: 12px 28px;
    position: relative; overflow: hidden;
    width: fit-content;
  }
  .exp-nav-link {
    display: flex; align-items: center; gap: 6px;
    border-radius: 9999px; padding: 6px 14px;
    font-size: 13px; color: #71717a;
    text-decoration: none;
    transition: color 0.15s ease; white-space: nowrap;
  }
  .exp-nav-link:hover { color: #fff; }
  .exp-lang-btn {
    display: flex; align-items: center; gap: 6px;
    border-radius: 9999px; padding: 6px 12px;
    font-size: 13px; color: #71717a;
    background: none; border: none; cursor: pointer;
    font-family: inherit; transition: color 0.15s ease;
  }
  .exp-lang-btn:hover { color: #fff; }
  .exp-lang-dropdown {
    position: absolute; top: calc(100% + 8px); left: 0;
    background: rgba(20,20,28,0.95);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px; backdrop-filter: blur(16px);
    overflow: hidden; min-width: 80px; z-index: 50;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  }
  .exp-lang-option {
    display: block; width: 100%; padding: 8px 16px;
    font-size: 13px; color: #71717a;
    background: none; border: none; cursor: pointer;
    text-align: left; font-family: inherit;
    transition: background 0.1s, color 0.1s;
  }
  .exp-lang-option:hover { background: rgba(255,255,255,0.06); color: #fff; }
  .exp-lang-option.active { color: #fff; }
  .exp-signin-btn {
    display: flex; align-items: center; gap: 6px;
    height: 32px; border-radius: 9999px;
    background: rgba(255,255,255,0.07);
    padding: 0 16px; font-size: 13px; font-weight: 500;
    color: #fff; text-decoration: none;
    transition: background 0.15s ease;
    font-family: inherit; white-space: nowrap;
  }
  .exp-signin-btn:hover { background: rgba(255,255,255,0.12); }
  .exp-logo-link {
    display: flex; align-items: center; gap: 8px;
    text-decoration: none; margin-right: 12px;
  }
  .exp-logo-text { font-size: 14px; font-weight: 500; color: #fff; }
  .exp-logo-icon {
    width: 20px; height: 20px; border-radius: 6px;
    background: linear-gradient(135deg, #8b5cf6, #6366f1);
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700; color: #fff;
  }
  .exp-chevron { transition: transform 0.2s ease; opacity: 0.5; }
  .exp-chevron.open { transform: rotate(180deg); }
`;

function Navbar() {
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("EN");
  const langRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <style>{navStyles}</style>
      <nav className="exp-nav">
        <a className="exp-logo-link" href="/">
          <div className="exp-logo-icon">E</div>
          <span className="exp-logo-text">Expensive</span>
        </a>

        <NavDivider />

        {NAV_LINKS.map((link) => (
          
            key={link.href}
            className="exp-nav-link"
            href={link.href}
            {...(link.external ? { rel: "noopener noreferrer", target: "_blank" } : {})}
          >
            {link.icon}
            {link.label}
          </a>
        ))}

        <NavDivider />

        <div style={{ position: "relative" }} ref={langRef}>
          <button className="exp-lang-btn" onClick={() => setLangOpen((v) => !v)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
            {selectedLang}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`exp-chevron${langOpen ? " open" : ""}`}>
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {langOpen && (
            <div className="exp-lang-dropdown">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  className={`exp-lang-option${lang === selectedLang ? " active" : ""}`}
                  onClick={() => { setSelectedLang(lang); setLangOpen(false); }}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>

        <NavDivider />

        <a className="exp-signin-btn" href="/auth">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m10 17 5-5-5-5" /><path d="M15 12H3" />
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          </svg>
          Sign in
        </a>
      </nav>
    </>
  );
}

const NAV_LINKS = [
  {
    href: "/documents",
    label: "Legal",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
        <path d="M14 2v5a1 1 0 0 0 1 1h5" />
        <path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
      </svg>
    ),
  },
  {
    href: "/purchase",
    label: "Purchase",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 10a4 4 0 0 1-8 0" />
        <path d="M3.103 6.034h17.794" />
        <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
      </svg>
    ),
  },
  {
    href: "https://ashfield.cc/support",
    label: "Support",
    external: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
      </svg>
    ),
  },
];

const LANGUAGES = ["EN", "DE", "FR", "ES", "RU", "ZH"];

function Divider() {
  return (
    <div
      style={{
        width: "1px",
        height: "16px",
        backgroundColor: "rgba(255,255,255,0.08)",
        margin: "0 4px",
        opacity: 0.5,
      }}
    />
  );
}

export default function Navbar() {
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("EN");
  const langRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600&display=swap');

        .exp-nav {
          font-family: 'Onest', sans-serif;
          display: flex;
          align-items: center;
          gap: 4px;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.08);
          background-color: rgba(255,255,255,0.04);
          backdrop-filter: blur(24px);
          padding: 12px 28px;
          position: relative;
          overflow: hidden;
          width: fit-content;
        }

        .exp-nav-sweep {
          pointer-events: none;
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: 9999px;
        }

        .exp-nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          border-radius: 9999px;
          padding: 6px 14px;
          font-size: 13px;
          color: #71717a;
          text-decoration: none;
          transition: color 0.15s ease;
          white-space: nowrap;
        }
        .exp-nav-link:hover { color: #fff; }

        .exp-lang-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          border-radius: 9999px;
          padding: 6px 12px;
          font-size: 13px;
          color: #71717a;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          transition: color 0.15s ease;
        }
        .exp-lang-btn:hover { color: #fff; }

        .exp-lang-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          background: rgba(20,20,28,0.95);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          backdrop-filter: blur(16px);
          overflow: hidden;
          min-width: 80px;
          z-index: 50;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }

        .exp-lang-option {
          display: block;
          width: 100%;
          padding: 8px 16px;
          font-size: 13px;
          color: #71717a;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
          transition: background 0.1s, color 0.1s;
        }
        .exp-lang-option:hover { background: rgba(255,255,255,0.06); color: #fff; }
        .exp-lang-option.active { color: #fff; }

        .exp-signin-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          height: 32px;
          border-radius: 9999px;
          background: rgba(255,255,255,0.07);
          padding: 0 16px;
          font-size: 13px;
          font-weight: 500;
          color: #fff;
          text-decoration: none;
          transition: background 0.15s ease;
          font-family: inherit;
          white-space: nowrap;
        }
        .exp-signin-btn:hover { background: rgba(255,255,255,0.12); }

        .exp-logo-link {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          margin-right: 12px;
        }
        .exp-logo-text {
          font-size: 14px;
          font-weight: 500;
          color: #fff;
        }
        .exp-logo-icon {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          color: #fff;
        }

        .exp-chevron {
          transition: transform 0.2s ease;
          opacity: 0.5;
        }
        .exp-chevron.open { transform: rotate(180deg); }
      `}</style>

      <nav className="exp-nav">
        {/* Sweep effects */}
        <div className="exp-nav-sweep">
          <div style={{
            position: "absolute", inset: "auto 0", left: 0,
            width: "40%", height: "100%",
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
            transform: "translateX(280%)",
          }} />
        </div>

        {/* Logo */}
        <a className="exp-logo-link" href="/">
          <div className="exp-logo-icon">E</div>
          <span className="exp-logo-text">Expensive</span>
        </a>

        <Divider />

        {/* Nav links */}
        {NAV_LINKS.map((link) => (
          
            key={link.href}
            className="exp-nav-link"
            href={link.href}
            {...(link.external ? { rel: "noopener noreferrer", target: "_blank" } : {})}
          >
            {link.icon}
            {link.label}
          </a>
        ))}

        <Divider />

        {/* Language selector */}
        <div style={{ position: "relative" }} ref={langRef}>
          <button className="exp-lang-btn" onClick={() => setLangOpen((v) => !v)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
            {selectedLang}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`exp-chevron${langOpen ? " open" : ""}`}>
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {langOpen && (
            <div className="exp-lang-dropdown">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  className={`exp-lang-option${lang === selectedLang ? " active" : ""}`}
                  onClick={() => { setSelectedLang(lang); setLangOpen(false); }}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>

        <Divider />

        {/* Sign in */}
        <a className="exp-signin-btn" href="/auth">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m10 17 5-5-5-5" />
            <path d="M15 12H3" />
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          </svg>
          Sign in
        </a>
      </nav>
    </>
  );
}
// Hero Section Component
function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        
        {/* НОВЫЙ БЛОК: Замена фонового div на тег <img> */}
        <img
          src="https://i.ytimg.com/vi/aVNTGDMU8Wc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLChiqqQRUuqISvvoZ-k2Efnzo-NjA"
          alt="Фоновое изображение ChanLand"
          className="absolute inset-0 w-full h-full object-cover" // <--- Ключевые стили: w-full h-full object-cover
        />
        
        {/* Предыдущие классы, которые создают эффект: */}
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

  <div className="absolute -bottom-20 left-1/2 -translate-x-1/2">
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
      logo: 'https://i.imgur.com/22YDl33.png',
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
    >
      <div 
        className="absolute inset-0 bg-center bg-cover bg-scroll lg:bg-fixed"
        style={{
          backgroundImage: "url('https://www.complementary.dev/assets/img/newScreenshots/both5_endCity.jpg')"
        }}
      />
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
<a href="https://discord.gg/9WsxwGyVkE" target="_blank" rel="noopener noreferrer">
  <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl px-6 py-3 font-semibold flex items-center gap-2 transition-colors">
    <Plus className="w-5 h-5" />
    <span className="hidden sm:inline">Основать город</span>
  </button>
</a>
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

          <div className="inline-block px-6 py-3 bg-gray/50 backdrop-blur-sm rounded-full border border-white/60 mb-8">
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
