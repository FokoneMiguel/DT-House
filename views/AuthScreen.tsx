
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { Building2, User as UserIcon, Check } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (user: User) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [role, setRole] = useState<UserRole>(UserRole.TENANT);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      id: 'u' + Date.now(),
      name: email.split('@')[0] || 'Utilisateur HOUZ',
      email: email || 'user@houz.cm',
      role: role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email || 'default'}`,
      balance: 0
    });
  };

  return (
    <div className="flex flex-col h-screen bg-white px-8 py-12 overflow-y-auto">
      <div className="flex flex-col items-center mb-12">
        <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-indigo-100 mb-6 transform rotate-3">
          <span className="text-white text-4xl font-black italic">H</span>
        </div>
        <h1 className="text-4xl font-black text-indigo-900 tracking-tighter">HOUZ</h1>
        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2">Cameroun Marketplace</p>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-black text-gray-900 mb-2">Commençons !</h2>
        <p className="text-gray-500 text-sm">Choisissez votre type de profil pour continuer.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {[UserRole.TENANT, UserRole.OWNER].map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`relative p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${
              role === r 
                ? 'border-indigo-600 bg-indigo-50 shadow-inner' 
                : 'border-gray-100 bg-gray-50 text-gray-400'
            }`}
          >
            {role === r && (
              <div className="absolute top-2 right-2 bg-indigo-600 rounded-full p-1 text-white scale-75">
                <Check size={16} />
              </div>
            )}
            {r === UserRole.TENANT ? <UserIcon size={32} /> : <Building2 size={32} />}
            <span className={`text-xs font-black uppercase ${role === r ? 'text-indigo-600' : ''}`}>
              {r}
            </span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="email" 
          placeholder="votre.email@domaine.cm"
          required
          className="w-full p-5 bg-gray-50 border-none rounded-2xl font-bold text-gray-800 placeholder:text-gray-300 focus:ring-4 focus:ring-indigo-100 transition-all"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button 
          type="submit"
          className="w-full bg-indigo-900 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-100 hover:scale-[1.02] active:scale-95 transition-all"
        >
          Continuer
        </button>
      </form>
      
      <p className="mt-auto text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest py-8">
        En continuant, vous acceptez nos CGU de HOUZ Cameroun
      </p>
    </div>
  );
};

export default AuthScreen;
