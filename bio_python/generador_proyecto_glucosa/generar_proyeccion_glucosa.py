import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import ConnectionPatch

def generar_proyeccion_glucosa(valor_glucosa):
    # Definición de órganos y niveles de daño (simulado basado en literatura médica)
    organos = ['Páncreas', 'Riñones', 'Retina', 'Corazón', 'Nervios']
    colores = ['#e74c3c', '#818cf8', '#f9e231', '#2c3e50', '#58a6ff']
    
    # El daño aumenta exponencialmente con el valor de glucosa (ejemplo didáctico)
    dano = [min(100, (valor_glucosa - 90) * factor) for factor in [0.8, 0.6, 0.5, 0.4, 0.7]]

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 6), facecolor='#0f172a')
    
    # Gráfica 1: Nivel de Glucosa Actual
    ax1.bar(['Glucosa'], [valor_glucosa], color='#f9e231')
    ax1.set_ylim(0, 300)
    ax1.set_title("Nivel de Glucosa (mg/dL)", color='white')
    ax1.tick_params(colors='white')

    # Gráfica 2: Proyección de Deterioro Orgánico (Zoom)
    ax2.barh(organos, dano, color=colores)
    ax2.set_xlim(0, 100)
    ax2.set_title("Deterioro Orgánico Proyectado (%)", color='white')
    ax2.tick_params(colors='white')

    # Líneas de conexión para el efecto "Zoom"
    con = ConnectionPatch(xyA=(0, valor_glucosa), xyB=(0, 100), coordsA="data", coordsB="data",
                          axesA=ax1, axesB=ax2, color="#818cf8", linestyle="--")
    fig.add_artist(con)

    plt.tight_layout()
    plt.savefig('resultado_glucosa.png', facecolor=fig.get_facecolor())
    plt.show()

# Ejemplo de uso:
# generar_proyeccion_glucosa(180)