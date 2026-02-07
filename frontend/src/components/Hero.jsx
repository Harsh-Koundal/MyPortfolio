import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Sparkles, Code2, Briefcase } from 'lucide-react';
import profileImg from '../assets/Harsh-Koundal.jpeg';


export default function Hero() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const springConfig = { stiffness: 50, damping: 20, restDelta: 0.001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  const yHero = useTransform(smoothProgress, [0, 1], [0, -150]);
  const yPhoto = useTransform(smoothProgress, [0, 1], [0, -80]);
  const opacity = useTransform(smoothProgress, [0, 0.3, 0.7], [1, 0.8, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5], [1, 0.95]);
  const blur = useTransform(smoothProgress, [0, 0.5], [0, 5]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Particles
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 20,
    size: 2 + Math.random() * 4
  }));

  return (
    <section
      ref={containerRef}
      id="home"
      className="min-h-[200vh] relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-black to-black" />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ x: mousePosition.x * 0.5, y: mousePosition.y * 0.5 }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-600/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 5
          }}
          style={{ x: mousePosition.x * -0.3, y: mousePosition.y * -0.3 }}
        />

        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-purple-400/40"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(particle.id) * 20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Main content */}
        <motion.div
          className="relative h-full flex items-center justify-center"
          style={{
            opacity,
            scale,
            filter: blur.get() > 0 ? `blur(${blur.get()}px)` : 'none'
          }}
        >
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">

              {/* Photo Section */}
              <motion.div
                className="relative order-2 lg:order-1"
                style={{ y: yPhoto }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <div className="relative w-full max-w-lg mx-auto">

                  {/* Outer glow rings */}
                  <motion.div
                    className="absolute inset-0 -m-4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 blur-xl" />
                  </motion.div>

                  <motion.div
                    className="absolute inset-0 -m-8"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 blur-2xl" />
                  </motion.div>

                  {/* Photo container */}
                  <motion.div
                    className="relative aspect-square rounded-full overflow-hidden border-4 border-purple-500/30 shadow-2xl shadow-purple-500/50"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                    />

                    {/* Photo placeholder - Replace with your image */}
                    <div className="w-full h-full bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 flex items-center justify-center relative overflow-hidden">
                      {/* Animated background pattern */}
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
                                           radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)`,
                        }}
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, 0],
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                      />
                      <img
                        src={profileImg}
                        alt="Harsh Koundal"
                        className="w-full h-full object-cover"
                      />
                    </div>

                  </motion.div>

                  {/* Floating badges */}
                  <motion.div
                    className="absolute -top-8 -right-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl px-6 py-4 shadow-2xl shadow-purple-500/50 backdrop-blur-sm border border-purple-400/30"
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="text-white" size={20} />
                      <span className="text-white font-bold text-sm whitespace-nowrap">1+ Years</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-8 -left-8 bg-gradient-to-br from-pink-600 to-purple-600 rounded-2xl px-6 py-4 shadow-2xl shadow-pink-500/50 backdrop-blur-sm border border-pink-400/30"
                    animate={{
                      y: [0, 15, 0],
                      rotate: [0, -5, 0]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <div className="flex items-center gap-2">
                      <Briefcase className="text-white" size={20} />
                      <span className="text-white font-bold text-sm whitespace-nowrap">Available</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Text Content */}
              <motion.div
                className="order-1 lg:order-2"
                style={{ y: yHero }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {/* Badge */}
                  <motion.div
                    className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 bg-purple-500/10 border border-purple-500/30 rounded-full backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                    </span>
                    <span className="text-purple-300 text-sm font-medium">Open for Freelance Work</span>
                  </motion.div>

                  {/* Main heading */}
                  <motion.h1
                    className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 leading-[1.1]"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    <span className="text-white block mb-2">Hey, I'm</span>
                    <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent block">
                      Harsh Koundal
                    </span>
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.div
                    className="space-y-4 mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-200">
                      Software Engineer
                    </h2>
                    <p className="text-xl text-purple-300 font-medium">
                      Crafting Digital Experiences
                    </p>
                  </motion.div>

                  {/* Description */}
                  <motion.p
                    className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                    Building production-ready applications with React, Node.js, and MongoDB.
                    Specialized in creating scalable, high-performance solutions that deliver
                    exceptional user experiences.
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    className="flex flex-wrap gap-5 mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                  >
                    <motion.button
                      onClick={scrollToContact}
                      className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-full font-semibold text-lg overflow-hidden shadow-2xl shadow-purple-500/50"
                      whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.5)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10 flex items-center gap-3 text-white">
                        Start a Project
                        <ArrowDown className="group-hover:translate-y-1 transition-transform duration-300" size={20} />
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.button>

                    <motion.a
                      href="#portfolio"
                      className="px-10 py-5 border-2 border-purple-500/50 text-purple-300 rounded-full font-semibold text-lg hover:bg-purple-500/10 transition-all backdrop-blur-sm"
                      whileHover={{
                        scale: 1.05,
                        borderColor: 'rgba(168, 85, 247, 1)',
                        boxShadow: "0 0 30px rgba(168, 85, 247, 0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Portfolio
                    </motion.a>
                  </motion.div>

                  {/* Social Links */}
                  <motion.div
                    className="flex gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  >
                    {[
                      { icon: Github, href: 'https://github.com/Harsh-Koundal', label: 'GitHub' },
                      { icon: Linkedin, href: 'https://www.linkedin.com/in/harsh-koundal-0a7485369/', label: 'LinkedIn' },
                      { icon: Mail, href: '#contact', label: 'Email' },
                    ].map((social, i) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="w-14 h-14 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-200 transition-all backdrop-blur-sm"
                        whileHover={{
                          scale: 1.15,
                          y: -5,
                          boxShadow: "0 10px 30px rgba(168, 85, 247, 0.3)"
                        }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 + i * 0.1 }}
                      >
                        <social.icon size={22} />
                      </motion.a>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity }}
        >
          <div className="w-7 h-12 border-2 border-purple-400/60 rounded-full flex justify-center p-2 backdrop-blur-sm">
            <motion.div
              className="w-1.5 h-3 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full shadow-lg shadow-purple-400/50"
              animate={{
                y: [0, 16, 0],
                opacity: [1, 0.3, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </div>
    </section>
  );
}