"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useState } from "react";
import { FiUsers, FiMessageSquare, FiCalendar, FiBarChart2, FiLayers, FiSend } from "react-icons/fi";

type Feature = {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
};

const features: Feature[] = [
  {
    id: "multi-agents",
    name: "Suporte a múltiplos atendentes",
    description: "Permita que vários agentes atendam simultaneamente, com distribuição inteligente de conversas e monitoramento em tempo real.",
    icon: FiUsers,
  },
  {
    id: "unified-inbox",
    name: "Centralização dos canais de atendimento",
    description: "Gerencie mensagens de WhatsApp, Instagram, Facebook e Telegram em uma única interface intuitiva e organizada.",
    icon: FiMessageSquare,
  },
  {
    id: "scheduling",
    name: "Agendamento de mensagens",
    description: "Programe envios automáticos para datas e horários específicos, ideal para campanhas e lembretes.",
    icon: FiCalendar,
  },
  {
    id: "monitoring",
    name: "Ferramentas de monitoramento",
    description: "Supervisores podem acompanhar métricas de desempenho, tempos de resposta e qualidade do atendimento.",
    icon: FiBarChart2,
  },
  {
    id: "departments",
    name: "Estrutura de departamentos",
    description: "Organize sua equipe em departamentos ilimitados, com roteamento inteligente e transferências entre setores.",
    icon: FiLayers,
  },
  {
    id: "automations",
    name: "Automações avançadas",
    description: "Crie fluxos automatizados para follow-ups, segmentação de clientes e respostas inteligentes.",
    icon: FiSend,
  },
];

