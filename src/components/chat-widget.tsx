"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiX, FiSend, FiPaperclip } from "react-icons/fi";

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Olá! Sou o assistente virtual da FeitoAI. Como posso ajudar você hoje?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickQuestions = [
    "Como a FeitoAI pode ajudar meu negócio?",
    "Quanto tempo leva para implementar?",
    "Quais são os planos disponíveis?",
  ];

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: getAIResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("preço") || input.includes("plano") || input.includes("valor")) {
      return "Oferecemos planos flexíveis que se adaptam ao tamanho do seu negócio. Nosso plano básico começa em R$197/mês. Gostaria de falar com um consultor para saber mais detalhes?";
    } else if (input.includes("tempo") || input.includes("implementação") || input.includes("implementar")) {
      return "Normalmente, nossas soluções são totalmente implementadas em até 7 dias, englobando todo o processo de desenvolvimento e integração.";
    } else if (input.includes("ajudar") || input.includes("benefício") || input.includes("vantagem")) {
      return "Podemos economizar centenas de horas de trabalho manual para sua equipe, automatizando tarefas repetitivas como prospecção outbound, atendimento ao cliente e criação de conteúdo. Isso libera sua equipe para focar em atividades estratégicas.";
    } else {
      return "Obrigado pelo seu contato! Para fornecer informações mais precisas sobre como podemos ajudar seu negócio, um de nossos consultores entrará em contato. Poderia nos informar seu e-mail ou WhatsApp?";
    }
  };

  const handleQuickQuestion = (question: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: question,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: getAIResponse(question),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Fechar chat" : "Abrir chat"}
      >
        {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[400px] h-[500px] bg-light dark:bg-dark rounded-2xl shadow-xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800"
          >
            {/* Chat Header */}
            <div className="p-4 bg-primary text-white flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-bold">FeitoAI Assistente</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
                aria-label="Fechar chat"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? "bg-primary text-white rounded-br-none"
                        : "bg-gray-100 dark:bg-gray-800 text-dark dark:text-light rounded-bl-none"
                    }`}
                  >
                    <p>{message.text}</p>
                    <span
                      className={`text-xs mt-1 block ${
                        message.isUser
                          ? "text-white/70"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg rounded-bl-none">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-800">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Perguntas frequentes:
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question) => (
                    <button
                      key={question}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-dark dark:text-light py-1 px-2 rounded-full transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center">
                <button
                  className="p-2 text-gray-500 hover:text-primary transition-colors"
                  aria-label="Anexar arquivo"
                >
                  <FiPaperclip size={20} />
                </button>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 p-2 bg-transparent focus:outline-none text-dark dark:text-light"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={inputValue.trim() === ""}
                  className={`p-2 rounded-full ${
                    inputValue.trim() === ""
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-primary hover:bg-primary/10 transition-colors"
                  }`}
                  aria-label="Enviar mensagem"
                >
                  <FiSend size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
