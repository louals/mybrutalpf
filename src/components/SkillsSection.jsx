import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  SiTypescript, SiReact, SiNodedotjs, SiPython, SiFlask, SiTailwindcss,
  SiMongodb, SiFirebase, SiGit, SiJavascript, SiMysql, SiAppwrite,
  SiStripe, SiPostgresql, SiScikitlearn, SiPandas, SiStreamlit,
  SiDocker, SiRaspberrypi, SiSqlite, SiOpencv, SiNumpy, SiNextdotjs, SiCss3, SiAngular, SiVuedotjs, SiShadcnui, SiBootstrap, SiN8N, SiXampp,
  SiOpenai, SiThreedotjs, SiGreensock, SiFastapi, SiExpress, SiSupabase, SiRender, SiPrisma, SiSolidity, SiGooglecloud, SiVercel, SiPostman
} from "react-icons/si";
import { FiCpu, FiActivity, FiCode, FiLayers, FiDatabase, FiCpu as FiAi, FiSettings } from "react-icons/fi";

const techStack = [
  // LANGUAGES
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6", category: "languages", desc: "Typed JS but built for scaling without losing the plot." },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E", category: "languages", desc: "The OG of the web — runs everywhere, breaks nowhere (mostly)." },
  { name: "Python", Icon: SiPython, color: "#3776AB", category: "languages", desc: "Swiss-army language for AI, automation, and backend logic." },
  { name: "Solidity", Icon: SiSolidity, color: "#FFFFFF", category: "languages", desc: "Smart contract language for EVM chains." },
  { name: "SQL", Icon: FiDatabase, color: "#E8E8E8", category: "languages", desc: "Database query language." },
  // FRONTEND
  { name: "React", Icon: SiReact, color: "#61DAFB", category: "frontend", desc: "UI components with reusable braincells." },
  { name: "Vue.js", Icon: SiVuedotjs, color: "#42b883", category: "frontend", desc: "Smooth UI framework with less boilerplate trauma." },
  { name: "Angular", Icon: SiAngular, color: "#DD0031", category: "frontend", desc: "Full-scale frontend fortress with TypeScript baked in." },
  { name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF", category: "frontend", desc: "React framework but optimized for the real world." },
  { name: "Tailwind CSS", Icon: SiTailwindcss, category: "frontend", desc: "Utility CSS so you don't write class names like essays." },
  { name: "Bootstrap", Icon: SiBootstrap, color: "#7952B3", category: "frontend", desc: "Responsive UI, classic but still valid." },
  { name: "shadcn/ui", Icon: SiShadcnui, color: "#FFFFFF", category: "frontend", desc: "Prebuilt components with modern minimalist drip." },
  { name: "Three.js", Icon: SiThreedotjs, color: "#FFFFFF", category: "frontend", desc: "3D on the web — because 2D is too normal." },
  { name: "GSAP", Icon: SiGreensock, color: "#88CE02", category: "frontend", desc: "Animation engine for premium motion flexing." },
  { name: "CSS3", Icon: SiCss3, color: "#1572B6", category: "frontend", desc: "The styling foundation of the web." },

  // BACKEND
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933", category: "backend", desc: "JS runtime for servers that need speed and concurrency." },
  { name: "Express.js", Icon: SiExpress, color: "#FFFFFF", category: "backend", desc: "Backend framework for Node that keeps it simple." },
  { name: "Flask", Icon: SiFlask, color: "#FFFFFF", category: "backend", desc: "Lightweight Python backend micro-framework." },
  { name: "FastAPI", Icon: SiFastapi, color: "#009688", category: "backend", desc: "Python API framework built for speed ⚡." },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#336791", category: "backend", desc: "Advanced relational DB with strong integrity." },
  { name: "MySQL", Icon: SiMysql, color: "#00758F", category: "backend", desc: "Reliable relational database engine." },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248", category: "backend", desc: "NoSQL storage for flexible schemas." },
  { name: "SQLite", Icon: SiSqlite, color: "#003B57", category: "backend", desc: "Local DB that doesn’t ask for permission." },
  { name: "Supabase", Icon: SiSupabase, color: "#3ECF8E", category: "backend", desc: "Open-source backend platform powered by Postgres." },
  { name: "Prisma", Icon: SiPrisma, color: "#FFFFFF", category: "backend", desc: "ORM that makes DB queries feel less illegal." },
  { name: "Firebase", Icon: SiFirebase, color: "#FFCA28", category: "backend", desc: "BaaS for real-time apps." },
  { name: "AppWrite", Icon: SiAppwrite, color: "#FD366E", category: "backend", desc: "Backend API platform for web/mobile." },


  // DATA & AI
  { name: "Pandas", Icon: SiPandas, color: "#150458", category: "data", desc: "Dataframes and analysis toolkit." },
  { name: "NumPy", Icon: SiNumpy, color: "#013243", category: "data", desc: "Numerical computing library." },
  { name: "Scikit-Learn", Icon: SiScikitlearn, color: "#F7931E", category: "data", desc: "Machine learning library for predictive modeling." },
  { name: "OpenAI API", Icon: SiOpenai, color: "#FFFFFF", category: "data", desc: "LLM integration for AI apps." },
  { name: "OpenCV", Icon: SiOpencv, color: "#5C3EE8", category: "data", desc: "Computer vision library." },
  { name: "Streamlit", Icon: SiStreamlit, color: "#FF4B4B", category: "data", desc: "Dashboard builder for ML/data apps." },

  // TOOLS & DEPLOYMENT
  { name: "Docker", Icon: SiDocker, color: "#2496ED", category: "tools", desc: "Containerization platform." },
  { name: "Git", Icon: SiGit, color: "#F05032", category: "tools", desc: "Version control system." },
  { name: "Postman", Icon: SiPostman, color: "#FF6C37", category: "tools", desc: "API testing tool." },
  { name: "Render", Icon: SiRender, color: "#FFFFFF", category: "tools", desc: "Cloud deployment platform." },
  { name: "Vercel", Icon: SiVercel, color: "#FFFFFF", category: "tools", desc: "Frontend deployment and hosting." },
  { name: "Google Cloud", Icon: SiGooglecloud, color: "#4285F4", category: "tools", desc: "Cloud services platform." },
  { name: "Raspberry Pi", Icon: SiRaspberrypi, color: "#C51A4A", category: "tools", desc: "IoT hardware dev board." },
  { name: "N8N", Icon: SiN8N, color: "#FFFFFF", category: "tools", desc: "Automation workflow builder." },
  { name: "XAMPP", Icon: SiXampp, color: "#FB7A24", category: "tools", desc: "Local backend server environment." },
  { name: "Stripe", Icon: SiStripe, color: "#635BFF", category: "tools", desc: "Payments API platform." },

  // BLOCKCHAIN / SMART CONTRACTS

];


