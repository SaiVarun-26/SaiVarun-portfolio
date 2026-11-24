import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-8 text-center">
      <p
        className="mb-6 text-sm font-medium uppercase tracking-[0.3em]"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        404
      </p>
      <h1
        className="font-black text-foreground"
        style={{
          fontSize: "clamp(48px, 10vw, 120px)",
          lineHeight: 0.92,
          letterSpacing: "-0.02em",
        }}
      >
        Lost the thread.
      </h1>
      <Link
        to="/"
        className="group mt-10 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium tracking-[0.02em] text-foreground transition-colors duration-300 hover:border-white/40"
        style={{ borderColor: "hsl(0 0% 100% / 0.14)" }}
      >
        Back home
      </Link>
    </main>
  );
};

export default NotFound;
