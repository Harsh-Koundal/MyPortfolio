import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const projects = [
  {
    id: 1,
    title: "StudyVault",
    description:
      "A smart learning platform where users can upload, organize, and share educational materials securely. Includes real-time document previews, category filters, and user profiles.",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    github: "https://github.com/Harsh-Koundal/studyvault",
    demo: "https://studyvault-2.onrender.com/",
  },
  {
    id: 2,
    title: "NerathiX digital agency",
    description:
      "A modern website for a digital agency showcasing services, portfolio, team members, and client testimonials with smooth animations and responsive design.",
    image:
      "https://images.unsplash.com/photo-1629904853716-f0bc54eea481?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
    tech: ["React", "Node.js", "Tailwind CSS", "MongoDB", "Express"],
    github: "https://github.com/Harsh-Koundal",
    demo: "https://nerathix.onrender.com/",
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
  },
  {
    id: 4,
    title: "Recipe Finder",
    description:
      "A web app that helps users discover recipes based on ingredients they have. Includes API integration, filtering by cuisine, and responsive card-based design.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tech: ["React", "API Integration", "CSS3", "JavaScript"],
    github: "https://github.com/Harsh-Koundal/recipe-finder",
    demo: "#",
  },
  {
    id: 5,
    title: "Expense Tracker",
    description:
      "A smart budgeting tool that tracks daily expenses, visualizes spending trends, and helps manage finances efficiently with local storage support.",
    image:
      "https://images.unsplash.com/photo-1560221328-12fe60f83ab8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1174",
    tech: ["React", "Chart.js", "Local Storage", "CSS Modules"],
    github: "https://github.com/Harsh-Koundal/expense-tracker",
    demo: "#",
  },
];

export default function Projects() {
  // ✅ Fixed — removed TypeScript syntax
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id="projects" className="min-h-screen py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-pink-900/10 to-black" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-600 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative"
            >
              <motion.div
                className="relative h-full bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl overflow-hidden border border-purple-500/20 backdrop-blur-sm"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ duration: 0.3 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl mb-3 text-purple-300">{project.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <motion.a
                      href={project.github}
                      className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={20} />
                      Code
                    </motion.a>

                    <motion.a
                      href={project.demo}
                      className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={20} />
                      Live Demo
                    </motion.a>
                  </div>

                </div>

                {/* Hover Border */}
                {hoveredId === project.id && (
                  <motion.div
                    className="absolute inset-0 border-2 border-purple-500/50 rounded-xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
