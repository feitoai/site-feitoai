"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-[70vh] py-16 px-4 bg-gradient-to-br from-blue-50 via-violet-50 to-green-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl p-8 w-full max-w-xl text-center">
          <h2 className="text-3xl font-bold text-red-700 dark:text-red-300 mb-4">Página não encontrada</h2>
          <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">A página que você procura não existe ou foi removida.</p>
          <a href="/" className="text-primary font-semibold underline hover:text-primary-dark transition-colors">Voltar para a Home</a>
        </div>
      </main>
      <Footer />
    </>
  );
}

