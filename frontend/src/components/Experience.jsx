import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import { Code2, Database, Server, Palette, Sparkles, Globe, Cuboid, Briefcase, Award } from 'lucide-react';

const experiences = [
  {
    year: 'Jan 2024 – Present',
    title: 'Software Development Engineer Intern (SDE-I)',
    company: 'Zenlynx Technology',
    description:
      'Managing and maintaining production-grade frontend and backend repositories, reviewing pull requests, resolving merge conflicts, and deploying stable changes to live VPS servers. Contributing across the stack by building React features, developing REST APIs, and ensuring production stability during deployments and post-release verification.',
    icon: Code2,
    color: 'from-purple-500 to-pink-500',
  },
  {
    year: 'Jul 2023 – Dec 2023',
    title: 'Software Development Engineer Intern (Full Stack)',
    company: 'Printzet',
    description:
      'Developed and maintained backend workflows for a multi-role commerce platform (Admin, Vendor, User). Designed and implemented REST APIs with authentication, validation, and optimized MongoDB queries. Built 20+ reusable React components and improved Lighthouse performance from 60% to 88% through code-splitting, lazy loading, caching, and Tailwind optimization.',
    icon: Server,
    color: 'from-pink-500 to-purple-500',
  },
  {
    year: '2022 – 2023',
    title: 'Full Stack MERN Developer',
    company: 'Freelance',
    description:
      'Built and delivered custom full-stack MERN applications including a wholesale e-commerce platform with bulk purchasing, cart management, order lifecycle handling, and payment integration. Owned backend API development, database schema design, and production deployment on VPS servers. Currently open to freelance and contract-based projects.',
    icon: Palette,
    color: 'from-purple-600 to-pink-600',
  },
];

const technologies = [
  { name: 'React.js', icon: Code2, color: 'from-purple-400 to-pink-600' },
  { name: 'Node.js', icon: Globe, color: 'from-purple-500 to-pink-500' },
  { name: 'MongoDB', icon: Database, color: 'from-pink-500 to-purple-600' },
  { name: 'Express', icon: Server, color: 'from-purple-600 to-pink-600' },
  { name: 'Three.js', icon: Cuboid, color: 'from-pink-600 to-purple-600' },
  { name: 'Tailwind CSS', icon: Sparkles, color: 'from-purple-400 to-purple-600' },
];

