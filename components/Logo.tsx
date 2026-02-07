
import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "w-32 h-32", showText = true }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-xl">
        {/* Skyscrapers - Deep Blue Shades */}
        <rect x="205" y="100" width="45" height="150" fill="#1b3a5d" />
        <path d="M205 100 L250 80 L250 100 Z" fill="#112b4d" opacity="0.8" />
        
        <rect x="255" y="50" width="55" height="200" fill="#112b4d" />
        <path d="M255 50 L310 20 L310 50 Z" fill="#0a1a2e" />
        
        <rect x="315" y="80" width="45" height="170" fill="#1b3a5d" />
        <path d="M315 80 L360 60 L360 80 Z" fill="#112b4d" opacity="0.8" />
        
        {/* Building Windows - Stylized highlights */}
        <g opacity="0.3">
          <rect x="215" y="120" width="25" height="4" fill="white" />
          <rect x="215" y="140" width="25" height="4" fill="white" />
          <rect x="215" y="160" width="25" height="4" fill="white" />
          
          <rect x="265" y="70" width="35" height="6" fill="white" />
          <rect x="265" y="90" width="35" height="6" fill="white" />
          <rect x="265" y="110" width="35" height="6" fill="white" />
        </g>

        {/* Agent Silhouette - Fedora Hat & Suit */}
        <g transform="translate(120, 150)">
          {/* Hat */}
          <path d="M30 15 Q50 0 70 15" fill="#1b3a5d" />
          <rect x="20" y="15" width="60" height="4" rx="2" fill="#1b3a5d" />
          {/* Face outline */}
          <path d="M35 25 Q50 60 65 25" stroke="#1b3a5d" strokeWidth="4" fill="none" />
          {/* Body */}
          <path d="M0 100 Q0 60 20 60 L80 60 Q100 60 100 100 Z" fill="#1b3a5d" />
          {/* Shirt & Tie */}
          <path d="M42 60 L50 75 L58 60 Z" fill="white" />
          <path d="M47 70 L53 70 L50 95 Z" fill="#1b3a5d" />
        </g>

        {/* House Roof - Vibrant Orange */}
        <path d="M250 250 L375 125 L500 250 H460 L375 165 L290 250 Z" fill="#f47321" />
        {/* Roof Window */}
        <rect x="365" y="200" width="20" height="20" fill="white" opacity="0.9" />
        <rect x="374" y="200" width="2" height="20" fill="#1b3a5d" />
        <rect x="365" y="209" width="20" height="2" fill="#1b3a5d" />
      </svg>
      
      {showText && (
        <div className="text-center mt-2">
          <h1 className="text-4xl font-black text-brand-blue tracking-tight leading-none">L'Agent</h1>
          <h2 className="text-2xl font-extrabold text-brand-orange -mt-1 tracking-tight">Immobilier</h2>
        </div>
      )}
    </div>
  );
};

export default Logo;
