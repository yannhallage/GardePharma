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
  commune: string;
  details: string;
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
    commune: 'Abobo',
    details: 'Située au centre commercial Abobo, à côté de la gare routière, facilement accessible par les transports en commun.',
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
    commune: 'Cocody',
    details: 'Localisée dans le quartier résidentiel d\'Angré, près du marché central, avec parking disponible.',
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
    commune: 'Yopougon',
    details: 'Située sur l\'avenue principale de Yopougon, à proximité de la mairie et de la poste centrale.',
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
    commune: 'Treichville',
    details: 'Localisée dans le quartier commercial de Treichville, près du port et de la gare ferroviaire.',
  },
  {
    id: '5',
    name: 'Pharmacie Treichville 2',
    address: 'Treichville, Abidjan',
    phone: '0102030409',
    coordinates: [5.3097, -4.0127],
    isOnDuty: true,
    rating: 4.1,
    distance: '3.6 km',
    capacity: 65,
    logo: '',
    dutyHours: "09h00",
    commune: 'Treichville',
    details: 'Située dans le marché de Treichville, à côté de la banque populaire, accès facile par taxi.',
  },
  {
    id: '6',
    name: 'Pharmacie Treichville 3',
    address: 'Treichville, Abidjan',
    phone: '0102030410',
    coordinates: [5.3097, -4.0127],
    isOnDuty: true,
    rating: 4.0,
    distance: '3.7 km',
    capacity: 75,
    logo: '',
    dutyHours: "10h00",
    commune: 'Treichville',
    details: 'Localisée près du stade municipal, dans une zone résidentielle calme avec accès piéton.',
  },
  {
    id: '7',
    name: 'Pharmacie Cocody 2',
    address: 'Cocody, Abidjan',
    phone: '0102030411',
    coordinates: [5.3556, -3.9864],
    isOnDuty: true,
    rating: 4.4,
    distance: '1.3 km',
    capacity: 85,
    logo: '',
    dutyHours: "11h00",
    commune: 'Cocody',
    details: 'Située dans le quartier des ambassades, près de l\'université Félix Houphouët-Boigny.',
  },
  {
    id: '8',
    name: 'Pharmacie Abobo 2',
    address: 'Abobo, Abidjan',
    phone: '0102030412',
    coordinates: [5.4275, -4.0037],
    isOnDuty: true,
    rating: 4.6,
    distance: '0.4 km',
    capacity: 95,
    logo: '',
    dutyHours: "12h00",
    commune: 'Abobo',
    details: 'Localisée dans le quartier populaire d\'Abobo, près de la mosquée centrale et du marché.',
  },
  {
    id: '9',
    name: 'Pharmacie Yopougon 2',
    address: 'Yopougon, Abidjan',
    phone: '0102030413',
    coordinates: [5.3751, -4.0707],
    isOnDuty: true,
    rating: 4.8,
    distance: '2.2 km',
    capacity: 88,
    logo: '',
    dutyHours: "13h00",
    commune: 'Yopougon',
    details: 'Située dans le quartier moderne de Yopougon, près du centre commercial et de la station-service.',
  },
  {
    id: '10',
    name: 'Pharmacie Treichville 4',
    address: 'Treichville, Abidjan',
    phone: '0102030414',
    coordinates: [5.3097, -4.0127],
    isOnDuty: true,
    rating: 4.2,
    distance: '3.8 km',
    capacity: 72,
    logo: '',
    dutyHours: "14h00",
    commune: 'Treichville',
    details: 'Localisée dans la zone industrielle de Treichville, près du port de pêche et des entrepôts.',
  },
];

function PharmacyList({ pharmacies }: { pharmacies: Pharmacy[] }) {
  if (!pharmacies.length) return <div className="text-gray-500 p-4">Aucune pharmacie de garde à cet endroit.</div>;
  
  // Grouper les pharmacies par commune
  const pharmaciesByCommune = pharmacies.reduce((acc, pharmacy) => {
    if (!acc[pharmacy.commune]) {
      acc[pharmacy.commune] = [];
    }
    acc[pharmacy.commune].push(pharmacy);
    return acc;
  }, {} as Record<string, Pharmacy[]>);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full min-h-0 overflow-y-auto overflow-x-hidden border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 text-sm font-bold">🏥</span>
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-800">Pharmacies de garde</h3>
            <p className="text-xs text-gray-500">Trouvez la pharmacie la plus proche</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400">Total</div>
          <div className="font-bold text-blue-600 text-sm">{pharmacies.length}</div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {Object.entries(pharmaciesByCommune).map(([commune, pharmaciesInCommune]) => (
          <div key={commune} className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              <h4 className="font-semibold text-xs text-gray-700 uppercase tracking-wide">{commune}</h4>
              <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">{pharmaciesInCommune.length} pharmacie{pharmaciesInCommune.length > 1 ? 's' : ''}</span>
            </div>
            <div className="flex flex-col gap-3">
              {pharmaciesInCommune.map((ph: Pharmacy) => (
                <div key={ph.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-3 p-3 hover:border-blue-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 flex items-center justify-center shadow-sm">
                        <span className="text-blue-600 text-sm font-bold">P</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-sm leading-tight text-gray-800 mb-1">{ph.name}</div>
                        <div className="text-xs text-gray-500 mb-1">{ph.distance}</div>
                        {ph.isOnDuty && ph.dutyHours && (
                          <span className="inline-block px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-xs font-semibold border border-green-200">
                            🕐 {ph.dutyHours}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded-full">
                      <Star className="w-3 h-3 text-yellow-400" fill="#facc15" />
                      <span className="text-xs font-bold text-gray-700">{ph.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-blue-500" />
                      <span className="font-medium">Cap: {ph.capacity}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-green-500" />
                      <span className="font-medium">{ph.phone}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded-md border-l-2 border-blue-200">
                    <span className="font-semibold text-gray-700">📍 </span>
                    <span className="text-gray-600">{ph.details}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
                    <a href={`tel:${ph.phone}`} className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors duration-200 font-medium text-xs" title="Appeler">
                      <Phone className="w-3 h-3" />
                      Appeler
                    </a>
                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${ph.coordinates[0]},${ph.coordinates[1]}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 font-medium text-xs" title="Itinéraire">
                      <Navigation className="w-3 h-3" />
                      Itinéraire
                    </a>
                  </div>
                </div>
              ))}
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
    <div className="flex flex-col md:flex-row w-full h-[calc(100vh-120px)] min-h-0 gap-4 box-border">
      <div className="w-full md:w-1/2 h-72 md:h-[calc(100vh-140px)] min-h-0 flex-1 rounded-lg overflow-hidden bg-white shadow">
        <MapComponent pharmacies={pharmacies} onMarkerClick={handleMarkerClick} />
      </div>
      <div className="w-full md:w-1/2 h-72 md:h-[calc(100vh-140px)] min-h-0 flex-1 flex flex-col">
        <PharmacyList pharmacies={pharmaciesToShow} />
      </div>
    </div>
  );
} 