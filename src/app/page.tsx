"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

// Dynamic import with SSR disabled for Three.js WebGL rendering
const Hero3DCanvas = dynamic(() => import("@/components/Hero3DCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] w-full items-center justify-center text-sm text-gray-500">
      Loading 3D Scene...
    </div>
  ),
});

// Animation Variants for Scroll Reveals
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-blue-500 selection:text-white">
      {/* ========================================================= */}
      {/* 1. HERO SECTION: 3D MODEL & INTRO */}
      {/* ========================================================= */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 overflow-hidden">
        {/* Background Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 z-10">
          {/* Left Text Column */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6 text-center md:text-left"
          >
            <motion.span 
              variants={fadeInUp} 
              className="inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-400 border border-blue-500/20 backdrop-blur-md"
            >
              ✨ Next-Gen AI Career Guidance
            </motion.span>

            <motion.h1 
              variants={fadeInUp} 
              className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight"
            >
              Shape Your Future with <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                EduNav AI Strategist
              </span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp} 
              className="text-lg text-gray-400 max-w-lg"
            >
              Interactive AI-driven career counseling designed to analyze your interests, guide your academic choices, and map out your dream career path.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex gap-4 justify-center md:justify-start">
              <Link href="/chat">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-500 transition-all"
                >
                  Start AI Session 🚀
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right 3D Model Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="cursor-grab active:cursor-grabbing"
          >
            <Hero3DCanvas />
          </motion.div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. REVIEWS SECTION */}
      {/* ========================================================= */}
      <section id="reviews" className="py-24 px-6 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeInUp}
            className="text-center mb-20 space-y-4"
          >
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Student Success Stories</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Hear from students who successfully navigated their complex educational paths with EduNav AI counseling.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
          >
            {/* Review Card 1 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="rounded-2xl border border-gray-800 bg-gray-950 p-8 shadow-xl space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-blue-500">
                  <Image 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200" 
                    alt="Ayesha Khan" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Ayesha Khan</h4>
                  <p className="text-sm text-gray-500">M.B.B.S Aspirant, Karachi</p>
                </div>
                <div className="ml-auto text-amber-400 text-sm">★★★★★</div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                “I was extremely confused about choosing between clinical practice and research. EduNav AI analyzed my interests and grades to create a detailed roadmap that showed me biotechnology could be a better fit than standard M.B.B.S.”
              </p>
              <div className="text-sm text-blue-400 font-medium">Session: Medical Pathway Analysis</div>
            </motion.div>

            {/* Review Card 2 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="rounded-2xl border border-gray-800 bg-gray-950 p-8 shadow-xl space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-purple-500">
                  <Image 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" 
                    alt="Bilal Ahmed" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Bilal Ahmed</h4>
                  <p className="text-sm text-gray-500">Software Engineering Student, Lahore</p>
                </div>
                <div className="ml-auto text-amber-400 text-sm">★★★★★</div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                “The tech world is vast. EduNav AI helped me break down complex specialized paths in AI vs Full-Stack Web Development. I am now confidently pursuing my degree with a concrete skill-building roadmap.”
              </p>
              <div className="text-sm text-purple-400 font-medium">Session: Tech Specialization Roadmap</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. PLATFORM GALLERY WITH WORKING IMAGES */}
      {/* ========================================================= */}
      <section id="gallery" className="py-24 px-6 bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeInUp}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Interactive Platform Experience</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Explore the clean interface students use to shape their future with AI counseling.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {[
              { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800", title: "AI Dashboard" },
              { src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800", title: "Chat Interface" },
              { src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800", title: "Roadmap View" },
            ].map((img, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ scale: 1.03 }}
                className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-lg aspect-[4/3]"
              >
                {/* Standard img tag to easily bypass domain configs */}
                <img 
                  src={img.src} 
                  alt={img.title} 
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent p-6 flex items-end">
                  <h4 className="font-semibold text-white">{img.title}</h4>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. FEATURES SECTION */}
      {/* ========================================================= */}
      <section className="py-24 px-6 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeInUp}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-3xl sm:text-5xl font-bold">Why Choose EduNav AI?</h2>
            <p className="text-gray-400">Powered by advanced language models tailored for students.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { title: "Smart Assessment", desc: "Real-time query handling tailored to medical, tech, or business fields.", icon: "🎯" },
              { title: "Roadmap Creation", desc: "Step-by-step career path insights based on current market trends.", icon: "🗺️" },
              { title: "24/7 Availability", desc: "Get counseling sessions whenever you need guidance.", icon: "⚡" },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="rounded-2xl border border-gray-800 bg-gray-950 p-8 shadow-xl backdrop-blur-sm"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}