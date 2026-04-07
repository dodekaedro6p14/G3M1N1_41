const container = document.getElementById('curved-screen');

// --- CONFIGURACIÓN EDITABLE ---
const totalColumns = 24;      // Cantidad de segmentos de la tabla
const degPerColumn = 100;      // EDITABLE: Grados de rotación entre columnas (define la curva)
const radius = 600;           // EDITABLE: Radio de la profundidad 600

// Variables de estado (Basadas en tu archivo anterior)
let rotationY = 0;
let zoomZ = -200;

// Generador de la Estructura Curva
function buildScreen() {
    for (let i = 0; i < totalColumns; i++) {
        const col = document.createElement('div');
        col.className = 'columna-tabla';

        // Calculamos el ángulo central para que la tabla esté frente al usuario
        const offset = (totalColumns - 1) * degPerColumn / 2;
        const angle = (i * degPerColumn) - offset;

        // Aplicamos la transformación 3D para posicionar cada parte en la curva
        col.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;

        col.innerHTML = `
                    <div class="titulo-celda">DATA_SEG_${i}</div>
                    <div class="contenido-celda">
                        FILAMENTO LUMINOSO: ACTIVO <br>
                        ESTADO: ESTUDIO TEÓRICO <br>
                        ------------------------- <br>
                        Nada es totalmente oscuro. Las interacciones cuánticas generan luz en el vacío.
                    </div>
                `;
        container.appendChild(col);
    }
}

// Motor de Dirección (Styles CSS y transformaciones)
function updateTransform() {
    // Controlamos la rotación (A/D) y el Zoom (Q/E)
    container.style.transform = `translateZ(${zoomZ}px) rotateY(${rotationY}deg)`;
}

// Eventos de Teclado (Funciones solicitadas)
document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    switch (key) {
        case 'a': // Rotar Izquierda
            rotationY += 5;
            break;
        case 'd': // Rotar Derecha
            rotationY -= 5;
            break;
        case 'q': // Zoom In (Acercar)
            zoomZ += 50;
            break;
        case 'e': // Zoom Out (Alejar)
            zoomZ -= 50;
            break;
        case 'r': // Restaurar posición original
            rotationY = 0;
            zoomZ = -200;
            break;
    }
    updateTransform();
});

// Inicialización
buildScreen();
updateTransform();