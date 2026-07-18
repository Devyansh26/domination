import * as React from "react";

export function CirculatoryFigure({ className }: { className?: string }) {
  const arteryColor = "#5a3a3a";
  const veinColor = "#4a2e2e";
  const bgOutline = "rgba(90, 58, 58, 0.1)";

  return (
    <svg viewBox="0 0 200 520" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill={bgOutline} d="M100 15 C 88 15, 78 25, 78 38 C 78 48, 83 56, 90 60 L 90 70 C 65 72, 45 85, 35 100 C 28 115, 20 160, 15 190 C 12 210, 15 240, 22 250 C 28 258, 35 250, 38 235 C 40 220, 48 180, 50 160 L 55 160 L 55 260 C 55 280, 60 380, 62 420 C 64 460, 65 490, 60 500 C 55 510, 75 515, 80 500 C 85 480, 92 420, 95 380 L 105 380 C 108 420, 115 480, 120 500 C 125 515, 145 510, 140 500 C 135 490, 136 460, 138 420 C 140 380, 145 280, 145 260 L 145 160 L 150 160 C 152 180, 160 220, 162 235 C 165 250, 172 258, 178 250 C 185 240, 188 210, 185 190 C 180 160, 172 115, 165 100 C 155 85, 135 72, 110 70 L 110 60 C 117 56, 122 48, 122 38 C 122 25, 112 15, 100 15 Z" />

      {/* Heart */}
      <path fill={arteryColor} d="M100 105 C92 95, 85 110, 100 125 C115 110, 108 95, 100 105 Z" />

      <g fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Arteries */}
        <g stroke={arteryColor}>
          {/* Aorta & Torso */}
          <path d="M100 105 L100 60" strokeWidth="2.5" />
          <path d="M100 125 L95 200 L75 300 L70 480" strokeWidth="2" />
          <path d="M95 200 L125 300 L130 480" strokeWidth="2" />
          {/* Arms */}
          <path d="M100 75 Q70 70 50 110 L30 180 L20 230" strokeWidth="1.8" />
          <path d="M100 75 Q130 70 150 110 L170 180 L180 230" strokeWidth="1.8" />
          {/* Head */}
          <path d="M100 60 L95 30 M100 60 L105 30" />
          {/* Minor Arteries */}
          <path d="M75 300 Q65 350 62 430 M125 300 Q135 350 138 430" strokeWidth="1" />
          <path d="M50 110 Q40 140 25 180 M150 110 Q160 140 175 180" strokeWidth="1" />
        </g>

        {/* Veins */}
        <g stroke={veinColor} opacity="0.85">
          <path d="M105 105 L105 60" strokeWidth="2.5" />
          <path d="M105 125 L105 200 L85 300 L80 480" strokeWidth="2" />
          <path d="M105 200 L115 300 L120 480" strokeWidth="2" />
          {/* Arms */}
          <path d="M105 80 Q75 75 55 115 L35 185 L25 235" strokeWidth="1.8" />
          <path d="M105 80 Q125 75 145 115 L165 185 L175 235" strokeWidth="1.8" />
          {/* Head */}
          <path d="M105 60 L90 35 M105 60 L110 35" />
          {/* Minor Veins */}
          <path d="M85 300 Q75 350 72 430 M115 300 Q125 350 128 430" strokeWidth="1" />
          <path d="M55 115 Q45 145 35 185 M145 115 Q155 145 165 185" strokeWidth="1" />
        </g>
      </g>
    </svg>
  );
}
