"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiCheckCircle, FiMessageCircle, FiMail, FiGlobe, FiSmartphone } from "react-icons/fi";

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
  { label: "E-mail", icon: <FiMail className="text-3xl text-blue-500" /> },
  { label: "Chat no site", icon: <FiMessageCircle className="text-3xl text-green-500" /> },
  { label: "Redes sociais", icon: <FiGlobe className="text-3xl text-pink-500" /> },
  { label: "WhatsApp", icon: <FiSmartphone className="text-3xl text-green-600" /> },
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
    match: (size: string) => size === "pequena",
    features: [
      "FeitoChat (WhatsApp) configurado",
      "1 Assistente digital Essencial no FeitoChat",
      "Integração com CRM para cadastro de leads",
      "Treinamento rápido para equipe (vídeo)",
      "Até 5 atendentes",
      "Suporte básico",
    ],
  },
  {
    name: "Profissional",
    match: (size: string) => size === "media",
    features: [
      "Tudo do Plano Essencial",
      "+1 automação de processo",
      "+1 chatbot inteligente",
      "20K conversas por mês",
      "Até 10 atendentes",
      "Suporte avançado",
    ],
  },
  {
    name: "Enterprise",
    match: (size: string) => size === "grande",
    features: [
      "Tudo dos planos anteriores",
      "Automações e bots ilimitados",
      "Criação de Agentes de IA personalizados",
      "Integrações específicas e complexas",
      "Implantação estratégica com time técnico dedicado",
      "Suporte premium 24h",
    ],
  },
];

export default function VirtualAssistantModern() {
  const [step, setStep] = useState(0);
  const [segment, setSegment] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);

  const plano = plans.find((p) => size && p.match(size)) || plans[0];

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleRestart = () => {
    setStep(0);
    setSegment(null);
    setSize(null);
    setSelectedChannels([]);
    setSelectedChallenges([]);
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
        Descubra em poucos passos qual solução mais combina com as necessidades do seu negócio.        </p>
      </div>
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl p-8 flex flex-col items-center justify-center text-center">
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
                Vou ajudar você a escolher o plano perfeito para o seu atendimento. Vamos começar?                </p>
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
                      onClick={() => setSegment(opt.label)}
                      tabIndex={0}
                    >
                      <div className="text-3xl mb-1">{opt.icon}</div>
                      <span className={segment === opt.label ? "text-white font-bold bg-primary px-3 py-1 rounded-lg transition-colors" : "text-primary/70 transition-colors"}>{opt.label}</span>
                    </button>
                  ))}
                </div>
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
                      onClick={() => {
                        setSelectedChannels((prev) =>
                          prev.includes(opt.label)
                            ? prev.filter((c) => c !== opt.label)
                            : [...prev, opt.label]
                        );
                      }}
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
                      onClick={() => {
                        setSelectedChallenges((prev) =>
                          prev.includes(opt.label)
                            ? prev.filter((c) => c !== opt.label)
                            : [...prev, opt.label]
                        );
                      }}
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

              </>
            )}

            {/* Etapa 5 */}
            {step === 5 && (
              <>
                <div className="flex items-center justify-center gap-4 mb-2">
                  <span className="text-5xl text-green-500"><FiCheckCircle /></span>
                  <h3 className="text-2xl font-bold">Aqui está sua recomendação!</h3>
                </div>
                <div className="text-left text-gray-700 dark:text-gray-300 mt-4 space-y-3">
                  <p><strong>Segmento:</strong> {segment}</p>
                  <p><strong>Tamanho:</strong> {sizes.find(s => s.value === size)?.label}</p>
                  <p><strong>Canais:</strong> {selectedChannels.join(", ")}</p>
                  <p><strong>Desafios:</strong> {selectedChallenges.join(", ")}</p>
                  <hr className="my-3" />
                  <h4 className="text-xl font-bold">Plano Ideal: {plano.name}</h4>
                  <ul className="list-disc list-inside">
                    {plano.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-row gap-4 mt-6 w-full">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full shadow w-full transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2"
                    onClick={() => alert('Agendar demonstração')}
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
          </motion.div>
        </AnimatePresence>

        {/* Botões Voltar e Navegação */}
        {step > 0 && step < 5 && (
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
                (step === 2 && !size) ||
                (step === 3 && selectedChannels.length === 0) ||
                (step === 4 && selectedChallenges.length === 0)
                  ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleNext}
              disabled={
                (step === 1 && !segment) ||
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
