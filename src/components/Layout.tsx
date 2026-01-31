import React from 'react';
import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { KDG_NAVY } from '../constants/colors';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Analytics />
      <nav className="bg-white border-b border-gray-200 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <img 
            src="https://www.kdg.be/sites/kdg/files/2025-09/KdG-logo-V-zwart-rgb.png" 
            alt="KdG Logo" 
            className="h-16 w-auto"
          />
          <h1 
            className="text-xl font-bold hidden sm:block"
            style={{ color: KDG_NAVY }}
          >
            Graduation Tool
          </h1>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 flex-grow">
        {children}
      </main>

      <footer className="py-10 text-center text-gray-400 text-xs bg-white border-t border-gray-100">
        <p>© {new Date().getFullYear()} Nichola Bauwelinck – Student Graduation Assistant (Unofficial KdG Tool)</p>
      </footer>
    </div>
  );
};

