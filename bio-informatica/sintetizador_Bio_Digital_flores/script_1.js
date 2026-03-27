// --- ESTADO GLOBAL ---
let state = {
    rotY: 0,
    rotX: -20, // Inclinación inicial para ver el 3D
    zoom: 1,
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0
};

const flower = document.getElementById('flower');
const mouseArea = document.getElementById('mouseArea');

// --- CONTROLES DE TECLADO ---
window.addEventListener('keydown', (e) => {
    const step = 8;
    const zStep = 0.1;
    switch(e.key.toLowerCase()) {
        case 'a': state.rotY -= step; break;
        case 'd': state.rotY += step; break;
        case 'w': state.rotX -= step; break;
        case 'z': state.rotX += step; break;
        case 'q': state.zoom += zStep; break;
        case 'e': state.zoom = Math.max(0.2, state.zoom - zStep); break;
        case 'r': resetView(); break;
    }
    updateTransform();
});

// --- CONTROLES DE MOUSE (Rotación y Zoom) ---
mouseArea.onmousedown = (e) => { 
    state.isDragging = true; 
    state.lastMouseX = e.clientX; 
    state.lastMouseY = e.clientY; 
};
window.onmouseup = () => { state.isDragging = false; };
window.onmousemove = (e) => {
    if (!state.isDragging) return;
    let deltaX = e.clientX - state.lastMouseX;
    let deltaY = e.clientY - state.lastMouseY;
    state.rotY += deltaX * 0.5;
    state.rotX -= deltaY * 0.5;
    state.lastMouseX = e.clientX;
    state.lastMouseY = e.clientY;
    updateTransform();
};
mouseArea.onwheel = (e) => {
    state.zoom += e.deltaY * -0.001;
    state.zoom = Math.min(Math.max(0.2, state.zoom), 3);
    updateTransform();
};

function updateTransform() {
    flower.style.setProperty('--rotation-y', `${state.rotY}deg`);
    flower.style.setProperty('--rotation-x', `${state.rotX}deg`);
    flower.style.setProperty('--zoom', state.zoom);
}

function resetView() {
    state.rotY = 0; state.rotX = -20; state.zoom = 1;
    updateTransform();
}

// --- ANALIZADOR DE ADN Y MORFOGÉNESIS ---
function synthesizeFlower() {
    const dna = document.getElementById('dnaInput').value.toUpperCase();
    const log = document.getElementById('bricksLog');
    const container = document.getElementById('petalContainer');
    
    log.innerHTML = "🧬 Iniciando síntesis de especie...";
    container.innerHTML = ""; // Limpiar pétalos anteriores

    // 1. Color (Bio-Bricks)
    const colors = { "RED": "#e74c3c", "BLUE": "#58a6ff", "GOLD": "#f9e231", "PURP": "#818cf8" };
    let activeColor = "#818cf8";
    for (let key in colors) { if (dna.includes(key)) activeColor = colors[key]; }
    document.documentElement.style.setProperty('--flower-color', activeColor);

    // 2. Extraer parámetros numéricos del ADN (Ej: P12 = 12 pétalos)
    const numPetals = extractParam(dna, "P", 4); // Default 4
    const pWidth = extractParam(dna, "W", 60);  // Default 60px
    const pLength = extractParam(dna, "L", 80); // Default 80px

    // 3. Generación de Pétalos en el espacio 3D
    for (let i = 0; i < numPetals; i++) {
        const p = document.createElement('div');
        p.className = 'petal';
        const angle = (360 / numPetals) * i;
        
        p.style.width = `${pWidth}px`;
        p.style.height = `${pLength}px`;
        p.style.left = `calc(50% - ${pWidth/2}px)`;
        p.style.top = `-${pLength/2}px`;
        
        // Rotación individual de cada pétalo para formar la corola
        p.style.transform = `rotateY(${angle}deg) rotateX(-30deg) translateZ(20px)`;
        container.appendChild(p);
    }

    log.innerHTML = `✅ Fenotipo expresado: ${numPetals} pétalos, Ancho: ${pWidth}, Largo: ${pLength}.`;
}

// Función auxiliar para leer "genes" numéricos como P12, W40, etc.
function extractParam(dna, letter, defaultVal) {
    const regex = new RegExp(`${letter}(\\dd+)`);
    const match = dna.match(regex);
    return match ? parseInt(match[1]) : defaultVal;
}   