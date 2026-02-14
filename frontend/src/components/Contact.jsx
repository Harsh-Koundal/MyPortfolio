import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { useState, useRef, useMemo } from 'react';
import { Send, Github, Linkedin, Twitter, Mail, MessageCircle, MapPin, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
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
        duration: 20 + Math.random() * 8,
        size: 24 + Math.random() * 40
      })),
    [floatingShapeCount]
  );

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
      color: 'from-gray-700 to-gray-900'
    },
    { 
      icon: Linkedin, 
      href: 'https://www.linkedin.com/in/harsh-koundal-0a7485369/', 
      label: 'LinkedIn',
      username: 'Harsh Koundal',
      color: 'from-blue-600 to-blue-700'
    },
    { 
      icon: Twitter, 
      href: 'https://x.com/aharsh3039?t=2tJUiFwsF8fGifYLSFkZVg&s=08', 
      label: 'Twitter',
      username: '@aharsh3039',
      color: 'from-sky-500 to-sky-600'
    },
    { 
      icon: Mail, 
      href: 'mailto:aharsh3039@gmail.com', 
      label: 'Email',
      username: 'aharsh3039@gmail.com',
      color: 'from-purple-600 to-pink-600'
    },
  ];

  const contactInfo = [
    { icon: MapPin, label: 'Location', value: 'Kangra, Himachal Pradesh, IN', color: 'text-purple-600' },
    { icon: MessageCircle, label: 'Availability', value: 'Open for Freelance', color: 'text-green-600' },
  ];

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <motion.div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full blur-3xl"
          style={{ y: y1 }}
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
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-gradient-to-tr from-blue-200/40 to-purple-200/40 rounded-full blur-3xl"
          style={{ y: y1 }}
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
      <motion.div className="container mx-auto px-6 relative z-10">
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
            <MessageCircle size={16} className="text-purple-600" />
            <span className="text-purple-700 text-sm font-semibold uppercase tracking-wider">
              Get In Touch
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
              Let's Work Together
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Have a project in mind? Let's create something amazing together
          </motion.p>

          <motion.div
            className="w-24 h-1.5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 mx-auto rounded-full mt-8"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={info.label}
                className="flex items-center gap-3 px-6 py-3 bg-white border-2 border-gray-200 rounded-full shadow-lg shadow-gray-200"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  y: -3,
                  boxShadow: '0 20px 40px -12px rgba(168, 85, 247, 0.2)'
                }}
              >
                <Icon size={18} className={info.color} />
                <span className="text-gray-700 text-sm font-medium">{info.value}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Grid */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200 border border-gray-100"
              whileHover={{ 
                boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.15)'
              }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-12 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full" />
                <h3 className="text-3xl font-bold text-gray-900">
                  Send a Message
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2 text-sm">
                    Your Name
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
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white transition-all text-gray-900 placeholder-gray-400"
                    placeholder="John Doe"
                    whileFocus={{ scale: 1.01 }}
                    style={{
                      boxShadow: focusedField === 'name' ? '0 0 0 4px rgba(168, 85, 247, 0.1)' : 'none'
                    }}
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2 text-sm">
                    Email Address
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
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white transition-all text-gray-900 placeholder-gray-400"
                    placeholder="john@example.com"
                    whileFocus={{ scale: 1.01 }}
                    style={{
                      boxShadow: focusedField === 'email' ? '0 0 0 4px rgba(168, 85, 247, 0.1)' : 'none'
                    }}
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2 text-sm">
                    Your Message
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
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white transition-all text-gray-900 placeholder-gray-400 resize-none"
                    placeholder="Tell me about your project..."
                    whileFocus={{ scale: 1.01 }}
                    style={{
                      boxShadow: focusedField === 'message' ? '0 0 0 4px rgba(168, 85, 247, 0.1)' : 'none'
                    }}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center gap-3 text-white font-semibold text-lg shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                  whileHover={!isLoading ? { 
                    scale: 1.02,
                    boxShadow: '0 20px 40px -12px rgba(168, 85, 247, 0.4)'
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
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Send size={20} />
                      </motion.div>
                    </>
                  )}
                  
                  {/* Button gradient animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </form>

              {/* Success indicator */}
              <motion.div
                className="mt-6 flex items-center gap-2 text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <CheckCircle2 size={16} className="text-green-500" />
                <span>I typically respond within 24 hours</span>
              </motion.div>
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
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-12 bg-gradient-to-b from-pink-600 to-purple-600 rounded-full" />
              <h3 className="text-3xl font-bold text-gray-900">
                Connect With Me
              </h3>
            </div>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Follow me on social media and let's stay connected. I'm always excited to network with fellow developers and discuss new opportunities!
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
                    className="group flex items-center gap-4 p-5 bg-white rounded-2xl shadow-lg shadow-gray-200 border border-gray-100 relative overflow-hidden"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      x: 8,
                      boxShadow: '0 20px 40px -12px rgba(168, 85, 247, 0.2)'
                    }}
                  >
                    <motion.div
                      className={`w-14 h-14 bg-gradient-to-br ${link.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon size={24} className="text-white" />
                    </motion.div>
                    
                    <div className="flex-1">
                      <div className="text-gray-900 font-semibold text-lg group-hover:text-purple-600 transition-colors">
                        {link.label}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {link.username}
                      </div>
                    </div>

                    <motion.div
                      className="text-gray-400 group-hover:text-purple-600 transition-colors"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ArrowUpRight size={20} />
                    </motion.div>

                    {/* Hover gradient overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ zIndex: -1 }}
                    />
                  </motion.a>
                );
              })}
            </div>

            {/* Quick response badge */}
            <motion.div
              className="mt-8 p-5 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 border-2 border-purple-200 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              whileHover={{ y: -3, boxShadow: '0 10px 30px rgba(168, 85, 247, 0.2)' }}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="text-gray-900 font-bold mb-1">Quick Response Guaranteed</h4>
                  <p className="text-gray-600 text-sm">
                    I respond to all inquiries within 24 hours. Let's discuss your project!
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
