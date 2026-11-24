import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/config/portfolio";
import { spring } from "@/lib/motion";

type LogoProps = {
  onClick?: () => void;
};

/**
 * The docked logo. Reads "SVT" at rest and expands horizontally to the
 * full name on hover using width interpolation — no tooltip, no popover.
 * The extra letters fade in naturally as the container grows.
 */
export function Logo({ onClick }: LogoProps) {
  const [hovered, setHovered] = useState(false);

  // The three "anchor" initials stay put; the remaining letters of
  // each word fade in on hover to spell the full name.
  const parts = [
    { initial: "S", rest: "ai" },
    { initial: "V", rest: "arun" },
    { initial: "T", rest: "ej" },
  ];

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-label={profile.fullName}
      className="group relative flex items-center overflow-hidden whitespace-nowrap text-left text-[17px] font-semibold tracking-[0.02em] text-foreground outline-none"
      transition={spring.micro}
    >
      <span className="flex items-baseline">
        {parts.map((part, i) => (
          <span key={part.initial} className="flex items-baseline">
            {i > 0 && (
              <AnimatePresence initial={false}>
                {hovered && (
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={spring.micro}
                    className="inline-block overflow-hidden"
                  >
                    &nbsp;
                  </motion.span>
                )}
              </AnimatePresence>
            )}
            <span>{part.initial}</span>
            <AnimatePresence initial={false}>
              {hovered && (
                <motion.span
                  initial={{ width: 0, opacity: 0, filter: "blur(4px)" }}
                  animate={{ width: "auto", opacity: 1, filter: "blur(0px)" }}
                  exit={{ width: 0, opacity: 0, filter: "blur(4px)" }}
                  transition={spring.micro}
                  className="inline-block overflow-hidden"
                >
                  {part.rest}
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        ))}
      </span>
    </motion.button>
  );
}
