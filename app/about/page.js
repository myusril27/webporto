'use client';
import DarkVeil from "@/components/DarkVeil";
import TargetCursor from "@/components/TargetCursor";
import PillNav from "@/components/PillNav";
import MagicBento from "@/components/MagicBento";
import LogoLoop from "@/components/LogoLoop";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

const techLogos = [
  { node: <img src="/logo/arduino.jpeg" alt="Arduino" className="w-12 h-12" />, title: "Arduino", href: "https://www.arduino.cc/" },
  { node: <img src="/logo/esyeda.png" alt="esyeda" className="w-12 h-12" />, title: "Esyeda", href: "https://easyeda.com/index.php/explore/pcb%20design" },
  { node: <img src="/logo/golang.png" alt="Golang" className="w-12 h-12" />, title: "Golang", href: "https://go.dev/solutions/case-studies" },
  { node: <img src="/logo/next.jpeg" alt="Next" className="w-12 h-12" />, title: "Next.JS", href: "https://nextjs.org/" },
  { node: <img src="/logo/php.png" alt="PHP" className="w-12 h-12" />, title: "PHP", href: "https://www.php.net/" },
  { node: <img src="/logo/python.webp" alt="Python" className="w-12 h-12" />, title: "Python", href: "https://www.python.org/" },
  { node: <img src="/logo/react.png" alt="React" className="w-12 h-12" />, title: "React", href: "https://react.dev/" },
  { node: <img src="/logo/instagram.jpg" alt="Instagram" className="w-12 h-12" />, title: "Instagram", href: "https://www.instagram.com/yousrilll/" },
  { node: <img src="/logo/linkedin.png" alt="LinkedIn" className="w-12 h-12" />, title: "LinkedIn", href: "https://www.linkedin.com/in/muhamad-yusril-2579331ba/" },
  { node: <img src="/logo/reacbits1.png" alt="Reactbits" className="w-12 h-12" />, title: "Reactbits", href: "https://reactbits.dev/" },
  { node: <img src="/logo/vue.png" alt="Vue" className="w-12 h-12" />, title: "Vue", href: "https://vuejs.org/" },
];

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

export default function AboutPage() {
  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-hidden">

      {/* Background layer (menutupi seluruh layar) */}
      <div className="absolute inset-0 z-0">
        <DarkVeil />
      </div>

      {/* Cursor interaktif */}
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />

      {/* Navbar */}
      <div className="z-20 fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-7x1 px-6">
        <PillNav
          items={navItems}
          activeHref="/about"
          ease="power2.easeOut"
          baseColor="#000080"
          pillColor="#ffffff"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#000000"
        />
      </div>

      {/* Konten Utama */}
      <main className="flex-1 flex justify-center items-center z-10 w-full px-6 lg:px-12 mt-28 mb-16">
        <div className="w-full max-w-7x1 flex justify-center">
          <MagicBento
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="132, 0, 255"
          />
        </div>
      </main>

      {/* LogoLoop (bagian bawah halaman) */}
      <footer className="w-full flex justify-center items-center h-40 z-20 bg-transparent pb-6">
        <div className="w-full max-w-7x1">
          <LogoLoop
            logos={techLogos}
            speed={120}
            direction="left"
            logoHeight={50}
            gap={10}
            pauseOnHover
            scaleOnHover
            ariaLabel="Technology partners"
          />
        </div>
      </footer>
    </div>
  );
}
