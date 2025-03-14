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
    name: "Básico",
    description: "Ideal para startups e pequenos negócios que desejam automatizar o atendimento",
    price: {
      monthly: 197,
      annually: 1970,
    },
    features: [
      { text: "Até 500 conversas/mês", included: true },
      { text: "Chatbot personalizado", included: true },
      { text: "Integração WhatsApp", included: true },
      { text: "1 canal de atendimento", included: true },
      { text: "Automações básicas", included: true },
      { text: "Relatórios simples", included: true },
      { text: "Suporte por e-mail", included: true },
      { text: "CRM básico", included: true },
      { text: "Integrações limitadas", included: false, tooltip: "Até 2 integrações com outras plataformas" },
      { text: "Atendentes ilimitados", included: false },
    ],
    cta: "Começar agora",
  },
  {
    name: "Profissional",
    description: "Perfeito para empresas em expansão que buscam otimizar a experiência do cliente",
    price: {
      monthly: 397,
      annually: 3970,
    },
    features: [
      { text: "Até 2000 conversas/mês", included: true },
      { text: "Chatbot com IA avançada", included: true },
      { text: "Multicanal (4 canais)", included: true, tooltip: "WhatsApp, Instagram, Facebook e Telegram" },
      { text: "Automações avançadas", included: true },
      { text: "Dashboards personalizados", included: true },
      { text: "Suporte prioritário", included: true },
      { text: "CRM completo", included: true },
      { text: "Integrações avançadas", included: true, tooltip: "Até 10 integrações com outras plataformas" },
      { text: "Atendentes ilimitados", included: true },
      { text: "API para desenvolvedores", included: true },
    ],
    cta: "Escolher Profissional",
    popular: true,
  },
  {
    name: "Empresarial",
    description: "Solução premium com recursos avançados para otimizar sua empresa.",
    price: {
      monthly: 997,
      annually: 9970,
    },
    features: [
      { text: "Conversas ilimitadas", included: true },
      { text: "IA personalizada", included: true, tooltip: "IA treinada com dados da sua empresa" },
      { text: "Todos os canais", included: true },
      { text: "Automações ilimitadas", included: true },
      { text: "Análise avançada de dados", included: true },
      { text: "Suporte 24/7 dedicado", included: true },
      { text: "CRM Enterprise", included: true },
      { text: "Integrações ilimitadas", included: true },
      { text: "Ambiente dedicado", included: true },
      { text: "Consultoria estratégica", included: true },
    ],
    cta: "Falar com consultor",
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
                Economize 20%
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
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-dark/70 dark:text-light/70 text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      R${isAnnual ? (plan.price.annually / 12).toFixed(0) : plan.price.monthly}
                    </span>
                    <span className="text-dark/70 dark:text-light/70 ml-1">
                      /mês
                    </span>
                    {isAnnual && (
                      <p className="text-sm text-dark/60 dark:text-light/60 mt-1">
                        Faturado anualmente como R${plan.price.annually}
                      </p>
                    )}
                  </div>
                  <button
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 button-hover-effect ${
                      plan.popular
                        ? "bg-gradient-to-r from-primary via-primary-light to-primary text-white shadow-2xl shadow-primary/20 bg-size-200 bg-pos-0 hover:bg-pos-100"
                        : "bg-white dark:bg-gray-800 border border-primary/50 text-primary hover:bg-primary/10 dark:hover:bg-primary/10"
                    }`}
                  >
                    {plan.cta}
                  </button>
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
