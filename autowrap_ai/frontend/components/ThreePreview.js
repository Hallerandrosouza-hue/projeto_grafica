// ==============================================================================
// COMPONENTE DE VISUALIZAÇÃO 3D (THREE.JS + REACT THREE FIBER)
// ==============================================================================
// Este componente cria um ambiente 3D básico usando Three.js, facilitado
// pelas bibliotecas @react-three/fiber (que liga o Three.js ao React)
// e @react-three/drei (que fornece ajudantes visuais).
// ==============================================================================

'use client'; // Indica para o Next.js que este é um componente executado no navegador

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

// Componente que representa o "Carro" Genérico (um bloco por enquanto)
function GenericCar({ stickerUrl }) {
  const meshRef = useRef();

  // useFrame executa a cada quadro (frame) da animação, permitindo girar o objeto
  useFrame((state, delta) => {
    // Descomente a linha abaixo para fazer o carro girar automaticamente
    // meshRef.current.rotation.y += delta * 0.2;
  });

  return (
    <mesh ref={meshRef} position={[0, 0.5, 0]}>
      {/* Geometria simples simulando as proporções de um carro (largura, altura, comprimento) */}
      <boxGeometry args={[1.8, 1.2, 4.0]} />
      
      {/* O material do carro. Se quisermos aplicar a textura do adesivo, usaríamos map={textura} */}
      <meshStandardMaterial color="#cccccc" />
    </mesh>
  );
}

export default function ThreePreview({ stickerUrl }) {
  return (
    <div style={{ width: '100%', height: '400px', backgroundColor: '#222', borderRadius: '10px', overflow: 'hidden' }}>
      {/* Canvas é o palco principal do Three.js */}
      <Canvas camera={{ position: [5, 3, 5], fov: 50 }}>
        {/* Iluminação ambiente básica */}
        <ambientLight intensity={0.5} />
        {/* Luz direcional simulando o sol */}
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        
        {/* O nosso "carro" genérico */}
        <GenericCar stickerUrl={stickerUrl} />

        {/* Chão simulado para dar perspectiva */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#111111" />
        </mesh>

        {/* Controles de câmera (OrbitControls) permitem girar, dar zoom e arrastar o cenário 3D com o mouse */}
        <OrbitControls makeDefault />
        {/* Ambiente de iluminação realista pré-pronto (HDR) */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
