import { motion, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { spring } from "@/lib/motion";

type MaskedRevealProps = {
  text: string;
  className?: string;
  /** Seconds before the first character starts revealing. */
  delay?: number;
  /** Seconds between each character. */
  stagger?: number;
  /** aria-label override; defaults to the text itself. */
  label?: string;
};

/**
 * Reveals text one character at a time using a masked upward reveal:
 * each glyph rises from behind a clip, combining translateY, opacity
 * and a slight blur under a soft spring. No typewriter, no flash.
 */
export function MaskedReveal({
  text,
  className,
  delay = 0,
  stagger = 0.03,
  label,
}: MaskedRevealProps) {
  const reduced = usePrefersReducedMotion();
  const characters = Array.from(text);

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: reduced ? 0 : stagger,
      },
    },
  };

  const child: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4 } },
      }
    : {
        hidden: { y: "110%", opacity: 0, filter: "blur(8px)" },
        visible: {
          y: "0%",
          opacity: 1,
          filter: "blur(0px)",
          transition: spring.soft,
        },
      };

  return (
    <motion.span
      className={className}
      style={{ display: "inline-block" }}
      variants={container}
      initial="hidden"
      animate="visible"
      aria-label={label ?? text}
      role="text"
    >
      {characters.map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="reveal-mask"
          aria-hidden="true"
        >
          <motion.span style={{ display: "inline-block" }} variants={child}>
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
