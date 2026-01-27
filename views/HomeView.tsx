
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Sparkles, Bed, 
  Home, Sofa, LayoutGrid, ChevronLeft, 
  Building2, Ghost, RefreshCcw
} from 'lucide-react';
import { Property } from '../types';

interface HomeViewProps {
  properties?: Property[];
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
      <header className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-black text-indigo-900 tracking-tighter">HOUZ</h1>
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-2xl">
           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
           <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Live</span>
        </div>
      </header>

      {properties.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 animate-in fade-in duration-1000">
          <div className="relative mb-10">
            <div className="w-40 h-40 bg-gray-50 rounded-[3rem] flex items-center justify-center rotate-6">
              <Building2 size={80} className="text-gray-100" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center -rotate-12">
               <Ghost size={32} className="text-indigo-200" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-3 text-center tracking-tighter">C'est encore bien calme...</h2>
          <p className="text-gray-400 text-sm text-center px-10 leading-relaxed font-medium">
            Aucun propriétaire n'a encore publié d'annonce. <br/>Dès qu'un logement sera disponible, il apparaîtra ici <span className="text-indigo-600 font-bold">en temps réel</span>.
          </p>
          <button className="mt-10 flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all">
             <RefreshCcw size={16} /> Actualiser
          </button>
        </div>
      ) : (
        <div className="animate-in slide-in-from-bottom duration-500">
          <h2 className="text-3xl font-black text-gray-900 leading-none mb-10 tracking-tighter">
            Votre prochain <br /><span className="text-indigo-600">chez-vous</span> est ici
          </h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Destination</label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 font-bold">🇨🇲</div>
                <select 
                  className="w-full pl-14 pr-6 py-5 bg-gray-50 border-none rounded-[2rem] font-black text-gray-800 appearance-none focus:ring-4 focus:ring-indigo-50"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                >
                  <option>Yaoundé</option>
                  <option>Douala</option>
                  <option>Kribi</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { label: 'Appartement', icon: <Home size={18} /> },
                { label: 'Meublé', icon: <Sofa size={18} /> },
              ].map((f, i) => (
                <button key={i} className="flex items-center gap-4 p-5 bg-gray-50 rounded-3xl text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                  {f.icon}
                  <span className="text-xs font-black uppercase tracking-tight">{f.label}</span>
                </button>
              ))}
            </div>

            <button 
              onClick={handleSearch}
              className="w-full bg-indigo-600 text-white font-black py-6 rounded-[2.5rem] shadow-2xl shadow-indigo-100 flex items-center justify-center gap-3 active:scale-95 transition-all text-sm uppercase tracking-widest"
            >
              Lancer la recherche
              <ChevronLeft className="rotate-180" size={20} strokeWidth={3} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeView;
