"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiCheck, FiDownload, FiMessageCircle, FiZap, FiClock, FiBarChart2, FiArrowRight, FiTrendingUp, FiStar } from "react-icons/fi";
import Link from "next/link";

// Novo componente para realçar os benefícios da IA
const AIBenefits = () => (
  <div className="bg-gradient-to-br from-primary/5 to-primary/20 rounded-xl p-5 border border-primary/20 mb-8">
    <h3 className="text-lg font-semibold mb-4 flex items-center text-primary">
      <FiStar className="mr-2" />
      Vantagens Exclusivas do FeitoAI
    </h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-start p-3 bg-white/90 dark:bg-gray-800/50 rounded-lg">
        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3">
          <FiClock className="text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h4 className="text-sm font-medium">Resposta Instantânea</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            IA avançada com respostas em tempo real para seus clientes
          </p>
        </div>
      </div>

      <div className="flex items-start p-3 bg-white/90 dark:bg-gray-800/50 rounded-lg">
        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
          <FiBarChart2 className="text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h4 className="text-sm font-medium">Otimização Contínua</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
          Soluções inteligentes que se adaptam e evoluem a cada interação
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Componente para mostrar comparação antes/depois
const ComparisonBadge = ({ label, current, aiEnhanced }: { label: string; current: number; aiEnhanced: number }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
      <div className="flex items-center">
        <span className="text-xs line-through mr-2 text-red-500">R$ {current}</span>
        <span className="text-sm font-semibold text-green-600">R$ {aiEnhanced}</span>
      </div>
    </div>
    <div className="relative pt-2">
      <div className="overflow-hidden h-2 text-xs flex rounded bg-red-100">
        <div style={{ width: `${(current / (current + aiEnhanced)) * 100}%` }} 
             className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
      </div>
      <div className="overflow-hidden h-2 text-xs flex rounded bg-green-100 mt-1">
        <div style={{ width: `${(aiEnhanced / (current + aiEnhanced)) * 100}%` }} 
             className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
      </div>
    </div>
  </div>
);

export function ROICalculatorCopy() {
  const [investment, setInvestment] = useState(397);
  const [currentConversionRate, setCurrentConversionRate] = useState(3);
  const [averageRevenue, setAverageRevenue] = useState(500);
  const [monthlyLeads, setMonthlyLeads] = useState(100);
  
  // Results
  const [roi, setRoi] = useState(0);
  const [revenueIncrease, setRevenueIncrease] = useState(0);
  const [paybackPeriod, setPaybackPeriod] = useState(0);
  const [conversionIncrease, setConversionIncrease] = useState(0);
  
  // UI states
  const [isDownloading, setIsDownloading] = useState(false);
  const [isContacting, setIsContacting] = useState(false);
  
  // Animation refs
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0], // Cubic bezier for smoother motion
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  // ... [manter estados anteriores]

  // Adicionar novos estados para comparação
  const [currentCosts, setCurrentCosts] = useState(0);
  const [aiCosts, setAiCosts] = useState(0);

  // Função para formatar porcentagem no formato xx.xx%
  const formatPercentage = (value: number) => {
    return value.toFixed(2).replace(',', '.') + '%';
  };

  // Função para formatar ROI com exatamente dois dígitos antes e dois depois do ponto
  const formatROI = (value: number) => {
    // Extrair apenas os dois primeiros dígitos antes do ponto decimal
    const integerPart = Math.floor(value);
    const twoDigitInteger = integerPart % 100;
    
    // Formatar para ter dois dígitos antes do ponto
    const formattedValue = twoDigitInteger < 10 
      ? '0' + twoDigitInteger.toString() + '.' + value.toFixed(2).split('.')[1]
      : twoDigitInteger.toString() + '.' + value.toFixed(2).split('.')[1];
    
    return formattedValue + '%';
  };

  useEffect(() => {
    // Cálculos básicos
    const currentConversionRateDecimal = currentConversionRate / 100;
    const currentLeadsConverted = monthlyLeads * currentConversionRateDecimal;
    const currentMonthlyRevenue = currentLeadsConverted * averageRevenue;
    
    // Calculando o aumento de receita com IA (assumindo um aumento na taxa de conversão)
    const aiConversionRateIncrease = 0.5; // 50% de aumento na conversão com IA
    const aiConversionRate = currentConversionRateDecimal * (1 + aiConversionRateIncrease);
    const aiLeadsConverted = monthlyLeads * aiConversionRate;
    const aiMonthlyRevenue = aiLeadsConverted * averageRevenue;
    
    // Calculando o aumento de receita mensal
    const monthlyRevenueIncrease = aiMonthlyRevenue - currentMonthlyRevenue;
    const annualRevenueIncrease = monthlyRevenueIncrease * 12;
    
    // Cálculo do ROI
    const roiValue = (annualRevenueIncrease / investment) * 100;
    console.log("ROI calculado:", roiValue); // Log para debug
    
    // Cálculo do período de payback (em meses)
    const paybackPeriodValue = investment / monthlyRevenueIncrease;
    
    // Cálculo do aumento percentual na conversão
    const conversionIncreaseValue = aiConversionRateIncrease * 100;
    
    // Atualização dos estados
    setRoi(roiValue);
    setRevenueIncrease(monthlyRevenueIncrease);
    setPaybackPeriod(paybackPeriodValue);
    setConversionIncrease(conversionIncreaseValue);
    
    // Custos de atendimento
    const currentCostPerLead = 5; // R$ por lead
    const aiCostPerLead = 2; // R$ por lead com IA
    setCurrentCosts(monthlyLeads * currentCostPerLead);
    setAiCosts(monthlyLeads * aiCostPerLead);
  }, [investment, currentConversionRate, averageRevenue, monthlyLeads]);

  return (
    <section 
      id="roi-calculator-copy"
      ref={ref} 
      className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden"
    >
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 6 }, (_, i) => `particle-${i}`).map((key, i) => {
          // Use deterministic positions based on index instead of random values
          const topPosition = 10 + (i * 15) % 80;
          const leftPosition = 15 + (i * 17) % 70;
          const xOffset = 10 + (i * 5);
          const yOffset = 10 + (i * 3);
          
          return (
            <motion.div
              key={key}
              className="absolute w-2 h-2 rounded-full bg-primary/30 dark:bg-primary/40"
              style={{
                top: `${topPosition}%`,
                left: `${leftPosition}%`,
              }}
              animate={{
                x: [0, xOffset, 0],
                y: [0, yOffset, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      <div className="container mx-auto px-6">
        <motion.div className="max-w-6xl mx-auto">
          <motion.div 
            variants={itemVariants} 
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative text-gray-900 dark:text-white">
              <div className="absolute -left-6 -top-6 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
              Calcule seu <span className="text-gradient">
                ROI
              </span> com FeitoAI
            </h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Descubra quanto sua empresa pode economizar e aumentar suas vendas com nossa solução de atendimento inteligente.
            </p>
          </motion.div>

          <AIBenefits />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Seção de Parâmetros */}
            <div className="lg:col-span-5">
              {/* Adicionar tooltips explicativos */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 opacity-20 blur transition duration-1000 group-hover:opacity-40"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6">
                  <h4 className="flex items-center text-lg font-semibold mb-4">
                    <FiZap className="mr-2 text-primary" />
                    Simulador de Eficiência com IA
                  </h4>
                  
                  {/* Investment Input */}
                  <div className="bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-800/40 dark:to-gray-800/20 rounded-2xl p-5 shadow-sm border border-gray-100/30 dark:border-gray-700/30 backdrop-blur-sm hover:shadow-md transition-all duration-300 group mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-sm font-medium flex items-center">
                        <span className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center mr-3 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
                          <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        <span className="text-gray-700 dark:text-gray-300 group-hover:text-primary transition-all duration-300">
                          Investimento Mensal
                        </span>
                      </label>
                      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-primary-dark/5 to-primary/10 px-4 py-1.5 shadow-sm">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary-light/30 blur-md opacity-30"></div>
                        <div className="absolute inset-0 bg-white/90 dark:bg-gray-800/90"></div>
                        <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-primary to-primary-light"></div>
                        <span className="relative z-10 font-semibold text-lg text-primary whitespace-nowrap">R$ {investment}</span>
                      </div>
                    </div>
                    <div className="relative mt-2 mx-2">
                      <div className="absolute inset-0 rounded-full h-2 overflow-hidden">
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/50 to-primary/70 h-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(investment - 97) / 9}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                      <input
                        type="range"
                        min="97"
                        max="997"
                        step="100"
                        className="w-full h-2 bg-gray-200/50 dark:bg-gray-700/30 rounded-full appearance-none cursor-pointer relative z-10 
                        slider-thumb 
                        [&::-webkit-slider-thumb]:appearance-none 
                        [&::-webkit-slider-thumb]:h-5 
                        [&::-webkit-slider-thumb]:w-5 
                        [&::-webkit-slider-thumb]:rounded-full 
                        [&::-webkit-slider-thumb]:bg-gradient-to-br 
                        [&::-webkit-slider-thumb]:from-primary 
                        [&::-webkit-slider-thumb]:to-primary-light 
                        [&::-webkit-slider-thumb]:shadow-md 
                        [&::-webkit-slider-thumb]:cursor-pointer 
                        [&::-webkit-slider-thumb]:transition-all 
                        [&::-webkit-slider-thumb]:duration-300
                        [&::-webkit-slider-thumb]:hover:scale-110
                        [&::-webkit-slider-thumb]:hover:shadow-lg
                        [&::-webkit-slider-thumb]:hover:shadow-primary/20
                        [&::-moz-range-thumb]:appearance-none 
                        [&::-moz-range-thumb]:h-5 
                        [&::-moz-range-thumb]:w-5 
                        [&::-moz-range-thumb]:border-0
                        [&::-moz-range-thumb]:rounded-full 
                        [&::-moz-range-thumb]:bg-gradient-to-br 
                        [&::-moz-range-thumb]:from-primary 
                        [&::-moz-range-thumb]:to-primary-light 
                        [&::-moz-range-thumb]:shadow-md 
                        [&::-moz-range-thumb]:cursor-pointer 
                        [&::-moz-range-thumb]:transition-all 
                        [&::-moz-range-thumb]:duration-300
                        [&::-moz-range-thumb]:hover:scale-110
                        [&::-moz-range-thumb]:hover:shadow-lg
                        [&::-moz-range-thumb]:hover:shadow-primary/20"
                        value={investment}
                        onChange={(e) => setInvestment(Number(e.target.value))}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2 px-2">
                      <span>R$ 97</span>
                      <span>R$ 997</span>
                    </div>
                  </div>

                  {/* Conversion Rate Input */}
                  <div className="bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-800/40 dark:to-gray-800/20 rounded-2xl p-5 shadow-sm border border-gray-100/30 dark:border-gray-700/30 backdrop-blur-sm hover:shadow-md transition-all duration-300 group mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-sm font-medium flex items-center">
                        <span className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/40 flex items-center justify-center mr-3 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
                          <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </span>
                        <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-400 transition-all duration-300">
                          Taxa de Conversão Atual
                        </span>
                      </label>
                      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-400/5 to-blue-600/10 px-4 py-1.5 shadow-sm">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-blue-600/30 blur-md opacity-30"></div>
                        <div className="absolute inset-0 bg-white/90 dark:bg-gray-800/90"></div>
                        <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-blue-400 to-blue-600"></div>
                        <span className="relative z-10 font-semibold text-lg text-blue-500 whitespace-nowrap">{currentConversionRate}%</span>
                      </div>
                    </div>
                    <div className="relative mt-2 mx-2">
                      <div className="absolute inset-0 rounded-full h-2 overflow-hidden">
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-blue-500/50 to-blue-600/70 h-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(currentConversionRate - 1) / 0.09}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        step="0.5"
                        className="w-full h-2 bg-gray-200/50 dark:bg-gray-700/30 rounded-full appearance-none cursor-pointer relative z-10 
                        slider-thumb 
                        [&::-webkit-slider-thumb]:appearance-none 
                        [&::-webkit-slider-thumb]:h-5 
                        [&::-webkit-slider-thumb]:w-5 
                        [&::-webkit-slider-thumb]:rounded-full 
                        [&::-webkit-slider-thumb]:bg-gradient-to-br 
                        [&::-webkit-slider-thumb]:from-blue-400 
                        [&::-webkit-slider-thumb]:to-blue-600 
                        [&::-webkit-slider-thumb]:shadow-md 
                        [&::-webkit-slider-thumb]:cursor-pointer 
                        [&::-webkit-slider-thumb]:transition-all 
                        [&::-webkit-slider-thumb]:duration-300
                        [&::-webkit-slider-thumb]:hover:scale-110
                        [&::-webkit-slider-thumb]:hover:shadow-lg
                        [&::-webkit-slider-thumb]:hover:shadow-blue-500/20
                        [&::-moz-range-thumb]:appearance-none 
                        [&::-moz-range-thumb]:h-5 
                        [&::-moz-range-thumb]:w-5 
                        [&::-moz-range-thumb]:border-0
                        [&::-moz-range-thumb]:rounded-full 
                        [&::-moz-range-thumb]:bg-gradient-to-br 
                        [&::-moz-range-thumb]:from-blue-400 
                        [&::-moz-range-thumb]:to-blue-600 
                        [&::-moz-range-thumb]:shadow-md 
                        [&::-moz-range-thumb]:cursor-pointer 
                        [&::-moz-range-thumb]:transition-all 
                        [&::-moz-range-thumb]:duration-300
                        [&::-moz-range-thumb]:hover:scale-110
                        [&::-moz-range-thumb]:hover:shadow-lg
                        [&::-moz-range-thumb]:hover:shadow-blue-500/20"
                        value={currentConversionRate}
                        onChange={(e) => setCurrentConversionRate(Number(e.target.value))}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2 px-2">
                      <span>1%</span>
                      <span>10%</span>
                    </div>
                  </div>
                  
                  {/* Average Revenue Input */}
                  <div className="bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-800/40 dark:to-gray-800/20 rounded-2xl p-5 shadow-sm border border-gray-100/30 dark:border-gray-700/30 backdrop-blur-sm hover:shadow-md transition-all duration-300 group mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-sm font-medium flex items-center">
                        <span className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400/20 to-green-600/40 flex items-center justify-center mr-3 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
                          <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                          </svg>
                        </span>
                        <span className="text-gray-700 dark:text-gray-300 group-hover:text-green-400 transition-all duration-300">
                          Receita Média por Cliente
                        </span>
                      </label>
                      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-green-400/5 to-green-600/10 px-4 py-1.5 shadow-sm">
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-400/20 to-green-600/30 blur-md opacity-30"></div>
                        <div className="absolute inset-0 bg-white/90 dark:bg-gray-800/90"></div>
                        <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-green-400 to-green-600"></div>
                        <span className="relative z-10 font-semibold text-lg text-green-500 whitespace-nowrap">R$ {averageRevenue}</span>
                      </div>
                    </div>
                    <div className="relative mt-2 mx-2">
                      <div className="absolute inset-0 rounded-full h-2 overflow-hidden">
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-green-400/30 via-green-500/50 to-green-600/70 h-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(averageRevenue - 100) / 9}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="1000"
                        step="50"
                        className="w-full h-2 bg-gray-200/50 dark:bg-gray-700/30 rounded-full appearance-none cursor-pointer relative z-10 
                        slider-thumb 
                        [&::-webkit-slider-thumb]:appearance-none 
                        [&::-webkit-slider-thumb]:h-5 
                        [&::-webkit-slider-thumb]:w-5 
                        [&::-webkit-slider-thumb]:rounded-full 
                        [&::-webkit-slider-thumb]:bg-gradient-to-br 
                        [&::-webkit-slider-thumb]:from-green-400 
                        [&::-webkit-slider-thumb]:to-green-600 
                        [&::-webkit-slider-thumb]:shadow-md 
                        [&::-webkit-slider-thumb]:cursor-pointer 
                        [&::-webkit-slider-thumb]:transition-all 
                        [&::-webkit-slider-thumb]:duration-300
                        [&::-webkit-slider-thumb]:hover:scale-110
                        [&::-webkit-slider-thumb]:hover:shadow-lg
                        [&::-webkit-slider-thumb]:hover:shadow-green-500/20
                        [&::-moz-range-thumb]:appearance-none 
                        [&::-moz-range-thumb]:h-5 
                        [&::-moz-range-thumb]:w-5 
                        [&::-moz-range-thumb]:border-0
                        [&::-moz-range-thumb]:rounded-full 
                        [&::-moz-range-thumb]:bg-gradient-to-br 
                        [&::-moz-range-thumb]:from-green-400 
                        [&::-moz-range-thumb]:to-green-600 
                        [&::-moz-range-thumb]:shadow-md 
                        [&::-moz-range-thumb]:cursor-pointer 
                        [&::-moz-range-thumb]:transition-all 
                        [&::-moz-range-thumb]:duration-300
                        [&::-moz-range-thumb]:hover:scale-110
                        [&::-moz-range-thumb]:hover:shadow-lg
                        [&::-moz-range-thumb]:hover:shadow-green-500/20"
                        value={averageRevenue}
                        onChange={(e) => setAverageRevenue(Number(e.target.value))}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2 px-2">
                      <span>R$ 100</span>
                      <span>R$ 1000</span>
                    </div>
                  </div>
                  
                  {/* Monthly Leads Input */}
                  <div className="bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-800/40 dark:to-gray-800/20 rounded-2xl p-5 shadow-sm border border-gray-100/30 dark:border-gray-700/30 backdrop-blur-sm hover:shadow-md transition-all duration-300 group mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-sm font-medium flex items-center">
                        <span className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400/20 to-purple-600/40 flex items-center justify-center mr-3 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
                          <svg className="w-3.5 h-3.5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                        <span className="text-gray-700 dark:text-gray-300 group-hover:text-purple-400 transition-all duration-300">
                          Leads Mensais
                        </span>
                      </label>
                      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-400/5 to-purple-600/10 px-4 py-1.5 shadow-sm">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/20 to-purple-600/30 blur-md opacity-30"></div>
                        <div className="absolute inset-0 bg-white/90 dark:bg-gray-800/90"></div>
                        <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-purple-400 to-purple-600"></div>
                        <span className="relative z-10 font-semibold text-lg text-purple-500 whitespace-nowrap">{monthlyLeads}</span>
                      </div>
                    </div>
                    <div className="relative mt-2 mx-2">
                      <div className="absolute inset-0 rounded-full h-2 overflow-hidden">
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-purple-400/30 via-purple-500/50 to-purple-600/70 h-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(monthlyLeads - 50) / 4.5}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="500"
                        step="10"
                        className="w-full h-2 bg-gray-200/50 dark:bg-gray-700/30 rounded-full appearance-none cursor-pointer relative z-10 
                        slider-thumb 
                        [&::-webkit-slider-thumb]:appearance-none 
                        [&::-webkit-slider-thumb]:h-5 
                        [&::-webkit-slider-thumb]:w-5 
                        [&::-webkit-slider-thumb]:rounded-full 
                        [&::-webkit-slider-thumb]:bg-gradient-to-br 
                        [&::-webkit-slider-thumb]:from-purple-400 
                        [&::-webkit-slider-thumb]:to-purple-600 
                        [&::-webkit-slider-thumb]:shadow-md 
                        [&::-webkit-slider-thumb]:cursor-pointer 
                        [&::-webkit-slider-thumb]:transition-all 
                        [&::-webkit-slider-thumb]:duration-300
                        [&::-webkit-slider-thumb]:hover:scale-110
                        [&::-webkit-slider-thumb]:hover:shadow-lg
                        [&::-webkit-slider-thumb]:hover:shadow-purple-500/20
                        [&::-moz-range-thumb]:appearance-none 
                        [&::-moz-range-thumb]:h-5 
                        [&::-moz-range-thumb]:w-5 
                        [&::-moz-range-thumb]:border-0
                        [&::-moz-range-thumb]:rounded-full 
                        [&::-moz-range-thumb]:bg-gradient-to-br 
                        [&::-moz-range-thumb]:from-purple-400 
                        [&::-moz-range-thumb]:to-purple-600 
                        [&::-moz-range-thumb]:shadow-md 
                        [&::-moz-range-thumb]:cursor-pointer 
                        [&::-moz-range-thumb]:transition-all 
                        [&::-moz-range-thumb]:duration-300
                        [&::-moz-range-thumb]:hover:scale-110
                        [&::-moz-range-thumb]:hover:shadow-lg
                        [&::-moz-range-thumb]:hover:shadow-purple-500/20"
                        value={monthlyLeads}
                        onChange={(e) => setMonthlyLeads(Number(e.target.value))}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2 px-2">
                      <span>50</span>
                      <span>500</span>
                    </div>
                  </div>
                  
                  <ComparisonBadge 
                    label="Custo Mensal de Atendimento" 
                    current={currentCosts}
                    aiEnhanced={aiCosts}
                  />
                </div>
              </div>
            </div>

            {/* Seção de Resultados */}
            <div className="lg:col-span-7">
              <div className="relative group h-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 opacity-0 blur transition duration-1000 group-hover:opacity-40"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 h-full flex flex-col bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-800/40 dark:to-gray-800/20 shadow-sm border border-gray-100/30 dark:border-gray-700/30 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                  <h4 className="flex items-center text-lg font-semibold mb-6">
                    <FiBarChart2 className="mr-2 text-primary" />
                    Resultados da Implementação de IA
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                    {/* ROI Card */}
                    <div className="bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-800/40 dark:to-gray-800/20 rounded-2xl p-5 shadow-sm border border-gray-100/30 dark:border-gray-700/30 backdrop-blur-sm hover:shadow-md transition-all duration-300 group">
                      <div className="flex items-center mb-4">
                        <span className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center mr-3 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
                          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                        <h5 className="text-base font-medium text-gray-700 dark:text-gray-300">ROI Anual</h5>
                      </div>
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary-light/30 blur-md opacity-30 rounded-xl"></div>
                        <div className="relative bg-white/90 dark:bg-gray-800/90 p-4 rounded-xl border border-primary/10">
                          <div className="flex items-baseline">
                            <span className="text-3xl font-bold text-primary">{formatROI(roi)}</span>
                            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">em 12 meses</span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            Retorno sobre investimento com base nos parâmetros atuais
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Revenue Increase Card */}
                    <div className="bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-800/40 dark:to-gray-800/20 rounded-2xl p-5 shadow-sm border border-gray-100/30 dark:border-gray-700/30 backdrop-blur-sm hover:shadow-md transition-all duration-300 group">
                      <div className="flex items-center mb-4">
                        <span className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400/20 to-green-600/40 flex items-center justify-center mr-3 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        <h5 className="text-base font-medium text-gray-700 dark:text-gray-300">Aumento de Receita</h5>
                      </div>
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-400/20 to-green-600/30 blur-md opacity-30 rounded-xl"></div>
                        <div className="relative bg-white/90 dark:bg-gray-800/90 p-4 rounded-xl border border-green-500/10">
                          <div className="flex items-baseline">
                            <span className="text-3xl font-bold text-green-500">R$ {revenueIncrease.toLocaleString('pt-BR', {maximumFractionDigits: 2})}</span>
                            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">por mês</span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            Receita adicional gerada pela melhoria na conversão
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Payback Period Card */}
                    <div className="bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-800/40 dark:to-gray-800/20 rounded-2xl p-5 shadow-sm border border-gray-100/30 dark:border-gray-700/30 backdrop-blur-sm hover:shadow-md transition-all duration-300 group">
                      <div className="flex items-center mb-4">
                        <span className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/40 flex items-center justify-center mr-3 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
                          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        <h5 className="text-base font-medium text-gray-700 dark:text-gray-300">Período de Payback</h5>
                      </div>
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-blue-600/30 blur-md opacity-30 rounded-xl"></div>
                        <div className="relative bg-white/90 dark:bg-gray-800/90 p-4 rounded-xl border border-blue-500/10">
                          <div className="flex items-baseline">
                            <span className="text-3xl font-bold text-blue-500">{paybackPeriod.toFixed(2)}</span>
                            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">meses</span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            Tempo para recuperar o investimento inicial
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Conversion Increase Card */}
                    <div className="bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-800/40 dark:to-gray-800/20 rounded-2xl p-5 shadow-sm border border-gray-100/30 dark:border-gray-700/30 backdrop-blur-sm hover:shadow-md transition-all duration-300 group">
                      <div className="flex items-center mb-4">
                        <span className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400/20 to-purple-600/40 flex items-center justify-center mr-3 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
                          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </span>
                        <h5 className="text-base font-medium text-gray-700 dark:text-gray-300">Aumento na Conversão</h5>
                      </div>
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/20 to-purple-600/30 blur-md opacity-30 rounded-xl"></div>
                        <div className="relative bg-white/90 dark:bg-gray-800/90 p-4 rounded-xl border border-purple-500/10">
                          <div className="flex items-baseline">
                            <span className="text-3xl font-bold text-purple-500">{formatPercentage(conversionIncrease)}</span>
                            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">de ganho</span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            Aumento absoluto na taxa de conversão com IA
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional Benefits Section */}
                  <div className="mt-8">
                    <h5 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-4">Benefícios Adicionais</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-400/20 to-green-600/40 flex items-center justify-center mr-3">
                          <FiCheck className="w-4 h-4 text-green-500" />
                        </div>
                        <div>
                          <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300">Automação de Processos</h6>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Redução de até 70% no tempo de resposta ao cliente
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-400/20 to-green-600/40 flex items-center justify-center mr-3">
                          <FiCheck className="w-4 h-4 text-green-500" />
                        </div>
                        <div>
                          <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300">Retenção de Clientes</h6>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Aumento de 25% na satisfação e fidelização
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-400/20 to-green-600/40 flex items-center justify-center mr-3">
                          <FiCheck className="w-4 h-4 text-green-500" />
                        </div>
                        <div>
                          <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300">Escalabilidade</h6>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Capacidade de atender 5x mais clientes sem aumentar equipe
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-400/20 to-green-600/40 flex items-center justify-center mr-3">
                          <FiCheck className="w-4 h-4 text-green-500" />
                        </div>
                        <div>
                          <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300">Insights de Dados</h6>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Análise avançada de conversas para melhorar estratégias
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <div className="mt-8 text-center">
                    <Link href="#contato" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary-dark shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
                      Fale com um Especialista
                      <FiMessageCircle className="w-5 h-5 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}