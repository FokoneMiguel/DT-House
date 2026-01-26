
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart, MapPin, Trash2 } from 'lucide-react';
import { Property } from '../types';

interface FavoritesViewProps {
  properties: Property[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const FavoritesView: React.FC<FavoritesViewProps> = ({ properties, favorites, onToggleFavorite }) => {
  const navigate = useNavigate();
  const favoriteProperties = properties.filter(p => favorites.includes(p.id));

  return (
    <div className="px-6 py-8">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Mes Favoris</h1>
      </div>

      <div className="space-y-6">
        {favoriteProperties.length > 0 ? (
          favoriteProperties.map(property => (
            <div 
              key={property.id} 
              className="flex gap-4 bg-white p-3 rounded-3xl shadow-md shadow-gray-100 border border-gray-50 group cursor-pointer"
              onClick={() => navigate(`/property/${property.id}`)}
            >
              <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 py-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{property.title}</h3>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(property.id);
                    }}
                    className="text-red-500 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex items-center gap-1 text-gray-400 mt-1 mb-2">
                  <MapPin size={12} />
                  <span className="text-[10px] font-medium">{property.city}</span>
                </div>
                <p className="font-black text-indigo-600 text-sm">{property.price}{property.currency}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-24">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={40} className="text-gray-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">C'est bien vide ici...</h2>
            <p className="text-gray-400 text-sm px-10">Sauvegardez vos annonces coup de cœur pour les retrouver facilement.</p>
            <button 
              onClick={() => navigate('/')}
              className="mt-8 bg-indigo-600 text-white font-bold px-8 py-3 rounded-2xl shadow-lg shadow-indigo-100"
            >
              Explorer les annonces
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesView;
