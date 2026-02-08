'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Footer from './footer';
import { ArrowDown, Github, Linkedin, MessageSquare, ArrowRight } from 'lucide-react';

// --- Header Component එක (වෙනසක් නොමැත) ---
function Header() {
  const NavItem = ({ children, href }: { children: React.ReactNode, href: string }) => (
    <a href={href} className="text-[#333] hover:text-[#111] transition-colors uppercase text-sm font-medium tracking-wider px-4 py-2">
      {children}
    </a>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-6 md:px-20">
        <div className="text-xl font-bold tracking-[0.3em] text-[#111]">
          PORTFOLIO<span className="text-[#666]">.</span>
        </div>
        <nav className="hidden md:flex items-center space-x-2 border border-gray-200 rounded-full p-1">
          <NavItem href="#home">Home</NavItem>
          <NavItem href="#about">About Me</NavItem>
          <NavItem href="#projects">Projects</NavItem>
          <NavItem href="#contact">Contact</NavItem>
        </nav>
        <div className="flex items-center space-x-4">
          <a href="#" aria-label="Github" className="text-[#666] hover:text-[#111] transition-colors"><Github size={20} /></a>
          <a href="#" aria-label="LinkedIn" className="text-[#666] hover:text-[#111] transition-colors"><Linkedin size={20} /></a>
          <a href="#" aria-label="Contact" className="text-[#666] hover:text-[#111] transition-colors"><MessageSquare size={20} /></a>
        </div>
      </div>
    </header>
  );
}


