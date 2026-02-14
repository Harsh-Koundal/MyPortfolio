import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import { Award, Users, Clock, Target, CheckCircle2, Sparkles, Heart, Code2, Rocket, Zap } from 'lucide-react';

// You'll need to import your tech stack logos
// import reactLogo from '../assets/logos/react.svg';
// import nodeLogo from '../assets/logos/node.svg';
// etc...

// Placeholder tech stack - replace with your actual logo imports
const techStack = [
  { name: 'React', logo: '⚛️', position: 'top' },
  { name: 'Node.js', logo: '🟢', position: 'left' },
  { name: 'MongoDB', logo: '🍃', position: 'right' },
  { name: 'Express', logo: '⚡', position: 'bottom-left' },
  { name: 'JavaScript', logo: '📜', position: 'bottom-right' },
  { name: 'Three.js', logo: '🎨', position: 'center' },
];

const stats = [
  { icon: Award, value: '10+', label: 'Projects Completed', color: 'from-purple-500 to-pink-500' },
  { icon: Users, value: '5+', label: 'Happy Clients', color: 'from-purple-400 to-pink-600' },
  { icon: Clock, value: '4+', label: 'Years Experience', color: 'from-pink-600 to-purple-600' },
  { icon: Target, value: '100%', label: 'On-Time Delivery', color: 'from-pink-500 to-purple-500' },
];

const highlights = [
  { icon: Code2, title: 'Clean Code', description: 'Writing maintainable, scalable code' },
  { icon: Rocket, title: 'Fast Delivery', description: 'Meeting deadlines consistently' },
  { icon: Zap, title: 'Modern Stack', description: 'Using latest technologies' },
  { icon: Heart, title: 'Client Focus', description: 'Your success is my priority' },
];

