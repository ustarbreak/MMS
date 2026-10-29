/**
 * ParticleField — lightweight CSS-only ambient particles for hero/atmosphere sections.
 * Deterministic layout (seeded), low count, decorative only, disabled under reduced motion.
 */
import { useMemo } from "react";

interface ParticleFieldProps {
  count?: number;
  className?: string;
}

/** Small deterministic PRNG so particle positions are stable across renders. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function ParticleField({ count = 22, className = "" }: ParticleFieldProps) {
  const particles = useMemo(() => {
    const rand = mulberry32(20261029);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.round(rand() * 1000) / 10}%`,
      top: `${15 + Math.round(rand() * 850) / 10}%`,
      duration: `${(9 + rand() * 13).toFixed(1)}s`,
      delay: `-${(rand() * 18).toFixed(1)}s`,
    }));
  }, [count]);

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {particles.map((p) => (
        <i
          key={p.id}
          className="mm-particle"
          style={{
            left: p.left,
            top: p.top,
            ["--mm-duration" as string]: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
