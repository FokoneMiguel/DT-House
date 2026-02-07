
import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Filter, Heart, MapPin, Search, Ghost } from 'lucide-react';
import { Property } from '../types';

interface ResultsViewProps {
  properties: Property[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ properties, favorites, onToggleFavorite }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const city = searchParams.get('city') || 'Paris';

  // On filtre pour ne pas montrer les logements déjà loués
  const filteredProperties = properties.filter(p => 
    p.city.toLowerCase().includes(city.toLowerCase()) && !p.isRented
  );

  return (
    <div className="bg-white min-h-screen">
      <header className="px-6 py-8 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-xl text-gray-400">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-xl font-black text-gray-900 tracking-tight">{city}, France</h1>
        </div>
        <button className="bg-gray-50 px-4 py-2 rounded-xl text-gray-400 border border-gray-100 font-bold text-xs">
           Filtres
        </button>
      </header>

      <div className="px-6 space-y-4 pb-24">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
          <input 
            type="text" 
            placeholder={city + ", France"}
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-xs font-bold text-gray-800"
            readOnly
          />
        </div>

        {filteredProperties.map(property => (
          <div 
            key={property.id} 
            className="flex gap-4 p-3 bg-white rounded-[2rem] border border-gray-50 shadow-xl shadow-gray-100/30 active:scale-[0.98] transition-all cursor-pointer"
            onClick={() => navigate(`/property/${property.id}`)}
          >
            <div className="w-28 h-28 rounded-3xl overflow-hidden flex-shrink-0 relative">
              <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(property.id);
                }}
                className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur rounded-full shadow-lg"
              >
                <Heart size={12} fill={favorites.includes(property.id) ? '#f59e0b' : 'none'} className={favorites.includes(property.id) ? 'text-amber-500' : 'text-gray-300'} />
              </button>
            </div>
            
            <div className="flex-1 py-1 flex flex-col justify-between overflow-hidden">
              <div>
                <h3 className="text-sm font-black text-gray-900 truncate mb-1">{property.title}</h3>
                <p className="text-orange-500 font-black text-sm">
                  {property.price.toLocaleString()} € <span className="text-[10px] text-gray-400 font-bold">/ mois</span>
                </p>
                <p className="text-[10px] font-bold text-gray-400 mt-1">2 pièces - 55m²</p>
              </div>

              <div className="flex items-center gap-1.5 mt-2 overflow-hidden">
                <div className="p-1 bg-blue-50 rounded-md">
                  <MapPin size={10} className="text-blue-600" />
                </div>
                <span className="text-[10px] font-bold text-gray-400 truncate">
                  {property.neighborhood} ({property.city})
                </span>
              </div>
            </div>
          </div>
        ))}

        {filteredProperties.length === 0 && (
          <div className="text-center py-24">
            <Ghost size={48} className="mx-auto text-gray-100 mb-4" />
            <p className="font-black text-gray-900">Aucun résultat</p>
            <p className="text-xs text-gray-400 mt-2">Essayez d'autres critères de recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsView;