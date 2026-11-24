import type { Transition } from "framer-motion";

/**
 * Shared spring vocabulary. Restrained, premium, no bounce.
 * Keeping these in one place guarantees every surface moves
 * with the same physical character.
 */
export const spring = {
  // Soft, cinematic — used for large reveals (name, hero).
  soft: {
    type: "spring",
    stiffness: 120,
    damping: 20,
    mass: 1,
  } satisfies Transition,

  // Snappier but still smooth — used for docking + layout.
  layout: {
    type: "spring",
    stiffness: 180,
    damping: 26,
    mass: 1,
  } satisfies Transition,

  // Micro-interactions (hover, arrow nudge).
  micro: {
    type: "spring",
    stiffness: 400,
    damping: 32,
  } satisfies Transition,
};

export const ease = {
  // Apple-like standard ease for non-spring opacity fades.
  standard: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

/** Intro timeline, in milliseconds. */
export const introTiming = {
  blackHold: 300, // black screen before the name appears
  nameReveal: 650, // character reveal duration for the centered name
  namePause: 700, // how long the centered name lingers before gliding
  glideDuration: 900, // name gliding up into its hero resting position
};
