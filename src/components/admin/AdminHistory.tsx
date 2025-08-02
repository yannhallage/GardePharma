import { useAdminHistory } from '@/hooks/useAdminHistory';

// const mockAdminHistory = [
//   { reference: 'REF-001', date: '2024-05-10', action: 'Ajout', user: 'Admin1', responsible: 'Admin2', details: 'Pharmacie du Centre' },
//   { reference: 'REF-002', date: '2024-05-08', action: 'Modification', user: 'Admin2', responsible: 'Admin1', details: 'Rôle de Pharmacie Saint-Michel' },
//   { reference: 'REF-003', date: '2024-05-05', action: 'Suppression', user: 'Admin1', responsible: 'Admin2', details: 'Garde du 2024-05-12' },
// ];

export default function AdminHistory() {
  const { history, loading } = useAdminHistory();
  if (loading) return <div className="text-center text-gray-500">Chargement...</div>;
  return (
    <div className="bg-white rounded shadow p-6 max-w-2xl mx-auto">
      <div className="text-gray-800 font-bold mb-4 text-base">Historiques</div>

      {history.length === 0 ? (
        <div className="text-center text-gray-500 italic">Aucun historique disponible.</div>
      ) : (
        <table className="min-w-full border rounded overflow-hidden text-sm border-gray-200">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="px-4 py-2 text-left">Référence</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Action</th>
              <th className="px-4 py-2 text-left">Utilisateur</th>
              <th className="px-4 py-2 text-left">Responsable</th>
              <th className="px-4 py-2 text-left">Détails</th>
            </tr>
          </thead>
          <tbody>
            {history.map((row, i) => (
              <tr key={i} className="border-t hover:bg-gray-100 transition">
                <td className="px-4 py-2 font-semibold text-gray-900">{row.reference}</td>
                <td className="px-4 py-2 font-medium text-gray-900">{row.date}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${row.action === 'Ajout'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : row.action === 'Modification'
                      ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                    {row.action}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-800">{row.user}</td>
                <td className="px-4 py-2 text-gray-800">{row.responsible}</td>
                <td className="px-4 py-2 text-gray-700">
                  {row.details || <span className="text-neutral-400">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 