import { motion } from "framer-motion";
import { profile } from "@/config/portfolio";
import { spring } from "@/lib/motion";

type ResumeButtonProps = {
  show: boolean;
};

/**
 * Fixed resume button, top-right. On hover the border brightens and the
 * arrow nudges to the right under a spring. No default browser effects.
 */
export function ResumeButton({ show }: ResumeButtonProps) {
  return (
    <motion.a
      href={profile.resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed right-8 top-8 z-40 flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium tracking-[0.02em] text-foreground outline-none"
      style={{ borderColor: "hsl(0 0% 100% / 0.14)" }}
      initial={{ opacity: 0, y: -10 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
      transition={spring.soft}
      whileHover={{ borderColor: "hsl(0 0% 100% / 0.45)" }}
    >
      <span>Resume</span>
      <motion.span
        className="inline-block"
        initial={{ x: 0 }}
        whileHover={{ x: 3 }}
        transition={spring.micro}
        aria-hidden="true"
      >
        {/* minimal arrow */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M3 7h8M7 3l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.span>
    </motion.a>
  );
}
