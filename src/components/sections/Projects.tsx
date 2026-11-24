import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type TouchEvent as ReactTouchEvent,
} from "react";
import { animate, motion, useMotionValue, type Variants } from "framer-motion";
import {
  projects,
  projectsOutro,
  selectedWork,
  type Project,
  type ProjectAction,
} from "@/config/portfolio";
import { spring } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import {
  BrickMockup,
  ResearchMockup,
  RideSyncMockup,
  YathriMockup,
} from "@/components/ProjectsVisuals";

const viewport = { once: true, margin: "0px 0px -10% 0px" } as const;

/** The single motion curve for the horizontal stage. ~600ms, no bounce. */
const slideSpring = {
  type: "spring",
  stiffness: 190,
  damping: 28,
  mass: 1,
} as const;

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 7h8M7 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Chevron({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={
        direction === "prev"
          ? "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/nav:-translate-x-[2px] motion-reduce:transition-none motion-reduce:group-hover/nav:translate-x-0"
          : "rotate-180 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/nav:translate-x-[2px] motion-reduce:transition-none motion-reduce:group-hover/nav:translate-x-0"
      }
    >
      <path
        d="M10 3 5 8l5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The section's one reveal vocabulary, built once per motion setting. */
function useReveal() {
  const reduced = usePrefersReducedMotion();

  const rise: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
      }
    : {
        hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: spring.soft,
        },
      };

  // The preview is wiped in from the bottom, then settles.
  const image: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, delay: 0.1 } },
      }
    : {
        hidden: { opacity: 0, y: 22, clipPath: "inset(0 0 100% 0)" },
        visible: {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          transition: { ...spring.soft, delay: 0.1 },
        },
      };

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduced ? 0.04 : 0.06 } },
  };

  return { reduced, container, rise, image };
}

/** ── Small pieces ─────────────────────────────────────────────────── */

function LabelPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/[0.12] bg-white/[0.03] px-3 py-1 text-[12px] font-medium tracking-[0.01em] text-white/75">
      {children}
    </span>
  );
}

function StatusPill({ status }: { status: NonNullable<Project["status"]> }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] px-3 py-1 text-[12px] font-medium tracking-[0.01em] text-white/80">
      {status === "completed" ? (
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path
            d="M2 6.4 4.6 9 10 3.4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        // Same quiet green dot as the Experience section: no pulse, no glow.
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
      )}
      {status === "completed" ? "Completed" : "In Development"}
    </span>
  );
}

function TechPill({ children }: { children: ReactNode }) {
  return (
    <span className="block rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[12.5px] font-medium tracking-[0.01em] text-[#A1A1AA] transition-[transform,background-color,border-color,box-shadow,color] duration-300 ease-out hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.06] hover:text-white/90 hover:shadow-[0_0_22px_-4px_rgba(255,255,255,0.18)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      {children}
    </span>
  );
}

