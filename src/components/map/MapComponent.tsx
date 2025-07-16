import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Phone, MapPin, Clock } from 'lucide-react';

// Fix pour les icônes Leaflet
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
}

interface MapComponentProps {
  pharmacies: Pharmacy[];
  onPharmacySelect?: (pharmacy: Pharmacy) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  pharmacies, 
  onPharmacySelect 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialiser la carte centrée sur la France
    const map = L.map(mapRef.current).setView([46.603354, 1.888334], 6);
    mapInstanceRef.current = map;

    // Ajouter la couche OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Ajouter les marqueurs pour chaque pharmacie
    pharmacies.forEach((pharmacy) => {
      const markerColor = pharmacy.isOnDuty ? '#2ecc40' : '#95a5a6';
      
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            background-color: ${markerColor};
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              width: 8px;
              height: 8px;
              background-color: white;
              border-radius: 50%;
            "></div>
          </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      const marker = L.marker(pharmacy.coordinates, { icon: customIcon }).addTo(map);

      // Créer le contenu du popup
      const popupContent = `
        <div style="min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; color: #2c3e50; font-weight: 600;">
            ${pharmacy.name}
          </h3>
          <p style="margin: 4px 0; color: #7f8c8d; font-size: 14px;">
            <strong>Adresse:</strong> ${pharmacy.address}
          </p>
          <p style="margin: 4px 0; color: #7f8c8d; font-size: 14px;">
            <strong>Téléphone:</strong> ${pharmacy.phone}
          </p>
          ${pharmacy.isOnDuty ? `
            <p style="margin: 4px 0; color: #27ae60; font-size: 14px; font-weight: 600;">
              🟢 En garde ${pharmacy.dutyHours ? `(${pharmacy.dutyHours})` : ''}
            </p>
          ` : `
            <p style="margin: 4px 0; color: #95a5a6; font-size: 14px;">
              ⚪ Fermée
            </p>
          `}
        </div>
      `;

      marker.bindPopup(popupContent);

      // Ajouter un événement de clic sur le marqueur
      marker.on('click', () => {
        if (onPharmacySelect) {
          onPharmacySelect(pharmacy);
        }
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, [pharmacies, onPharmacySelect]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-primary-600" />
          Carte des Pharmacies de Garde
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          ref={mapRef} 
          className="w-full h-96 rounded-lg overflow-hidden"
        />
        <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-neutral-600">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            En garde
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
            Fermée
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapComponent; 