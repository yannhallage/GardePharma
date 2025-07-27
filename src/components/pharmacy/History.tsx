import React from 'react';

const mockHistory = [
  { reference: 'PH-001', date: '2024-05-01', type: 'Jour', nom_pharmacie: 'Pharmacie du Centre', responsable: 'Dr. Martin', commune: 'Paris', statut: 'Effectuée', commentaire: 'RAS' },
  { reference: 'PH-002', date: '2024-04-15', type: 'Nuit', nom_pharmacie: 'Pharmacie Saint-Michel', responsable: 'Dr. Dupuis', commune: 'Paris', statut: 'Signalée', commentaire: 'Indisponibilité' },
  { reference: 'PH-003', date: '2024-03-20', type: 'Week-end', nom_pharmacie: 'Pharmacie de la Gare', responsable: 'Dr. Bernard', commune: 'Lyon', statut: 'Effectuée', commentaire: '' },
];

function statusBadge(statut: string) {
  if (statut === 'Effectuée') {
    return <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-semibold">Effectuée</span>;
  }
  if (statut === 'Signalée') {
    return <span className="bg-yellow-50 text-yellow-700 border border-yellow-200 px-3 py-1 rounded-full text-xs font-semibold">Signalée</span>;
  }
  return <span className="bg-gray-100 text-gray-700 border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold">{statut}</span>;
}

export default function History() {
  return (
    <div className="bg-white rounded shadow p-6 max-w-5xl mx-auto">
      <div className="text-gray-800 font-bold mb-4 text-base">Historique</div>
      <table className="min-w-full border rounded overflow-hidden text-sm border-gray-200">
        <thead>
          <tr className="bg-gray-50 text-gray-700">
            <th className="px-4 py-2 text-left">Référence</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Nom pharmacie</th>
            <th className="px-4 py-2 text-left">Responsable</th>
            <th className="px-4 py-2 text-left">Commune</th>
            <th className="px-4 py-2 text-left">Statut</th>
            <th className="px-4 py-2 text-left">Commentaire</th>
          </tr>
        </thead>
        <tbody>
          {mockHistory.map((row, i) => (
            <tr key={i} className="border-t hover:bg-gray-100 transition">
              <td className="px-4 py-2 font-semibold text-gray-900">{row.reference}</td>
              <td className="px-4 py-2 font-medium text-gray-900">{row.date}</td>
              <td className="px-4 py-2 text-gray-800">{row.type}</td>
              <td className="px-4 py-2 text-gray-800">{row.nom_pharmacie}</td>
              <td className="px-4 py-2 text-gray-800">{row.responsable}</td>
              <td className="px-4 py-2 text-gray-800">{row.commune}</td>
              <td className="px-4 py-2">{statusBadge(row.statut)}</td>
              <td className="px-4 py-2 text-gray-700 italic">{row.commentaire || <span className="text-neutral-400">—</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 