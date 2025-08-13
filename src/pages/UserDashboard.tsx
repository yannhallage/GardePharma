import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import MapComponent from '../components/map/MapComponent';
import PharmacyCards from '../components/pharmacy/PharmacyCards';
import { Toaster } from '../components/ui/toast';
import { useToast } from '../hooks/use-toast';

// Données de test pour les pharmacies
const mockPharmacies = [
  // --- Treichville ---
  {
    id: 'treich-1',
    name: 'Pharmacie Treichville 1',
    address: 'Rue 12, Treichville',
    commune: 'Treichville',
    phone: '+225 01 23 45 67',
    coordinates: [5.3047502, -4.0096444] as [number, number],
    isOnDuty: true,
    rating: 4.3,
    distance: '1.2 km',
    capacity: 90,
    logo: '💊',
    services: ['Médicaments', 'Conseils', 'Vaccination']
  },
  {
    id: 'treich-2',
    name: 'Pharmacie Treichville 2',
    address: 'Boulevard de Marseille, Treichville',
    commune: 'Treichville',
    phone: '+225 01 23 45 68',
    coordinates: [5.305686, -4.006521] as [number, number],
    isOnDuty: false,
    rating: 4.0,
    distance: '1.5 km',
    capacity: 70,
    logo: '💊',
    services: ['Médicaments', 'Parapharmacie']
  },
  {
    id: 'treich-3',
    name: 'Pharmacie Treichville 3',
    address: 'Rue du Canal, Treichville',
    commune: 'Treichville',
    phone: '+225 01 23 45 69',
    coordinates: [5.306766, -4.010507] as [number, number],
    isOnDuty: true,
    rating: 4.5,
    distance: '1.8 km',
    capacity: 80,
    logo: '💊',
    services: ['Médicaments', 'Conseils']
  },
  {
    id: 'treich-4',
    name: 'Pharmacie Treichville 4',
    address: 'Avenue 16, Treichville',
    commune: 'Treichville',
    phone: '+225 01 23 45 70',
    coordinates: [5.300746, -4.000238] as [number, number],
    isOnDuty: false,
    rating: 3.9,
    distance: '2.0 km',
    capacity: 65,
    logo: '💊',
    services: ['Médicaments']
  },
  {
    id: 'treich-5',
    name: 'Pharmacie Treichville 5',
    address: 'Boulevard du Port, Treichville',
    commune: 'Treichville',
    phone: '+225 01 23 45 71',
    coordinates: [5.306336, -4.014826] as [number, number],
    isOnDuty: true,
    rating: 4.2,
    distance: '2.3 km',
    capacity: 75,
    logo: '💊',
    services: ['Médicaments', 'Vaccination']
  },

  // --- Marcory ---
  {
    id: 'marcory-1',
    name: 'Pharmacie Marcory 1',
    address: 'Rue 20, Marcory',
    commune: 'Marcory',
    phone: '+225 01 23 46 00',
    coordinates: [5.303209, -3.984277] as [number, number],
    isOnDuty: false,
    rating: 4.4,
    distance: '3.0 km',
    capacity: 95,
    logo: '💊',
    services: ['Médicaments', 'Conseils']
  },
  {
    id: 'marcory-2',
    name: 'Pharmacie Marcory 2',
    address: 'Avenue Hibiscus, Marcory',
    commune: 'Marcory',
    phone: '+225 01 23 46 01',
    coordinates: [5.302742, -3.980482] as [number, number],
    isOnDuty: true,
    rating: 4.0,
    distance: '3.3 km',
    capacity: 85,
    logo: '💊',
    services: ['Médicaments', 'Parapharmacie']
  },
  {
    id: 'marcory-3',
    name: 'Pharmacie Marcory 3',
    address: 'Rue du Canal, Marcory',
    commune: 'Marcory',
    phone: '+225 01 23 46 02',
    coordinates: [5.305588, -3.983106] as [number, number],
    isOnDuty: false,
    rating: 4.1,
    distance: '3.5 km',
    capacity: 70,
    logo: '💊',
    services: ['Médicaments']
  },
  {
    id: 'marcory-4',
    name: 'Pharmacie Marcory 4',
    address: 'Boulevard du Gabon, Marcory',
    commune: 'Marcory',
    phone: '+225 01 23 46 03',
    coordinates: [5.306661, -3.991025] as [number, number],
    isOnDuty: true,
    rating: 4.3,
    distance: '3.8 km',
    capacity: 80,
    logo: '💊',
    services: ['Médicaments', 'Vaccination']
  },
  {
    id: 'marcory-5',
    name: 'Pharmacie Marcory 5',
    address: 'Avenue 8, Marcory',
    commune: 'Marcory',
    phone: '+225 01 23 46 04',
    coordinates: [5.309505, -3.992765] as [number, number],
    isOnDuty: false,
    rating: 4.0,
    distance: '4.0 km',
    capacity: 60,
    logo: '💊',
    services: ['Médicaments']
  },
  {
    id: 'marcory-6',
    name: 'Pharmacie Marcory 6',
    address: 'Rue du Stade, Marcory',
    commune: 'Marcory',
    phone: '+225 01 23 46 05',
    coordinates: [5.302666, -3.969453] as [number, number],
    isOnDuty: true,
    rating: 4.5,
    distance: '4.2 km',
    capacity: 90,
    logo: '💊',
    services: ['Médicaments', 'Conseils']
  },

  // --- Plateau ---
  {
    id: 'plateau-1',
    name: 'Pharmacie Plateau 1',
    address: 'Boulevard de la République, Plateau',
    commune: 'Plateau',
    phone: '+225 01 23 47 00',
    coordinates: [5.331086, -4.022268] as [number, number],
    isOnDuty: false,
    rating: 4.6,
    distance: '5.0 km',
    capacity: 100,
    logo: '💊',
    services: ['Médicaments', 'Conseils', 'Vaccination']
  },
  {
    id: 'plateau-2',
    name: 'Pharmacie Plateau 2',
    address: 'Avenue Marchand, Plateau',
    commune: 'Plateau',
    phone: '+225 01 23 47 01',
    coordinates: [5.336840, -4.021778] as [number, number],
    isOnDuty: true,
    rating: 4.3,
    distance: '5.2 km',
    capacity: 85,
    logo: '💊',
    services: ['Médicaments']
  },
  {
    id: 'plateau-3',
    name: 'Pharmacie Plateau 3',
    address: 'Rue du Commerce, Plateau',
    commune: 'Plateau',
    phone: '+225 01 23 47 02',
    coordinates: [5.333261, -4.026165] as [number, number],
    isOnDuty: false,
    rating: 4.1,
    distance: '5.4 km',
    capacity: 75,
    logo: '💊',
    services: ['Médicaments', 'Parapharmacie']
  },
  {
    id: 'plateau-4',
    name: 'Pharmacie Plateau 4',
    address: 'Boulevard Carde, Plateau',
    commune: 'Plateau',
    phone: '+225 01 23 47 03',
    coordinates: [5.322264, -4.018370] as [number, number],
    isOnDuty: true,
    rating: 4.4,
    distance: '5.6 km',
    capacity: 80,
    logo: '💊',
    services: ['Médicaments', 'Conseils']
  }
];

