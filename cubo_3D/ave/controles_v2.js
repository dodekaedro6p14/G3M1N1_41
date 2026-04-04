// --- controles.js ---
function configurarControles(estado) {
    // 1. Controles de Teclado
    window.onkeydown = (e) => {
        const key = e.key.toLowerCase();

        if (key === 'q') estado.zoom += 0.1;
        if (key === 'e') estado.zoom = Math.max(0.1, estado.zoom - 0.1);
        if (key === 'a') estado.angleY -= 0.1;
        if (key === 'd') estado.angleY += 0.1;
        if (key === 'w') estado.angleX += 0.1;
        if (key === 's') estado.angleX -= 0.1;

        if (key === 'r') {
            estado.angleX = 0; 
            estado.angleY = 0; 
            estado.zoom = 1; 
            estado.animacionActiva = false;
        }
        if (key === 'p') {
            estado.animacionActiva = !estado.animacionActiva;
        }
        if (key === 'v') {
            estado.mostrarIndices = !estado.mostrarIndices;
        }
        if (key === 't') {
            estado.animacionPuntos = !estado.animacionPuntos;
            console.log("Estado de Levitacion:", estado.animacionPuntos);
        }
    };

    // 2. Mouse (Arrastre para rotar)
    let drag = false, lastX, lastY;

    window.onmousedown = (e) => {
        drag = true;
        lastX = e.clientX;
        lastY = e.clientY;
    };

    window.onmouseup = () => drag = false;

    window.onmousemove = (e) => {
        if (!drag) return;
        estado.angleY += (e.clientX - lastX) * 0.01;
        estado.angleX += (e.clientY - lastY) * 0.01;
        lastX = e.clientX;
        lastY = e.clientY;
    };
}