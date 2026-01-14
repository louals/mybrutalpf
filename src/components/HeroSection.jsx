import { motion, useScroll, useTransform } from "framer-motion";

import { FiArrowUpRight, FiTerminal, FiCpu, FiZap } from "react-icons/fi";
import myImage from "../assets/me.png";
import { useLanguage } from "../Contexts/languageContext";
import { heroContent } from "../contents/hero";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";



const ScrambleButton = ({ text, className, children, ...props }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);
  const CYBER_CHARS = "█▓▒░0x<>_λπΩ∆Σ#!?";
  const startScramble = () => {
    let iteration = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            return CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
      }

      iteration += 1 / 2; // Speed of "decryption"
    }, 30); // Speed of character flickering
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current);
    setDisplayText(text);
  };

  return (
    <button
      {...props}
      onMouseEnter={startScramble}
      onMouseLeave={stopScramble}
      className={className}
    >
      <span className="text-2xl font-black uppercase">{displayText}</span>
      {children}
    </button>
  );
};
const BrutalHero = () => {
  const { language } = useLanguage();
  const content = heroContent[language];
  const navigate = useNavigate();


  return (
    <section className="relative min-h-screen bg-[#030303] text-white overflow-hidden font-sans selection:bg-lime-400 selection:text-black">
      {/* VISIBLE GRID SYSTEM */}


      <div className="absolute inset-0 z-0 opacity-20"
        style={{ backgroundImage: `radial-gradient(#333 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />



      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid grid-cols-12 gap-4">

          {/* LEFT SIDE: THE EGO */}
          <div className="col-span-12 lg:col-span-8 flex flex-col justify-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "circOut" }}
            >
              <h2 className="text-lime-400 font-mono text-xl mb-4 flex items-center gap-2">
                <FiTerminal /> {language === "en" ? "SYSTEM_INIT" : "INIT_SYSTÈME"}
              </h2>
              <h1 className="text-6xl md:text-8xl xl:text-9xl font-black uppercase leading-[0.85] tracking-tighter mb-8">
                {content.title} <br />
                <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '2px white' }}>
                  {content.name}
                </span>
              </h1>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <motion.div
                className="bg-lime-400 text-black px-6 py-4 rounded-none font-black italic text-2xl uppercase skew-x-[-10deg]"
                whileHover={{ skewX: 0, scale: 1.05 }}
              >
                Built to Perform
              </motion.div>

              <div className="max-w-md border-l-4 border-white/10 pl-6">
                <p className="text-gray-400 text-lg leading-tight uppercase font-medium">
                  I design and build products that move fast, feel premium, and actually get used.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: THE VISUAL */}
          <div className="col-span-12 lg:col-span-4 relative mt-12 lg:mt-0">
            <motion.div
              className="relative aspect-square border-2 border-white/20 p-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="absolute -top-4 -left-4 bg-white text-black text-xs font-mono p-1 uppercase">User_Profile</div>
              <img
                src={myImage}
                alt="Architect"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              {/* Floating Stat Card */}
              <div className="absolute -bottom-10 -right-6 bg-[#111] border border-white/20 p-4 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-black text-lime-400">99.9%</div>
                  <div className="text-[10px] font-mono leading-none text-white/60 uppercase">
                    Performance<br />Optimization<br />Score
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM SECTION: CTA & TECH */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10">
          <ScrambleButton
            text={content.buttons.work}
            className="group border-r border-white/10 p-8 flex justify-between items-center hover:bg-white hover:text-black transition-all"
            onClick={() => navigate('/projects')}
          >
            <FiArrowUpRight className="text-3xl group-hover:rotate-45 transition-transform" />
          </ScrambleButton>

          {/* HIRE BUTTON */}
          <ScrambleButton
            text={content.buttons.hire || "Engage"}
            className="group border-r border-white/10 p-8 flex justify-between items-center bg-lime-400 text-black hover:bg-white transition-all"
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          >
            <FiZap className="text-3xl" />
          </ScrambleButton>

          <div className="p-8 flex items-center gap-4 bg-[#0a0a0a]">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-black flex items-center justify-center"><FiCpu /></div>
              <div className="w-10 h-10 rounded-full bg-zinc-700 border border-black flex items-center justify-center"><FiTerminal /></div>
            </div>
            <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
              Stack: React / Next / Py / TS / Performance
            </span>
          </div>
        </div>
      </div>

      {/* MARQUEE FOOTER (The "Greatest" Proof) */}
      <div className="absolute bottom-0 w-full bg-white text-black py-2 overflow-hidden whitespace-nowrap hidden md:block">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-10 font-black uppercase text-sm"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i}>● Principles First ● Complexity Managed ● Scale Guaranteed ● Solutions, Not Substitutes ●</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BrutalHero;