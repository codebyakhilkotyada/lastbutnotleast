import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const roles = [
  "Fullstack Developer",
  "Web Developer",
  "Logo Designer",
  "Frontend Developer",
  "UI/UX Enthusiast",
  "React Developer",
  "Freelance Developer",
];

const RoleTyper = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    if (!isDeleting && displayed.length < currentRole.length) {
      const timeout = setTimeout(() => setDisplayed(currentRole.slice(0, displayed.length + 1)), 60);
      return () => clearTimeout(timeout);
    }
    if (!isDeleting && displayed.length === currentRole.length) {
      const timeout = setTimeout(() => setIsDeleting(true), 1000);
      return () => clearTimeout(timeout);
    }
    if (isDeleting && displayed.length > 0) {
      const timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
      return () => clearTimeout(timeout);
    }
    if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }
  }, [displayed, isDeleting, roleIndex]);

  return (
    <span className="text-primary text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="text-primary ml-0.5"
      >|</motion.span>
    </span>
  );
};

const taglines = [
  "I build modern, high-performing websites",
  "that help businesses attract and convert clients.",
];

const TypingText = () => {
  const fullText = taglines.join(" ");
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (idx < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayed(fullText.slice(0, idx + 1));
        setIdx(idx + 1);
      }, 35);
      return () => clearTimeout(timeout);
    }
  }, [idx, fullText]);

  return (
    <span className="text-muted-foreground text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="text-primary ml-0.5"
      >|</motion.span>
    </span>
  );
};

const ParticleField = () => {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `hsl(210 100% 60% / ${0.1 + Math.random() * 0.2})`,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

const HeroSection = () => {
  const { heroPhoto } = usePortfolioData() as any;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <ParticleField />

      <motion.div
        className="absolute top-1/4 -left-32 w-64 h-64 rounded-full opacity-15 blur-3xl"
        style={{ background: "hsl(210 100% 60%)" }}
        animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: "hsl(250 55% 62%)" }}
        animate={{ scale: [1, 1.3, 1], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 📱 MOBILE RESPONSIVE: container padding scales — px-4 (mobile) → sm:px-6 (≥640px) */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        {/* 📱 Photo is now ABOVE the name (stacked vertically, centered) */}
        <div className="flex flex-col items-center justify-center gap-6 sm:gap-8">
          {/* Top: Hero photo (logo) above the name */}
          {heroPhoto && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-shrink-0"
            >
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-2 border-primary/30 shadow-lg shadow-primary/20">
                  <img src={heroPhoto} alt="Akhil Kotyada" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse" />
                <div className="absolute -inset-3 rounded-full border border-primary/10 animate-pulse" style={{ animationDelay: "0.5s" }} />
              </motion.div>
            </motion.div>
          )}

          {/* Bottom: Text content (centered) */}
          <div className="flex-1 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              // 📱 MOBILE RESPONSIVE: heading scales 4xl → 5xl → 6xl → 7xl across breakpoints
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-3"
            >
              <span className="text-foreground">Hi, I'm </span>
              <span className="text-gradient">Akhil</span>
              <br />
              <span className="text-gradient-accent">Kotyada</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-4 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2"
            >
              <span className="text-muted-foreground text-base sm:text-lg md:text-xl">I'm a</span>
              <RoleTyper />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="max-w-2xl mx-auto mb-6 sm:mb-8 px-2"
            >
              <TypingText />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            >
              <a href="#contact" className="btn-primary text-sm sm:text-base w-full sm:w-auto">
                Let's Work Together
              </a>
              <a href="#projects" className="btn-outline-glow text-sm sm:text-base w-full sm:w-auto">
                View My Work
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1"
          >
            <motion.div className="w-1 h-2 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
