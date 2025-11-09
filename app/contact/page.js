'use client';
import DarkVeil from "@/components/DarkVeil";
import TargetCursor from "@/components/TargetCursor";
import PillNav from "@/components/PillNav";
import LogoLoop from "@/components/LogoLoop";
import { useState } from "react";

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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      // ✅ Ambil token dari reCAPTCHA v2 (checkbox)
      const token = grecaptcha.getResponse();
      if (!token) {
        setResult("Harap verifikasi reCAPTCHA terlebih dahulu!");
        setLoading(false);
        return;
      }

      // ✅ Kirim data ke API route
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, token }),
      });

      const data = await res.json();

      if (data.success) {
        setResult("✅ Pesan berhasil dikirim!");
        setFormData({ name: "", whatsapp: "", email: "", message: "" });
        grecaptcha.reset();
      } else {
        setResult(`❌ ${data.error || "Gagal mengirim pesan."}`);
      }
    } catch (err) {
      console.error(err);
      setResult("Terjadi kesalahan server ❗");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <DarkVeil />
      </div>

      {/* Cursor */}
      <TargetCursor spinDuration={2} hideDefaultCursor={true} parallaxOn={true} />

      {/* Navbar */}
      <div className="z-20 fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6">
        <PillNav
          items={navItems}
          activeHref="/contact"
          ease="power2.easeOut"
          baseColor="#000080"
          pillColor="#ffffff"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#000000"
        />
      </div>

      {/* Konten Utama */}
      <main className="flex-1 flex flex-col justify-center items-center z-10 w-full px-6 lg:px-12 mt-28 mb-16">
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* MAP */}
          <div className="rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(132,0,255,0.5)] h-[400px]">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.0998918433445!2d110.3695!3d-7.7706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a578b4b3d7a8f%3A0x123456789abcdef!2sYogyakarta!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#0a0a0a]/80 backdrop-blur-md rounded-2xl p-8 flex flex-col gap-4 shadow-[0_0_25px_rgba(132,0,255,0.3)] border border-purple-700/40"
          >
            <h2 className="text-2xl font-semibold mb-2 text-purple-300">Kirim Pesan</h2>

            <input
              type="text"
              name="name"
              placeholder="Nama"
              value={formData.name}
              onChange={handleChange}
              className="p-3 rounded-md bg-black/60 border border-purple-700/50 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />

            <input
              type="text"
              name="whatsapp"
              placeholder="Nomor WhatsApp"
              value={formData.whatsapp}
              onChange={handleChange}
              className="p-3 rounded-md bg-black/60 border border-purple-700/50 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 rounded-md bg-black/60 border border-purple-700/50 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />

            <textarea
              name="message"
              placeholder="Deskripsi Pesan"
              value={formData.message}
              onChange={handleChange}
              className="p-3 rounded-md bg-black/60 border border-purple-700/50 focus:ring-2 focus:ring-purple-500 outline-none h-32 resize-none"
              required
            ></textarea>

            {/* ✅ reCAPTCHA */}
            <div
              className="g-recaptcha mb-3"
              data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            ></div>

            <button
              type="submit"
              disabled={loading}
              className="bg-purple-700 hover:bg-purple-800 transition-colors text-white py-3 rounded-md font-semibold mt-2 shadow-[0_0_10px_rgba(132,0,255,0.5)]"
            >
              {loading ? "Mengirim..." : "Kirim Pesan"}
            </button>

            {result && (
              <p className="mt-3 text-center text-sm text-purple-300">{result}</p>
            )}
          </form>
        </div>
      </main>

      {/* LogoLoop bawah */}
      <footer className="w-full flex justify-center items-center h-40 z-20 bg-transparent pb-6">
        <div className="w-full max-w-7xl">
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
