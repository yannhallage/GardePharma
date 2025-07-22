import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';

const GARDE_EVENTS_FC = [
  { title: '🌙 Garde de nuit', start: '2025-07-05', backgroundColor: '#dcfce7' },
  { title: '🎉 Garde férié', start: '2025-07-13', backgroundColor: '#fee2e2' },
  { title: '🌙 Garde de nuit', start: '2025-07-20', backgroundColor: '#fef9c3' },
];

const MesGardesPage = () => (
  <Card>
    <CardHeader>
      <CardTitle>Mes Gardes</CardTitle>
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
);

export default MesGardesPage; 