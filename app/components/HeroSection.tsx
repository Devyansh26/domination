"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "framer-motion";

const SYSTEMS = [
  {
    key: "muscular",
    label: "MUSCULAR SYSTEM",
    src: "/body/1.png",
    description:
      "Over 600 muscles work in concert to produce movement, maintain posture, and generate heat. The muscular system is the body\u2019s engine \u2014 responsible for every voluntary and involuntary motion.",
  },
  {
    key: "circulatory",
    label: "CIRCULATORY SYSTEM",
    src: "/body/2.png",
    description:
      "A network spanning 60,000 miles of blood vessels delivers oxygen, nutrients, and immune cells to every tissue. The heart beats over 100,000 times a day to keep this lifeline flowing.",
  },
  {
    key: "skeletal",
    label: "SKELETAL SYSTEM",
    src: "/body/3.png",
    description:
      "206 bones form the structural framework that protects vital organs, anchors muscles, and stores minerals. The skeleton is continuously remodeling itself throughout life.",
  },
  {
    key: "lymphatic",
    label: "LYMPHATIC SYSTEM",
    src: "/body/4.png",
    description:
      "A silent defense network of nodes, vessels, and organs filters pathogens and maintains fluid balance. The lymphatic system is essential for immune surveillance and response.",
  },
  {
    key: "nervous",
    label: "NERVOUS SYSTEM",
    src: "/body/5.png",
    description:
      "Billions of neurons form the body\u2019s communication network, transmitting electrical signals at speeds up to 270 mph. The nervous system governs every thought, sensation, and reflex.",
  },
];

const TOTAL = SYSTEMS.length;
// Total scroll segments: 1 title screen + 1 per system
const SEGMENTS = TOTAL + 1;

/* ────────────────────────────────────────────
   FIGURE LAYER
   Stacked images. First image (index 0) has
   the HIGHEST z-index (in front). Each next
   image sits BEHIND the previous, offset
   rightward. Animation: opacity + translateX
   only (no Y movement).
   ──────────────────────────────────────────── */

function FigureLayer({
  system,
  index,
  scrollYProgress,
  reducedMotion,
}: {
  system: (typeof SYSTEMS)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  // Figure i reveals during scroll segment (i+1), synced with its info panel
  const segmentStart = (index + 0.5) / SEGMENTS;
  const segmentEnd = (index + 1.2) / SEGMENTS;

  const opacity = useTransform(
    scrollYProgress,
    [segmentStart, segmentEnd],
    [0, 1]
  );
  // Slide in from the left: starts off-screen left, lands at its stacked offset
  const xOffset = index * 20; // final resting position (px offset rightward)
  const x = useTransform(
    scrollYProgress,
    [segmentStart, segmentEnd],
    [-80, xOffset]
  );

  // First image = highest z-index (in front), last = lowest (behind)
  const zIndex = TOTAL - index;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        zIndex,
        ...(reducedMotion
          ? { transform: `translateX(${xOffset}px)` }
          : { opacity, x }),
      }}
    >
      <div className="relative w-full h-full">
        <Image
          src={system.src}
          alt={system.label}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={index < 2}
        />
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   HERO SECTION
   Left: sticky column with stacking figures
   Right: naturally scrolling text — title
   block then one info panel per system, each
   exactly 100vh so they stay in sync with
   figure reveals.
   ──────────────────────────────────────────── */

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section ref={sectionRef}>
      <div className="flex flex-col md:flex-row">
        {/* ─── LEFT: Sticky figure stack ─── */}
        <div className="md:w-[45%] lg:w-1/2 md:flex-shrink-0">
          <div className="sticky top-0 h-screen overflow-hidden">
            {/* Bottom gradient for depth */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0e1a] to-transparent z-[60] pointer-events-none" />

            {/* Figures — all stacked absolutely */}
            {SYSTEMS.map((system, i) => (
              <FigureLayer
                key={system.key}
                system={system}
                index={i}
                scrollYProgress={scrollYProgress}
                reducedMotion={reducedMotion}
              />
            ))}

            {/* Progress dots */}
            <div className="absolute bottom-5 left-0 right-0 z-[60] flex justify-center gap-2.5">
              {SYSTEMS.map((system, i) => (
                <FigureDot
                  key={system.key}
                  index={i}
                  scrollYProgress={scrollYProgress}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ─── RIGHT: Scrolling text ─── */}
        <div className="md:w-[55%] lg:w-1/2 md:flex-shrink-0 px-8 md:px-12 lg:px-20">
          {/* Title block */}
          <div className="h-screen flex items-center">
            <div>
              <p className="label-caps mb-5">Problem Code MED-03</p>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-foreground-bright mb-6 leading-tight">
                Health Emergency
                <br />
                Response Portal
              </h1>
              <p className="text-sm md:text-base text-foreground-muted max-w-md leading-relaxed mb-8">
                Rapid access to critical medical systems and emergency
                resources. Scroll to explore the layers of the human body that
                our platform helps protect.
              </p>
              <div className="flex items-center gap-3 text-foreground-muted/40">
                <motion.div
                  className="w-px h-8 bg-white/[0.2]"
                  animate={{ scaleY: [1, 0.5, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ originY: 0 }}
                />
                <span className="label-caps text-[0.55rem]">
                  Scroll to explore
                </span>
              </div>
            </div>
          </div>

          {/* Info panels — one per system, each 100vh */}
          {SYSTEMS.map((system, i) => (
            <motion.div
              key={system.key}
              className="h-screen flex items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <div className="max-w-md">
                <p className="label-caps mb-4 text-white/20">
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(TOTAL).padStart(2, "0")}
                </p>
                <h2 className="font-heading text-2xl md:text-3xl font-light tracking-tight text-foreground-bright mb-6">
                  {system.label}
                </h2>
                <p className="text-sm md:text-base text-foreground-muted leading-relaxed">
                  {system.description}
                </p>
                <div className="mt-8 w-12 h-px bg-white/[0.12]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   FIGURE DOT
   ──────────────────────────────────────────── */

function FigureDot({
  index,
  scrollYProgress,
  reducedMotion,
}: {
  index: number;
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const segmentStart = (index + 0.5) / SEGMENTS;
  const segmentEnd = (index + 1.2) / SEGMENTS;
  const opacity = useTransform(
    scrollYProgress,
    [segmentStart, segmentEnd],
    [0.15, 0.8]
  );
  const scale = useTransform(
    scrollYProgress,
    [segmentStart, segmentEnd],
    [0.7, 1]
  );

  return (
    <motion.div
      className="w-1.5 h-1.5 rounded-full bg-white"
      style={reducedMotion ? { opacity: 0.8 } : { opacity, scale }}
    />
  );
}
