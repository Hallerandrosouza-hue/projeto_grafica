@echo off
:: ==============================================================================
:: LAUNCHER AUTOMÁTICO DO AUTOWRAP STUDIO AI
:: ==============================================================================
:: Este script instala dependências se faltarem e inicia os 3 serviços.
:: ==============================================================================

title AutoWrap Studio Launcher
color 0B

cd /d "%~dp0"

echo ===================================================
echo   VERIFICANDO INSTALACOES (Isso pode demorar na 1a vez)
echo ===================================================

:: 1. Verifica Python
cd ai_service
if not exist "venv" (
    echo [Python] Criando ambiente virtual e instalando bibliotecas...
    python -m venv venv
    call venv\Scripts\activate
    pip install -r requirements.txt
)
cd ..

:: 2. Verifica Backend (Node)
cd backend
if not exist "node_modules" (
    echo [Backend] Baixando dependencias do Node.js... Aguarde...
    call npm install
)
cd ..

:: 3. Verifica Frontend (React/Next)
cd frontend
if not exist "node_modules" (
    echo [Frontend] Baixando dependencias do React/Next.js... Aguarde...
    call npm install
)
cd ..

echo.
echo ===================================================
echo       INICIANDO AUTOWRAP STUDIO AI (BETA)
echo ===================================================
echo.

:: 1. INICIAR MICROSERVIÇO DE IA (PYTHON)
echo [1/3] Iniciando o Microservico de IA (Python na porta 5000)...
start "AutoWrap - AI Service (Python)" cmd /k "cd ai_service && title AutoWrap - IA && venv\Scripts\activate && python app.py"
timeout /t 3 /nobreak >nul

:: 2. INICIAR BACKEND (NODE.JS)
echo [2/3] Iniciando o Backend API (Node.js na porta 4000)...
start "AutoWrap - Backend (Node.js)" cmd /k "cd backend && title AutoWrap - Backend && npm run dev"
timeout /t 3 /nobreak >nul

:: 3. INICIAR FRONTEND (NEXT.JS)
echo [3/3] Iniciando a Interface Visual (Next.js na porta 3000)...
start "AutoWrap - Frontend (React/Next)" cmd /k "cd frontend && title AutoWrap - Frontend && npm run dev"

:: Aguarda 8 segundos pro Next.js ter tempo de compilar pela primeira vez
timeout /t 8 /nobreak >nul

:: 4. ABRIR O NAVEGADOR
echo.
echo ===================================================
echo [SUCESSO] Os sistemas estao no ar!
echo ===================================================
start http://localhost:3000

echo Esta tela de inicializacao ira se fechar sozinha.
timeout /t 3 /nobreak >nul
exit
