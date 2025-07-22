import React from 'react';
// import Calendar from 'react-calendar'; // Décommente si react-calendar est installé
// import 'react-calendar/dist/Calendar.css';

const nextDuty = {
  date: '2024-06-10',
  time: '20h00 - 08h00',
  status: 'Confirmée',
};

const upcomingDuties = [
  { date: '2024-06-10', time: '20h00 - 08h00', status: 'Confirmée' },
  { date: '2024-06-17', time: '20h00 - 08h00', status: 'En attente' },
  { date: '2024-06-24', time: '20h00 - 08h00', status: 'Confirmée' },
];

export default function PlanningViewer() {
  // const [date, setDate] = React.useState(new Date());
  return (
    <div className="space-y-8">
      {/* Résumé prochaine garde */}
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded shadow flex items-center gap-4">
        <div className="text-4xl">🕒</div>
        <div>
          <div className="text-lg font-semibold text-green-700">Prochaine garde</div>
          <div className="text-2xl font-bold text-green-900">{nextDuty.date}</div>
          <div className="text-green-800">{nextDuty.time} — <span className="font-medium">{nextDuty.status}</span></div>
        </div>
      </div>
      {/* Calendrier (placeholder stylisé) */}
      <div className="bg-white rounded shadow p-6 flex flex-col items-center">
        <div className="text-green-700 font-bold mb-2">Calendrier des gardes</div>
        <div className="w-full max-w-md border rounded p-4 bg-green-50 text-center text-green-600">
          [Calendrier à intégrer ici]
        </div>
        {/* Exemple d'intégration :
        <Calendar onChange={setDate} value={date} />
        */}
      </div>
      {/* Liste des gardes à venir */}
      <div className="bg-white rounded shadow p-6">
        <div className="text-green-700 font-bold mb-2">Gardes à venir</div>
        <ul className="divide-y">
          {upcomingDuties.map((duty, i) => (
            <li key={i} className="py-2 flex justify-between items-center">
              <span className="font-medium text-green-900">{duty.date}</span>
              <span className="text-green-700">{duty.time}</span>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${duty.status === 'Confirmée' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{duty.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 