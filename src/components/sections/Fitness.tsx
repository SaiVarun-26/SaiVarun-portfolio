import { forwardRef } from "react";
import { Section } from "@/components/Section";

/**
 * A small personal aside. Kept intentionally sparse to match the
 * editorial, whitespace-first tone of the rest of the page.
 */
export const Fitness = forwardRef<HTMLElement>((_, ref) => {
  return (
    <Section id="fitness" ref={ref} fullHeight={false}>
      <div className="mx-auto max-w-[760px]">
        <p
          className="mb-10 text-sm font-medium uppercase tracking-[0.25em]"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          Beyond the screen
        </p>
        <p className="text-[clamp(22px,2.6vw,30px)] font-medium leading-[1.35] tracking-[-0.01em] text-foreground">
          I train the same way I build — with patience, consistency, and a
          science-based approach. Progress compounds when you respect the
          process.
        </p>
      </div>
    </Section>
  );
});

Fitness.displayName = "Fitness";
