import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Torus } from '@react-three/drei';
import { Suspense, useState, useRef } from 'react';
import { Send, Github, Linkedin, Twitter, Mail, MessageCircle, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

function AnimatedTorus() {
  return (
    <Torus args={[2, 0.5, 16, 100]} rotation={[Math.PI / 4, 0, 0]}>
      <meshPhongMaterial color="#8b5cf6" wireframe />
    </Torus>
  );
}

export default function Contact() {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

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
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 15 + Math.random() * 20,
    size: 2 + Math.random() * 3
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate environment variables
    if (!import.meta.env.VITE_EMAILJS_SERVICE_ID || !import.meta.env.VITE_EMAILJS_TEMPLATE_ID || !import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
      toast.error('Email service is not configured. Please contact the site admin.');
      return;
    }

    setIsLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          reply_to: formData.email, 
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          toast.success("Message sent successfully! I'll get back to you soon.");
          setFormData({ name: '', email: '', message: '' });
        },
        (error) => {
          console.error('Email error:', error);
          toast.error('Failed to send message. Please try again later.');
        }
      )
      .finally(() => setIsLoading(false));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const socialLinks = [
    { 
      icon: Github, 
      href: 'https://github.com/Harsh-Koundal', 
      label: 'GitHub',
      username: '@Harsh-Koundal',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      icon: Linkedin, 
      href: 'https://www.linkedin.com/in/harsh-koundal-0a7485369/', 
      label: 'LinkedIn',
      username: 'Harsh Koundal',
      color: 'from-purple-600 to-pink-600'
    },
    { 
      icon: Twitter, 
      href: 'https://x.com/aharsh3039?t=2tJUiFwsF8fGifYLSFkZVg&s=08', 
      label: 'Twitter',
      username: '@aharsh3039',
      color: 'from-pink-500 to-purple-500'
    },
    { 
      icon: Mail, 
      href: 'mailto:aharsh3039@gmail.com', 
      label: 'Email',
      username: 'aharsh3039@gmail.com',
      color: 'from-pink-600 to-purple-600'
    },
  ];

  const contactInfo = [
    { icon: MapPin, label: 'Location', value: 'Kangra , Himachal Pradesh , IN' },
    { icon: MessageCircle, label: 'Availability', value: 'Open for Freelance' },
  ];

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative py-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />

      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <AnimatedTorus />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
          </Suspense>
        </Canvas>
      </div>

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full"
        style={{ 
          y: y1,
          filter: 'blur(80px)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -60, 0],
        }}
        transition={{
          duration: 24,
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
          x: [0, 50, 0],
        }}
        transition={{
          duration: 28,
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
            y: [0, -40, 0],
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
            <MessageCircle size={18} className="text-purple-400" />
            <span className="text-purple-300 text-sm uppercase tracking-wider">
              Get In Touch
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
              Let's Connect
            </span>
          </motion.h2>

          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-600 mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />

          <motion.p
            className="text-gray-400 text-lg max-w-8xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Have a project in mind or just want to chat? Drop me a message and I'll get back to you as soon as possible!
          </motion.p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-12 max-w-8xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={info.label}
                className="flex items-center gap-3 px-6 py-3 bg-black backdrop-blur-lg border-2 border-purple-500/20 rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.05,
                  borderColor: 'rgba(168, 85, 247, 0.4)',
                }}
              >
                <Icon size={18} className="text-purple-400" />
                <span className="text-gray-300 text-sm">{info.value}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Grid */}
        <div className="max-w-8xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="bg-black backdrop-blur-lg border-2 border-purple-500/20 rounded-xl p-8"
              style={{
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  Send Message
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2 text-sm">
                    Name
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3 bg-purple-900/20 border-2 border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 transition-all text-white placeholder-gray-500"
                    placeholder="Your name"
                    whileFocus={{ scale: 1.01 }}
                    style={{
                      boxShadow: focusedField === 'name' ? '0 0 20px rgba(168, 85, 247, 0.3)' : 'none'
                    }}
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2 text-sm">
                    Email
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3 bg-purple-900/20 border-2 border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 transition-all text-white placeholder-gray-500"
                    placeholder="your.email@example.com"
                    whileFocus={{ scale: 1.01 }}
                    style={{
                      boxShadow: focusedField === 'email' ? '0 0 20px rgba(168, 85, 247, 0.3)' : 'none'
                    }}
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-2 text-sm">
                    Message
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-purple-900/20 border-2 border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 transition-all text-white placeholder-gray-500 resize-none"
                    placeholder="Your message..."
                    whileFocus={{ scale: 1.01 }}
                    style={{
                      boxShadow: focusedField === 'message' ? '0 0 20px rgba(168, 85, 247, 0.3)' : 'none'
                    }}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center gap-2 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={!isLoading ? { 
                    scale: 1.02,
                    boxShadow: '0 10px 30px rgba(168, 85, 247, 0.4)'
                  } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={18} />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text text-transparent">
                Connect With Me
              </h3>
            </div>

            <p className="text-gray-400 mb-8 leading-relaxed">
              Follow me on social media or reach out directly. I'm always excited to connect with fellow developers and discuss new opportunities!
            </p>

            <div className="space-y-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-black backdrop-blur-lg border-2 border-purple-500/20 rounded-xl group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.03, 
                      x: 10,
                      borderColor: 'rgba(168, 85, 247, 0.5)',
                    }}
                    style={{
                      boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-br ${link.color} rounded-lg flex items-center justify-center`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon size={22} className="text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="text-white font-medium group-hover:text-purple-300 transition-colors">
                        {link.label}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {link.username}
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}