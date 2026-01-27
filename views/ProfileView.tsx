
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, Bell, Shield, LogOut, ChevronRight, 
  History, HelpCircle, CreditCard, User as UserIcon,
  Briefcase, Mail, Phone, MapPin, ChevronLeft
} from 'lucide-react';
import { User } from '../types';

interface ProfileViewProps {
  user: User;
  onLogout: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  
  const menuItems = [
    { icon: <Briefcase size={18} />, label: 'Mes Informations', sub: 'Données personnelles' },
    { icon: <CreditCard size={18} />, label: 'Mes annonces', sub: 'Gestion locative' },
    { icon: <Bell size={18} />, label: 'Mes alertes', sub: 'Préférences de recherche' },
    { icon: <Settings size={18} />, label: 'Paramètres', sub: 'Configuration' },
    { icon: <HelpCircle size={18} />, label: 'Aide', sub: 'Support client' },
  ];

  return (
    <div className="bg-white min-h-screen">
      <header className="px-6 py-8 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-xl text-gray-400">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-black text-gray-900 tracking-tight">Profil</h1>
        <button className="p-2 bg-gray-50 rounded-xl text-gray-400">
          <Settings size={20} />
        </button>
      </header>

      <div className="flex flex-col items-center px-6 mb-10">
        <div className="relative mb-6">
          <div className="w-28 h-28 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl rotate-3">
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-indigo-600 p-2 rounded-xl text-white border-4 border-white">
            <UserIcon size={16} />
          </div>
        </div>
        <h2 className="text-2xl font-black text-gray-900 tracking-tighter">{user.name}</h2>
        
        <div className="flex flex-col items-center gap-1 mt-3">
           <div className="flex items-center gap-2 text-gray-400">
             <Phone size={14} className="text-indigo-600" />
             <span className="text-xs font-bold">+237 6 00 00 00 00</span>
           </div>
           <div className="flex items-center gap-2 text-gray-400">
             <Mail size={14} className="text-indigo-600" />
             <span className="text-xs font-bold">{user.email}</span>
           </div>
        </div>

        <div className="flex gap-3 mt-8 w-full">
          <button className="flex-1 bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-100 text-xs uppercase tracking-tighter">
            Modifier Infos
          </button>
          <button className="flex-1 bg-gray-50 text-gray-900 font-black py-4 rounded-2xl border border-gray-100 text-xs uppercase tracking-tighter">
            Vérifier
          </button>
        </div>
      </div>

      <div className="px-6 space-y-3 mb-12">
        {menuItems.map((item, idx) => (
          <button key={idx} className="w-full flex items-center justify-between p-5 bg-white rounded-3xl border border-gray-50 shadow-sm shadow-gray-100/50 group active:scale-[0.98] transition-all">
            <div className="flex items-center gap-5">
              <div className="p-3 bg-gray-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                {item.icon}
              </div>
              <div className="text-left">
                <span className="block font-black text-gray-900 text-sm tracking-tighter">{item.label}</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.sub}</span>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>

      <div className="px-6 pb-20">
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-3 p-5 text-red-500 font-black bg-red-50 rounded-3xl hover:bg-red-100 transition-colors uppercase text-xs tracking-widest"
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default ProfileView;
