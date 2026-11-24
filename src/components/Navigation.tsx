import { motion } from "framer-motion";
import { navItems } from "@/config/portfolio";
import { spring } from "@/lib/motion";

type NavigationProps = {
  activeId: string;
  onNavigate: (id: string) => void;
  /** Gate the entrance until the intro has finished. */
  show: boolean;
};

/**
 * Fixed left navigation. Enters with a staggered opacity + translateX
 * reveal once the intro completes. The active-section dot uses a shared
 * layoutId so it glides between items as you scroll.
 */
export function Navigation({ activeId, onNavigate, show }: NavigationProps) {
  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -12 },
    visible: { opacity: 1, x: 0, transition: spring.soft },
  };

  return (
    <motion.nav
      aria-label="Section navigation"
      className="fixed left-8 top-1/2 z-40 hidden -translate-y-1/2 md:block"
      variants={container}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
    >
      <ul className="flex flex-col gap-5">
        {navItems.map((nav) => {
          const isActive = nav.id === activeId;
          return (
            <motion.li key={nav.id} variants={item}>
              <button
                type="button"
                onClick={() => onNavigate(nav.id)}
                className="group relative flex items-center gap-3 outline-none"
                aria-current={isActive ? "true" : undefined}
              >
                <span className="relative flex h-1.5 w-1.5 items-center justify-center">
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute h-1.5 w-1.5 rounded-full bg-foreground"
                      transition={spring.layout}
                    />
                  )}
                  {!isActive && (
                    <span className="h-1 w-1 rounded-full bg-white/25 transition-colors duration-300 group-hover:bg-white/50" />
                  )}
                </span>
                <span
                  className={`text-sm tracking-[0.02em] transition-opacity duration-300 ${
                    isActive
                      ? "text-foreground opacity-100"
                      : "text-muted-foreground opacity-60 group-hover:opacity-100"
                  }`}
                  style={{ color: isActive ? undefined : "hsl(var(--muted-foreground))" }}
                >
                  {nav.label}
                </span>
              </button>
            </motion.li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
