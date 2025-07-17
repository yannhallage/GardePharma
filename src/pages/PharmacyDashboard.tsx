import { useState } from 'react';
import PlanningViewer from '../components/pharmacy/PlanningViewer';
import OnCallReportForm from '../components/pharmacy/OnCallReportForm';
import OnCallHistory from '../components/pharmacy/OnCallHistory';
import PharmacyProfileForm from '../components/pharmacy/PharmacyProfileForm';

const TABS = [
  { key: 'planning', label: 'Planning' },
  { key: 'report', label: 'Signaler une garde' },
  { key: 'guards', label: 'Mes gardes' },
  { key: 'history', label: 'Historique' },
  { key: 'account', label: 'Mon compte' },
];

export default function PharmacyDashboard() {
  const [activeTab, setActiveTab] = useState('planning');

  return (
    <div className="flex min-h-[70vh]">
      {/* Navigation latérale */}
      <nav className="w-56 bg-white border-r p-6 space-y-2">
        <h2 className="text-lg font-bold mb-4">Espace Pharmacie</h2>
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`w-full text-left px-4 py-2 rounded transition font-medium ${activeTab === tab.key ? 'bg-primary-100 text-primary-700' : 'hover:bg-neutral-100 text-neutral-700'}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      {/* Contenu principal */}
      <main className="flex-1 p-8">
        {activeTab === 'planning' && (
          <section>
            <h1 className="text-2xl font-bold mb-4">Planning des gardes</h1>
            <PlanningViewer />
          </section>
        )}
        {activeTab === 'report' && (
          <section>
            <h1 className="text-2xl font-bold mb-4">Signaler une garde</h1>
            <OnCallReportForm />
          </section>
        )}
        {activeTab === 'guards' && (
          <section>
            <h1 className="text-2xl font-bold mb-4">Mes gardes</h1>
            <div>Liste de mes gardes (à implémenter)</div>
          </section>
        )}
        {activeTab === 'history' && (
          <section>
            <h1 className="text-2xl font-bold mb-4">Historique des gardes</h1>
            <OnCallHistory />
          </section>
        )}
        {activeTab === 'account' && (
          <section>
            <h1 className="text-2xl font-bold mb-4">Mon compte</h1>
            <PharmacyProfileForm />
          </section>
        )}
      </main>
    </div>
  );
} 