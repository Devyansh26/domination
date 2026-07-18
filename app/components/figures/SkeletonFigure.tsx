import * as React from "react";

export function SkeletonFigure({ className }: { className?: string }) {
  const boneColor = "#a0a0a0";
  const bgOutline = "rgba(160, 160, 160, 0.15)";
  const strokeColor = "#808080";

  return (
    <svg viewBox="0 0 200 520" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Ghost Outline */}
      <path fill={bgOutline} d="M100 15 C 88 15, 78 25, 78 38 C 78 48, 83 56, 90 60 L 90 70 C 65 72, 45 85, 35 100 C 28 115, 20 160, 15 190 C 12 210, 15 240, 22 250 C 28 258, 35 250, 38 235 C 40 220, 48 180, 50 160 L 55 160 L 55 260 C 55 280, 60 380, 62 420 C 64 460, 65 490, 60 500 C 55 510, 75 515, 80 500 C 85 480, 92 420, 95 380 L 105 380 C 108 420, 115 480, 120 500 C 125 515, 145 510, 140 500 C 135 490, 136 460, 138 420 C 140 380, 145 280, 145 260 L 145 160 L 150 160 C 152 180, 160 220, 162 235 C 165 250, 172 258, 178 250 C 185 240, 188 210, 185 190 C 180 160, 172 115, 165 100 C 155 85, 135 72, 110 70 L 110 60 C 117 56, 122 48, 122 38 C 122 25, 112 15, 100 15 Z" />

      <g stroke={strokeColor} strokeWidth="1" fill={boneColor}>
        {/* Skull */}
        <path d="M100 18 C88 18, 82 28, 82 38 C82 46, 88 52, 92 56 L108 56 C112 52, 118 46, 118 38 C118 28, 112 18, 100 18 Z" />
        <ellipse cx="93" cy="35" rx="3" ry="4" fill="#333" stroke="none" />
        <ellipse cx="107" cy="35" rx="3" ry="4" fill="#333" stroke="none" />
        <polygon points="98,42 102,42 100,46" fill="#333" stroke="none" />
        <rect x="94" y="50" width="12" height="4" fill="#333" stroke="none" />

        {/* Spine */}
        {[60, 65, 72, 80, 88, 96, 104, 112, 120, 128, 136, 144, 152, 160, 168].map(y => (
          <rect key={y} x="96" y={y} width="8" height="5" rx="1" />
        ))}
        
        {/* Ribcage */}
        <g fill="none" stroke={boneColor} strokeWidth="2.5" strokeLinecap="round">
          <path d="M96 75 Q75 75 70 95" />
          <path d="M104 75 Q125 75 130 95" />
          <path d="M96 85 Q65 85 62 105" />
          <path d="M104 85 Q135 85 138 105" />
          <path d="M96 95 Q58 95 60 115" />
          <path d="M104 95 Q142 95 140 115" />
          <path d="M96 105 Q55 105 60 125" />
          <path d="M104 105 Q145 105 140 125" />
          <path d="M96 115 Q60 120 65 135" />
          <path d="M104 115 Q140 120 135 135" />
          <path d="M96 125 Q70 135 75 145" />
          <path d="M104 125 Q130 135 125 145" />
        </g>
        
        {/* Clavicles */}
        <path d="M96 68 L60 70" strokeWidth="3" />
        <path d="M104 68 L140 70" strokeWidth="3" />

        {/* Pelvis */}
        <path d="M100 175 C80 170, 70 180, 68 190 C75 200, 95 210, 100 215 C105 210, 125 200, 132 190 C130 180, 120 170, 100 175 Z" />

        {/* Humerus (Upper arms) */}
        <line x1="58" y1="75" x2="42" y2="130" strokeWidth="4" />
        <line x1="142" y1="75" x2="158" y2="130" strokeWidth="4" />

        {/* Radius/Ulna (Lower arms) */}
        <line x1="42" y1="135" x2="28" y2="190" strokeWidth="2.5" />
        <line x1="39" y1="135" x2="25" y2="190" strokeWidth="2.5" />
        <line x1="158" y1="135" x2="172" y2="190" strokeWidth="2.5" />
        <line x1="161" y1="135" x2="175" y2="190" strokeWidth="2.5" />

        {/* Femur (Upper legs) */}
        <line x1="75" y1="200" x2="65" y2="310" strokeWidth="5" />
        <line x1="125" y1="200" x2="135" y2="310" strokeWidth="5" />
        
        {/* Kneecaps */}
        <circle cx="65" cy="315" r="4" />
        <circle cx="135" cy="315" r="4" />

        {/* Tibia/Fibula (Lower legs) */}
        <line x1="64" y1="322" x2="68" y2="440" strokeWidth="4" />
        <line x1="60" y1="322" x2="62" y2="440" strokeWidth="2" />
        <line x1="136" y1="322" x2="132" y2="440" strokeWidth="4" />
        <line x1="140" y1="322" x2="138" y2="440" strokeWidth="2" />
        
        {/* Hands/Feet Simplified */}
        <rect x="18" y="195" width="12" height="30" rx="3" />
        <rect x="170" y="195" width="12" height="30" rx="3" />
        <path d="M60 445 L78 445 L80 480 L60 480 Z" />
        <path d="M140 445 L122 445 L120 480 L140 480 Z" />
      </g>
    </svg>
  );
}
