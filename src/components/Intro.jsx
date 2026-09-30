import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/mylogo.png';

export default function AnimatedIntro() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    // Shortened slightly to keep the user from waiting too long
    const timer = setTimeout(() => setShowLogo(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showLogo && (
        <motion.div
          key="intro"
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030303] overflow-hidden"
        >
          {/* BRUTALIST GRID OVERLAY */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

         

          <div className="relative">
            {/* LOGO BOX - Industrial Border */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ scale: 1.1, filter: "blur(10px)", opacity: 0 }}
              className="relative p-6 border border-white/10 bg-black shadow-2xl"
            >
              {/* Corner Accents */}
              <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-lime-400" />
              <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-lime-400" />

              <motion.img
                src={logo}
                alt="Louai Logo"
                initial={{ opacity: 0, filter: "grayscale(1) brightness(2)" }}
                animate={{ opacity: 1, filter: "grayscale(0) brightness(1)" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-24 h-24 md:w-32 md:h-32 object-contain"
              />
            </motion.div>

            {/* LOADING TEXT */}
            <motion.div 
              className="absolute -bottom-12 left-0 right-0 flex justify-between font-mono text-[10px] text-lime-400 tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                _
              </motion.span>
            </motion.div>
          </div>

          {/* DECODING STRINGS (Bottom Left decoration) */}
          <div className="absolute bottom-8 left-8 font-mono text-[8px] text-white/20 hidden md:block">
            <div>SYSTEM_VERSION: 2.0.4</div>
            <div>STATUS: ENCRYPTED_HANDSHAKE</div>
            <div>LOCATION: MONTREAL_QC</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}