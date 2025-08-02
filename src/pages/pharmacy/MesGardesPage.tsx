import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { useGardes } from '@/hook/useGardes';

// const GARDE_DATA = [
//   {
//     pharmacie: 'Pharmacie du Centre',
//     titulaire: 'Dr. Martin',
//     date: '10/06/2024',
//     type: 'Jour',
//     statut: 'En cours',
//     statutColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
//     commentaire: 'Remplacement exceptionnel',
//   },
//   {
//     pharmacie: 'Pharmacie Saint-Michel',
//     titulaire: 'Dr. Dupuis',
//     date: '11/06/2024',
//     type: 'Nuit',
//     statut: 'En attente',
//     statutColor: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
//     commentaire: '',
//   },
//   {
//     pharmacie: 'Pharmacie du Centre',
//     titulaire: 'Dr. Bernard',
//     date: '12/06/2024',
//     type: 'Week-end',
//     statut: 'En attente',
//     statutColor: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
//     commentaire: '',
//   },
//   {
//     pharmacie: 'Pharmacie Saint-Michel',
//     titulaire: 'Dr. Leroy',
//     date: '09/06/2024',
//     type: 'Jour',
//     statut: 'En cours',
//     statutColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
//     commentaire: 'Garde prolongée',
//   },
// ];

const MesGardesPage = () => {
  const { gardes, loading, error } = useGardes();

  return (
    <Card className="border border-gray-200 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-800 text-xl font-bold tracking-tight">Gestion des gardes</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <p className="text-sm text-gray-500">Chargement en cours…</p>}
        {error && <p className="text-sm text-red-500">Erreur : {error}</p>}

        {!loading && !error && (
          <table className="w-full text-[15px] rounded-2xl overflow-hidden shadow border border-gray-200">
            <thead>
              <tr className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
                <th className="py-3 px-2 rounded-tl-lg">Pharmacie</th>
                <th className="px-2">Titulaire</th>
                <th className="px-2">Date</th>
                <th className="px-2">Type</th>
                <th className="px-2">Statut</th>
                <th className="px-2">Commentaire</th>
              </tr>
            </thead>
            <tbody>
              {gardes.map((garde) => (
                <tr
                  key={garde.id}
                  className="border-b last:border-0 transition-colors hover:bg-gray-100 group"
                >
                  <td className="py-3 px-2 font-semibold text-gray-900 whitespace-nowrap">{garde.pharmacie}</td>
                  <td className="px-2 text-gray-700 whitespace-nowrap">{garde.titulaire}</td>
                  <td className="px-2 text-gray-700 whitespace-nowrap">{garde.date}</td>
                  <td className="px-2 text-gray-700 whitespace-nowrap">{garde.type}</td>
                  <td className="px-2">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${garde.statutColor} shadow-sm`}>
                      {garde.statut}
                    </span>
                  </td>
                  <td className="px-2 italic text-gray-500">
                    {garde.commentaire ? garde.commentaire : <span className="opacity-40">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  );
};

export default MesGardesPage; 