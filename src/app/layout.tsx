import type { Metadata } from "next";
import { Inter, Outfit, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ChatWidget } from "@/components/chat-widget";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"], 
  variable: "--font-poppins" 
});

export const metadata: Metadata = {
  title: "FeitoAI | Plataforma de Atendimento com Inteligência Artificial",
  description:
    "Transforme seu atendimento ao cliente com nossa plataforma completa de IA. Chatbots inteligentes, automação de processos e insights em tempo real.",
  keywords: "FeitoAI, atendimento multicanal, automação, inteligência artificial, chatbot, WhatsApp, CRM",
  authors: [{ name: "FeitoAI" }],
  creator: "FeitoAI",
  publisher: "FeitoAI",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://feitoai.com",
    title: "FeitoAI - Atendimento Multicanal e Automação com IA",
    description: "Transforme seu atendimento com inteligência artificial. Aumente suas conversões, reduza custos e ofereça uma experiência excepcional aos seus clientes com a plataforma completa da FeitoAI.",
    siteName: "FeitoAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "FeitoAI - Atendimento Multicanal e Automação com IA",
    description: "Transforme seu atendimento com inteligência artificial. Aumente suas conversões, reduza custos e ofereça uma experiência excepcional aos seus clientes com a plataforma completa da FeitoAI.",
    creator: "@feitoai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} ${poppins.variable} font-poppins`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
