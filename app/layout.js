import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 🧠 Metadata lo taruh di sini
export const metadata = {
  title: "Muhammad Yusril | Portfolio",
  description:
    "Portfolio resmi Muhammad Yusril — Full Stack Developer & PCB Designer. Jelajahi proyek, pengalaman, dan kontak langsung.",
  keywords: [
    "Muhammad Yusril",
    "Yusril Portfolio",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "PCB Designer",
    "IoT Engineer",
    "Web Developer",
  ],
  authors: [{ name: "Muhammad Yusril" }],
  creator: "Muhammad Yusril",
  publisher: "Muhammad Yusril",
  openGraph: {
    title: "Muhammad Yusril | Portfolio",
    description:
      "Full Stack Developer & PCB Designer — projek digital dan hardware dalam satu tempat.",
    url: "https://yourdomain.com",
    siteName: "Yusril Portfolio",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Yusril Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Yusril | Portfolio",
    description:
      "Full Stack Developer & PCB Designer — projek digital dan hardware dalam satu tempat.",
    creator: "@yousrilll",
    images: ["/img/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* 🧱 Tambahin script reCAPTCHA di sini bre */}
        <script
          src="https://www.google.com/recaptcha/api.js"
          async
          defer
        ></script>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
