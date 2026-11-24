import { forwardRef } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Check, Lock } from "lucide-react";
import {
  experienceHeader,
  experiences,
  type Experience,
} from "@/config/portfolio";
import {
  DashboardMockup,
  PhoneMockup,
} from "@/components/ExperienceVisuals";
import { spring } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const calm: [number, number, number, number] = [0.22, 1, 0.36, 1];
const step = 0.1;
const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;

/** One reveal system for the whole section, built once per motion setting. */
function useVariants() {
  const reduced = usePrefersReducedMotion();

  const reveal = (delay: number): Variants =>
    reduced
      ? {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.5, delay } },
        }
      : {
          hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { ...spring.soft, delay },
          },
        };

  // The visual rises a little further than text and skips the blur.
  const rise = (delay: number): Variants =>
    reduced
      ? {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.5, delay } },
        }
      : {
          hidden: { opacity: 0, y: 36 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { ...spring.soft, delay },
          },
        };

  const chips: Variants = {
    hidden: {},
    visible: {
      transition: { delayChildren: step * 5, staggerChildren: reduced ? 0 : 0.04 },
    },
  };

  const chip: Variants = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 8 },
        visible: { opacity: 1, y: 0, transition: spring.soft },
      };

  return { reduced, reveal, rise, chips, chip };
}

function StatusBadge({ item }: { item: Experience }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] px-3 py-1 text-[13px] font-medium tracking-[0.01em] text-white/80 transition-colors duration-300 hover:border-white/30">
      {item.status === "completed" ? (
        <Check size={12} strokeWidth={2.25} aria-hidden="true" />
      ) : (
        // A quiet green dot: no glow, no pulse.
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-emerald-400/80"
        />
      )}
      {item.statusLabel}
    </span>
  );
}

/** Outlined badge with the same size and weight as the status badge. */
function TypeBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/[0.12] px-3 py-1 text-[12px] font-medium uppercase tracking-[0.08em] text-white/80 transition-colors duration-300 hover:border-white/30">
      {label}
    </span>
  );
}

