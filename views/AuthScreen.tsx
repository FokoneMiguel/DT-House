
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { Mail, Lock, ChevronRight, Chrome, ShieldCheck, Check } from 'lucide-react';
import Logo from '../components/Logo';

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
      {/* Brand Logo Header */}
      <div className="flex flex-col items-center mb-12 mt-4 animate-in slide-in-from-top duration-500">
        <Logo className="w-44 h-auto" />
      </div>

      {mode !== 'verify' ? (
        <div className="animate-in fade-in slide-in-from-bottom duration-500">
          <div className="text-center mb-10">
            <h3 className="text-xl font-black text-gray-900 mb-2">Heureux de vous revoir !</h3>
            <p className="text-gray-400 text-xs px-4 leading-relaxed font-medium">L'immobilier sécurisé au bout de vos doigts.</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-800 focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <input 
                type="password" 
                placeholder="Mot de passe" 
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-800 focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="text-brand-blue text-[10px] font-black uppercase tracking-widest float-right mb-8">Oublié ?</button>

          <button 
            onClick={handleContinue}
            className="w-full bg-brand-blue text-white font-black py-5 rounded-2xl shadow-xl shadow-brand-blue/20 mb-8 flex items-center justify-center gap-2 active:scale-95 transition-all uppercase text-xs tracking-widest"
          >
            Continuer
          </button>

          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={() => setMode('login')}
              className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-tighter ${mode === 'login' ? 'bg-gray-50 border-gray-200 text-brand-blue' : 'border-transparent text-gray-300'}`}
            >
              <ChevronRight size={14} className="rotate-180" /> Connexion
            </button>
            <button 
              onClick={() => setMode('signup')}
              className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-tighter ${mode === 'signup' ? 'bg-gray-50 border-gray-200 text-brand-blue' : 'border-transparent text-gray-300'}`}
            >
              <Check size={14} /> S'inscrire
            </button>
          </div>

          <button 
            onClick={handleGoogleLogin}
            className="w-full border-2 border-gray-50 py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-gray-500 hover:bg-gray-50 transition-all text-xs"
          >
            <Chrome size={18} className="text-red-500" />
            Continuer avec Google
          </button>
          
          <p className="mt-10 text-[9px] text-center text-gray-400 px-6 font-bold uppercase tracking-widest leading-relaxed">
            En continuant, vous acceptez nos <span className="text-brand-orange underline">CGU & Politique</span>
          </p>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-right duration-500 text-center">
          <div className="w-20 h-20 bg-brand-blue/5 text-brand-blue rounded-[2rem] flex items-center justify-center mx-auto mb-8">
            <Mail size={32} />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tighter">Code de sécurité</h3>
          <p className="text-gray-400 text-sm mb-10 font-medium leading-relaxed px-4">Nous avons envoyé un code à {email}. <br/>Veuillez le saisir pour certifier votre accès.</p>
          <div className="flex gap-3 justify-center mb-12">
            {[1,2,3,4].map(i => (
              <input 
                key={i} 
                maxLength={1} 
                className="w-14 h-18 bg-gray-50 rounded-2xl text-center text-3xl font-black text-brand-blue border-none shadow-inner focus:ring-4 focus:ring-brand-blue/10" 
                value={code[i-1] || ''}
                onChange={(e) => setCode(code + e.target.value)}
              />
            ))}
          </div>
          <button onClick={handleContinue} className="w-full bg-brand-blue text-white font-black py-6 rounded-[2rem] shadow-2xl shadow-brand-blue/20 uppercase text-xs tracking-[0.2em]">Vérifier mon e-mail</button>
        </div>
      )}
    </div>
  );
};

export default AuthScreen;
