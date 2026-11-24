import { forwardRef, useId, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { contact } from "@/config/portfolio";
import { ease, spring } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onValue: (value: string) => void;
  active: boolean;
  onFocus: () => void;
  onBlur: () => void;
  textarea?: boolean;
  type?: string;
  autoComplete?: string;
  placeholder: string;
};

/**
 * A single underlined field. The hairline under it is replaced by a
 * brighter line that draws left-to-right on focus, with a soft glow
 * underneath — no boxes, no glass.
 */
function Field({
  id,
  label,
  value,
  onValue,
  active,
  onFocus,
  onBlur,
  textarea,
  type = "text",
  autoComplete,
  placeholder,
}: FieldProps) {
  const inputClass =
    "mt-3 w-full resize-none bg-transparent pb-4 text-[16px] font-medium text-white outline-none placeholder:text-white/20";

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`block text-[11px] font-medium uppercase tracking-[0.24em] transition-colors duration-300 ${
          active ? "text-white/80" : "text-white/35"
        }`}
      >
        {label}
      </label>

      {textarea ? (
        <textarea
          id={id}
          name={id}
          rows={3}
          required
          value={value}
          placeholder={placeholder}
          onChange={(e) => onValue(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          className={inputClass}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required
          autoComplete={autoComplete}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onValue(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          className={inputClass}
        />
      )}

      {/* resting hairline */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/[0.12]"
      />
      {/* animated hairline */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-white/75 shadow-[0_0_12px_rgba(255,255,255,0.25)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          active ? "scale-x-100" : "scale-x-0"
        }`}
      />
      {/* glow */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 -bottom-1 h-5 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.09),transparent_70%)] transition-opacity duration-500 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

/**
 * Contact — centred, spacious, dark. A form that falls back to the
 * visitor's mail client, drifting particles behind it, and nothing
 * brighter than white on black.
 */
export const Contact = forwardRef<HTMLElement>((_, ref) => {
  const reduced = usePrefersReducedMotion();
  const baseId = useId();

  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [active, setActive] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  // Deterministic star field: positions stay put between renders.
  const stars = useMemo(() => {
    let seed = 48271;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    return Array.from({ length: 34 }, () => ({
      x: rand() * 100,
      y: rand() * 100,
      size: rand() < 0.78 ? 1 : 2,
      delay: rand() * 7,
      duration: 10 + rand() * 12,
      drift: 6 + rand() * 16,
      peak: 0.22 + rand() * 0.3,
    }));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `Portfolio enquiry — ${values.name || "New message"}`;
    const body = `${values.message}\n\n— ${values.name}\n${values.email}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section
      id="contact"
      data-section="contact"
      ref={ref}
      className="relative w-full overflow-hidden px-6 pb-[clamp(96px,11vw,152px)] pt-[clamp(80px,9vw,132px)] sm:px-8"
    >
      {/* Slow particles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {stars.map((star, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            initial={{ opacity: star.peak * 0.5 }}
            animate={
              reduced
                ? undefined
                : {
                    opacity: [star.peak * 0.35, star.peak, star.peak * 0.35],
                    y: [0, -star.drift, 0],
                  }
            }
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto w-full max-w-[720px]">
        {/* Heading */}
        <motion.div
          className="flex flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { ...spring.soft, delay: 0 },
              },
            }}
            className="flex items-center gap-3"
          >
            <span aria-hidden="true" className="block h-px w-6 bg-white/25" />
            <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/45">
              Contact
            </span>
            <span aria-hidden="true" className="block h-px w-6 bg-white/25" />
          </motion.div>

          <motion.h2
            variants={{
              hidden: reduced
                ? { opacity: 0 }
                : { opacity: 0, y: 24, clipPath: "inset(0 0 100% 0)" },
              visible: {
                opacity: 1,
                y: 0,
                clipPath: "inset(0 0 0% 0)",
                transition: reduced
                  ? { duration: 0.5, delay: 0.08 }
                  : { ...spring.soft, delay: 0.08 },
              },
            }}
            className="mt-8 text-balance text-[clamp(38px,6vw,80px)] font-bold leading-[0.98] tracking-[-0.04em] text-foreground"
          >
            Let&rsquo;s Build
            <br />
            Something Together
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { ...spring.soft, delay: 0.18 },
              },
            }}
            className="mt-7 max-w-[27rem] text-balance text-[16px] font-medium leading-[1.65] text-white/50 sm:text-[17px]"
          >
            Have a project in mind, a role to fill, or just an idea worth
            talking through? Tell me about it.
          </motion.p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="mt-[clamp(44px,5vw,68px)] flex flex-col gap-[clamp(24px,3vw,34px)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            {
              key: "name" as const,
              label: "Name",
              placeholder: "Your name",
              autoComplete: "name",
            },
            {
              key: "email" as const,
              label: "Email",
              placeholder: "you@example.com",
              type: "email",
              autoComplete: "email",
            },
          ].map((field, i) => (
            <motion.div
              key={field.key}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { ...spring.soft, delay: 0.06 + i * 0.07 },
                },
              }}
            >
              <Field
                id={`${baseId}-${field.key}`}
                label={field.label}
                placeholder={field.placeholder}
                type={field.type}
                autoComplete={field.autoComplete}
                value={values[field.key]}
                onValue={(v) =>
                  setValues((prev) => ({ ...prev, [field.key]: v }))
                }
                active={active === field.key}
                onFocus={() => setActive(field.key)}
                onBlur={() => setActive(null)}
              />
            </motion.div>
          ))}

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { ...spring.soft, delay: 0.2 },
              },
            }}
          >
            <Field
              id={`${baseId}-message`}
              label="Message"
              placeholder="What are we building?"
              textarea
              value={values.message}
              onValue={(v) => setValues((prev) => ({ ...prev, message: v }))}
              active={active === "message"}
              onFocus={() => setActive("message")}
              onBlur={() => setActive(null)}
            />
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { ...spring.soft, delay: 0.27 },
              },
            }}
            className="mt-2"
          >
            <motion.button
              type="submit"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0, scale: 0.995 }}
              transition={spring.micro}
              className="group relative flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-8 py-[18px] text-[15px] font-semibold tracking-[0.01em] text-black outline-none transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(255,255,255,0.18)] focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:hover:shadow-none"
            >
              Send Message
              <ArrowRight
                size={16}
                strokeWidth={2}
                aria-hidden="true"
                className="transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
              />
            </motion.button>

            <p className="mt-6 text-center text-[13px] leading-[1.6] text-white/35">
              {sent ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, ease: ease.standard }}
                >
                  Opening your mail app — if nothing happens, email{" "}
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
                  >
                    {contact.email}
                  </a>
                  .
                </motion.span>
              ) : (
                <>
                  Prefer email?{" "}
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-white/65 underline decoration-white/20 underline-offset-4 transition-colors duration-300 hover:text-white hover:decoration-white/60"
                  >
                    {contact.email}
                  </a>
                </>
              )}
            </p>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
});

Contact.displayName = "Contact";
