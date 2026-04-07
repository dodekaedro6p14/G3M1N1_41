// FUNCIONES DE DIBUJO

// --- A. FUNCIÓN DE PROYECCIÓN 3D A 2D ---
function proyectar(p3d) {
    let x = p3d[0], y = p3d[1], z = p3d[2];

    // Rotación Eje X
    let cosX = Math.cos(angleX), sinX = Math.sin(angleX);
    let y1 = y * cosX - z * sinX;
    let z1 = y * sinX + z * cosX;
    y = y1; z = z1;

    // Rotación Eje Y
    let cosY = Math.cos(angleY), sinY = Math.sin(angleY);
    let x1 = x * cosY + z * sinY;
    let z2 = -x * sinY + z * cosY;
    x = x1; z = z2;

    // Perspectiva y Zoom
    let fov = 300;
    let zPerspective = z + 200;
    let scale = (fov / (zPerspective || 1)) * zoom;

    return {
        x: width / 2 + x * scale,
        y: height / 2 + y * scale,
        z: z
    };
}

// --- B FUNCION = dibujar esferas ---
function dibujarEsferaSencilla(p2d, radio = 80, colorBase = "#ff0000", opacidad) {
    ctx.beginPath();

    // Creamos un degradado muy sutil solo para dar algo de profundidad natural
    let grd = ctx.createRadialGradient(
        p2d.x, p2d.y, radio * 0.2,
        p2d.x, p2d.y, radio
    );
    grd.addColorStop(0, colorBase); // Color real en el centro
    grd.addColorStop(1, "#1a1a1a"); // Oscurece ligeramente en los bordes

    ctx.fillStyle = colorBase;
    ctx.globalAlpha = opacidad;
    ctx.beginPath();
    ctx.arc(p2d.x, p2d.y, radio, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.5;
    ctx.closePath();
}

// --- C. FUNCIÓN FÁBRICA DE CURVAS INTELIGENTES ---
function dibujarCurvaAutomatica(indiceA, indiceB, color = "#ff006e", altura = 50) {
    let pA = puntos[indiceA];
    let pB = puntos[indiceB];
    if (!pA || !pB) return; // Si el punto no existe, sale sin dar error

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    const segmentos = 25;

    // Calcula hacia dónde es "afuera"
    let medioX = (pA[0] + pB[0]) / 2;
    let medioY = (pA[1] + pB[1]) / 2;
    let medioZ = (pA[2] + pB[2]) / 2;

    let mag = Math.sqrt(medioX ** 2 + medioY ** 2 + medioZ ** 2);
    let dirX = mag === 0 ? 0 : medioX / mag;
    let dirY = mag === 0 ? 1 : medioY / mag;
    let dirZ = mag === 0 ? 0 : medioZ / mag;

    for (let i = 0; i <= segmentos; i++) {
        let t = i / segmentos;

        let x = pA[0] + (pB[0] - pA[0]) * t;
        let y = pA[1] + (pB[1] - pA[1]) * t;
        let z = pA[2] + (pB[2] - pA[2]) * t;

        let arco = Math.sin(t * Math.PI) * altura;

        let puntoCurvo = proyectar([
            x + (dirX * arco),
            y + (dirY * arco),
            z + (dirZ * arco)
        ]);

        if (i === 0) ctx.moveTo(puntoCurvo.x, puntoCurvo.y);
        else ctx.lineTo(puntoCurvo.x, puntoCurvo.y);
    }
    ctx.stroke();
}

// --- D. FUNCION DIBUJAR EJES ---
function dibujarEjes() {
    const limite = 150; // El eje irá de -200 a 200

    // Definimos puntos de inicio (A) y fin (B) para cada dimensión
    const ejeX = { a: [-limite, 0, 0], b: [limite, 0, 0], col: "#ff4d4d", label: "X" };
    const ejeY = { a: [0, -limite, 0], b: [0, limite, 0], col: "#4dff4d", label: "Y" };
    const ejeZ = { a: [0, 0, -limite], b: [0, 0, limite], col: "#4d4dff", label: "Z" };

    const ejes = [ejeX, ejeY, ejeZ];

    ctx.lineWidth = 1; // Un poco más fino para que no estorbe la vista

    ejes.forEach(eje => {
        // Proyectamos ambos extremos del eje
        const pA = proyectar(eje.a);
        const pB = proyectar(eje.b);

        // Dibujar la línea que atraviesa el plano
        ctx.strokeStyle = eje.col;
        ctx.beginPath();
        ctx.moveTo(pA.x, pA.y);
        ctx.lineTo(pB.x, pB.y);
        ctx.stroke();

        // Dibujar la letra en el extremo positivo
        ctx.fillStyle = eje.col;
        ctx.font = "bold 12px Arial";
        ctx.fillText(eje.label, pB.x + 5, pB.y + 5);
    });
}

// --- E. FUNCION PINTAR POLIGONOS
function dibujarPoligono(indices, color = "rgba(0, 251, 255, 1.0)") {
    if (indices.length < 3) return; // Se necesitan al menos 3 puntos para un polígono

    ctx.beginPath();

    // Proyectamos el primer punto para empezar el camino
    let pInicio = proyectar(puntos[indices[0]]);
    ctx.moveTo(pInicio.x, pInicio.y);

    // Recorremos el resto de los puntos
    for (let i = 1; i < indices.length; i++) {
        let p = proyectar(puntos[indices[i]]);
        ctx.lineTo(p.x, p.y);
    }

    ctx.closePath(); // Cierra el polígono volviendo al primer punto

    ctx.fillStyle = color;
    ctx.fill(); // Rellena el interior

    // Opcional: dibujar un borde sutil
    ctx.strokeStyle = color.replace(/[^,]+(?=\))/, '0.8'); // Hace el borde más opaco
    ctx.lineWidth = 1;
    ctx.stroke();
}