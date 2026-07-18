import * as React from "react";

export function MuscleFigure({ className }: { className?: string }) {
  const baseColor = "#6b3a3a";
  const lightColor = "#7a4a4a";
  const darkColor = "#5c2e2e";
  const gap = "#1a1015";

  return (
    <svg viewBox="0 0 200 520" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="body-clip">
          <path d="M100 15 C 88 15, 78 25, 78 38 C 78 48, 83 56, 90 60 L 90 70 C 65 72, 45 85, 35 100 C 28 115, 20 160, 15 190 C 12 210, 15 240, 22 250 C 28 258, 35 250, 38 235 C 40 220, 48 180, 50 160 L 55 160 L 55 260 C 55 280, 60 380, 62 420 C 64 460, 65 490, 60 500 C 55 510, 75 515, 80 500 C 85 480, 92 420, 95 380 L 105 380 C 108 420, 115 480, 120 500 C 125 515, 145 510, 140 500 C 135 490, 136 460, 138 420 C 140 380, 145 280, 145 260 L 145 160 L 150 160 C 152 180, 160 220, 162 235 C 165 250, 172 258, 178 250 C 185 240, 188 210, 185 190 C 180 160, 172 115, 165 100 C 155 85, 135 72, 110 70 L 110 60 C 117 56, 122 48, 122 38 C 122 25, 112 15, 100 15 Z" />
        </clipPath>
      </defs>
      
      {/* Background/Base outline */}
      <path fill={gap} d="M100 15 C 88 15, 78 25, 78 38 C 78 48, 83 56, 90 60 L 90 70 C 65 72, 45 85, 35 100 C 28 115, 20 160, 15 190 C 12 210, 15 240, 22 250 C 28 258, 35 250, 38 235 C 40 220, 48 180, 50 160 L 55 160 L 55 260 C 55 280, 60 380, 62 420 C 64 460, 65 490, 60 500 C 55 510, 75 515, 80 500 C 85 480, 92 420, 95 380 L 105 380 C 108 420, 115 480, 120 500 C 125 515, 145 510, 140 500 C 135 490, 136 460, 138 420 C 140 380, 145 280, 145 260 L 145 160 L 150 160 C 152 180, 160 220, 162 235 C 165 250, 172 258, 178 250 C 185 240, 188 210, 185 190 C 180 160, 172 115, 165 100 C 155 85, 135 72, 110 70 L 110 60 C 117 56, 122 48, 122 38 C 122 25, 112 15, 100 15 Z" />

      <g clipPath="url(#body-clip)" stroke={gap} strokeWidth="1.5">
        {/* Head and Neck */}
        <ellipse cx="100" cy="35" rx="20" ry="22" fill={baseColor} />
        <path d="M85 50 Q100 65 115 50" fill="none" strokeWidth="2" />
        <rect x="88" y="55" width="24" height="20" fill={darkColor} />

        {/* Chest (Pectorals) */}
        <path d="M60 85 Q80 80 98 90 Q80 100 65 95 Z" fill={lightColor} />
        <path d="M140 85 Q120 80 102 90 Q120 100 135 95 Z" fill={lightColor} />

        {/* Abs */}
        <rect x="85" y="105" width="14" height="15" rx="3" fill={baseColor} />
        <rect x="101" y="105" width="14" height="15" rx="3" fill={baseColor} />
        <rect x="85" y="122" width="14" height="15" rx="3" fill={baseColor} />
        <rect x="101" y="122" width="14" height="15" rx="3" fill={baseColor} />
        <rect x="87" y="139" width="12" height="15" rx="3" fill={baseColor} />
        <rect x="101" y="139" width="12" height="15" rx="3" fill={baseColor} />
        <rect x="89" y="156" width="10" height="18" rx="2" fill={baseColor} />
        <rect x="101" y="156" width="10" height="18" rx="2" fill={baseColor} />

        {/* Obliques */}
        <path d="M65 105 Q75 130 80 160 L 60 160 Q 55 130 65 105 Z" fill={darkColor} />
        <path d="M135 105 Q125 130 120 160 L 140 160 Q 145 130 135 105 Z" fill={darkColor} />

        {/* Shoulders (Deltoids) */}
        <path d="M45 75 Q60 70 70 85 Q55 100 40 95 Z" fill={baseColor} />
        <path d="M155 75 Q140 70 130 85 Q145 100 160 95 Z" fill={baseColor} />

        {/* Arms */}
        <path d="M40 95 Q30 130 25 155 Q40 150 50 115 Z" fill={lightColor} />
        <path d="M160 95 Q170 130 175 155 Q160 150 150 115 Z" fill={lightColor} />
        <path d="M25 155 Q18 190 15 220 Q30 215 38 170 Z" fill={darkColor} />
        <path d="M175 155 Q182 190 185 220 Q170 215 162 170 Z" fill={darkColor} />

        {/* Legs (Quads) */}
        <path d="M60 180 Q80 180 95 240 Q90 280 75 320 Q60 280 55 240 Z" fill={lightColor} />
        <path d="M140 180 Q120 180 105 240 Q110 280 125 320 Q140 280 145 240 Z" fill={lightColor} />

        {/* Calves */}
        <path d="M72 340 Q85 380 82 430 Q70 410 65 370 Z" fill={baseColor} />
        <path d="M128 340 Q115 380 118 430 Q130 410 135 370 Z" fill={baseColor} />
        <path d="M65 370 Q60 410 62 450 Q75 440 80 430 Z" fill={darkColor} />
        <path d="M135 370 Q140 410 138 450 Q125 440 120 430 Z" fill={darkColor} />
      </g>
    </svg>
  );
}