function Chapter({ item, reverse }: { item: Experience; reverse: boolean }) {
  const { reduced, reveal, rise, chips, chip } = useVariants();

  // Short bullets read better in two columns; long ones stay in one.
  const compact = item.bullets.every((b) => b.length < 36);

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={`relative mx-auto grid w-full max-w-[760px] grid-cols-1 gap-[clamp(40px,6vw,96px)] xl:max-w-none xl:items-start ${
        reverse
          ? "xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
          : "xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
      }`}
    >
      {/* Timeline node (1536px and up, where there is room beside the nav) */}
      <motion.span
        aria-hidden="true"
        variants={reveal(0)}
        className="absolute -left-14 top-[13px] hidden min-[1536px]:block"
      >
        <span className="absolute h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-black" />
        <span className="absolute right-full top-0 mr-5 hidden -translate-y-1/2 whitespace-nowrap text-[12px] font-medium tracking-[0.02em] text-white/35 min-[2000px]:block">
          {item.company}
        </span>
      </motion.span>

      {/* Text */}
      <div className={`min-w-0 ${reverse ? "xl:order-2" : ""}`}>
        {/* The company is the headline of each chapter. */}
        <motion.div variants={reveal(step)}>
          <h3 className="text-[clamp(2.5rem,4.4vw,3.6rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-foreground">
            {item.company}
          </h3>
          <p
            className="mt-3 text-[18px] font-medium leading-snug md:text-[20px]"
            style={{ color: "#A1A1AA" }}
          >
            {item.role}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <StatusBadge item={item} />
            {item.typeLabel && <TypeBadge label={item.typeLabel} />}
            <span className="text-[13px] font-medium tabular-nums text-[#71717A]">
              {item.year}
            </span>
          </div>
        </motion.div>

        {/* The project supports the internship; it does not lead it. */}
        <motion.div variants={reveal(step * 2)} className="mt-10">
          <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#71717A]">
            {item.projectLabel}
          </p>
          <h4 className="mt-2 text-[clamp(1.5rem,2.2vw,1.875rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-white/90">
            {item.project}
          </h4>
          <p
            className="mt-2 max-w-[30rem] text-[16px] font-medium leading-[1.5]"
            style={{ color: "#A1A1AA" }}
          >
            {item.tagline}
          </p>
        </motion.div>

        <motion.div
          variants={reveal(step * 3)}
          className="mt-8 flex max-w-[36rem] flex-col gap-5"
        >
          {item.description.map((text, i) => (
            <p
              key={i}
              className="text-[17px] font-medium leading-[1.75] md:text-[18px]"
              style={{ color: "#D4D4D8" }}
            >
              {text}
            </p>
          ))}
        </motion.div>

        <motion.div variants={reveal(step * 4)} className="mt-10">
          <h4 className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#71717A]">
            {item.listTitle}
          </h4>
          <ul
            className={`mt-4 grid max-w-[36rem] gap-x-8 gap-y-2.5 ${
              compact ? "sm:grid-cols-2" : ""
            }`}
          >
            {item.bullets.map((b) => (
              <li
                key={b}
                className="relative pl-5 text-[16px] font-medium leading-[1.55] before:absolute before:left-0 before:top-[0.68em] before:h-[3px] before:w-[3px] before:rounded-full before:bg-white/40"
                style={{ color: "#D4D4D8" }}
              >
                {b}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.ul
          variants={chips}
          className="mt-8 flex max-w-[36rem] flex-wrap gap-2.5"
          aria-label={`${item.project} tech stack`}
        >
          {item.stack.map((tech) => (
            <motion.li key={tech} variants={chip} className="list-none">
              {/* Hover lives on the inner element so it never competes
                  with the reveal transform on the <li>. */}
              <span className="block rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-[13px] font-medium text-[#A1A1AA] transition-[transform,background-color,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.07] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                {tech}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Visual */}
      <div
        className={`min-w-0 xl:sticky xl:top-[16vh] ${reverse ? "xl:order-1" : ""}`}
      >
        <motion.div variants={rise(step * 6)}>
          <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] transition-[transform,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] hover:border-white/20 motion-reduce:transition-none motion-reduce:hover:scale-100">
            {item.image ? (
              <img
                src={item.image}
                alt={`${item.project} screenshot`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            ) : item.visual === "dashboard" ? (
              <DashboardMockup label={`${item.project} dashboard preview`} />
            ) : (
              <PhoneMockup label={`${item.project} mobile app preview`} />
            )}
          </div>
        </motion.div>

        <motion.div variants={reveal(step * 7)} className="mt-6">
          {item.github ? (
            <a
              href={item.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 text-[15px] font-medium text-white/80 outline-none transition-colors duration-300 hover:text-white focus-visible:text-white"
            >
              GitHub
              <ArrowRight
                size={16}
                strokeWidth={1.75}
                aria-hidden="true"
                className="transition-transform duration-300 ease-out group-hover/link:translate-x-[5px] group-focus-visible/link:translate-x-[5px] motion-reduce:transition-none"
              />
            </a>
          ) : (
            <div className="flex flex-col gap-1.5">
              <span className="text-[15px] font-medium text-white/80">
                Currently in Development
              </span>
              <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#71717A]">
                <Lock size={13} strokeWidth={1.75} aria-hidden="true" />
                Private Repository
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </motion.article>
  );
}

/**
 * Experience: two chapters of a professional journey. Each chapter
 * nearly fills the width and alternates sides, so scrolling has a rhythm.
 * Below xl it collapses to a single column.
 */
export const WorkExperience = forwardRef<HTMLElement>((_, ref) => {
  const { reduced, reveal } = useVariants();
  const year = experiences[0]?.year;

  return (
    <section
      id="work"
      data-section="work"
      ref={ref}
      // Side gutters clear the fixed left navigation from md up.
      className="relative w-full px-6 pb-[clamp(96px,12vw,160px)] pt-[clamp(64px,8vw,120px)] sm:px-8 md:px-[clamp(136px,10vw,200px)] min-[1536px]:px-[clamp(168px,11vw,230px)]"
    >
      <div className="mx-auto w-full max-w-[1360px]">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.h2
            variants={reveal(0)}
            className="text-balance text-[clamp(42px,5vw,72px)] font-bold leading-none tracking-[-0.04em] text-foreground"
          >
            {experienceHeader.title}
          </motion.h2>
          <motion.p
            variants={reveal(step)}
            className="mt-[clamp(24px,2.6vw,36px)] max-w-[34rem] text-balance text-[18px] font-medium leading-[1.6] md:text-[20px]"
            style={{ color: "#A1A1AA" }}
          >
            {experienceHeader.subtitle}
          </motion.p>
        </motion.div>

        {/* Chapters, with a very quiet timeline on the far left */}
        <div className="relative mt-[clamp(96px,11vw,170px)] min-[1536px]:pl-14">
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 top-0 hidden w-px origin-top bg-white/[0.08] min-[1536px]:block"
            initial={{ scaleY: reduced ? 1 : 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: calm }}
          />
          <span
            aria-hidden="true"
            className="absolute -top-9 left-0 hidden text-[12px] font-medium tabular-nums tracking-[0.04em] text-white/35 min-[1536px]:block"
          >
            {year}
          </span>

          <div className="flex flex-col gap-[clamp(120px,14vw,200px)]">
            {experiences.map((item, i) => (
              <Chapter key={item.project} item={item} reverse={i % 2 === 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

WorkExperience.displayName = "WorkExperience";
