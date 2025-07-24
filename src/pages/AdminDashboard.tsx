import React, { useState } from 'react';
import { Calendar as CalendarIcon, ClipboardList, Settings, LogOut, PlusCircle, Users, Key, UserCog, Home } from 'lucide-react';
import { Button } from '../components/ui/button';
import FullCalendarView from '../components/admin/FullCalendarView';
import ExportPlanningButton from '../components/admin/ExportPlanningButton';
import PharmacyAccountsManager from '../components/admin/PharmacyAccountsManager';
import RoleManager from '../components/admin/RoleManager';
import AccessRightsManager from '../components/admin/AccessRightsManager';
import ManualOnCallAssignment from '../components/admin/ManualOnCallAssignment';
import { motion } from 'framer-motion';

const adminName = 'Administrateur';
const navItems = [
  { icon: Home, label: 'Dashboard', key: 'Dashboard' },
  { icon: CalendarIcon, label: 'Calendrier', key: 'Calendrier' },
  { icon: Users, label: 'Pharmacies', key: 'Pharmacies' },
  { icon: UserCog, label: 'Rôles', key: 'Rôles' },
  { icon: CalendarIcon, label: 'Attribution', key: 'Attribution' },
  { icon: Settings, label: 'Profil', key: 'Profil' },
];

const logoUrl = "https://media.designrush.com/inspiration_images/549120/conversions/Pharma_ee5626592827-desktop.jpg";

const AdminLayout: React.FC<{ tab: string; setTab: (t: string) => void; children: React.ReactNode }> = ({ tab, setTab, children }) => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
    {/* Header */}
    <header className="bg-white shadow-sm border-b border-green-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <img src={logoUrl} alt="GardePharma" className="w-10 h-10 rounded-lg object-cover shadow" />
            <h1 className="text-2xl font-bold text-green-600 tracking-tight">GardePharma Admin</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-green-700 font-semibold">{adminName}</span>
            <img src={logoUrl} alt="Admin" className="w-10 h-10 rounded-full border-2 border-green-200" />
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <LogOut className="h-4 w-4 mr-2" /> Déconnexion
            </Button>
          </div>
        </div>
      </div>
    </header>
    {/* Navigation */}
    <nav className="bg-white border-b border-green-200 sticky top-16 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {navItems.map((item) => (
            <motion.button
              key={item.key}
              onClick={() => setTab(item.key)}
              whileHover={{ scale: 1.08 }}
              className={`flex items-center px-3 py-4 text-sm font-medium transition-colors border-b-2 ${tab === item.key ? 'text-green-700 border-green-600 bg-green-50' : 'text-neutral-600 border-transparent hover:text-green-700 hover:border-green-400'}`}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.label}
            </motion.button>
          ))}
        </div>
      </div>
    </nav>
    {/* Main Content */}
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {children}
    </main>
  </div>
);

const sectionMotion = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function AdminDashboard() {
  const [tab, setTab] = useState('Dashboard');

  let content = null;
  if (tab === 'Dashboard') content = (
    <motion.div {...sectionMotion}>
      <h2 className="text-3xl font-bold text-green-800 mb-6">Bienvenue sur le dashboard administrateur</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard label="Pharmacies actives" value="12" />
        <StatCard label="Gardes à venir" value="8" />
        <StatCard label="Demandes en attente" value="3" />
      </div>
      <div className="flex gap-4 mb-8">
        <ExportPlanningButton />
        <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded shadow font-semibold transition">
          <PlusCircle className="h-4 w-4" /> Ajouter une garde
        </Button>
      </div>
    </motion.div>
  );
  else if (tab === 'Calendrier') content = (
    <motion.div {...sectionMotion}>
      <FullCalendarView />
    </motion.div>
  );
  else if (tab === 'Pharmacies') content = (
    <motion.div {...sectionMotion}>
      <PharmacyAccountsManager />
    </motion.div>
  );
  else if (tab === 'Rôles') content = (
    <motion.div {...sectionMotion}>
      <RoleManager />
    </motion.div>
  );
  else if (tab === 'Attribution') content = (
    <motion.div {...sectionMotion}>
      <ManualOnCallAssignment />
    </motion.div>
  );
  else if (tab === 'Profil') content = (
    <motion.div {...sectionMotion}>
      <ProfileForm />
    </motion.div>
  );

  return (
    <AdminLayout tab={tab} setTab={setTab}>
      {content}
    </AdminLayout>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow p-6 flex flex-col items-center border border-green-100"
    >
      <div className="text-3xl font-bold text-green-700 mb-2">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </motion.div>
  );
}

function ProfileForm() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[400px] flex items-center justify-center bg-gray-50 py-10">
      <form className="bg-white rounded-xl shadow-lg p-10 border w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-8">Mon profil</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Nom</label>
            <input type="text" placeholder="Nom" className="w-full px-5 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white transition text-base" defaultValue="Dupont" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Prénom</label>
            <input type="text" placeholder="Prénom" className="w-full px-5 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white transition text-base" defaultValue="Jean" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" placeholder="Email" className="w-full px-5 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white transition text-base" defaultValue="admin@gardepharma.com" />
          </div>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <img src={logoUrl} alt="Avatar" className="w-16 h-16 rounded-full border-2 border-green-200" />
          <div>
            <div className="font-semibold text-green-700">Administrateur</div>
            <div className="text-sm text-gray-500">admin@gardepharma.com</div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white rounded px-8 py-3 font-semibold shadow transition text-base">Enregistrer</Button>
        </div>
      </form>
    </motion.div>
  );
} 