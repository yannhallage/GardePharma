import React from 'react';

const mockHistory = [
  { date: '2024-05-01', status: 'Effectuée', comment: 'RAS' },
  { date: '2024-04-15', status: 'Signalée', comment: 'Indisponibilité' },
  { date: '2024-03-20', status: 'Effectuée', comment: '' },
];

export default function OnCallHistory() {
  return (
    <div className="bg-white rounded shadow p-6 max-w-2xl mx-auto">
      <div className="text-green-700 font-bold mb-4 text-lg">Historique des gardes</div>
      <table className="min-w-full border rounded overflow-hidden">
        <thead>
          <tr className="bg-green-50">
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Statut</th>
            <th className="px-4 py-2 text-left">Commentaire</th>
          </tr>
        </thead>
        <tbody>
          {mockHistory.map((row, i) => (
            <tr key={i} className="border-t hover:bg-green-50 transition">
              <td className="px-4 py-2 font-medium text-green-900">{row.date}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${row.status === 'Effectuée' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{row.status}</span>
              </td>
              <td className="px-4 py-2 text-green-700">{row.comment || <span className="text-neutral-400">—</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 