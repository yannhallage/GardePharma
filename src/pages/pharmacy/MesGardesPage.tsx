import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { useGardes } from '@/hooks/useGardes';

import { getSession } from '@/helpers/local-storage';
import { Phone,RefreshCcw } from 'lucide-react';

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
  const { gardes, loading, error } = useGardes(getSession()?.userId ?? '', 'pharmacy');

  return (
    <Card className="border border-gray-200 bg-white shadow-sm rounded-xl overflow-hidden">
      <CardHeader className="border-b border-gray-100 bg-gray-50 px-6 py-4">
        <CardTitle className="text-gray-800 text-lg font-bold tracking-tight">
          Gestion des gardes
          {/* <span className='float-end text-gray-400'>
            <RefreshCcw />
          </span> */}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-0">
        {loading && (
          <p className="text-sm text-gray-500 px-6 py-4">Chargement en cours…</p>
        )}
        {error && (
          <p className="text-sm text-red-500 px-6 py-4">Erreur : {error}</p>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border-t border-gray-200">
              <thead>
                <tr className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
                  <th className="px-4 py-3 text-left">Pharmacie</th>
                  <th className="px-4 py-3 text-left">Titulaire</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Statut</th>
                  <th className="px-4 py-3 text-left">Commentaire</th>
                </tr>
              </thead>
              <tbody>
                {gardes.length > 0 ? (
                  gardes.map((garde, index) => (
                    <tr
                      key={index}
                      className="border-b last:border-0 hover:bg-gray-50 transition"
                    >
                      <td
                        className="px-4 py-3 font-medium text-gray-900 truncate"
                        title={garde.nom_pharmacie}
                      >
                        {garde.nom_pharmacie}
                      </td>
                      <td
                        className="px-4 py-3 text-gray-700 truncate"
                        title={garde.responsable}
                      >
                        {garde.responsable}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{garde.date}</td>
                      <td className="px-4 py-3 text-gray-600">{garde.type}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full border ${garde.statut === 'en cours'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                            }`}
                        >
                          {garde.statut}
                        </span>
                      </td>
                      <td
                        className="px-4 py-3 text-gray-600 truncate"
                        title={garde.commentaire}
                      >
                        {garde.commentaire || '—'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-500">
                      Aucune garde en cours.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>

  );
};

export default MesGardesPage; 