import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Sparkles, Briefcase, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "StudyVault",
    description:
      "A smart learning platform where users can upload, organize, and share educational materials securely. Includes real-time document previews, category filters, and user profiles.",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS", "Three.js"],
    demo: "https://studyvault-2.onrender.com/",
    featured: true,
    category: "Full Stack"
  },
  {
    id: 2,
    title: "NerathiX Digital Agency",
    description:
      "A modern website for a digital agency showcasing services, portfolio, team members, and client testimonials with smooth animations and responsive design.",
    image:
      "https://images.unsplash.com/photo-1629904853716-f0bc54eea481?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
    tech: ["React", "Node.js", "Tailwind CSS", "MongoDB", "Express", "Three.js"],
    demo: "https://nerathix.onrender.com/",
    featured: true,
    category: "Full Stack"
  },
  {
    id: 3,
    title: "Voting System",
    description:
      "A secure online voting platform allowing users to cast votes, view live results, and prevent duplicate submissions using authentication and database validation.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tech: ["React", "Node.js", "Tailwind CSS", "MongoDB", "Express"],
    demo: "https://voting-system-demo.com",
    featured: false,
    category: "Web App"
  },
  {
    id: 4,
    title: "Recipe Finder",
    description:
      "A web app that helps users discover recipes based on ingredients they have. Includes API integration, filtering by cuisine, and responsive card-based design.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tech: ["React", "API Integration", "CSS3", "JavaScript"],
    demo: "https://recipe-finder-demo.com",
    featured: false,
    category: "Frontend"
  },
  {
    id: 5,
    title: "Expense Tracker",
    description:
      "A smart budgeting tool that tracks daily expenses, visualizes spending trends, and helps manage finances efficiently with local storage support.",
    image:
      "https://images.unsplash.com/photo-1560221328-12fe60f83ab8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1174",
    tech: ["React", "Chart.js", "Local Storage", "CSS Modules"],
    demo: "https://expense-tracker-demo.com",
    featured: false,
    category: "Web App"
  },
  {
    id: 6,
    title: "Portfolio Project",
    description:
      "A stunning portfolio website showcasing creative work with advanced animations, smooth transitions, and an intuitive user interface built with modern technologies.",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tech: ["React", "Framer Motion", "Tailwind CSS", "Three.js"],
    demo: "https://portfolio-demo.com",
    featured: false,
    category: "Frontend"
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
      id="portfolio"
      className="relative py-24 overflow-hidden min-h-screen"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"
          style={{ y: y1 }}
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
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"
          style={{ y: y1 }}
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
              x: [0, Math.sin(shape.id) * 15, 0],
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
      <motion.div
        className="container mx-auto px-6 relative z-10"
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
            className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 bg-purple-100 border border-purple-300 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Briefcase size={16} className="text-purple-600" />
            <span className="text-purple-700 text-sm font-semibold uppercase tracking-wider">
              Portfolio
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
              Featured Projects
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Explore my recent work and creative projects
          </motion.p>

          <motion.div
            className="w-24 h-1.5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 mx-auto rounded-full mt-8"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative"
            >
              {/* Featured Badge */}
              {project.featured && (
                <motion.div
                  className="absolute -top-3 -right-3 z-20 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-purple-500/40"
                  initial={{ scale: 0, rotate: -12 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5, type: "spring", stiffness: 200 }}
                >
                  <Sparkles size={14} />
                  <span>Featured</span>
                </motion.div>
              )}

              <motion.div
                className="relative h-full bg-white rounded-3xl overflow-hidden shadow-xl shadow-gray-200 border border-gray-100"
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.25)"
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-purple-600 shadow-lg">
                    {project.category}
                  </div>

                  {/* Image */}
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f3e8ff" width="400" height="300"/%3E%3Ctext fill="%23a855f7" font-size="20" font-family="Arial" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E' + project.title + '%3C/text%3E%3C/svg%3E';
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={hoveredId === project.id ? { x: '200%' } : { x: '-100%' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 bg-purple-50 border border-purple-200 rounded-full text-xs font-medium text-purple-700"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                        whileHover={{ scale: 1.05, backgroundColor: '#f3e8ff', borderColor: '#a855f7' }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-3 py-1 bg-pink-50 border border-pink-200 rounded-full text-xs font-medium text-pink-700">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold text-sm shadow-lg shadow-purple-500/30 relative overflow-hidden"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: '0 20px 40px -12px rgba(168, 85, 247, 0.4)'
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        View Project
                        <motion.div
                          animate={hoveredId === project.id ? { x: [0, 4, 0] } : {}}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        >
                          <ArrowUpRight size={18} />
                        </motion.div>
                      </span>
                      
                      {/* Button hover effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  </div>
                </div>

                {/* Card Border Glow on Hover */}
                {hoveredId === project.id && (
                  <motion.div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      boxShadow: '0 0 0 2px rgba(168, 85, 247, 0.3)',
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
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
              Have a project in mind? Let's bring it to life!
            </span>
            <ExternalLink size={18} className="text-pink-600" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}