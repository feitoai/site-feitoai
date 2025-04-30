"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiMessageCircle,
  FiMail,
  FiGlobe,
  FiSmartphone,
  FiHeadphones,
  FiSend,
  FiChevronDown,
  FiChevronUp,
  FiShare2
} from "react-icons/fi";

// Remova imports não utilizados, se houver


const segments = [
  { label: "E-commerce", icon: "🛒" },
  { label: "Serviços", icon: "🛠️" },
  { label: "Varejo Físico", icon: "🏬" },
  { label: "Educação", icon: "🎓" },
  { label: "Saúde", icon: "🏥" },
  { label: "Outro", icon: "❓" },
];

const sizes = [
  { label: "Pequena (até 100 atendimentos/dia)", value: "pequena" },
  { label: "Média (100-500 atendimentos/dia)", value: "media" },
  { label: "Grande (500+ atendimentos/dia)", value: "grande" },
];

const channels = [
  { label: "E-mail", icon: <FiMail className="text-3xl text-orange-500" /> },
  { label: "Chat no site", icon: <FiGlobe className="text-3xl text-blue-600" /> },
  { label: "Redes sociais", icon: <FiShare2 className="text-3xl text-pink-500" /> },
  { label: "WhatsApp", icon: <FiMessageCircle className="text-3xl text-green-500" /> },
];

const challenges = [
  { label: "Tempo de Resposta" },
  { label: "Volume de Atendimentos" },
  { label: "Organização das Conversas" },
  { label: "Personalização" },
  { label: "Conversão de Vendas" },
];

const plans = [
  {
    name: "Essencial",
    match: (size: string, challenges: string[], channels: string[]) => {
      if (size === "pequena") return 100;
      if (size === "media" && challenges.includes("Tempo de Resposta")) return 70;
      return 50;
    },
    features: [
      "FeitoChat (WhatsApp) configurado",
      "1 Assistente digital Essencial no FeitoChat",
      "Integração com CRM para cadastro de leads",
      "Treinamento rápido para equipe (vídeo)",
      "Até 5 atendentes",
      "Suporte básico",
    ],
    benefits: {
      "Tempo de Resposta": "Redução média de 40% no tempo de resposta",
      "Volume de Atendimentos": "Capacidade de até 100 atendimentos/dia",
      "Organização das Conversas": "Sistema de filas e encaminhamentos básico",
      "Personalização": "Templates de mensagens personalizáveis",
      "Conversão de Vendas": "Aumento médio de 15% na taxa de conversão"
    }
  },
  {
    name: "Profissional",
    match: (size: string, challenges: string[], channels: string[]) => {
      if (size === "media") return 100;
      if (size === "pequena" && (challenges.includes("Personalização") || channels.length >= 3)) return 85;
      if (size === "grande" && challenges.length <= 2) return 75;
      return 60;
    },
    features: [
      "Tudo do Plano Essencial",
      "+1 automação de processo",
      "+1 chatbot inteligente",
      "20K conversas por mês",
      "Até 10 atendentes",
      "Suporte avançado",
    ],
    benefits: {
      "Tempo de Resposta": "Redução média de 60% no tempo de resposta",
      "Volume de Atendimentos": "Capacidade de até 500 atendimentos/dia",
      "Organização das Conversas": "Sistema avançado de categorização e priorização",
      "Personalização": "IA para personalização contextual das respostas",
      "Conversão de Vendas": "Aumento médio de 25% na taxa de conversão"
    }
  },
  {
    name: "Enterprise",
    match: (size: string, challenges: string[], channels: string[]) => {
      if (size === "grande") return 100;
      if (size === "media" && challenges.length >= 4) return 90;
      if (channels.length === 4) return 85;
      return 70;
    },
    features: [
      "Tudo dos planos anteriores",
      "Automações e bots ilimitados",
      "Criação de Agentes de IA personalizados",
      "Integrações específicas e complexas",
      "Implantação estratégica com time técnico dedicado",
      "Suporte premium 24h",
    ],
    benefits: {
      "Tempo de Resposta": "Redução média de 80% no tempo de resposta",
      "Volume de Atendimentos": "Capacidade ilimitada de atendimentos",
      "Organização das Conversas": "Sistema inteligente com IA para gestão completa",
      "Personalização": "IA generativa para máxima personalização",
      "Conversão de Vendas": "Aumento médio de 40% na taxa de conversão"
    }
  },
];

