import React from 'react';
import MapComponent from '../map/MapComponent';
import { Phone, Navigation, Star, Users, Clock } from 'lucide-react';

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  coordinates: [number, number];
  isOnDuty: boolean;
  rating: number;
  distance: string;
  capacity: number;
  logo: string;
  dutyHours?: string;
}

const pharmacies: Pharmacy[] = [
  {
    id: '1',
    name: 'Pharmacie Abobo Centre',
    address: 'Abobo, Abidjan',
    phone: '0102030405',
    coordinates: [5.4275, -4.0037],
    isOnDuty: true,
    rating: 4.5,
    distance: '0.3 km',
    capacity: 80,
    logo: '',
    dutyHours: "07h00",
  },
  {
    id: '2',
    name: 'Pharmacie Cocody Angré',
    address: 'Cocody, Abidjan',
    phone: '0102030406',
    coordinates: [5.3556, -3.9864],
    isOnDuty: false,
    rating: 4.2,
    distance: '1.2 km',
    capacity: 60,
    logo: '',
    dutyHours: "22h00",
  },
  {
    id: '3',
    name: 'Pharmacie Yopougon',
    address: 'Yopougon, Abidjan',
    phone: '0102030407',
    coordinates: [5.3751, -4.0707],
    isOnDuty: true,
    rating: 4.7,
    distance: '2.1 km',
    capacity: 90,
    logo: '',
    dutyHours: "06h00",
  },
  {
    id: '4',
    name: 'Pharmacie Treichville',
    address: 'Treichville, Abidjan',
    phone: '0102030408',
    coordinates: [5.3097, -4.0127],
    isOnDuty: true,
    rating: 4.3,
    distance: '3.5 km',
    capacity: 70,
    logo: '',
    dutyHours: "08h00",
  },
];

function PharmacyList({ pharmacies }: { pharmacies: Pharmacy[] }) {
  if (!pharmacies.length) return <div className="text-gray-500 p-4">Aucune pharmacie de garde à cet endroit.</div>;
  return (
    <div className="bg-white rounded shadow p-4 h-full min-h-0 overflow-y-auto overflow-x-hidden">
      <h3 className="font-semibold text-base mb-3">Pharmacies de garde</h3>
      <div className="flex flex-col gap-3">
        {pharmacies.map((ph: Pharmacy) => (
          <div key={ph.id} className="bg-white border rounded-xl shadow flex flex-col gap-2 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-lg">
                  <span role="img" aria-label="pharmacie">🏥</span>
                </div>
                <div>
                  <div className="font-semibold text-sm leading-tight">{ph.name}</div>
                  <div className="text-xs text-gray-500">{ph.distance}</div>
                </div>
                {ph.isOnDuty && ph.dutyHours && (
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-200">Ouvert jusqu'à {ph.dutyHours}</span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-yellow-400" fill="#facc15" />
                <span className="text-xs font-semibold text-gray-700">{ph.rating}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
              <Users className="w-3.5 h-3.5" />
              <span>Capacité: {ph.capacity}%</span>
            </div>
            <div className="flex items-center gap-4 mt-2 float-right">
              <a href={`tel:${ph.phone}`} className="text-green-600 hover:text-green-800" title="Appeler"><Phone className="w-4 h-4" /></a>
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${ph.coordinates[0]},${ph.coordinates[1]}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800" title="Itinéraire"><Navigation className="w-4 h-4" /></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FullCalendarView() {
  const [selectedPharmacies, setSelectedPharmacies] = React.useState<Pharmacy[] | null>(null);

  // Par défaut, la liste affiche toutes les pharmacies de garde
  const pharmaciesToShow = selectedPharmacies !== null ? selectedPharmacies : pharmacies.filter(p => p.isOnDuty);

  const handleMarkerClick = (pharmaciesAtLocation: Pharmacy[]) => {
    setSelectedPharmacies(pharmaciesAtLocation);
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-[calc(100vh-120px)] min-h-0 gap-4 p-4 box-border overflow-x-hidden">
      <div className="w-full md:w-1/2 h-72 md:h-full min-h-0 flex-1 rounded-lg overflow-hidden bg-white shadow">
        <MapComponent pharmacies={pharmacies} onMarkerClick={handleMarkerClick} />
      </div>
      <div className="w-full md:w-1/2 h-72 md:h-full min-h-0 flex-1 flex flex-col">
        <PharmacyList pharmacies={pharmaciesToShow} />
      </div>
    </div>
  );
} 