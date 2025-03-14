"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    id: "business-help",
    question: "Como a FeitoAI pode ajudar o meu negócio?",
    answer: "Podemos economizar centenas de horas de trabalho manual para sua equipe, automatizando tarefas repetitivas e tediosas, como prospecção outbound, atendimento ao cliente e criação de conteúdo. Ao implementar essas soluções, não apenas aumentamos a eficiência, mas também liberamos sua equipe para se concentrar em atividades mais estratégicas e criativas, gerando resultados ainda mais impactantes para o seu negócio."
  },
  {
    id: "project-time",
    question: "Quanto tempo leva para criar meu projeto?",
    answer: "Normalmente, nossas soluções são totalmente implementadas em até 7 dias, englobando todo o processo de desenvolvimento e integração. Com uma abordagem ágil e eficiente, garantimos que sua equipe possa começar a se beneficiar das melhorias rapidamente, sem comprometer a qualidade ou a precisão das entregas."
  },
  {
    id: "guarantee",
    question: "Qual a minha garantia?",
    answer: "Oferecemos 30 dias de garantia após a implementação da sua solução de IA, com reembolso total caso você não esteja completamente satisfeito com os resultados obtidos. Queremos garantir que sua experiência seja positiva e que os benefícios da nossa solução atendam plenamente às suas expectativas."
  },
  {
    id: "solution-creation",
    question: "Como vocês criam suas Soluções?",
    answer: "Nós passamos pelo processo de planejamento e escopo do projeto com nosso time de desenvolvedores profissionais e levamos o projeto para plataformas de integração de sistemas & AI, como make.com, n8n."
  },
  {
    id: "communication",
    question: "Como nos comunicamos?",
    answer: "Para a maioria das empresas, nossa comunicação será feita diretamente pelo WhatsApp. Além disso, oferecemos suporte contínuo para acompanhar atualizações, resolver possíveis gargalos e garantir que o progresso esteja sempre em linha com os objetivos estabelecidos."
  },
  {
    id: "error-handling",
    question: "E se algo der errado com a automação?",
    answer: "Seremos notificados imediatamente sempre que ocorrer algum problema no sistema e resolveremos rapidamente, garantindo que a operação continue funcionando sem interrupções."
  },
  {
    id: "technical-knowledge",
    question: "Preciso de conhecimentos técnicos para usar os sistemas automatizados?",
    answer: "Nós temos um processo de entrega transparente que instrui o seu time a utilizar os sistemas que entregamos, sem precisar saber programar ou investir dezenas de horas para aprender novas ferramentas."
  }
];

export function FAQSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const toggleQuestion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="faq"
      ref={ref}
      className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5 dark:opacity-10 z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16 space-y-6"
          >
            <div className="inline-flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full blur-xl bg-gradient-to-r from-primary/30 via-purple-500/30 to-primary-light/30 opacity-70 animate-pulse"></div>
                <div className="relative bg-white dark:bg-gray-900 rounded-full px-4 py-1.5 text-xs font-medium text-primary border border-primary/20">
                  FAQ
                </div>
              </div>
            </div>
            
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Perguntas <span className="text-gradient">Frequentes</span>
            </motion.h2>
            
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Encontre respostas para as dúvidas mais comuns sobre nossos serviços e como podemos ajudar o seu negócio.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-100/30 dark:border-gray-700/30 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="flex justify-between items-center w-full p-6 text-left"
                  >
                    <h3 className="font-medium text-lg text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors duration-300">
                      {item.question}
                    </h3>
                    <span className="ml-4 flex-shrink-0 p-2 rounded-full bg-gradient-to-r from-primary/10 to-primary-light/10 text-primary transform transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-primary/10">
                      {expandedIndex === index ? (
                        <FiChevronUp className="w-5 h-5" />
                      ) : (
                        <FiChevronDown className="w-5 h-5" />
                      )}
                    </span>
                  </button>
                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 text-gray-700 dark:text-gray-300">
                          <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-4"></div>
                          <p>{item.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="relative inline-block">
              <div className="absolute -inset-1 rounded-full blur-md bg-gradient-to-r from-primary/30 via-purple-500/30 to-primary-light/30 opacity-70"></div>
              <a
                href="#contato"
                className="relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary via-primary-light to-primary text-white font-medium rounded-full shadow-lg shadow-primary/20 transition-all duration-300 transform hover:scale-105 bg-size-200 bg-pos-0 hover:bg-pos-100 group"
              >
                <span className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-primary-light via-primary to-primary-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-size-200 animate-gradient-x"></span>
                <span className="relative z-10 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Fale conosco
                </span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
