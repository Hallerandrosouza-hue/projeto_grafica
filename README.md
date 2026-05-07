# projeto_grafica
# projeto_grafica
=====================================
Essa parte comentada Pelos Dev
=====================================

Ponto importante se você tiver ideia para melhorar Fiquem à vontade Sabemos O resultado que a gente queremos no final Não importa Os meios
Quiser mudar alguma coisa excluir a vontade viu meninos 

===================================
HALLERANDRO 
===================================
Galera eu fiz milagre Ao conseguir subir essa parte KKK
AI não tá nem a metade da pasta que tava antes..

Em relação Beck vocês podem mudar o que vocês quiser Querem estar servindo de porra nenhuma

OBS: Se vocês quiserem mudar o Os Jarscript para outra  AVONTADE 


==================================
THAYRON
==================================



================================
JONH WESLEY
===============================





AutoWrap Studio AI 🚗🎨
Este é um sistema completo (fullstack) para geração e aplicação de adesivos automotivos com inteligência artificial, utilizando a stack solicitada: React, Next.js, Three.js, Node.js e Python (OpenCV + IA).

🏗️ Arquitetura do Sistema
O projeto está dividido em três partes principais, garantindo escalabilidade e uma separação de responsabilidades profissional:

Frontend (React + Next.js + Three.js):
Interface de usuário (UI) moderna e intuitiva inspirada no Canva.
Gerencia o estado da aplicação e as interações do usuário (geração por prompt).
Renderiza o modelo do carro em 3D usando Three.js e @react-three/fiber para visualização prévia espacial.
Backend (Node.js + Express):
API REST principal que serve o frontend.
Atua como um "gateway", recebendo requisições seguras e comunicando-se com o microserviço Python para as tarefas pesadas.
Pode ser expandido para conectar-se a bancos de dados para salvar histórico, projetos de usuários e autenticação (JWT).
Microserviço de IA (Python + Flask + OpenCV + Modelos Generativos):
Hospeda a biblioteca customizável de veículos (vehicles.py) com as dimensões base de largura, comprimento e áreas aproximadas (capo_m2, portas_m2).
Rota /api/process-image pronta para receber e processar imagens através de Visão Computacional (OpenCV) para detecção de contornos e perspectivas.
Comunicação direta com modelos de IA (ex: Stable Diffusion, DALL-E) na rota /api/generate-art.
⚙️ Como rodar o projeto localmente
Para rodar este MVP (Produto Mínimo Viável), você precisará abrir TRÊS terminais separados, um para cada serviço.

Passo 1: Iniciar o Microserviço Python (Terminal 1)
O Python fornece a biblioteca de carros e processa as requisições de Inteligência Artificial.

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
Passo 2: Iniciar o Backend Node.js (Terminal 2)
O Node.js faz a ponte entre a interface do usuário (React) e a inteligência artificial (Python).

cd autowrap_ai/backend

# Instalar os pacotes necessários:
npm install

# Iniciar o servidor de desenvolvimento usando nodemon:
npm run dev
# A API rodará em http://localhost:4000
Passo 3: Iniciar o Frontend Next.js (Terminal 3)
A interface de usuário principal, onde a mágica acontece.

cd autowrap_ai/frontend

# Instalar pacotes do React, Next e Three.js:
npm install

# Iniciar o servidor de desenvolvimento Next.js:
npm run dev
# O painel estará disponível em http://localhost:3000
📘 Detalhes da Implementação
Comentários Exaustivos: Atendendo ao requisito crítico, todo o código em Node, Python, React e Three.js possui comentários bloco-a-bloco, explicando desde a definição das rotas até a renderização do Canvas 3D, facilitando muito para desenvolvedores iniciantes expandirem a plataforma.
Biblioteca de Veículos Expansível: O arquivo ai_service/vehicles.py utiliza um dicionário aninhado que funciona como uma simulação de banco de dados, deixando muito simples a tarefa de cadastrar novas marcas de motos, caminhões e carros com especificações exatas.
Editor 2D e Ambiente 3D: O frontend implementa uma base estrutural para visualização em Three.js num painel lateral, enquanto reserva um contêiner para a interface "Drag & Drop" tipo Canva.
Exportação Futura (DPI): A arquitetura do backend e Python já foi desenhada para retornar as imagens em resoluções baseadas em métricas, visando o redimensionamento a 300 DPI, garantindo a alta qualidade para impressoras plotter automotivas. 






# 🚗🎨 AutoWrap Studio AI

O **AutoWrap Studio AI** é uma plataforma inteligente para criação de adesivos automotivos com inteligência artificial, pensada para simplificar e acelerar todo o processo de design, visualização e preparação para impressão.

A proposta é simples: transformar uma ideia em um adesivo pronto em poucos segundos.

## 💡 Como funciona

O sistema permite que qualquer pessoa — mesmo sem conhecimento em design — consiga criar artes personalizadas para veículos de forma rápida e intuitiva.

Basta seguir o fluxo:

1. O usuário digita uma ideia (ex: “adesivo estilo corrida com chamas vermelhas”)
2. A inteligência artificial gera automaticamente a arte
3. A arte é aplicada em um modelo de carro em 3D
4. O usuário visualiza o resultado em tempo real
5. Pode ajustar se necessário
6. Exporta o arquivo pronto para impressão em alta qualidade

## 🎯 Objetivo

Eliminar a dependência de processos manuais demorados e reduzir o retrabalho entre cliente e designer, oferecendo uma solução prática para:

- Gráficas
- Profissionais de envelopamento automotivo
- Designers
- Empresas de personalização

## 🧠 Diferencial

O grande diferencial do AutoWrap Studio AI é unir três etapas em um único sistema:

- Geração automática de arte com IA
- Simulação visual no veículo (preview realista)
- Exportação pronta para impressão (alta resolução)

Isso reduz drasticamente o tempo de produção e aumenta a precisão do resultado final.

## 🏗️ Arquitetura do Sistema

O projeto foi estruturado de forma escalável e modular, dividido em três camadas principais:

### Frontend
Interface moderna inspirada em ferramentas como Canva, responsável pela interação com o usuário e visualização 3D do veículo.

### Backend
API responsável por gerenciar requisições, segurança e comunicação entre o frontend e o serviço de inteligência artificial.

### Microserviço de IA
Responsável pela geração das artes e processamento de imagens, incluindo análise de perspectiva e aplicação nos modelos de veículos.

## ⚙️ Tecnologias Utilizadas

- Frontend: React + Next.js + Three.js
- Backend: Node.js + Express
- IA e Processamento: Python + OpenCV + modelos generativos

## 🚀 Execução do Projeto

Para rodar o projeto localmente, é necessário iniciar três serviços separadamente:

1. Microserviço de IA (Python)
2. Backend (Node.js)
3. Frontend (Next.js)

Cada serviço funciona de forma independente, garantindo maior escalabilidade e organização do sistema.

## 📦 Expansão futura

O projeto foi planejado para evoluir facilmente, permitindo:

- Cadastro de novos veículos com medidas reais
- Sistema de login e gerenciamento de usuários
- Histórico de projetos
- Exportação com precisão para impressão (300 DPI)
- Integração com bancos de dados
- Otimização automática de encaixe da arte no veículo

## 📌 Resumo

O AutoWrap Studio AI é uma solução completa que transforma ideias em adesivos automotivos prontos, combinando inteligência artificial, visualização 3D e automação de design em uma única plataforma.
