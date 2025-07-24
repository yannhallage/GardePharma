import React from 'react';

interface AdminSidebarProps {
  active: string;
  onSelect: (key: string) => void;
}

const links = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'calendar', label: 'Calendrier' },
  // { key: 'export', label: 'Export' },
  { key: 'pharmacies', label: 'Pharmacies' },
  { key: 'roles', label: 'Rôles' },
  { key: 'rights', label: 'Droits' },
  { key: 'manual', label: 'Attribution' },
  { key: 'profile', label: 'Profil' },
];

export default function AdminSidebar({ active, onSelect }: AdminSidebarProps) {
  return (
    <aside className="w-64 bg-white border-r flex flex-col min-h-screen">
      <div className="flex items-center gap-3 px-6 py-6 border-b">
        <img src="https://media.designrush.com/inspiration_images/549120/conversions/Pharma_ee5626592827-desktop.jpg" alt="GardePharma" className="w-10 h-10 rounded-lg object-cover" />
        <span className="text-2xl font-bold text-green-700">GardePharma</span>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {links.map(link => (
          <button
            key={link.key}
            onClick={() => onSelect(link.key)}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium text-left ${
              active === link.key
                ? 'bg-green-100 text-green-700'
                : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
            }`}
          >
            {link.label}
          </button>
        ))}
      </nav>
      <button className="flex items-center gap-2 px-6 py-3 text-green-700 hover:bg-green-50 border-t">
        Déconnexion
      </button>
    </aside>
  );
} 