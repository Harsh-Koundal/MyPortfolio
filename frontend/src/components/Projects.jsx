import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import { Github, ExternalLink, Sparkles, Code2 } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "StudyVault",
    description:
      "A smart learning platform where users can upload, organize, and share educational materials securely. Includes real-time document previews, category filters, and user profiles.",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS", "Three.js"],
    github: "https://github.com/Harsh-Koundal/studyvault",
    demo: "https://studyvault-2.onrender.com/",
    featured: true,
  },
  {
    id: 2,
    title: "NerathiX Digital Agency",
    description:
      "A modern website for a digital agency showcasing services, portfolio, team members, and client testimonials with smooth animations and responsive design.",
    image:
      "https://images.unsplash.com/photo-1629904853716-f0bc54eea481?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
    tech: ["React", "Node.js", "Tailwind CSS", "MongoDB", "Express", "Three.js"],
    github: "https://github.com/Harsh-Koundal",
    demo: "https://nerathix.onrender.com/",
    featured: true,
  },
  {
    id: 3,
    title: "Voting System",
    description:
      "A secure online voting platform allowing users to cast votes, view live results, and prevent duplicate submissions using authentication and database validation.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tech: ["React", "Node.js", "Tailwind CSS", "MongoDB", "Express"],
    github: "https://github.com/Harsh-Koundal/voting-system",
    demo: "#",
    featured: false,
  },
  {
    id: 4,
    title: "Recipe Finder",
    description:
      "A web app that helps users discover recipes based on ingredients they have. Includes API integration, filtering by cuisine, and responsive card-based design.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tech: ["React", "API Integration", "CSS3", "JavaScript"],
    github: "https://github.com/Harsh-Koundal/-Recipe-App",
    demo: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Expense Tracker",
    description:
      "A smart budgeting tool that tracks daily expenses, visualizes spending trends, and helps manage finances efficiently with local storage support.",
    image:
      "https://images.unsplash.com/photo-1560221328-12fe60f83ab8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1174",
    tech: ["React", "Chart.js", "Local Storage", "CSS Modules"],
    github: "https://github.com/Harsh-Koundal/-Expense-Tracker",
    demo: "#",
    featured: false,
  },
];

export default function Projects() {
  const containerRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 50, damping: 20, restDelta: 0.001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  const y1 = useTransform(smoothProgress, [0, 1], [100, -100]);
  const y2 = useTransform(smoothProgress, [0, 1], [150, -150]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);

  // Floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 15 + Math.random() * 20,
    size: 2 + Math.random() * 3
  }));

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative py-20 overflow-hidden min-h-screen"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full"
        style={{ 
          y: y1,
          filter: 'blur(80px)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full"
        style={{ 
          y: y2,
          filter: 'blur(80px)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
          delay: 3
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
            y: [0, -40, 0],
            x: [0, Math.sin(particle.id) * 15, 0],
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
            <Code2 size={18} className="text-purple-400" />
            <span className="text-purple-300 text-sm uppercase tracking-wider">
              My Work
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
              Featured Projects
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

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-8xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative"
            >
              {/* Featured Badge */}
              {project.featured && (
                <motion.div
                  className="absolute -top-3 -right-3 z-20 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-xs flex items-center gap-1"
                  initial={{ scale: 0, rotate: -45 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.3, duration: 0.5, type: "spring" }}
                  style={{
                    boxShadow: '0 4px 15px rgba(168, 85, 247, 0.4)'
                  }}
                >
                  <Sparkles size={12} />
                  <span>Featured</span>
                </motion.div>
              )}

              <motion.div
                className="relative h-full bg-black backdrop-blur-lg border-2 border-purple-500/20 rounded-xl overflow-hidden"
                whileHover={{ 
                  scale: 1.03,
                  borderColor: 'rgba(168, 85, 247, 0.5)',
                }}
                transition={{ duration: 0.3 }}
                style={{
                  boxShadow: hoveredId === project.id 
                    ? '0 20px 60px rgba(168, 85, 247, 0.3)' 
                    : '0 10px 30px rgba(0, 0, 0, 0.5)'
                }}
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                  
                  {/* Image */}
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23000" width="400" height="300"/%3E%3Ctext fill="%238b5cf6" font-size="24" font-family="Arial" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EProject Image%3C/text%3E%3C/svg%3E';
                    }}
                  />

                  {/* Shimmer Effect on Hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent z-20"
                    initial={{ x: '-100%' }}
                    animate={hoveredId === project.id ? { x: '200%' } : { x: '-100%' }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Title */}
                  <h3 className="text-xl font-bold bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-300"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + techIndex * 0.05 }}
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(168, 85, 247, 0.3)' }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-3 py-1 bg-pink-500/20 border border-pink-500/30 rounded-full text-xs text-pink-300">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-2">

                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white text-sm"
                      whileHover={{ 
                        scale: 1.05, 
                        y: -2,
                        boxShadow: '0 10px 25px rgba(168, 85, 247, 0.4)'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </motion.a>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                {hoveredId === project.id && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.a
            href="https://github.com/Harsh-Koundal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-purple-900/20 border-2 border-purple-500/30 rounded-full text-purple-300 backdrop-blur-sm"
            whileHover={{ 
              scale: 1.05,
              borderColor: 'rgba(168, 85, 247, 0.6)',
              boxShadow: '0 10px 40px rgba(168, 85, 247, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
            <span>View All Projects on GitHub</span>
            <ExternalLink size={16} />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}