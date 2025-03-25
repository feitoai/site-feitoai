"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // Custom ease curve for smoother animation
      },
    },
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center pt-12 overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-light via-light/90 to-primary/10 dark:from-dark dark:via-dark/90 dark:to-primary/20 animate-gradient-xy opacity-80 z-0"></div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5 dark:opacity-10 z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 pt-12 pb-10 md:pt-16 md:pb-16 z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="space-y-6">
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <div className="absolute -left-6 -top-6 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight relative">
                <span className="ultra-modern-gradient">
                  Transforme seu Atendimento com Inteligência Artificial
                </span>
              </h1>
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-xl mb-2 leading-relaxed"
            >
              Automatize seu atendimento, aumente suas vendas e melhore a
              experiência dos seus clientes com nossa plataforma completa de IA.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-5"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="#roi-calculator-copy"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary via-primary-light to-primary text-white font-medium rounded-full shadow-lg shadow-primary/20 transition-all duration-300 text-center bg-size-200 bg-pos-0 hover:bg-pos-100"
                >
                  Descubra seu ROI agora!
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/#recursos"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-full border border-gray-200 dark:border-gray-700 shadow-md transition-all duration-300 text-center"
                >
                  Conhecer os recursos
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="relative h-[400px] md:h-[500px] flex items-center justify-center"
          >
            {/* Background blob with animated gradient */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-gradient-to-br from-primary/20 via-purple-500/20 to-primary/10 dark:from-primary/15 dark:via-purple-500/15 dark:to-primary/5 rounded-full blur-3xl"></div>
            
            {/* Animated ring */}
            <motion.div 
              className="absolute top-1/2 left-1/2 w-[280px] h-[280px] md:w-[380px] md:h-[380px] border border-primary/20 rounded-full"
              style={{ translateX: "-50%", translateY: "-50%" }}
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{ 
                duration: 8, 
                ease: "easeInOut", 
                repeat: Infinity,
                repeatType: "mirror"
              }}
            ></motion.div>
            
            {/* Hero illustration */}
            <motion.div 
              className="relative z-10 w-full h-full"
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 4, 
                ease: "easeInOut", 
                repeat: Infinity,
                repeatType: "mirror"
              }}
            >
              <Image
                src="/hero-illustration.svg"
                alt="Ilustração de atendimento com IA"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator with improved animation */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-dark/30 dark:border-light/30 flex items-center justify-center">
          <motion.div 
            className="w-1.5 h-3 bg-primary/70 dark:bg-primary/70 rounded-full"
            animate={{
              y: [0, 3, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
          ></motion.div>
        </div>
      </motion.div>
    </section>
  );
}
