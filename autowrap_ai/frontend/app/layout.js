// ==============================================================================
// LAYOUT PRINCIPAL (NEXT.JS)
// ==============================================================================
// Este arquivo define a estrutura básica de todas as páginas (HTML/BODY).
// Aqui também importamos o CSS global.
// ==============================================================================

import './globals.css';

export const metadata = {
  title: 'AutoWrap Studio AI',
  description: 'Gerador e Editor de Adesivos Automotivos com IA',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, padding: 0, fontFamily: 'Arial, sans-serif', backgroundColor: '#1a1a1a', color: '#fff' }}>
        {/* 'children' representa as páginas que serão injetadas aqui */}
        {children}
      </body>
    </html>
  );
}
