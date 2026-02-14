import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Star, Award, Coffee, CheckCircle2, Sparkles } from 'lucide-react';
import profileImg from '../assets/Harsh-Koundal.jpeg';

export default function Hero() {
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const floatingShapeCount = reduceMotion ? 0 : isMobile ? 0 : 8;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const springConfig = { stiffness: 50, damping: 20, restDelta: 0.001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  const yHero = useTransform(smoothProgress, [0, 1], [0, -100]);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Floating elements
  const floatingShapes = useMemo(
    () =>
      Array.from({ length: floatingShapeCount }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 20 + Math.random() * 8,
        size: 24 + Math.random() * 40,
      })),
    [floatingShapeCount]
  );

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient orbs */}
          <motion.div
            className="hidden md:block absolute -top-28 -right-28 w-[420px] h-[420px] bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-25 blur-2xl"
            animate={reduceMotion || isMobile ? undefined : {
              scale: [1, 1.08, 1],
              x: [0, 20, 0],
              y: [0, 12, 0],
            }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ willChange: 'transform' }}
          />
          <motion.div
            className="hidden md:block absolute -bottom-24 -left-24 w-[380px] h-[380px] bg-gradient-to-tr from-blue-100 to-purple-100 rounded-full opacity-25 blur-2xl"
            animate={reduceMotion || isMobile ? undefined : {
              scale: [1, 1.1, 1],
              x: [0, -18, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear",
              delay: 5
            }}
            style={{ willChange: 'transform' }}
          />

          {/* Floating geometric shapes */}
          {floatingShapes.map((shape) => (
            <motion.div
              key={shape.id}
              className="absolute"
              style={{
                left: `${shape.left}%`,
                top: `${shape.top}%`,
                width: shape.size,
                height: shape.size,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.sin(shape.id) * 10, 0],
              }}
              transition={{
                duration: shape.duration,
                delay: shape.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {shape.id % 3 === 0 ? (
                <div className="w-full h-full border-2 border-purple-300 rounded-lg rotate-45" />
              ) : shape.id % 3 === 1 ? (
                <div className="w-full h-full border-2 border-pink-300 rounded-full" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200 rounded-full" />
              )}
            </motion.div>
          ))}

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.2) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(139, 92, 246, 0.2) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* Main Content */}
        <motion.div
          className="relative h-full flex items-center"
        >
          <div className="container mx-auto px-6 py-20 relative z-10">
            <div className="max-w-7xl mx-auto">
              
              {/* Top Status Bar */}
              <motion.div
                className="flex flex-wrap items-center justify-between gap-4 mb-16"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-sm font-semibold text-green-700">Available for Projects</span>
                </motion.div>

                <div className="flex gap-3">
                  {[
                    { icon: Github, href: 'https://github.com/Harsh-Koundal', label: 'GitHub' },
                    { icon: Linkedin, href: 'https://www.linkedin.com/in/harsh-koundal-0a7485369/', label: 'LinkedIn' },
                    { icon: Mail, href: '#contact', label: 'Email' },
                  ].map((social, i) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-purple-100 hover:text-purple-600 transition-all"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ y: -10 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Main Grid */}
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                
                {/* Text Content - Left Side */}
                <motion.div
                  className="lg:col-span-7"
                  style={{ y: yHero }}
                >
                  <motion.div
                    initial={{ y: 30 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {/* Small intro badge */}
                    <motion.div
                      className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-purple-600"
                      initial={{ x: -20 }}
                      animate={{ x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Sparkles size={18} className="text-purple-500" />
                      <span>Freelance Software Engineer</span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                      className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]"
                      initial={{ y: 30 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                    >
                      <span className="text-gray-900 block mb-2">Hi, I'm</span>
                      <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent block">
                        Harsh Koundal
                      </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                      className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6"
                      initial={{ y: 30 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    >
                      I craft exceptional digital experiences
                    </motion.p>

                    {/* Description */}
                    <motion.p
                      className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed"
                      initial={{ y: 30 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                    >
                      Specializing in React, Node.js, and MongoDB. I build scalable, 
                      production-ready applications that combine beautiful design with 
                      powerful functionality.
                    </motion.p>

                    {/* Feature Pills */}
                    <motion.div
                      className="flex flex-wrap gap-3 mb-10"
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 1, duration: 0.6 }}
                    >
                      {[
                        { icon: CheckCircle2, text: 'Full Stack Development' },
                        { icon: Award, text: '4+ Years Experience' },
                        { icon: Coffee, text: 'Remote Friendly' }
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-full"
                          whileHover={{ scale: 1.05, borderColor: 'rgb(168, 85, 247)' }}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1 + i * 0.1 }}
                        >
                          <item.icon size={16} className="text-purple-600" />
                          <span className="text-sm font-medium text-gray-700">{item.text}</span>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                      className="flex flex-wrap gap-4"
                      initial={{ y: 30 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 1.2, duration: 0.8 }}
                    >
                      <motion.button
                        onClick={scrollToContact}
                        className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg overflow-hidden shadow-lg shadow-purple-500/30"
                        whileHover={{ 
                          scale: 1.05, 
                          boxShadow: "0 20px 40px -12px rgba(168, 85, 247, 0.4)" 
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          Let's Work Together
                          <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.button>

                      <motion.a
                        href="#portfolio"
                        className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold text-lg hover:border-purple-600 hover:text-purple-600 hover:bg-purple-50 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View My Work
                      </motion.a>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Photo Section - Right Side */}
                <motion.div
                  className="lg:col-span-5"
                  initial={{ scale: 0.8, x: 50 }}
                  animate={{ scale: 1, x: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                >
                  <div className="relative">
                    
                    {/* Main Photo Container */}
                    <motion.div
                      className="relative z-10"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Decorative border shape */}
                      <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-[3rem] blur-2xl opacity-30" />
                      
                      <div className="relative aspect-square rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl shadow-purple-500/20">
                        {/* Photo */}
                        <img
                          src={profileImg}
                          alt="Harsh Koundal"
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent" />
                      </div>
                    </motion.div>

                    {/* Floating Stats Cards */}
                    <motion.div
              className="absolute -top-6 -right-6 bg-white rounded-2xl px-6 py-4 shadow-xl shadow-purple-500/20 border border-purple-100"
              animate={reduceMotion || isMobile ? undefined : {
                y: [0, -10, 0],
                rotate: [0, 3, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                          <Star className="text-white" size={24} fill="white" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">5.0</div>
                          <div className="text-xs text-gray-600">Client Rating</div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl px-6 py-4 shadow-xl shadow-purple-500/20 border border-purple-100"
              animate={reduceMotion || isMobile ? undefined : {
                y: [0, 10, 0],
                rotate: [0, -3, 0]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                          <Award className="text-white" size={24} />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">10+</div>
                          <div className="text-xs text-gray-600">Projects Done</div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Decorative dots */}
                    <motion.div
                      className="absolute top-1/4 -left-8 w-4 h-4 bg-purple-400 rounded-full"
                      animate={reduceMotion || isMobile ? undefined : {
                        scale: [1, 1.5, 1],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute bottom-1/4 -right-4 w-6 h-6 bg-pink-400 rounded-full"
                      animate={reduceMotion || isMobile ? undefined : {
                        scale: [1, 1.5, 1],
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                    />
                  </div>
                </motion.div>
              </div>

              {/* Bottom Stats Bar */}
              {/* <motion.div
                className="mt-20 pt-12 border-t border-gray-200"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  {[
                    { number: '10+', label: 'Projects Completed' },
                    { number: '5+', label: 'Happy Clients' },
                    { number: '4+', label: 'Years Experience' },
                    { number: '24/7', label: 'Support Available' }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 1.5 + i * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div> */}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


