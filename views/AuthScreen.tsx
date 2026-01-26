
import React, { useState } from 'react';
import { Mail, Lock, Apple, Smartphone } from 'lucide-react';
import { User } from '../types';

interface AuthScreenProps {
  onLogin: (user: User) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    onLogin({
      id: 'user_123',
      name: 'Utilisateur Démo',
      email: email || 'demo@immodirect.com',
      phone: '+33 6 00 00 00 00',
      avatar: 'https://picsum.photos/seed/user/100/100',
      role: email.includes('admin') ? 'admin' : 'user'
    });
  };

  return (
    <div className="flex flex-col h-screen bg-white max-w-md mx-auto px-8 py-12">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Bienvenue 👋</h2>
        <p className="text-gray-500">Connectez-vous pour commencer votre recherche.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input 
            type="email"
            placeholder="Email"
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input 
            type="password"
            placeholder="Mot de passe"
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-right">
          <button type="button" className="text-sm font-semibold text-indigo-600">Mot de passe oublié ?</button>
        </div>
        <button 
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-colors"
        >
          Se connecter
        </button>
      </form>

      <div className="relative my-10">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-400">Ou continuer avec</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-2 py-3.5 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
          <Smartphone size={20} className="text-gray-900" />
          <span className="font-semibold text-gray-900">Google</span>
        </button>
        <button className="flex items-center justify-center gap-2 py-3.5 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
          <Apple size={20} className="text-gray-900" />
          <span className="font-semibold text-gray-900">Apple</span>
        </button>
      </div>

      <p className="mt-auto text-center text-gray-500 text-sm">
        Nouveau sur ImmoDirect ? <button className="text-indigo-600 font-bold">Créer un compte</button>
      </p>
    </div>
  );
};

export default AuthScreen;
