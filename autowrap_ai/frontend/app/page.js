// ==============================================================================
// PÁGINA PRINCIPAL DO FRONTEND (NEXT.JS)
// ==============================================================================
// Esta é a interface de usuário principal (estilo Canva/Figma).
// Ela contém: Painel de entrada de dados, geração de arte e preview 3D.
// ==============================================================================

'use client'; // Permite o uso de hooks do React como useState

import React, { useState } from 'react';
import axios from 'axios';
import ThreePreview from '../components/ThreePreview';

export default function Home() {
  // Estados (States) para guardar as informações que o usuário digita
  const [prompt, setPrompt] = useState('');
  const [estilo, setEstilo] = useState('tuning');
  const [arteGerada, setArteGerada] = useState(null);
  const [carregando, setCarregando] = useState(false);

  // Função disparada ao clicar no botão "Gerar Adesivo"
  const handleGerarAdesivo = async () => {
    if (!prompt) {
      alert("Por favor, digite uma descrição para o adesivo.");
      return;
    }

    setCarregando(true);
    try {
      // Faz uma requisição POST para o nosso Backend Node.js
      // O Node.js irá repassar isso para o Python e devolver a imagem
      const resposta = await axios.post('http://localhost:4000/api/art/generate', {
        prompt,
        estilo
      });
      
      // Salva a URL da imagem gerada no estado, para mostrar na tela
      setArteGerada(resposta.data.imagem_url);
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao gerar a arte. Certifique-se de que o backend e o serviço Python estão rodando.");
    } finally {
      // Independentemente de dar erro ou sucesso, paramos o modo de carregamento
      setCarregando(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', padding: '20px', gap: '20px' }}>
      
      {/* BARRA LATERAL ESQUERDA (FERRAMENTAS) */}
      <div style={{ width: '350px', backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '15px', overflowY: 'auto' }}>
        <h2 style={{ margin: 0, color: '#3b82f6' }}>AutoWrap Studio</h2>
        <p style={{ fontSize: '14px', color: '#aaa', margin: 0 }}>Gerador de Adesivos com IA</p>
        
        <hr style={{ borderColor: '#444', margin: '10px 0' }} />

        {/* CAMPO: Descrição da arte (Prompt) */}
        <label style={{ fontSize: '14px', fontWeight: 'bold' }}>O que você deseja no adesivo?</label>
        <textarea 
          placeholder="Ex: Chamas vermelhas esportivas nas laterais, estilo drift..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{ minHeight: '100px', resize: 'none' }}
        />

        {/* CAMPO: Estilo visual */}
        <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Estilo:</label>
        <select value={estilo} onChange={(e) => setEstilo(e.target.value)}>
          <option value="tuning">Tuning / Esportivo</option>
          <option value="minimalista">Minimalista</option>
          <option value="corrida">Carro de Corrida / Rally</option>
          <option value="cyberpunk">Cyberpunk / Neon</option>
        </select>

        {/* BOTÃO GERAR */}
        <button onClick={handleGerarAdesivo} disabled={carregando} style={{ marginTop: '10px', opacity: carregando ? 0.7 : 1 }}>
          {carregando ? '⏳ Gerando com IA...' : '🪄 Gerar Adesivo'}
        </button>

        {/* PREVIEW 2D DA ARTE GERADA */}
        {arteGerada && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>Adesivo Gerado (2D)</h3>
            <img 
              src={arteGerada} 
              alt="Arte Gerada" 
              style={{ width: '100%', borderRadius: '10px', border: '2px solid #3b82f6', objectFit: 'cover' }} 
            />
            <p style={{ fontSize: '12px', color: '#aaa', marginTop: '10px' }}>
              *Pronto para exportação em PNG (300 DPI) para impressão ou PDF.
            </p>
          </div>
        )}
      </div>

      {/* ÁREA CENTRAL (EDITOR E VISUALIZAÇÃO 3D) */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* VISUALIZAÇÃO 3D */}
        <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '10px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 5px 0' }}>Visualização 3D do Veículo</h3>
          <p style={{ fontSize: '12px', color: '#aaa', marginBottom: '15px' }}>
            Arraste para rotacionar. Use o scroll para dar zoom. 
            (Aqui o adesivo gerado será projetado no modelo 3D usando Three.js e coordenadas mapeadas do OpenCV)
          </p>
          <div style={{ flex: 1 }}>
            <ThreePreview stickerUrl={arteGerada} />
          </div>
        </div>

        {/* EDITOR VISUAL 2D (TIPO CANVA - MVP) */}
        <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '10px', height: '300px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 5px 0' }}>Editor de Aplicação Manual (2D)</h3>
          <p style={{ fontSize: '12px', color: '#aaa', marginBottom: '15px' }}>
            Faça upload da foto real do veículo para ajustes finos de posicionamento, escala, transparência e rotação.
          </p>
          <div style={{ 
            flex: 1,
            border: '2px dashed #444', 
            borderRadius: '10px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#666',
            backgroundColor: '#1f1f1f',
            cursor: 'pointer'
          }}>
            <p>☁️ Arraste e solte (Drag & Drop) a foto do veículo aqui</p>
          </div>
        </div>

      </div>
    </div>
  );
}
