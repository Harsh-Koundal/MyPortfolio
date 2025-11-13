import { motion } from 'framer-motion';
import { Code2, Database, Server, Palette, Sparkles, Globe, Cuboid } from 'lucide-react';

const experiences = [
  {
    year: '2025',
    title: 'Full Stack MERN Developer',
    company: 'Freelance',
    description:
      'Working on full-stack projects for clients, building scalable web applications using React, Node.js, Express, and MongoDB. Focused on writing clean code, reusable components, and delivering production-ready solutions.',
    icon: Code2,
  },
  {
    year: '2024 – 2025',
    title: 'Frontend Developer Intern',
    company: 'Printzet',
    description:
      'Built responsive UI components, integrated APIs, improved dashboard performance, and worked on animations using Framer Motion and Three.js. Gained strong hands-on experience with React, Tailwind CSS, and state management.',
    icon: Server,
  },
  {
    year: '2024',
    title: 'Frontend Development Journey',
    company: 'Self-Learning',
    description:
      'Started learning the fundamentals of web development including HTML, CSS, JavaScript, and React. Built small projects, improved UI/UX understanding, and practiced real-world problem solving.',
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
