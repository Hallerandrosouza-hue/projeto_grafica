# ==============================================================================
# MICROSERVIÇO DE IA (PYTHON) - FLASK/FASTAPI
# ==============================================================================
# Este microserviço é responsável por rodar as partes pesadas:
# 1. Processamento de Imagem com OpenCV (para ajudar no posicionamento/corte).
# 2. Integração com IA para geração do adesivo (Ex: Stable Diffusion).
#
# Para simplicidade neste MVP, usaremos o framework Flask (mas poderia ser FastAPI).
# ==============================================================================

from flask import Flask, request, jsonify
import cv2 # Importa OpenCV para processamento de imagens
import numpy as np
# import torch # Descomente quando for usar PyTorch
# from diffusers import StableDiffusionPipeline # Para geração de imagens (requer placa de vídeo)
from vehicles import VehicleLibrary

app = Flask(__name__)
vehicle_lib = VehicleLibrary()

# ------------------------------------------------------------------------------
# ROTA 1: Obter informações do veículo
# ------------------------------------------------------------------------------
@app.route('/api/vehicle', methods=['GET'])
def get_vehicle():
    """
    Esta rota permite que o Backend (Node.js) consulte as medidas do veículo.
    Exemplo de requisição: GET /api/vehicle?marca=Honda&modelo=Civic
    """
    marca = request.args.get('marca')
    modelo = request.args.get('modelo')
    
    if not marca or not modelo:
        return jsonify({"erro": "Parâmetros 'marca' e 'modelo' são obrigatórios"}), 400
        
    data = vehicle_lib.get_vehicle_data(marca, modelo)
    return jsonify(data)

# ------------------------------------------------------------------------------
# ROTA 2: Geração de Artes usando IA (Mock/Exemplo)
# ------------------------------------------------------------------------------
@app.route('/api/generate-art', methods=['POST'])
def generate_art():
    """
    Rota para gerar uma arte de adesivo usando Inteligência Artificial.
    Na versão final, aqui ficaria o código do Stable Diffusion ou DALL-E.
    """
    dados = request.json
    prompt = dados.get('prompt', 'adesivo automotivo esportivo')
    estilo = dados.get('estilo', 'tuning')
    
    # ⚠️ AQUI ENTRARIA A CHAMADA REAL PARA STABLE DIFFUSION OU DALL-E.
    # Exemplo de lógica (comentada):
    # pipe = StableDiffusionPipeline.from_pretrained("runwayml/stable-diffusion-v1-5")
    # image = pipe(prompt=prompt).images[0]
    # image.save("output_art.png")
    
    # Como este é um MVP, vamos apenas simular que a imagem foi gerada
    # retornando uma URL falsa ou uma mensagem de sucesso.
    print(f"Gerando arte: '{prompt}' no estilo '{estilo}'...")
    
    return jsonify({
        "status": "sucesso",
        "mensagem": "Arte gerada com sucesso (Simulação)",
        "prompt_utilizado": prompt,
        "imagem_url": "https://via.placeholder.com/600x400.png?text=Arte+Gerada+por+IA" 
    })

# ------------------------------------------------------------------------------
# ROTA 3: Processamento de Imagem (OpenCV)
# ------------------------------------------------------------------------------
@app.route('/api/process-image', methods=['POST'])
def process_image():
    """
    Usa o OpenCV para detectar contornos do veículo (MVP).
    Isso ajuda a entender onde o adesivo deve ser aplicado.
    """
    # Lógica simplificada:
    # 1. Receberia a imagem via upload
    # 2. Converteria para tons de cinza
    # 3. Aplicaria detecção de bordas (Canny Edge Detection)
    # 4. Retornaria as coordenadas para o frontend
    
    return jsonify({
        "status": "simulado",
        "mensagem": "OpenCV aplicaria máscaras de segmentação aqui."
    })

if __name__ == '__main__':
    # Roda o servidor na porta 5000
    app.run(host='0.0.0.0', port=5000, debug=True)
