import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Terminal as TerminalIcon, X, Maximize2, ChevronRight } from 'lucide-react';

const Terminal = () => {
  const navigate = useNavigate();
  const terminalRef = useRef(null);
  const scrollRef = useRef(null);
  
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [input, setInput] = useState('');
  
  const [history, setHistory] = useState([
    { type: 'system', content: 'CORE_01_OS [Version 2.0.6.88]' },
    { type: 'system', content: 'Initializing node_registry... DONE' },
    { type: 'system', content: 'Welcome, Operator. Type "help" to see available nodes.' },
  ]);
  
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyPointer, setHistoryPointer] = useState(-1);
  const [currentPath, setCurrentPath] = useState(['home', 'arch']);

  const fileSystem = {
    home: {
      arch: {
        'manifesto.txt': 'Brutalism in code. Efficiency in logic. Silence in execution.',
        'identity.env': 'NAME=Louai\nROLE=Full_Stack_Architect\nSPECIALTY=IoT_AI_Web3',
        projects: {
          'nocturne.txt': 'Fintech: Modern web platform for buying/selling homes. React/TypeScript/Firebase.',
          'email_workflow.txt': 'Automation: Pipeline for email processing using N8N visual workflows.',
          'euthereum_app.txt': 'Web3: Online store with Stripe payments and Cloudflare edge caching.',
          'social_app.txt': 'Social: TypeScript React social app using Appwrite with infinite scroll.',
          'docs_clone.txt': 'Productivity: Real-time collaborative document editor using Firebase Cloud.',
          'qr_studio.txt': 'Utility: Custom QR generator. Vue.js frontend + Python Flask backend.',
          'dealzone.txt': 'Real Estate: Property listings and real-time management. React/Firebase.',
          'as_salam.txt': 'Non-Profit: FastAPI backend with high-performance React 3D frontend.',
          'macbook_3d.txt': 'Web_3D: Interactive product showcase using Three.js and GSAP.',
          'medical_site.txt': 'Health: Professional healthcare landing page with optimized appointment UI.',
          'weather_n8n.txt': 'Automation: Daily weather email automation via N8N pipelines.',
          'ibongsport.txt': 'MERN: Comprehensive sports portal for high-traffic content management.',
          'fitness_hub.txt': 'Legacy: Dynamic fitness management built with PHP/XAMPP and PayPal API.',
          'species_tracker.txt': 'Mobile: Native biodiversity tracker powered by Kotlin and Firebase.',
          'game_shop.txt': 'Mobile: Native Android commerce app utilizing Java and SQLite.',
          'ml_platform.txt': 'AI_Logic: Automated ML platform evaluating classification models.',
          'iot_alarm.txt': 'IoT: Physical hardware alarm built with Raspberry Pi and Flask.',
          'face_cbir.txt': 'Computer_Vision: Facial recognition and image retrieval using OpenCV.'
        },
        'system_logs': {
          'session.log': 'User connection established via Terminal_Bridge.',
          'status.log': 'All nodes operational. Registry Compiled Successfully.'
        }
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (terminalRef.current && !terminalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const getDir = (pathArray) => pathArray.reduce((acc, curr) => acc && acc[curr], fileSystem);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    const args = trimmedCmd.split(' ');
    const baseCmd = args[0].toLowerCase();
    const rawTarget = args[1] || '';
    let output = '';

    setCommandHistory(prev => [trimmedCmd, ...prev]);
    setHistoryPointer(-1);

    const currentFolder = getDir(currentPath);

    switch (baseCmd) {
      case 'help':
        output = `CORE COMMANDS:
  ls          - List directory contents
  cd [dir]    - Change directory (use ".." to go back)
  pwd         - Print working directory
  cat [file]  - View file content
  run [prj]   - Execute project file
  goto [node] - UI Fast travel: home, projects
  whoami      - Session identity
  clear       - Wipe terminal
  exit        - Close session`;
        break;

      case 'ls':
        output = Object.keys(currentFolder).map(item => 
          typeof currentFolder[item] === 'object' ? `${item}/` : item
        ).join('    ');
        break;

      case 'pwd':
        output = `/${currentPath.join('/')}`;
        break;

      case 'cd':
        if (!rawTarget || rawTarget === "~") {
          setCurrentPath(['home', 'arch']);
        } else if (rawTarget === "..") {
          if (currentPath.length > 0) {
            setCurrentPath(prev => prev.slice(0, -1));
          }
        } else if (rawTarget === "../") {
            if (currentPath.length > 0) {
                setCurrentPath(prev => prev.slice(0, -1));
            }
        } else {
          if (currentFolder[rawTarget] && typeof currentFolder[rawTarget] === 'object') {
            setCurrentPath(prev => [...prev, rawTarget]);
          } else {
            output = `bash: cd: ${rawTarget}: No such directory`;
          }
        }
        break;

      case 'cat':
        if (currentFolder[rawTarget] && typeof currentFolder[rawTarget] === 'string') {
          output = currentFolder[rawTarget];
        } else {
          output = `cat: ${rawTarget}: No such file or directory`;
        }
        break;

      case 'run':
        const cleanName = rawTarget.replace('.txt', '');
        output = `[BOOT] Initializing ${cleanName.toUpperCase()} subsystem...`;
        setTimeout(() => navigate('/projects'), 800);
        break;

      case 'goto':
        if (rawTarget === 'home') navigate('/');
        else if (rawTarget === 'projects') navigate('/projects');
        output = `Relocating to ${rawTarget.toUpperCase()}...`;
        break;

      case 'whoami':
        output = `architect@CORE_01`;
        break;

      case 'clear':
        setHistory([]); return;

      case 'exit':
        setIsOpen(false); return;

      default:
        output = `command not found: ${baseCmd}`;
    }

    setHistory(prev => [...prev, 
      { type: 'input', content: `${currentPath[currentPath.length-1] || 'root'} $ ${trimmedCmd}` }, 
      { type: 'output', content: output }
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { handleCommand(input); setInput(''); }
    else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyPointer < commandHistory.length - 1) {
          const next = historyPointer + 1;
          setHistoryPointer(next); setInput(commandHistory[next]);
        }
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="hidden md:flex fixed bottom-6 left-6 z-[99] bg-white text-black px-4 py-2 text-[10px] font-black uppercase tracking-widest border-2 border-white hover:bg-lime-400 hover:border-lime-400 transition-all items-center gap-2 shadow-[4px_4px_0px_rgba(255,255,255,0.2)]"
      >
        <TerminalIcon size={14} /> System_Root
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div 
              ref={terminalRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`bg-[#050505] border border-white/20 flex flex-col shadow-2xl
                ${isMaximized ? 'w-full h-full' : 'w-full max-w-[750px] h-[500px]'}`}
            >
              <div className="bg-zinc-900/80 p-3 flex justify-between items-center border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div onClick={() => setIsOpen(false)} className="w-2.5 h-2.5 rounded-full bg-red-500 cursor-pointer" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
                  </div>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">
                    Terminal — /{currentPath.join('/')}
                  </span>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setIsMaximized(!isMaximized)} className="text-white/20 hover:text-white"><Maximize2 size={14}/></button>
                  <button onClick={() => setIsOpen(false)} className="text-white/20 hover:text-red-500"><X size={16}/></button>
                </div>
              </div>

              <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto font-mono text-sm scrollbar-hide">
                {history.map((line, i) => (
                  <div key={i} className={`whitespace-pre-wrap mb-2 ${
                    line.type === 'input' ? 'text-lime-400 font-bold' : 
                    line.type === 'system' ? 'text-white/20 italic' : 'text-white/80'
                  }`}>
                    {line.content}
                  </div>
                ))}
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-lime-400 font-bold">
                    {currentPath[currentPath.length-1] || 'root'} <ChevronRight size={14} className="inline"/>
                  </span>
                  <input 
                    autoFocus
                    className="bg-transparent border-none outline-none text-white flex-grow caret-lime-400"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>

              <div className="p-2 px-4 bg-lime-400 text-black text-[9px] font-black uppercase flex justify-between">
                <span>Status: Connected</span>
                <span>Active_Node: /{currentPath[currentPath.length-1] || 'root'}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Terminal;