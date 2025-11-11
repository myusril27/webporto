"use client";
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    // 🔒 Ambil token reCAPTCHA
    const token = grecaptcha.getResponse();
    if (!token) {
      setResult("Harap verifikasi reCAPTCHA terlebih dahulu.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, token }),
      });

      const data = await res.json();

      if (data.success) {
        setResult("Pesan berhasil dikirim ✅");
        setForm({ name: "", email: "", phone: "", message: "" });
        grecaptcha.reset();
      } else {
        setResult("Gagal mengirim pesan ❌");
      }
    } catch {
      setResult("Terjadi kesalahan server ❗");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white/10 backdrop-blur-lg rounded-2xl text-white shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Kirim Pesan</h2>

      <input
        type="text"
        name="name"
        placeholder="Nama"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full mb-3 p-3 bg-transparent border border-gray-400 rounded-lg focus:outline-none focus:border-white"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full mb-3 p-3 bg-transparent border border-gray-400 rounded-lg focus:outline-none focus:border-white"
      />

      <input
        type="text"
        name="WhatsApp"
        placeholder="No. WhatsApp"
        value={form.WhatsApp}
        onChange={handleChange}
        required
        className="w-full mb-3 p-3 bg-transparent border border-gray-400 rounded-lg focus:outline-none focus:border-white"
      />

      <textarea
        name="message"
        placeholder="Pesan"
        rows="4"
        value={form.message}
        onChange={handleChange}
        required
        className="w-full mb-3 p-3 bg-transparent border border-gray-400 rounded-lg focus:outline-none focus:border-white resize-none"
      />

      {/* reCAPTCHA */}
      <div
        className="g-recaptcha mb-3"
        data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      ></div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? "Mengirim..." : "Kirim Pesan"}
      </button>

      {result && <p className="mt-3 text-center text-sm">{result}</p>}
    </form>
  );
}