export default function VirtualAssistantModern() {
  const [step, setStep] = useState<number>(0);
  const [segment, setSegment] = useState<string | null>(null);
  const [otherSegment, setOtherSegment] = useState<string>("");
  const [size, setSize] = useState<string | null>(null);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const [additionalComments, setAdditionalComments] = useState<string>("");
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    horario: "manha",
  });
  const [showContactForm, setShowContactForm] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [expandedBenefits, setExpandedBenefits] = useState<boolean>(false);
  
  const emailRef = useRef(null);

  // Encontra o melhor plano com base em todas as respostas
  const findBestPlan = () => {
    let bestMatch = { plan: plans[0], score: 0 };
    
    if (size) {
  plans.forEach(plan => {
    const matchScore = plan.match(size, selectedChallenges, selectedChannels);
    if (matchScore > bestMatch.score) {
      bestMatch = { plan, score: matchScore };
    }
  });
}
    
    return bestMatch.plan;
  };

  const plano = findBestPlan();

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleRestart = () => {
    setStep(0);
    setSegment(null);
    setOtherSegment("");
    setSize(null);
    setSelectedChannels([]);
    setSelectedChallenges([]);
    setAdditionalComments("");
    setContactInfo({ name: "", email: "", phone: "", horario: "manha" });
    setShowContactForm(false);
    setEmailSent(false);
    setExpandedBenefits(false);
  };

  const handleSegmentSelection = (selectedSegment: string) => {
    setSegment(selectedSegment);
    if (selectedSegment !== "Outro") {
      setOtherSegment("");
    }
  };
  
  const toggleChannel = (channel: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channel)
        ? prev.filter((c) => c !== channel)
        : [...prev, channel]
    );
  };
  
  const toggleChallenge = (challenge: string) => {
    setSelectedChallenges((prev) =>
      prev.includes(challenge)
        ? prev.filter((c) => c !== challenge)
        : [...prev, challenge]
    );
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      let onlyNumbers = value.replace(/\D/g, "");
      if (onlyNumbers.length > 0) {
        onlyNumbers = onlyNumbers.slice(0, 11);
        let formatted = onlyNumbers;
        if (onlyNumbers.length > 2) {
          formatted = `(${onlyNumbers.slice(0, 2)}) ${onlyNumbers.slice(2)}`;
        }
        if (onlyNumbers.length > 7) {
          formatted = `(${onlyNumbers.slice(0, 2)}) ${onlyNumbers.slice(2, 7)}-${onlyNumbers.slice(7)}`;
        }
        setContactInfo((prev) => ({ ...prev, [name]: formatted }));
      } else {
        setContactInfo((prev) => ({ ...prev, [name]: "" }));
      }
    } else {
      setContactInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    try {
      const res = await fetch("/api/contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactInfo),
      });
      if (res.ok) {
        setFormStatus("success");
        setEmailSent(true);
        setContactInfo({ name: "", email: "", phone: "", horario: "manha" });
      } else {
        setFormStatus("error");
      }
    } catch (err) {
      setFormStatus("error");
    }
  };
  
  const handleSkipToContact = () => {
    setShowContactForm(true);
  };

  return (
    <section id="assistente" className="w-full min-h-[80vh] flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-violet-50 to-green-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-hidden">
      {/* Animação de partículas coloridas no fundo */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-40 blur-2xl"
            style={{
              width: `${60 + (i % 3) * 30}px`,
              height: `${60 + (i % 2) * 40}px`,
              top: `${10 + (i * 11) % 70}%`,
              left: `${5 + (i * 17) % 85}%`,
              background: [
                'linear-gradient(135deg, #6366f1 60%, #a5b4fc 100%)',
                'linear-gradient(135deg, #22d3ee 60%, #38bdf8 100%)',
                'linear-gradient(135deg, #f472b6 60%, #fbbf24 100%)',
                'linear-gradient(135deg, #34d399 60%, #4ade80 100%)',
                'linear-gradient(135deg, #f59e42 60%, #fbbf24 100%)',
                'linear-gradient(135deg, #818cf8 60%, #e0e7ff 100%)',
                'linear-gradient(135deg, #f43f5e 60%, #fbbf24 100%)',
                'linear-gradient(135deg, #06b6d4 60%, #a5b4fc 100%)',
              ][i % 8],
            }}
            animate={{
              y: [0, (i % 2 === 0 ? 30 : -30), 0],
              x: [0, (i % 2 === 1 ? 20 : -20), 0],
            }}
            transition={{
              duration: 12 + i * 1.3,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      {/* Fim da animação de partículas */}
      <div className="text-center mb-12 w-full max-w-2xl relative">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 relative text-gray-900 dark:text-white">
          <div className="absolute -left-6 -top-6 w-20 h-20 bg-primary/10 rounded-full blur-xl pointer-events-none"></div>
          Otimize seu atendimento com <span className="text-gradient">FeitoAI</span>
        </h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Descubra em poucos passos qual solução mais combina com as necessidades do seu negócio.        
        </p>
      </div>
      
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl p-8 flex flex-col items-center justify-center text-center">
        {/* Botão Falar com Consultor - Sempre visível exceto na tela inicial */}
        {step > 0 && step < 5 && !showContactForm && (
          <div className="absolute top-4 right-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1 bg-primary/20 hover:bg-primary/30 text-primary text-sm font-medium py-2 px-3 rounded-full transition-all focus:outline-none"
              onClick={handleSkipToContact}
            >
              <FiHeadphones className="text-primary" /> Falar com consultor
            </motion.button>
          </div>
        )}
      
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col gap-6"
          >
            {/* Etapa 0 */}
            {step === 0 && (
              <>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-5xl text-blue-500 animate-pulse"><FiMessageCircle /></span>
                  <h2 className="text-3xl font-bold">Olá! Sou seu assistente virtual.</h2>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Vou ajudar você a escolher o plano perfeito para o seu atendimento. Vamos começar?
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-primary hover:bg-primary/90 transition-all text-white font-bold py-3 px-8 rounded-full shadow-lg mt-4 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2"
                  onClick={handleNext}
                >
                  Começar
                </motion.button>
              </>
            )}

            {/* Etapa 1 */}
            {step === 1 && (
              <>
                <h3 className="text-2xl font-bold">Qual o segmento da sua empresa?</h3>
                <div className="grid grid-cols-2 gap-4">
                  {segments.map((opt) => (
                    <button
                      key={opt.label}
                      className={`p-4 rounded-xl border-2 font-bold flex flex-col items-center justify-center shadow transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2
                        ${segment === opt.label
                          ? 'border-primary bg-primary/10'
                          : 'border-primary bg-white dark:bg-gray-900 hover:bg-primary/5'}
                      `}
                      onClick={() => handleSegmentSelection(opt.label)}
                      tabIndex={0}
                    >
                      <div className="text-3xl mb-1">{opt.icon}</div>
                      <span className={segment === opt.label ? "text-white font-bold bg-primary px-3 py-1 rounded-lg transition-colors" : "text-primary/70 transition-colors"}>{opt.label}</span>
                    </button>
                  ))}
                </div>
                
                {/* Campo adicional se "Outro" for selecionado */}
                {segment === "Outro" && (
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Qual o segmento da sua empresa?"
                      value={otherSegment}
                      onChange={(e) => setOtherSegment(e.target.value)}
                      className="w-full p-3 border-2 border-primary/30 rounded-xl focus:border-primary focus:outline-none text-gray-900"
                    />
                  </div>
                )}
              </>
            )}

            {/* Etapa 2 */}
            {step === 2 && (
              <>
                <h3 className="text-2xl font-bold">Qual o tamanho da sua operação?</h3>
                <div className="flex flex-col gap-4">
                  {sizes.map((opt) => (
                    <button
                      key={opt.value}
                      className={`py-4 px-6 rounded-xl border-2 font-bold shadow transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2
                        ${size === opt.value
                          ? 'border-primary bg-primary/10'
                          : 'border-primary bg-white dark:bg-gray-900 hover:bg-primary/5'}
                      `}
                      onClick={() => setSize(opt.value)}
                      tabIndex={0}
                    >
                      <span className={size === opt.value ? "text-white font-bold bg-primary px-3 py-1 rounded-lg transition-colors" : "text-primary/70 transition-colors"}>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Etapa 3 */}
            {step === 3 && (
              <>
                <h3 className="text-2xl font-bold">Quais canais você utiliza?</h3>
                <div className="grid grid-cols-2 gap-4">
                  {channels.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => toggleChannel(opt.label)}
                      className={`p-4 rounded-xl border-2 font-bold flex flex-col items-center justify-center shadow transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2
                        ${selectedChannels.includes(opt.label)
                          ? 'border-primary bg-primary/10'
                          : 'border-primary bg-white dark:bg-gray-900 hover:bg-primary/5'}
                      `}
                      tabIndex={0}
                    >
                      <div className="text-3xl mb-1">{opt.icon}</div>
                      <span className={selectedChannels.includes(opt.label) ? "text-white font-bold bg-primary px-3 py-1 rounded-lg transition-colors" : "text-primary/70 transition-colors"}>{opt.label}</span>
                    </button>
                  ))}
                </div>
                
                {/* Campo para canais adicionais */}
                <div className="mt-2">
                  <label className="block text-left text-gray-700 dark:text-gray-300 mb-2">Utiliza outro canal não listado?</label>
                  <input
                    type="text"
                    placeholder="Especifique aqui outros canais"
                    className="w-full p-3 border-2 border-primary/30 rounded-xl focus:border-primary focus:outline-none mt-2 text-gray-900"
                    required
                    maxLength={60}
                  />
                </div>
              </>
            )}

            {/* Etapa 4 */}
            {step === 4 && (
              <>
                <h3 className="text-2xl font-bold">Quais desafios você enfrenta?</h3>
                <div className="grid grid-cols-1 gap-4 w-full max-w-md mx-auto">
                  {challenges.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => toggleChallenge(opt.label)}
                      className={`py-4 px-6 rounded-xl border-2 font-bold shadow transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 text-center
                        ${selectedChallenges.includes(opt.label)
                          ? 'border-primary bg-primary/10'
                          : 'border-primary bg-white dark:bg-gray-900 hover:bg-primary/5'}
                      `}
                      tabIndex={0}
                    >
                      <span className={selectedChallenges.includes(opt.label) ? "text-white font-bold bg-primary px-3 py-1 rounded-lg transition-colors" : "text-primary/70 transition-colors"}>{opt.label}</span>
                    </button>
                  ))}
                </div>
                
                {/* Campo para comentários adicionais */}
                <div className="mt-4 w-full">
                  <label className="block text-left text-gray-700 dark:text-gray-300 mb-2">
                    Algum comentário adicional sobre seus desafios?
                  </label>
                  <textarea
                    value={additionalComments}
                    onChange={(e) => setAdditionalComments(e.target.value)}
                    className="w-full p-3 border-2 border-primary/30 rounded-xl focus:border-primary focus:outline-none min-h-24 text-gray-900"
                    placeholder="Descreva seus principais desafios..."
                    required
                    maxLength={300}
                  />
                </div>
              </>
            )}

            {/* Etapa 5 - Recomendação */}
            {step === 5 && !showContactForm && (
              <>
                <div className="flex items-center justify-center gap-4 mb-2">
                  <span className="text-5xl text-green-500"><FiCheckCircle /></span>
                  <h3 className="text-2xl font-bold">Aqui está sua recomendação!</h3>
                </div>
                <div className="text-left text-gray-700 dark:text-gray-300 mt-4 space-y-3">
                  <p><strong>Segmento:</strong> {segment === "Outro" ? otherSegment : segment}</p>
                  <p><strong>Tamanho:</strong> {sizes.find(s => s.value === size)?.label}</p>
                  <p><strong>Canais:</strong> {selectedChannels.join(", ")}</p>
                  <p><strong>Desafios:</strong> {selectedChallenges.join(", ")}</p>
                  
                  <hr className="my-3" />
                  
                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/20">
                    <h4 className="text-xl font-bold mb-3">Plano Ideal: {plano.name}</h4>
                    
                    <div className="mb-4">
                      <h5 className="font-semibold mb-2">Por que este plano é ideal para você:</h5>
                      <ul className="list-disc list-inside pl-4">
                        {selectedChallenges.map((challenge, idx) => 
                          plano.benefits[challenge as keyof typeof plano.benefits] ? (
                            <li key={idx} className="text-sm mb-1">
                              <strong>{challenge}:</strong> {plano.benefits[challenge as keyof typeof plano.benefits]}
                            </li>
                          ) : null
                        )}
                      </ul>
                    </div>
                    
                    <h5 className="font-semibold mb-2">Recursos incluídos:</h5>
                    <ul className="list-disc list-inside">
                      {plano.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {selectedChallenges.length > 0 && (
                    <div className="mt-4">
                      <button 
                        onClick={() => setExpandedBenefits(!expandedBenefits)}
                        className="flex items-center gap-2 text-primary font-medium"
                      >
                        {expandedBenefits ? (
                          <>Ocultar detalhes <FiChevronUp /></>
                        ) : (
                          <>Ver mais detalhes <FiChevronDown /></>
                        )}
                      </button>
                      
                      {expandedBenefits && (
                        <div className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
                          <h5 className="font-semibold mb-2">Benefícios detalhados:</h5>
                          {plans.map((p, idx) => (
                            <div key={idx} className={`mb-4 p-3 rounded-lg ${p.name === plano.name ? 'bg-primary/10 border border-primary/20' : ''}`}>
                              <h6 className="font-medium mb-1">{p.name}</h6>
                              <ul className="list-disc list-inside text-sm">
                                {selectedChallenges.map((challenge, cidx) => (
                                  <li key={cidx} className="mb-1">
                                    <strong>{challenge}:</strong> {p.benefits[challenge as keyof typeof p.benefits]}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-row gap-4 mt-6 w-full">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full shadow w-full transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2"
                    onClick={() => setShowContactForm(true)}
                  >
                    Agendar Demonstração
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-white dark:bg-gray-800 border border-primary text-primary font-bold py-3 px-8 rounded-full shadow w-full transition-all hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2"
                    onClick={handleRestart}
                  >
                    Refazer Simulação
                  </motion.button>
                </div>
              </>
            )}
            
            {/* Formulário de Contato */}
            {showContactForm && !emailSent && (
              <>
                <div className="flex items-center justify-center gap-4 mb-2">
                  <span className="text-5xl text-blue-500"><FiMessageCircle /></span>
                  <h3 className="text-2xl font-bold">Agendar demonstração</h3>
                </div>
                
                <form onSubmit={handleContactSubmit} className="w-full space-y-4">
                  <div className="text-left">
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">
                      Nome
                    </label>
                    <input
                      type="text"
                      value={contactInfo.name}
                      name="name"
                      onChange={handleContactChange}
                      className="w-full p-3 border-2 border-primary/30 rounded-xl focus:border-primary focus:outline-none mt-2 text-gray-900"
                      placeholder="Seu nome completo"
                      required
                      maxLength={60}
                    />
                  </div>
                  
                  <div className="text-left">
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={contactInfo.email}
                      name="email"
                      onChange={handleContactChange}
                      className="w-full p-3 border-2 border-primary/30 rounded-xl focus:border-primary focus:outline-none mt-2 text-gray-900"
                      placeholder="seu@email.com"
                      required
                      maxLength={80}
                    />
                  </div>
                  
                  <div className="text-left">
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      value={contactInfo.phone}
                      name="phone"
                      onChange={handleContactChange}
                      className="w-full p-3 border-2 border-primary/30 rounded-xl focus:border-primary focus:outline-none mt-2 text-gray-900"
                      placeholder="(00) 00000-0000"
                      required
                      maxLength={20}
                    />
                  </div>
                  
                  <div className="text-left">
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">
                      Horário preferido
                    </label>
                    <select
                      name="horario"
                      value={contactInfo.horario}
                      onChange={handleContactChange}
                      className="w-full p-3 border-2 border-primary/30 rounded-xl focus:border-primary focus:outline-none mt-2 text-gray-900"
                      required
                    >
                      <option value="manha">Manhã (8h - 12h)</option>
                      <option value="tarde">Tarde (13h - 18h)</option>
                      <option value="noite">Noite (após 18h)</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-4 mt-6">
                  <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.97 }}
  type="button"
  className="bg-white dark:bg-gray-800 border border-primary text-primary font-bold py-3 px-8 rounded-full shadow w-1/2 transition-all hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2"
  onClick={() => step === 5 ? setShowContactForm(false) : handleRestart()}
  tabIndex={0}
>
  Voltar
</motion.button>
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.97 }}
  type="submit"
  className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full shadow w-1/2 transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 flex items-center justify-center gap-2"
  tabIndex={0}
>
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg> Enviar
</motion.button>
</div>
                </form>
              </>
            )}
            
            {/* Confirmação de Envio */}
            {emailSent && (
              <>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className="text-5xl text-green-500"><FiCheckCircle /></span>
                  <h3 className="text-2xl font-bold">Solicitação enviada!</h3>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Recebemos sua solicitação de demonstração. Nossa equipe entrará em contato em breve 
                  através do e-mail <strong>{contactInfo.email}</strong>.
                </p>
                
                <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl text-left mb-6">
                  <h4 className="font-bold text-lg mb-2">Enquanto isso:</h4>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    <li>Conhecer mais sobre os recursos do FeitoAI</li>
                    <li>Explorar os planos e escolher o mais adequado para sua empresa</li>
                    <li>Seguir nossas redes sociais e acompanhar dicas exclusivas sobre automação e atendimento digital</li>
                  </ul>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full shadow transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2"
                  onClick={handleRestart}
                >
                  Iniciar nova simulação
                </motion.button>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Botões Voltar e Navegação */}
        {step > 0 && step < 5 && !showContactForm && (
          <div className="flex justify-between gap-4 w-full mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-primary text-primary font-bold py-3 px-8 rounded-full shadow w-full transition-all hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2"
              onClick={handleBack}
            >
              <FiArrowLeft /> Voltar
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full shadow w-full transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 ${
                (step === 1 && !segment) ||
                (step === 1 && segment === "Outro" && !otherSegment) ||
                (step === 2 && !size) ||
                (step === 3 && selectedChannels.length === 0) ||
                (step === 4 && selectedChallenges.length === 0)
                  ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleNext}
              disabled={
                (step === 1 && !segment) ||
                (step === 1 && segment === "Outro" && !otherSegment) ||
                (step === 2 && !size) ||
                (step === 3 && selectedChannels.length === 0) ||
                (step === 4 && selectedChallenges.length === 0)
              }
            >
              {step === 4 ? <><FiCheckCircle /> Finalizar</> : <><FiArrowRight /> Próximo</>}
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}