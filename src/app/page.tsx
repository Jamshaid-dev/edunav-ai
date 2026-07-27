"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

// Dynamic 3D Canvas
const Hero3DCanvas = dynamic(() => import("@/components/Hero3DCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm font-medium text-slate-500">
      Loading 3D Interactive AI Core...
    </div>
  ),
});

// Reviews Data
const reviews = [
  {
    name: "Ayesha Khan",
    role: "M.B.B.S Aspirant, Karachi",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
    review: "I was confused between clinical practice and research. EduNav AI analyzed my interests and provided a clear step-by-step pathway.",
    session: "Medical Pathway Analysis",
    border: "border-sky-500",
  },
  {
    name: "Bilal Ahmed",
    role: "Software Engineering Student, Lahore",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    review: "EduNav AI helped me break down complex specialized paths in AI vs Full-Stack Web Development smoothly.",
    session: "Tech Specialization Roadmap",
    border: "border-blue-500",
  },
  {
    name: "Zainab Malik",
    role: "Business Analytics Student, Islamabad",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
    review: "The degree counseling gave me complete clarity regarding global market demand for business intelligence skills.",
    session: "Business Strategy Pathway",
    border: "border-indigo-500",
  },
  {
    name: "Hamza Tariq",
    role: "Computer Science Student, Faisalabad",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
    review: "The AI chatbot answered all my queries regarding Cloud Computing certifications versus Data Science paths instantly!",
    session: "Tech Certifications Guide",
    border: "border-slate-500",
  },
];

const infiniteReviews = [...reviews, ...reviews];

// 6 Platform Gallery Images
const platformGallery = [
  {
    title: "AI Chat Counseling Dashboard",
    category: "Real-time AI Guidance",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800",
  },
  {
    title: "Personalized Career Roadmap",
    category: "Step-by-step Milestones",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800",
  },
  {
    title: "Skill Gap & Analytics Matrix",
    category: "Data Evaluation",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
  },
  {
    title: "University Major Matcher",
    category: "Academic Planning",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800",
  },
  {
    title: "Interactive Smart Workspace",
    category: "Conversational Flow",
    img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800",
  },
  {
    title: "Global Industry Standards",
    category: "Market Insights",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
  },
];

const services = [
  {
    title: "AI Career Counseling",
    desc: "Interactive multi-turn conversations analyzing your strengths, academic background, and interests.",
    icon: "🤖",
  },
  {
    title: "Personalized Roadmaps",
    desc: "Custom step-by-step career path guides generated specifically for Software, Medical, or Business domains.",
    icon: "🗺️",
  },
  {
    title: "Skill Gap Analysis",
    desc: "Real-time evaluation comparing your current knowledge against actual industry expectations.",
    icon: "📊",
  },
  {
    title: "Degree & Field Selection",
    desc: "Data-driven recommendations to select university majors with the highest market potential.",
    icon: "🎓",
  },
];

// Motion Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

