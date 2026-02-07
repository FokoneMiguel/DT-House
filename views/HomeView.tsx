
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Sparkles, Bed, 
  Home, Sofa, LayoutGrid, ChevronLeft, 
  Building2, Ghost, RefreshCcw, Globe
} from 'lucide-react';
import { Property } from '../types';

interface HomeViewProps {
  properties?: Property[];
}

const HomeView: React.FC<HomeViewProps> = ({ properties = [] }) => {
  const navigate = useNavigate();
  const [city, setCity] = useState('Paris');
  const [budget, setBudget] = useState(1200);

  const handleSearch = () => {
    navigate(`/search?city=${city}&budget=${budget}`);
  };

  return (
    <div className="px-6 py-8 relative bg-white min-h-screen">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-xl text-gray-400">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-2xl font-black text-gray-900 tracking-tighter">Recherche</h1>
      </header>

      <div className="animate-in slide-in-from-bottom duration-500">
        <h2 className="text-xl font-black text-gray-900 mb-8 tracking-tight">Trouver votre logement idéal</h2>
        
        <div className="space-y-6 mb-10">
          <div className="space-y-2">
             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pays</label>
             <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-600 font-bold">🇫🇷</div>
                <select className="w-full pl-14 pr-6 py-5 bg-gray-50 border-none rounded-2xl font-black text-gray-800 appearance-none focus:ring-4 focus:ring-blue-50">
                   <option>France</option>
                   <option>Cameroun</option>
                </select>
             </div>
          </div>

          <div className="space-y-2">
             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Ville</label>
             <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-600 font-bold">🇫🇷</div>
                <select 
                  className="w-full pl-14 pr-6 py-5 bg-gray-50 border-none rounded-2xl font-black text-gray-800 appearance-none focus:ring-4 focus:ring-blue-50"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                >
                   <option>Paris</option>
                   <option>Lyon</option>
                   <option>Yaoundé</option>
                   <option>Douala</option>
                </select>
             </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
               <label className="text-xs font-black text-gray-900 uppercase">Budget</label>
               <span className="text-xs font-bold text-gray-400">Jusqu'à {budget} €/mois</span>
            </div>
            <input 
              type="range" 
              min="200" 
              max="5000" 
              step="50" 
              value={budget} 
              onChange={e => setBudget(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600" 
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: '1+ pièce', icon: <Bed size={14} /> },
              { label: 'Appartement', icon: <Home size={14} /> },
              { label: 'Meublé', icon: <Sofa size={14} /> },
              { label: 'Meublé', icon: <LayoutGrid size={14} /> },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 text-blue-600">
                {f.icon}
                <span className="text-[10px] font-black uppercase tracking-tight">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={handleSearch}
          className="w-full bg-[#0056b3] text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-100 flex items-center justify-center gap-3 active:scale-95 transition-all"
        >
          Rechercher
          <ChevronLeft className="rotate-180" size={20} strokeWidth={3} />
        </button>
      </div>

      {properties.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-20 opacity-40">
           <Building2 size={48} className="text-gray-200 mb-4" />
           <p className="text-xs font-bold uppercase tracking-widest">Aucune annonce disponible</p>
        </div>
      )}
    </div>
  );
};

export default HomeView;
