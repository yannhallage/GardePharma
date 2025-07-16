import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Phone, MapPin, Clock, Star, Navigation } from 'lucide-react';

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  coordinates: [number, number];
  isOnDuty: boolean;
  dutyHours?: string;
  rating?: number;
  distance?: string;
}

interface PharmacyCardProps {
  pharmacy: Pharmacy;
  onCall?: (pharmacy: Pharmacy) => void;
  onNavigate?: (pharmacy: Pharmacy) => void;
  onSelect?: (pharmacy: Pharmacy) => void;
}

const PharmacyCard: React.FC<PharmacyCardProps> = ({
  pharmacy,
  onCall,
  onNavigate,
  onSelect,
}) => {
  const handleCall = () => {
    if (onCall) {
      onCall(pharmacy);
    } else {
      window.open(`tel:${pharmacy.phone}`, '_self');
    }
  };

  const handleNavigate = () => {
    if (onNavigate) {
      onNavigate(pharmacy);
    } else {
      const [lat, lng] = pharmacy.coordinates;
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
    }
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-neutral-800">
              {pharmacy.name}
            </CardTitle>
            <div className="flex items-center mt-1 text-sm text-neutral-600">
              <MapPin className="h-4 w-4 mr-1" />
              {pharmacy.address}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {pharmacy.rating && (
              <div className="flex items-center text-sm text-neutral-600">
                <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                {pharmacy.rating}
              </div>
            )}
            {pharmacy.distance && (
              <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded">
                {pharmacy.distance}
              </span>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Statut de garde */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                pharmacy.isOnDuty ? 'bg-green-500' : 'bg-gray-400'
              }`} />
              <span className={`text-sm font-medium ${
                pharmacy.isOnDuty ? 'text-green-600' : 'text-gray-600'
              }`}>
                {pharmacy.isOnDuty ? 'En garde' : 'Fermée'}
              </span>
            </div>
            {pharmacy.dutyHours && (
              <div className="flex items-center text-sm text-neutral-600">
                <Clock className="h-4 w-4 mr-1" />
                {pharmacy.dutyHours}
              </div>
            )}
          </div>

          {/* Téléphone */}
          <div className="flex items-center text-sm text-neutral-600">
            <Phone className="h-4 w-4 mr-2" />
            {pharmacy.phone}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 flex space-x-2">
        <Button 
          onClick={handleCall}
          className="flex-1 bg-primary hover:bg-primary/90"
          disabled={!pharmacy.isOnDuty}
        >
          <Phone className="h-4 w-4 mr-2" />
          Appeler
        </Button>
        
        <Button 
          onClick={handleNavigate}
          variant="outline"
          className="flex-1"
        >
          <Navigation className="h-4 w-4 mr-2" />
          Itinéraire
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PharmacyCard; 