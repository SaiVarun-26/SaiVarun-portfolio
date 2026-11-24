import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { profile } from "@/config/portfolio";
import { spring } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

type HeroProps = {
  /**
   * Begin revealing the headline + subtitle. The name itself is placed
   * via a shared-layout handoff from the intro overlay, so it is always
   * present; only the copy beneath it waits on `show`.
   */
  show: boolean;
};

/**
 * The hero. Left-aligned, vertically centred, and typographic.
 *
 * The headline is two lines on every desktop width. It is sized in
 * container query units (cqw), so the longest line ("around everyday
 * friction.", measured at ~12.3em) is always about 93% of the available
 * width and
 * cannot wrap, from a 14" laptop to a 27" monitor. Below `md` the lines
 * are allowed to wrap naturally.
 *
 * The name carries `layoutId="intro-name"` for the intro glide.
 */
export function Hero({ show }: HeroProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Gentle upward fade as the hero scrolls away.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Subtle cursor parallax (3–6px). Almost imperceptible by design.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const tx = useSpring(px, { stiffness: 60, damping: 18 });
  const ty = useSpring(py, { stiffness: 60, damping: 18 });

  const handlePointerMove = (e: React.PointerEvent) => {
    if (reduced) return;
    const nx = e.clientX / window.innerWidth - 0.5; // -0.5 … 0.5
    const ny = e.clientY / window.innerHeight - 0.5;
    px.set(nx * 10); // → max ~5px
    py.set(ny * 10);
  };

  // Reveal step: headline line 1, line 2, then subtitle (~120ms apart).
  const step = 0.12;
  const base = 0.05;

  const line = (i: number) => ({
    hidden: reduced
      ? { opacity: 0 }
      : { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: reduced
      ? { opacity: 1, transition: { delay: base + i * step, duration: 0.5 } }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { ...spring.soft, delay: base + i * step },
        },
  });

  return (
    <section
      id="hero"
      data-section="hero"
      ref={ref as unknown as React.RefObject<HTMLElement>}
      onPointerMove={handlePointerMove}
      // On md+ the side gutters leave room for the fixed left navigation
      // and scale with the screen, so the content block stays centred.
      className="relative flex min-h-screen w-full items-center justify-center px-8 md:px-[clamp(140px,12vw,220px)]"
    >
      <motion.div
        style={{ y: reduced ? 0 : scrollY, opacity: scrollOpacity }}
        className="w-full"
      >
        <motion.div
          style={{ x: reduced ? 0 : tx, y: reduced ? 0 : ty }}
          className="mx-auto flex w-full max-w-[1400px] flex-col items-start text-left"
        >
          {/* Name: shared-layout target for the intro glide. */}
          <motion.div
            layoutId="intro-name"
            layout="position"
            transition={
              reduced
                ? { duration: 0 }
                : { type: "spring", stiffness: 150, damping: 24, mass: 1 }
            }
            className="mb-[clamp(20px,2.2vw,32px)] text-[clamp(28px,3.4vw,32px)] font-medium tracking-[0.02em] text-foreground"
          >
            {profile.fullName}
          </motion.div>

          {/* Headline: two lines. The wrapper is the size container. */}
          <div className="w-full [container-type:inline-size]">
            <h1
              className="font-black text-foreground text-[2.5rem] md:[font-size:clamp(2rem,7.6cqw,6.5rem)]"
              style={{
                lineHeight: 0.92,
                letterSpacing: "-0.02em",
                fontFeatureSettings: '"kern" 1',
              }}
            >
              {profile.headline.map((text, i) => (
                // Each line is its own mask. The bottom padding (offset by
                // a matching negative margin) keeps descenders from being
                // clipped without changing the line rhythm.
                <span
                  key={text}
                  className="block overflow-hidden pb-[0.14em] -mb-[0.14em] md:whitespace-nowrap"
                >
                  <motion.span
                    className="block"
                    initial="hidden"
                    animate={show ? "visible" : "hidden"}
                    variants={line(i)}
                  >
                    {text}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>

          {/* Subtitle: a human sentence, neutral gray, fades up last. */}
          <motion.p
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            variants={line(profile.headline.length)}
            className="mt-[clamp(28px,3vw,44px)] max-w-[36rem] text-balance text-[clamp(17px,1.4vw,20px)] font-medium leading-[1.55] tracking-[0.01em]"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            {profile.subtitle}
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
