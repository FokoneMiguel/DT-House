
import React from 'react';
import Logo from '../components/Logo';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="animate-in zoom-in duration-700 ease-out">
        <Logo className="w-56 h-auto" />
      </div>
      
      <div className="absolute bottom-16 flex flex-col items-center gap-4">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 bg-brand-blue rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-brand-orange rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-brand-blue rounded-full animate-bounce"></div>
        </div>
        <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">HOUZ Cameroun</span>
      </div>
    </div>
  );
};

export default SplashScreen;
