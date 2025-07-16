import React, { useState } from 'react';
import { Search, Filter, MapPin, List } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import MapComponent from '../components/map/MapComponent';
import PharmacyCard from '../components/pharmacy/PharmacyCard';

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
    distance: '0.8 km'
  },
  {
    id: '2',
    name: 'Pharmacie Saint-Michel',
    address: '456 Boulevard Saint-Michel, 75005 Paris',
    phone: '01 43 25 67 89',
    coordinates: [48.8441, 2.3439] as [number, number],
    isOnDuty: false,
    rating: 4.2,
    distance: '1.2 km'
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
    distance: '2.1 km'
  },
];

const UserDashboard: React.FC = () => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyOnDuty, setShowOnlyOnDuty] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState<any>(null);

  const filteredPharmacies = mockPharmacies.filter(pharmacy => {
    const matchesSearch = pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDutyFilter = !showOnlyOnDuty || pharmacy.isOnDuty;
    return matchesSearch && matchesDutyFilter;
  });

  const handlePharmacySelect = (pharmacy: any) => {
    setSelectedPharmacy(pharmacy);
  };

  const handleCall = (pharmacy: any) => {
    console.log('Appel de la pharmacie:', pharmacy.name);
    // Ici on pourrait ajouter une logique pour tracker les appels
  };

  return (
    <div className="space-y-6">
      {/* Header avec recherche et filtres */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">
            Pharmacies de Garde
          </h1>
          <p className="text-neutral-600">
            Trouvez rapidement une pharmacie de garde près de chez vous
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'map' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('map')}
          >
            <MapPin className="h-4 w-4 mr-2" />
            Carte
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4 mr-2" />
            Liste
          </Button>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Rechercher une pharmacie ou une adresse..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={showOnlyOnDuty ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowOnlyOnDuty(!showOnlyOnDuty)}
              >
                <Filter className="h-4 w-4 mr-2" />
                En garde uniquement
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contenu principal */}
      {viewMode === 'map' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MapComponent
              pharmacies={filteredPharmacies}
              onPharmacySelect={handlePharmacySelect}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-800">
              Pharmacies à proximité
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredPharmacies.slice(0, 3).map((pharmacy) => (
                <PharmacyCard
                  key={pharmacy.id}
                  pharmacy={pharmacy}
                  onCall={handleCall}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPharmacies.map((pharmacy) => (
            <PharmacyCard
              key={pharmacy.id}
              pharmacy={pharmacy}
              onCall={handleCall}
            />
          ))}
        </div>
      )}

      {/* Statistiques */}
      <Card>
        <CardHeader>
          <CardTitle>Statistiques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary-600">
                {filteredPharmacies.length}
              </div>
              <div className="text-sm text-neutral-600">Pharmacies trouvées</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {filteredPharmacies.filter(p => p.isOnDuty).length}
              </div>
              <div className="text-sm text-neutral-600">En garde actuellement</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent-600">
                {filteredPharmacies.length > 0 ? 
                  (filteredPharmacies.reduce((acc, p) => acc + (p.rating || 0), 0) / filteredPharmacies.length).toFixed(1) : 
                  '0'
                }
              </div>
              <div className="text-sm text-neutral-600">Note moyenne</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard; 