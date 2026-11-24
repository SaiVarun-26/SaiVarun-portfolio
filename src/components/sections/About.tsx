import { forwardRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import {
  Dumbbell,
  GraduationCap,
  Hammer,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { about } from "@/config/portfolio";
import { spring } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const icons: Record<string, LucideIcon> = {
  hammer: Hammer,
  layers: Layers,
  graduation: GraduationCap,
  dumbbell: Dumbbell,
};

/**
 * About — an asymmetric editorial layout instead of cards.
 *
 * Left gutter: a small label. Right: the headline, then a reading column
 * separated by hairlines, with the supporting sentence held in the
 * margin. The four cards became four borderless cells divided by rules,
 * so nothing reads as a dashboard tile.
 *
 * Motion: one masked rise per element, staggered on a single cadence.
 * A low-opacity spotlight follows the cursor through the section.
 */
export const About = forwardRef<HTMLElement>((_, ref) => {
  const reduced = usePrefersReducedMotion();

  // Cursor spotlight — barely visible, only enough to make the section
  // feel responsive under the pointer.
  const spotX = useMotionValue(-999);
  const spotY = useMotionValue(-999);
  const sx = useSpring(spotX, { stiffness: 55, damping: 22, mass: 0.7 });
  const sy = useSpring(spotY, { stiffness: 55, damping: 22, mass: 0.7 });

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    spotX.set(e.clientX - rect.left - 320);
    spotY.set(e.clientY - rect.top - 320);
  };

  const rise = (delay = 0): Variants =>
    reduced
      ? {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.45, delay } },
        }
      : {
          hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { ...spring.soft, delay },
          },
        };

  // Masked reveal: the line is uncovered from the bottom up.
  const unmask = (delay = 0): Variants =>
    reduced
      ? rise(delay)
      : {
          hidden: {
            opacity: 0,
            y: 20,
            clipPath: "inset(0 0 100% 0)",
          },
          visible: {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            transition: { ...spring.soft, delay },
          },
        };

  return (
    <section
      id="about"
      data-section="about"
      ref={ref}
      onPointerMove={handlePointerMove}
      className="relative w-full overflow-hidden px-6 pb-[clamp(104px,12vw,176px)] pt-[clamp(88px,10vw,144px)] sm:px-8"
    >
      {/* Pointer spotlight */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 hidden h-[640px] w-[640px] rounded-full md:block"
        style={{
          x: sx,
          y: sy,
          background:
            "radial-gradient(circle at center, hsl(0 0% 100% / 0.045) 0%, transparent 62%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1180px]">
        {/* ── Header: label in the margin, headline on the right ── */}
        <motion.div
          className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div className="lg:col-span-3">
            <motion.div variants={rise(0)} className="flex items-center gap-3">
              <motion.span
                aria-hidden="true"
                className="block h-px bg-white/25"
                initial={{ width: 0 }}
                whileInView={{ width: 28 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
              <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/45">
                {about.eyebrow}
              </span>
            </motion.div>
          </div>

          <div className="lg:col-span-9 lg:col-start-4">
            <motion.h2
              variants={unmask(0.06)}
              className="max-w-[17ch] text-balance text-[clamp(38px,5.2vw,74px)] font-bold leading-[0.98] tracking-[-0.04em] text-foreground"
            >
              {about.title}
            </motion.h2>
          </div>
        </motion.div>

        {/* Hairline that draws itself under the header */}
        <motion.div
          aria-hidden="true"
          className="mt-[clamp(40px,4.4vw,64px)] h-px w-full origin-left bg-white/[0.09]"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* ── Body: sentence in the margin, paragraphs in the reading column ── */}
        <div className="mt-[clamp(32px,3.6vw,52px)] grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-14">
          <motion.div
            className="lg:col-span-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.p
              variants={rise(0)}
              className="border-l border-white/[0.12] pl-5 text-balance text-[clamp(17px,1.5vw,21px)] font-medium leading-[1.55] text-white/65"
            >
              {about.subtitle}
            </motion.p>
          </motion.div>

          <motion.div
            className="lg:col-span-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {about.paragraphs.map((text, i) => (
              <motion.div
                key={i}
                variants={unmask(0.04 + i * 0.09)}
                className={`group border-t border-white/[0.07] py-[clamp(20px,2.4vw,32px)] transition-colors duration-500 hover:border-white/[0.16] ${
                  i === 0 ? "border-t-0 pt-0" : ""
                }`}
              >
                <div className="flex items-start gap-5 md:gap-9">
                  <span
                    aria-hidden="true"
                    className="pt-[0.35em] text-[11px] font-medium tabular-nums tracking-[0.18em] text-white/25 transition-colors duration-500 group-hover:text-white/60"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="max-w-[44rem] text-[17px] font-medium leading-[1.75] text-[#D4D4D8] min-[1440px]:text-[18px]">
                    {text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── The four traits: borderless cells divided by hairlines ── */}
        <motion.ul
          className="mt-[clamp(56px,7vw,96px)] grid grid-cols-1 border-t border-white/[0.08] sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {about.cards.map((card, i) => {
            const Icon = icons[card.icon];
            return (
              <motion.li
                key={card.title}
                variants={rise(0.04 + i * 0.08)}
                className="group relative list-none border-b border-white/[0.07] last:border-b-0 lg:border-b-0 lg:border-l lg:first:border-l-0"
              >
                {/* Hover surface: a faint wash, plus a rule that draws across the top */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-white/[0.022] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-white/40 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                />

                <div className="relative flex h-full flex-col px-0 py-7 transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:px-6 sm:py-9 lg:px-7 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                  <div className="flex items-start justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.12] transition-[border-color,background-color] duration-500 group-hover:border-white/30 group-hover:bg-white/[0.04]">
                      {Icon && (
                        <Icon
                          size={16}
                          strokeWidth={1.5}
                          aria-hidden="true"
                          className="text-white/55 transition-[transform,color] duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                        />
                      )}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-[10px] font-medium tabular-nums tracking-[0.22em] text-white/20 transition-colors duration-500 group-hover:text-white/45"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-6 text-[15px] font-semibold tracking-[0.01em] text-white">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 max-w-[15rem] text-[14px] font-medium leading-[1.6] text-white/45 transition-colors duration-500 group-hover:text-white/60">
                    {card.text}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
});

About.displayName = "About";
