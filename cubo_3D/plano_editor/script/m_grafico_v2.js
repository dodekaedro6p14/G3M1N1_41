// ==========================================
// MOTOR GRÁFICO (VERSIÓN MODULAR ACTUALIZADA)
// ==========================================

// --- A. FUNCIÓN DE PROYECCIÓN 3D A 2D ---
// Ahora recibe las medidas y ángulos directamente del estado
function proyectar(p3d, width, height, angleX, angleY, angleZ, zoom) {
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

    // --- NUEVA: ROTACIÓN EJE Z ---
    let cosZ = Math.cos(angleZ), sinZ = Math.sin(angleZ);
    let x2 = x * cosZ - y * sinZ;
    let y2 = x * sinZ + y * cosZ;
    x = x2; y = y2;

    // Perspectiva y Zoom
    let fov = 300;
    let zPerspective = z + 200;
    let scale = (fov / (zPerspective || 1)) * zoom;

    return {
        // MODIFICA ESTAS DOS LÍNEAS:
        x: (width / 2 + estado.offsetX) + x * scale,
        y: (height / 2 + estado.offsetY) + y * scale,
        z: z
    };
}

// --- B. FUNCION = DIBUJAR ESFERAS ---
function dibujarEsferaSencilla(ctx, p2d, radio, colorBase = "#ff0000", opacidad = 0.5) {
    ctx.beginPath();

    let grd = ctx.createRadialGradient(
        p2d.x, p2d.y, radio * 0.2, //0.2
        p2d.x, p2d.y, radio
    );
    grd.addColorStop(0, colorBase);
    grd.addColorStop(1, "#ffff80");

    ctx.fillStyle = grd; // Usamos el degradado
    ctx.globalAlpha = opacidad;
    ctx.radio = 250; // 80
    ctx.arc(p2d.x, p2d.y, radio, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1.0; // MUY IMPORTANTE: Resetear opacidad para no afectar el resto
    ctx.closePath();
}

// --- C. FUNCTION = DIBUJAR CURVAS ---
function dibujarCurvaAutomatica(ctx, proyectarFn, indiceA, indiceB, color = "#ff006e", altura = 50, angulo = 180, rellenar = false, puntoasAUsar = puntos) {
    let pA = puntoasAUsar[indiceA];
    let pB = puntoasAUsar[indiceB];
    if (!pA || !pB) return;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color; // Para el relleno
    ctx.lineWidth = 2;

    const segmentos = 40; // Más segmentos para que el círculo se vea suave
    const radianesTotales = (angulo * Math.PI) / 180;

    for (let i = 0; i <= segmentos; i++) {
        let t = i / segmentos;

        // Interpolación lineal básica entre puntos
        let x = pA[0] + (pB[0] - pA[0]) * t;
        let y = pA[1] + (pB[1] - pA[1]) * t;
        let z = pA[2] + (pB[2] - pA[2]) * t;

        // La magia del ángulo: usamos el seno para la elevación
        // Si el ángulo es 180, es una parábola. Si es 360, es un ciclo completo.
        let arco = Math.sin(t * radianesTotales) * altura;

        // Dirección de la "inflación" de la curva (hacia afuera del centro)
        let mag = Math.sqrt(x * x + y * y + z * z) || 1;
        let puntoCurvo = proyectarFn([
            x + (x / mag * arco),
            y + (y / mag * arco),
            z + (z / mag * arco)
        ]);

        if (i === 0) ctx.moveTo(puntoCurvo.x, puntoCurvo.y);
        else ctx.lineTo(puntoCurvo.x, puntoCurvo.y);
    }

    if (rellenar) {
        ctx.fill(); // Pinta el plano interior
    }
    ctx.stroke(); // Dibuja la línea del borde
}

// --- D. FUNCION DIBUJAR EJES ---
function dibujarEjes(ctx, proyectarFn) {
    const limite = 150;
    const ejes = [
        { a: [-limite, 0, 0], b: [limite, 0, 0], col: "#ff4d4d", label: "X" },
        { a: [0, -limite, 0], b: [0, limite, 0], col: "#4dff4d", label: "Y" },
        { a: [0, 0, -limite], b: [0, 0, limite], col: "#4d4dff", label: "Z" }
    ];

    ctx.lineWidth = 1;

    ejes.forEach(eje => {
        const pA = proyectarFn(eje.a);
        const pB = proyectarFn(eje.b);

        ctx.strokeStyle = eje.col;
        ctx.beginPath();
        ctx.moveTo(pA.x, pA.y);
        ctx.lineTo(pB.x, pB.y);
        ctx.stroke();

        ctx.fillStyle = eje.col;
        ctx.font = "bold 12px Arial";
        ctx.fillText(eje.label, pB.x + 5, pB.y + 5);
    });
}

// --- E. FUNCION PINTAR POLIGONOS ---
function dibujarPoligono(ctx, proyectarFn, indices, color = "rgba(0, 251, 255, 1.0)", puntosAUsar = puntos) {
    if (indices.length < 3) return;

    ctx.beginPath();
    let pInicio = proyectarFn(puntosAUsar[indices[0]]);
    ctx.moveTo(pInicio.x, pInicio.y);

    for (let i = 1; i < indices.length; i++) {
        let p = proyectarFn(puntosAUsar[indices[i]]);
        ctx.lineTo(p.x, p.y);
    }

    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    ctx.strokeStyle = color.replace(/[^,]+(?=\))/, '0.8');
    ctx.lineWidth = 1;
    ctx.stroke();
}


