import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, ChevronRight } from 'lucide-react';

const Terminal = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [input, setInput] = useState('');
  
  const [history, setHistory] = useState([
    { type: 'system', content: 'CORE_01_OS [Version 2.0.6.88]' },
    { type: 'system', content: 'Initializing interactive_linkage... DONE' },
    { type: 'system', content: 'Welcome, Guest. Type "help" for system commands.' },
  ]);
  
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyPointer, setHistoryPointer] = useState(-1);
  const [currentPath, setCurrentPath] = useState(['home', 'arch']);
  const scrollRef = useRef(null);

  // VIRTUAL FILE SYSTEM
  const fileSystem = {
    home: {
      arch: {
        'manifesto.txt': 'Brutalism in code. Efficiency in logic. Silence in execution.',
        'identity.env': 'NAME=Louai\nROLE=Full_Stack_Architect\nSPECIALTY=IoT_AI_Web3',
        projects: {
          'social_app.md': 'Stack: React/Appwrite\nStatus: Live',
          'dealzone.md': 'Stack: React/Firebase\nStatus: Production',
          'iot_alarm.sh': 'Running... [OK]'
        },
        'system_logs': {
          'startup.log': 'All nodes operational.',
          'security.log': 'Guest access granted.'
        }
      }
    }
  };

  const getDir = (pathArray) => pathArray.reduce((acc, curr) => acc && acc[curr], fileSystem);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const triggerGlitch = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 500);
  };

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
      case 'man':
        output = `AVAILABLE COMMANDS:
  ls          - List files
  cd [dir]    - Change directory
  cat [file]  - Read file
  goto [node] - Navigate: home, projects, contact, skills
  whoami      - Identity info
  neofetch    - System specs
  theme [clr] - Change UI: lime, cyan, red, white
  sudo [cmd]  - Root access
  clear       - Clear screen
  exit        - Terminate session`;
        break;

      case 'ls':
        output = Object.keys(currentFolder).map(item => 
          typeof currentFolder[item] === 'object' ? `${item}/` : item
        ).join('  ');
        break;

      case 'cd':
        const pathParts = rawTarget.split('/').filter(p => p !== "");
        let tempPath = [...currentPath];
        if (!rawTarget || rawTarget === "~") {
          tempPath = ['home', 'arch'];
        } else {
          for (const part of pathParts) {
            if (part === "..") { if (tempPath.length > 1) tempPath.pop(); }
            else {
              const checkDir = getDir(tempPath);
              if (checkDir[part] && typeof checkDir[part] === 'object') tempPath.push(part);
              else { output = `bash: cd: ${rawTarget}: No such directory`; tempPath = null; break; }
            }
          }
        }
        if (tempPath) setCurrentPath(tempPath);
        break;

      case 'cat':
        if (currentFolder[rawTarget] && typeof currentFolder[rawTarget] === 'string') output = currentFolder[rawTarget];
        else output = `cat: ${rawTarget}: No such file or is a directory.`;
        break;

      case 'goto':
        if (rawTarget === 'home') { navigate('/'); output = 'Redirecting to ROOT_NODE...'; }
        else if (rawTarget === 'projects') { navigate('/projects'); output = 'Accessing PROJECT_REGISTRY...'; }
        else if (['contact', 'skills'].includes(rawTarget)) {
          document.getElementById(rawTarget)?.scrollIntoView({ behavior: 'smooth' });
          output = `Scrolling to ${rawTarget.toUpperCase()}...`;
        } else output = `Invalid node. Try: home, projects, contact.`;
        break;

      case 'whoami':
        output = `guest_user@CORE_01\nSTATUS: Authenticated\nPERMISSIONS: Level_01`;
        break;

      case 'neofetch':
        output = `               
  CORE_01_OS    OS: Louai_Architect v2.0.6
  ----------    KERNEL: 6.1.0-BRUTALIST
   \\  /        UPTIME: ${Math.floor(performance.now() / 60000)} mins
    \\/         SHELL: custom_bash 5.2
               UI: Tailwind_React_Vite`;
        break;

      case 'theme':
        const colors = { lime: '#bef264', cyan: '#06b6d4', red: '#ef4444', white: '#ffffff' };
        if (colors[rawTarget]) {
          document.documentElement.style.setProperty('--lime-400', colors[rawTarget]);
          output = `Accent color changed to ${rawTarget.toUpperCase()}.`;
        } else output = `Usage: theme [lime | cyan | red | white]`;
        break;

      case 'sudo':
        triggerGlitch();
        output = `[ERROR] Permission denied. Intrusion attempt logged.`;
        break;

      case 'clear':
        setHistory([]); return;

      case 'exit':
        setIsOpen(false); return;

      default:
        output = `command not found: ${baseCmd}. Type "help" for list.`;
    }

    setHistory(prev => [...prev, 
      { type: 'input', content: `${currentPath[currentPath.length-1]} $ ${trimmedCmd}` }, 
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
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer > 0) {
        const next = historyPointer - 1;
        setHistoryPointer(next); setInput(commandHistory[next]);
      } else { setHistoryPointer(-1); setInput(''); }
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-[99] bg-white text-black px-4 py-2 text-[10px] font-black uppercase tracking-widest border-2 border-white hover:bg-lime-400 hover:border-lime-400 transition-all flex items-center gap-2 shadow-[4px_4px_0px_rgba(255,255,255,0.2)]"
      >
        <TerminalIcon size={14} /> System_Root
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              x: isGlitching ? [0, -5, 5, -5, 0] : 0
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed z-[1000] bg-[#050505] border border-white/20 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)]
              ${isMaximized ? 'inset-0' : 'bottom-20 left-6 w-[95vw] md:w-[700px] h-[500px]'}`}
          >
            {/* TERMINAL HEADER */}
            <div className="bg-zinc-900/50 p-3 flex justify-between items-center border-b border-white/10 select-none">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div onClick={() => setIsOpen(false)} className="w-2.5 h-2.5 rounded-full bg-red-500 cursor-pointer" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Interactive_Bash — {currentPath.join('/')}</span>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setIsMaximized(!isMaximized)} className="text-white/20 hover:text-white transition-colors"><Maximize2 size={14}/></button>
                <button onClick={() => setIsOpen(false)} className="text-white/20 hover:text-red-500 transition-colors"><X size={16}/></button>
              </div>
            </div>

            {/* TERMINAL BODY */}
            <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto font-mono text-sm scrollbar-hide">
              {history.map((line, i) => (
                <div key={i} className={`whitespace-pre-wrap mb-2 leading-relaxed ${
                  line.type === 'input' ? 'text-lime-400 font-bold' : 
                  line.type === 'system' ? 'text-white/30' : 'text-white/80'
                }`}>
                  {line.content}
                </div>
              ))}
              
              <div className="flex items-center gap-2 mt-4">
                <span className="text-lime-400 font-bold">
                  {currentPath[currentPath.length-1]} <ChevronRight size={14} className="inline"/>
                </span>
                <input 
                  autoFocus
                  className="bg-transparent border-none outline-none text-white flex-grow caret-lime-400 selection:bg-lime-400/30"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                />
              </div>
            </div>

            {/* STATUS BAR */}
            <div className="p-2 px-4 bg-lime-400 text-black text-[9px] font-black uppercase flex justify-between">
              <span>Status: Connected</span>
              <span>Host: core_01.node</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Terminal;