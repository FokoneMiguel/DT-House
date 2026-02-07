
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Property, User, UserRole } from '../types';
import { Wallet, TrendingUp, Users, Building2, ChevronRight, PlusCircle, ArrowUpRight, Lock, EyeOff, Eye } from 'lucide-react';

interface OwnerDashboardViewProps {
  user: User;
  properties: Property[];
  onUpdateProperty: (property: Property) => void;
}

const OwnerDashboardView: React.FC<OwnerDashboardViewProps> = ({ user, properties, onUpdateProperty }) => {
  const navigate = useNavigate();
  const ownerProperties = properties.filter(p => p.ownerId === user.id);

  const toggleAvailability = (property: Property) => {
    onUpdateProperty({ ...property, isRented: !property.isRented });
  };

  return (
    <div className="px-6 py-8 pb-32">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Bonjour, {user.name}</h1>
          <p className="text-xs font-bold text-orange-500 uppercase tracking-widest">Dashboard Propriétaire</p>
        </div>
        <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
          <img src={user.avatar} className="w-full h-full object-cover" alt="Profile" />
        </div>
      </header>

      {/* KYC Alert if not verified */}
      {!user.isVerified && (
        <div className="bg-red-50 border border-red-100 p-6 rounded-[2rem] mb-8 flex flex-col gap-4">
          <div className="flex items-center gap-3 text-red-600">
             <Lock size={24} />
             <h4 className="font-black text-sm uppercase">Publication bloquée</h4>
          </div>
          <p className="text-xs text-red-800 opacity-70 leading-relaxed font-medium">
            Votre compte n'est pas encore vérifié. Vous devez valider votre CNI et votre Selfie dans votre profil pour pouvoir publier des annonces.
          </p>
          <button onClick={() => navigate('/profile')} className="bg-white text-red-600 font-bold py-3 rounded-xl text-[10px] uppercase shadow-sm">Vérifier mon compte</button>
        </div>
      )}

      {/* Wallet Card */}
      <div className="bg-[#1a3a5f] rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-100 mb-10 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-[10px] font-bold text-blue-300 uppercase tracking-[0.2em] mb-2">Solde Net à Recevoir</p>
          <h2 className="text-3xl font-black mb-6">1,250.00 <span className="text-lg font-bold opacity-60">€</span></h2>
          <div className="flex gap-3">
            <button className="flex-1 bg-white/10 border border-white/10 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest">
              Retirer
            </button>
            <button className="flex-1 bg-orange-500 text-white py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-xl">
              Transactions
            </button>
          </div>
        </div>
        <Wallet className="absolute -bottom-10 -right-10 text-white/5 w-40 h-40 rotate-12" />
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-black text-gray-900">Mes Annonces</h3>
          <button 
            onClick={() => user.isVerified ? navigate('/add-listing') : alert('Vérifiez votre compte d\'abord !')}
            className={`flex items-center gap-1 font-black text-xs uppercase ${user.isVerified ? 'text-blue-600' : 'text-gray-300'}`}
          >
            <PlusCircle size={16} /> Ajouter
          </button>
        </div>
        
        <div className="space-y-4">
          {ownerProperties.length > 0 ? ownerProperties.map(p => (
            <div key={p.id} className="bg-gray-50 p-4 rounded-[2rem] border border-transparent hover:bg-white hover:border-gray-100 transition-all">
              <div className="flex gap-4">
                <img src={p.imageUrl} className="w-20 h-20 rounded-2xl object-cover shadow-sm" alt={p.title} />
                <div className="flex-1 py-1">
                  <h4 className="font-bold text-gray-900 text-sm truncate">{p.title}</h4>
                  <p className="text-blue-600 font-black text-xs my-1">{p.price} {p.currency}</p>
                  <div className="flex gap-2">
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${p.isRented ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                      {p.isRented ? 'Loué' : 'Disponible'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                 <button 
                   onClick={() => toggleAvailability(p)}
                   className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${p.isRented ? 'bg-blue-600 text-white' : 'bg-orange-50 text-orange-600'}`}
                 >
                    {p.isRented ? <><Eye size={14} /> Remettre en ligne</> : <><EyeOff size={14} /> Marquer comme loué</>}
                 </button>
                 <button className="p-3 bg-gray-100 text-gray-400 rounded-xl"><ChevronRight size={18} /></button>
              </div>
            </div>
          )) : (
            <div className="text-center py-10 opacity-30">
               <Building2 className="mx-auto mb-4" size={32} />
               <p className="text-[10px] font-bold uppercase">Aucune annonce publiée</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboardView;
