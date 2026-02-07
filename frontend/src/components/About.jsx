import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import { Code2, Database, Layers, Zap, Award, Coffee, Rocket, Sparkles, Terminal, Palette, CheckCircle2 } from 'lucide-react';

const skills = [
  { name: 'React.js', level: 95, icon: Code2, color: 'from-purple-400 to-pink-600' },
  { name: 'Node.js', level: 90, icon: Zap, color: 'from-purple-500 to-pink-500' },
  { name: 'MongoDB', level: 85, icon: Database, color: 'from-pink-500 to-purple-600' },
  { name: 'JavaScript', level: 96, icon: Layers, color: 'from-purple-600 to-pink-600' },
  { name: 'Express.js', level: 88, icon: Terminal, color: 'from-purple-400 to-purple-600' },
  { name: 'Three.js', level: 80, icon: Palette, color: 'from-pink-500 to-purple-600' },
];

const stats = [
  { icon: Award, value: '50+', label: 'Projects Completed', color: 'from-purple-500 to-pink-500' },
  { icon: Coffee, value: '1000+', label: 'Cups of Coffee', color: 'from-purple-400 to-pink-600' },
  { icon: Rocket, value: '1+', label: 'Years Experience', color: 'from-pink-600 to-purple-600' },
  { icon: Sparkles, value: '100%', label: 'Client Satisfaction', color: 'from-pink-500 to-purple-500' },
];

export default function About() {
  const containerRef = useRef(null);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 50, damping: 20, restDelta: 0.001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  const y1 = useTransform(smoothProgress, [0, 1], [150, -150]);
  const y2 = useTransform(smoothProgress, [0, 1], [100, -100]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.85]);

  // Floating particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 20,
    size: 2 + Math.random() * 3
  }));

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative overflow-hidden min-h-screen"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full"
        style={{ 
          y: y1,
          filter: 'blur(80px)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full"
        style={{ 
          y: y2,
          filter: 'blur(80px)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          delay: 5
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
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Content */}
      <motion.div
        className="mx-auto px-6 relative z-10"
        style={{ opacity, scale }}
      >
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 bg-purple-500/10 border border-purple-500/30 rounded-full backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles size={16} className="text-purple-400" />
            <span className="text-purple-300 text-sm font-medium uppercase tracking-wider">
              Get to Know Me
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              About Me
            </span>
          </motion.h2>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16 max-w-8xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isHovered = hoveredStat === index;

            return (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
              >

                <motion.div
                  className="relative bg-black backdrop-blur-lg border-2 border-purple-500/20 rounded-xl p-6 h-full"
                  whileHover={{
                    scale: 1.05,
                    borderColor: 'rgba(168, 85, 247, 0.5)',
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    boxShadow: isHovered ? '0 20px 40px rgba(168, 85, 247, 0.2)' : '0 0 0 rgba(0,0,0,0)'
                  }}
                >
                  {/* Icon */}
                  <motion.div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="text-white" size={20} />
                  </motion.div>

                  {/* Value */}
                  <motion.div
                    className="text-4xl font-bold mb-2 text-white"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.value}
                  </motion.div>

                  {/* Label */}
                  <div className="text-gray-400 text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-8xl mx-auto">
          {/* Left - About Text */}
          <div className="space-y-6">
            {/* Story Card */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.div
                className="relative bg-black backdrop-blur-lg border-2 border-purple-500/30 rounded-xl p-8"
                whileHover={{
                  borderColor: 'rgba(168, 85, 247, 0.4)',
                }}
                transition={{ duration: 0.3 }}
                style={{
                  boxShadow: '0 10px 30px rgba(168, 85, 247, 0.1)'
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    My Journey
                  </h3>
                </div>

                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p className="text-lg">
                    I'm <span className="text-white">Harsh Koundal</span>, a passionate Full Stack MERN Developer dedicated to crafting meaningful digital experiences that make an impact.
                  </p>

                  <p>
                    My journey in web development started with a simple curiosity about how things work on the web. That curiosity evolved into a deep passion for creating smooth, intuitive, and high-performing applications that users love.
                  </p>

                  <p>
                    I specialize in the MERN stack and love experimenting with cutting-edge technologies like 3D graphics, animations, and modern UI/UX patterns. My goal is to build applications that seamlessly blend powerful functionality with elegant design.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* What I Do Card */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.div
                className="relative bg-black backdrop-blur-lg border-2 border-purple-500/30 rounded-xl p-8"
                whileHover={{
                  borderColor: 'rgba(168, 85, 247, 0.4)',
                }}
                transition={{ duration: 0.3 }}
                style={{
                  boxShadow: '0 10px 30px rgba(168, 85, 247, 0.1)'
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full" />
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text text-transparent">
                    What I Do
                  </h3>
                </div>

                <div className="space-y-4">
                  {[
                    'Build scalable full-stack applications',
                    'Create stunning UI/UX with modern frameworks',
                    'Develop RESTful APIs and microservices',
                    'Implement 3D graphics and animations',
                    'Optimize performance and user experience',
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-4 group/item"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                      whileHover={{ x: 10 }}
                    >
                      <motion.div
                        className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                      >
                        <CheckCircle2 size={14} className="text-white" />
                      </motion.div>
                      <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right - Skills */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  Technical Skills
                </h3>
              </div>

              <div className="space-y-4">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  const isHovered = hoveredSkill === index;

                  return (
                    <motion.div
                      key={index}
                      className="relative group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                      onMouseEnter={() => setHoveredSkill(index)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <motion.div
                        className="relative bg-black backdrop-blur-lg border-2 border-purple-500/20 rounded-xl p-4"
                        whileHover={{
                          borderColor: 'rgba(168, 85, 247, 0.4)',
                          scale: 1.02
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                          boxShadow: isHovered ? '0 10px 40px rgba(168, 85, 247, 0.15)' : '0 0 0 rgba(0,0,0,0)'
                        }}
                      >
                        {/* Skill Header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <motion.div
                              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${skill.color} flex items-center justify-center`}
                              whileHover={{ rotate: [0, -15, 15, 0] }}
                              transition={{ duration: 0.5 }}
                            >
                              <Icon size={18} className="text-white" />
                            </motion.div>
                            <span className="text-white text-lg">
                              {skill.name}
                            </span>
                          </div>
                          <motion.span
                            className="text-purple-300 text-lg"
                            animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 0.5 }}
                          >
                            {skill.level}%
                          </motion.span>
                        </div>

                        {/* Progress Bar */}
                        <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden border border-purple-500/20">
                          {/* Progress fill */}
                          <motion.div
                            className={`absolute inset-y-0 left-0 bg-gradient-to-r ${skill.color} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: 1 + index * 0.1, duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom decoration */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-8 py-4 bg-purple-900/20 border-2 border-purple-500/30 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(168, 85, 247, 0.2)',
                '0 0 40px rgba(168, 85, 247, 0.3)',
                '0 0 20px rgba(168, 85, 247, 0.2)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Terminal size={20} className="text-purple-400" />
            <span className="text-purple-300">
              Constantly learning and exploring new technologies
            </span>
            <Sparkles size={20} className="text-pink-400" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}