export function FeitoChatSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const tabs = ["Visão geral", "Recursos", "Depoimentos"];

  return (
    <section
      id="feitochat"
      ref={ref}
      className="py-20 md:py-28 bg-light/50 dark:bg-dark/50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-primary/5 z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-block px-4 py-1 bg-primary/10 dark:bg-primary/20 rounded-full text-primary text-sm font-medium mb-4"
          >
            Nossa plataforma principal
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            FeitoChat - <span className="text-gradient">Atendimento Multicanal</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-dark/70 dark:text-light/70 max-w-2xl mx-auto text-lg"
          >
            Uma plataforma completa que unifica todos os seus canais de comunicação, potencializada por inteligência artificial para maximizar conversões.
          </motion.p>
        </motion.div>

        <div className="mb-12">
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-full">
              {tabs.map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(index)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === index
                      ? "bg-primary text-white"
                      : "text-dark/70 dark:text-light/70 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Visão geral */}
            {activeTab === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div className="order-2 lg:order-1">
                  <h3 className="text-2xl font-bold mb-6">
                    Revolucione seu atendimento com uma plataforma completa
                  </h3>
                  <ul className="space-y-6">
                    <motion.li 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="flex items-start group"
                    >
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">✓</span>
                      <div>
                        <h4 className="font-semibold text-lg text-gradient mb-1">Centralização dos canais de atendimento</h4>
                        <p className="text-dark/70 dark:text-light/70">Atenda clientes de WhatsApp, Instagram, Facebook, E-mail, Webchat, Telegram, entre outros, tudo em um só lugar.</p>
                      </div>
                    </motion.li>
                    <motion.li 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="flex items-start group"
                    >
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">✓</span>
                      <div>
                        <h4 className="font-semibold text-lg text-gradient mb-1">Gestão de equipes</h4>
                        <p className="text-dark/70 dark:text-light/70">Controle filas de atendimento, atribua conversas automaticamente e analise o desempenho de agentes.
Controle filas de atendimento, atribua conversas automaticamente e analise o desempenho de agentes.</p>
                      </div>
                    </motion.li>
                    <motion.li 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="flex items-start group"
                    >
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">✓</span>
                      <div>
                        <h4 className="font-semibold text-lg text-gradient mb-1">Operação 24/7</h4>
                        <p className="text-dark/70 dark:text-light/70">Mantenha seu atendimento funcionando mesmo fora do horário comercial com automações inteligentes.</p>
                      </div>
                    </motion.li>
                    <motion.li 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="flex items-start group"
                    >
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">✓</span>
                      <div>
                        <h4 className="font-semibold text-lg text-gradient mb-1">Relatórios e métricas</h4>
                        <p className="text-dark/70 dark:text-light/70">Dashboards detalhados de volume de atendimentos, tempo de resposta, satisfação dos clientes, etc.</p>
                      </div>
                    </motion.li>
                  </ul>
                </div>
                
                <div className="order-1 lg:order-2 relative">
                  <div className="absolute inset-0 bg-primary/10 dark:bg-primary/5 rounded-2xl blur-xl"></div>
                  <div className="relative bg-light dark:bg-dark border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    <div className="relative h-[400px] w-full">
                      <Image
                        src="/feitochat-dashboard.svg"
                        alt="Dashboard do FeitoChat"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Recursos */}
            {activeTab === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.id}
                      className="bg-light dark:bg-dark p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.1,
                        ease: [0.25, 0.1, 0.25, 1.0]
                      }}
                      whileHover={{ 
                        scale: 1.03,
                        boxShadow: "0 10px 25px -5px rgba(113, 96, 245, 0.2)"
                      }}
                    >
                      <motion.div 
                        className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mb-4"
                        whileHover={{ 
                          backgroundColor: "rgba(113, 96, 245, 0.3)",
                          rotate: [0, 5, -5, 0],
                          transition: { duration: 0.5 }
                        }}
                      >
                        <feature.icon className="w-6 h-6 text-primary" />
                      </motion.div>
                      <h3 className="text-lg font-bold mb-2">{feature.name}</h3>
                      <p className="text-dark/70 dark:text-light/70">
                        {feature.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-12 p-6 bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/20">
                  <h3 className="text-xl font-bold mb-4">Recursos adicionais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <span className="text-primary mr-2">✓</span>
                      <span>Pesquisas de satisfação</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-primary mr-2">✓</span>
                      <span>Segmentação de clientes</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-primary mr-2">✓</span>
                      <span>Sistema de protocolos</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-primary mr-2">✓</span>
                      <span>Funcionalidade CRM</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-primary mr-2">✓</span>
                      <span>Roteamento inteligente</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-primary mr-2">✓</span>
                      <span>Relatórios avançados</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Depoimentos */}
            {activeTab === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div className="bg-light dark:bg-dark p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mr-4"></div>
                    <div>
                      <h4 className="font-bold">Carlos Silva</h4>
                      <p className="text-sm text-dark/70 dark:text-light/70">CEO, TechSolutions</p>
                    </div>
                  </div>
                  <p className="text-dark/80 dark:text-light/80 mb-4">
                    "Desde que implementamos o FeitoChat, nossa taxa de conversão aumentou em 45%. A capacidade de atender clientes em múltiplos canais com uma equipe reduzida transformou completamente nosso negócio."
                  </p>
                  <div className="flex text-primary">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>
                </div>
                
                <div className="bg-light dark:bg-dark p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mr-4"></div>
                    <div>
                      <h4 className="font-bold">Ana Oliveira</h4>
                      <p className="text-sm text-dark/70 dark:text-light/70">Diretora de Marketing, E-Shop</p>
                    </div>
                  </div>
                  <p className="text-dark/80 dark:text-light/80 mb-4">
                    "A automação inteligente do FeitoChat nos permitiu escalar nosso atendimento sem aumentar custos. O ROI foi impressionante, com retorno do investimento em menos de 2 meses."
                  </p>
                  <div className="flex text-primary">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>
                </div>
                
                <div className="bg-light dark:bg-dark p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mr-4"></div>
                    <div>
                      <h4 className="font-bold">Marcelo Santos</h4>
                      <p className="text-sm text-dark/70 dark:text-light/70">Gerente de Suporte, FinTech</p>
                    </div>
                  </div>
                  <p className="text-dark/80 dark:text-light/80 mb-4">
                    "A integração com nossos sistemas existentes foi surpreendentemente fácil. A equipe da FeitoAI nos guiou em todo o processo e estávamos operacionais em menos de uma semana."
                  </p>
                  <div className="flex text-primary">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>
                </div>
                
                <div className="bg-light dark:bg-dark p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mr-4"></div>
                    <div>
                      <h4 className="font-bold">Juliana Costa</h4>
                      <p className="text-sm text-dark/70 dark:text-light/70">Proprietária, Boutique Online</p>
                    </div>
                  </div>
                  <p className="text-dark/80 dark:text-light/80 mb-4">
                    "Como pequena empresa, precisávamos de uma solução que crescesse conosco. O FeitoChat nos deu ferramentas de nível enterprise a um preço acessível, e o suporte é excepcional."
                  </p>
                  <div className="flex text-primary">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 dark:from-primary/30 dark:via-primary/20 dark:to-primary/30 rounded-2xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Pronto para transformar seu atendimento?
          </h3>
          <p className="text-dark/70 dark:text-light/70 max-w-2xl mx-auto mb-8">
            Agende uma demonstração personalizada e descubra como o FeitoChat pode revolucionar a comunicação com seus clientes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#contato"
              className="inline-flex items-center justify-center h-12 px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg shadow-primary/20 transition-all duration-300 transform hover:scale-105 font-medium"
            >
              Agendar demonstração
            </a>
            <a
              href="#precos"
              className="inline-flex items-center justify-center h-12 px-8 py-3 bg-transparent hover:bg-light dark:hover:bg-dark/50 text-dark dark:text-light border border-dark/10 dark:border-light/10 rounded-full transition-colors font-medium"
            >
              Ver planos e preços
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
