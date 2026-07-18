import * as React from "react";

export function NerveFigure({ className }: { className?: string }) {
  const nerveColor = "#5a6b4a";
  const bgOutline = "rgba(90, 107, 74, 0.1)";

  return (
    <svg viewBox="0 0 200 520" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill={bgOutline} d="M100 15 C 88 15, 78 25, 78 38 C 78 48, 83 56, 90 60 L 90 70 C 65 72, 45 85, 35 100 C 28 115, 20 160, 15 190 C 12 210, 15 240, 22 250 C 28 258, 35 250, 38 235 C 40 220, 48 180, 50 160 L 55 160 L 55 260 C 55 280, 60 380, 62 420 C 64 460, 65 490, 60 500 C 55 510, 75 515, 80 500 C 85 480, 92 420, 95 380 L 105 380 C 108 420, 115 480, 120 500 C 125 515, 145 510, 140 500 C 135 490, 136 460, 138 420 C 140 380, 145 280, 145 260 L 145 160 L 150 160 C 152 180, 160 220, 162 235 C 165 250, 172 258, 178 250 C 185 240, 188 210, 185 190 C 180 160, 172 115, 165 100 C 155 85, 135 72, 110 70 L 110 60 C 117 56, 122 48, 122 38 C 122 25, 112 15, 100 15 Z" />

      {/* Brain */}
      <path fill={nerveColor} d="M100 20 C85 20, 80 30, 85 45 C88 50, 95 55, 100 55 C105 55, 112 50, 115 45 C120 30, 115 20, 100 20 Z" />
      
      {/* Spinal Cord */}
      <line x1="100" y1="55" x2="100" y2="230" stroke={nerveColor} strokeWidth="3" strokeLinecap="round" />

      <g stroke={nerveColor} fill="none" strokeWidth="1.2">
        {/* Rib / Torso Nerves */}
        {[70, 90, 110, 130, 150, 170, 190, 210].map(y => (
          <React.Fragment key={y}>
            <path d={`M100 ${y} Q${85 - (y-70)*0.1} ${y+10} ${65} ${y+15}`} />
            <path d={`M100 ${y} Q${115 + (y-70)*0.1} ${y+10} ${135} ${y+15}`} />
          </React.Fragment>
        ))}

        {/* Left Arm */}
        <path d="M100 65 Q70 70 50 110 T30 170 T20 220" strokeWidth="1.5" />
        <path d="M75 75 Q60 100 45 130 T25 180" />
        <path d="M50 110 Q35 150 25 190" />
        
        {/* Right Arm */}
        <path d="M100 65 Q130 70 150 110 T170 170 T180 220" strokeWidth="1.5" />
        <path d="M125 75 Q140 100 155 130 T175 180" />
        <path d="M150 110 Q165 150 175 190" />

        {/* Left Leg */}
        <path d="M100 220 Q80 240 70 300 T65 400 T70 480" strokeWidth="2" />
        <path d="M100 225 Q90 260 85 330 T75 420" />
        <path d="M70 300 Q60 360 62 440" />

        {/* Right Leg */}
        <path d="M100 220 Q120 240 130 300 T135 400 T130 480" strokeWidth="2" />
        <path d="M100 225 Q110 260 115 330 T125 420" />
        <path d="M130 300 Q140 360 138 440" />
        
        {/* Extremities branching */}
        <path d="M20 220 L15 235 M20 220 L25 240 M20 220 L22 245" strokeWidth="0.8" />
        <path d="M180 220 L185 235 M180 220 L175 240 M180 220 L178 245" strokeWidth="0.8" />
        <path d="M70 480 L60 495 M70 480 L75 495 M70 480 L80 490" strokeWidth="0.8" />
        <path d="M130 480 L140 495 M130 480 L125 495 M130 480 L120 490" strokeWidth="0.8" />
      </g>
    </svg>
  );
}