// --- F. NUEVA FUNCIÓN: POLÍGONO CON BORDES CURVOS (PÉTALOS) ---
function dibujarPoligonoCurvo(ctx, proyectarFn, indices, color = "rgba(255, 0, 110, 0.3)", altura = 50, puntosAUsar = puntos) {
    if (!indices || indices.length < 3) return; // Necesita al menos 3 puntos

    ctx.beginPath();
    ctx.fillStyle = color;
    // Borde un poco más intenso que el relleno
    ctx.strokeStyle = color.replace(/[^,]+(?=\))/, '0.8');
    ctx.lineWidth = 2;

    const segmentos = 20;

    // Recorremos cada punto para conectarlo con el siguiente
    for (let k = 0; k < indices.length; k++) {
        let pA = puntosAUsar[indices[k]];
        // El siguiente punto (si es el último, vuelve al primero para cerrar la figura)
        let pB = puntosAUsar[indices[(k + 1) % indices.length]];

        if (!pA || !pB) continue;

        // Calculamos el centro de este segmento para saber hacia dónde es "afuera"
        let medioX = (pA[0] + pB[0]) / 2;
        let medioY = (pA[1] + pB[1]) / 2;
        let medioZ = (pA[2] + pB[2]) / 2;

        let mag = Math.sqrt(medioX ** 2 + medioY ** 2 + medioZ ** 2) || 1;

        // Trazamos la curva de pA a pB
        for (let i = 0; i <= segmentos; i++) {
            let t = i / segmentos;

            let x = pA[0] + (pB[0] - pA[0]) * t;
            let y = pA[1] + (pB[1] - pA[1]) * t;
            let z = pA[2] + (pB[2] - pA[2]) * t;

            // Curva parabólica (180 grados = Math.PI)
            let arco = Math.sin(t * Math.PI) * altura;

            let puntoCurvo = proyectarFn([
                x + (x / mag * arco),
                y + (y / mag * arco),
                z + (z / mag * arco)
            ]);

            // Si es el primerísimo punto, movemos el pincel allí. Si no, seguimos la línea.
            if (k === 0 && i === 0) {
                ctx.moveTo(puntoCurvo.x, puntoCurvo.y);
            } else {
                ctx.lineTo(puntoCurvo.x, puntoCurvo.y);
            }
        }
    }

    ctx.closePath(); // Cierra herméticamente la figura
    ctx.fill();      // Pinta el interior
    ctx.stroke();    // Dibuja el borde curvo
}
// --- G MOVER ARTICULACIONES --- 
const memoriaArticulaciones = new Map();

function moverArticulacion(puntos, indices, estado, config) {
    // 1. Guardar la pose original (solo la primera vez)
    indices.forEach(idx => {
        if (puntos[idx] && !memoriaArticulaciones.has(idx)) {
            memoriaArticulaciones.set(idx, [...puntos[idx]]);
        }
    });

    if (!estado.animacionArticulada) return;

    let dx = 0;
    let dy = 0;

    // 2. Calcular el tiempo del ciclo con el desfase
    let t = (estado.tiempoOscilacion * config.velocidad + config.desfase) % 1;

    // 3. Lógica de las 4 fases
    if (t < 0.25) { 
        // Fase 1: Subir
        let p = t / 0.25;
        dy = -config.altura * p;
    } else if (t < 0.5) {
        // Fase 2: Desplazar
        let p = (t - 0.25) / 0.25;
        dy = -config.altura;
        dx = config.avance * p;
    } else if (t < 0.75) {
        // Fase 3: Bajar
        let p = (t - 0.5) / 0.25;
        dy = -config.altura * (1 - p);
        dx = config.avance;
    } else {
        // Fase 4: Regresar
        let p = (t - 0.75) / 0.25;
        dx = config.avance * (1 - p);
        dy = 0;
    }

    // 4. Aplicar el desplazamiento a los puntos
    indices.forEach(idx => {
        const orig = memoriaArticulaciones.get(idx);
        if (orig) {
            // Aquí es donde daba el error si dx/dy no estaban definidas arriba
            puntos[idx][2] = orig[2] + dx;
            puntos[idx][1] = orig[1] + dy;
        }
    });    

}
