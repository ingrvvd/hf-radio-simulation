import React from 'react';
import { Link } from 'react-router-dom';
//import { createPageUrl } from '@/utils';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-200">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap');
        
        .font-digital {
          font-family: 'Roboto Mono', monospace;
        }
        
        .chassis-shadow {
          box-shadow: 
            0 50px 100px -20px rgba(0, 0, 0, 0.15),
            0 30px 60px -30px rgba(0, 0, 0, 0.2),
            inset 0 0 0 1px rgba(0,0,0,0.05);
        }

        .inset-panel {
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .soft-key-shadow {
           box-shadow: 
             0 1px 2px rgba(0,0,0,0.1),
             inset 0 1px 0 rgba(255,255,255,0.8);
        }
      `}</style>
      <div className="flex flex-col min-h-screen">
        <main className="grow flex items-center justify-center p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}