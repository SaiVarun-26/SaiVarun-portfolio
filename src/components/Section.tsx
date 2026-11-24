import { forwardRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import { spring } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  /**
   * Full viewport height with the content centred. Turn this off for a
   * short interlude so the page keeps scrolling without a blank screen.
   */
  fullHeight?: boolean;
};

/**
 * A full-height section that reveals its content with a masked upward
 * reveal (clip-path + translateY + blur) the first time it scrolls into
 * view. Registers a ref so the page can observe it for active-nav state.
 */
export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, children, className, fullHeight = true }, ref) => {
    const reduced = usePrefersReducedMotion();

    const hidden = reduced
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: 48,
          filter: "blur(10px)",
          clipPath: "inset(0 0 100% 0)",
        };

    const visible = reduced
      ? { opacity: 1, transition: { duration: 0.5 } }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          clipPath: "inset(0 0 0% 0)",
          transition: spring.soft,
        };

    return (
      <section
        id={id}
        ref={ref}
        data-section={id}
        className={`relative flex w-full items-center justify-center px-8 py-28 ${
          fullHeight ? "min-h-screen" : ""
        } ${className ?? ""}`}
      >
        <motion.div
          className="w-full"
          initial={hidden}
          whileInView={visible}
          viewport={{ once: true, amount: 0.3 }}
        >
          {children}
        </motion.div>
      </section>
    );
  }
);

Section.displayName = "Section";
