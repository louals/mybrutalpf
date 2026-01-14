import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiAlertTriangle, FiRefreshCw, FiHome } from "react-icons/fi";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#030303] text-white font-mono flex items-center justify-center p-6 overflow-hidden">
      {/* GLITCH BACKGROUND EFFECT */}
      <div className="fixed inset-0 opacity-[0.05] pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
        <div className="h-full w-full" style={{ 
          backgroundImage: `linear-gradient(transparent 0%, rgba(163, 230, 53, 0.2) 50%, transparent 100%)`, 
          backgroundSize: '100% 4px' 
        }} />
      </div>

      <div className="relative z-10 max-w-2xl w-full border border-red-500/30 bg-black/40 backdrop-blur-xl p-8 md:p-16 text-center">
        {/* ERROR ICON */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center mb-8"
        >
          <FiAlertTriangle size={64} className="text-red-500" />
        </motion.div>

        {/* ERROR CODES */}
        <div className="space-y-2 mb-10">
          <h2 className="text-red-500 text-xs tracking-[0.5em] uppercase font-black">
            Error_Code: 0x000404
          </h2>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
            Sector_Not_Found
          </h1>
          <p className="text-white/40 text-[10px] uppercase tracking-widest mt-4">
            The requested memory address is invalid or has been decommissioned.
          </p>
        </div>

        {/* SYSTEM CONSOLE SIMULATION */}
        <div className="bg-black border border-white/10 p-4 mb-10 text-left">
          <div className="flex gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
            <div className="w-2 h-2 rounded-full bg-green-500/50" />
          </div>
          <div className="text-[10px] text-lime-400/70 space-y-1 uppercase">
            <p className="">{`> STACK_TRACE: Searching for route...`}</p>
            <p className="text-red-400">{`> ERROR: Page definition at ${window.location.pathname} is NULL`}</p>
            <p className="">{`> SUGGESTION: Initiate emergency reboot to core directory`}</p>
            <p className="animate-pulse">{`> _`}</p>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => navigate("/")}
            className="flex-1 flex items-center justify-center gap-3 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-lime-400 transition-all"
          >
            <FiHome /> [ Return_Home ]
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="flex-1 flex items-center justify-center gap-3 py-4 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
          >
            <FiRefreshCw /> [ Retry_System ]
          </button>
        </div>

        {/* DECORATIVE FOOTER */}
        <div className="mt-12 opacity-20 text-[8px] uppercase tracking-[1em]">
          Terminal_Status: Offline // Access_Denied
        </div>
      </div>
    </div>
  );
};

export default NotFound;