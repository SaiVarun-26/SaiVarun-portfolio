import { motion, useScroll, useTransform } from "framer-motion";

type ScrollIndicatorProps = {
  show: boolean;
};

/**
 * A quiet "scroll" cue centred at the bottom of the hero. Fades out as
 * soon as the user begins scrolling so it never lingers.
 */
export function ScrollIndicator({ show }: ScrollIndicatorProps) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 120], [1, 0]);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2"
      style={{ opacity: show ? opacity : 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <span
        className="text-[11px] font-medium uppercase tracking-[0.3em]"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        Scroll
      </span>
      <motion.span
        className="h-8 w-px"
        style={{
          background:
            "linear-gradient(to bottom, hsl(0 0% 100% / 0.5), transparent)",
        }}
        animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
