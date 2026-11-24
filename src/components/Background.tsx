import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

type BackgroundProps = {
  show: boolean;
};

/**
 * Ambient layer over the pure-black canvas:
 *  · a faint radial gradient that drifts extremely slowly
 *  · an animated film-grain overlay (CSS .film-grain)
 * Never bright enough to compete with the typography.
 */
export function Background({ show }: BackgroundProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: show ? 1 : 0 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute left-1/2 top-1/2 h-[120vh] w-[120vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, hsl(0 0% 100% / 0.06) 0%, hsl(0 0% 100% / 0.015) 35%, transparent 70%)",
          }}
          animate={
            reduced
              ? undefined
              : {
                  x: [0, 24, -18, 0],
                  y: [0, -16, 20, 0],
                  scale: [1, 1.05, 0.98, 1],
                }
          }
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <div className="film-grain" aria-hidden="true" />
    </>
  );
}
