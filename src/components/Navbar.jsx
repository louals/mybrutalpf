import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom"; // Added for routing
import {
  FiMenu,
  FiX,
  FiGithub,
  FiLinkedin,
  FiDownload,
  FiArrowRight,
} from "react-icons/fi";
import logo from "../assets/mylogo.png";
import { useLanguage } from "../Contexts/languageContext";
import { navbarContent } from "../contents/navbar";
import louaicv from "/Louai-CV.pdf";

const BrutalNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const content = navbarContent[language];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Only track active section if we are on the home page
      if (location.pathname === "/") {
        const sections = [ "projects", "skills", "contact"];
        const scrollPosition = window.scrollY + 200;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // FIXED: Added 'id' parameter and cross-page logic
  const scrollToSection = (id) => {
    setIsOpen(false);

    if (location.pathname !== "/") {
      // If not on home, go home first, then scroll
      navigate("/", { state: { targetId: id } });
    } else {
      // If already on home, just scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Helper to handle the "Home" click specifically
  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled 
          ? "bg-[#030303]/95 backdrop-blur-md border-b-2 border-lime-400 py-2 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* LOGO */}
        <div 
          className="flex items-center gap-4 cursor-pointer group"
          onClick={handleLogoClick}
        >
          <div className="relative">
            <img src={logo} alt="Logo" className="w-12 h-12 grayscale group-hover:grayscale-0 transition-all" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-lime-400 border border-black animate-pulse" />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase hidden sm:block">
            
          </span>
        </div>

        {/* CENTER NAV */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 p-1">
          {content.links.map((link) => {
            const sectionId = link.path.replace("#", "");
            const isActive = activeSection === sectionId && location.pathname === "/";
            return (
              <button
                key={link.name}
                onClick={() => scrollToSection(sectionId)}
                className={`px-4 py-1.5 text-xs font-mono uppercase tracking-widest transition-all ${
                  isActive 
                    ? "bg-lime-400 text-black font-black" 
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {isActive && "[ "} {link.name} {isActive && " ]"}
              </button>
            );
          })}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2">
          <a
            href={louaicv}
            download
            /* Added cursor-pointer and ensured it matches the pointer style */
            className="hidden lg:flex items-center gap-2 bg-white text-black px-5 py-2 hover:bg-lime-400 transition-colors group cursor-pointer"
          >
            <span className="text-xs font-black uppercase tracking-tighter pointer-events-none">
              Louai-CV.pdf
            </span>
            <FiDownload className="group-hover:translate-y-0.5 transition-transform pointer-events-none" />
          </a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center bg-lime-400 text-black cursor-pointer"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-[#030303] z-[110] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="font-mono text-lime-400 font-bold tracking-widest">MENU_SYSTEM</span>
              <button onClick={() => setIsOpen(false)} className="text-white"><FiX size={32} /></button>
            </div>

            <div className="flex flex-col gap-6">
              {content.links.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollToSection(link.path.replace("#", ""))}
                  className="text-5xl font-black uppercase text-left hover:text-lime-400 transition-colors flex items-center gap-4 group"
                >
                  <span className="text-sm font-mono text-white/20">0{i+1}</span>
                  {link.name}
                  <FiArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default BrutalNavbar;