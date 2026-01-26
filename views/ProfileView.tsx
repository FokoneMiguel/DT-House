
import React from 'react';
import { 
  Settings, 
  Bell, 
  Shield, 
  LogOut, 
  ChevronRight, 
  History, 
  HelpCircle,
  CreditCard
} from 'lucide-react';
import { User } from '../types';

interface ProfileViewProps {
  user: User;
  onLogout: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onLogout }) => {
  const menuItems = [
    { icon: <Bell size={20} />, label: 'Notifications', color: 'bg-orange-50 text-orange-600' },
    { icon: <History size={20} />, label: 'Historique des recherches', color: 'bg-blue-50 text-blue-600' },
    { icon: <CreditCard size={20} />, label: 'Abonnement Premium', color: 'bg-purple-50 text-purple-600' },
    { icon: <Shield size={20} />, label: 'Confidentialité', color: 'bg-green-50 text-green-600' },
    { icon: <HelpCircle size={20} />, label: 'Centre d\'aide', color: 'bg-gray-50 text-gray-600' },
  ];

  return (
    <div className="px-6 py-10">
      <div className="flex flex-col items-center mb-10">
        <div className="relative mb-4">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full border-2 border-white shadow-lg">
            <Settings size={16} />
          </button>
        </div>
        <h2 className="text-2xl font-black text-gray-900">{user.name}</h2>
        <p className="text-gray-400 text-sm">{user.email}</p>
      </div>

      <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100 mb-10 flex justify-between items-center group cursor-pointer overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-lg font-bold mb-1">Passer en Premium</h3>
          <p className="text-xs text-indigo-100 opacity-80">Accès prioritaire aux annonces</p>
        </div>
        <ChevronRight className="relative z-10" />
        <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      <div className="space-y-4 mb-10">
        {menuItems.map((item, idx) => (
          <button key={idx} className="w-full flex items-center justify-between p-4 bg-white rounded-3xl border border-gray-50 shadow-sm shadow-gray-100 group">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${item.color}`}>
                {item.icon}
              </div>
              <span className="font-bold text-gray-900">{item.label}</span>
            </div>
            <ChevronRight size={18} className="text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>

      <button 
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 p-5 text-red-500 font-bold bg-red-50 rounded-3xl hover:bg-red-100 transition-colors"
      >
        <LogOut size={20} />
        Déconnexion
      </button>

      <div className="mt-12 text-center">
        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">ImmoDirect v2.5.0</p>
      </div>
    </div>
  );
};

export default ProfileView;
