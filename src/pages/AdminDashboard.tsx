import React, { useState } from 'react';
import { Calendar as CalendarIcon, ClipboardList, Settings, LogOut, PlusCircle, Users, UserCog, Home, History } from 'lucide-react';
import { Button } from '../components/ui/button';
import FullCalendarView from '../components/admin/FullCalendarView';
import ExportPlanningButton from '../components/admin/ExportPlanningButton';
import PharmacyAccountsManager from '../components/admin/PharmacyAccountsManager';
import RoleManager from '../components/admin/RoleManager';
// import AccessRightsManager from '../components/admin/AccessRightsManager';
import ManualOnCallAssignment from '../components/admin/ManualOnCallAssignment';
import GuardsSection from '../components/admin/GuardsSection';
import { motion } from 'framer-motion';
import AdminHistory from '../components/admin/AdminHistory';
import ProfileForm from '../components/admin/ProfileForm';
import { removeSession } from '@/lib/local-storage';

const adminName = 'Administrateur';
const navItems = [
  { icon: Home, label: 'Dashboard', key: 'Dashboard' },
  { icon: CalendarIcon, label: 'Calendrier', key: 'Calendrier' },
  { icon: Users, label: 'Pharmacies', key: 'Pharmacies' },
  { icon: ClipboardList, label: 'Gardes', key: 'Gardes' },
  { icon: UserCog, label: 'Rôles', key: 'Rôles' },
  { icon: CalendarIcon, label: 'Attribution', key: 'Attribution' },
  { icon: History, label: 'Historique', key: 'Historique' },
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
            <h1 className="text-xl font-bold text-green-600 tracking-tight">GardePharma Admin</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-green-700 font-semibold">{adminName}</span>
            <img src={logoUrl} alt="Admin" className="w-10 h-10 rounded-full border-2 border-green-200" />
            <Button variant="outline" size="sm" className="flex items-center gap-2"
              onClick={() => {
                removeSession()
              }}
            >
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
      <h2 className="text-2xl font-bold text-green-800 mb-6">Bienvenue sur le dashboard administrateur</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard label="Pharmacies actives" value="12" />
        <StatCard label="Gardes à venir" value="8" />
        <StatCard label="Demandes en attente" value="3" />
      </div>
      <div className="flex gap-4 mb-8">
        <ExportPlanningButton />
        <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded shadow font-semibold transition text-sm">
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
  else if (tab === 'Gardes') content = (
    <motion.div {...sectionMotion}>
      <GuardsSection />
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
  else if (tab === 'Historique') content = (
    <motion.div {...sectionMotion}>
      <AdminHistory />
    </motion.div>
  );
  else if (tab === 'Profil') content = (
    <motion.div {...sectionMotion}>
      <ProfileFormSection />
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
      <div className="text-2xl font-bold text-green-700 mb-2">{value}</div>
      <div className="text-xs text-gray-600">{label}</div>
    </motion.div>
  );
}

function ProfileFormSection() {
  return (
    <ProfileForm
      initialData={{
        nom: "Dupont",
        prenom: "Jean",
        email: "admin@gardepharma.com",
        avatar_url: logoUrl
      }}
    />
  );
} 