// --- 1. INICIALIZACIÓN Y CONFIGURACIÓN ---
const inputGlucosa = document.getElementById('glucosa');
const labelStatus = document.getElementById('label-status');
const zoomContainer = document.getElementById('zoom-container');

// Elementos de capa vulnerables a diabetes
const affectedLayersIds = ['nervioso', 'digestivo', 'urinario', 'circulatorio', 'piel'];

// Estados de visualización de sistemas (cargamos por defecto activas)
const systemVisibility = {
    'esqueleto': true,
    'muscular': false,
    'nervioso': false,
    'digestivo': false,
    'urinario': false,
    'circulatorio': true,
    'respiratorio': true,
    'piel': true
};

// --- 2. MOTOR CIENTÍFICO: IMPACTO DE DIABETES Y COLOR ---
// Valor de fallecimiento definido
const CRITICAL_GLUCOSE_LIMIT = 600; 

function evaluarImpactoCientífico() {
    let glucosa = parseInt(inputGlucosa.value);
    
    // Evitar valores nulos o negativos
    if (isNaN(glucosa) || glucosa < 0) return;

    // Calcular factor de daño (0 es sano, 1 es daño máximo severo / muerte)
    let factorDaño = 0;
    let factorSalud = 1;
    
    if (glucosa <= 100) {
        labelStatus.textContent = "Óptimo (Normal)";
        labelStatus.className = "status-healthy";
        factorDaño = 0;
        factorSalud = 1;
    } else if (glucosa > 100 && glucosa < CRITICAL_GLUCOSE_LIMIT) {
        labelStatus.textContent = "Diabetes Tipo 2 (Daño Progresivo)";
        labelStatus.className = "status-danger";
        // Fórmula progresiva: a más glucosa, más daño, llega a 1 al alcanzar 600 mg/dL
        factorDaño = (glucosa - 100) / (CRITICAL_GLUCOSE_LIMIT - 100); 
        factorSalud = 1 - factorDaño;
    } else {
        labelStatus.textContent = "Fallecimiento (Necrosis Severa)";
        labelStatus.className = "status-danger necrotico";
        factorDaño = 1; // Daño máximo
        factorSalud = 0;
    }

    // APLICAR LÓGICA DE COLOR NEÓN / FOSFORESCENTE
    
    // Filtro para órganos sanos (Verde Fosforescente)
    // Aplicamos alto contraste y brillo para efecto neón
    const filtroSano = `hue-rotate(120deg) brightness(${1 + factorSalud * 0.5}) contrast(1.5)`;
    
    // Filtro para órganos afectados (Rojo Neón progresivo)
    // Usamos hue-rotate para cambiar a rojo, brightness para oscurecer y contrast para neón.
    // Al acercarse a 600, el brillo cae drásticamente simulando necrosis.
    const brilloAfectado = 1.5 - (factorDaño * 1.3); // Baja de 1.5 a 0.2 (oscuro necrótico)
    const contrasteAfectado = 1.5; 
    
    const filtroAfectado = `hue-rotate(-120deg) brightness(${brilloAfectado}) contrast(${contrasteAfectado})`;

    // Aplicar filtros a todas las capas activas
    for (let system in systemVisibility) {
        if (systemVisibility[system]) {
            const layerImg = document.getElementById(`layer-${system}`);
            if (layerImg) {
                // Verificamos si el sistema es vulnerable (está en la lista)
                if (affectedLayersIds.includes(system)) {
                    layerImg.style.filter = filtroAfectado;
                } else {
                    layerImg.style.filter = filtroSano;
                }
            }
        }
    }
}

// Iniciar evaluación al cargar y escuchar cambios
inputGlucosa.addEventListener('input', evaluarImpactoCientífico);

// --- 3. LÓGICA DE VISUALIZACIÓN DE SISTEMAS (MENÚ LEFT) ---
const systemButtons = document.querySelectorAll('.btn-system');

systemButtons.forEach(button => {
    // Escuchar clicks en los botones
    button.addEventListener('click', () => {
        const systemKey = button.getAttribute('data-system');
        
        // Alternar visibilidad lógica
        systemVisibility[systemKey] = !systemVisibility[systemKey];
        
        // Actualizar UI del botón
        button.classList.toggle('active');
        
        // Actualizar la capa de la imagen
        actualizarCapaImagen(systemKey);
        
        // Re-evaluar impacto de glucosa para aplicar el color correcto a la nueva capa
        evaluarImpactoCientífico();
    });
});

function actualizarCapaImagen(systemKey) {
    const layerImg = document.getElementById(`layer-${systemKey}`);
    if (layerImg) {
        if (systemVisibility[systemKey]) {
            layerImg.style.opacity = "1";
            layerImg.style.zIndex = "2"; // Por delante
        } else {
            layerImg.style.opacity = "0";
            layerImg.style.zIndex = "-1"; // Por detrás
        }
    }
}

// Inicializar capas al cargar la página (según systemVisibility por defecto)
for (let system in systemVisibility) {
    actualizarCapaImagen(system);
}


// --- 4. MOTOR DE ZOOM (Q, E y Rueda del Ratón) ---
let escalaActual = 1.0;
const escalaMinima = 0.5; // Límite para alejar
const escalaMaxima = 4.0; // Límite para acercar
const pasoZoom = 0.1;     // Velocidad del zoom

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

// Iniciar evaluación inicial al cargar la página
evaluarImpactoCientífico();