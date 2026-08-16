import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'XR Lab — Spatial Design Portfolio & Journey',
  description: 'A personal research lab documenting the journey from Product Designer to Spatial Designer.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#07080b] text-slate-100 min-h-screen flex flex-col antialiased selection:bg-sky-500/30 selection:text-sky-200">
        <Navbar />
        <div className="flex-1 max-w-6xl w-full mx-auto px-6 py-10 md:py-16">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
