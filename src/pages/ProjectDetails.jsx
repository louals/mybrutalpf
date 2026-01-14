import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiGithub, FiExternalLink, FiTerminal, FiActivity } from "react-icons/fi";
import { useEffect } from "react";

const ProjectDetails = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const project = state?.project;

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center font-mono text-white">
        <FiActivity className="animate-pulse text-lime-400 mb-4" size={40} />
        <p className="text-xs tracking-[0.4em] uppercase opacity-50">Data_Loss_Detected</p>
        <button onClick={() => navigate("/projects")} className="mt-8 text-lime-400 border border-lime-400/30 px-6 py-2 text-xs uppercase hover:bg-lime-400 hover:text-black transition-all">
          Reboot_Archive
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white font-mono selection:bg-lime-400 selection:text-black">
      {/* BACKGROUND DECOR */}
      <div className="fixed top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none z-0" 
           style={{ backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="relative z-10 container mx-auto px-6 py-12 md:py-24">
        
        {/* NAV HEADER */}
        <div className="flex justify-between items-center mb-16 border-b border-white/10 pb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-lime-400 transition-all"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> [ Back_To_Registry ]
          </button>
          <div className="text-[9px] text-white/20 uppercase tracking-widest hidden md:block">
            Object_ID: {project.id} // Sector: {project.cat}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* LEFT COLUMN: VISUALS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="group relative border border-white/10 overflow-hidden bg-white/5">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-60" />
            </div>

            {/* TECHNICAL SPECS TABLE */}
            <div className="border border-white/10 p-6 space-y-4 bg-white/[0.02]">
               <div className="flex items-center gap-2 text-[10px] text-lime-400 uppercase tracking-widest mb-2">
                 <FiTerminal size={12} /> System_Manifest
               </div>
               <div className="grid grid-cols-2 gap-4 text-[10px] uppercase tracking-tighter">
                  <div className="text-white/30">Deployment_Status</div>
                  <div className="text-white/80 text-right">Operational</div>
                  <div className="text-white/30">Primary_Engine</div>
                  <div className="text-white/80 text-right">{project.tags[1]}</div>
                  <div className="text-white/30">Interface_Logic</div>
                  <div className="text-white/80 text-right">{project.tags[0] || "N/A"}</div>
               </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: DATA */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="space-y-2 mb-6">
              <span className="text-lime-400 text-[10px] uppercase tracking-[0.5em]">Project_Protocol_{project.cat}</span>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                {project.title.replace("Website", "").replace("App", "")}
              </h1>
            </div>

            <p className="text-white/50 text-sm leading-relaxed mb-10 border-l-2 border-lime-400 pl-6 py-2 uppercase italic">
              {project.description}
            </p>

            {/* TAG CLOUD */}
            <div className="mb-12">
              <h4 className="text-[10px] uppercase text-white/30 mb-4 tracking-widest tracking-[0.2em]">// Built_With</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 border border-white/10 text-[9px] uppercase hover:border-lime-400 hover:text-lime-400 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA BOX */}
            <div className="flex flex-col sm:flex-row gap-4">
              {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 py-5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
                >
                  <FiGithub /> Source_Code
                </a>
              )}
              {project.live && (
                <a 
                  href={project.live} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 py-5 bg-lime-400 text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_20px_rgba(163,230,53,0.2)]"
                >
                  <FiExternalLink /> Live_Execute
                </a>
              )}
            </div>
          </motion.div>
        </div>

        {/* FOOTER */}
        <div className="mt-32 pt-12 border-t border-white/5 text-center">
            <p className="text-[9px] text-white/20 uppercase tracking-[0.8em]">End_Of_File</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;