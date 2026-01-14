import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components (Ensure you are using the new Brutal versions we created)
import Navbar from './components/Navbar';
import HomeSection from './components/HeroSection';
import WorkSection from './components/WorkSection';
import SkillsMatrix from './components/SkillsSection';
import ContactSection from './components/Contact';
import AnimatedIntro from './components/Intro';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetails';
import Terminal from './components/Terminal';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      {/* 1. Global Container: 
          - bg-[#030303] is the "true" Next.js dark. 
          - selection:bg-lime-400 makes text highlights match your vibe.
      */}
      <div className="min-h-screen bg-[#030303] text-white selection:bg-lime-400 selection:text-black antialiased overflow-x-hidden">
        
        {/* 2. THE NOISE OVERLAY (The "Pro" touch) */}
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <Terminal />
        <Routes>
          <Route path="/" element={
            <>
              {/* Intro handles its own layering */}
              <AnimatedIntro />
              
              <Navbar />

              {/* 3. Layout Flow:
                  - Removed pt-20. Brutalist sites often have the Hero start at the very top 
                    with the Navbar glass-morphed or border-integrated.
              */}
              <main className="relative">
                {/* Each section should have a clear border-b to maintain the "grid" look */}
                <div className="border-b border-white/10">
                  <HomeSection />
                </div>
                
                <div className="border-b border-white/10">
                  <WorkSection />
                </div>
                
                <div className="border-b border-white/10">
                  <SkillsMatrix />
                </div>

                <ContactSection />
              </main>
            </>
          } />

          {/* ALL PROJECTS REGISTRY */}
          <Route path="/projects" element={<Projects />} />

          {/* PROJECT DEEP DIVE (Dynamic ID) */}
          <Route path="/projects/:id" element={<ProjectDetail />} />

          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* 4. Brutalist Styled Toast */}
        <ToastContainer
          position="bottom-right" // Bottom-right feels more "system notification"
          autoClose={4000}
          hideProgressBar={true} // Cleanest look
          newestOnTop={true}
          closeOnClick
          theme="dark"
          toastStyle={{
            backgroundColor: '#000',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '0px', // Sharp corners
            fontFamily: 'monospace',
            fontSize: '12px'
          }}
        />
      </div>
    </Router>
  );
}

export default App;