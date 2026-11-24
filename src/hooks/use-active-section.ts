import { useEffect, useState } from "react";
import { navItems } from "@/config/portfolio";

/**
 * Tracks which section currently owns the viewport using an
 * IntersectionObserver, so the navigation indicator can follow along.
 */
export function useActiveSection(enabled: boolean): string {
  const [active, setActive] = useState(navItems[0]?.id ?? "hero");

  useEffect(() => {
    if (!enabled) return;

    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    // A section is active while it crosses a thin line 40% down the
    // viewport. Unlike an area-ratio threshold, this works for sections
    // of any height, including ones taller than the screen.
    const observer = new IntersectionObserver(
      (entries) => {
        const crossing = entries.find((e) => e.isIntersecting);
        if (crossing) setActive(crossing.target.id);
      },
      { threshold: 0, rootMargin: "-40% 0px -60% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [enabled]);

  return active;
}
