const glucoseInput = document.getElementById('glucose-val');
const statusLabel = document.getElementById('label-status');

// Definición de colores base (Saludables)
const baseColors = {
    heart: "#e74c3c", // Rojo
    kidneys: "#2ecc71", // Verde
    eyes: "#f9e231", // Amarillo
    nerves: "#818cf8", // Azul
    feet: "#00ffff", // Cyan
    liver: "#9b59b6", // Púrpura
    digestive: "#e67e22" // Naranja
};

glucoseInput.addEventListener('input', updateVisuals);

function updateVisuals() {
    const val = parseInt(glucoseInput.value);
    
    // Nivel de deterioro (0 a 1)
    // 100mg/dL = 0 daño | 300mg/dL = 1 (Daño máximo visual)
    let damage = Math.max(0, Math.min(1, (val - 120) / 200));

    // Cambiar texto de estado
    if (val < 140) {
        statusLabel.innerText = "Normal";
        statusLabel.style.color = "#2ecc71";
    } else if (val < 200) {
        statusLabel.innerText = "Alerta: Glucotoxicidad";
        statusLabel.style.color = "#f9e231";
    } else {
        statusLabel.innerText = "CRÍTICO: Deterioro Tisular";
        statusLabel.style.color = "#e74c3c";
    }

    // APLICAR CAMBIOS GRÁFICOS A CADA ÓRGANO
    // Usamos una función para oscurecer y "ensuciar" el color
    applyDamage('heart', baseColors.heart, damage);
    applyDamage('vessels', baseColors.heart, damage, true);
    applyDamage('kidneys', baseColors.kidneys, damage);
    applyDamage('eyes', baseColors.eyes, damage);
    applyDamage('nerves', baseColors.nerves, damage, true);
    applyDamage('feet', baseColors.feet, damage);
    applyDamage('liver', baseColors.liver, damage);
    applyDamage('digestive', baseColors.digestive, damage);
}

function applyDamage(id, color, damage, isStroke = false) {
    const element = document.getElementById(id);
    if (!element) return;

    // Calculamos el color "sucio" (mezclando con marrón oscuro/negro)
    // Un valor de damage alto convertirá el color original en algo opaco y oscuro
    const colorFinal = interpolateColor(color, "#2b1b17", damage);
    
    if (isStroke) {
        element.style.stroke = colorFinal;
        element.style.strokeWidth = 2 + (damage * 4); // Las venas se "inflaman"
    } else {
        element.style.fill = colorFinal;
        // Aplicamos un desenfoque (blur) si el daño es crítico
        element.style.filter = `blur(${damage * 2}px)`;
    }
}

// Función técnica para mezclar colores
function interpolateColor(color1, color2, factor) {
    const r1 = parseInt(color1.substring(1,3), 16);
    const g1 = parseInt(color1.substring(3,5), 16);
    const b1 = parseInt(color1.substring(5,7), 16);

    const r2 = parseInt(color2.substring(1,3), 16);
    const g2 = parseInt(color2.substring(3,5), 16);
    const b2 = parseInt(color2.substring(5,7), 16);

    const r = Math.round(r1 + factor * (r2 - r1));
    const g = Math.round(g1 + factor * (g2 - g1));
    const b = Math.round(b1 + factor * (b2 - b1));

    return `rgb(${r}, ${g}, ${b})`;
}

// Iniciar con valores base
updateVisuals();