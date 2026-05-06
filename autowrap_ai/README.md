# AutoWrap Studio AI 🚗🎨

Este é um sistema completo (fullstack) para geração e aplicação de adesivos automotivos com inteligência artificial, utilizando a stack solicitada: **React, Next.js, Three.js, Node.js e Python (OpenCV + IA)**.

## 🏗️ Arquitetura do Sistema

O projeto está dividido em três partes principais, garantindo escalabilidade e uma separação de responsabilidades profissional:

1.  **Frontend (React + Next.js + Three.js)**:
    *   Interface de usuário (UI) moderna e intuitiva inspirada no Canva.
    *   Gerencia o estado da aplicação e as interações do usuário (geração por prompt).
    *   Renderiza o modelo do carro em 3D usando `Three.js` e `@react-three/fiber` para visualização prévia espacial.
2.  **Backend (Node.js + Express)**:
    *   API REST principal que serve o frontend.
    *   Atua como um "gateway", recebendo requisições seguras e comunicando-se com o microserviço Python para as tarefas pesadas.
    *   Pode ser expandido para conectar-se a bancos de dados para salvar histórico, projetos de usuários e autenticação (JWT).
3.  **Microserviço de IA (Python + Flask + OpenCV + Modelos Generativos)**:
    *   Hospeda a biblioteca customizável de veículos (`vehicles.py`) com as dimensões base de largura, comprimento e áreas aproximadas (`capo_m2`, `portas_m2`).
    *   Rota `/api/process-image` pronta para receber e processar imagens através de Visão Computacional (`OpenCV`) para detecção de contornos e perspectivas.
    *   Comunicação direta com modelos de IA (ex: Stable Diffusion, DALL-E) na rota `/api/generate-art`.

## ⚙️ Como rodar o projeto localmente

Para rodar este MVP (Produto Mínimo Viável), você precisará abrir **TRÊS terminais separados**, um para cada serviço.

### Passo 1: Iniciar o Microserviço Python (Terminal 1)
O Python fornece a biblioteca de carros e processa as requisições de Inteligência Artificial.
```bash
cd autowrap_ai/ai_service

# Recomenda-se criar um ambiente virtual (venv)
python -m venv venv

# Ativar venv no Windows:
venv\Scripts\activate

# Instalar as dependências do requirements.txt:
pip install -r requirements.txt

# Rodar o servidor Flask:
python app.py
# O serviço rodará em http://localhost:5000
```

### Passo 2: Iniciar o Backend Node.js (Terminal 2)
O Node.js faz a ponte entre a interface do usuário (React) e a inteligência artificial (Python).
```bash
cd autowrap_ai/backend

# Instalar os pacotes necessários:
npm install

# Iniciar o servidor de desenvolvimento usando nodemon:
npm run dev
# A API rodará em http://localhost:4000
```

### Passo 3: Iniciar o Frontend Next.js (Terminal 3)
A interface de usuário principal, onde a mágica acontece.
```bash
cd autowrap_ai/frontend

# Instalar pacotes do React, Next e Three.js:
npm install

# Iniciar o servidor de desenvolvimento Next.js:
npm run dev
# O painel estará disponível em http://localhost:3000
```

## 📘 Detalhes da Implementação

*   **Comentários Exaustivos**: Atendendo ao requisito crítico, todo o código em Node, Python, React e Three.js possui comentários bloco-a-bloco, explicando desde a definição das rotas até a renderização do Canvas 3D, facilitando muito para desenvolvedores iniciantes expandirem a plataforma.
*   **Biblioteca de Veículos Expansível**: O arquivo `ai_service/vehicles.py` utiliza um dicionário aninhado que funciona como uma simulação de banco de dados, deixando muito simples a tarefa de cadastrar novas marcas de motos, caminhões e carros com especificações exatas.
*   **Editor 2D e Ambiente 3D**: O frontend implementa uma base estrutural para visualização em `Three.js` num painel lateral, enquanto reserva um contêiner para a interface "Drag & Drop" tipo Canva.
*   **Exportação Futura (DPI)**: A arquitetura do backend e Python já foi desenhada para retornar as imagens em resoluções baseadas em métricas, visando o redimensionamento a 300 DPI, garantindo a alta qualidade para impressoras plotter automotivas.