const SkillsMatrix = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [filter, setFilter] = useState("languages");

  const categories = [
    { id: "languages", label: "LANGUAGES", icon: <FiCode /> },
    { id: "frontend", label: "FRONT END", icon: <FiLayers /> },
    { id: "backend", label: "BACK END", icon: <FiDatabase /> },
    { id: "data", label: "DATA AI", icon: <FiAi /> },
    { id: "tools", label: "DEVOPS", icon: <FiSettings /> },
  ];

  const filteredStack = techStack.filter(
    (item) => filter === "all" || item.category === filter
  );

  return (
    <section id="skills" className="relative bg-[#030303] py-24 px-6 overflow-hidden border-b border-white/10 font-mono">
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />

      <div className="container mx-auto max-w-7xl relative z-10">

        {/* HEADER SECTION */}
        <div className="mb-12 grid grid-cols-1 lg:grid-cols-2 items-end gap-10">
          <div>
            
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white">
              Tech <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Stack</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 lg:justify-end">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                // Added select-none and ensured cursor-pointer is present
                className={`cursor-pointer select-none relative group flex items-center gap-2 px-4 py-2 text-[10px] border transition-all uppercase tracking-widest overflow-hidden ${filter === cat.id ? "text-black border-lime-400" : "text-white/40 border-white/10 hover:border-white/40"
                  }`}
              >
                {filter === cat.id && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-lime-400 -z-10"
                    transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                  />
                )}
                {/* Added pointer-events-none to the span so the button handles the cursor */}
                <span className="relative z-10 flex items-center gap-2 pointer-events-none">
                  {cat.icon} {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* MAIN SKILLS GRID */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 border-t border-l border-white/10 bg-[#050505]">
          <AnimatePresence mode="popLayout">
            {filteredStack.map(({ Icon, color, name, desc }, index) => (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={name}
                onMouseEnter={() => setHoveredItem({ name, desc, color })}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative aspect-square border-r border-b border-white/10 p-8 group flex flex-col items-center justify-center transition-all hover:bg-white/[0.02]"
              >
                <div className="absolute top-0 right-0 w-0 h-0 border-t border-r border-lime-400 opacity-0 group-hover:opacity-100 group-hover:w-4 group-hover:h-4 transition-all duration-300" />

                <Icon
                  className="text-4xl md:text-5xl transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110"
                  style={{ color: hoveredItem?.name === name ? color : '#222' }}
                />

                <div className="absolute bottom-4 left-4 text-[9px] text-white/20 group-hover:text-lime-400 transition-colors uppercase">
                  {String(index + 1).padStart(2, '0')}_{name.replace(/\s+/g, '_')}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* BRUTALIST FILLER */}
          <motion.div layout className="aspect-square border-r border-b border-white/10 p-8 flex items-center justify-center bg-zinc-900/50 group">
            <FiCpu className="text-white/10 text-5xl group-hover:text-lime-400 transition-colors animate-[spin_10s_linear_infinite]" />
          </motion.div>
        </motion.div>

        {/* DIAGNOSTIC READOUT PANEL */}
        <div className="mt-1 flex border-x border-b border-white/10 bg-[#080808] p-6 min-h-[110px] items-center">
          <AnimatePresence mode="wait">
            {hoveredItem ? (
              <motion.div
                key={hoveredItem.name}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 w-full"
              >
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-lime-400" />
                  <div className="text-lime-400 font-bold tracking-tighter uppercase text-xl">
                    {hoveredItem.name}
                  </div>
                </div>
                <div className="text-white/60 text-[11px] leading-relaxed max-w-2xl md:border-l border-white/10 md:pl-8 uppercase tracking-widest flex items-center">
                  {hoveredItem.desc}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white/20 text-[10px] uppercase tracking-[0.4em] italic flex items-center gap-3"
              >
                <span className="w-2 h-2 bg-white/20 rounded-full animate-pulse" />
                Select module to view system metadata...
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SkillsMatrix;