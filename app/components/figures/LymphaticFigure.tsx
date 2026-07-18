import * as React from "react";

export function LymphaticFigure({ className }: { className?: string }) {
  const lymphColor = "#4a5a3a";
  const bgOutline = "rgba(74, 90, 58, 0.1)";

  // Nodes generator coordinates
  const nodes = [
    // Neck
    [92, 55], [108, 55], [90, 65], [110, 65],
    // Armpits
    [65, 95], [60, 100], [55, 105], [135, 95], [140, 100], [145, 105],
    // Chest / Abdomen
    [95, 130], [105, 130], [100, 150], [92, 170], [108, 170],
    // Groin
    [80, 220], [75, 230], [70, 240], [120, 220], [125, 230], [130, 240],
    // Knees
    [65, 330], [60, 340], [135, 330], [140, 340]
  ];

  return (
    <svg viewBox="0 0 200 520" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill={bgOutline} d="M100 15 C 88 15, 78 25, 78 38 C 78 48, 83 56, 90 60 L 90 70 C 65 72, 45 85, 35 100 C 28 115, 20 160, 15 190 C 12 210, 15 240, 22 250 C 28 258, 35 250, 38 235 C 40 220, 48 180, 50 160 L 55 160 L 55 260 C 55 280, 60 380, 62 420 C 64 460, 65 490, 60 500 C 55 510, 75 515, 80 500 C 85 480, 92 420, 95 380 L 105 380 C 108 420, 115 480, 120 500 C 125 515, 145 510, 140 500 C 135 490, 136 460, 138 420 C 140 380, 145 280, 145 260 L 145 160 L 150 160 C 152 180, 160 220, 162 235 C 165 250, 172 258, 178 250 C 185 240, 188 210, 185 190 C 180 160, 172 115, 165 100 C 155 85, 135 72, 110 70 L 110 60 C 117 56, 122 48, 122 38 C 122 25, 112 15, 100 15 Z" />

      {/* Thymus */}
      <path fill={lymphColor} d="M95 85 C92 80, 108 80, 105 85 C108 95, 92 95, 95 85 Z" />

      {/* Spleen */}
      <ellipse cx="120" cy="140" rx="5" ry="8" fill={lymphColor} transform="rotate(30 120 140)" />

      <g fill="none" stroke={lymphColor} strokeWidth="1" strokeDasharray="3 2" opacity="0.7">
        {/* Main ducts */}
        <path d="M100 65 L100 220" />
        <path d="M60 100 Q80 110 100 150" />
        <path d="M140 100 Q120 110 100 150" />
        
        {/* Limbs */}
        <path d="M60 100 L25 210 M140 100 L175 210" />
        <path d="M75 230 Q70 300 60 340 L65 480" />
        <path d="M125 230 Q130 300 140 340 L135 480" />
      </g>

      {/* Lymph nodes */}
      {nodes.map((pos, i) => (
        <circle key={i} cx={pos[0]} cy={pos[1]} r="2" fill={lymphColor} />
      ))}
    </svg>
  );
}