export default function About() {
  const containerRef = useRef(null);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [hoveredTech, setHoveredTech] = useState(null);
  const reduceMotion = useReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const floatingShapeCount = reduceMotion ? 0 : isMobile ? 0 : 8;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 50, damping: 20, restDelta: 0.001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  const y1 = useTransform(smoothProgress, [0, 1], [100, -100]);

  // Floating shapes for background
  const floatingShapes = useMemo(
    () =>
      Array.from({ length: floatingShapeCount }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 18 + Math.random() * 8,
        size: 26 + Math.random() * 40
      })),
    [floatingShapeCount]
  );

  // Triangle positions for tech stack
  const getTrianglePosition = (position) => {
    const positions = {
      'top': { top: '0%', left: '50%', transform: 'translate(-50%, -50%)' },
      'left': { top: '40%', left: '0%', transform: 'translate(-50%, -50%)' },
      'right': { top: '40%', right: '0%', transform: 'translate(50%, -50%)' },
      'bottom-left': { bottom: '0%', left: '25%', transform: 'translate(-50%, 50%)' },
      'bottom-right': { bottom: '0%', right: '25%', transform: 'translate(50%, 50%)' },
      'center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
    };
    return positions[position];
  };

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative overflow-hidden min-h-screen bg-gradient-to-b from-white via-purple-50/30 to-white py-24"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <motion.div
          className="hidden md:block absolute -top-28 -right-28 w-[380px] h-[380px] bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-2xl"
          style={{ y: y1 }}
          animate={reduceMotion || isMobile ? undefined : {
            scale: [1, 1.08, 1],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="hidden md:block absolute -bottom-24 -left-24 w-[360px] h-[360px] bg-gradient-to-tr from-blue-200/30 to-purple-200/30 rounded-full blur-2xl"
          style={{ y: y1 }}
          animate={reduceMotion || isMobile ? undefined : {
            scale: [1, 1.1, 1],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
            delay: 5
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
            animate={reduceMotion || isMobile ? undefined : {
              y: [0, -30, 0],
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
      <motion.div
        className="container mx-auto px-6 relative z-10"
      >
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ y: 40 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 bg-purple-100 border border-purple-300 rounded-full"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles size={16} className="text-purple-600" />
            <span className="text-purple-700 text-sm font-semibold uppercase tracking-wider">
              Get to Know Me
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              About Me
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Passionate freelance developer crafting exceptional digital experiences
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto mb-20">
          
          {/* Left - Introduction */}
          <motion.div
            className="space-y-8"
            initial={{ x: -40 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {/* Story Card */}
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-xl shadow-purple-500/10 border border-gray-100"
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.15)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-12 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full" />
                <h3 className="text-3xl font-bold text-gray-900">
                  My Story
                </h3>
              </div>

              <div className="space-y-5 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  Hi! I'm <span className="font-semibold text-gray-900">Harsh Koundal</span>, a passionate Full Stack Developer specializing in the MERN stack. I transform ideas into powerful, scalable web applications.
                </p>

                <p>
                  My journey started with curiosity about how the web works, which evolved into a deep passion for creating seamless user experiences. I believe great software is invisible—it just works.
                </p>

                <p>
                  I love tackling complex challenges and turning them into elegant solutions. Whether it's building responsive UIs, designing robust APIs, or optimizing performance, I approach every project with dedication and attention to detail.
                </p>

                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.
                </p>
              </div>
            </motion.div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl p-5 shadow-lg shadow-purple-500/5 border border-gray-100"
                    initial={{ y: 20 }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ y: -5, boxShadow: "0 20px 40px -12px rgba(168, 85, 247, 0.1)" }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-3">
                      <Icon className="text-white" size={20} />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right - Tech Stack Triangle */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <div className="relative w-full max-w-md aspect-square">
              
              {/* Triangle Background */}
              <motion.div
                className="absolute inset-0"
                animate={reduceMotion || isMobile ? undefined : {
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 50,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.1" />
                      <stop offset="50%" stopColor="#ec4899" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="100,20 20,180 180,180"
                    fill="url(#triangleGradient)"
                    stroke="url(#triangleGradient)"
                    strokeWidth="2"
                  />
                </svg>
              </motion.div>

              {/* Tech Stack Icons */}
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  className="absolute"
                  style={getTrianglePosition(tech.position, index)}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 + index * 0.15, duration: 0.5 }}
                  onMouseEnter={() => setHoveredTech(index)}
                  onMouseLeave={() => setHoveredTech(null)}
                >
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Icon Container */}
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-xl shadow-purple-500/20 border-2 border-purple-200 flex items-center justify-center relative overflow-hidden">
                      {/* Gradient overlay on hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 ${hoveredTech === index ? 'opacity-10' : 'opacity-0'}`}
                      />
                      
                      {/* Logo - Replace emoji with actual logo image */}
                      <span className="text-3xl relative z-10">
                        {tech.logo}
                      </span>
                      {/* For actual logos, use:
                      <img src={tech.logo} alt={tech.name} className="w-12 h-12 object-contain" />
                      */}
                    </div>

                    {/* Label */}
                    {hoveredTech === index && (
                      <motion.div
                        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                        initial={{ y: -5 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {tech.name}
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              ))}

              {/* Center pulse effect */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-purple-300"
                animate={reduceMotion || isMobile ? undefined : {
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16"
          initial={{ y: 40 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isHovered = hoveredStat === index;

            return (
              <motion.div
                key={index}
                className="relative group"
                initial={{ y: 30 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <motion.div
                  className="bg-white rounded-2xl p-6 shadow-lg shadow-purple-500/10 border border-gray-100 text-center"
                  whileHover={{
                    y: -10,
                    boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.2)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Icon */}
                  <motion.div
                    className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="text-white" size={24} />
                  </motion.div>

                  {/* Value */}
                  <motion.div
                    className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2"
                    animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {stat.value}
                  </motion.div>

                  {/* Label */}
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center"
          initial={{ y: 30 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 rounded-full"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(168, 85, 247, 0.2)" }}
          >
            <Sparkles size={20} className="text-purple-600" />
            <span className="text-gray-900 font-semibold">
              Constantly learning and evolving with new technologies
            </span>
            <Rocket size={20} className="text-pink-600" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
