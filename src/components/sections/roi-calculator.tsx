"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiCheck, FiDownload, FiMessageCircle } from "react-icons/fi";

export function ROICalculator() {
  const [investment, setInvestment] = useState(397);
  const [currentConversionRate, setCurrentConversionRate] = useState(3);
  const [averageRevenue, setAverageRevenue] = useState(500);
  const [monthlyLeads, setMonthlyLeads] = useState(100);
  
  // Results
  const [roi, setRoi] = useState(0);
  const [revenueIncrease, setRevenueIncrease] = useState(0);
  const [paybackPeriod, setPaybackPeriod] = useState(0);
  const [conversionIncrease, setConversionIncrease] = useState(0);
  const [annualROI, setAnnualROI] = useState(0);
  
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

  useEffect(() => {
    // Calculate ROI metrics
    const currentMonthlyConversions = (monthlyLeads * currentConversionRate) / 100;
    const currentMonthlyRevenue = currentMonthlyConversions * averageRevenue;
    
    // Assume FeitoAI improves conversion rate by 30%
    const improvedConversionRate = currentConversionRate * 1.3;
    const improvedMonthlyConversions = (monthlyLeads * improvedConversionRate) / 100;
    const improvedMonthlyRevenue = improvedMonthlyConversions * averageRevenue;
    
    const monthlyRevenueIncrease = improvedMonthlyRevenue - currentMonthlyRevenue;
    const annualRevenueIncrease = monthlyRevenueIncrease * 12;
    
    // ROI calculation: (Gain from Investment - Cost of Investment) / Cost of Investment
    const annualInvestment = investment * 12;
    const calculatedRoi = (annualRevenueIncrease - annualInvestment) / annualInvestment * 100;
    
    // Payback period in months
    const calculatedPaybackPeriod = investment / monthlyRevenueIncrease;
    
    const calculatedConversionIncrease = (improvedConversionRate - currentConversionRate) / currentConversionRate * 100;
    const calculatedAnnualROI = (annualRevenueIncrease / annualInvestment) * 100;
    
    // Format all values to have two decimal places
    setRoi(Math.max(0, parseFloat(calculatedRoi.toFixed(2))));
    setRevenueIncrease(Math.max(0, parseFloat(monthlyRevenueIncrease.toFixed(2))));
    setPaybackPeriod(calculatedPaybackPeriod > 0 ? parseFloat(calculatedPaybackPeriod.toFixed(2)) : 0);
    setConversionIncrease(Math.max(0, parseFloat(calculatedConversionIncrease.toFixed(2))));
    setAnnualROI(Math.max(0, parseFloat(calculatedAnnualROI.toFixed(2))));
  }, [investment, currentConversionRate, averageRevenue, monthlyLeads]);

  // Animated counter effect for results
  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 2000);
  };
  
  const handleContact = () => {
    setIsContacting(true);
    setTimeout(() => setIsContacting(false), 2000);
  };

  const handleSliderChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number>>,
    value: number
  ) => {
    setter(value);
    // Calculate results after slider change
    calculateResults();
  };

  const handleDownloadClick = () => {
    handleDownload();
    // Analytics or other actions could be added here
    console.log("ROI report download requested");
  };

  const handleContactClick = () => {
    handleContact();
    // Analytics or other actions could be added here
    console.log("Consultant contact requested");
  };

  const calculateResults = () => {
    // Calculate increased conversion rate (original + 50% increase)
    const increasedConversionRate = parseFloat((currentConversionRate * 1.5).toFixed(1));
    setConversionIncrease(increasedConversionRate);
    
    // Calculate additional monthly leads from increased conversion
    const additionalLeads = Math.round((increasedConversionRate - currentConversionRate) * monthlyLeads / 100);
    
    // Calculate additional monthly revenue
    const additionalRevenue = Math.round(additionalLeads * averageRevenue);
    setRevenueIncrease(additionalRevenue);
    
    // Calculate ROI (Return on Investment)
    // Annual additional revenue divided by investment cost
    const annualAdditionalRevenue = additionalRevenue * 12;
    const calculatedROI = Math.round((annualAdditionalRevenue / investment) * 100);
    setRoi(calculatedROI);
    
    // Calculate payback period in months (investment / monthly additional revenue)
    const calculatedPaybackPeriod = Math.round((investment / additionalRevenue) * 10) / 10;
    setPaybackPeriod(calculatedPaybackPeriod);
  };

  return (
    <section
      id="roi"
      ref={ref}
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-light to-light/50 dark:from-dark dark:to-dark/90"
    >
      <div className="absolute inset-0 bg-grid-pattern bg-center opacity-5 dark:opacity-10"></div>
      
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
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div 
            variants={itemVariants} 
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative text-gray-900 dark:text-white">
              <div className="absolute -left-6 -top-6 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
              Calcule seu <span className="text-gradient">
                ROI
              </span> com o FeitoAI
            </h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Descubra quanto sua empresa pode economizar e aumentar suas vendas com nossa solução de atendimento inteligente.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Parameters column - takes 5/12 of the space on large screens */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-900/95 dark:to-gray-900/80 rounded-3xl p-7 shadow-xl border border-gray-100/40 dark:border-gray-800/40 backdrop-blur-md h-full hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
                <h4 className="text-lg font-semibold mb-6 flex items-center text-primary">
                  <span className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-3 shadow-md shadow-primary/10">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  Parâmetros do Cálculo
                </h4>
                
                <div className="space-y-7">
                  {/* Investment Input */}
                  <div className="bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-800/40 dark:to-gray-800/20 rounded-2xl p-5 shadow-sm border border-gray-100/30 dark:border-gray-700/30 backdrop-blur-sm hover:shadow-md transition-all duration-300 group">
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
                  <div className="bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-800/40 dark:to-gray-800/20 rounded-2xl p-5 shadow-sm border border-gray-100/30 dark:border-gray-700/30 backdrop-blur-sm hover:shadow-md transition-all duration-300 group">
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-sm font-medium flex items-center">
                        <span className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/40 flex items-center justify-center mr-3 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
                          <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
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
                          animate={{ width: `${currentConversionRate * 10}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        step="1"
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
                  <div className="bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-800/40 dark:to-gray-800/20 rounded-2xl p-5 shadow-sm border border-gray-100/30 dark:border-gray-700/30 backdrop-blur-sm hover:shadow-md transition-all duration-300 group">
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
                  <div className="bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-800/40 dark:to-gray-800/20 rounded-2xl p-5 shadow-sm border border-gray-100/30 dark:border-gray-700/30 backdrop-blur-sm hover:shadow-md transition-all duration-300 group">
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
                </div>
              </div>
            </div>
            
            {/* Results column - takes 7/12 of the space on large screens */}
            <div className="lg:col-span-7">
              <div className="bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-900/95 dark:to-gray-900/80 rounded-3xl p-7 shadow-xl border border-gray-100/40 dark:border-gray-800/40 backdrop-blur-md h-full hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-4 text-gradient">Resultados</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <motion.div
                      variants={itemVariants}
                      className="bg-gradient-to-br from-white/90 to-white/60 dark:from-gray-800/90 dark:to-gray-800/60 rounded-xl p-6 border-2 border-green-400/30 dark:border-green-400/20 backdrop-blur-sm relative overflow-hidden group shadow-lg"
                      whileHover={{ 
                        y: -5, 
                        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
                        borderColor: "rgba(74, 222, 128, 0.5)",
                        transition: { duration: 0.3 }
                      }}
                    >
                      <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-green-400 to-green-600"></div>
                      <div className="absolute -right-20 -top-20 w-40 h-40 bg-green-400/10 rounded-full blur-3xl group-hover:bg-green-400/20 transition-all duration-700"></div>
                      
                      <h4 className="text-lg font-semibold mb-3 relative z-10">
                        <span className="text-gradient-green">ROI Anual</span>
                      </h4>
                      
                      <div className="relative z-10">
                        <div className="font-bold text-gray-800 dark:text-gray-200 text-3xl md:text-4xl whitespace-nowrap mb-1">
                          {roi.toFixed(2)}%
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600 dark:text-gray-400 relative z-10 mb-4">
                        Retorno sobre investimento
                      </div>
                      
                      <div className="mt-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000 ease-in-out" 
                          style={{ width: `${Math.min(roi / 500 * 100, 100)}%` }}
                        ></div>
                      </div>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="bg-gradient-to-br from-white/90 to-white/60 dark:from-gray-800/90 dark:to-gray-800/60 rounded-xl p-6 border-2 border-primary/30 dark:border-primary/20 backdrop-blur-sm relative overflow-hidden group shadow-lg"
                      whileHover={{ 
                        y: -5, 
                        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
                        borderColor: "rgba(113, 96, 245, 0.5)",
                        transition: { duration: 0.3 }
                      }}
                    >
                      <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-primary to-primary-light"></div>
                      <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700"></div>
                      
                      <h4 className="text-lg font-semibold mb-3 relative z-10">
                        <span className="text-gradient">Aumento de Receita</span>
                      </h4>
                      
                      <div className="relative z-10">
                        <div className="font-bold text-gray-800 dark:text-gray-200 text-3xl md:text-4xl whitespace-nowrap mb-1">
                          R$ {revenueIncrease.toFixed(2)}/mês
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600 dark:text-gray-400 relative z-10 mb-4">
                        Receita adicional mensal
                      </div>
                      
                      <div className="mt-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-1000 ease-in-out" 
                          style={{ width: `${Math.min(revenueIncrease / 50000 * 100, 100)}%` }}
                        ></div>
                      </div>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="bg-gradient-to-br from-white/90 to-white/60 dark:from-gray-800/90 dark:to-gray-800/60 rounded-xl p-6 border-2 border-blue-400/30 dark:border-blue-400/20 backdrop-blur-sm relative overflow-hidden group shadow-lg"
                      whileHover={{ 
                        y: -5, 
                        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
                        borderColor: "rgba(96, 165, 250, 0.5)",
                        transition: { duration: 0.3 }
                      }}
                    >
                      <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-blue-400 to-blue-600"></div>
                      <div className="absolute -right-20 -top-20 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl group-hover:bg-blue-400/20 transition-all duration-700"></div>
                      
                      <h4 className="text-lg font-semibold mb-3 relative z-10">
                        <span className="text-gradient-blue">Retorno do Investimento</span>
                      </h4>
                      
                      <div className="relative z-10">
                        <div className="font-bold text-gray-800 dark:text-gray-200 text-3xl md:text-4xl whitespace-nowrap mb-1">
                          {paybackPeriod.toFixed(2)} meses
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600 dark:text-gray-400 relative z-10 mb-4">
                        Tempo para retorno do investimento
                      </div>
                      
                      <div className="mt-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000 ease-in-out" 
                          style={{ width: `${Math.min(1 / (paybackPeriod || 1) * 10, 100)}%` }}
                        ></div>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-50/90 to-gray-100/50 dark:from-gray-800/20 dark:to-gray-700/10 backdrop-blur-sm rounded-xl p-5 border border-gray-100/50 dark:border-gray-700/30">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Benefícios do FeitoAI</h4>
                    
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h5 className="font-medium text-green-700 dark:text-green-400">Economia de tempo</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Reduza em até 40% o tempo gasto com atendimento</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h5 className="font-medium text-blue-700 dark:text-blue-400">Aumento de conversões</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Aumente em até 30% a taxa de conversão com nossa solução</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h5 className="font-medium text-purple-700 dark:text-purple-400">Melhoria da experiência do cliente</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Forneça uma experiência de atendimento mais personalizada e eficaz</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <motion.button 
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0 0 25px rgba(124, 58, 237, 0.5)",
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="relative inline-flex items-center justify-center h-14 px-8 py-4 bg-gradient-to-r from-primary to-primary-light text-white rounded-full font-medium shadow-lg shadow-primary/20 overflow-hidden text-lg group"
                    onClick={handleContactClick}
                  >
                    {/* Animated background effect */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-light via-primary to-primary-light bg-[length:200%_100%] animate-gradient-x"></span>
                    
                    {/* Enhanced pulse effect */}
                    <span className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-purple-400/30 via-pink-500/30 to-purple-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-xy"></span>
                    
                    {/* Glow effect */}
                    <span className="absolute -inset-1 rounded-full blur-md bg-gradient-to-r from-primary via-primary-light to-primary opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105 bg-size-200 bg-pos-0 group-hover:bg-pos-100"></span>
                    
                    {/* Button content */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center relative z-10"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Começar agora
                    </motion.div>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
