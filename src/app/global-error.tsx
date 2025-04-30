"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body style={{ padding: 40, fontFamily: 'sans-serif', color: '#b91c1c', background: '#fff0f0' }}>
        <h2>Ocorreu um erro inesperado</h2>
        <pre style={{ color: '#b91c1c', background: '#fff0f0', padding: 16, borderRadius: 8, marginTop: 16 }}>
          {error.message}
        </pre>
        <button
          style={{ marginTop: 24, padding: '8px 24px', borderRadius: 6, background: '#b91c1c', color: '#fff', border: 'none', cursor: 'pointer' }}
          onClick={() => reset()}
        >
          Tentar novamente
        </button>
      </body>
    </html>
  );
}
