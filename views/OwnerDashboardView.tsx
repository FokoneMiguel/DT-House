
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Property, User } from '../types';
import { Wallet, TrendingUp, Users, Building2, ChevronRight, PlusCircle, ArrowUpRight } from 'lucide-react';

interface OwnerDashboardViewProps {
  user: User;
  properties: Property[];
}

const OwnerDashboardView: React.FC<OwnerDashboardViewProps> = ({ user, properties }) => {
  const navigate = useNavigate();
  const ownerProperties = properties.filter(p => p.ownerId === 'owner1'); // Mock identification

  return (
    <div className="px-6 py-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Bonjour, {user.name}</h1>
          <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">Dashboard Propriétaire</p>
        </div>
        <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
          <img src={user.avatar} className="w-full h-full object-cover" alt="Profile" />
        </div>
      </header>

      {/* Wallet / Commission Card */}
      <div className="bg-indigo-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-200 mb-10 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-[0.2em] mb-2">Solde Net à Recevoir</p>
          <h2 className="text-3xl font-black mb-6">1,250,000 <span className="text-lg font-bold opacity-60">FCFA</span></h2>
          <div className="flex gap-3">
            <button className="flex-1 bg-indigo-600/30 backdrop-blur-md border border-indigo-400/20 py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2">
              <ArrowUpRight size={14} /> Retirer
            </button>
            <button className="flex-1 bg-white text-indigo-900 py-3 rounded-2xl text-xs font-bold shadow-xl">
              Transactions
            </button>
          </div>
        </div>
        <Wallet className="absolute -bottom-10 -right-10 text-white/5 w-40 h-40 rotate-12" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
          <TrendingUp className="text-emerald-500 mb-2" size={24} />
          <p className="text-xl font-black">45,000</p>
          <p className="text-[10px] font-bold text-gray-400 uppercase">Vues totales</p>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
          <Users className="text-indigo-600 mb-2" size={24} />
          <p className="text-xl font-black">12</p>
          <p className="text-[10px] font-bold text-gray-400 uppercase">Visites ce mois</p>
        </div>
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-black text-gray-900">Mes Annonces</h3>
          <button 
            onClick={() => navigate('/add-listing')}
            className="text-indigo-600 flex items-center gap-1 font-black text-xs uppercase"
          >
            <PlusCircle size={16} /> Ajouter
          </button>
        </div>
        <div className="space-y-4">
          {ownerProperties.map(p => (
            <div key={p.id} className="flex gap-4 bg-gray-50 p-3 rounded-3xl group hover:bg-white hover:shadow-xl hover:shadow-gray-100 transition-all border border-transparent hover:border-gray-50">
              <img src={p.imageUrl} className="w-20 h-20 rounded-2xl object-cover shadow-sm" alt={p.title} />
              <div className="flex-1 py-1">
                <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{p.title}</h4>
                <p className="text-indigo-600 font-black text-xs my-1">{p.price} {p.currency}</p>
                <div className="flex gap-2">
                  <span className="text-[8px] font-black uppercase px-2 py-0.5 bg-green-100 text-green-600 rounded-full">Actif</span>
                  <span className="text-[8px] font-black uppercase px-2 py-0.5 bg-gray-200 text-gray-500 rounded-full">Meublé</span>
                </div>
              </div>
              <button className="self-center p-2 text-gray-300 group-hover:text-indigo-600">
                <ChevronRight size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Commission transparency card */}
      <div className="bg-amber-50 border border-amber-100 p-6 rounded-[2rem]">
        <h4 className="font-black text-amber-900 text-sm mb-2 flex items-center gap-2">
          <Building2 size={16} /> Transparence HOUZ
        </h4>
        <p className="text-xs text-amber-800 opacity-80 leading-relaxed font-medium">
          HOUZ prélève automatiquement une commission de **5%** sur chaque transaction pour garantir la sécurité du paiement et le support 24/7.
        </p>
      </div>
    </div>
  );
};

export default OwnerDashboardView;
