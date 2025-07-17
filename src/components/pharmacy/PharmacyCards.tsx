import React from 'react';
import { Clock, Phone, Navigation, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  coordinates: [number, number];
  isOnDuty: boolean;
  dutyHours?: string;
  rating: number;
  distance: string;
  capacity: number;
  logo: string;
  services?: string[];
}

interface PharmacyCardsProps {
  pharmacies: Pharmacy[];
  onCall: (pharmacy: Pharmacy) => void;
  onNavigate: (pharmacy: Pharmacy) => void;
}

const PharmacyCards: React.FC<PharmacyCardsProps> = ({ pharmacies, onCall, onNavigate }) => {
  return (
    <div className="pharmacy-cards-container">
      <style>{`
        .pharmacy-cards-container {
          height: calc(100vh - 64px);
          overflow-y: auto;
          padding: 16px;
        }
        
        .pharmacy-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
          height: fit-content;
        }
        
        .pharmacy-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          transition: all 0.2s ease;
        }
        
        .pharmacy-card:hover {
          border-color: #3b82f6;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .pharmacy-cards-container::-webkit-scrollbar {
          width: 6px;
        }
        
        .pharmacy-cards-container::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        
        .pharmacy-cards-container::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        
        .pharmacy-cards-container::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>

      <div className="pharmacy-cards-grid">
        {pharmacies.map((pharmacy) => (
          <div key={pharmacy.id} className="pharmacy-card">
            <div className="flex items-start space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center text-lg">
                {pharmacy.logo}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-neutral-800 text-sm">{pharmacy.name}</h3>
                <p className="text-xs text-neutral-600">{pharmacy.address}</p>
                <div className="flex items-center mt-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current mr-1" />
                  <span className="text-xs text-neutral-700">{pharmacy.rating}</span>
                  <span className="text-xs text-neutral-400 ml-2">•</span>
                  <span className="text-xs text-neutral-600 ml-2">{pharmacy.distance}</span>
                </div>
              </div>
            </div>
            
            {pharmacy.isOnDuty ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="success" className="text-xs px-2 py-0.5">En garde</Badge>
                  <div className="flex items-center text-xs text-neutral-500">
                    <Clock className="h-2.5 w-2.5 mr-1" />
                    {pharmacy.dutyHours}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-600">Capacité: {pharmacy.capacity}%</span>
                  <span className="text-neutral-600">{pharmacy.phone}</span>
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <Button
                    onClick={() => onCall(pharmacy)}
                    className="flex-1 text-xs h-7"
                  >
                    <Phone className="h-3 w-3 mr-1" />
                    Appeler
                  </Button>
                  <Button
                    onClick={() => onNavigate(pharmacy)}
                    variant="outline"
                    className="flex-1 text-xs h-7"
                  >
                    <Navigation className="h-3 w-3 mr-1" />
                    Itinéraire
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-3">
                <Badge variant="destructive" className="text-xs px-2 py-0.5">Fermé</Badge>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PharmacyCards; 