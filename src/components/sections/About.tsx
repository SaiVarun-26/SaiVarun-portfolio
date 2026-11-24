import { forwardRef } from "react";
import { motion, type Variants } from "framer-motion";
import { Dumbbell, GraduationCap, Hammer, Layers, type LucideIcon } from "lucide-react";
import { about } from "@/config/portfolio";
import { spring } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const icons: Record<string, LucideIcon> = {
  hammer: Hammer,
  layers: Layers,
  graduation: GraduationCap,
  dumbbell: Dumbbell,
};

// One rhythm for every gap around and between the cards.
const gap = "clamp(14px,1.4vw,20px)";

/**
 * About: centered title, one supporting sentence, one large content
 * card, and four small cards beneath it.
 *
 * Motion uses a single system, the hero's spring and 120ms cadence:
 * title → sentence → content card → small cards. Everything plays once.
 */
export const About = forwardRef<HTMLElement>((_, ref) => {
  const reduced = usePrefersReducedMotion();
  const step = 0.12;

  // The one reveal used by every element in this section.
  const reveal = (delay: number): Variants =>
    reduced
      ? {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.5, delay } },
        }
      : {
          hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { ...spring.soft, delay },
          },
        };

  return (
    <section
      id="about"
      data-section="about"
      ref={ref}
      className="relative w-full px-6 pb-[clamp(96px,12vw,160px)] pt-[clamp(48px,6vw,96px)] sm:px-8"
    >
      <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center">
        {/* Title, sentence, content card */}
        <motion.div
          className="flex w-full flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        >
          <motion.h2
            variants={reveal(0)}
            className="max-w-[900px] text-balance text-[clamp(42px,5vw,72px)] font-bold leading-none tracking-[-0.04em] text-foreground"
          >
            {about.title}
          </motion.h2>

          <motion.p
            variants={reveal(step)}
            className="mt-[clamp(24px,2.6vw,36px)] max-w-[34rem] text-balance text-[18px] font-medium leading-[1.6] md:text-[20px]"
            style={{ color: "#A1A1AA" }}
          >
            {about.subtitle}
          </motion.p>

          <motion.div
            variants={reveal(step * 2)}
            className="mt-[clamp(44px,5vw,72px)] w-full max-w-[860px] rounded-[28px] border p-[clamp(28px,4.6vw,64px)] text-left"
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            {/* Reading column: about 60 characters per line, centred in
                the card so the text never hugs one side. */}
            <div className="mx-auto flex max-w-[40rem] flex-col gap-[clamp(24px,2.4vw,34px)]">
              {about.paragraphs.map((text, i) => (
                <p
                  key={i}
                  className="text-[18px] font-medium leading-[1.8] md:text-[20px] min-[1440px]:text-[21px]"
                  style={{ color: "#D4D4D8" }}
                >
                  {text}
                </p>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Small cards: their own trigger, so they reveal when seen. */}
        <motion.ul
          className="grid w-full max-w-[860px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ marginTop: gap, gap }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        >
          {about.cards.map((card, i) => {
            const Icon = icons[card.icon];
            return (
              <motion.li
                key={card.title}
                variants={reveal(0.05 + i * 0.08)}
                className="list-none"
              >
                {/* Hover lives on the inner element so it never competes
                    with the reveal transform on the <li>. */}
                <div className="flex h-full flex-col rounded-[20px] border border-white/[0.08] bg-white/[0.02] p-[clamp(18px,1.8vw,24px)] transition-[transform,background-color,border-color] duration-300 ease-out hover:-translate-y-[3px] hover:border-white/[0.16] hover:bg-white/[0.04] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  {Icon && (
                    <Icon
                      size={20}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      style={{ color: "#A1A1AA" }}
                    />
                  )}
                  <h3 className="mt-5 text-[15px] font-semibold tracking-[0.01em] text-white">
                    {card.title}
                  </h3>
                  <p
                    className="mt-1.5 text-[15px] font-medium leading-[1.55]"
                    style={{ color: "#A1A1AA" }}
                  >
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
