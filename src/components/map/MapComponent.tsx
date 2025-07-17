import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Phone, Navigation, MapPin, Clock, Star, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

// Fix des icônes Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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

interface MapComponentProps {
  pharmacies: Pharmacy[];
  onPharmacySelect: (pharmacy: Pharmacy) => void;
}

// Composant pour les styles CSS de la carte
const MapStyles: React.FC = () => (
  <style>{`
    .leaflet-container {
      height: 100% !important;
      width: 100% !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    /* Style moderne pour la carte */
    .leaflet-tile-pane {
      filter: grayscale(30%) brightness(1.2) contrast(0.9);
    }
    
    /* Style de carte épuré */
    .leaflet-container {
      background: #f8fafc;
    }
    
    /* Supprimer les attributions par défaut */
    .leaflet-control-attribution {
      display: none !important;
    }
    
    /* Contrôles de zoom personnalisés */
    .leaflet-control-zoom {
      border: none !important;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
      border-radius: 8px !important;
      overflow: hidden;
    }
    
    .leaflet-control-zoom a {
      background: white !important;
      color: #374151 !important;
      border: none !important;
      width: 36px !important;
      height: 36px !important;
      line-height: 36px !important;
      font-size: 18px !important;
      font-weight: 500 !important;
      transition: all 0.2s ease;
    }
    
    .leaflet-control-zoom a:hover {
      background: #f3f4f6 !important;
      color: #1f2937 !important;
    }
    
    .leaflet-control-zoom a:first-child {
      border-bottom: 1px solid #e5e7eb !important;
    }
    
    /* Marqueurs personnalisés modernes */
    .custom-marker {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      border: 3px solid white;
      border-radius: 50%;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: 16px;
      box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    }
    
    .custom-marker:hover {
      transform: scale(1.15) translateY(-2px);
      box-shadow: 0 8px 25px rgba(59, 130, 246, 0.5);
    }
    
    .custom-marker.on-duty {
      background: linear-gradient(135deg, #10b981, #059669);
      box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
    }
    
    .custom-marker.on-duty:hover {
      box-shadow: 0 8px 25px rgba(16, 185, 129, 0.5);
    }
    
    .custom-marker::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      border-radius: 50%;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .custom-marker:hover::before {
      opacity: 1;
    }
    
    /* Animation de pulsation pour les marqueurs de garde */
    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.1); opacity: 0.7; }
      100% { transform: scale(1); opacity: 1; }
    }
    
    .pulse-animation {
      animation: pulse 2s infinite;
    }
    
    /* Logo GardePharma */
    .logo-container {
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 1000;
    }
    
    .logo-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      padding: 12px 16px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: all 0.2s ease;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .logo-wrapper:hover {
      transform: scale(1.02);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    }
    
    .logo-image {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      object-fit: cover;
    }
    
    .logo-text {
      font-weight: 600;
      font-size: 16px;
      color: #1f2937;
    }
    
    /* Barre d'informations de transport moderne */
    .transport-info-bar {
      position: absolute;
      bottom: 20px;
      right: 20px;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(20px);
      border-radius: 16px;
      padding: 12px 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
      display: flex;
      gap: 16px;
      align-items: center;
      font-size: 11px;
      color: #1f2937;
      z-index: 1000;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .transport-item {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: 6px;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    
    .transport-item:hover {
      background: rgba(59, 130, 246, 0.1);
      transform: translateY(-1px);
    }
    
    .transport-icon {
      width: 16px;
      height: 16px;
      opacity: 0.8;
      transition: opacity 0.2s ease;
    }
    
    .transport-item:hover .transport-icon {
      opacity: 1;
    }
  `}</style>
);

// Composant pour le dialogue de détails de pharmacie
interface PharmacyDialogProps {
  pharmacy: Pharmacy | null;
  onClose: () => void;
}

