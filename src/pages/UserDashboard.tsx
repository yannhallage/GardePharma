import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import MapComponent from '../components/map/MapComponent';
import PharmacyCards from '../components/pharmacy/PharmacyCards';
import { Toaster } from '../components/ui/toaster';
import { useToast } from '../hooks/use-toast';

// Données de test pour les pharmacies
const mockPharmacies = [
  {
    id: '1',
    name: 'Pharmacie du Centre',
    address: '123 Rue de la Paix, 75001 Paris',
    phone: '01 42 34 56 78',
    coordinates: [48.8566, 2.3522] as [number, number],
    isOnDuty: true,
    dutyHours: '20h00 - 08h00',
    rating: 4.5,
    distance: '0.5 km',
    capacity: 100,
    logo: '🏥',
    services: ['Médicaments', 'Conseils', 'Vaccination']
  },
  {
    id: '2',
    name: 'Pharmacie Saint-Michel',
    address: '456 Boulevard Saint-Michel, 75005 Paris',
    phone: '01 43 25 67 89',
    coordinates: [48.8441, 2.3439] as [number, number],
    isOnDuty: true,
    dutyHours: '19h00 - 07h00',
    rating: 4.2,
    distance: '0.7 km',
    capacity: 15,
    logo: '💊',
    services: ['Médicaments', 'Conseils']
  },
  {
    id: '3',
    name: 'Pharmacie de la Gare',
    address: '789 Avenue de la République, 75011 Paris',
    phone: '01 44 67 89 01',
    coordinates: [48.8631, 2.3889] as [number, number],
    isOnDuty: true,
    dutyHours: '19h00 - 07h00',
    rating: 4.0,
    distance: '0.3 km',
    capacity: 80,
    logo: '🏪',
    services: ['Médicaments', 'Conseils', 'Vaccination', 'Analyses']
  },
  {
    id: '4',
    name: 'Pharmacie du Quartier',
    address: '321 Rue de Rivoli, 75001 Paris',
    phone: '01 45 67 89 12',
    coordinates: [48.8584, 2.2945] as [number, number],
    isOnDuty: false,
    rating: 4.3,
    distance: '0.2 km',
    capacity: 0,
    logo: '🏥',
    services: ['Médicaments', 'Conseils']
  },
  {
    id: '5',
    name: 'Pharmacie de la Place',
    address: '654 Place de la Concorde, 75008 Paris',
    phone: '01 46 78 90 23',
    coordinates: [48.8654, 2.3212] as [number, number],
    isOnDuty: true,
    dutyHours: '20h00 - 08h00',
    rating: 4.1,
    distance: '0.4 km',
    capacity: 80,
    logo: '💊',
    services: ['Médicaments', 'Conseils', 'Vaccination']
  },
  {
    id: '6',
    name: 'Pharmacie de l\'Avenue',
    address: '987 Avenue des Champs-Élysées, 75008 Paris',
    phone: '01 47 89 01 34',
    coordinates: [48.8698, 2.3077] as [number, number],
    isOnDuty: true,
    dutyHours: '19h00 - 07h00',
    rating: 4.4,
    distance: '2.1 km',
    capacity: 100,
    logo: '🏪',
    services: ['Médicaments', 'Conseils', 'Vaccination', 'Analyses', 'Dermatologie']
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