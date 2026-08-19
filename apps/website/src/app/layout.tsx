import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'XR Lab — Spatial Design Portfolio & Research Archive',
  description: 'Documenting the transition from Product Designer to Spatial Designer — exploring what happens when interfaces leave the screen.',
  keywords: [
    'Spatial Design',
    'XR Design',
    'Virtual Reality UX',
    'Augmented Reality UI',
    'Spatial Computing',
    'Interaction Design',
    'Product Design to XR',
  ],
  authors: [{ name: 'Adeyemi Jeff', url: 'https://xr-lab.vercel.app' }],
  creator: 'Adeyemi Jeff',
  openGraph: {
    title: 'XR Lab — Spatial Design Portfolio & Research Archive',
    description: 'Documenting the transition from Product Designer to Spatial Designer — prototypes, reflections, and spatial principles.',
    url: 'https://xr-lab.vercel.app',
    siteName: 'XR Lab',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XR Lab — Spatial Design Research & Portfolio',
    description: 'Documenting the transition from Product Designer to Spatial Designer.',
    creator: '@yemijeff',
  },
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
