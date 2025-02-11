import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import React from 'react';

export const metadata: Metadata = {
  title: 'Public Sector',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <div className="flex">
          <Sidebar />
          <main className="ml-64 min-h-screen flex-1 p-4 transition-all duration-300">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
