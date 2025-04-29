"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiCheck, FiInfo, FiArrowRight } from "react-icons/fi";
import { Tooltip } from "@/components/tooltip";

type PricingPlan = {
  name: string;
  description: string;
  price: {
    monthly: number;
    annually: number;
  };
  features: Array<{
    text: string;
    included: boolean;
    tooltip?: string;
  }>;
  cta: string;
  popular?: boolean;
};

const plans: PricingPlan[] = [
  {
    name: "Essencial ",
    description: "Ideal para startups e pequenos negócios que desejam automatizar o atendimento",
    price: {
      monthly: 197,
      annually: Math.round(197 * 12 * 0.85),
    },
    features: [
      { text: "FeitoChat (WhatsApp) configurado", included: true },
      { text: "1 Assistente digital Essencial no FeitoChat", included: true, tooltip: "Até 10 fluxos" },
      { text: "Integração com CRM para cadastro de leads", included: true },
      { text: "Treinamento rápido para equipe (vídeo)", included: true },
      { text: "Até 5 atendentes", included: true },
      { text: "Suporte básico", included: true },
    ],
    cta: "Começar agora",
  },
  {
    name: "Profissional",
    description: "Perfeito para empresas em expansão que buscam otimizar a experiência do cliente",
    price: {
      monthly: 497,
      annually: Math.round(497 * 12 * 0.85),
    },
    features: [
      { text: "Tudo do Plano Essencial", included: true },
      { text: "+1 automação de processo", included: true },
      { text: "+1 chatbot inteligente", included: true },
      { text: "20K conversas por mês", included: true, tooltip: "10M de tokens por mês" },
      { text: "Treinamento rápido para equipe (vídeo)", included: true },
      { text: "Até 10 atendentes", included: true },
      { text: "Suporte avançado", included: true },
    ],
    cta: "Escolher Profissional",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Solução premium com recursos avançados para otimizar sua empresa.",
    price: {
      monthly: 797,
      annually: Math.round(797 * 12 * 0.85),
    },
    features: [
      { text: "Tudo dos planos anteriores", included: true },
      { text: "Automações e bots ilimitados", included: true },
      { text: "Criação de Agentes de IA personalizados", included: true },
      { text: "Integrações específicas e complexas", included: true },
      { text: "Treinamento rápido para equipe (vídeo)", included: true },
      { text: "Implantação estratégica com time técnico dedicado", included: true },
      { text: "Suporte premium 24h", included: true },
    ],
    cta: "Agendar Consulta",
  },
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);
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

  return (
    <section
      id="precos"
      ref={ref}
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-light/0 via-primary/5 to-light/0 dark:from-dark/0 dark:via-primary/5 dark:to-dark/0"></div>

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
            Planos <span className="text-gradient">Flexíveis</span> para o seu Negócio
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-dark/70 dark:text-light/70 max-w-2xl mx-auto text-lg"
          >
            Escolha o plano ideal para as necessidades da sua empresa, com preços transparentes e sem surpresas.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center mt-8"
          >
            <span
              className={`mr-3 ${
                !isAnnual ? "text-dark dark:text-light" : "text-dark/50 dark:text-light/50"
              }`}
            >
              Mensal
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-12 items-center rounded-full bg-gray-200 dark:bg-gray-700"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-primary transition-transform ${
                  isAnnual ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`ml-3 flex items-center ${
                isAnnual ? "text-dark dark:text-light" : "text-dark/50 dark:text-light/50"
              }`}
            >
              Anual
              <span className="ml-2 inline-flex items-center rounded-full bg-green-100 dark:bg-green-900 px-2 py-0.5 text-xs font-medium text-green-800 dark:text-green-200">
                Economize 15%
              </span>
            </span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {plans.map((plan, index) => {
            // Determine the order for each plan
            let orderClass = "";
            if (plan.name === "Básico") orderClass = "md:order-1";
            if (plan.name === "Profissional") orderClass = "md:order-2";
            if (plan.name === "Empresarial") orderClass = "md:order-3";
            
            return (
              <motion.div
                key={plan.name}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className={`relative rounded-2xl overflow-hidden border h-full flex flex-col md:order-${
                  plan.popular ? "2" : index === 0 ? "1" : "3"
                } ${
                  plan.popular
                    ? "border-primary shadow-2xl shadow-primary/30 z-10"
                    : "border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-shadow duration-300"
                }`}
                whileHover={{
                  y: -10,
                  boxShadow: plan.popular 
                    ? "0 25px 50px -12px rgba(113, 96, 245, 0.35)" 
                    : "0 25px 50px -12px rgba(113, 96, 245, 0.15)",
                  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
              >
                {plan.popular && (
                  <>
                    <div className="absolute -inset-[2px] bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30 rounded-2xl animate-gradient-x -z-10"></div>
                    <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-sm font-medium rounded-bl-lg z-10">
                      Mais popular
                    </div>
                  </>
                )}
                {plan.name === "Empresarial" && (
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40 rounded-2xl animate-gradient-x -z-10"></div>
                )}
                <div
                  className={`p-6 ${
                    plan.popular
                      ? "bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10"
                      : "bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
                  }`}
                >
                  <h3 className="text-xl font-bold mb-1 flex items-center justify-start text-left w-full">
                    {plan.name}
                    {(plan.name === "Enterprise" || plan.name === "Empresarial") && (
                      <>
                        <span className="hidden md:inline-flex items-center ml-2">
                          <Tooltip content="Valor final sob consulta personalizada" position="top">
                            <span className="cursor-pointer text-primary flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path stroke="currentColor" strokeWidth="2" d="M12 8v4m0 4h.01"/></svg>
                            </span>
                          </Tooltip>
                        </span>
                        <span className="block md:hidden text-xs text-dark/60 dark:text-light/60 text-center w-full mt-1">Valor final sob consulta personalizada</span>
                      </>
                    )}
                  </h3>
                  <p className="text-dark/70 dark:text-light/70 text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    {plan.name === "Enterprise" || plan.name === "Empresarial" ? (
                      <div className="w-full flex flex-col items-center justify-center text-center">
                        <span className="flex flex-row items-end justify-center w-full">
                          <span className="text-4xl font-bold">A partir de R$797</span>
                          <span className="text-dark/70 dark:text-light/70 ml-1">/mês</span>
                        </span>
                        <span className="block md:hidden text-xs text-dark/60 dark:text-light/60 text-center w-full mt-1">Valor final sob consulta personalizada</span>
                      </div>
                    ) : (
                      (() => {
                        const annualValue = +(plan.price.monthly * 12 * 0.85).toFixed(2);
                        const monthlyAnnual = +(annualValue / 12).toFixed(2);
                        return (
                          <>
                            <span className="text-4xl font-bold">
                              R${isAnnual ? monthlyAnnual : plan.price.monthly}
                            </span>
                            <span className="text-dark/70 dark:text-light/70 ml-1">
                              /mês
                            </span>
                            {isAnnual && (
                              <p className="text-sm text-dark/60 dark:text-light/60 mt-1">
                                Faturado anualmente como R${annualValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </p>
                            )}
                          </>
                        );
                      })()
                    )}
                  </div>
                  {["Essencial ", "Profissional"].includes(plan.name) ? (
  <a
    href={`/contratar-plano?plano=${plan.name.toLowerCase().trim()}&periodicidade=${isAnnual ? 'anual' : 'mensal'}`}
    className={`w-full block h-12 py-0 px-8 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 button-hover-effect text-center flex items-center justify-center leading-none ${
      plan.popular
        ? "bg-gradient-to-r from-primary via-primary-light to-primary text-white shadow-2xl shadow-primary/20 bg-size-200 bg-pos-0 hover:bg-pos-100"
        : "bg-white dark:bg-gray-800 border border-primary/50 text-primary hover:bg-primary/10 dark:hover:bg-primary/10"
    }`}
  >
    {plan.cta}
  </a>
) : (
  <button
    className="w-full h-12 py-0 px-8 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 button-hover-effect text-center flex items-center justify-center leading-none bg-white dark:bg-gray-800 border border-primary/50 text-primary hover:bg-primary/10 dark:hover:bg-primary/10"
  >
    {plan.cta}
  </button>
)}
                </div>
                <div className={`p-6 border-t border-gray-200 dark:border-gray-800 flex-grow ${
                  plan.popular
                    ? "bg-white dark:bg-gray-800"
                    : "bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
                }`}>
                  <h4 className="font-medium mb-4">Inclui:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start text-sm"
                      >
                        <span
                          className={`mr-2 mt-0.5 ${
                            feature.included
                              ? "text-green-500"
                              : "text-gray-400 dark:text-gray-600"
                          }`}
                        >
                          {feature.included ? (
                            <FiCheck className="w-4 h-4" />
                          ) : (
                            "×"
                          )}
                        </span>
                        <span
                          className={
                            feature.included
                              ? "text-dark/80 dark:text-light/80"
                              : "text-dark/50 dark:text-light/50 line-through"
                          }
                        >
                          {feature.text}
                        </span>
                        {feature.tooltip && (
                          <Tooltip content={feature.tooltip}>
                            <div className="inline-flex items-center justify-center w-5 h-5 ml-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                              <FiInfo className="w-3.5 h-3.5 text-primary" />
                            </div>
                      <>{(plan.name === "Enterprise" || plan.name === "Empresarial") && (
                        <div className="w-full flex flex-col items-center mt-1">
                          <span className="hidden md:inline-flex items-center text-xs text-dark/60 dark:text-light/60">
                            <Tooltip content="Valor final sob consulta personalizada" position="top">
                              <span className="cursor-pointer text-primary ml-1 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path stroke="currentColor" strokeWidth="2" d="M12 8v4m0 4h.01"/></svg>
                                <span className="ml-1">Valor final sob consulta personalizada</span>
                              </span>
                            </Tooltip>
                          </span>
                          <span className="block md:hidden text-xs text-dark/60 dark:text-light/60 text-center">Valor final sob consulta personalizada</span>
                        </div>
                      )}</>
                          </Tooltip>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <p className="text-dark/70 dark:text-light/70 mb-4">
            Precisa de um plano personalizado para sua empresa?
          </p>
          <a
            href="#contato"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary via-primary-light to-primary text-white font-medium rounded-full shadow-2xl shadow-primary/20 transition-all duration-300 transform hover:scale-105 button-hover-effect bg-size-200 bg-pos-0 hover:bg-pos-100"
          >
            Fale com nossa equipe <FiArrowRight className="ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
