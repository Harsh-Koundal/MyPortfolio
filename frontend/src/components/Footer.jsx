import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Harsh-Koundal', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/harsh-koundal-0a7485369/', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/aharsh3039?t=2tJUiFwsF8fGifYLSFkZVg&s=08', label: 'Twitter' },
    { icon: Mail, href: 'mailto:aharsh3039@gmail.com', label: 'Email' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check scroll position
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setShowScrollTop(window.scrollY > 500);
    });
  }

  return (
    <footer className="relative bg-gradient-to-b from-white to-gray-50 border-t border-gray-200">
      {/* Animated top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-200 to-transparent overflow-hidden">
        <motion.div
          className="h-full w-1/3 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600"
          animate={{
            x: ['-100%', '300%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.h3 
              className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.02 }}
            >
              Harsh Koundal
            </motion.h3>
            <p className="text-gray-600 text-lg mb-6 max-w-8xl leading-relaxed">
              Full Stack Developer specializing in MERN stack. Crafting exceptional digital experiences with passion and precision.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-11 h-11 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50 transition-all shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -3, boxShadow: '0 10px 25px rgba(168, 85, 247, 0.2)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-gray-600 hover:text-purple-600 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-purple-600 group-hover:w-4 transition-all duration-300"></span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold text-gray-900 mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <a 
                href="mailto:aharsh3039@gmail.com"
                className="text-gray-600 hover:text-purple-600 transition-colors block"
              >
                aharsh3039@gmail.com
              </a>
              <tel className="text-gray-600">+91 9736054697</tel>
              <p className="text-gray-600">Kangra, Himachal Pradesh</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full text-sm font-medium text-green-700 mt-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Available for Freelance
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="pt-8 border-t border-gray-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center items-center">
            {/* Copyright */}
            <p className="text-gray-600 flex items-center gap-2 text-sm">
              © {currentYear} Harsh Koundal. Crafted with
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Heart className="text-pink-500 fill-pink-500" size={16} />
              </motion.span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-purple-500/30 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: '0 20px 40px rgba(168, 85, 247, 0.4)'
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  );
}