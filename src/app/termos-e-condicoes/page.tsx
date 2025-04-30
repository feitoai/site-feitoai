import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function TermosECondicoes() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-50 via-violet-50 to-green-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-16 px-4">
        <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl p-8 text-gray-800 dark:text-gray-100 mt-28">
          <h1 className="text-3xl font-bold mb-6 text-primary text-center">Termos e Condições de Uso FeitoAI</h1>
          <p className="mb-4">A FeitoAI, uma plataforma especializada em serviços de desenvolvimento de soluções digitais utilizando inteligência artificial, tem como compromisso fornecer serviços de qualidade aos seus usuários. Ao acessar ou utilizar os nossos serviços, você concorda em cumprir os seguintes Termos e Condições. Caso não concorde com qualquer parte deste acordo, não utilize nossos serviços.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">1. Definições</h2>
          <p className="mb-4"><b>1.1 "FeitoAI":</b> Refere-se à plataforma que oferece serviços de desenvolvimento digital, incluindo, mas não limitado a, desenvolvimento de sites, aplicativos e gestão de redes sociais com base em inteligência artificial.</p>
          <p className="mb-4"><b>1.2 "Usuário":</b> Qualquer pessoa ou empresa que utilize os serviços da FeitoAI.</p>
          <p className="mb-4"><b>1.3 "Serviços":</b> Qualquer serviço oferecido pela FeitoAI, incluindo, mas não limitado a, desenvolvimento de soluções digitais personalizadas, consultoria, e outros serviços relacionados.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">2. Aceitação dos Termos</h2>
          <p className="mb-4">2.1 Ao utilizar os serviços da FeitoAI, o Usuário concorda com os Termos e Condições aqui descritos. A FeitoAI reserva-se o direito de modificar, atualizar ou revisar estes Termos a qualquer momento, sendo essas modificações informadas ao Usuário por meio de atualizações no site ou outro meio de comunicação adequado.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">3. Cadastro e Responsabilidade do Usuário</h2>
          <p className="mb-4">3.1 Para utilizar os serviços, o Usuário deverá fornecer informações corretas, completas e atualizadas durante o cadastro. O Usuário é responsável por manter a confidencialidade de suas credenciais de acesso e por todas as atividades realizadas em sua conta.</p>
          <p className="mb-4">3.2 O Usuário compromete-se a não utilizar os serviços para qualquer finalidade ilegal, danosa ou prejudicial a terceiros.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">4. Direitos de Propriedade Intelectual</h2>
          <p className="mb-4">4.1 Todos os direitos de propriedade intelectual relacionados aos serviços prestados pela FeitoAI, incluindo, mas não limitado a, softwares, designs, códigos-fonte, e materiais de marketing, são de propriedade exclusiva da FeitoAI ou de seus licenciadores.</p>
          <p className="mb-4">4.2 O Usuário não adquire nenhum direito de propriedade sobre qualquer material intelectual da FeitoAI, exceto aqueles explicitamente autorizados para uso nos serviços.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">5. Uso dos Serviços</h2>
          <p className="mb-4">5.1 O Usuário concorda em utilizar os serviços da FeitoAI de maneira responsável e conforme os parâmetros acordados. A FeitoAI não se responsabiliza por qualquer uso indevido dos serviços por parte do Usuário.</p>
          <p className="mb-4">5.2 A FeitoAI se reserva o direito de suspender ou cancelar o acesso a seus serviços a qualquer momento, caso haja violação destes Termos e Condições.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">6. Pagamento e Taxas</h2>
          <p className="mb-4">6.1 O Usuário concorda em pagar todas as taxas associadas aos serviços fornecidos pela FeitoAI, conforme estabelecido no momento da contratação. O pagamento deve ser efetuado nas condições previamente acordadas.</p>
          <p className="mb-4">6.2 A FeitoAI pode ajustar suas taxas periodicamente, e tais mudanças serão comunicadas com antecedência ao Usuário.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">7. Limitação de Responsabilidade</h2>
          <p className="mb-4">7.1 A FeitoAI não se responsabiliza por danos diretos, indiretos, acidentais, especiais ou consequenciais, incluindo, mas não se limitando a, lucros cessantes, perda de dados ou danos decorrentes de falhas no uso dos serviços.</p>
          <p className="mb-4">7.2 A FeitoAI não garante a continuidade, segurança ou desempenho de seus serviços, embora se empenhe para fornecer soluções eficientes e estáveis.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">8. Privacidade e Proteção de Dados</h2>
          <p className="mb-4">8.1 A FeitoAI respeita a privacidade do Usuário e se compromete a proteger suas informações pessoais de acordo com a legislação aplicável de proteção de dados.</p>
          <p className="mb-4">8.2 O Usuário concorda com a coleta e processamento de seus dados pessoais pela FeitoAI, conforme descrito na nossa Política de Privacidade.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">9. Rescisão</h2>
          <p className="mb-4">9.1 O Usuário pode rescindir o uso dos serviços a qualquer momento, mediante aviso prévio à FeitoAI, de acordo com as condições previstas para cada tipo de serviço contratado.</p>
          <p className="mb-4">9.2 A FeitoAI reserva-se o direito de rescindir os serviços em caso de violação dos Termos e Condições, sem aviso prévio.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">10. Lei Aplicável</h2>
          <p className="mb-4">10.1 Estes Termos e Condições são regidos pelas leis brasileiras. Quaisquer disputas relacionadas a estes Termos serão resolvidas no foro da cidade de São Paulo, Estado de São Paulo, Brasil.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">11. Disposições Gerais</h2>
          <p className="mb-4">11.1 Caso qualquer disposição destes Termos e Condições seja considerada inválida ou inaplicável, as disposições restantes permanecerão em pleno vigor.</p>
          <p className="mb-4">11.2 A falha da FeitoAI em exercer qualquer direito ou disposição destes Termos e Condições não constituirá renúncia a tal direito ou disposição.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">12. Contato</h2>
          <p className="mb-4">Para mais informações, dúvidas ou esclarecimentos, o Usuário pode entrar em contato conosco por meio do e-mail: <a href="mailto:suporte@feitoai.com.br" className="text-primary hover:underline">suporte@feitoai.com.br</a>.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
