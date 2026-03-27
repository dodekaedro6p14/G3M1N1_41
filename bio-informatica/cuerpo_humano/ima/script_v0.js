// --- 1. MOTOR DE ZOOM (Q, E y Rueda del Ratón) ---
let escalaActual = 1.0;
const escalaMinima = 0.5; // Límite para alejar
const escalaMaxima = 4.0; // Límite para acercar
const pasoZoom = 0.1;     // Velocidad del zoom

const zoomContainer = document.getElementById('zoom-container');

// Evento: Rueda del ratón
document.getElementById('viewport').addEventListener('wheel', function(event) {
    event.preventDefault(); // Evita que la página haga scroll normal
    if (event.deltaY < 0) {
        escalaActual += pasoZoom; // Scroll arriba = Acercar
    } else {
        escalaActual -= pasoZoom; // Scroll abajo = Alejar
    }
    aplicarZoom();
});

// Evento: Teclas Q y E
document.addEventListener('keydown', function(event) {
    const tecla = event.key.toLowerCase();
    if (tecla === 'q') {
        escalaActual += pasoZoom; // Q = Acercar
        aplicarZoom();
    } else if (tecla === 'e') {
        escalaActual -= pasoZoom; // E = Alejar
        aplicarZoom();
    }
});

function aplicarZoom() {
    // Mantener la escala dentro de los límites anatómicos
    if (escalaActual < escalaMinima) escalaActual = escalaMinima;
    if (escalaActual > escalaMaxima) escalaActual = escalaMaxima;
    
    // Aplicar transformación CSS
    zoomContainer.style.transform = `scale(${escalaActual})`;
}

// --- 2. MOTOR CIENTÍFICO: IMPACTO DE DIABETES ---
const inputGlucosa = document.getElementById('glucosa');
const labelStatus = document.getElementById('label-status');

// Elementos de la lista de estado
const textCirculatorio = document.getElementById('status-circulatorio');
const textUrinario = document.getElementById('status-urinario');
const textNervioso = document.getElementById('status-nervioso');
const textPiel = document.getElementById('status-piel');
const textDigestivo = document.getElementById('status-digestivo');

// Escuchar cambios en el input de glucosa
inputGlucosa.addEventListener('input', evaluarDaño);

function evaluarDaño() {
    let glucosa = parseInt(inputGlucosa.value);
    
    // Evitar valores nulos o negativos
    if (isNaN(glucosa) || glucosa < 0) return;

    // Calcular factor de daño (0 es sano, 1 es daño máximo severo)
    let factorDaño = 0;
    
    if (glucosa <= 100) {
        labelStatus.textContent = "Óptimo (Normal)";
        labelStatus.className = "status-normal";
        actualizarTextos("normal");
    } else if (glucosa > 100 && glucosa <= 125) {
        labelStatus.textContent = "Prediabetes (Riesgo)";
        labelStatus.className = "status-warning";
        factorDaño = 0.2; // Daño leve
        actualizarTextos("riesgo");
    } else {
        labelStatus.textContent = "Diabetes Tipo 2 (Daño Activo)";
        labelStatus.className = "status-danger";
        // Fórmula progresiva: a más glucosa, más daño, máximo en 400 mg/dL
        factorDaño = Math.min((glucosa - 125) / 275, 1) + 0.2; 
        if(factorDaño > 1) factorDaño = 1;
        actualizarTextos("daño");
    }

    // APLICAR DETERIORO VISUAL A LOS ÓRGANOS AFECTADOS
    // Oscurecemos (brightness) y damos un tono pardo/necrosado (sepia)
    const brillo = 1 - (factorDaño * 0.7); // Baja hasta el 30% de luz
    const tonoSepia = factorDaño * 0.6;    // Sube hasta 60% de tono sepia
    
    const filtroCSS = `brightness(${brillo}) sepia(${tonoSepia})`;

    // Seleccionamos todas las capas vulnerables (las que tienen clase 'damageable')
    const organosVulnerables = document.querySelectorAll('.damageable');
    organosVulnerables.forEach(organo => {
        organo.style.filter = filtroCSS;
    });
}

function actualizarTextos(estado) {
    if (estado === "normal") {
        textCirculatorio.innerHTML = "❤️ <strong>Circulatorio:</strong> Vasos sanos";
        textUrinario.innerHTML = "🩸 <strong>Riñones:</strong> Filtrado eficiente";
        textNervioso.innerHTML = "⚡ <strong>Nervioso:</strong> Sensibilidad al 100%";
        textPiel.innerHTML = "🛡️ <strong>Piel:</strong> Cicatrización rápida";
        textDigestivo.innerHTML = "🍏 <strong>Digestivo:</strong> Digestión normal";
    } else if (estado === "riesgo") {
        textCirculatorio.innerHTML = "❤️ <strong>Circulatorio:</strong> Leve inflamación";
        textUrinario.innerHTML = "🩸 <strong>Riñones:</strong> Sobreesfuerzo leve";
        textNervioso.innerHTML = "⚡ <strong>Nervioso:</strong> Estrés oxidativo inicial";
        textPiel.innerHTML = "🛡️ <strong>Piel:</strong> Resequedad leve";
        textDigestivo.innerHTML = "🍏 <strong>Digestivo:</strong> Ligera lentitud";
    } else {
        textCirculatorio.innerHTML = "❤️ <strong>Circulatorio:</strong> Ateroesclerosis grave / Isquemia";
        textUrinario.innerHTML = "🩸 <strong>Riñones:</strong> Nefropatía diabética / Falla";
        textNervioso.innerHTML = "⚡ <strong>Nervioso:</strong> Neuropatía diabética / Dolor";
        textPiel.innerHTML = "🛡️ <strong>Piel:</strong> Acantosis / Úlceras diabéticas";
        textDigestivo.innerHTML = "🍏 <strong>Digestivo:</strong> Gastroparesia severa";
    }
}

// Iniciar evaluación al cargar la página
evaluarDaño();