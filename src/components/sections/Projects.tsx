import { forwardRef, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { projects, selectedWork, type Project } from "@/config/portfolio";
import { spring } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const mutedColor = "hsl(var(--muted-foreground))";

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

/** The image + title area links to the project's primary URL, if any. */
function PrimaryLink({
  href,
  title,
  children,
}: {
  href?: string;
  title: string;
  children: ReactNode;
}) {
  if (!href) return <div>{children}</div>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title} (opens in a new tab)`}
      className="block cursor-pointer outline-none"
    >
      {children}
    </a>
  );
}

/**
 * Selected Work: a vertical editorial list. No cards or containers;
 * whitespace separates the projects. Each project reveals once, in the
 * order image → title → description → tech → links.
 */
export const Projects = forwardRef<HTMLElement>((_, ref) => {
  const reduced = usePrefersReducedMotion();
  const settle = spring.layout;

  const fade: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4 } },
      }
    : {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: settle },
      };

  const image: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4 } },
      }
    : {
        hidden: { opacity: 0, y: 14, clipPath: "inset(0 0 100% 0)" },
        visible: {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          transition: settle,
        },
      };

  const project: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduced ? 0.05 : 0.08 } },
  };

  const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;

  return (
    <section
      id="projects"
      data-section="projects"
      ref={ref}
      className="relative w-full px-6 pb-[clamp(120px,14vw,180px)] pt-[clamp(120px,14vw,180px)] sm:px-8"
    >
      <div className="mx-auto w-full max-w-[1000px]">
        <div className="mx-auto w-full max-w-[760px] text-left">
          {/* Header */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <h2 className="text-[clamp(2.25rem,4.6vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.025em] text-foreground">
              {selectedWork.title}
            </h2>
            <p
              className="mt-4 max-w-[48ch] text-[18px] font-medium leading-[1.6]"
              style={{ color: mutedColor }}
            >
              {selectedWork.subtitle}
            </p>
          </motion.div>

          {/* Projects */}
          <div className="mt-[clamp(80px,9vw,120px)] flex flex-col gap-[clamp(120px,14vw,170px)]">
            {projects.map((p: Project) => {
              const primary = p.live ?? p.github;
              return (
                <motion.article
                  key={p.title}
                  variants={project}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  className="group"
                >
                  <PrimaryLink href={primary} title={p.title}>
                    {/* Preview image */}
                    <motion.div
                      variants={image}
                      className="overflow-hidden rounded-xl border transition-colors duration-500 group-hover:border-white/25 group-focus-within:border-white/25"
                      style={{ borderColor: "hsl(0 0% 100% / 0.1)" }}
                    >
                      <div className="aspect-[16/10] w-full bg-[#0a0a0a]">
                        <div className="h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                          {p.image && (
                            <img
                              src={p.image}
                              alt={`${p.title} preview`}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                      </div>
                    </motion.div>

                    {/* Title + year */}
                    <motion.div
                      variants={fade}
                      className="mt-8 flex items-baseline justify-between gap-6"
                    >
                      <h3 className="flex items-center text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-white/85 transition-colors duration-500 group-hover:text-white group-focus-within:text-white">
                        {p.title}
                        {primary && (
                          <Arrow className="ml-3 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-focus-within:translate-x-1 motion-reduce:transition-none" />
                        )}
                      </h3>
                      <span
                        className="shrink-0 text-base font-medium tabular-nums"
                        style={{ color: "hsl(var(--muted-foreground) / 0.7)" }}
                      >
                        {p.year}
                      </span>
                    </motion.div>
                  </PrimaryLink>

                  {/* Description */}
                  <motion.p
                    variants={fade}
                    className="mt-4 max-w-[60ch] text-[18px] font-medium leading-[1.6] md:text-[20px]"
                    style={{ color: mutedColor }}
                  >
                    {p.description}
                  </motion.p>

                  {/* Tech stack */}
                  <motion.p
                    variants={fade}
                    className="mt-5 text-base font-medium tracking-[0.01em]"
                    style={{ color: "hsl(var(--muted-foreground) / 0.7)" }}
                  >
                    {p.tech.join(" · ")}
                  </motion.p>

                  {/* Links */}
                  {(p.github || p.live) && (
                    <motion.div variants={fade} className="mt-8 flex gap-3">
                      {p.github && <ProjectButton href={p.github} label="GitHub" />}
                      {p.live && <ProjectButton href={p.live} label="Live Demo" />}
                    </motion.div>
                  )}
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

Projects.displayName = "Projects";

function ProjectButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/btn inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium tracking-[0.02em] text-white/70 outline-none transition-colors duration-300 hover:border-white/40 hover:text-white focus-visible:border-white/40 focus-visible:text-white"
      style={{ borderColor: "hsl(0 0% 100% / 0.14)" }}
    >
      {label}
      <Arrow className="h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-0.5 motion-reduce:transition-none" />
    </a>
  );
}
