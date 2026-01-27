
import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Filter, Heart, MapPin, Search } from 'lucide-react';
import { Property } from '../types';

interface ResultsViewProps {
  properties: Property[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ properties, favorites, onToggleFavorite }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const city = searchParams.get('city') || 'Yaoundé';

  const filteredProperties = properties.filter(p => 
    p.city.toLowerCase().includes(city.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen">
      <header className="px-6 py-8 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-xl text-gray-400">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-xl font-black text-gray-900 tracking-tight">{city}, Cameroun</h1>
        </div>
        <button className="bg-gray-50 p-2.5 rounded-xl text-gray-400 border border-gray-100 flex items-center gap-2">
           <span className="text-[10px] font-black uppercase text-gray-900">Filtres</span>
           <Filter size={14} />
        </button>
      </header>

      <div className="px-6 space-y-6 pb-24">
        {filteredProperties.map(property => (
          <div 
            key={property.id} 
            className="flex gap-4 p-3 bg-white rounded-[2rem] border border-gray-50 shadow-xl shadow-gray-100/50 group active:scale-[0.98] transition-all"
            onClick={() => navigate(`/property/${property.id}`)}
          >
            <div className="w-32 h-32 rounded-3xl overflow-hidden flex-shrink-0 relative">
              <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(property.id);
                }}
                className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur rounded-full shadow-lg"
              >
                <Heart size={14} fill={favorites.includes(property.id) ? '#f59e0b' : 'none'} className={favorites.includes(property.id) ? 'text-amber-500' : 'text-gray-400'} />
              </button>
            </div>
            
            <div className="flex-1 py-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-black text-gray-900 line-clamp-1 mb-1">{property.title}</h3>
                <p className="text-amber-500 font-black text-sm">
                  {property.price.toLocaleString()} {property.currency} <span className="text-[10px] text-gray-400 uppercase">/ mois</span>
                </p>
                <p className="text-[10px] font-bold text-gray-400 mt-1">{property.type} • {property.neighborhood}</p>
              </div>

              <div className="flex items-center gap-1.5 mt-auto">
                <div className="p-1 bg-indigo-50 rounded-md">
                  <MapPin size={10} className="text-indigo-600" />
                </div>
                <span className="text-[10px] font-black text-indigo-900 uppercase tracking-tighter">
                  {property.neighborhood}, {property.city}
                </span>
              </div>
            </div>
          </div>
        ))}

        {filteredProperties.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-gray-200" />
            </div>
            <p className="font-black text-gray-900">Aucun résultat</p>
            <p className="text-xs text-gray-400 mt-2">Essayez d'autres critères de recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsView;
