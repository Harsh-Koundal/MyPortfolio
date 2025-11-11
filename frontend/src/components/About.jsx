import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { Suspense } from 'react';
import { Code2, Database, Layers, Zap } from 'lucide-react';

function FloatingBoxes() {
  return (
    <>
      <Box position={[-2, 0, 0]} args={[1, 1, 1]}>
        <meshStandardMaterial color="#8b5cf6" wireframe />
      </Box>
      <Box position={[2, 0, 0]} args={[1, 1, 1]}>
        <meshStandardMaterial color="#ec4899" wireframe />
      </Box>
      <Box position={[0, 2, 0]} args={[1, 1, 1]}>
        <meshStandardMaterial color="#06b6d4" wireframe />
      </Box>
    </>
  );
}

const skills = [
  { name: 'React.js', level: 95, icon: Code2 },
  { name: 'Node.js', level: 90, icon: Zap },
  { name: 'MongoDB', level: 85, icon: Database },
  { name: 'JavaScript', level: 96, icon: Layers },
  { name: 'Express.js', level: 88, icon: Code2 },
  { name: 'Three.js', level: 80, icon: Layers },
];

export default function About() {
  return (
    <section id="about" className="min-h-screen py-20 relative">
      {/* Background */}
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
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-600 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 3D Animation */}
          <motion.div
            className="h-96 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Canvas camera={{ position: [0, 0, 8] }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <FloatingBoxes />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
              </Suspense>
            </Canvas>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              I'm <span className="text-purple-400">Harsh Koundal</span>, also known as{' '}
              <span className="text-pink-400">CodeRage Harsh</span> — a passionate Full Stack MERN Developer
              who loves building innovative web applications that make a difference.
            </p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              My mission is to create seamless, user-centric digital experiences that combine
              cutting-edge technology with creative design. I specialize in the MERN stack and have
              a keen eye for modern UI/UX trends and 3D web experiences.
            </p>

            {/* Skills */}
            <div className="space-y-4">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="text-purple-400" size={20} />
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="ml-auto text-purple-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/30"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
