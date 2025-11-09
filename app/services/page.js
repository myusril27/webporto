'use client';
import TargetCursor from "@/components/TargetCursor";
import PillNav from "@/components/PillNav";
import DomeGallery from '@/components/DomeGallery';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

export default function ServicesPage() {
  return (
    <div className="relative w-full min-h-screen flex flex-col bg-black overflow-hidden text-white">

      {/* Cursor interaktif */}
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />

      {/* Navbar */}
      <div className="z-20 fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6">
        <PillNav
          items={navItems}
          activeHref="/services"
          ease="power2.easeOut"
          baseColor="#000080"
          pillColor="#ffffff"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#000000"
        />
      </div>

      {/* Judul pojok kanan atas */}
      <h1 className="absolute top-6 right-10 text-3xl font-bold text-white z-20 tracking-wide">
        My Projects
      </h1>

      {/* Konten utama */}
      <main className="flex-1 flex justify-center items-center z-10 w-full px-6 lg:px-12 mt-28 mb-16">
        <div style={{ width: '110vw', height: '80vh' }}>
          <DomeGallery />
        </div>
      </main>

    </div>
  );
}
