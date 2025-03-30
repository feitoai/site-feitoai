"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { FiMenu, FiX, FiChevronRight } from "react-icons/fi";

const navLinks = [
  { name: "Início", href: "#hero" },
  { name: "Recursos", href: "#recursos" },
  { name: "FeitoChat", href: "#feitochat" },
  { name: "Preços", href: "#precos" },
  //{ name: "Calculadora ROI_teste", href: "/#roi" },
  { name: "Calculadora ROI", href: "#roi-calculator-copy" },
  { name: "Integrações", href: "#integracoes" },
  { name: "FAQ", href: "#faq" },
  { name: "Contato", href: "#contato" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Update active link based on scroll position
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          setActiveLink(`#${sectionId}`);
        }
      });
      
      // If at the top of the page, set active to home
      if (window.scrollY < 100) {
        setActiveLink("/");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scrolling for hash links
  const handleHashLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only apply to hash links
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
        
        // Update active link
        setActiveLink(href);
        
        // Scroll to the element with smooth behavior
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for the fixed header
          behavior: 'smooth'
        });
      }
    }
  };

  // Animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="flex items-center"
            onClick={(e) => handleHashLinkClick(e, "/")}
          >
            <div className="relative w-16 h-16">
              <img 
                src="/logos/icone_para_fundo_branco.svg"   
                alt="FeitoAI Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
          </Link>

          <div className="flex items-center">
            <nav className="hidden md:flex items-center mr-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="mx-3"
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleHashLinkClick(e, link.href)}
                    className={`text-sm font-medium transition-colors duration-300 hover:text-primary relative ${
                      activeLink === link.href
                        ? "text-primary"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {link.name}
                    {activeLink === link.href && (
                      <motion.span
                        layoutId="activeSection"
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <ThemeToggle />
              </motion.div>
              
              <Link
                href="/login"
                className="hidden md:inline-flex items-center justify-center px-6 py-2 bg-transparent border border-primary/50 text-primary hover:bg-primary/10 dark:hover:bg-primary/10 font-medium rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Entrar
              </Link>
              
              <Link
                href="#contato"
                onClick={(e) => handleHashLinkClick(e, "#contato")}
                className="hidden md:inline-flex button-hover-effect items-center justify-center px-6 py-2 bg-gradient-to-r from-primary via-primary-light to-primary text-white font-medium rounded-full shadow-lg shadow-primary/20 transition-all duration-300 transform hover:scale-105 bg-size-200 bg-pos-0 hover:bg-pos-100"
              >
                Iniciar Teste <FiChevronRight className="ml-1" />
              </Link>
              
              {/* Mobile Menu Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="md:hidden p-2 text-dark dark:text-light"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                whileTap={{ scale: 0.9 }}
              >
                {mobileMenuOpen ? (
                  <FiX className="w-6 h-6" />
                ) : (
                  <FiMenu className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay to close menu when clicked */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-30 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden fixed top-16 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-lg z-40 overflow-hidden max-h-[calc(100vh-4rem)] overflow-y-auto"
            >
              <div className="container mx-auto px-4 py-4">
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={(e) => {
                        handleHashLinkClick(e, link.href);
                        setMobileMenuOpen(false);
                      }}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        activeLink === link.href
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link
                    href="#contato"
                    onClick={(e) => {
                      handleHashLinkClick(e, "#contato");
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-md shadow-primary/20 transition-colors text-center"
                  >
                    Fale Conosco
                  </Link>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
