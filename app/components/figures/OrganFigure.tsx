import * as React from "react";

export function OrganFigure({ className }: { className?: string }) {
  const bgOutline = "rgba(122, 107, 74, 0.15)";
  const lungs = "#8a7550";
  const heart = "#664937";
  const liver = "#5e4c32";
  const stomach = "#9e865f";
  const largeIntestine = "#786445";
  const smallIntestine = "#b09976";
  const kidneys = "#4a3c26";

  return (
    <svg viewBox="0 0 200 520" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill={bgOutline} d="M100 15 C 88 15, 78 25, 78 38 C 78 48, 83 56, 90 60 L 90 70 C 65 72, 45 85, 35 100 C 28 115, 20 160, 15 190 C 12 210, 15 240, 22 250 C 28 258, 35 250, 38 235 C 40 220, 48 180, 50 160 L 55 160 L 55 260 C 55 280, 60 380, 62 420 C 64 460, 65 490, 60 500 C 55 510, 75 515, 80 500 C 85 480, 92 420, 95 380 L 105 380 C 108 420, 115 480, 120 500 C 125 515, 145 510, 140 500 C 135 490, 136 460, 138 420 C 140 380, 145 280, 145 260 L 145 160 L 150 160 C 152 180, 160 220, 162 235 C 165 250, 172 258, 178 250 C 185 240, 188 210, 185 190 C 180 160, 172 115, 165 100 C 155 85, 135 72, 110 70 L 110 60 C 117 56, 122 48, 122 38 C 122 25, 112 15, 100 15 Z" />

      {/* Trachea & Esophagus */}
      <path d="M98 60 L98 80 M102 60 L102 80" stroke={lungs} strokeWidth="2" fill="none" />

      {/* Lungs */}
      <path fill={lungs} d="M95 80 C80 75, 65 90, 65 115 C65 135, 75 145, 95 140 Z" />
      <path fill={lungs} d="M105 80 C120 75, 135 90, 135 115 C135 135, 125 145, 105 140 Z" />

      {/* Heart */}
      <path fill={heart} d="M100 115 C95 110, 90 120, 100 135 C115 125, 110 110, 100 115 Z" />

      {/* Liver */}
      <path fill={liver} d="M60 145 C60 135, 100 135, 115 145 C120 155, 110 165, 90 165 C70 165, 60 155, 60 145 Z" />

      {/* Stomach */}
      <path fill={stomach} d="M105 145 C115 140, 135 145, 135 155 C135 170, 115 165, 105 155 C100 150, 100 148, 105 145 Z" />

      {/* Kidneys */}
      <path fill={kidneys} d="M78 165 C73 165, 70 175, 75 180 C80 185, 85 175, 78 165 Z" />
      <path fill={kidneys} d="M122 165 C127 165, 130 175, 125 180 C120 185, 115 175, 122 165 Z" />

      {/* Large Intestine */}
      <path fill="none" stroke={largeIntestine} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" 
            d="M75 220 L75 180 L125 180 L125 220 L100 230" />
            
      {/* Small Intestine (coiled) */}
      <path fill="none" stroke={smallIntestine} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
            d="M85 190 Q95 185 105 190 T115 200 T95 205 T85 210 T105 215 T100 225" />

    </svg>
  );
}
