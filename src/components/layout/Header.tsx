import React from 'react';
import { MapPin, Info, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-neutral-200">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-md">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-neutral-800">GardePharma</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="p-1.5">
                  <Info className="h-4 w-4 text-neutral-600" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none text-sm">À propos de GardePharma</h4>
                  <p className="text-xs text-neutral-600">
                    Trouvez rapidement les pharmacies de garde près de chez vous. 
                    Les informations sont mises à jour en temps réel.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button variant="ghost" size="sm" className="p-1.5">
              <Settings className="h-4 w-4 text-neutral-600" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 