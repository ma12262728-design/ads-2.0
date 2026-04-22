import { motion } from 'motion/react';
import { useEffect } from 'react';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    // Extended to 4.5 seconds for a majestic entrance, holding period, and graceful exit
    const timer = setTimeout(() => {
      onComplete();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Premium Apple-style easing curves
  const easeOutCube = [0.215, 0.61, 0.355, 1];
  const easeInOutCubic = [0.645, 0.045, 0.355, 1];

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#ffffff] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.2 } }}
      exit={{ 
        opacity: 0, 
        scale: 1.03, // Slight portal effect zooming into the rest of the app
        transition: { duration: 1.5, ease: easeOutCube, delay: 0.2 } // Completely smooth cross-fade to Light Theme
      }}
    >
      {/* Light Theme Liquid Glass Base Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Ambient Moving Gradients (Soft Pastels for Light Theme) */}
        <motion.div
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-200/70 filter blur-[100px]"
          animate={{
            x: [0, 80, -20, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-purple-200/60 filter blur-[120px]"
          animate={{
            x: [0, -80, 20, 0],
            y: [0, 50, -40, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-[30%] left-[30%] w-[50vw] h-[50vw] rounded-full bg-rose-100/80 filter blur-[90px]"
          animate={{
            x: [-40, 40, -40],
            y: [40, -40, 40],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Heavy Frosted Glass & Surface Textures (Light Theme) */}
      <motion.div 
         className="absolute inset-0 backdrop-blur-[80px] bg-white/50 z-0" 
         exit={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(255,255,255,0)", transition: { duration: 1.2, ease: easeOutCube } }}
      />
      {/* Subtle Light Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.03)_100%)] z-0" />
      {/* Inner Light Reflection (Apple Glass Edge) */}
      <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.8)] z-0 pointer-events-none" />

      {/* Cinematic Container for Content */}
      <motion.div 
        className="flex flex-col items-center justify-center relative z-10"
        exit={{
          opacity: 0,
          scale: 1.15,
          filter: "blur(20px)",
          transition: { duration: 1.0, ease: easeInOutCubic }
        }}
      >
        {/* Main 'ADS' Typography - Dark Frosted Glass Text */}
        <motion.div 
          className="flex items-center gap-3 overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 1 },
            visible: {
              transition: { staggerChildren: 0.2, delayChildren: 0.6 }
            }
          }}
        >
          {["A", "D", "S"].map((letter, idx) => (
            <motion.span
              key={idx}
              className="font-black text-8xl md:text-[11rem] tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-slate-800 via-slate-600 to-slate-400 pb-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
              variants={{
                hidden: { y: 60, opacity: 0, filter: "blur(30px)", scale: 0.8 },
                visible: { 
                  y: 0, 
                  opacity: 1, 
                  filter: "blur(0px)",
                  scale: 1,
                  transition: { duration: 1.8, ease: easeOutCube }
                }
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        {/* Subtitle - Ammar Digital Solution */}
        <motion.div
           className="mt-2 flex overflow-hidden"
           initial={{ opacity: 0, y: 20, filter: "blur(15px)" }}
           animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
           transition={{ duration: 1.8, delay: 1.6, ease: easeOutCube }}
        >
           <span className="text-slate-500 font-bold text-[11px] md:text-sm tracking-[0.7em] uppercase pl-[0.7em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
             Ammar Digital Solution
           </span>
        </motion.div>
      </motion.div>
      
    </motion.div>
  );
}
