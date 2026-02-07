
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bed, Home, Sofa, LayoutGrid, ChevronLeft, MapPin
} from 'lucide-react';
import { Property } from '../types';

interface HomeViewProps {
  properties?: Property[];
}

const CAMEROON_CITIES = [
  'Douala', 'Yaoundé', 'Bafoussam', 'Garoua', 'Bamenda', 
  'Maroua', 'Nkongsamba', 'Dschang', 'Limbé', 'Kribi', 
  'Édéa', 'Bertoua', 'Ngaoundéré', 'Ebolowa'
];

const HomeView: React.FC<HomeViewProps> = ({ properties = [] }) => {
  const navigate = useNavigate();
  const [city, setCity] = useState('Douala');
  const [budget, setBudget] = useState(150000);

  const handleSearch = () => {
    navigate(`/search?city=${city}&budget=${budget}`);
  };

  return (
    <div className="px-6 py-8 relative bg-white min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-brand-blue tracking-tighter">Accueil</h1>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Marché Immobilier Camerounais</p>
      </header>

      <div className="animate-in slide-in-from-bottom duration-700">
        <h2 className="text-xl font-black text-gray-900 mb-8 tracking-tight">Où voulez-vous loger ?</h2>
        
        <div className="space-y-6 mb-10">
          <div className="space-y-2">
             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Ville</label>
             <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-blue">
                  <MapPin size={20} />
                </div>
                <select 
                  className="w-full pl-16 pr-6 py-5 bg-gray-50 border-none rounded-3xl font-black text-gray-900 appearance-none focus:ring-4 focus:ring-brand-blue/5"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                >
                   {CAMEROON_CITIES.sort().map(c => (
                     <option key={c} value={c}>{c}</option>
                   ))}
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                   <ChevronLeft className="-rotate-90" size={16} />
                </div>
             </div>
          </div>

          <div className="space-y-5">
            <div className="flex justify-between items-center">
               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Budget Maximum</label>
               <span className="text-[11px] font-black text-brand-blue bg-blue-50 px-3 py-1 rounded-full">{budget.toLocaleString()} FCFA</span>
            </div>
            <input 
              type="range" 
              min="25000" 
              max="2000000" 
              step="5000" 
              value={budget} 
              onChange={e => setBudget(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand-orange" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Chambre', icon: <Bed size={16} /> },
              { label: 'Studio/Appart', icon: <Home size={16} /> },
              { label: 'Meublé', icon: <Sofa size={16} /> },
              { label: 'Tous', icon: <LayoutGrid size={16} /> },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-3xl shadow-sm hover:border-brand-blue/20 transition-all cursor-pointer group">
                <div className="text-gray-400 group-hover:text-brand-blue transition-colors">{f.icon}</div>
                <span className="text-[10px] font-black uppercase tracking-tight text-gray-600 group-hover:text-brand-blue">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={handleSearch}
          className="w-full bg-brand-blue text-white font-black py-6 rounded-3xl shadow-2xl shadow-brand-blue/10 flex items-center justify-center gap-3 active:scale-95 transition-all text-sm uppercase tracking-widest"
        >
          Chercher un Logement
          <ChevronLeft className="rotate-180" size={20} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default HomeView;