export default function HomePage() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track global page scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Dynamic transforms: Smooth scale & full visibility
  const modelScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.85, 0.75]);
  const modelYPosition = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-sky-500 selection:text-white overflow-x-hidden">
      
      {/* ========================================================= */}
      {/* STICKY BACKGROUND 3D CANVAS LAYER */}
      {/* ========================================================= */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ 
            scale: modelScale, 
            y: modelYPosition
          }}
          className="w-full max-w-2xl h-[550px] flex items-center justify-center"
        >
          <Hero3DCanvas scrollYProgress={scrollYProgress} />
        </motion.div>
      </div>

      {/* ========================================================= */}
      {/* CONTENT LAYERS (White Theme with Glassmorphic Transparencies) */}
      {/* ========================================================= */}
      <div className="relative z-10">

        {/* 1. HERO SECTION */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-slate-800 border border-slate-200 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-sky-500 animate-ping" />
              Next-Gen Conversational AI Counselor
            </span>
          </motion.div>

          <div className="h-[240px] sm:h-[280px] w-full" /> {/* Visual gap for 3D Core */}

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="container mx-auto max-w-4xl text-center space-y-6"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-slate-900 drop-shadow-sm"
            >
              Shape Your Career Future with <br />
              <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                EduNav AI Strategist
              </span>
            </motion.h1>

            {/* High-Contrast Readability Badge for Subtext */}
            <motion.div variants={fadeInUp} className="max-w-2xl mx-auto">
              <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-sm">
                Interactive AI-driven counseling designed to analyze your interests, evaluate your skills, and craft a personalized roadmap for your professional success.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="pt-2 flex flex-wrap gap-4 justify-center items-center">
              <Link href="/chat">
                <button className="rounded-xl bg-slate-900 px-8 py-4 text-sm font-semibold text-white shadow-xl hover:bg-slate-800 hover:scale-105 transition-all">
                  Start AI Counseling Session 🚀
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* 2. INFORMATION & DATA SECTION */}
        <section className="py-24 px-6 bg-white/60 backdrop-blur-xs border-y border-slate-200/80">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="text-center mb-16 space-y-3"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Data-Driven Career Intelligence</h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-medium">
                How EduNav AI utilizes structured data to give you unmatched academic clarity.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            >
              {[
                { stat: "98%", title: "Accurate Alignment", desc: "Matches student skills with appropriate university majors effectively.", color: "text-sky-600" },
                { stat: "24/7", title: "Instant Access", desc: "Always-available conversational chatbot assistant for student guidance.", color: "text-blue-600" },
                { stat: "100+", title: "Field Insights", desc: "Deep knowledge base across Software, Medical, Business, and Engineering.", color: "text-indigo-600" }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ y: -6 }}
                  className="p-8 rounded-2xl bg-white/80 border border-slate-200/80 backdrop-blur-md shadow-md transition-all space-y-3"
                >
                  <div className={`text-4xl font-black ${item.color}`}>{item.stat}</div>
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 3. SERVICES SECTION */}
        <section className="py-24 px-6 bg-slate-100/50 backdrop-blur-xs border-b border-slate-200/80">
          <div className="container mx-auto max-w-6xl">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="text-center mb-16 space-y-3"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Our Smart Services</h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-medium">
                Comprehensive tools designed to guide you from decision to achievement.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {services.map((service, idx) => (
                <motion.div 
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  className="p-6 rounded-2xl bg-white/85 border border-slate-200/80 backdrop-blur-md shadow-sm hover:border-sky-500 hover:shadow-lg transition-all space-y-3"
                >
                  <div className="text-3xl">{service.icon}</div>
                  <h3 className="font-bold text-slate-900 text-lg">{service.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{service.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 4. PLATFORM GALLERY: 6 PICTURES */}
        <section className="py-24 px-6 bg-white/60 backdrop-blur-xs border-b border-slate-200/80">
          <div className="container mx-auto max-w-6xl">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="text-center mb-16 space-y-3"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">EduNav AI Interface & Features</h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-medium">
                Explore the interactive features, intelligent analytics, and user roadmaps.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {platformGallery.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.03 }}
                  className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 aspect-[4/3] group shadow-sm hover:shadow-xl transition-all"
                >
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent p-6 flex flex-col justify-end">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-400 mb-1">{item.category}</span>
                    <h4 className="font-bold text-white text-base leading-snug">{item.title}</h4>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 5. DYNAMIC AUTO-SCROLLING REVIEWS */}
        <section className="py-24 px-6 bg-slate-100/50 backdrop-blur-xs border-b border-slate-200/80">
          <div className="container mx-auto max-w-5xl mb-14 text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Student Reviews</h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-medium">
              Hover cursor over cards to pause or scroll through continuous feedback.
            </p>
          </div>

          <div 
            className="relative w-full overflow-hidden flex items-center py-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-100 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-100 to-transparent z-10 pointer-events-none" />

            <motion.div
              className="flex gap-6 w-max cursor-pointer"
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: isHovered ? 60 : 20,
                  ease: "linear",
                },
              }}
            >
              {infiniteReviews.map((item, idx) => (
                <div
                  key={idx}
                  className={`w-[320px] sm:w-[380px] shrink-0 rounded-2xl border ${item.border} bg-white/90 backdrop-blur-md p-6 shadow-sm hover:shadow-md transition-shadow space-y-4`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-11 w-11 overflow-hidden rounded-full border border-slate-200">
                      <Image src={item.img} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                      <p className="text-[11px] text-slate-500">{item.role}</p>
                    </div>
                  </div>
                  <p className="text-slate-700 text-xs leading-relaxed font-medium">“{item.review}”</p>
                  <div className="text-[11px] font-semibold text-sky-600">{item.session}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 6. FOOTER & CONTACT DETAILS */}
        <footer className="bg-slate-900 text-slate-300 py-16 px-6 relative z-20">
          <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10">
            
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">EduNav AI</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                An intelligent Web-based Career Counseling System designed to assist students with AI guidance and personalized roadmaps.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h4>
              <ul className="text-xs space-y-2 text-slate-400">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li><Link href="/chat" className="hover:text-white transition">AI Counselor Chat</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Contact Information</h4>
              <ul className="text-xs space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <span>📧 Email:</span>
                  <a href="mailto:ajamshaid488@gmail.com" className="text-sky-400 hover:underline">ajamshaid488@gmail.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <span>📞 Phone / WhatsApp:</span>
                  <a href="tel:03493494043" className="text-sky-400 hover:underline">03493494043</a>
                </li>
              </ul>
            </div>

          </div>

          <div className="container mx-auto max-w-6xl mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} EduNav AI. All rights reserved.
          </div>
        </footer>

      </div>
    </div>
  );
}