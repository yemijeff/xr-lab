import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'XR Lab — Dashboard',
  description: 'Private learning workspace and spatial experimentation lab',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#090a0f] text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
