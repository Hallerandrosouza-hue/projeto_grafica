# ==============================================================================
# BIBLIOTECA DE VEÍCULOS (MÓDULO PYTHON)
# ==============================================================================
# Este arquivo contém as definições base de vários carros e motos para o sistema.
# O objetivo é fornecer dimensões aproximadas que ajudarão na escala e
# posicionamento dos adesivos gerados pela IA e aplicados pelo OpenCV.
#
# ⚠️ IMPORTANTE: Os dados aqui são APROXIMAÇÕES (estimativas) em metros ou
# metros quadrados (m²) e devem ser ajustados conforme o projeto exija maior
# precisão. A estrutura é feita com dicionários para ser facilmente expandida,
# ou no futuro, movida para um banco de dados real (como PostgreSQL ou MongoDB).
# ==============================================================================

class VehicleLibrary:
    def __init__(self):
        # Dicionário principal contendo os dados dos veículos.
        # A chave principal é a marca, dentro temos os modelos e as especificações.
        self.vehicles = {
            "Volkswagen": {
                "Gol": {
                    "anos_compativeis": ["2018", "2019", "2020", "2021", "2022"],
                    "dimensoes": {
                        "largura": 1.65,      # Largura do carro em metros
                        "altura": 1.46,       # Altura do carro em metros
                        "comprimento": 3.89,  # Comprimento do carro em metros
                        "entre_eixos": 2.46   # Distância entre as rodas em metros
                    },
                    "estimativas_area": {
                        "capo_m2": 1.2,       # Área estimada do capô em metros quadrados
                        "portas_m2": 2.5,     # Área estimada das portas (soma) em m²
                        "lateral_m2": 3.5,    # Área estimada da lateral inteira em m²
                        "teto_m2": 1.8        # Área estimada do teto em m²
                    }
                }
            },
            "Honda": {
                "Civic": {
                    "anos_compativeis": ["2020", "2021", "2022", "2023"],
                    "dimensoes": {
                        "largura": 1.79,
                        "altura": 1.43,
                        "comprimento": 4.64,
                        "entre_eixos": 2.70
                    },
                    "estimativas_area": {
                        "capo_m2": 1.5,
                        "portas_m2": 3.0,
                        "lateral_m2": 4.2,
                        "teto_m2": 2.0
                    }
                }
            }
        }

    def get_vehicle_data(self, marca, modelo):
        """
        Função para buscar os dados de um veículo específico.
        
        Passo a passo da lógica:
        1. Verifica se a marca existe no dicionário.
        2. Se existir, verifica se o modelo também existe dentro da marca.
        3. Se ambos existirem, retorna os dados do veículo.
        4. Caso contrário, retorna um erro ou mensagem avisando que não foi encontrado.
        """
        if marca in self.vehicles:
            if modelo in self.vehicles[marca]:
                return self.vehicles[marca][modelo]
            else:
                return {"erro": f"Modelo '{modelo}' não encontrado na marca '{marca}'."}
        else:
            return {"erro": f"Marca '{marca}' não encontrada na biblioteca."}

    def list_all_brands(self):
        """ Retorna uma lista com todas as marcas disponíveis. """
        return list(self.vehicles.keys())
