"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const PLANOS = [
  { label: "Essencial", value: "essencial", mensal: 197, anual: +(197 * 0.85).toFixed(2) },
  { label: "Profissional", value: "profissional", mensal: 497, anual: +(497 * 0.85).toFixed(2) },
  { label: "Enterprise", value: "enterprise" },
];

export default function ContratarPlano() {
  const [plano, setPlano] = useState("essencial");
  const [periodicidade, setPeriodicidade] = useState<'mensal' | 'anual'>('mensal');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const planoURL = searchParams.get("plano");
    const periodicidadeURL = searchParams.get("periodicidade");
    if (planoURL && PLANOS.some(p => p.value === planoURL)) {
      setPlano(planoURL);
    }
    if (periodicidadeURL === 'anual' || periodicidadeURL === 'mensal') {
      setPeriodicidade(periodicidadeURL);
    }
  }, []);

  const [form, setForm] = useState({
    nome: "",
    cpfCnpj: "",
    endereco: "",
    telefone: "",
    email: "",
    financeiroTelefone: "",
    financeiroEmail: "",
    whatsapp: "",
    telegram: "",
    redesSociais: "",
    tipoPagamento: "Cartão de crédito",
    aceitarTermos: false,
  });
  const [enviado, setEnviado] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    if (type === "checkbox" && "checked" in e.target) {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  function handlePlanoChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setPlano(e.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviado(true);
    // Aqui você pode integrar com backend, API, etc.
  }

  const planoSelecionado = PLANOS.find(p => p.value === plano);

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-50 via-violet-50 to-green-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-16 px-4">
        <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl p-8 text-gray-800 dark:text-gray-100 mt-28">
          <h1 className="text-3xl font-bold mb-6 text-primary text-center">Contratar Plano FeitoAI</h1>
          {enviado ? (
            <div className="text-center py-8">
              <h2 className="text-2xl font-semibold text-green-600 mb-4">Pedido enviado com sucesso!</h2>
              <p className="mb-2">Nossa equipe entrará em contato para finalizar a contratação.</p>
            </div>
          ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Escolha do Plano */}
            <div>
              <label className="block text-sm font-medium mb-2">Plano selecionado</label>
              <select name="plano" value={plano} onChange={handlePlanoChange} className="w-full rounded-lg border px-4 py-3 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary">
                <option value="essencial">
                  Essencial ({periodicidade === 'anual' ? `R$167.45/mês anual` : `R$197/mês`})
                </option>
                <option value="profissional">
                  Profissional ({periodicidade === 'anual' ? `R$422.45/mês anual` : `R$497/mês`})
                </option>
                <option value="enterprise">
                  Enterprise (Sob consulta)
                </option>
              </select>
              <div className="mt-2 text-primary font-semibold text-lg">
                {planoSelecionado && planoSelecionado.value === 'essencial' && (
                  <>
                    Essencial: {periodicidade === 'anual' ? (
                      <>
                        R$ {planoSelecionado.anual}/mês <span className="text-sm text-primary/80">(plano anual)</span>
                      </>
                    ) : (
                      <>R$ {planoSelecionado.mensal}/mês</>
                    )}
                  </>
                )}
                {planoSelecionado && planoSelecionado.value === 'profissional' && (
                  <>
                    Profissional: {periodicidade === 'anual' ? (
                      <>
                        R$ {planoSelecionado.anual}/mês <span className="text-sm text-primary/80">(plano anual)</span>
                      </>
                    ) : (
                      <>R$ {planoSelecionado.mensal}/mês</>
                    )}
                  </>
                )}
                {planoSelecionado && planoSelecionado.value === 'enterprise' && (
                  <>Enterprise: <span className="text-primary/80">Sob consulta</span></>
                )}
              </div>
            </div>

            {/* Informações pessoais e empresa */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome completo / Empresa *</label>
                <input type="text" name="nome" value={form.nome} onChange={handleChange} required className="w-full rounded-lg border px-4 py-3 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">CPF ou CNPJ *</label>
                <input type="text" name="cpfCnpj" value={form.cpfCnpj} onChange={handleChange} required className="w-full rounded-lg border px-4 py-3 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Endereço completo *</label>
                <input type="text" name="endereco" value={form.endereco} onChange={handleChange} required className="w-full rounded-lg border px-4 py-3 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Telefone *</label>
                <input type="tel" name="telefone" value={form.telefone} onChange={handleChange} required className="w-full rounded-lg border px-4 py-3 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">E-mail *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full rounded-lg border px-4 py-3 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary" />
              </div>
            </div>

            {/* Dados financeiros */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Telefone do setor financeiro *</label>
                <input type="tel" name="financeiroTelefone" value={form.financeiroTelefone} onChange={handleChange} required className="w-full rounded-lg border px-4 py-3 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">E-mail do setor financeiro *</label>
                <input type="email" name="financeiroEmail" value={form.financeiroEmail} onChange={handleChange} required className="w-full rounded-lg border px-4 py-3 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary" />
              </div>
            </div>

            {/* Dados de integração */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">WhatsApp para chatbot *</label>
                <input type="text" name="whatsapp" value={form.whatsapp} onChange={handleChange} required className="w-full rounded-lg border px-4 py-3 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Telegram (opcional)</label>
                <input type="text" name="telegram" value={form.telegram} onChange={handleChange} className="w-full rounded-lg border px-4 py-3 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Redes Sociais (opcional)</label>
                <input type="text" name="redesSociais" value={form.redesSociais} onChange={handleChange} className="w-full rounded-lg border px-4 py-3 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary" />
              </div>
            </div>

            {/* Resumo do pedido */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mt-6">
              <h3 className="text-lg font-semibold mb-2 text-primary">Resumo do Pedido</h3>
              <div className="flex flex-col gap-2">
                <div><b>Plano:</b> {planoSelecionado?.label}</div>
                <div><b>Valor:</b> {planoSelecionado && planoSelecionado.value !== 'enterprise' ? (
                  periodicidade === 'anual'
                    ? `R$ ${planoSelecionado.anual}/mês (anual)`
                    : `R$ ${planoSelecionado.mensal}/mês`
                ) : 'Sob consulta'}</div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tipo de pagamento</label>
                  <select name="tipoPagamento" value={form.tipoPagamento} onChange={handleChange} className="w-full rounded-lg border px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary">
                    <option>Cartão de crédito</option>
                    <option>Boleto bancário</option>
                    <option>PIX</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Aceite dos termos */}
            <div className="flex items-center mt-4">
              <input type="checkbox" name="aceitarTermos" checked={form.aceitarTermos} onChange={handleChange} required className="w-4 h-4 text-primary bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded focus:ring-primary" />
              <label className="ml-2 text-sm text-dark/70 dark:text-light/70">
                Concordo com os <a href="/termos-e-condicoes" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Termos e Condições</a> <span className="text-primary">*</span>
              </label>
            </div>

            <button type="submit" className="w-full h-12 mt-4 bg-gradient-to-r from-primary via-primary-light to-primary text-white font-medium rounded-full shadow-lg shadow-primary/20 transition-all duration-300 transform hover:scale-105 bg-size-200 bg-pos-0 hover:bg-pos-100 disabled:opacity-70 disabled:cursor-not-allowed">
              Contratar agora
            </button>
          </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}