import React from 'react';
import { Search, MapPin, List, Clock, Phone, Navigation, Star, MoreVertical } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

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

interface SidebarProps {
  pharmacies: Pharmacy[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showOnlyOnDuty: boolean;
  setShowOnlyOnDuty: (show: boolean) => void;
  sortBy: 'nearest' | 'rating' | 'name';
  setSortBy: (sort: 'nearest' | 'rating' | 'name') => void;
  viewMode: 'map' | 'cards';
  setViewMode: (mode: 'map' | 'cards') => void;
  selectedPharmacy: Pharmacy | null;
  onPharmacySelect: (pharmacy: Pharmacy) => void;
  onCall: (pharmacy: Pharmacy) => void;
  onNavigate: (pharmacy: Pharmacy) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  pharmacies,
  searchTerm,
  setSearchTerm,
  showOnlyOnDuty,
  setShowOnlyOnDuty,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  selectedPharmacy,
  onPharmacySelect,
  onCall,
  onNavigate
}) => {
  return (
    <div className="sidebar-container">
      <style>{`
        .sidebar-container {
          width: 360px;
          min-width: 360px;
          max-width: 360px;
          background: white;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          height: calc(100vh - 64px);
        }
        
        .search-input {
          width: 100%;
          padding: 8px 12px 8px 36px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 12px;
          background: #f9fafb;
          transition: all 0.2s ease;
        }
        
        .search-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
          background: white;
        }
        
        .pharmacy-item {
          padding: 12px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: white;
          margin-bottom: 8px;
        }
        
        .pharmacy-item:hover {
          border-color: #3b82f6;
          box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
        }
        
        .pharmacy-item.selected {
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
        }
        
        .pharmacy-list {
          flex: 1;
          overflow-y: auto;
          padding: 12px;
          height: 0;
        }
        
        .pharmacy-list::-webkit-scrollbar {
          width: 4px;
        }
        
        .pharmacy-list::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 2px;
        }
        
        .pharmacy-list::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 2px;
        }
        
        .pharmacy-list::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        .view-toggle {
          display: flex;
          background: #f1f5f9;
          border-radius: 6px;
          padding: 2px;
        }
        
        .view-toggle button {
          flex: 1;
          padding: 6px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        
        .view-toggle button.active {
          background: #3b82f6;
          color: white;
        }
        
        .view-toggle button:not(.active) {
          background: transparent;
          color: #6b7280;
        }
        
        .view-toggle button:not(.active):hover {
          background: #e2e8f0;
          color: #374151;
        }
        
        .sidebar-header {
          flex-shrink: 0;
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .sidebar-filters {
          flex-shrink: 0;
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
        }
      `}</style>

      {/* Search and Filters */}
      <div className="sidebar-filters">
        <div className="space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
            <input
              type="text"
              placeholder="Rechercher une pharmacie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Afficher :
              </label>
              <Select value={showOnlyOnDuty ? 'open' : 'all'} onValueChange={(value) => setShowOnlyOnDuty(value === 'open')}>
                <SelectTrigger className="w-full h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">En garde</SelectItem>
                  <SelectItem value="all">Toutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Trier par :
              </label>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
                <SelectTrigger className="w-full h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nearest">Plus proche</SelectItem>
                  <SelectItem value="rating">Note</SelectItem>
                  <SelectItem value="name">Nom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="view-toggle">
            <button
              onClick={() => setViewMode('map')}
              className={viewMode === 'map' ? 'active' : ''}
            >
              <MapPin className="h-3 w-3 mr-1 inline" />
              Carte
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={viewMode === 'cards' ? 'active' : ''}
            >
              <List className="h-3 w-3 mr-1 inline" />
              Cartes
            </button>
          </div>
        </div>
      </div>

      {/* Pharmacy List */}
      <div className="pharmacy-list">
        <div>
          {pharmacies.map((pharmacy) => (
            <div
              key={pharmacy.id}
              className={`pharmacy-item ${
                selectedPharmacy?.id === pharmacy.id ? 'selected' : ''
              }`}
              onClick={() => onPharmacySelect(pharmacy)}
            >
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center text-sm">
                  {pharmacy.logo}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-neutral-800 truncate text-sm">{pharmacy.name}</h3>
                  <p className="text-xs text-neutral-600">{pharmacy.distance}</p>
                  {pharmacy.isOnDuty ? (
                    <div className="flex items-center mt-1">
                      <Badge variant="success" className="mr-2 text-xs px-2 py-0.5">
                        Ouvert jusqu'à {pharmacy.dutyHours?.split(' - ')[1]}
                      </Badge>
                    </div>
                  ) : (
                    <Badge variant="destructive" className="mt-1 text-xs px-2 py-0.5">Fermé</Badge>
                  )}
                </div>
                
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs text-neutral-600">{pharmacy.rating}</span>
                </div>
              </div>
              
              {/* Capacity indicator */}
              {pharmacy.isOnDuty && (
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center text-xs text-neutral-500">
                    <Clock className="h-2.5 w-2.5 mr-1" />
                    Capacité: {pharmacy.capacity}%
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCall(pharmacy);
                      }}
                      className="p-1 h-6 w-6"
                    >
                      <Phone className="h-3 w-3 text-green-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate(pharmacy);
                      }}
                      className="p-1 h-6 w-6"
                    >
                      <Navigation className="h-3 w-3 text-blue-600" />
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="p-1 h-6 w-6"
                        >
                          <MoreVertical className="h-3 w-3 text-neutral-600" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-sm">
                        <DialogHeader>
                          <DialogTitle className="flex items-center space-x-2 text-sm">
                            <div className="w-6 h-6 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
                              {pharmacy.logo}
                            </div>
                            <span>{pharmacy.name}</span>
                          </DialogTitle>
                          <DialogDescription className="text-xs">
                            Informations détaillées de la pharmacie
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-neutral-800 mb-1 text-xs">Informations</h4>
                            <div className="space-y-1 text-xs">
                              <p><strong>Adresse:</strong> {pharmacy.address}</p>
                              <p><strong>Téléphone:</strong> {pharmacy.phone}</p>
                              <p><strong>Distance:</strong> {pharmacy.distance}</p>
                              <p><strong>Note:</strong> {pharmacy.rating}/5</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-neutral-800 mb-1 text-xs">Services disponibles</h4>
                            <div className="flex flex-wrap gap-1">
                              {pharmacy.services?.map((service, index) => (
                                <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          {pharmacy.isOnDuty && (
                            <div>
                              <h4 className="font-medium text-neutral-800 mb-1 text-xs">Horaires de garde</h4>
                              <Badge variant="success" className="text-xs px-2 py-0.5">
                                {pharmacy.dutyHours}
                              </Badge>
                            </div>
                          )}
                          
                          <div className="flex space-x-2 pt-2">
                            <Button onClick={() => onCall(pharmacy)} className="flex-1 text-xs h-8">
                              <Phone className="h-3 w-3 mr-1" />
                              Appeler
                            </Button>
                            <Button onClick={() => onNavigate(pharmacy)} variant="outline" className="flex-1 text-xs h-8">
                              <Navigation className="h-3 w-3 mr-1" />
                              Itinéraire
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 