"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";

type Integration = {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: "ai" | "messaging" | "automation" | "crm" | "payment" | "productivity";
};

const integrations: Integration[] = [
  {
    id: "openai",
    name: "OpenAI",
    logo: "/integrations/openai.svg",
    description: "Integre modelos avançados de IA como GPT-4 para potencializar seu atendimento com respostas inteligentes e personalizadas.",
    category: "ai",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    logo: "/integrations/whatsapp.svg",
    description: "Conecte-se à API oficial do WhatsApp Business para oferecer atendimento automatizado e personalizado aos seus clientes.",
    category: "messaging",
  },
  {
    id: "n8n",
    name: "n8n",
    logo: "/integrations/n8n.svg",
    description: "Crie fluxos de automação complexos e personalizados que conectam a FeitoAI com centenas de outras ferramentas e serviços.",
    category: "automation",
  },
  {
    id: "telegram",
    name: "Telegram",
    logo: "/integrations/telegram.svg",
    description: "Expanda seu atendimento multicanal com bots inteligentes no Telegram, oferecendo suporte 24/7 aos seus clientes.",
    category: "messaging",
  },
  {
    id: "facebook",
    name: "Facebook Messenger",
    logo: "/integrations/facebook.svg",
    description: "Automatize conversas no Facebook Messenger para capturar leads e oferecer suporte instantâneo nas redes sociais.",
    category: "messaging",
  },
  {
    id: "instagram",
    name: "Instagram Direct",
    logo: "/integrations/instagram.svg",
    description: "Gerencie mensagens do Instagram Direct com automação inteligente, aumentando engajamento e conversões.",
    category: "messaging",
  },
  {
    id: "gmail",
    name: "Gmail",
    logo: "/integrations/gmail.svg",
    description: "Integre seu e-mail corporativo para automatizar respostas e organizar comunicações em um único dashboard.",
    category: "productivity",
  },
  {
    id: "google-calendar",
    name: "Google Agenda",
    logo: "/integrations/google-calendar.svg",
    description: "Automatize agendamentos e lembretes, sincronizando eventos diretamente com seu Google Agenda.",
    category: "productivity",
  },
  {
    id: "google-sheets",
    name: "Google Sheets",
    logo: "/integrations/google-sheets.svg",
    description: "Exporte e importe dados automaticamente para planilhas, facilitando análises e relatórios personalizados.",
    category: "productivity",
  },
  {
    id: "asaas",
    name: "Asaas",
    logo: "/integrations/asaas.svg",
    description: "Automatize cobranças e pagamentos, integrando seu sistema financeiro diretamente com a plataforma FeitoAI.",
    category: "payment",
  },
];

const categories = [
  { id: "all", name: "Todas" },
  { id: "messaging", name: "Mensagens" },
  { id: "ai", name: "Inteligência Artificial" },
  { id: "automation", name: "Automação" },
  { id: "productivity", name: "Produtividade" },
  { id: "payment", name: "Pagamentos" },
];

export function IntegrationsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredIntegration, setHoveredIntegration] = useState<string | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredIntegrations = activeCategory === "all"
    ? integrations
    : integrations.filter(integration => integration.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // Custom ease curve for smoother animation
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -10 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 15 
      } 
    },
    hover: { 
      scale: 1.1,
      rotate: 5,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 10 
      } 
    }
  };

  return (
    <section
      id="integracoes"
      ref={ref}
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5 dark:opacity-10 z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Ecossistema de <span className="text-gradient">Integrações</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-dark/70 dark:text-light/70 max-w-2xl mx-auto text-lg"
          >
            A FeitoAI se conecta perfeitamente com as ferramentas que você já utiliza, criando um ecossistema completo para seu negócio.
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-12 overflow-x-auto pb-2 -mx-4 px-4 md:px-0 md:mx-0"
        >
          <div className="inline-flex flex-nowrap p-1 bg-gray-100 dark:bg-gray-800 rounded-full whitespace-nowrap">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 sm:px-4 md:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-primary text-white"
                    : "text-dark/70 dark:text-light/70 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
        >
          {filteredIntegrations.map((integration) => (
            <motion.div
              key={integration.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`relative bg-light dark:bg-gray-800/80 rounded-xl p-4 sm:p-6 border transition-all duration-300 ${
                hoveredIntegration === integration.id
                  ? "border-primary shadow-lg shadow-primary/20 transform"
                  : "border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/50"
              }`}
              onMouseEnter={() => setHoveredIntegration(integration.id)}
              onMouseLeave={() => setHoveredIntegration(null)}
            >
              <div className="flex flex-col items-center text-center">
                <motion.div 
                  className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 relative"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <Image
                    src={integration.logo}
                    alt={`${integration.name} logo`}
                    fill
                    className="object-contain drop-shadow-md"
                  />
                </motion.div>
                <h3 className="text-sm sm:text-base font-medium mb-2">{integration.name}</h3>
                
                {hoveredIntegration === integration.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute inset-0 bg-gradient-to-br from-light/95 to-light/90 dark:from-gray-800/95 dark:to-gray-800/90 rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center text-center backdrop-blur-sm"
                  >
                    <p className="text-xs sm:text-sm">{integration.description}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-12 text-center px-4 sm:px-0"
        >
          <p className="text-dark/70 dark:text-light/70 mb-4">
            Não encontrou a integração que precisa?
          </p>
          <a
            href="#contato"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary via-primary-light to-primary text-white text-sm sm:text-base font-medium rounded-full shadow-lg shadow-primary/20 transition-all duration-300 transform hover:scale-105 button-hover-effect bg-size-200 bg-pos-0 hover:bg-pos-100"
          >
            Solicite uma integração personalizada <FiArrowRight className="ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
