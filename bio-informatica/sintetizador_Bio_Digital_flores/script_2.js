// --- ESTADO DE LA CÁMARA ---
let state = {
    rotY: 0,
    rotX: -20,
    zoom: 1,
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0
};

const flower = document.getElementById('flower');
const mouseArea = document.getElementById('mouseArea');

// --- INTERACCIÓN (MANTENIDA Y MEJORADA) ---
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

// Mouse y Scroll
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

// --- MOTOR DE MORFOGÉNESIS ORGÁNICA ---

function synthesizeFlower() {
    const dna = document.getElementById('dnaInput').value.toUpperCase();
    const log = document.getElementById('bricksLog');
    const container = document.getElementById('petalContainer');
    
    container.innerHTML = ""; // Limpiar biosíntesis anterior
    log.innerHTML = "🧬 Decodificando secuencia de ADN...";

    // 1. PALETA DE COLORES NATURALES (Bio-Pigmentos)
    const pigments = {
        "RED": "radial-gradient(circle, #ff5f6d, #ffc371)", // Antocianina
        "BLUE": "radial-gradient(circle, #2193b0, #6dd5ed)", // Delphinidina
        "GOLD": "radial-gradient(circle, #fceeb5, #fba100)", // Carotenoide
        "PURP": "radial-gradient(circle, #834d9b, #d04ed6)", // Malvidina
        "PINK": "radial-gradient(circle, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)"
    };

    let activePigment = pigments["PINK"]; // Color base natural
    for (let key in pigments) {
        if (dna.includes(key)) activePigment = pigments[key];
    }

    // 2. EXTRACCIÓN DE GENES (Mejorada con Regex más flexible)
    // Buscamos la letra y capturamos los números que le siguen
    const getGene = (letter, def) => {
        const match = dna.match(new RegExp(`${letter}(\\d+)`));
        return match ? parseInt(match[1]) : def;
    };

    const numPetals = getGene("P", 8);  // Gen P: Cantidad
    const pWidth = getGene("W", 40);    // Gen W: Ancho (Width)
    const pHeight = getGene("L", 100);  // Gen L: Largo (Length)

    // 3. CONSTRUCCIÓN DEL ÓVULO/CENTRO (Alineación perfecta)
    const bulb = document.querySelector('.center-bulb');
    bulb.style.background = "radial-gradient(circle, #f9e231, #e67e22)";
    bulb.style.boxShadow = "0 0 15px rgba(249, 226, 49, 0.5)";

    // 4. GENERACIÓN DE PÉTALOS ORGÁNICOS
    for (let i = 0; i < numPetals; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        
        // Ángulo de rotación basado en el círculo
        const angleY = (360 / numPetals) * i;
        
        // Estilo orgánico: Curvatura natural de los pétalos
        petal.style.width = `${pWidth}px`;
        petal.style.height = `${pHeight}px`;
        petal.style.background = activePigment;
        petal.style.borderRadius = "50% 50% 50% 50% / 80% 80% 20% 20%"; // Forma de gota/hoja
        petal.style.position = "absolute";
        petal.style.left = "50%";
        petal.style.top = "50%";
        
        // El secreto de la armonía: Desplazamiento desde el centro (translateZ) 
        // y rotación en X para que se abran como una flor real
        petal.style.transformOrigin = "bottom center";
        petal.style.transform = `
            translate(-50%, -100%) 
            rotateY(${angleY}deg) 
            rotateX(-35deg) 
            translateZ(10px)
        `;
        
        // Añadir una ligera variación de color para naturalidad
        petal.style.filter = `hue-rotate(${i * (20/numPetals)}deg) brightness(0.95)`;

        container.appendChild(petal);
    }

    log.innerHTML = `✅ Especie Sintetizada: ${numPetals} pétalos orgánicos. Dimorfismo: ${pWidth}x${pHeight}.`;
}