import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiAlertTriangle, FiRefreshCw, FiHome, FiTerminal } from "react-icons/fi";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  

  return (
    <div className="min-h-screen bg-[#030303] text-white font-mono flex items-center justify-center p-6 overflow-hidden relative">
      
      {/* 1. CRT SCANLINE EFFECT */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.08]" 
        style={{ 
          background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
          backgroundSize: "100% 4px, 3px 100%"
        }} 
      />

      {/* 2. MOVING SCAN BAR */}
      <motion.div 
        initial={{ y: "-100%" }}
        animate={{ y: "100%" }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="fixed inset-0 w-full h-[100px] bg-lime-400/5 z-40 pointer-events-none blur-3xl"
      />

      <div className="relative z-10 max-w-3xl w-full border-t-[6px] border-red-600 bg-black/40 backdrop-blur-md p-8 md:p-12 shadow-[20px_20px_0px_rgba(255,0,0,0.1)]">
        
        {/* HEADER STATUS */}
        <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-red-500 animate-pulse">
            <FiAlertTriangle />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Critical_Process_Failure</span>
          </div>
          <div className="text-[10px] text-white/20">UUID: {Math.random().toString(16).slice(2, 10).toUpperCase()}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* LEFT: HUGE 404 */}
          <div className="md:col-span-5 relative">
            <motion.h1 
              initial="initial"
              animate="animate"
              className="text-[120px] md:text-[150px] font-black leading-none tracking-tighter text-transparent"
              style={{ WebkitTextStroke: '2px #dc2626' }}
            >
              404
            </motion.h1>
            <div className="absolute -bottom-2 left-0 bg-red-600 text-black px-2 py-1 text-[10px] font-black uppercase">
              Sector_Not_Found
            </div>
          </div>

          {/* RIGHT: TEXT CONTENT */}
          <div className="md:col-span-7 space-y-6">
            <h2 className="text-3xl font-black uppercase leading-tight italic">
              Access to <span className="text-red-500">{location.pathname}</span> was denied or corrupted.
            </h2>
            <p className="text-white/40 text-xs uppercase leading-relaxed tracking-wider">
              The system administrator has been notified. This incident has been logged in the central kernel registry. 
              Please relocate to a verified sector.
            </p>
          </div>
        </div>

        {/* LOG TERMINAL */}
        <div className="mt-12 bg-[#0a0a0a] border border-white/5 p-6 font-mono relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 text-[8px] text-white/10">CORE_LOG_V2.0</div>
          <div className="text-[11px] space-y-2">
            <div className="flex gap-4">
              <span className="text-white/20">[0.00012]</span>
              <span className="text-lime-400">Initiating system scan...</span>
            </div>
            <div className="flex gap-4">
              <span className="text-white/20">[0.00045]</span>
              <span className="text-red-500">ERROR: Directory "{location.pathname}" is unreadable.</span>
            </div>
            <div className="flex gap-4">
              <span className="text-white/20">[0.00089]</span>
              <span className="text-yellow-500">WARNING: User session floating in void space.</span>
            </div>
            <div className="flex gap-4">
              <span className="text-white/20">[0.00120]</span>
              <span className="text-blue-400">Recommendation: Execute return to BIOS.</span>
            </div>
            <div className="flex gap-2 text-lime-400/50 pt-2 animate-pulse">
              <FiTerminal />
              <span>{`awaiting_input_`}</span>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-10 flex flex-wrap gap-4">
          <button 
            onClick={() => navigate("/")}
            className="group relative flex-1 min-w-[200px] overflow-hidden bg-white text-black py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-lime-400"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <FiHome /> Return
            </span>
          </button>
          
          <button 
            onClick={() => navigate(-1)}
            className="flex-1 min-w-[200px] border border-white/10 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all flex items-center justify-center gap-2"
          >
            <FiRefreshCw /> [ Step_Back ]
          </button>
        </div>
      </div>

      {/* AMBIENT BACKGROUND TEXT */}
      <div className="absolute bottom-10 right-10 opacity-5 pointer-events-none select-none">
        <h3 className="text-[10vw] font-black leading-none uppercase">Void</h3>
      </div>
    </div>
  );
};

export default NotFound;