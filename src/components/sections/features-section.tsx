"use client";

import React from "react";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import { FiMessageCircle, FiUsers, FiActivity, FiSmartphone, FiPieChart, FiDatabase } from "react-icons/fi";
import { AnimatePresence } from "framer-motion";

const features = [
  {
    id: "chatbot-inteligente",
    name: "Chatbot Inteligente",
    description: "Atendimento automatizado 24/7 com tecnologia avançada que compreende o contexto das conversas e aprende com cada interação.",
    icon: FiMessageCircle,
    image: "/features/chatbot-inteligente.svg",
    benefits: [
      "Atendimento instantâneo 24 horas por dia",
      "Redução de 70% nos custos de atendimento",
      "Integração com WhatsApp, site e redes sociais"
    ]
  },
  {
    id: "atendimento-com-ia",
    name: "Atendimento com IA",
    description: "Combine o melhor da inteligência artificial com o toque humano. Nossa solução identifica quando transferir conversas automaticamente para sua equipe.",
    icon: FiUsers,
    image: "/features/atendimento-com-ia.svg",
    benefits: [
      "Respostas personalizadas para cada tipo de cliente",
      "Transferência inteligente para atendentes humanos",
      "Histórico completo de todas as interações"
    ]
  },
  {
    id: "automations",
    name: "Automações",
    description: "Fluxos de trabalho automatizados que impulsionam vendas e atendimento ao cliente, eliminando tarefas repetitivas e aumentando a eficiência.",
    icon: FiActivity,
    image: "/features/automations-2.svg",
    benefits: [
      "Campanhas de marketing automatizadas",
      "Nutrição de leads sem intervenção manual",
      "Recuperação automática de carrinho abandonado"
    ]
  },
  {
    id: "whatsapp",
    name: "WhatsApp Oficial",
    description: "API oficial do WhatsApp Business que proporciona recursos profissionais, credibilidade e maior alcance para sua comunicação com clientes.",
    icon: FiSmartphone,
    image: "/features/whatsapp.svg",
    benefits: [
      "Número verificado com selo oficial do WhatsApp",
      "Múltiplos atendentes no mesmo número",
      "Envio de catálogos, botões e mensagens em massa"
    ]
  },
  {
    id: "crm",
    name: "CRM de Vendas",
    description: "Sistema completo para gerenciar relacionamentos com clientes, acompanhar oportunidades e aumentar as taxas de conversão do seu negócio.",
    icon: FiDatabase,
    image: "/features/crm.svg",
    benefits: [
      "Organização de leads por etapa do funil",
      "Alertas automáticos para follow-up",
      "Integração com email e WhatsApp"
    ]
  },
  // {
  //   id: "dashboards",
  //   name: "Dashboards Interativos",
  //   description: "Visualização de dados em tempo real que transforma informações complexas em insights acionáveis para tomada de decisões estratégicas.",
  //   icon: FiPieChart,
  //   image: "/features/dashboards.svg",
  //   benefits: [
  //     "Métricas de vendas e atendimento em tempo real",
  //     "Relatórios personalizados por departamento",
  //     "Exportação automática para Excel e PDF"
  //   ]
  // },
];

