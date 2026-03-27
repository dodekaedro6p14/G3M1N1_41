// --- ESTADO DE LA CÁMARA (Mantenido) ---
let state = {
    rotY: 0, rotX: -20, zoom: 1,
    isDragging: false, lastMouseX: 0, lastMouseY: 0
};

const flower = document.getElementById('flower');
const mouseArea = document.getElementById('mouseArea');

// --- INTERACCIÓN (Mantenida) ---
window.addEventListener('keydown', (e) => {
    const step = 8; const zStep = 0.1;
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

mouseArea.onmousedown = (e) => { state.isDragging = true; state.lastMouseX = e.clientX; state.lastMouseY = e.clientY; };
window.onmouseup = () => { state.isDragging = false; };
window.onmousemove = (e) => {
    if (!state.isDragging) return;
    state.rotY += (e.clientX - state.lastMouseX) * 0.5;
    state.rotX -= (e.clientY - state.lastMouseY) * 0.5;
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


// --- NUEVO: MOTOR BIOINFORMÁTICO Y MORFOGÉNESIS ---

function synthesizeFlower() {
    let dna = document.getElementById('dnaInput').value.toUpperCase().replace(/[^ACGT]/g, ''); // Limpiar secuencia
    const log = document.getElementById('bricksLog');
    const container = document.getElementById('petalContainer');
    
    container.innerHTML = ""; 
    
    if (dna.length < 50) {
        log.innerHTML = "⚠️ Secuencia muy corta. Ingresa al menos 50 pares de bases para una expresión viable.";
        return;
    }

    log.innerHTML = "🧬 Secuenciando genoma y calculando fenotipo...";

    // 1. ANÁLISIS DEL GENOMA (Bioinformática)
    const length = dna.length;
    const countG = (dna.match(/G/g) || []).length;
    const countC = (dna.match(/C/g) || []).length;
    const countA = (dna.match(/A/g) || []).length;
    const countT = (dna.match(/T/g) || []).length;
    
    const gcContent = ((countG + countC) / length) * 100;

    // 2. DETERMINAR LA ESPECIE BASE (Clasificación por GC y marcadores)
    // Basado en tus bases de datos: Loto (~43.6%), Trepadora (~42.8%), Cactus (~43.1%)
    let species = "Mutante Desconocido";
    let basePetals, pWidth, pHeight, baseRadius, zOffset;

    if (gcContent >= 43.4) {
        species = "Flor de Loto (Nelumbo)";
        basePetals = 12; pWidth = 60; pHeight = 110;
        baseRadius = "50% 50% 50% 50% / 60% 60% 40% 40%"; // Anchos y suaves
        zOffset = 5; // Más plana
    } else if (gcContent <= 42.9) {
        species = "Trepadora (Passiflora)";
        basePetals = 24; pWidth = 15; pHeight = 90;
        baseRadius = "50% 50% 50% 50% / 90% 90% 10% 10%"; // Finos y agudos
        zOffset = 15; // Más tridimensional (corona)
    } else {
        species = "Cactus Estrella (Astrophytum)";
        basePetals = 8; pWidth = 50; pHeight = 70;
        baseRadius = "10% 10% 50% 50% / 10% 10% 90% 90%"; // Geométricos, romboides
        zOffset = 0; // Pegados al tallo
    }

    // 3. MUTACIONES: Modificadores basados en nucleótidos específicos
    // Las mutaciones cambian ligeramente la forma base
    const sizeMutation = (countA - countT) * 0.5; 
    pWidth += sizeMutation;
    pHeight += (length / 50); // Genomas más largos = flores más largas

    // 4. BIOSÍNTESIS DEL COLOR (Expresión de Pigmentos)
    // Usamos la proporción de bases para mezclar colores RGBA
    const redHue = Math.floor((countA / length) * 255);
    const blueHue = Math.floor((countT / length) * 255);
    const greenHue = Math.floor((countG / length) * 200); // Limitamos verde para que no parezcan hojas
    const pigment1 = `rgb(${redHue}, ${greenHue}, ${blueHue})`;
    const pigment2 = `rgb(${redHue - 40}, ${greenHue + 20}, ${blueHue + 40})`;
    
    const activePigment = `radial-gradient(circle, ${pigment1}, ${pigment2})`;

    // 5. CONSTRUCCIÓN DEL ÓVULO/CENTRO
    const bulb = document.querySelector('.center-bulb');
    // El centro brilla más si hay muchas Citosinas (C)
    bulb.style.background = `radial-gradient(circle, #f9e231, rgb(${countC*2}, 100, 20))`;
    bulb.style.boxShadow = `0 0 ${countC / 2}px rgba(249, 226, 49, 0.8)`;

    // 6. GENERACIÓN DE ESTRUCTURAS 3D (Morfogénesis)
    for (let i = 0; i < basePetals; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        
        const angleY = (360 / basePetals) * i;
        
        petal.style.width = `${Math.max(10, pWidth)}px`; // Evitar tamaños negativos
        petal.style.height = `${Math.max(20, pHeight)}px`;
        petal.style.background = activePigment;
        petal.style.borderRadius = baseRadius;
        petal.style.position = "absolute";
        petal.style.left = "50%";
        petal.style.top = "50%";
        
        petal.style.transformOrigin = "bottom center";
        petal.style.transform = `
            translate(-50%, -100%) 
            rotateY(${angleY}deg) 
            rotateX(-40deg) 
            translateZ(${zOffset}px)
        `;
        
        // Mutación fenotípica individual: pequeñas irregularidades naturales
        const organicChaos = Math.sin(i) * 5; 
        petal.style.filter = `hue-rotate(${i * (15/basePetals)}deg) brightness(${0.9 + (organicChaos/50)})`;

        container.appendChild(petal);
    }

    // 7. INFORME BIOINFORMÁTICO EN PANTALLA
    log.innerHTML = `
        <strong>✅ Especie Detectada:</strong> ${species}<br>
        <strong>🧬 Longitud:</strong> ${length} bp | <strong>GC:</strong> ${gcContent.toFixed(2)}%<br>
        <strong>🌸 Fenotipo:</strong> ${basePetals} pétalos | Color Base: RGB(${redHue}, ${greenHue}, ${blueHue})
    `;
}