import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { MaskedReveal } from "@/components/MaskedReveal";
import { Navigation } from "@/components/Navigation";
import { ResumeButton } from "@/components/ResumeButton";
import { Background } from "@/components/Background";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { profile } from "@/config/portfolio";
import { introTiming, spring } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { useActiveSection } from "@/hooks/use-active-section";

type IntroPhase =
  | "black" // pure black, nothing visible
  | "name" // centered name revealed
  | "glide" // name gliding up into its hero resting position
  | "done"; // experience live

/**
 * The intro sequence itself is untouched. Only its playback is gated: it
 * plays on the first visit in a browser tab and never again on refresh or
 * on returning within that tab. A new tab is a new session, so it plays.
 */
const INTRO_SESSION_KEY = "svt:intro-played:v1";

function introAlreadyPlayed(): boolean {
  try {
    return window.sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
  } catch {
    // Private mode / blocked storage: behave like a first visit.
    return false;
  }
}

function rememberIntroPlayed() {
  try {
    window.sessionStorage.setItem(INTRO_SESSION_KEY, "1");
  } catch {
    // Storage unavailable — nothing to remember.
  }
}

type LayoutProps = {
  children: React.ReactNode;
  /** Notifies the page when the hero copy (headline/subtitle) may reveal. */
  onReady?: (ready: boolean) => void;
};

/**
 * Orchestrates the intro and persistent chrome as one continuous story.
 *
 * Timeline:
 *   black (300ms) → reveal centred name → hold (700ms)
 *   → name glides straight up into its hero position (shared layout)
 *   → headline + subtitle reveal → chrome (nav / resume / scroll / logo)
 *
 * The centred name and the hero name share `layoutId="intro-name"`, so the
 * name physically interpolates from screen centre into the landing page.
 * The intro does not become a logo — it becomes the hero.
 */
export function Layout({ children, onReady }: LayoutProps) {
  const reduced = usePrefersReducedMotion();
  // Decided once on mount: a refresh in the same tab goes straight to
  // the live page, with no flash of the intro.
  const [skipIntro] = useState(introAlreadyPlayed);
  const [phase, setPhase] = useState<IntroPhase>(skipIntro ? "done" : "black");

  // The hero must be laid out from the glide onward so the shared-layout
  // name has a destination to travel to.
  const heroMounted = phase === "glide" || phase === "done";
  const introActive = phase !== "done";
  const activeId = useActiveSection(phase === "done");

  // Lock the page during the intro (no scroll / no scrollbar).
  useEffect(() => {
    document.body.dataset.intro = introActive ? "active" : "idle";
    return () => {
      delete document.body.dataset.intro;
    };
  }, [introActive]);

  // Drive the intro timeline.
  useEffect(() => {
    if (skipIntro) {
      onReady?.(true);
      return;
    }

    if (reduced) {
      setPhase("done");
      onReady?.(true);
      return;
    }

    // Remember it as soon as it starts, so a refresh mid-intro does not
    // replay it either.
    rememberIntroPlayed();

    const toName = introTiming.blackHold;
    const toGlide = toName + introTiming.nameReveal + introTiming.namePause;
    const toDone = toGlide + introTiming.glideDuration;

    const timers: number[] = [];
    timers.push(window.setTimeout(() => setPhase("name"), toName));
    timers.push(
      window.setTimeout(() => {
        setPhase("glide");
        // Hero copy starts revealing just after the glide begins so the
        // headline feels like a continuation of the rising name.
        onReady?.(true);
      }, toGlide)
    );
    timers.push(window.setTimeout(() => setPhase("done"), toDone));

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, skipIntro]);

  const handleLogoClick = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen w-full bg-background">
      <Background show={phase === "done"} />

      {/* ── Intro overlay: centred name before it glides into the hero ── */}
      <AnimatePresence>
        {(phase === "black" || phase === "name") && (
          <motion.div
            key="intro-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center px-8"
            exit={{ opacity: 0, transition: { duration: 0 } }}
          >
            {phase === "name" && (
              <motion.div
                layoutId="intro-name"
                layout="position"
                transition={
                  reduced
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 150, damping: 24, mass: 1 }
                }
                className="text-[clamp(28px,3.4vw,32px)] font-medium tracking-[0.02em] text-foreground"
              >
                <MaskedReveal text={profile.fullName} stagger={0.045} />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Persistent chrome (fades in only once the hero is settled) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "done" ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.6, ease: "easeOut" }}
        className="fixed left-8 top-7 z-50"
        style={{ pointerEvents: phase === "done" ? "auto" : "none" }}
      >
        <Logo onClick={handleLogoClick} />
      </motion.div>

      <Navigation
        activeId={activeId}
        onNavigate={handleNavigate}
        show={phase === "done"}
      />
      <ResumeButton show={phase === "done"} />
      <ScrollIndicator show={phase === "done"} />

      {/* ── Page content. The hero mounts for the glide so the shared
             name element has a resting place to travel into. ── */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: heroMounted ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.4, ease: "easeOut" }}
        className="relative z-10"
      >
        {children}
      </motion.main>
    </div>
  );
}
