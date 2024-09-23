import json
import os
import random

# Función para generar parámetros aleatorios pero lógicos
def generar_datos_aleatorios():
    recomendaciones = [
        "Usa protector solar", 
        "Evita el ejercicio al aire libre", 
        "Usa mascarilla si es necesario", 
        "Toma mucha agua", 
        "Cuida tu piel de los rayos UV",
        "Haz ejercicio regularmente",
        "Mantente hidratado",
        "Evita la exposición prolongada al sol"
    ]
    calidad_aire_opciones = ["buena", "regular", "mala"]
    cancer_risk_opciones = ["bajo", "moderado", "alto"]
    
    return {
        "recommendation": random.choice(recomendaciones),
        "pollution_index": random.randint(0, 100),  # Índice de contaminación entre 0 y 100
        "cancer_risk": random.choice(cancer_risk_opciones),
        "air_quality": random.choice(calidad_aire_opciones),
        "health_recommendations": random.sample(recomendaciones, k=2)  # 2 recomendaciones al azar
    }

# Asumiendo que el archivo 'estados.json' está en el mismo directorio del script
json_file_path = os.path.join(os.path.dirname(__file__), 'estados.json')

# Abrir el archivo JSON y cargarlo como un diccionario de Python
with open(json_file_path, 'r') as file:
    data = json.load(file)

# Recorremos cada 'feature' y le agregamos los nuevos parámetros aleatorios
for feature in data['features']:
    parametros = generar_datos_aleatorios()
    feature['properties']['recommendation'] = parametros["recommendation"]
    feature['properties']['pollution_index'] = parametros["pollution_index"]
    feature['properties']['cancer_risk'] = parametros["cancer_risk"]
    feature['properties']['air_quality'] = parametros["air_quality"]
    feature['properties']['health_recommendations'] = parametros["health_recommendations"]

# Guardar el archivo JSON modificado
with open('estados_modificado2.json', 'w') as file:
    json.dump(data, file, indent=2)

print("Archivo JSON modificado guardado como 'estados_modificado.json'")
