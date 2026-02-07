
import React, { useState } from 'react';
import { User, UserRole, VerificationStatus } from '../types';
import { Mail, Lock, ChevronRight, Chrome, Check, UserCircle2, Building2, AlertCircle } from 'lucide-react';
import Logo from '../components/Logo';

interface AuthScreenProps {
  onLogin: (user: User) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [role, setRole] = useState<UserRole>(UserRole.TENANT);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleAuth = () => {
    setError('');
    
    if (!email || !password || (mode === 'signup' && !name)) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Format d\'email invalide.');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit faire au moins 6 caractères.');
      return;
    }

    // Simulation d'auth
    const newUser: User = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      name: mode === 'signup' ? name : email.split('@')[0],
      email: email,
      role: role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      verificationStatus: VerificationStatus.NOT_VERIFIED
    };

    onLogin(newUser);
  };

  return (
    <div className="flex flex-col h-screen bg-white px-8 py-10 overflow-y-auto">
      <div className="flex flex-col items-center mb-10 mt-4 animate-in slide-in-from-top duration-500">
        <Logo className="w-40 h-auto" />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom duration-500">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-black text-brand-blue mb-2">
            {mode === 'login' ? 'Connexion' : 'Créer un compte'}
          </h3>
          <p className="text-gray-400 text-xs font-medium">L'immobilier sécurisé au Cameroun.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-in shake duration-300">
            <AlertCircle size={18} />
            <p className="text-[11px] font-bold">{error}</p>
          </div>
        )}

        <div className="space-y-4 mb-6">
          {mode === 'signup' && (
            <div className="space-y-4 mb-4">
              <div className="flex gap-2">
                <button 
                  onClick={() => setRole(UserRole.TENANT)}
                  className={`flex-1 py-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${role === UserRole.TENANT ? 'border-brand-blue bg-blue-50/50 text-brand-blue' : 'border-gray-50 text-gray-400'}`}
                >
                  <UserCircle2 size={24} />
                  <span className="text-[10px] font-black uppercase">Locataire</span>
                </button>
                <button 
                  onClick={() => setRole(UserRole.OWNER)}
                  className={`flex-1 py-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${role === UserRole.OWNER ? 'border-brand-blue bg-blue-50/50 text-brand-blue' : 'border-gray-50 text-gray-400'}`}
                >
                  <Building2 size={24} />
                  <span className="text-[10px] font-black uppercase">Bailleur</span>
                </button>
              </div>
              <input 
                type="text" 
                placeholder="Nom complet" 
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-800 focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <input 
            type="email" 
            placeholder="Adresse Email" 
            className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-800 focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Mot de passe" 
            className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-800 focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button 
          onClick={handleAuth}
          className="w-full bg-brand-blue text-white font-black py-5 rounded-2xl shadow-xl shadow-brand-blue/20 mb-8 flex items-center justify-center gap-2 active:scale-95 transition-all uppercase text-xs tracking-widest"
        >
          {mode === 'login' ? 'Se connecter' : 'S\'inscrire'}
          <ChevronRight size={18} />
        </button>

        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => setMode('login')}
            className={`flex-1 py-3 border-b-2 font-black uppercase text-[10px] tracking-widest transition-all ${mode === 'login' ? 'border-brand-orange text-brand-blue' : 'border-transparent text-gray-300'}`}
          >
            Connexion
          </button>
          <button 
            onClick={() => setMode('signup')}
            className={`flex-1 py-3 border-b-2 font-black uppercase text-[10px] tracking-widest transition-all ${mode === 'signup' ? 'border-brand-orange text-brand-blue' : 'border-transparent text-gray-300'}`}
          >
            S'inscrire
          </button>
        </div>

        <button 
          onClick={() => {}} // Simulation Popup Google
          className="w-full border-2 border-gray-50 py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-gray-500 hover:bg-gray-50 transition-all text-xs"
        >
          <Chrome size={18} className="text-red-500" />
          Continuer avec Google
        </button>
      </div>
    </div>
  );
};

export default AuthScreen;
