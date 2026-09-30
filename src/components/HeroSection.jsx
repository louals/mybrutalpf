import { motion } from "framer-motion";
import { FiArrowUpRight, FiTerminal, FiZap, FiCode, FiCheck, FiCopy, FiCpu, FiGlobe, FiActivity } from "react-icons/fi";
import { useLanguage } from "../Contexts/languageContext";
import { heroContent } from "../contents/hero";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Scramble text effect button for futuristic feedback
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

      if (iteration >= text.length) clearInterval(intervalRef.current);
      iteration += 1 / 2;
    }, 30);
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
      <span className="truncate">{displayText}</span>
      {children}
    </button>
  );
};

const BrutalHero = () => {
  const { language } = useLanguage();
  const content = heroContent[language] || heroContent.en;
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);

  // Rotating roles if provided in content
  const roles = content.roles || ["Software Developer", "Frontend", "UI/UX Designer"];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [roles.length]);

  const handleCopyCode = () => {
    const codeText = `const dev = { name: "Louai", status: "Available", stack: ["React", "TypeScript", "Python"] };`;
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen w-full bg-[#030303] text-white font-mono flex flex-col justify-between px-4 sm:px-8 lg:px-12 pt-20 sm:pt-28 pb-8 selection:bg-lime-400 selection:text-black overflow-x-hidden">
      
      {/* Background Subtle Cyber Grid lines */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Top Status Bar */}
      <div className="relative z-10 w-full max-w-6xl mx-auto border-b border-zinc-800/80 pb-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-xs text-zinc-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 text-lime-400 font-semibold tracking-wider bg-lime-400/10 px-2.5 py-1 border border-lime-400/20 text-[11px] xs:text-xs">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse shrink-0" />
            <span>AVAILABLE FOR WORK</span>
          </span>
          <span className="hidden sm:inline text-zinc-600">// FREELANCE & FULL-TIME</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] xs:text-xs text-zinc-400 font-mono">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <FiGlobe className="text-lime-400 shrink-0" /> Algiers
          </span>
          <span className="hidden md:inline text-zinc-600">|</span>
        </div>
      </div>

      {/* Main Hero Content Area - Dual Column Grid */}
      <div className="relative z-10 w-full max-w-6xl mx-auto my-auto py-8 sm:py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Primary Typography & Calls to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          {/* Terminal Title Prompt */}
          <div className="inline-flex items-center gap-2 text-lime-400 text-xs sm:text-sm font-medium tracking-wider mb-3 bg-zinc-900/80 border border-zinc-800 px-3 py-1">
            <span className="uppercase">{content.title || "Hi, I'm"}</span>
          </div>

          {/* Main Huge Headline */}
          <h1 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-8xl font-black tracking-tighter text-white uppercase break-words leading-[0.92] mb-4 sm:mb-6">
            {content.name}
            <span className="text-lime-400">.</span>
          </h1>

          {/* Dynamic Role Badge */}
          <div className="flex items-center gap-2 mb-6 text-xs sm:text-sm text-zinc-300 font-mono">
            <span className="text-zinc-500">ROLE:</span>
            <motion.span 
              key={activeRoleIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lime-400 font-bold tracking-wide uppercase bg-zinc-900 px-2.5 py-0.5 border border-zinc-800"
            >
              {roles[activeRoleIndex]}
            </motion.span>
          </div>

          {/* Bio / Subtitle */}
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-sans mb-8 font-normal border-l-2 border-lime-400/50 pl-4 sm:pl-5">
            {content.description || "Frontend engineer focused on building fast, high-performance web systems with clean architecture and intuitive interfaces."}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3.5 w-full xs:w-auto mb-6 sm:mb-8">
            <ScrambleButton
              text={content.buttons?.work || "View Work"}
              className="w-full xs:w-auto bg-lime-400 text-black px-6 py-4 font-mono font-black text-xs sm:text-sm uppercase flex items-center justify-between xs:justify-center gap-3 hover:bg-white hover:scale-[1.01] transition-all shadow-[0_0_25px_rgba(163,230,53,0.15)] active:scale-[0.98]"
              onClick={() => navigate('/projects')}
            >
              <FiArrowUpRight className="text-lg shrink-0" />
            </ScrambleButton>

            <ScrambleButton
              text={content.buttons?.hire || "Hire Me"}
              className="w-full xs:w-auto border border-zinc-700 bg-zinc-950/60 text-white px-6 py-4 font-mono font-bold text-xs sm:text-sm uppercase flex items-center justify-between xs:justify-center gap-3 hover:border-lime-400 hover:text-lime-400 transition-all active:scale-[0.98]"
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <FiZap className="text-lg shrink-0" />
            </ScrambleButton>
          </div>

          {/* Micro Stats Bar */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-md pt-4 border-t border-zinc-800/80 text-left">
            <div>
              <div className="text-base sm:text-xl font-black text-white font-mono">02+</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Years Exp.</div>
            </div>
            <div>
              <div className="text-base sm:text-xl font-black text-lime-400 font-mono">60+</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Projects Built</div>
            </div>
            <div>
              <div className="text-base sm:text-xl font-black text-white font-mono">&lt;100ms</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Perf. Latency</div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Cyber Terminal & Code HUD Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-5 w-full mt-4 lg:mt-0"
        >
          <div className="relative group rounded-none border border-zinc-800 bg-zinc-950/90 shadow-2xl overflow-hidden">
            
            {/* Top Window Bar */}
            <div className="bg-zinc-900/90 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-lime-500/80 inline-block" />
                <span className="ml-2 text-[10px] text-zinc-400 font-mono tracking-widest uppercase">system_manifest.ts</span>
              </div>
              <button 
                onClick={handleCopyCode}
                className="text-zinc-500 hover:text-lime-400 transition-colors p-1 text-xs flex items-center gap-1"
                title="Copy snippet"
              >
                {copied ? <FiCheck className="text-lime-400" /> : <FiCopy />}
                <span className="text-[9px] uppercase hidden xs:inline">{copied ? "COPIED" : "COPY"}</span>
              </button>
            </div>

            {/* Code Content Window */}
            <div className="p-4 sm:p-5 text-xs font-mono leading-relaxed space-y-2 overflow-x-auto text-zinc-300">
              <div>
                <span className="text-purple-400">const</span> <span className="text-yellow-300">developer</span> = &#123;
              </div>
              <div className="pl-4">
                <span className="text-zinc-500">name:</span> <span className="text-lime-400">"Louai Al-Sabbagh"</span>,
              </div>
              <div className="pl-4">
                <span className="text-zinc-500">primary_role:</span> <span className="text-lime-400">"{roles[activeRoleIndex]}"</span>,
              </div>
              <div className="pl-4">
                <span className="text-zinc-500">tech_stack:</span> [
                <span className="text-amber-300">"React"</span>, <span className="text-amber-300">"Next.js"</span>, <span className="text-amber-300">"TS"</span>, <span className="text-amber-300">"Python"</span>],
              </div>
              <div className="pl-4">
                <span className="text-zinc-500">location:</span> <span className="text-lime-400">"Montreal, QC"</span>,
              </div>
              <div className="pl-4">
                <span className="text-zinc-500">system_health:</span> <span className="text-cyan-400">"100% OPERATIONAL"</span>,
              </div>
              <div>&#125;;</div>

              <div className="pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-500 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-lime-400">
                  <FiActivity className="animate-pulse" /> RUNNING_BUILD_V2.6
                </span>
                <span className="text-zinc-600">UTF-8</span>
              </div>
            </div>

            {/* Interactive Bottom Bar */}
            <div className="bg-zinc-900/40 px-4 py-2.5 border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
              <span className="flex items-center gap-2">
                <FiCpu className="text-lime-400" /> CPU: 0.2% | RAM: 14MB
              </span>
              <span className="text-lime-400/80 hover:text-lime-400 cursor-pointer font-bold uppercase">
                [SYS_READY]
              </span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Footer Tech Stack Marquee Ribbon */}
      <div className="relative z-10 w-full max-w-6xl mx-auto pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-zinc-500 font-mono">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-[11px] xs:text-xs">
          <span className="text-zinc-600 font-bold uppercase tracking-wider">CORE TECH:</span>
          <span className="text-zinc-300 hover:text-lime-400 transition-colors cursor-default">REACT</span>
          <span className="text-zinc-700">•</span>
          <span className="text-zinc-300 hover:text-lime-400 transition-colors cursor-default">NEXT.JS</span>
          <span className="text-zinc-700">•</span>
          <span className="text-zinc-300 hover:text-lime-400 transition-colors cursor-default">TYPESCRIPT</span>
          <span className="text-zinc-700">•</span>
          <span className="text-zinc-300 hover:text-lime-400 transition-colors cursor-default">TAILWIND</span>
          <span className="text-zinc-700">•</span>
          <span className="text-zinc-300 hover:text-lime-400 transition-colors cursor-default">PYTHON</span>
        </div>

        <div className="text-[10px] xs:text-xs text-zinc-600 sm:text-zinc-500 font-mono shrink-0">
          © 2026 
        </div>
      </div>

    </section>
  );
};

export default BrutalHero;