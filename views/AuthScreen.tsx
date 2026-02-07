
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { Mail, Lock, ChevronRight, Chrome, ShieldCheck, Check } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (user: User) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'verify'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  const handleContinue = () => {
    if (mode === 'login' || mode === 'signup') {
      setMode('verify');
    } else {
      // Simulation de connexion réussie
      onLogin({
        id: 'user_' + Date.now(),
        name: email.split('@')[0],
        email: email,
        role: UserRole.TENANT,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        isVerified: false
      });
    }
  };

  const handleGoogleLogin = () => {
    // Simulation Google Auth
    onLogin({
      id: 'google_' + Date.now(),
      name: "Utilisateur Google",
      email: "test@gmail.com",
      role: UserRole.TENANT,
      avatar: "https://i.pravatar.cc/150?u=google",
      isVerified: false
    });
  };

  return (
    <div className="flex flex-col h-screen bg-white px-8 py-10 overflow-y-auto">
      {/* Logo Section - Match image 1 */}
      <div className="flex flex-col items-center mb-10 mt-4">
        <div className="relative mb-4">
          <img 
            src="https://img.icons8.com/color/144/real-estate.png" 
            className="w-20 h-20" 
            alt="House Icon" 
          />
          <div className="absolute -left-12 top-0">
             <img src="https://img.icons8.com/color/96/detective.png" className="w-16 h-16" />
          </div>
        </div>
        <h1 className="text-4xl font-black text-[#1a3a5f] tracking-tight">L'Agent</h1>
        <h2 className="text-2xl font-bold text-orange-500 -mt-2">Immobilier</h2>
      </div>

      {mode !== 'verify' ? (
        <div className="animate-in fade-in slide-in-from-bottom duration-500">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-black text-gray-900 mb-2">Bienvenue !</h3>
            <p className="text-gray-400 text-sm px-4">Connectez-vous ou inscrivez-vous pour trouver votre logement idéal.</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <input 
                type="password" 
                placeholder="Mot de passe" 
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="text-blue-600 text-xs font-bold float-right mb-8">Mot de passe oublié ?</button>

          <button 
            onClick={handleContinue}
            className="w-full bg-[#0056b3] text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-100 mb-8 flex items-center justify-center gap-2"
          >
            Continuer
          </button>

          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={() => setMode('login')}
              className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold ${mode === 'login' ? 'bg-gray-50 border-gray-200' : 'border-transparent text-gray-400'}`}
            >
              <ChevronRight size={14} className="rotate-180" /> Connexion
            </button>
            <button 
              onClick={() => setMode('signup')}
              className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold ${mode === 'signup' ? 'bg-gray-50 border-gray-200' : 'border-transparent text-gray-400'}`}
            >
              <Check size={14} /> S'inscrire
            </button>
          </div>

          <button 
            onClick={handleGoogleLogin}
            className="w-full border-2 border-gray-100 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-gray-600 hover:bg-gray-50 transition-all"
          >
            <Chrome size={20} className="text-red-500" />
            Continuer avec Google
          </button>
          
          <p className="mt-10 text-[10px] text-center text-gray-400 px-6">
            En continuant, vous acceptez nos <span className="text-blue-600 underline">Conditions d'utilisation</span>
          </p>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-right duration-500 text-center">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <Mail size={40} />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tighter">Vérification e-mail</h3>
          <p className="text-gray-400 text-sm mb-10 font-medium leading-relaxed">Nous avons envoyé un code à {email}. <br/>Veuillez le saisir pour continuer.</p>
          <div className="flex gap-3 justify-center mb-12">
            {[1,2,3,4].map(i => (
              <input 
                key={i} 
                maxLength={1} 
                className="w-14 h-16 bg-gray-50 rounded-2xl text-center text-2xl font-black text-blue-900 border-none shadow-inner focus:ring-4 focus:ring-blue-100" 
                value={code[i-1] || ''}
                onChange={(e) => setCode(code + e.target.value)}
              />
            ))}
          </div>
          <button onClick={handleContinue} className="w-full bg-[#0056b3] text-white font-black py-5 rounded-2xl shadow-xl">Valider le compte</button>
        </div>
      )}
    </div>
  );
};

export default AuthScreen;
