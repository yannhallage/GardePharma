import React from 'react';
import { useHistorique } from '@/hooks/useHistoriques';
import { getSession } from '@/helpers/local-storage';

// const mockHistory = [
//   { reference: 'PH-001', date: '2024-05-01', type: 'Jour', nom_pharmacie: 'Pharmacie du Centre', responsable: 'Dr. Martin', commune: 'Paris', statut: 'Effectuée', commentaire: 'RAS' },
//   { reference: 'PH-002', date: '2024-04-15', type: 'Nuit', nom_pharmacie: 'Pharmacie Saint-Michel', responsable: 'Dr. Dupuis', commune: 'Paris', statut: 'Signalée', commentaire: 'Indisponibilité' },
//   { reference: 'PH-003', date: '2024-03-20', type: 'Week-end', nom_pharmacie: 'Pharmacie de la Gare', responsable: 'Dr. Bernard', commune: 'Lyon', statut: 'Effectuée', commentaire: '' },
// ];

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
  const { data: historique, loading, error } = useHistorique(getSession()?.userId ?? '');

  return (
    <div className="bg-white rounded shadow p-6 max-w-5xl mx-auto">
      <div className="text-gray-800 font-bold mb-4 text-base">Historique</div>

      {loading && <p className="text-sm text-gray-500">Chargement en cours…</p>}
      {error && <p className="text-sm text-red-500">Erreur : {error}</p>}

      {!loading && !error && (
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
            {
              historique.length > 0 ? (
                historique.map((item) => (
                  <tr key={item.reference}>
                    <td className="px-4 py-2">{item.reference}</td>
                    <td className="px-4 py-2">{item.date}</td>
                    <td className="px-4 py-2">{item.type}</td>
                    <td className="px-4 py-2">{item.nom_pharmacie}</td>
                    <td className="px-4 py-2">{item.responsable}</td>
                    <td className="px-4 py-2">{item.commune}</td>
                    <td className="px-4 py-2">{statusBadge(item.statut)}</td>
                    <td className="px-4 py-2">{item.commentaire}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-2 text-center text-gray-500">
                    Aucune information disponible
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      )}
    </div>
  );
}