export default function Experience() {
  const containerRef = useRef(null);
  const [hoveredTech, setHoveredTech] = useState(null);
  const [hoveredExp, setHoveredExp] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 50, damping: 20, restDelta: 0.001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  const y1 = useTransform(smoothProgress, [0, 1], [120, -120]);
  const y2 = useTransform(smoothProgress, [0, 1], [80, -80]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);

  // Floating particles
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 12 + Math.random() * 18,
    size: 2 + Math.random() * 3
  }));

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative py-20 overflow-hidden min-h-screen"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 right-1/3 w-96 h-96 bg-purple-500/20 rounded-full"
        style={{ 
          y: y1,
          filter: 'blur(80px)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 60, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full"
        style={{ 
          y: y2,
          filter: 'blur(80px)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "linear",
          delay: 4
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-purple-400 opacity-30"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -35, 0],
            x: [0, Math.sin(particle.id) * 18, 0],
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
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Content */}
      <motion.div
        className="container mx-auto px-6 relative z-10"
        style={{ opacity, scale }}
      >
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-purple-500/20 border-2 border-purple-500/30 rounded-full backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Briefcase size={18} className="text-purple-400" />
            <span className="text-purple-300 text-sm uppercase tracking-wider">
              Professional Journey
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Experience & Skills
            </span>
          </motion.h2>

          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-600 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-8xl mx-auto">
          {/* Timeline Section */}
          <div>
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Career Journey
              </h3>
            </motion.div>

            <div className="relative">
              {/* Vertical Timeline Line */}
              <motion.div
                className="absolute left-0 top-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 rounded-full"
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{ bottom: 0 }}
              />

              {experiences.map((exp, index) => {
                const Icon = exp.icon;
                const isHovered = hoveredExp === index;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.6 }}
                    className="relative pl-12 pb-12 last:pb-0"
                    onMouseEnter={() => setHoveredExp(index)}
                    onMouseLeave={() => setHoveredExp(null)}
                  >
                    {/* Timeline Icon */}
                    <motion.div
                      className={`absolute left-0 -translate-x-1/2 w-10 h-10 bg-gradient-to-br ${exp.color} rounded-full flex items-center justify-center border-2 border-purple-400/40`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: index * 0.2 + 0.5, 
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ scale: 1.3, rotate: 360 }}
                      style={{
                        boxShadow: isHovered ? '0 0 25px rgba(168, 85, 247, 0.6)' : '0 4px 15px rgba(168, 85, 247, 0.3)'
                      }}
                    >
                      <Icon size={18} className="text-white" />
                    </motion.div>

                    {/* Experience Card */}
                    <motion.div
                      className="bg-black backdrop-blur-lg border-2 border-purple-500/20 rounded-xl p-6"
                      whileHover={{
                        borderColor: 'rgba(168, 85, 247, 0.4)',
                        scale: 1.02,
                      }}
                      transition={{ duration: 0.3 }}
                      style={{
                        boxShadow: isHovered 
                          ? '0 15px 40px rgba(168, 85, 247, 0.2)' 
                          : '0 5px 20px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      {/* Year Badge */}
                      <motion.div
                        className="inline-block px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-300 mb-3"
                        whileHover={{ scale: 1.05 }}
                      >
                        {exp.year}
                      </motion.div>

                      {/* Title */}
                      <h4 className="text-lg font-bold text-white mb-2">
                        {exp.title}
                      </h4>

                      {/* Company */}
                      <div className="text-pink-400 mb-4 font-medium">
                        {exp.company}
                      </div>

                      {/* Description */}
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Technologies Section */}
          <div>
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text text-transparent">
                Tech Stack
              </h3>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {technologies.map((tech, index) => {
                const Icon = tech.icon;
                const isHovered = hoveredTech === index;

                return (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.1 + 0.4, 
                      duration: 0.5,
                      type: "spring",
                      stiffness: 150
                    }}
                    onMouseEnter={() => setHoveredTech(index)}
                    onMouseLeave={() => setHoveredTech(null)}
                    className="relative group"
                  >
                    <motion.div
                      className="bg-black backdrop-blur-lg border-2 border-purple-500/20 rounded-xl p-6 flex flex-col items-center justify-center aspect-square"
                      whileHover={{
                        scale: 1.1,
                        borderColor: 'rgba(168, 85, 247, 0.5)',
                      }}
                      transition={{ duration: 0.3 }}
                      style={{
                        boxShadow: isHovered 
                          ? '0 15px 40px rgba(168, 85, 247, 0.3)' 
                          : '0 5px 20px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      {/* Icon Container */}
                      <motion.div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tech.color} flex items-center justify-center mb-3`}
                        animate={isHovered ? {
                          rotate: [0, -10, 10, -10, 0],
                        } : {
                          rotateY: [0, 360],
                        }}
                        transition={isHovered ? {
                          duration: 0.5
                        } : {
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        <Icon size={24} className="text-white" />
                      </motion.div>

                      {/* Tech Name */}
                      <span className="text-center text-sm text-gray-300 font-medium">
                        {tech.name}
                      </span>

                      {/* Glow Effect */}
                      {isHovered && (
                        <motion.div
                          className="absolute inset-0 rounded-xl pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          style={{
                            background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
                          }}
                        />
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Achievement Badge */}
            <motion.div
              className="mt-8 p-6 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-purple-900/20 border-2 border-purple-500/30 rounded-xl backdrop-blur-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Award size={24} className="text-white" />
                </motion.div>
                <div>
                  <h4 className="text-white font-bold mb-1">
                    Production-Ready Developer
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Experienced in building and deploying scalable applications
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}