'use client';

import DarkVeil from '../components/DarkVeil';

import Lanyard from '../components/Lanyard';

import TargetCursor from '../components/TargetCursor';

import PillNav from '../components/PillNav';

import LogoLoop from '../components/LogoLoop';

import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';



const techLogos = [

  {node: <img src="/logo/arduino.webp" alt="Arduino" className="w-12 h-12" />,
    title: "Arduino",href: "https://www.arduino.cc/"},
  {node: <img src="/logo/esyeda.webp" alt="esyeda" className="w-12 h-12" />,
    title: "Esyeda", href: "https://easyeda.com/index.php/explore/pcb%20design"},
  {node: <img src="/logo/golang.webp" alt="Golang" className="w-12 h-12" />,
    title: "Golang", href: "https://go.dev/solutions/case-studies"},
  {node: <img src="/logo/next.webp" alt="Next" className="w-12 h-12" />,
    title: "Next.JS", href: "https://nextjs.org/"},
  {node: <img src="/logo/php.webp" alt="PHP" className="w-12 h-12" />,
    title: "PHP", href: "https://www.php.net/"},
  {node: <img src="/logo/python.webp" alt="Python" className="w-12 h-12" />,
    title: "Python", href: "https://www.python.org/"},
  {node: <img src="/logo/react.webp" alt="react" className="w-12 h-12" />,
    title: "react", href: "https://react.dev/"},
  {node: <img src="/logo/instagram.webp" alt="instagram" className="w-12 h-12" />,
    title: "instagram", href: "https://www.instagram.com/yousrilll/"},
  {node: <img src="/logo/linkedin.webp" alt="linkedin" className="w-12 h-12" />,
    title: "linkedin", href: "https://www.linkedin.com/in/muhamad-yusril-2579331ba/"},
  { node: <img src="/logo/reacbits1.webp" alt="Reactbits" className="w-12 h-12" />,
    title: "Reactbits", href: "https://reactbits.dev/"},
  { node: <img src="/logo/vue.webp" alt="Vue" className="w-12 h-12" />,
    title: "Vue", href: "https://vuejs.org/"},
];





const navItems = [

  { label: 'Home', href: '/' },

  { label: 'projects', href: '/about' },

  { label: 'Services', href: '/services' },

  { label: 'Contact', href: '/contact' }

];



export default function Home() {

  return (

    <div className="relative w-full min-h-screen flex flex-col">



      {/* Kursor custom */}

      <TargetCursor

        spinDuration={2}

        hideDefaultCursor={true}

        parallaxOn={true}

      />



      {/* Navbar */}

      <PillNav

        items={navItems}

        activeHref="/"

        className="custom-nav"

        ease="power2.easeOut"

        baseColor="#000080"

        pillColor="#ffffff"

        hoveredPillTextColor="#ffffff"

        pillTextColor="#000000"

      />



      {/* Konten interaktif */}

      <h1 className="text-white mt-20">Hover over the elements below</h1>

      <button className="cursor-target my-4 px-4 py-2 bg-white text-black rounded">Click me!</button>

      <div className="cursor-target my-2 px-4 py-2 bg-white text-black rounded inline-block">Hover target</div>



      {/* Background */}

      <div className="absolute top-0 left-0 w-full h-full z-0">

        <DarkVeil />

      </div>



      {/* Bagian utama */}

      <div className="flex-1 flex flex-row flex-wrap items-start z-10 p-6 lg:p-20">

        {/* Lanyard kanan */}

        <div className="flex-1 min-w-[250px] h-[300px] sm:h-[400px] md:h-[250px] lg:h-[200px] flex justify-center items-center">

          <Lanyard position={[4,4,20]} gravity={[0,-40,0]} offsetX={0} />

        </div>



        {/* Teks kiri */}

        <div className="shrink-0 w-full sm:w-1/2 text-white pl-6 lg:pl-10 bg-black/10 p-10 rounded mb-6 sm:mb-0 -mt-4">

          <h1 className="text-3xl sm:text-5xl md:text-5xl font-bold leading-tight mb-2">

            Muhamad Yusril

          </h1>

          <h2 className="text-lg sm:text-xl md:text-2xl font-medium leading-tight mb-6">

            Full Stack Developer | Robotics Engineer

          </h2>



          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">About Me</h3>

          <p className="text-base sm:text-lg md:text-xl leading-snug">

            Saya adalah seorang software developer dan robotics engineer yang berpengalaman dalam membangun aplikasi web interaktif, sistem otomasi, dan solusi berbasis hardware & software. Saya menggabungkan kemampuan coding modern dengan pengetahuan mekanika dan elektronik untuk menghadirkan proyek inovatif, mulai dari aplikasi web hingga robotik cerdas. Saya senang bereksperimen dengan teknologi baru dan selalu mencari cara untuk mengoptimalkan proses dan pengalaman pengguna.

          </p>

        </div>

      </div>



      {/* LogoLoop di bawah */}

      <div className="h-48 w-full flex justify-center items-center z-10 mt-auto">

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



    </div>

  );

}