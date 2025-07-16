import React from 'react';
import { Outlet } from 'react-router-dom';
import { Phone, MapPin, Calendar, Users, Settings, LogOut } from 'lucide-react';
import { Button } from '../ui/button';

interface AppLayoutProps {
  userRole?: 'user' | 'pharmacy' | 'admin';
  userName?: string;
  children?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ userRole = 'user', userName = 'Utilisateur', children }) => {
  const navigationItems = {
    user: [
      { icon: MapPin, label: 'Carte', href: '/map' },
      { icon: Phone, label: 'Pharmacies', href: '/pharmacies' },
    ],
    pharmacy: [
      { icon: Calendar, label: 'Planning', href: '/planning' },
      { icon: Phone, label: 'Mes Gardes', href: '/guards' },
      { icon: Settings, label: 'Profil', href: '/profile' },
    ],
    admin: [
      { icon: Calendar, label: 'Calendrier', href: '/calendar' },
      { icon: Users, label: 'Gestion', href: '/management' },
      { icon: Settings, label: 'Paramètres', href: '/settings' },
    ],
  };

  const currentNavItems = navigationItems[userRole];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-primary-600">
                  GardePharma
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-neutral-600">
                {userName}
              </span>
              <Button variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {currentNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center px-3 py-4 text-sm font-medium text-neutral-600 hover:text-primary-600 hover:border-b-2 hover:border-primary-600 transition-colors"
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default AppLayout; 