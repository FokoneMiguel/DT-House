
import React from 'react';
import { Home } from 'lucide-react';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-indigo-600 text-white animate-pulse">
      <div className="bg-white p-4 rounded-3xl shadow-2xl mb-6">
        <Home size={64} className="text-indigo-600" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight">ImmoDirect</h1>
      <p className="mt-2 text-indigo-100 font-medium">Votre futur chez-vous est ici</p>
      
      <div className="absolute bottom-12 flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm font-medium opacity-80">Chargement...</span>
      </div>
    </div>
  );
};

export default SplashScreen;
