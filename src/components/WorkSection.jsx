import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiLayers, FiTerminal } from "react-icons/fi";

// Asset Imports
import euthereumApp from "../assets/euthereum-app.png";
import socialmedia from "../assets/socialmedia.png";
import Nocturne from "../assets/nocturn.png"; // Used for DealZone based on your data

const WorkSection = () => {
  // Hardcoded selection from your provided data
  const projects = [

    
    {
      title: "Nocturne",
      description: "A modern web platform for buying and selling homes. Features include property listings, search filters, user authentication, and real-time management.",
      tags: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
      image: Nocturne,
      github: "https://github.com/louals/DealZone",
      live: "https://jkdealzone.com/"
    },
    {
      title: "Social Media App",
      description: "A TypeScript React social app using Appwrite with infinite scroll, post creation, likes, saves, and user profiles. Clean, scalable, modern.",
      tags: ["TypeScript", "React", "AppWrite", "Tailwind CSS"],
      image: socialmedia,
      github: "https://github.com/louals/React_SocialMedia",
      live: "https://save-and-share.onrender.com"
    },
    {
      title: "Euthereum App",
      description: "Modern online store with real-time inventory, Stripe payments, and Cloudflare edge caching. Handling high-volume secure transactions.",
      tags: ["React", "Node.js", "MongoDB", "Stripe", "Cloudflare"],
      image: euthereumApp,
      github: "https://github.com/louals/Ecommerce-React-Node.js",
      live: "#" 
    }
  ];

  return (
    <section id="projects" className="bg-[#030303] py-24 relative overflow-hidden">
      {/* DECORATIVE BACKGROUND TEXT */}
      <div className="absolute top-0 left-0 opacity-[0.02] select-none pointer-events-none">
        <h1 className="text-[15rem] md:text-[20rem] font-black leading-none uppercase -ml-20">Production</h1>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* BRUTALIST HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-l-4 border-lime-400 pl-8">
          <div className="max-w-2xl text-left">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
              Selected <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Works</span>
            </h2>
            <p className="font-mono text-gray-500 uppercase tracking-widest text-sm">
              // Archive_v2.06 — Selected_Deployments
            </p>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-lime-400 font-mono text-xs">03_TOTAL_SYSTEMS</span>
          </div>
        </div>

        {/* PROJECTS GRID */}
        <div className="space-y-32">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/10"
            >
              {/* PROJECT IMAGE */}
              <div className="lg:col-span-7 relative overflow-hidden bg-zinc-900 aspect-video border-b lg:border-b-0 lg:border-r border-white/10">
                <div className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur px-3 py-1 border border-white/10 font-mono text-[10px] uppercase text-lime-400">
                  SYS_ID: 0{index + 1}
                </div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                />
              </div>

              {/* PROJECT INFO */}
              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center bg-[#080808] group-hover:bg-[#0c0c0c] transition-colors">
                <div className="flex items-center gap-3 text-lime-400 mb-6 font-mono text-xs">
                  <FiLayers /> <span>COMPILED_RESOURCES</span>
                </div>
                
                <h3 className="text-4xl font-black uppercase tracking-tighter mb-4 group-hover:text-lime-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 font-medium leading-relaxed mb-8 border-l-2 border-lime-400/30 pl-6 italic">
                  "{project.description}"
                </p>

                <div className="flex flex-wrap gap-2 mb-10 font-mono">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] px-2 py-1 border border-white/10 text-white/60 hover:border-lime-400 hover:text-lime-400 transition-colors">
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-3 py-4 border border-white/20 hover:bg-white hover:text-black transition-all font-black uppercase text-xs"
                  >
                    <FiGithub /> Source_Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-3 py-4 bg-lime-400 text-black hover:bg-white transition-all font-black uppercase text-xs"
                  >
                    <FiExternalLink /> Live_Preview
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* REGISTRY CTA */}
        <div className="mt-32 pt-20 border-t border-white/10 text-center">
            <h3 className="text-xl font-mono text-white/40 mb-8 uppercase tracking-[0.3em]">Explore the full directory?</h3>
            <a
                href="/projects"
                className="group inline-flex items-center gap-6 text-4xl md:text-6xl font-black uppercase hover:text-lime-400 transition-all"
            >
                View_All_Projects
                <FiTerminal className="group-hover:translate-x-4 transition-transform text-lime-400" />
            </a>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;