# ==============================================================================
# LAUNCHER AVANÇADO DO AUTOWRAP STUDIO AI (POWERSHELL)
# ==============================================================================
# Este script faz a mesma função do arquivo .bat, porém utilizando as capacidades
# do PowerShell, permitindo uma formatação com cores melhores e código mais limpo.
#
# COMO USAR:
# Clique com o botão direito neste arquivo e selecione "Executar com o PowerShell".
# ==============================================================================

# Configura o título da janela do PowerShell
$Host.UI.RawUI.WindowTitle = "AutoWrap Studio - PowerShell Launcher"
Clear-Host

# Imprime mensagens coloridas para o usuário
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "       INICIANDO AUTOWRAP STUDIO AI (BETA)         " -ForegroundColor Yellow
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

# Pega o caminho do diretório exato de onde o script está sendo executado
$baseDir = $PSScriptRoot
Set-Location $baseDir

# Função auxiliar para verificar a existência dos diretórios
function Check-Folder($folderName) {
    if (-Not (Test-Path "$baseDir\$folderName")) {
        Write-Host "[ERRO] A pasta '$folderName' não foi encontrada no diretório atual." -ForegroundColor Red
        Write-Host "Por favor, verifique se as pastas do projeto foram movidas." -ForegroundColor Gray
        Write-Host "`nPressione qualquer tecla para sair..."
        $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") | Out-Null
        exit
    }
}

# Verificação de segurança para as 3 pastas essenciais
Check-Folder "ai_service"
Check-Folder "backend"
Check-Folder "frontend"

# 1. Iniciar Microserviço de IA (Python)
Write-Host "[1/3] Iniciando o Microserviço de IA (Python)..." -ForegroundColor Green
# Start-Process abre uma nova janela isolada do prompt de comando
Start-Process cmd -ArgumentList "/k title AutoWrap - IA (Porta 5000) && cd ai_service && if exist venv\Scripts\activate (venv\Scripts\activate && python app.py) else (echo ALERTA: VENV NAO ENCONTRADO! && pause)"
Start-Sleep -Seconds 3

# 2. Iniciar Backend (Node.js)
Write-Host "[2/3] Iniciando o Backend API (Node.js)..." -ForegroundColor Green
Start-Process cmd -ArgumentList "/k title AutoWrap - Backend (Porta 4000) && cd backend && npm run dev"
Start-Sleep -Seconds 3

# 3. Iniciar Frontend (Next.js)
Write-Host "[3/3] Iniciando a Interface Visual (Next.js)..." -ForegroundColor Green
Start-Process cmd -ArgumentList "/k title AutoWrap - Frontend (Porta 3000) && cd frontend && npm run dev"
Start-Sleep -Seconds 6

# 4. Abrir Navegador automaticamente
Write-Host ""
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "[SUCESSO] Os serviços estão carregando em segundo plano!" -ForegroundColor Yellow
Write-Host "Iniciando o navegador padrao em http://localhost:3000..." -ForegroundColor White
Write-Host "===================================================" -ForegroundColor Cyan

# Abre a URL no navegador padrão do Windows (Google Chrome, Edge, etc)
Start-Process "http://localhost:3000"

Write-Host "`nLauncher finalizado. Pressione qualquer tecla para fechar esta janela..."
$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") | Out-Null
