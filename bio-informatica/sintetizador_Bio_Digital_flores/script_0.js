// Estado global de la cámara
let state = {
    rotationY: 0,
    zoom: 1,
    defaultRotation: 0,
    defaultZoom: 1
};

// 1. Escuchador de Teclado
window.addEventListener('keydown', (e) => {
    const step = 10; // Grados de rotación
    const zoomStep = 0.1;

    switch(e.key.toLowerCase()) {
        case 'a': state.rotationY -= step; break;
        case 'd': state.rotationY += step; break;
        case 'q': state.zoom += zoomStep; break;
        case 'e': state.zoom = Math.max(0.1, state.zoom - zoomStep); break;
        case 'r': // Reset
            state.rotationY = state.defaultRotation;
            state.zoom = state.defaultZoom;
            break;
    }
    updateCamera();
});

function updateCamera() {
    const flower = document.getElementById('flower');
    flower.style.setProperty('--rotation-y', `${state.rotationY}deg`);
    flower.style.setProperty('--zoom', state.zoom);
}

// 2. Analizador Biológico (Heredado de V1 y mejorado)
function synthesizeFlower() {
    const dna = document.getElementById('dnaInput').value.toUpperCase();
    const log = document.getElementById('bricksLog');
    
    const bioBricks = {
        "RED": "#e74c3c",
        "BLUE": "#58a6ff",
        "GOLD": "#f9e231"
    };

    log.innerHTML = "Analizando ADN...";
    
    for (let key in bioBricks) {
        if (dna.includes(key)) {
            document.documentElement.style.setProperty('--flower-color', bioBricks[key]);
            log.innerHTML = `✅ Gen ${key} expresado en 3D.`;
            return;
        }
    }
}