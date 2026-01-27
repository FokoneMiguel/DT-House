
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Sparkles, Bed, Home, Sofa, LayoutGrid, ChevronLeft, Building2 } from 'lucide-react';

interface HomeViewProps {
  properties?: any[];
}

const HomeView: React.FC<HomeViewProps> = ({ properties = [] }) => {
  const navigate = useNavigate();
  const [city, setCity] = useState('Yaoundé');
  const [budget, setBudget] = useState(120000);

  const handleSearch = () => {
    navigate(`/search?city=${city}&budget=${budget}`);
  };

  return (
    <div className="px-6 py-8 relative bg-white min-h-screen">
      <header className="flex items-center gap-4 mb-8">
        <h1 className="text-xl font-black text-gray-900 tracking-tight">HOUZ</h1>
      </header>

      {properties.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-700">
          <div className="bg-gray-50 w-32 h-32 rounded-full flex items-center justify-center mb-8">
            <Building2 size={64} className="text-gray-200" />
          </div>
          <h2 className="text-xl font-black text-gray-900 mb-2 text-center">Aucun logement disponible</h2>
          <p className="text-gray-400 text-sm text-center px-10">
            Revenez bientôt ! Dès qu'un propriétaire publie une annonce, elle apparaîtra ici en temps réel.
          </p>
        </div>
      ) : (
        <div className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 leading-tight mb-8">
            Trouver votre <br />logement idéal
          </h2>
          {/* ... reste de l'interface de recherche existante ... */}
        </div>
      )}

      {/* Bouton recherche permanent pour démo */}
      <div className="space-y-6 mt-8">
         <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500 font-bold">🇨🇲</div>
            <select className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl appearance-none font-bold text-gray-800" value={city} onChange={e => setCity(e.target.value)}>
              <option>Yaoundé</option>
              <option>Douala</option>
              <option>Kribi</option>
            </select>
          </div>
          <button 
            onClick={handleSearch}
            className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-100 flex items-center justify-center gap-3"
          >
            <span>Rechercher</span>
            <ChevronLeft className="rotate-180" size={18} strokeWidth={3} />
          </button>
      </div>
    </div>
  );
};

export default HomeView;
