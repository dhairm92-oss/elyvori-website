import React from 'react';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-20 h-20',
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className} shrink-0`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="elyvoriGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="1" />
            <stop offset="50%" stopColor="#FFD700" stopOpacity="1" />
            <stop offset="100%" stopColor="#E9C349" stopOpacity="1" />
          </linearGradient>
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Thin Modern Serif E */}
        <text
          x="50"
          y="65"
          textAnchor="middle"
          fill="url(#elyvoriGoldGrad)"
          fontFamily="'Playfair Display', serif"
          fontSize="48"
          fontWeight="400"
          filter="url(#goldGlow)"
        >
          E
        </text>

        {/* Orbiting Crescent Ring */}
        <path
          d="M75,50 A25,25 0 1,1 50,25 A20,20 0 1,0 75,50"
          fill="none"
          stroke="url(#elyvoriGoldGrad)"
          strokeWidth="1.75"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="10s"
            repeatCount="indefinite"
          />
        </path>

        {/* Subtle Outer Particle Orbit */}
        <circle cx="50" cy="20" r="1.5" fill="#FFE088">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 50 50"
            to="0 50 50"
            dur="6s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
};
