import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import { Briefcase, Award, Sparkles, Calendar, Building2 } from 'lucide-react';

// Import actual tech logos - you'll need to add these images to your assets folder
// Example: import reactLogo from '../assets/tech/react.svg';
// For now, using placeholder URLs - replace with your actual logo imports

const experiences = [
  {
    year: 'Jan 2024 – Present',
    title: 'Software Development Engineer Intern (SDE-I)',
    company: 'Zenlynx Technology',
    description:
      'Managing and maintaining production-grade frontend and backend repositories, reviewing pull requests, resolving merge conflicts, and deploying stable changes to live VPS servers. Contributing across the stack by building React features, developing REST APIs, and ensuring production stability during deployments and post-release verification.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    year: 'Jul 2023 – Dec 2023',
    title: 'Software Development Engineer Intern (Full Stack)',
    company: 'Printzet',
    description:
      'Developed and maintained backend workflows for a multi-role commerce platform (Admin, Vendor, User). Designed and implemented REST APIs with authentication, validation, and optimized MongoDB queries. Built 20+ reusable React components and improved Lighthouse performance from 60% to 88% through code-splitting, lazy loading, caching, and Tailwind optimization.',
    color: 'from-pink-500 to-purple-500',
  },
  {
    year: '2022 – 2023',
    title: 'Full Stack MERN Developer',
    company: 'Freelance',
    description:
      'Built and delivered custom full-stack MERN applications including a wholesale e-commerce platform with bulk purchasing, cart management, order lifecycle handling, and payment integration. Owned backend API development, database schema design, and production deployment on VPS servers. Currently open to freelance and contract-based projects.',
    color: 'from-purple-600 to-pink-600',
  },
];

