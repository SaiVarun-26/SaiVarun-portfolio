import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { contact } from "@/config/portfolio";
import { spring } from "@/lib/motion";

export const Contact = forwardRef<HTMLElement>((_, ref) => {
  return (
    <Section id="contact" ref={ref}>
      <div className="mx-auto max-w-[760px] text-center">
        <p
          className="mb-10 text-sm font-medium uppercase tracking-[0.25em]"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          Contact
        </p>

        <h2
          className="font-black text-foreground"
          style={{
            fontSize: "clamp(40px, 7vw, 88px)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
          }}
        >
          Let's build
          <br />
          something.
        </h2>

        <motion.a
          href={`mailto:${contact.email}`}
          className="mt-12 inline-flex items-center gap-2 text-[clamp(18px,2vw,22px)] font-medium text-foreground outline-none"
          whileHover={{ opacity: 0.7 }}
          transition={spring.micro}
        >
          {contact.email}
        </motion.a>

        <div className="mt-14 flex items-center justify-center gap-8">
          {contact.socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium tracking-[0.02em] outline-none"
              style={{ color: "hsl(var(--muted-foreground))" }}
              whileHover={{ color: "hsl(0 0% 100%)" }}
              transition={spring.micro}
            >
              {s.label}
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  );
});

Contact.displayName = "Contact";
