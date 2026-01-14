import { motion, useAnimation } from "framer-motion";
import { FiSend, FiMail, FiMapPin, FiLinkedin, FiGithub, FiTerminal, FiChevronRight } from "react-icons/fi";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { useLanguage } from "../Contexts/languageContext";
import { contactContent } from "../contents/contact";

const ContactSection = () => {
  const { language } = useLanguage();
  const content = contactContent[language];
  
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    emailjs.init("5FTBM2s1H5jz7TfV-");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      await emailjs.send("service_mcf31up", "template_2fo3hfp", formData, "5FTBM2s1H5jz7TfV-");
      toast.success(content.form.success);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(content.form.error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="relative bg-[#030303] py-24 px-6 overflow-hidden border-t border-white/10">
      {/* Background Tech UI - Fixed Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Header - Industrial Style */}
        <div className="mb-20">
          <div className="flex items-center gap-3 text-lime-400 font-mono text-xs mb-4">
            <FiTerminal />
            <span className="tracking-[0.3em]">ESTABLISH_CONNECTION</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white">
            Get In <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '1px white' }}>Touch</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/10">
          
          {/* Left: Contact Form (The "Input Buffer") */}
          <div className="lg:col-span-7 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#080808]">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="relative group">
                  <label className="block font-mono text-[10px] text-white/40 uppercase mb-2 group-focus-within:text-lime-400 transition-colors">
                    01_Client_Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-lime-400 transition-colors font-medium"
                    required
                  />
                </div>
                <div className="relative group">
                  <label className="block font-mono text-[10px] text-white/40 uppercase mb-2 group-focus-within:text-lime-400 transition-colors">
                    02_Email_Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-lime-400 transition-colors font-medium"
                    required
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="block font-mono text-[10px] text-white/40 uppercase mb-2 group-focus-within:text-lime-400 transition-colors">
                  03_Message_Packet
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-lime-400 transition-colors font-medium resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="group relative flex items-center gap-4 bg-lime-400 text-black px-10 py-5 font-black uppercase text-sm hover:bg-white transition-all disabled:opacity-50"
              >
                {isSending ? "Transmitting..." : "Send_Message"}
                <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Right: Info (The "System Metadata") */}
          <div className="lg:col-span-5 bg-[#0c0c0c] p-8 md:p-12 flex flex-col justify-between">
            <div className="space-y-12">
              <div>
                <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-[0.2em] mb-6">Contact_Methods</h4>
                <div className="space-y-6">
                  <a href="mailto:me@louaialsabbagh.tech" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                      <FiMail size={20} />
                    </div>
                    <span className="font-mono text-sm group-hover:text-lime-400 transition-colors">me@louaialsabbagh.tech</span>
                  </a>
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 border border-white/10 flex items-center justify-center">
                      <FiMapPin size={20} />
                    </div>
                    <span className="font-mono text-sm text-white/60 uppercase tracking-widest">Montreal, QC // Remote</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-[0.2em] mb-6">Social_Protocol</h4>
                <div className="flex gap-4">
                  <a href="https://github.com/louals" target="_blank" className="flex-1 py-4 border border-white/10 flex flex-col items-center gap-2 hover:bg-white/5 transition-colors">
                    <FiGithub size={24} />
                    <span className="font-mono text-[10px] opacity-40">GITHUB</span>
                  </a>
                  <a href="https://linkedin.com/in/louai-a-8b239b2a0/" target="_blank" className="flex-1 py-4 border border-white/10 flex flex-col items-center gap-2 hover:bg-white/5 transition-colors">
                    <FiLinkedin size={24} />
                    <span className="font-mono text-[10px] opacity-40">LINKEDIN</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Status bar */}
            <div className="mt-12 pt-8 border-t border-white/5 font-mono text-[10px] text-white/20 flex justify-between uppercase">
              <span>Status: Available</span>
              <span>Local_Time: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;