const technologies = [
  { 
    name: 'React', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    color: 'from-cyan-400 to-blue-500'
  },
  { 
    name: 'Node.js', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    color: 'from-green-500 to-green-600'
  },
  { 
    name: 'TypeScript', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    color: 'from-blue-500 to-blue-600'
  },
  { 
    name: 'JavaScript', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    color: 'from-yellow-400 to-yellow-500'
  },
  { 
    name: 'MongoDB', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    color: 'from-green-500 to-green-700'
  },
  { 
    name: 'Express', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    color: 'from-gray-600 to-gray-700'
  },
  { 
    name: 'Docker', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    color: 'from-blue-400 to-blue-600'
  },
  { 
    name: 'Git', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    color: 'from-orange-500 to-red-500'
  },
  { 
    name: 'Linux', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    color: 'from-yellow-400 to-black'
  },
  { 
    name: 'Tailwind CSS', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    color: 'from-cyan-400 to-blue-500'
  },
  { 
    name: 'Three.js', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg',
    color: 'from-gray-700 to-black'
  },
  { 
    name: 'PostgreSQL', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    color: 'from-blue-600 to-blue-700'
  },
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

  const y1 = useTransform(smoothProgress, [0, 1], [100, -100]);

  // Floating shapes for background
  const floatingShapes = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 15 + Math.random() * 10,
    size: 40 + Math.random() * 60
  }));

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative py-24 overflow-hidden min-h-screen"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"
          style={{ y: y1 }}
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
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"
          style={{ y: y1 }}
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
              y: [0, -35, 0],
              x: [0, Math.sin(shape.id) * 18, 0],
              rotate: [0, 180, 360],
              opacity: [0.03, 0.08, 0.03],
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
              <div className="w-full h-full bg-gradient-to-br from-purple-200/50 to-pink-200/50 rounded-full" />
            )}
          </motion.div>
        ))}

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <motion.div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 bg-purple-100 border border-purple-300 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Briefcase size={16} className="text-purple-600" />
            <span className="text-purple-700 text-sm font-semibold uppercase tracking-wider">
              Professional Journey
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Experience & Skills
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            My professional journey and technical expertise
          </motion.p>

          <motion.div
            className="w-24 h-1.5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 mx-auto rounded-full mt-8"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto mb-20">
          
          {/* Timeline Section */}
          <div>
            <motion.div
              className="flex items-center gap-3 mb-10"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-1.5 h-12 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full" />
              <h3 className="text-3xl font-bold text-gray-900">
                Career Journey
              </h3>
            </motion.div>

            <div className="relative">
              {/* Vertical Timeline Line */}
              <motion.div
                className="absolute left-0 top-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 rounded-full"
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />

              {experiences.map((exp, index) => {
                const isHovered = hoveredExp === index;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.6 }}
                    className="relative pl-14 pb-12 last:pb-0"
                    onMouseEnter={() => setHoveredExp(index)}
                    onMouseLeave={() => setHoveredExp(null)}
                  >
                    {/* Timeline Dot */}
                    <motion.div
                      className={`absolute left-0 -translate-x-1/2 w-12 h-12 bg-gradient-to-br ${exp.color} rounded-full flex items-center justify-center border-4 border-white shadow-lg`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: index * 0.2 + 0.5, 
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      style={{
                        boxShadow: isHovered 
                          ? '0 0 30px rgba(168, 85, 247, 0.5)' 
                          : '0 4px 15px rgba(168, 85, 247, 0.2)'
                      }}
                    >
                      <Briefcase size={20} className="text-white" />
                    </motion.div>

                    {/* Experience Card */}
                    <motion.div
                      className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200 border border-gray-100"
                      whileHover={{
                        y: -5,
                        boxShadow: '0 20px 40px -12px rgba(168, 85, 247, 0.15)'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Year Badge */}
                      <motion.div
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-full text-xs font-semibold text-purple-700 mb-4"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Calendar size={12} />
                        {exp.year}
                      </motion.div>

                      {/* Title */}
                      <h4 className="text-lg font-bold text-gray-900 mb-2">
                        {exp.title}
                      </h4>

                      {/* Company */}
                      <div className="flex items-center gap-2 text-pink-600 mb-4 font-semibold">
                        <Building2 size={16} />
                        {exp.company}
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed">
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
              className="flex items-center gap-3 mb-10"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-1.5 h-12 bg-gradient-to-b from-pink-600 to-purple-600 rounded-full" />
              <h3 className="text-3xl font-bold text-gray-900">
                Tech Stack
              </h3>
            </motion.div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-8">
              {technologies.map((tech, index) => {
                const isHovered = hoveredTech === index;

                return (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.05 + 0.4, 
                      duration: 0.4,
                      type: "spring",
                      stiffness: 150
                    }}
                    onMouseEnter={() => setHoveredTech(index)}
                    onMouseLeave={() => setHoveredTech(null)}
                    className="relative group"
                  >
                    <motion.div
                      className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center aspect-square shadow-lg shadow-gray-200 border border-gray-100 relative overflow-hidden"
                      whileHover={{
                        y: -8,
                        boxShadow: '0 20px 40px -12px rgba(168, 85, 247, 0.2)'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Gradient overlay on hover */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0`}
                        animate={isHovered ? { opacity: 0.05 } : { opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Logo */}
                      <motion.div
                        className="relative z-10 w-12 h-12 mb-2 flex items-center justify-center"
                        animate={isHovered ? {
                          rotate: [0, -10, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <img 
                          src={tech.logo} 
                          alt={tech.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </motion.div>

                      {/* Tech Name */}
                      <span className="relative z-10 text-center text-xs font-semibold text-gray-700 leading-tight">
                        {tech.name}
                      </span>

                      {/* Border glow on hover */}
                      {isHovered && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          style={{
                            boxShadow: `inset 0 0 20px rgba(168, 85, 247, 0.2)`,
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
              className="p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 border-2 border-purple-200 rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              whileHover={{ y: -5, boxShadow: '0 20px 40px -12px rgba(168, 85, 247, 0.2)' }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/30"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Award size={28} className="text-white" />
                </motion.div>
                <div>
                  <h4 className="text-gray-900 font-bold text-lg mb-1">
                    Production-Ready Developer
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Experienced in building and deploying scalable applications
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 rounded-full"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 10px 30px rgba(168, 85, 247, 0.2)'
            }}
          >
            <Sparkles size={20} className="text-purple-600" />
            <span className="text-gray-900 font-semibold">
              Ready to contribute to innovative projects and teams
            </span>
            <Award size={18} className="text-pink-600" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}