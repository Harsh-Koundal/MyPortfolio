import { motion } from 'framer-motion';
import { Code2, Database, Server, Palette, Sparkles, Globe, Cuboid } from 'lucide-react';
const experiences = [
  {
    year: 'Jan 2026 – Present',
    title: 'Software Development Engineer Intern (SDE-I)',
    company: 'Zenlynx Technology',
    description:
      'Managing and maintaining production-grade frontend and backend repositories, reviewing pull requests, resolving merge conflicts, and deploying stable changes to live VPS servers. Contributing across the stack by building React features, developing REST APIs, and ensuring production stability during deployments and post-release verification.',
    icon: Code2,
  },
  {
    year: 'Jul 2025 – Dec 2025',
    title: 'Software Development Engineer Intern (Full Stack)',
    company: 'Printzet',
    description:
      'Developed and maintained backend workflows for a multi-role commerce platform (Admin, Vendor, User). Designed and implemented REST APIs with authentication, validation, and optimized MongoDB queries. Built 20+ reusable React components and improved Lighthouse performance from 60% to 88% through code-splitting, lazy loading, caching, and Tailwind optimization.',
    icon: Server,
  },
  {
    year: '2024 – 2025',
    title: 'Full Stack MERN Developer',
    company: 'Freelance',
    description:
      'Built and delivered custom full-stack MERN applications including a wholesale e-commerce platform with bulk purchasing, cart management, order lifecycle handling, and payment integration. Owned backend API development, database schema design, and production deployment on VPS servers. Currently open to freelance and contract-based projects.',
    icon: Palette,
  },
];


const technologies = [
  { name: 'React.js', icon: Code2, color: '#61DAFB' },
  { name: 'Node.js', icon: Globe, color: '#339933' },
  { name: 'MongoDB', icon: Database, color: '#47A248' },
  { name: 'Express', icon: Server, color: '#000000' },
  { name: 'Three.js', icon: Cuboid, color: '#000000' },
  { name: 'Tailwind css', icon: Sparkles, color: '#3178C6' },
];

export default function Experience() {
  return (
    <section id="experience" className="min-h-screen py-20 relative px-12">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Experience & Skills
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-600 mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Timeline */}
          <div>
            <h3 className="text-2xl mb-8 text-purple-300">Career Journey</h3>
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500" />

              {experiences.map((exp, index) => {
                const Icon = exp.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="relative pl-10 pb-12 last:pb-0"
                  >
                    {/* Icon */}
                    <motion.div
                      className="absolute left-0 -translate-x-1/2 w-10 h-10 
             bg-gradient-to-br from-purple-600 to-pink-600 
             rounded-full flex items-center justify-center border border-purple-400/40 shadow-lg"
                      style={{ transformOrigin: 'center center' }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1.2, ease: 'easeInOut' }}
                      whileHover={{ scale: 1.5, rotate: 360 }}
                    >
                      <Icon size={20} className="text-white" />
                    </motion.div>


                    {/* Content */}
                    <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-lg p-3 sm:p-6 border border-purple-500/20 backdrop-blur-sm">
                      <div className="text-sm text-purple-400 mb-2">{exp.year}</div>
                      <h4 className="text-xl mb-1">{exp.title}</h4>
                      <div className="text-pink-400 mb-3">{exp.company}</div>
                      <p className="text-gray-400">{exp.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-2xl mb-8 text-purple-300">Tech Stack</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {technologies.map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -10, 10, -10, 0],
                      transition: { duration: 0.5 }
                    }}
                    className="relative group"
                  >
                    <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-500/20 backdrop-blur-sm flex flex-col items-center justify-center aspect-square">
                      <motion.div
                        className="mb-3"
                        animate={{
                          rotateY: [0, 360],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        <Icon size={40} className="text-purple-400" />
                      </motion.div>
                      <span className="text-center text-sm text-gray-300">{tech.name}</span>

                      {/* Glow effect on hover */}
                      <motion.div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          boxShadow: `0 0 20px ${tech.color}50`,
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