// --- 1. HERO SECTION (UPDATED) ---
function HeroSection() {
  const skills = ['UI/UX Design', 'Web Design', 'Landing Pages', 'Figma', 'React/Next.js'];

  return (
    <section id="home" className="w-full min-h-screen pt-28 pb-10 bg-[#f9f9f9] text-[#1a1a1a] flex items-center justify-center relative overflow-hidden">
      
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-20 text-center relative z-10 w-full">

        {/* 1. LAYER ONE: Background Typography 
            Change: Made color lighter (text-gray-200) so it sits 'behind' you visually.
        */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative z-0 select-none"
        >
          <h1 className="text-7xl sm:text-9xl md:text-[150px] lg:text-[180px] font-extrabold leading-none tracking-tighter uppercase text-gray-200">
            <span className="block text-gray-300 text-[0.5em] tracking-normal mb-[-20px] sm:mb-[-40px]">EXPLORE MY</span>
            <span className="block">PORTFOLIO</span>
          </h1>
        </motion.div>

        {/* 2. LAYER TWO: The Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          
          {/* Main Image with Gradient Mask 
              Change: Added 'maskImage' style to fade the bottom out.
          */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-[300px] h-[400px] md:w-[480px] md:h-[600px] pointer-events-auto mt-10 md:mt-20"
            style={{
              // This creates the fade effect at the bottom
              maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' 
            }}
          >
            <Image
              src="/me.jpeg"
              alt="Omindu's Portrait"
              fill
              priority
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
            />
          </motion.div>

          {/* Left Text - Label 
              Change: Aligned specifically to the left of the image
          */}
          <div className="absolute left-4 md:left-10 lg:left-24 top-1/2 -translate-y-1/2 hidden md:block text-left w-40">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <p className="text-xs font-bold tracking-[0.2em] text-[#1a1a1a]">DESIGNER</p>
                <p className="text-[10px] tracking-widest text-[#666]">EST. 2025</p>
              </div>
              <div className="w-10 h-10 border border-[#1a1a1a]/20 rounded-full flex items-center justify-center">
                <ArrowDown size={16} className="text-[#1a1a1a]" />
              </div>
            </motion.div>
          </div>

          {/* Right Text - Pitch & Skills 
              Change: Changed to text-left (easier to read) and made skills horizontal 'pills'.
          */}
          <div className="absolute right-4 md:right-10 lg:right-24 top-1/2 -translate-y-1/2 hidden md:block text-left w-64">
             <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6"
            >
              <p className="text-sm font-medium text-[#333] leading-relaxed">
                I am passionate about creating dynamic websites that stand out from the crowd.
              </p>
              
              {/* Skills as Pills */}
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-[10px] uppercase tracking-wider font-bold text-[#666] shadow-sm hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}


// --- 2. ABOUT SECTION (වෙනසක් නොමැත) ---
function AboutSection() {
  return (
    <section id="about" className="w-full py-24 px-6 md:px-20 bg-white relative overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="relative">
          <div className="relative h-[500px] w-full bg-[#f9f9f9] overflow-hidden border border-gray-200 shadow-md group">
             <div className="absolute inset-0 flex items-center justify-center text-[#666]/50 font-sans italic">
                <span>Add sketch.jpg to public folder</span>
             </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
          <h2 className="text-sm font-bold tracking-[0.3em] text-[#666] uppercase mb-4">
            About Me
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] mb-8 leading-tight">
            An Artist’s Eye with an <br/>
            <span className="text-[#1a1a1a] opacity-50">Engineer’s Mind.</span>
          </h3>
          <div className="space-y-6 text-[#333] text-lg leading-relaxed font-sans">
            <p>I am a 3rd-year undergraduate at the <strong className="text-[#1a1a1a]">University of Westminster</strong>, blending graphic design discipline with technical expertise.</p>
            <p>My artistic background allows me to see software not just as code, but as refined, user-centered experiences.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- 3. PROJECTS SECTION (වෙනසක් නොමැත) ---
const projects = [
  { id: 1, title: "Virtual Museum", category: "3D / React", description: "Immersive 3D experience exploring ancient artifacts." },
  { id: 2, title: "E-Commerce Dashboard", category: "Next.js / UX", description: "Futuristic dashboard focusing on high accessibility." },
  { id: 3, title: "Heritage Archive", category: "Mobile App", description: "Cataloging historical manuscripts digitally." }
];

function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-32 px-6 md:px-20 bg-[#f9f9f9] relative">
      <div className="max-w-7xl mx-auto mb-20">
        <h2 className="text-sm font-bold tracking-[0.3em] text-[#666] uppercase mb-4">
          Selected Works
        </h2>
        <h3 className="text-4xl md:text-6xl font-extrabold text-[#1a1a1a] leading-tight">
          The <span className="opacity-50">Projects</span>
        </h3>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="group relative bg-white border border-gray-200 hover:border-[#1a1a1a] transition-colors duration-500 shadow-sm"
          >
            <div className="relative h-64 w-full overflow-hidden bg-[#e8e8e8] flex items-center justify-center text-[#666]">
               {project.title} Image Placeholder
            </div>
            <div className="p-8 relative">
              <span className="text-xs font-bold tracking-widest text-[#666] mb-2 block uppercase">
                {project.category}
              </span>
              <h4 className="text-2xl font-bold text-[#1a1a1a] mb-4">
                {project.title}
              </h4>
              <p className="text-[#333] text-sm leading-relaxed mb-6 font-sans">
                {project.description}
              </p>
              <a href="#" className="text-sm font-bold text-[#1a1a1a] hover:text-[#666] transition-colors inline-flex items-center">View Project <ArrowRight size={16} className="ml-1"/></a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// --- 4. SKILLS SECTION (වෙනසක් නොමැත) ---
function SkillsSection() {
  const skills = ["Next.js", "TypeScript", "Tailwind CSS", "Figma", "UX Research", "Motion Design", "React"];
  return (
    <section className="py-20 bg-white overflow-hidden border-t border-b border-gray-100">
      <div className="relative flex overflow-x-hidden group">
        <motion.div
          className="flex space-x-16 whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
        >
          {[...skills, ...skills, ...skills].map((skill, i) => (
            <span key={i} className="text-5xl md:text-7xl font-extrabold text-[#1a1a1a]/5 uppercase opacity-30">
              {skill}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// --- 5. MUSEUM CTA (වෙනසක් නොමැත) ---
function MuseumCTA() {
  return (
    <section className="w-full h-[60vh] relative flex items-center justify-center overflow-hidden bg-[#1a1a1a] text-white">
      <div className="relative z-10 text-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <h2 className="text-white/60 tracking-[0.5em] text-sm uppercase mb-6">Interactive Experience</h2>
          <h3 className="text-5xl md:text-7xl font-extrabold mb-8">
            The <span className="opacity-50">Archive</span>
          </h3>
          <p className="text-white/70 max-w-xl mx-auto mb-10 text-lg font-sans">
            A 3D virtual space showcasing my collections.
          </p>
          <a href="/museum" className="inline-block px-10 py-4 border border-white text-white hover:bg-white hover:text-[#1a1a1a] transition-colors duration-300 rounded-none font-bold tracking-widest">
            STEP INSIDE ➜
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// --- MAIN PAGE ---
export default function Home() {
  return (
    <div className="w-full bg-[#f9f9f9] min-h-screen text-[#1a1a1a] selection:bg-[#333] selection:text-white font-sans">
      <Header />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <MuseumCTA />
      <Footer />
    </div>
  );
}