const UserDashboard: React.FC = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'map' | 'cards'>('map');
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyOnDuty, setShowOnlyOnDuty] = useState(true);
  const [sortBy, setSortBy] = useState<'nearest' | 'rating' | 'name'>('nearest');
  const [selectedPharmacy, setSelectedPharmacy] = useState<any>(null);

  const filteredPharmacies = mockPharmacies
    .filter(pharmacy => {
      const matchesSearch = pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDutyFilter = !showOnlyOnDuty || pharmacy.isOnDuty;
      return matchesSearch && matchesDutyFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'nearest':
          return parseFloat(a.distance) - parseFloat(b.distance);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const handlePharmacySelect = (pharmacy: any) => {
    setSelectedPharmacy(pharmacy);
  };

  const handleCall = (pharmacy: any) => {
    window.open(`tel:${pharmacy.phone}`, '_self');
    toast({
      title: "Appel en cours",
      description: `Connexion à ${pharmacy.name}...`,
      variant: "info",
    });
  };

  const handleNavigate = (pharmacy: any) => {
    const [lat, lng] = pharmacy.coordinates;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
    toast({
      title: "Itinéraire ouvert",
      description: `Navigation vers ${pharmacy.name} dans Google Maps`,
      variant: "success",
    });
  };

  return (
    <div className="dashboard-container">
      <style>{`
        .dashboard-container {
          height: 100vh;
          background: #f8fafc;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        
        .dashboard-content {
          flex: 1;
          display: flex;
          min-height: 0;
          overflow: hidden;
        }
        
        .main-area {
          flex: 1;
          background: #f8fafc;
          min-width: 0;
          overflow: hidden;
        }
        
        /* Correction pour le zoom 100% */
        @media screen and (min-resolution: 1dppx) {
          .dashboard-container {
            transform: scale(1);
          }
        }
        
        /* Assurer que les éléments restent visibles au zoom 100% */
        * {
          box-sizing: border-box;
        }
        
        /* Correction pour les polices au zoom 100% */
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-size: 14px;
        }
        
        /* Réduction globale des tailles de police */
        .text-xs {
          font-size: 11px;
          line-height: 14px;
        }
        
        .text-sm {
          font-size: 13px;
          line-height: 16px;
        }
        
        .text-lg {
          font-size: 16px;
          line-height: 20px;
        }
      `}</style>

      <Header />

      <div className="dashboard-content">

        <div className=''>
          <Sidebar
            pharmacies={filteredPharmacies}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            showOnlyOnDuty={showOnlyOnDuty}
            setShowOnlyOnDuty={setShowOnlyOnDuty}
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
            selectedPharmacy={selectedPharmacy}
            onPharmacySelect={handlePharmacySelect}
            onCall={handleCall}
            onNavigate={handleNavigate}
          />
        </div>
        <div className="main-area">
          {viewMode === 'map' ? (
            <MapComponent
              pharmacies={filteredPharmacies}
              onPharmacySelect={handlePharmacySelect}
            />
          ) : (
            <PharmacyCards
              pharmacies={filteredPharmacies}
              onCall={handleCall}
              onNavigate={handleNavigate}
            />
          )}
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default UserDashboard;

