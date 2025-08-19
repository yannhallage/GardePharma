import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Phone, Navigation, MapPin, Clock, Star, Users, Globe } from 'lucide-react';

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
  mail: string;
  coordinates: [number, number];
  isOnDuty: boolean;
  dutyHours?: string;
  rating: number;
  distance: string;
  description: string;
  capacity: number;
  logo: string;
  services?: string[];
  commune: string;
  details: string;
  image?: string;       // ⚡ Ici l'image en Base64 "data:image/jpeg;base64,..."
  imageType?: string;
}

interface MapComponentProps {
  pharmacies: Pharmacy[];
  onPharmacySelect?: (pharmacy: Pharmacy) => void;
  onMarkerClick?: (pharmacies: Pharmacy[]) => void;
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
  onPharmacySelect?: (pharmacy: Pharmacy) => void;
  onMarkerClick?: (pharmacies: Pharmacy[]) => void;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ pharmacies, onPharmacySelect, onMarkerClick }) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState<any>(null);

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    const map = L.map(containerRef.current, {
      center: [5.3054398, -3.990956], // Côte d'Ivoire
      zoom: 12.3,
      zoomControl: false,
      attributionControl: false
    });
    mapRef.current = map;

    tileLayerRef.current = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    L.control.zoom({
      position: 'bottomleft'
    }).addTo(map);

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

    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapRef.current?.removeLayer(layer);
      }
    });

    pharmacies.forEach((pharmacy) => {
      const [lat, lng] = pharmacy.coordinates;

      const markerElement = document.createElement('div');
      markerElement.className = `custom-marker ${pharmacy.isOnDuty ? 'on-duty' : 'off-duty'}`;
      markerElement.innerHTML = pharmacy.logo;
      if (pharmacy.isOnDuty) {
        markerElement.classList.add('pulse-animation');
      }

      const customIcon = L.divIcon({
        html: markerElement,
        className: 'custom-marker-container',
        iconSize: [44, 44],
        iconAnchor: [22, 44],
        popupAnchor: [0, -44],
      });

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(mapRef.current!);

      marker.bindPopup(`
        <div class="text">
          <div style="font-weight: bold;">${pharmacy.name}</div>
          <div>${pharmacy.address}</div>
          <div>Tél: ${pharmacy.phone}</div>
          <div>Services: ${pharmacy.services?.join(', ')}</div>
        </div>
      `, { closeButton: false, offset: L.point(0, -2) });

      marker.on('mouseover', () => marker.openPopup());
      marker.on('mouseout', () => marker.closePopup());

      marker.on('click', () => {
        setSelectedPharmacy(pharmacy);
        if (onPharmacySelect) onPharmacySelect(pharmacy);
        if (onMarkerClick) onMarkerClick([pharmacy]);
      });
    });
  }, [pharmacies, onPharmacySelect, onMarkerClick]);

  return (
    <div className="relative h-full">
      <MapStyles />
      <div ref={containerRef} className="h-full w-full" />

      <AnimatePresence>
        {selectedPharmacy && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 bg-white shadow-lg rounded-xl w-96 border z-[9999] overflow-hidden"
          >
            {/* Image en haut */}
            <div className="h-40 w-full">
              <motion.img
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3 }}
                // src="https://www.ville-clichy.fr/uploads/Image/4b/IMF_ACCROCHE/GAB_CLICHY/58792_024_pharmacie-de-garde.jpg"
                src={selectedPharmacy.imageUrl || "https://www.ville-clichy.fr/uploads/Image/4b/IMF_ACCROCHE/GAB_CLICHY/58792_024_pharmacie-de-garde.jpg"}
                alt={selectedPharmacy.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Infos */}
            <div className="p-4 space-y-1">
              <h2 className="text-2xl font-bold text-gray-800">{selectedPharmacy.name}</h2>
              <p className="text-gray-600">{selectedPharmacy.address}</p>
              <p className="text-gray-700 flex items-center gap-2">
                tél: <a href={`tel:${selectedPharmacy.phone}`} className='hover:text-blue-500 hover:underline'>{selectedPharmacy.phone}</a>
              </p>
              <p className="text-gray-700 flex items-center gap-2">
                mail: {selectedPharmacy.mail ? selectedPharmacy.mail : "contact@gardepharma.com"}
              </p>
              <p className="text-gray-700 flex items-center gap-2">
                {/* horaires : {selectedPharmacy.dutyHours ? selectedPharmacy.dutyHours : ""} */}
                horaires : <span className="border pr-1 pl-1 rounded-md text-[12px] text-green-700">ouvert</span>
                <span className="border pr-1 pl-1 rounded-md text-[12px]">fermé a 21:00</span>
              </p>
              <p className="text-gray-600 text-sm flex items-center gap-1">
                <span className="font-semibold flex items-center gap-1">
                  Rating :
                </span>
                {/* {selectedPharmacy.rating ? selectedPharmacy.rating : ""} */}
                {selectedPharmacy.rating ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 text-yellow-500 fill-current mr-1"
                    />
                  ))
                ) : null}

              </p>
              <p className="text-gray-600 text-sm flex items-center gap-1">
                <span className="font-semibold flex items-center gap-1">
                  Services :
                </span>
                {selectedPharmacy.services.join(", ")}
              </p>

              {/* Description */}
              <hr className="mt-2" />
              <div className="space-y-2 mt-4">
                <h3 className="text-lg font-semibold">Description</h3>
                <p className="text-gray-500 text-sm">
                  {/* Bienvenue dans notre pharmacie. Nous offrons des services de qualité, avec un personnel attentif à vos besoins. */}
                  {selectedPharmacy.description}

                </p>
              </div>

              {/* Bouton Fermer */}
              <button
                onClick={() => setSelectedPharmacy(null)}
                className="mt-4 w-full py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                Fermer
              </button>
            </div>
          </motion.div>

        )}
      </AnimatePresence>
    </div>
  );
};


const MapComponent: React.FC<MapComponentProps> = ({ pharmacies, onPharmacySelect, onMarkerClick }) => {
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

  return (
    <>
      <LeafletMap pharmacies={pharmacies} onPharmacySelect={onPharmacySelect} onMarkerClick={onMarkerClick} />
    </>
  )
};

export default MapComponent;
