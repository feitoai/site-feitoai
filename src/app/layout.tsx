import type { Metadata } from "next";
import { Inter, Outfit, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ChatWidget } from "@/components/chat-widget";
import Script from "next/script";

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
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: '/favicon.svg',
  },
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
          {/* <ChatWidget /> */}
        </ThemeProvider>
        {/* <Script id="chatwoot-script" strategy="afterInteractive">
          {`
            (function(d,t) {
              var BASE_URL="https://chat.feitoai.site";
              var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
              g.src=BASE_URL+"/packs/js/sdk.js";
              g.defer = true;
              g.async = true;
              s.parentNode.insertBefore(g,s);
              g.onload=function(){
                window.chatwootSDK.run({
                  websiteToken: 'wwGxDgLST7mnZmGVC5jcCGqS',
                  baseUrl: BASE_URL
                })
              }
            })(document,"script");
          `}
        </Script> */}
        <Script id="chatwoot-script" strategy="afterInteractive">
          {`
    window.chatwootSettings = {
      "position": "right",
      "type": "expanded_bubble",
      "launcherTitle": "Converse conosco"
    };
    (function(d,t) {
      var BASE_URL="https://chat.feitoai.site";
      var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
      g.src=BASE_URL+"/packs/js/sdk.js";
      g.defer = true;
      g.async = true;
      s.parentNode.insertBefore(g,s);
      g.onload=function(){
        window.chatwootSDK.run({
          websiteToken: 'wwGxDgLST7mnZmGVC5jcCGqS',
          baseUrl: BASE_URL
        });
      }
    })(document,"script");
  `}
        </Script>
      </body>
    </html>
  );
}
