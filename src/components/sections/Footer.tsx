import { forwardRef } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { contact, footer, profile } from "@/config/portfolio";
import { spring } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const links = [
  ...contact.socials,
  { label: "Resume", url: profile.resumeUrl },
  { label: "Email", url: `mailto:${contact.email}` },
];

// Sparse nodes for the connecting-line field. Fixed coordinates keep it
// stable and cheap; only their opacity moves.
const nodes = [
  { x: 8, y: 42 },
  { x: 24, y: 18 },
  { x: 38, y: 62 },
  { x: 57, y: 26 },
  { x: 71, y: 58 },
  { x: 88, y: 32 },
];

const lines: [number, number][] = [
  [0, 1],
  [1, 3],
  [2, 3],
  [3, 4],
  [4, 5],
  [0, 2],
];

/**
 * Footer — the page's final beat. Metadata sits above a huge, very
 * faint wordmark that runs edge to edge and is cropped by the bottom of
 * the page, so scrolling to the end resolves instead of stopping.
 */
export const Footer = forwardRef<HTMLElement>((_, ref) => {
  const reduced = usePrefersReducedMotion();
  const year = new Date().getFullYear();

  const rise = (delay: number) => ({
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduced
        ? { duration: 0.45, delay }
        : { ...spring.soft, delay },
    },
  });

  return (
    <footer
      id="footer"
      ref={ref}
      className="relative w-full overflow-hidden bg-background"
    >
      {/* Connecting lines + nodes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-60"
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="footer-rule" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="50%" stopColor="white" stopOpacity="0.12" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          {lines.map(([a, b], i) => (
            <motion.line
              key={`${a}-${b}`}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke="url(#footer-rule)"
              strokeWidth="0.08"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: reduced ? 0 : 1.6,
                delay: reduced ? 0 : 0.1 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
        </svg>

        {nodes.map((node, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
          />
        ))}
      </div>

      <div className="relative mx-auto w-full max-w-[1180px] px-6 pt-[clamp(72px,9vw,120px)] sm:px-8">
        <motion.div
          className="grid grid-cols-1 gap-x-14 gap-y-12 border-t border-white/[0.08] pt-[clamp(40px,4.6vw,60px)] md:grid-cols-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Name + sentence */}
          <motion.div variants={rise(0)} className="md:col-span-6">
            <p className="text-[clamp(19px,1.8vw,23px)] font-semibold tracking-[-0.01em] text-foreground">
              {profile.fullName}
            </p>
            <p className="mt-3 max-w-[22rem] text-[15px] font-medium leading-[1.65] text-white/45">
              {footer.tagline}
            </p>
          </motion.div>

          {/* Links */}
          <motion.div variants={rise(0.08)} className="md:col-span-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/30">
              Elsewhere
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target={link.url.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.url.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-white/55 transition-colors duration-300 hover:text-white outline-none focus-visible:text-white"
                  >
                    <span className="relative">
                      {link.label}
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white/50 transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:group-hover:scale-x-100"
                      />
                    </span>
                    <ArrowUpRight
                      size={13}
                      strokeWidth={1.6}
                      aria-hidden="true"
                      className="text-white/30 transition-[transform,color] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Status */}
          <motion.div variants={rise(0.16)} className="md:col-span-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/30">
              Status
            </p>
            <p className="mt-5 flex items-start gap-2.5 text-[14px] font-medium leading-[1.6] text-white/65">
              <span className="relative mt-[0.5em] flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40 [animation-duration:2.6s] motion-reduce:hidden" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white/80" />
              </span>
              {footer.status}
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom rule + meta */}
        <motion.div
          className="mt-[clamp(48px,6vw,80px)] flex flex-col gap-4 border-t border-white/[0.07] py-6 text-[12px] font-medium text-white/30 sm:flex-row sm:items-center sm:justify-between"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>© {year} {profile.fullName}</span>
          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: reduced ? "auto" : "smooth",
              })
            }
            className="group inline-flex items-center gap-1.5 text-left text-white/35 transition-colors duration-300 hover:text-white outline-none focus-visible:text-white"
          >
            Back to top
            <ArrowUp
              size={12}
              strokeWidth={1.8}
              aria-hidden="true"
              className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-y-0"
            />
          </button>
        </motion.div>
      </div>

      {/* Giant faded wordmark, cropped by the bottom of the page */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none relative w-full select-none overflow-hidden"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p
          className="-mb-[0.12em] whitespace-nowrap text-center font-black leading-[0.78] tracking-[-0.045em] text-white/[0.045]"
          style={{ fontSize: "clamp(38px,12.2vw,220px)" }}
        >
          {profile.fullName.toUpperCase()}
        </p>
      </motion.div>
    </footer>
  );
});

Footer.displayName = "Footer";
