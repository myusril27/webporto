'use client'
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const defaultCards = [
  { title: 'Fullstack Developer', description: 'Mampu membangun aplikasi web dari frontend hingga backend menggunakan React, Node.js, dan database modern. Berfokus pada clean code, performa, dan UX/UI yang baik.', label: 'About Me', color: '#000000' },
  { title: 'Robotics Engineer', description: 'Bisa desain skematik PCB dengan EasyEDA, mengerti Arduino, Wemos D1 mini, Raspberry Pi, serta integrasi sensor dan aktuator.', label: 'Overview', color: '#000000' },
];

// Particle creation
const createParticle = (parent, glowColor = '173,216,230') => {
  const el = document.createElement('div');
  el.className = 'particle';
  const size = Math.random() * 3 + 2;
  el.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background: rgba(${glowColor},0.7);
    box-shadow: 0 0 ${size * 2}px rgba(${glowColor},0.5);
    top: ${Math.random() * 100}%;
    left: ${Math.random() * 100}%;
    pointer-events: none;
  `;
  parent.appendChild(el);

  gsap.to(el, {
    x: (Math.random() - 0.5) * 20,
    y: (Math.random() - 0.5) * 20,
    duration: 2 + Math.random() * 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  return el;
};

// ParticleCard component
const ParticleCard = ({ card, glowColor = '173,216,230', textAutoHide = true, particleCount = 12 }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(el, glowColor));
    }

    // tilt & glow
    const handleMouseMove = e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, { rotateX: -y / 10, rotateY: x / 20, duration: 0.2 });

      const relX = ((e.clientX - rect.left) / rect.width) * 100;
      const relY = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--glow-x', `${relX}%`);
      el.style.setProperty('--glow-y', `${relY}%`);
      el.style.setProperty('--glow-intensity', '1');
    };

    const handleMouseLeave = () => {
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.3 });
      el.style.setProperty('--glow-intensity', '0');
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    // Scroll animation
    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          end: 'bottom 60%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      particles.forEach(p => p.remove());
    };
  }, [glowColor, particleCount]);

  return (
    <div
      ref={cardRef}
      className="relative p-6 rounded-lg border font-light overflow-hidden transition-all duration-300 ease-in-out cursor-pointer"
      style={{
        backgroundColor: card.color || '#fff',
        width: '350px',
        height: '300px',
        minHeight: '200px',
        maxHeight: '200px',
        '--glow-x': '50%',
        '--glow-y': '50%',
        '--glow-intensity': '0',
        '--glow-radius': '200px',
        '--glow-color': glowColor,
      }}
    >
      <h3 className={`text-base font-semibold ${textAutoHide ? 'line-clamp-1' : ''} overflow-hidden`}>
        {card.title}
      </h3>
      
      <div className="text-xs opacity-80 mt-2 max-h-[4rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {card.description}
      </div>

      <div
        className="absolute inset-0 pointer-events-none rounded-lg"
        style={{
          background: `radial-gradient(circle at var(--glow-x) var(--glow-y), rgba(${glowColor}, calc(var(--glow-intensity)*0.6)) 0%, rgba(${glowColor}, calc(var(--glow-intensity)*0.3)) 30%, transparent 70%)`,
          transition: 'background 0.2s',
        }}
      />
    </div>
  );
};

// Global spotlight
const GlobalSpotlight = ({ glowColor = '173,216,230', radius = 300 }) => {
  useEffect(() => {
    const spotlight = document.createElement('div');
    spotlight.style.cssText = `
      position: fixed;
      width: ${radius * 2}px;
      height: ${radius * 2}px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle, rgba(${glowColor},0.15) 0%, rgba(${glowColor},0.05) 70%, transparent 100%);
      opacity: 0;
      transform: translate(-50%, -50%);
      z-index: 200;
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);

    const handleMouseMove = e => {
      gsap.to(spotlight, { left: e.clientX, top: e.clientY, duration: 0.1, ease: 'power2.out', opacity: 0.8 });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      spotlight.remove();
    };
  }, [glowColor, radius]);

  return null;
};

// Responsive grid
const BentoCardGrid = ({ cards, ...props }) => (
  <div className="w-full flex justify-between flex-wrap gap-6 px-8 lg:px-16">
    {cards.map((card, i) => (
      <ParticleCard key={i} card={card} {...props} />
    ))}
  </div>
);

// Main MagicBento component
const MagicBento = ({ cards = defaultCards, textAutoHide = true, particleCount = 12 }) => (
  <>
    <GlobalSpotlight />
    <BentoCardGrid cards={cards} textAutoHide={textAutoHide} particleCount={particleCount} />
  </>
);

export default MagicBento;
