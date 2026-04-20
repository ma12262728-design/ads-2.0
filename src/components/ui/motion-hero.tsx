"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../../lib/utils";
import { useADSConfig } from "../../hooks/useADSConfig";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES
// -------------------------------------------------------------------------
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

.cinematic-hero-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  
  --pill-bg-1: var(--glass-bg);
  --pill-bg-2: var(--glass-bg);
  --pill-shadow: rgba(0, 0, 0, 0.1);
  --pill-highlight: var(--glass-border);
  --pill-inset-shadow: rgba(0, 0, 0, 0.05);
  --pill-border: var(--glass-border);
  
  --pill-bg-1-hover: var(--glass-bg);
  --pill-bg-2-hover: var(--glass-bg);
  --pill-border-hover: var(--accent);
  --pill-shadow-hover: rgba(0, 240, 255, 0.2);
  --pill-highlight-hover: var(--accent);
}

.light .cinematic-hero-wrapper {
  --pill-shadow: rgba(0, 0, 0, 0.05);
  --pill-inset-shadow: transparent;
}

@keyframes hero-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes hero-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes hero-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px color-mix(in oklch, var(--destructive) 50%, transparent)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px color-mix(in oklch, var(--destructive) 80%, transparent)); }
  30% { transform: scale(1); }
}

.animate-hero-breathe {
  animation: hero-breathe 8s ease-in-out infinite alternate;
}

.animate-hero-scroll-marquee {
  animation: hero-scroll-marquee 40s linear infinite;
}

.animate-hero-heartbeat {
  animation: hero-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Theme-adaptive Grid Background */
.hero-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, var(--glass-border) 1px, transparent 1px),
    linear-gradient(to bottom, var(--glass-border) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
}

/* Theme-adaptive Aurora Glow */
.hero-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    color-mix(in srgb, var(--accent) 15%, transparent), 
    color-mix(in srgb, var(--secondary) 15%, transparent) 40%, 
    transparent 70%
  );
}

/* Glass Pill Theming */
.hero-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}

/* Giant Background Text Masking */
.hero-giant-bg-text {
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px var(--glass-border);
  background: linear-gradient(180deg, transparent 0%, var(--foreground) 60%);
  -webkit-background-clip: text;
  background-clip: text;
  opacity: 0.05;
}

.light .hero-giant-bg-text {
  opacity: 0.03;
}

/* Metallic Text Glow */
.hero-text-glow {
  background: linear-gradient(180deg, var(--foreground) 0%, color-mix(in srgb, var(--foreground) 40%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px color-mix(in srgb, var(--accent) 30%, transparent));
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as any);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    },[]);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span className="text-foreground">Digital Innovation</span> <span className="text-secondary opacity-60">✦</span>
    <span className="text-foreground">Modern Branding</span> <span className="text-accent opacity-60">✦</span>
    <span className="text-foreground">Scalable Platforms</span> <span className="text-secondary opacity-60">✦</span>
    <span className="text-foreground">Cloud Infrastructure</span> <span className="text-accent opacity-60">✦</span>
    <span className="text-foreground">Absolute Precision</span> <span className="text-secondary opacity-60">✦</span>
  </div>
);

export function CinematicHero() {
  const config = useADSConfig();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Background Parallax going down
      gsap.to(giantTextRef.current, {
        y: "20vh",
        opacity: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Front content fades out / scrolls up faster
      gsap.to([headingRef.current, linksRef.current], {
        y: "-10vh",
        opacity: 0,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  },[]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      <div
        ref={wrapperRef}
        className="relative min-h-[100vh] w-full flex flex-col justify-center items-center overflow-hidden bg-[var(--background)] text-foreground cinematic-hero-wrapper z-20 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
      >
        
        <div className="hero-aurora absolute left-1/2 top-1/2 h-[80vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 animate-hero-breathe rounded-[50%] blur-[80px] pointer-events-none z-0 opacity-40" />
        <div className="hero-bg-grid absolute inset-0 z-0 pointer-events-none opacity-[0.2]" />

        <div
          ref={giantTextRef}
          className="hero-giant-bg-text absolute top-[10vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none text-foreground/5"
        >
          AMMAR
        </div>

        <div className="absolute bottom-12 left-0 w-full overflow-hidden border-y border-foreground/5 bg-[var(--background)]/60 backdrop-blur-md py-4 z-10 rotate-2 scale-110 shadow-2xl">
          <div className="flex w-max animate-hero-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] text-foreground/60 uppercase">
            <MarqueeItem />
            <MarqueeItem />
          </div>
        </div>

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-16 w-full max-w-5xl mx-auto">
          <p className="text-[10px] md:text-sm font-black text-accent tracking-[0.4em] mb-6 animate-pulse uppercase">
             {config.heroSubtitle}
          </p>
          <h2
            ref={headingRef}
            className="text-5xl md:text-[100px] font-black tracking-tighter mb-12 text-center text-foreground leading-[0.85] uppercase font-display italic drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            {config.mainHeadline.split(' ')[0]} <br /> <span className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary tech-glow">{config.mainHeadline.split(' ').slice(1).join(' ')}</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-text mb-12 max-w-2xl leading-relaxed font-bold tracking-tight text-center relative z-10 uppercase opacity-70">
             Architecting high-performance custom web ecosystems for the next generation.
          </p>

          <div ref={linksRef} className="flex flex-col items-center gap-6 w-full">
            <div className="flex flex-wrap justify-center gap-4 w-full">
              <MagneticButton as="a" href="/order" className="btn-bold-primary px-10 py-5 rounded-[40px] font-bold text-sm md:text-base flex items-center gap-3 group">
                Order Now
              </MagneticButton>
              
              <MagneticButton as="a" href="/contact" className="glass-card px-10 py-5 rounded-[40px] text-foreground font-bold text-sm md:text-base flex items-center gap-3 group hover:bg-foreground/5 transition-all">
                Contact Us
              </MagneticButton>

              <MagneticButton as="a" href="/auth" className="glass-card px-10 py-5 rounded-[40px] text-accent font-bold text-sm md:text-base flex items-center gap-3 group hover:bg-foreground/5 transition-all border border-accent/30 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                Sign Up
              </MagneticButton>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
