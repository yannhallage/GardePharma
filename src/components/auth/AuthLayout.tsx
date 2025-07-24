import React from 'react';
import { Building2 } from 'lucide-react';

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children }) => (
  <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center p-3">
    <style>{`
      .text-xs { font-size: 11px; line-height: 14px; }
      .text-sm { font-size: 13px; line-height: 16px; }
      .text-base { font-size: 14px; line-height: 18px; }
      .text-lg { font-size: 16px; line-height: 20px; }
      .text-xl { font-size: 18px; line-height: 22px; }
      .text-2xl { font-size: 20px; line-height: 24px; }
      .text-3xl { font-size: 24px; line-height: 28px; }
    `}</style>
    <div className="w-full max-w-sm">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl mb-4 shadow-md">
          <Building2 className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-800 mb-2">{title}</h1>
        {subtitle && <p className="text-neutral-600 text-sm">{subtitle}</p>}
      </div>
      {children}
    </div>
  </div>
);

export default AuthLayout; 