export function FeaturesSection() {
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Map feature IDs to their index for direct access
  const featureIndexMap = useMemo(() => {
    const map: Record<string, number> = {};
    features.forEach((feature, index) => {
      map[feature.id] = index;
    });
    return map;
  }, []);

  // Check for URL hash on component mount and when hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#recursos') {
        // If navigating to the features section, scroll to it
        const element = document.getElementById('recursos');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Reset to first feature when navigating to the section
        setSelectedFeature(0);
        setAutoRotate(true);
      }
    };

    // Check hash on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Auto-rotate features every 8 seconds if no user interaction
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoRotate) {
      interval = setInterval(() => {
        setSelectedFeature((prev) => (prev + 1) % features.length);
      }, 8000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRotate]);

  // Ensure that the selectedFeature state is valid
  useEffect(() => {
    if (selectedFeature >= features.length) {
      setSelectedFeature(0);
    }
  }, [selectedFeature]);

  // Handle manual tab selection
  const handleTabChange = (index: number) => {
    setSelectedFeature(index);
    setAutoRotate(false); // Stop auto-rotation when user manually selects a tab
    
    // Scroll to the feature content if needed
    setTimeout(() => {
      const featureContent = document.querySelector('[data-component-name="feature-content"]');
      if (featureContent) {
        featureContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100); // Small delay to ensure the DOM has updated
  };

  // Add direct click event listeners to tabs after component mounts
  useEffect(() => {
    // Function to handle direct tab clicks
    const handleTabClick = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLElement;
      const tabButton = (event.target as HTMLElement).closest('[data-feature-id]') as HTMLElement;
      
      if (tabButton) {
        const featureId = tabButton.getAttribute('data-feature-id');
        if (featureId && featureIndexMap[featureId] !== undefined) {
          // Prevent default Tab component behavior
          event.preventDefault();
          event.stopPropagation();
          
          // Update the selected feature
          const index = featureIndexMap[featureId];
          setSelectedFeature(index);
          setAutoRotate(false);
          
          // Scroll to the feature content if needed
          setTimeout(() => {
            const featureContent = document.querySelector('[data-component-name="feature-content"]');
            if (featureContent) {
              featureContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }, 100);
        }
      }
    };

    // Wait for DOM to be ready
    if (typeof window !== 'undefined') {
      // Add event listener to the tab list containers
      const desktopTabs = document.querySelector('[data-component-name="features-tabs-desktop"]');
      const mobileTabs = document.querySelector('[data-component-name="features-tabs-mobile"]');
      
      if (desktopTabs) {
        desktopTabs.addEventListener('click', handleTabClick as EventListener);
      }
      
      if (mobileTabs) {
        mobileTabs.addEventListener('click', handleTabClick as EventListener);
      }

      // Cleanup
      return () => {
        if (desktopTabs) {
          desktopTabs.removeEventListener('click', handleTabClick as EventListener);
        }
        
        if (mobileTabs) {
          mobileTabs.removeEventListener('click', handleTabClick as EventListener);
        }
      };
    }
    
    return undefined;
  }, [featureIndexMap]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // Custom ease curve for smoother animation
      },
    },
  };

  const featureIconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1], // Bouncy effect
      },
    },
  };

  return (
    <section
      id="recursos"
      ref={ref}
      className="py-20 bg-light dark:bg-dark relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Recursos <span className="text-gradient">Poderosos</span> da Plataforma
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-700 dark:text-gray-300">
            Conheça as ferramentas que vão transformar o relacionamento com seus clientes
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Desktop tabs - left side */}
          <div className="hidden lg:block lg:col-span-1">
            <div 
              data-component-name="features-tabs-desktop"
              className="sticky top-40 space-y-1 pt-10"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.button
                    key={feature.id}
                    data-feature-id={feature.id}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
                      selectedFeature === index
                        ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-white"
                        : "hover:bg-light-secondary/5 dark:hover:bg-dark-secondary/10 text-gray-700 dark:text-gray-300"
                    }`}
                    variants={itemVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    custom={index}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.span
                      className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg ${
                        selectedFeature === index
                          ? "bg-primary text-white"
                          : "bg-light-secondary/10 dark:bg-dark-secondary/20 text-gray-700 dark:text-gray-300"
                      }`}
                      variants={featureIconVariants}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.span>
                    <span className="font-medium">{feature.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Mobile tabs - top */}
          <div className="lg:hidden mb-8 overflow-x-auto pb-2 scrollbar-hide">
            <div 
              data-component-name="features-tabs-mobile"
              className="flex space-x-2 min-w-max"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.button
                    key={feature.id}
                    data-feature-id={feature.id}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                      selectedFeature === index
                        ? "bg-primary text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                    variants={itemVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    custom={index}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{feature.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Feature content - right side */}
          <motion.div 
            className="lg:col-span-4"
            data-component-name="feature-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl dark:shadow-gray-800/20 overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                  <div className="p-8 md:p-10 space-y-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary mb-2">
                      {React.createElement(features[selectedFeature].icon, { className: "w-8 h-8" })}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      {features[selectedFeature].name}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {features[selectedFeature].description}
                    </p>
                    <div className="space-y-4 pt-2">
                      {features[selectedFeature].benefits.map((benefit, index) => (
                        <motion.div 
                          key={index} 
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.2 }}
                        >
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 dark:bg-primary/30 text-primary flex items-center justify-center mt-0.5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-800 dark:text-gray-200">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="relative h-64 md:h-full bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10 rounded-3xl transform -rotate-1 scale-105">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="relative w-full h-full max-w-xs mx-auto"
                    >
                      <Image
                        src={`/features/${features[selectedFeature].id}.svg`}
                        alt={features[selectedFeature].name}
                        fill
                        className="object-contain"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}