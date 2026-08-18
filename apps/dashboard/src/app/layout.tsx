import type { Metadata } from 'next';
import './globals.css';
import { DashboardShell } from '@/components/layout/DashboardShell';

export const metadata: Metadata = {
  title: 'XR Lab — Dashboard & OS',
  description: 'Private learning workspace, experiment tracker, and spatial design research lab.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#090a0f] text-slate-100 min-h-screen antialiased selection:bg-sky-500/30 selection:text-sky-200">
        <DashboardShell>
          {children}
        </DashboardShell>
      </body>
    </html>
  );
}
