import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  FiGithub, FiExternalLink, FiLayers, FiTerminal, FiArrowLeft, 
  FiCpu, FiBox, FiDatabase, FiSmartphone 
} from "react-icons/fi";

// Asset Imports
import ReactPrj from "../assets/ReactPrj.png";
import mlApp from "../assets/mlapppy.png";
import rsb from "../assets/raspberrybg.jpg";
import cbir from "../assets/cbirapplication.png";
import socialmedia from "../assets/socialmedia.png";
import dealzone from "../assets/dealzone.png";
import macbook from "../assets/macbookpro.png";
import mosque from "../assets/mosque.png";
import ibongsport from "../assets/ibongsport.png";
import docwebsite from "../assets/docwebsite.png";
import docs from "../assets/docs.png";
import qr from "../assets/qr.png";
import emailn8n from "../assets/workflow.png";
import weathern8n from "../assets/weathern8n.png";
import fitnessphp from "../assets/fitness-php.png";
import species from "../assets/species.jpg";
import shopping from "../assets/shopping.png";

const Projects = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");

  const projects = [
    {
      id: "social-media",
      title: "Social Media App",
      description: "TypeScript React social app using Appwrite with infinite scroll, post creation, and modern UI logic.",
      tags: ["React", "TypeScript", "AppWrite", "Tailwind"],
      categories: ["Full Stack", "Web"],
      image: socialmedia,
      github: "https://github.com/louals/React_SocialMedia",
      live: "https://save-and-share.onrender.com/",
      cat: "Social"
    },
    {
      id: "deal-zone",
      title: "DealZone – Real Estate",
      description: "Modern web platform for buying/selling homes with property listings, search filters, and real-time management.",
      tags: ["React", "Firebase", "TypeScript", "Tailwind"],
      categories: ["Full Stack", "Web"],
      image: dealzone,
      github: "https://github.com/louals/DealZone",
      live: "https://jkdealzone.com/",
      cat: "Real_Estate"
    },
    {
      id: "as-salam",
      title: "As-Salam Foundation",
      description: "Non-profit platform featuring a FastAPI backend and a high-performance React frontend with 3D visuals.",
      tags: ["React", "Python", "FastAPI", "Three.js", "Framer Motion"],
      categories: ["Full Stack", "Web"],
      image: mosque,
      live: "https://assalam.info/",
      cat: "Non_Profit"
    },
    {
      id: "ibongsport",
      title: "Ibongsport Website",
      description: "A comprehensive sports portal developed using the MERN stack for high-traffic content management.",
      tags: ["React", "Express", "MongoDB", "Node.js"],
      categories: ["Full Stack", "Web"],
      image: ibongsport,
      live: "https://ibongsport.ca/",
      cat: "MERN_Stack"
    },
    {
      id: "docs-clone",
      title: "Docs Editor Clone",
      description: "Real-time collaborative document editor utilizing Firebase Cloud for synchronization and storage.",
      tags: ["React", "Firebase Cloud", "Tailwind"],
      categories: ["Full Stack", "Web"],
      image: docs,
      github: "https://github.com/louals/GoogleDocsClone",
      live: "https://docs-editor-mxwx.onrender.com/dashboard",
      cat: "Web_Productivity"
    },
    {
      id: "qr-studio",
      title: "QR Studio",
      description: "A custom QR code generator featuring a Vue.js frontend and a Python Flask backend for processing.",
      tags: ["Vue.js", "Python", "Flask", "Tailwind"],
      categories: ["Full Stack", "Web"],
      image: qr,
      github: "https://github.com/louals/QR-Studio",
      live: "https://qr-studio.onrender.com/",
      cat: "Utility"
    },
    {
      id: "fitness-php",
      title: "Fitness & Shop Hub",
      description: "Dynamic fitness management site built with PHP/XAMPP, featuring PayPal API for secure transactions.",
      tags: ["HTML", "PHP", "MySQL", "PayPal API", "XAMPP", "CSS"],
      categories: ["Full Stack", "Web"],
      image: fitnessphp,
      github: "https://github.com/louals/Php-e-commerce",
      cat: "Legacy_Web"
    },
    {
      id: "species-tracker",
      title: "Species Tracker App",
      description: "Native mobile application for tracking biodiversity, powered by Kotlin and Firebase real-time database.",
      tags: ["Kotlin", "Firebase", "Android SDK"],
      categories: ["Mobile"],
      image: species,
      github: "https://github.com/louals/Kotlin_SpecieApp",
      cat: "Mobile_Native"
    },
    {
      id: "game-shop",
      title: "Video Games Shop",
      description: "Native Android application for gaming commerce, utilizing Java and SQLite for local data handling.",
      tags: ["Java", "Android Studio", "SQLite"],
      categories: ["Mobile"],
      image: shopping,
      github: "https://github.com/louals/videogames-shopping-app",
      cat: "Mobile_Native"
    },
    {
      id: "macbook-3d",
      title: "Macbook 3D Experience",
      description: "Interactive 3D product showcase using Three.js and GSAP for high-end web animations.",
      tags: ["React", "Three.js", "GSAP", "Tailwind"],
      categories: ["Web"],
      image: macbook,
      github: "https://github.com/louals/macbook_gsap_web",
      live: "https://macbookpro-0fef.onrender.com/",
      cat: "Web_3D"
    },
    {
      id: "ml-platform",
      title: "ML Training Platform",
      description: "Automated ML platform that evaluates multiple models for classification using Scikit-learn.",
      tags: ["Streamlit", "Python", "Scikit-learn", "Pandas"],
      categories: ["AI/ML"],
      image: mlApp,
      github: "https://github.com/louals/mlapp",
      cat: "AI_Logic"
    },
    {
      id: "iot-alarm",
      title: "Smart Home Alarm",
      description: "Physical hardware alarm built with Raspberry Pi and Flask backend with MySQL logging.",
      tags: ["Python", "Raspberry Pi", "Flask", "IoT"],
      categories: ["Full Stack", "IoT"],
      image: rsb,
      github: "https://github.com/louals/Py_AlarmSystem",
      live: "https://drive.google.com/file/d/12NrqG2zpQWrqoS6hY5LSunV_Urf_F_ct/view?usp=sharing",
      cat: "IoT_Node"
    },
    {
      id: "face-cbir",
      title: "Face Recog & CBIR",
      description: "Streamlit app supporting facial recognition and Content-Based Image Retrieval using OpenCV.",
      tags: ["Streamlit", "Python", "OpenCV", "Sqlite", "Numpy"],
      categories: ["AI/ML", "Full Stack"],
      image: cbir,
      github: "https://github.com/louals/CBIR-System", 
      cat: "Computer_Vision"
    },
    {
      id: "doctor-site",
      title: "Medical Practice Site",
      description: "Professional landing page for healthcare services with optimized appointment UI.",
      tags: ["React", "Tailwind", "Lucide"],
      categories: ["Web"],
      image: docwebsite,
      live: "https://dr-alsabbagh.com/#",
      cat: "Health_Web"
    },
    {
      id: "email-n8n",
      title: "Workflow Automation",
      description: "Automation pipeline for email processing using N8N visual workflows.",
      tags: ["N8N", "APIs", "Workflow"],
      categories: ["Web"],
      image: emailn8n,
      github: "https://github.com/louals/EmailN8N",
      cat: "Automation"
    },,
    {
      id: "weather-n8n",
      title: "Workflow Automation",
      description: "Automation pipeline for email processing using N8N visual workflows.",
      tags: ["N8N", "APIs", "Workflow"],
      categories: ["Web"],
      image: weathern8n,
      github: "https://github.com/louals/n8n-daily-weather-email",
      cat: "Automation"
    }
  ];

  const categories = [
    { id: "All", icon: <FiLayers size={14} /> },
    { id: "Web", icon: <FiBox size={14} /> },
    { id: "AI/ML", icon: <FiCpu size={14} /> },
    { id: "Full Stack", icon: <FiDatabase size={14} /> },
    { id: "Mobile", icon: <FiSmartphone size={14} /> },
    { id: "IoT", icon: <FiCpu size={14} /> }
  ];

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.categories.includes(activeCategory));

  return (
    <div className="min-h-screen bg-[#030303] text-white font-mono selection:bg-lime-400 selection:text-black">
      {/* HUD BACKGROUND GRID */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

      <div className="relative z-10 container mx-auto px-6 py-24">
        
        {/* TOP NAVIGATION */}
        <div className="flex justify-between items-center mb-16 border-b border-white/10 pb-8">
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-white/40 hover:text-lime-400 transition-all"
          >
            <FiArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            [ Return_to_Main_Frame ]
          </button>
          <div className="hidden md:block text-[10px] text-lime-400/50 uppercase tracking-widest">
            System_Status: Full_Registry_Access // v2.06
          </div>
        </div>

        {/* BRUTALIST HEADER */}
        <div className="mb-20 space-y-4">
          <div className="flex items-center gap-3 text-lime-400 text-xs tracking-widest uppercase">
            <FiTerminal className="animate-pulse" /> CORE_01_RESOURCES
          </div>
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8]">
            Project <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Archive_</span>
          </h1>
        </div>

        {/* FILTER CONTROL */}
        <div className="flex flex-wrap gap-2 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-3 px-6 py-2 text-[10px] border transition-all uppercase tracking-[0.2em] ${
                activeCategory === cat.id 
                ? "bg-lime-400 text-black border-lime-400 font-bold" 
                : "text-white/40 border-white/10 hover:border-white/60 hover:text-white"
              }`}
            >
              {cat.icon} {cat.id}
            </button>
          ))}
        </div>

        {/* PROJECT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative border-r border-b border-white/10 flex flex-col bg-black hover:bg-white/[0.01] transition-colors"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                
                {/* NEW: Hover Overlay and Button */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <button 
                    onClick={() => navigate(`/projects/${project.id}`, { state: { project } })}
                    className="bg-lime-400 text-black px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-white"
                  >
                    [ View_Full_Specs ]
                  </button>
                </div>

                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 px-2 py-1 text-[8px] uppercase tracking-tighter text-white/60">
                  SYS_NODE: {project.cat}
                </div>
              </div>

                {/* INFO PANEL */}
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-2xl font-black uppercase tracking-tighter leading-none mb-4 group-hover:text-lime-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-[11px] text-white/40 uppercase leading-relaxed mb-8 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-10 mt-auto">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-[9px] border border-white/10 px-2 py-0.5 text-white/60 uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* ACTION LINKS */}
                  <div className="flex gap-4 border-t border-white/10 pt-6">
                    {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                       className="flex-1 flex items-center justify-center gap-2 py-3 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                      <FiGithub /> Source
                    </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer"
                         className="flex-1 flex items-center justify-center gap-2 py-3 bg-lime-400 text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">
                        <FiExternalLink /> Live
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* FOOTER COUNTER */}
        <div className="mt-20 flex flex-col items-center">
            <span className="text-white/20 text-[10px] uppercase tracking-[0.5em] mb-4">Registry_Compiled_Successfully</span>
            <div className="h-20 w-[1px] bg-gradient-to-b from-lime-400 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default Projects;