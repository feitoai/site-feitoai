import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function PoliticaDePrivacidade() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-50 via-violet-50 to-green-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-16 px-4">
        <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl p-8 text-gray-800 dark:text-gray-100 mt-28">
          <h1 className="text-3xl font-bold mb-6 text-primary text-center">Política de Privacidade da FeitoAI</h1>
          <p className="mb-4">A sua privacidade é fundamental para nós. A FeitoAI se compromete a respeitar e proteger todas as informações pessoais que você compartilha conosco. Esta Política de Privacidade descreve como coletamos, usamos, protegemos e compartilhamos seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018), a Constituição Federal da República Federativa do Brasil, o Código de Defesa do Consumidor (Lei 8.078/1990) e o Marco Civil da Internet (Lei 12.965/2014).</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">1. Coleta de Informações Pessoais</h2>
          <p className="mb-4">Solicitamos informações pessoais apenas quando for necessário para fornecer nossos serviços. Coletamos dados como nome, e-mail, endereço e informações de pagamento. Todos os dados são coletados de forma justa e legal, com o seu consentimento explícito e com a explicação do uso desses dados.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">2. Como Usamos as Informações</h2>
          <p className="mb-4">As informações coletadas serão utilizadas para:</p>
          <ul className="list-disc ml-8 mb-4">
            <li>Processar suas compras e transações;</li>
            <li>Oferecer suporte ao cliente;</li>
            <li>Melhorar nossos serviços e oferecer uma experiência personalizada;</li>
            <li>Cumprir obrigações legais e regulatórias.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-2">3. Retenção de Dados</h2>
          <p className="mb-4">Mantemos seus dados pelo tempo necessário para a prestação dos serviços contratados ou para cumprir com obrigações legais e regulatórias. Após esse período, seus dados serão apagados ou anonimizados, conforme apropriado.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">4. Proteção de Dados</h2>
          <p className="mb-4">Adotamos medidas de segurança comercialmente aceitáveis para proteger seus dados contra acessos não autorizados, uso, divulgação, alteração ou destruição. No entanto, como qualquer sistema de segurança digital, não podemos garantir a total segurança de informações transmitidas pela internet.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">5. Compartilhamento de Informações</h2>
          <p className="mb-4">A FeitoAI não compartilha suas informações pessoais com terceiros, exceto quando necessário para a execução de nossos serviços, por exigência legal ou com o seu consentimento prévio.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">6. Links para Sites Externos</h2>
          <p className="mb-4">Nosso site pode conter links para sites de terceiros. Não somos responsáveis pelas práticas de privacidade ou pelo conteúdo desses sites. Recomendamos que leia as políticas de privacidade de qualquer site externo que acessar.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">7. Direitos do Titular de Dados</h2>
          <p className="mb-4">De acordo com a LGPD, você tem os seguintes direitos:</p>
          <ul className="list-disc ml-8 mb-4">
            <li>Confirmar a existência de tratamento de seus dados;</li>
            <li>Acessar seus dados pessoais;</li>
            <li>Corrigir dados incompletos ou incorretos;</li>
            <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários;</li>
            <li>Revogar o consentimento para o tratamento de dados;</li>
            <li>Solicitar a portabilidade de seus dados para outro fornecedor de serviço.</li>
          </ul>
          <p className="mb-4">Você pode exercer esses direitos entrando em contato conosco através dos canais de atendimento disponibilizados em nosso site.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">8. Política de Cookies</h2>
          <p className="mb-4">Utilizamos cookies para melhorar a sua experiência no nosso site. Cookies são pequenos arquivos que são armazenados em seu dispositivo e permitem uma navegação mais eficiente. Você pode configurar seu navegador para bloquear cookies ou alertá-lo quando um cookie for enviado, mas isso pode afetar a funcionalidade do nosso site.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">9. Alterações na Política de Privacidade</h2>
          <p className="mb-4">A FeitoAI pode alterar esta Política de Privacidade a qualquer momento, sem aviso prévio. Alterações serão publicadas em nosso site, e a política modificada entrará em vigor no momento da sua publicação.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">10. Aceitação das Práticas de Privacidade</h2>
          <p className="mb-4">Ao continuar a utilizar nossos serviços e acessar nosso site, você concorda com as práticas descritas nesta Política de Privacidade. Caso não concorde, pedimos que não utilize nossos serviços.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">11. Contato</h2>
          <p className="mb-4">Caso tenha dúvidas sobre nossa Política de Privacidade ou queira exercer seus direitos, entre em contato conosco através dos meios de comunicação disponibilizados em nosso site.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