function ProjectButton({
  action,
  interactive = true,
}: {
  action: ProjectAction;
  interactive?: boolean;
}) {
  const primary = action.variant !== "ghost";

  const className = primary
    ? "group/btn inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold tracking-[0.01em] text-black outline-none transition-[opacity,transform,box-shadow] duration-300 ease-out hover:-translate-y-[2px] hover:opacity-90 hover:shadow-[0_10px_30px_-12px_rgba(255,255,255,0.35)] focus-visible:ring-2 focus-visible:ring-white/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    : "group/btn inline-flex items-center gap-2 rounded-full border border-white/[0.14] px-5 py-2.5 text-[14px] font-medium tracking-[0.01em] text-white/70 outline-none transition-[color,border-color,transform,background-color] duration-300 ease-out hover:-translate-y-[2px] hover:border-white/35 hover:bg-white/[0.04] hover:text-white focus-visible:border-white/40 focus-visible:text-white motion-reduce:transition-none motion-reduce:hover:translate-y-0";

  const content = (
    <>
      {action.label}
      <Arrow className="h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-[3px] motion-reduce:transition-none" />
    </>
  );

  if (action.href) {
    return (
      <a
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={interactive ? undefined : -1}
        className={className}
      >
        {content}
      </a>
    );
  }

  // Placeholder action: keep the affordance, but never navigate anywhere.
  return (
    <button
      type="button"
      title="Link coming soon"
      tabIndex={interactive ? undefined : -1}
      className={className}
    >
      {content}
    </button>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.title} preview`}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    );
  }

  const label = `${project.title} preview`;

  switch (project.visual) {
    case "ridesync":
      return <RideSyncMockup label={label} />;
    case "yathri":
      return <YathriMockup label={label} />;
    case "brick":
      return <BrickMockup label={label} />;
    default:
      return <ResearchMockup label={label} />;
  }
}

/** Landscape preview: rounded corners, hairline border, slow 1.02 zoom. */
function PreviewFrame({ project }: { project: Project }) {
  return (
    <div className="relative overflow-hidden rounded-[clamp(16px,1.8vw,26px)] border border-white/[0.09] bg-[#0a0a0a] shadow-[0_50px_120px_-70px_rgba(0,0,0,1)] transition-colors duration-500 group-hover:border-white/[0.18]">
      <div className="aspect-[16/10] w-full overflow-hidden">
        <div className="h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
          <ProjectVisual project={project} />
        </div>
      </div>
    </div>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2.5">
      <span className="text-[12px] font-medium uppercase tracking-[0.24em] text-white/35">
        Project {project.number}
      </span>
      <span aria-hidden="true" className="h-px w-7 bg-white/15" />
      {project.badges.map((badge) => (
        <LabelPill key={badge}>{badge}</LabelPill>
      ))}
      {project.status && <StatusPill status={project.status} />}
    </div>
  );
}

/** ── One project, one page ─────────────────────────────────────────── */

function ProjectSlide({
  project,
  active,
}: {
  project: Project;
  active: boolean;
}) {
  const { reduced, container, rise, image } = useReveal();
  const featured = Boolean(project.featured);

  return (
    <motion.div
      className="w-full shrink-0"
      style={{ pointerEvents: active ? undefined : "none" }}
      aria-hidden={!active}
      animate={
        reduced
          ? { opacity: active ? 1 : 0 }
          : { opacity: active ? 1 : 0, scale: active ? 1 : 0.94 }
      }
      transition={reduced ? { duration: 0.25 } : slideSpring}
    >
      <motion.article
        className="group relative flex h-full w-full flex-col justify-center"
        variants={container}
        initial="hidden"
        animate={active ? "visible" : "hidden"}
      >
        {/* Ghost index: atmosphere only, hidden from assistive tech. */}
        {featured && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-[0.3em] right-0 hidden select-none text-[clamp(7rem,13vw,12rem)] font-bold leading-none tracking-[-0.06em] text-white/[0.035] lg:block"
          >
            {project.number}
          </span>
        )}

        <div className="grid grid-cols-1 items-center gap-[clamp(30px,4vw,72px)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          {/* Copy */}
          <div className="min-w-0">
            <motion.div variants={rise}>
              <ProjectMeta project={project} />
            </motion.div>

            <motion.h3
              variants={rise}
              className={`mt-5 text-balance font-bold leading-[1.02] tracking-[-0.04em] text-foreground transition-transform duration-500 ease-out group-hover:translate-x-[4px] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 ${
                featured
                  ? "text-[clamp(2.6rem,5.2vw,4.4rem)]"
                  : "text-[clamp(2.1rem,3.6vw,3.1rem)]"
              }`}
            >
              {project.title}
            </motion.h3>

            {project.subtitle && (
              <motion.p
                variants={rise}
                className="mt-3 text-[15px] font-medium leading-snug text-white/50 md:text-[16px]"
              >
                {project.subtitle}
              </motion.p>
            )}

            <motion.div
              variants={rise}
              className="mt-[clamp(22px,2.4vw,34px)] flex max-w-[48ch] flex-col gap-3.5"
            >
              {project.description.map((text) => (
                <p
                  key={text}
                  className="text-[15.5px] font-medium leading-[1.7] md:text-[16.5px]"
                  style={{ color: "#A1A1AA" }}
                >
                  {text}
                </p>
              ))}
            </motion.div>

            {project.tech.length > 0 && (
              <motion.div variants={rise} className="mt-[clamp(22px,2.4vw,30px)]">
                <ul
                  className="flex flex-wrap gap-2"
                  aria-label={`${project.title} tech stack`}
                >
                  {project.tech.map((tech) => (
                    <li key={tech} className="list-none">
                      <TechPill>{tech}</TechPill>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            <motion.div
              variants={rise}
              className="mt-[clamp(26px,3vw,40px)] flex flex-wrap items-center gap-3"
            >
              {project.actions.map((action) => (
                <ProjectButton
                  key={action.label}
                  action={action}
                  interactive={active}
                />
              ))}
            </motion.div>
          </div>

          {/* Preview */}
          <motion.div variants={image} className="min-w-0">
            <PreviewFrame project={project} />
          </motion.div>
        </div>
      </motion.article>
    </motion.div>
  );
}

function NavButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous project" : "Next project"}
      className="group/nav inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.14] text-white/70 outline-none transition-[color,background-color,border-color,transform,opacity] duration-300 ease-out hover:-translate-y-[1px] hover:border-white/35 hover:bg-white/[0.06] hover:text-white focus-visible:border-white/40 focus-visible:text-white disabled:pointer-events-none disabled:opacity-25 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <Chevron direction={direction} />
    </button>
  );
}

/** The quiet closing beat, handing off to Contact. */
function ProjectsOutro() {
  const { container, rise } = useReveal();

  return (
    <motion.div
      className="mt-[clamp(64px,8vw,120px)] flex flex-col items-start gap-[clamp(28px,4vw,48px)] border-t border-white/[0.07] pt-[clamp(44px,6vw,80px)] sm:flex-row sm:items-end sm:justify-between"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <motion.p
        variants={rise}
        className="max-w-[34ch] text-balance text-[clamp(1.4rem,2.6vw,2.15rem)] font-medium leading-[1.3] tracking-[-0.02em] text-white/85"
      >
        {projectsOutro.text}
      </motion.p>

      <motion.div variants={rise} className="shrink-0">
        <ProjectButton
          action={{ label: projectsOutro.action.label, href: projectsOutro.action.href }}
        />
      </motion.div>
    </motion.div>
  );
}

/**
 * Selected Work: a horizontal showcase.
 *
 * One project at a time, moved with the arrow buttons (or a horizontal
 * swipe on touch screens). The outgoing project eases back and fades while
 * the next slides in on the same spring, so the section reads as four
 * pages rather than one long scroll.
 */
export const Projects = forwardRef<HTMLElement>((_, ref) => {
  const { reduced, container, rise } = useReveal();
  const total = projects.length;

  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  const touch = useRef<{ startX: number; startY: number; dx: number } | null>(
    null,
  );

  const select = useCallback(
    (next: number) => {
      setIndex(Math.max(0, Math.min(total - 1, next)));
      dragX.set(0);
    },
    [dragX, total],
  );

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const measure = () => setWidth(el.clientWidth);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const onTouchStart = (event: ReactTouchEvent<HTMLDivElement>) => {
    const point = event.touches[0];
    touch.current = { startX: point.clientX, startY: point.clientY, dx: 0 };
  };

  const onTouchMove = (event: ReactTouchEvent<HTMLDivElement>) => {
    const start = touch.current;
    if (!start) return;

    const point = event.touches[0];
    const dx = point.clientX - start.startX;
    const dy = point.clientY - start.startY;

    // Let vertical scrolling win; only track clearly horizontal drags.
    if (Math.abs(dx) < Math.abs(dy)) return;

    start.dx = dx;
    const atEdge = (index === 0 && dx > 0) || (index === total - 1 && dx < 0);
    dragX.set(atEdge ? dx * 0.25 : dx * 0.9);
  };

  const onTouchEnd = () => {
    const start = touch.current;
    touch.current = null;

    const threshold = Math.min(110, Math.max(44, width * 0.12));
    if (start && Math.abs(start.dx) > threshold) {
      select(index + (start.dx < 0 ? 1 : -1));
    }

    animate(dragX, 0, reduced ? { duration: 0.2 } : spring.micro);
  };

  const progress = (index + 1) / total;

  return (
    <section
      id="projects"
      data-section="projects"
      ref={ref}
      // Side gutters clear the fixed left navigation from md up.
      className="relative w-full px-6 pb-[clamp(120px,14vw,180px)] pt-[clamp(120px,14vw,180px)] sm:px-8 md:px-[clamp(136px,10vw,200px)] min-[1536px]:px-[clamp(168px,11vw,230px)]"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        {/* Header */}
        <motion.div
          className="max-w-[760px]"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.p
            variants={rise}
            className="text-[12px] font-medium uppercase tracking-[0.24em] text-white/35"
          >
            {selectedWork.eyebrow}
          </motion.p>
          <motion.h2
            variants={rise}
            className="mt-5 text-balance text-[clamp(42px,5vw,72px)] font-bold leading-none tracking-[-0.04em] text-foreground"
          >
            {selectedWork.title}
          </motion.h2>
          <motion.p
            variants={rise}
            className="mt-[clamp(20px,2.4vw,32px)] max-w-[34rem] text-balance text-[18px] font-medium leading-[1.6] md:text-[20px]"
            style={{ color: "#A1A1AA" }}
          >
            {selectedWork.subtitle}
          </motion.p>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="mt-[clamp(56px,7vw,96px)] flex items-center justify-between gap-6 border-t border-white/[0.07] pt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-[clamp(14px,2vw,26px)]">
            <p className="flex items-baseline gap-1.5 text-[12px] font-medium tabular-nums tracking-[0.16em] text-white/40">
              <span className="text-white/80">
                {String(index + 1).padStart(2, "0")}
              </span>
              / {String(total).padStart(2, "0")}
            </p>

            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="relative block h-[2px] w-10 overflow-hidden rounded-full bg-white/[0.12]">
                <motion.span
                  className="absolute inset-y-0 left-0 block rounded-full bg-white/70"
                  animate={{ width: `${progress * 100}%` }}
                  transition={reduced ? { duration: 0.2 } : spring.micro}
                />
              </span>
            </div>

            <div className="flex items-center gap-1">
              {projects.map((project, i) => (
                <button
                  key={project.number}
                  type="button"
                  onClick={() => select(i)}
                  aria-label={`Show project ${project.number}: ${project.title}`}
                  aria-current={i === index ? "true" : undefined}
                  className="group/dot flex h-6 items-center px-1 outline-none"
                >
                  <span
                    className={`block h-1 rounded-full transition-[background-color,width] duration-300 ease-out ${
                      i === index
                        ? "w-6 bg-white"
                        : "w-2.5 bg-white/20 group-hover/dot:bg-white/45"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <NavButton
              direction="prev"
              onClick={() => select(index - 1)}
              disabled={index === 0}
            />
            <NavButton
              direction="next"
              onClick={() => select(index + 1)}
              disabled={index === total - 1}
            />
          </div>
        </motion.div>

        {/* Stage */}
        <div
          ref={viewportRef}
          role="group"
          aria-roledescription="carousel"
          aria-label="Project showcase"
          className="mt-[clamp(32px,4vw,56px)] overflow-hidden"
          style={{ touchAction: "pan-y" }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchEnd}
        >
          <motion.div style={{ x: dragX }}>
            <motion.div
              className="flex items-stretch will-change-transform"
              animate={{ x: -index * width }}
              transition={reduced ? { duration: 0.2 } : slideSpring}
            >
              {projects.map((project, i) => (
                <ProjectSlide
                  key={project.number}
                  project={project}
                  active={i === index}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>

        <p className="sr-only" aria-live="polite">
          Project {index + 1} of {total}: {projects[index].title}
        </p>

        <ProjectsOutro />
      </div>
    </section>
  );
});

Projects.displayName = "Projects";
