import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import { Code2, Database, Layers, Zap, Award, Coffee, Rocket, Sparkles, Terminal, Palette } from 'lucide-react';

const skills = [
  { name: 'React.js', level: 95, icon: Code2, color: 'from-cyan-500 to-blue-600' },
  { name: 'Node.js', level: 90, icon: Zap, color: 'from-green-500 to-emerald-600' },
  { name: 'MongoDB', level: 85, icon: Database, color: 'from-green-600 to-teal-600' },
  { name: 'JavaScript', level: 96, icon: Layers, color: 'from-yellow-500 to-orange-500' },
  { name: 'Express.js', level: 88, icon: Terminal, color: 'from-gray-400 to-slate-600' },
  { name: 'Three.js', level: 80, icon: Palette, color: 'from-pink-500 to-purple-600' },
];

const stats = [
  { icon: Award, value: '50+', label: 'Projects Completed', color: 'from-purple-500 to-pink-500' },
  { icon: Coffee, value: '1000+', label: 'Cups of Coffee', color: 'from-orange-500 to-amber-500' },
  { icon: Rocket, value: '5+', label: 'Years Experience', color: 'from-blue-500 to-cyan-500' },
  { icon: Sparkles, value: '100%', label: 'Client Satisfaction', color: 'from-pink-500 to-rose-500' },
];

export default function About() {
  const containerRef = useRef(null);
  const [hoveredStat, setHoveredStat] = useState(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 50, damping: 20 };
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
      className="relative py-1 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl"
        style={{ y: y1 }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-3xl"
        style={{ y: y2 }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-purple-400/30"
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
          backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)`,
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
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-block mb-4 px-6 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-purple-300 text-sm font-medium">GET TO KNOW ME</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h2>
          
          <motion.div 
            className="w-24 h-1.5 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          />
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isHovered = hoveredStat === index;
            
            return (
              <motion.div
                key={stat.label}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredStat(index)}
                onHoverEnd={() => setHoveredStat(null)}
              >
                <motion.div
                  className="relative bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 text-center overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: 'rgba(168, 85, 247, 0.5)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Glow effect on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                    animate={isHovered ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="text-white" size={28} />
                  </motion.div>

                  {/* Value */}
                  <motion.h3 
                    className="text-3xl md:text-4xl font-bold text-white mb-2"
                    animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                  >
                    {stat.value}
                  </motion.h3>

                  {/* Label */}
                  <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
          
          {/* Left - About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Story Card */}
            <motion.div
              className="relative bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-3xl p-8 overflow-hidden"
              whileHover={{ borderColor: 'rgba(168, 85, 247, 0.4)' }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
              />

              <div className="relative">
                <motion.div
                  className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Sparkles className="text-white" size={32} />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-4">My Journey</h3>
                
                <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                  I'm <span className="text-purple-400 font-semibold">Harsh Koundal</span>, a passionate
                  <span className="text-pink-400 font-semibold"> Full Stack MERN Developer</span> dedicated to 
                  crafting meaningful digital experiences that make an impact.
                </p>

                <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                  My journey in web development started with a simple curiosity about how things work on the web. 
                  That curiosity evolved into a deep passion for creating smooth, intuitive, and high-performing 
                  applications that users love.
                </p>

                <p className="text-lg text-gray-300 leading-relaxed">
                  I specialize in the MERN stack and love experimenting with cutting-edge technologies like 
                  3D graphics, animations, and modern UI/UX patterns. My goal is to build applications that 
                  seamlessly blend powerful functionality with elegant design.
                </p>
              </div>
            </motion.div>

            {/* What I Do Card */}
            <motion.div
              className="relative bg-gradient-to-br from-pink-900/20 to-purple-900/20 backdrop-blur-sm border border-pink-500/20 rounded-3xl p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ borderColor: 'rgba(236, 72, 153, 0.4)' }}
            >
              <motion.div
                className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Rocket className="text-white" size={32} />
              </motion.div>

              <h3 className="text-2xl font-bold text-white mb-4">What I Do</h3>
              
              <div className="space-y-3">
                {[
                  'Build scalable full-stack applications',
                  'Create stunning UI/UX with modern frameworks',
                  'Develop RESTful APIs and microservices',
                  'Implement 3D graphics and animations',
                  'Optimize performance and user experience',
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <motion.div
                      className="min-w-2 w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 mt-2"
                      whileHover={{ scale: 1.5 }}
                    />
                    <p className="text-gray-300">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="relative bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-3xl p-8 overflow-hidden"
              whileHover={{ borderColor: 'rgba(168, 85, 247, 0.4)' }}
            >
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Code2 className="text-purple-400" size={32} />
                Technical Skills
              </h3>

              <div className="space-y-6">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      {/* Skill Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <motion.div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${skill.color} flex items-center justify-center`}
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Icon className="text-white" size={20} />
                          </motion.div>
                          <span className="text-lg font-medium text-gray-200">{skill.name}</span>
                        </div>
                        <span className={`text-lg font-bold bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="h-3 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-gray-700/30">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                        >
                          {/* Shimmer effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity,
                              ease: "linear",
                              repeatDelay: 1
                            }}
                          />

                          {/* Glow effect */}
                          <motion.div
                            className="absolute right-0 top-0 bottom-0 w-8 blur-lg"
                            style={{ 
                              background: `linear-gradient(to right, transparent, rgba(255, 255, 255, 0.5))` 
                            }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom decoration */}
              <motion.div
                className="mt-10 pt-8 border-t border-purple-500/20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5 }}
              >
                <p className="text-gray-400 text-center text-sm">
                  Constantly learning and exploring new technologies
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}