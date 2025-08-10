import React, { useState } from 'react';
import { getSession } from '@/helpers/local-storage';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { MapPin } from 'lucide-react';

// const pharmacyName = 'Pharmacie du Soleil';
const GARDE_EVENTS_FC = [
  { title: '🌙 Garde de nuit', start: '2025-07-05', backgroundColor: '#dcfce7' },
  { title: '🎉 Garde férié', start: '2025-07-13', backgroundColor: '#fee2e2' },
  { title: '🌙 Garde de nuit', start: '2025-07-20', backgroundColor: '#fef9c3' },
];

const QuickStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <Card>
      <CardContent className="py-4">
        <div className="text-2xl font-bold text-blue-700">3</div>
        <div className="text-sm text-blue-700">Gardes prévues ce mois</div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="py-4">
        <div className="text-lg font-semibold text-green-700">12 juillet</div>
        <div className="text-sm text-green-700">Dernière garde</div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="py-4">
        <div className="text-lg font-semibold text-purple-700">26 juillet</div>
        <div className="text-sm text-purple-700">Prochaine garde</div>
      </CardContent>
    </Card>
  </div>
);

const DashboardPage = () => {
  const [pharmacyName, setPharmacyName] = useState(getSession()?.userNom ?? '')
  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Bonjour, {pharmacyName}. Voici un résumé de vos prochaines gardes.</CardTitle>
        </CardHeader>
        <CardContent>
          <QuickStats />
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Gardes à venir</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="py-2">Date</th>
                  <th>Type</th>
                  <th>État</th>
                  <th>Observations</th>
                </tr>
              </thead>
              <tbody>
                {GARDE_EVENTS_FC.map((garde, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-2">{garde.start}</td>
                    <td>{garde.title.includes('🌙') ? 'Nuit' : 'Férié'}</td>
                    <td><span className={`px-2 py-1 rounded text-xs font-semibold ${garde.backgroundColor}`}>{garde.title.includes('🌙') ? 'En attente' : 'Refusée'}</span></td>
                    <td>-</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle><MapPin className="mr-2 text-primary-600 inline" /> Pharmacies en garde aujourd'hui</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>Pharmacie du Centre</li>
              <li>Pharmacie de la Gare</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DashboardPage; 