const PharmacyDialog: React.FC<PharmacyDialogProps> = ({ pharmacy, onClose }) => {
  if (!pharmacy) return null;

  return (
    <Dialog open={!!pharmacy} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center text-lg">
              {pharmacy.logo}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{pharmacy.name}</h3>
              <p className="text-sm text-gray-500">{pharmacy.distance}</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{pharmacy.address}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Phone className="h-4 w-4" />
            <span>{pharmacy.phone}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>{pharmacy.rating}/5</span>
          </div>
          
          {pharmacy.isOnDuty && (
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <Clock className="h-4 w-4" />
              <span>En garde: {pharmacy.dutyHours}</span>
            </div>
          )}
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>Capacité: {pharmacy.capacity}%</span>
          </div>
          
          {pharmacy.services && pharmacy.services.length > 0 && (
            <div>
              <h4 className="font-medium text-sm mb-2">Services</h4>
              <div className="flex flex-wrap gap-2">
                {pharmacy.services.map((service, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex space-x-2 pt-4">
            <Button
              onClick={() => {
                window.open(`tel:${pharmacy.phone}`, '_self');
                onClose();
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <Phone className="h-4 w-4 mr-2" />
              Appeler
            </Button>
            <Button
              onClick={() => {
                const [lat, lng] = pharmacy.coordinates;
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
                onClose();
              }}
              variant="outline"
              className="flex-1"
            >
              <Navigation className="h-4 w-4 mr-2" />
              Itinéraire
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Composant de chargement
const LoadingSpinner: React.FC = () => (
  <div className="h-full flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
      <p className="text-sm text-gray-600">Chargement de la carte...</p>
    </div>
  </div>
);

// Composant principal de la carte Leaflet
interface LeafletMapProps {
  pharmacies: Pharmacy[];
  onPharmacySelect: (pharmacy: Pharmacy) => void;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ pharmacies, onPharmacySelect }) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    const map = L.map(containerRef.current, {
      center: [48.8566, 2.3522],
      zoom: 13,
      zoomControl: false, // On va ajouter nos propres contrôles
      attributionControl: false
    });
    mapRef.current = map;

    // Style de carte moderne
    tileLayerRef.current = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Contrôles de zoom personnalisés
    L.control.zoom({
      position: 'bottomleft'
    }).addTo(map);

    // Force un refresh de la carte
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Supprimer tous les anciens marqueurs
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapRef.current?.removeLayer(layer);
      }
    });

    // Ajouter les nouveaux marqueurs
    pharmacies.forEach((pharmacy, index) => {
      const [lat, lng] = pharmacy.coordinates;
      
      // Créer un marqueur personnalisé
      const markerElement = document.createElement('div');
      markerElement.className = `custom-marker ${pharmacy.isOnDuty ? 'on-duty' : ''}`;
      markerElement.innerHTML = (index + 1).toString();
      
      if (pharmacy.isOnDuty) {
        markerElement.classList.add('pulse-animation');
      }

      const customIcon = L.divIcon({
        html: markerElement,
        className: 'custom-marker-container',
        iconSize: [44, 44],
        iconAnchor: [22, 44],
        popupAnchor: [0, -44]
      });

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(mapRef.current!);

      // Popup avec informations de base
      const popupContent = `
        <div style="min-width: 200px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <div style="width: 32px; height: 32px; background: ${pharmacy.isOnDuty ? '#10b981' : '#6b7280'}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">
              ${index + 1}
            </div>
            <div>
              <h3 style="margin: 0; font-weight: 600; font-size: 14px;">${pharmacy.name}</h3>
              <p style="margin: 0; font-size: 12px; color: #6b7280;">${pharmacy.distance}</p>
            </div>
          </div>
          <p style="margin: 0 0 8px 0; font-size: 12px; color: #374151;">${pharmacy.address}</p>
          <div style="display: flex; gap: 8px;">
            <span style="font-size: 12px; color: #6b7280;">⭐ ${pharmacy.rating}/5</span>
            ${pharmacy.isOnDuty ? `<span style="font-size: 12px; color: #10b981;">🕒 En garde</span>` : ''}
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      // Événement de clic
      marker.on('click', () => {
        setSelectedPharmacy(pharmacy);
        onPharmacySelect(pharmacy);
      });
    });
  }, [pharmacies, onPharmacySelect]);

  return (
    <div className="relative h-full">
      <MapStyles />
      
      {/* Logo GardePharma */}
      <div className="logo-container">
        <div className="logo-wrapper">
          <img 
            src="https://media.designrush.com/inspiration_images/549120/conversions/Pharma_ee5626592827-desktop.jpg" 
            alt="GardePharma Logo" 
            className="logo-image"
          />
          <span className="logo-text">GardePharma</span>
        </div>
      </div>

      {/* Barre d'informations de transport */}
      <div className="transport-info-bar">
        <div className="transport-item">
          <svg className="transport-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
          </svg>
          <span>15 min</span>
        </div>
        <div className="transport-item">
          <svg className="transport-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2c-4.42 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20v1h2l2-2h4l2 2h2v-1l-1.5-1c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-7H6V6h5v4zm5.5 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-7h-5V6h5v4z"/>
          </svg>
          <span>33 min</span>
        </div>
        <div className="transport-item">
          <svg className="transport-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/>
          </svg>
          <span>22 min</span>
        </div>
        <div className="transport-item">
          <svg className="transport-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.1 1.1 1.1 2.9 0 4l-1.4 1.4c-.6.6-1.4.9-2.2.9s-1.6-.3-2.2-.9l-1.4-1.4c-.6-.6-.9-1.4-.9-2.2s.3-1.6.9-2.2l.8-.8 2.4-2.4c.4-.4 1-.4 1.4 0l2.4 2.4c.4.4.4 1 0 1.4z"/>
          </svg>
          <span>27 min</span>
        </div>
        <div className="transport-item">
          <svg className="transport-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 7c0-1.1-.9-2-2-2h-3v2h3v2.65L13.52 14H10V9H6c-2.21 0-4 1.79-4 4v3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4.48L19 10.35V7zM7 17c-.55 0-1-.45-1-1h2c0 .55-.45 1-1 1z"/>
          </svg>
          <span>2 min</span>
        </div>
      </div>

      <div ref={containerRef} className="h-full w-full" />
      
      <PharmacyDialog 
        pharmacy={selectedPharmacy} 
        onClose={() => setSelectedPharmacy(null)} 
      />
    </div>
  );
};

const MapComponent: React.FC<MapComponentProps> = ({ pharmacies, onPharmacySelect }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un temps de chargement
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <LeafletMap pharmacies={pharmacies} onPharmacySelect={onPharmacySelect} />;
};

export default MapComponent;
