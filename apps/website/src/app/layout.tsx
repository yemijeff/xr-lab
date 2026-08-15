import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en">
      <body className="bg-[#07080b] text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
