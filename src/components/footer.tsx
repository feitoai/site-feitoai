"use client";

import Link from "next/link";
import Image from "next/image";
import { FiInstagram, FiLinkedin, FiFacebook, FiTwitter } from "react-icons/fi";
import { ThemeToggle } from "./theme-toggle";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light/50 dark:bg-dark/50 border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center">
                <div className="relative w-10 h-10 mr-2">
                  <Image 
                    src="/logo.svg" 
                    alt="FeitoAI Logo" 
                    fill 
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-bold">FeitoAI</span>
              </div>
            </Link>
            <p className="text-dark/70 dark:text-light/70 mb-6">
              Transformando atendimento multicanal com automação inteligente e IA para empresas de todos os tamanhos.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/feitoai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-light dark:bg-dark flex items-center justify-center text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/company/feitoai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-light dark:bg-dark flex items-center justify-center text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com/feitoai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-light dark:bg-dark flex items-center justify-center text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/feitoai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-light dark:bg-dark flex items-center justify-center text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors"
              >
                <FiTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Soluções</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#feitochat" className="text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors">
                  FeitoChat
                </Link>
              </li>
              <li>
                <Link href="/feitobot" className="text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors">
                  FeitoBot
                </Link>
              </li>
              <li>
                <Link href="/feitoflow" className="text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors">
                  FeitoFlow
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors">
                  FeitoAnalytics
                </Link>
              </li>
              <li>
                <Link href="/#integracoes" className="text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Integrações
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Empresa</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/sobre" className="text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link href="/carreiras" className="text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Carreiras
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/parceiros" className="text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Parceiros
                </Link>
              </li>
              <li>
                <Link href="/#contato" className="text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Recursos</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/ajuda" className="text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Documentação API
                </Link>
              </li>
              <li>
                <Link href="/status" className="text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Status do Sistema
                </Link>
              </li>
              <li>
                <Link href="/#roi" className="text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Calculadora de ROI
                </Link>
              </li>
              <li>
                <Link href="/webinars" className="text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Webinars
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-dark/70 dark:text-light/70 text-sm mb-4 md:mb-0">
            {currentYear} FeitoAI. Todos os direitos reservados.
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link href="/termos" className="text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors text-sm">
              Termos de Serviço
            </Link>
            <Link href="/privacidade" className="text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors text-sm">
              Política de Privacidade
            </Link>
            <Link href="/cookies" className="text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors text-sm">
              Cookies
            </Link>
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
