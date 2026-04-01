// --- 3. LISTA DE CONEXIONES CURVAS ---
// Agrega aquí los pares de puntos que quieres unir
const conexiones_curvas = [
    [4, 12],
    [5, 8],
    [6, 7]
];

// --- 4. LISTA DE ESFERAS ---
// Elegir los punos para agregar esferas
const puntos_esfera = [9, 11, 10, 0];

// --- 5. CONEXION DE LOS PUNTOS ---
const conexiones = [
    [1, 2], [2, 3], [3, 4], [4, 1], // cubo base
    [5, 6], [6, 4], [5, 1], [8, 5], [8, 2], [7, 3], [7, 8], [7, 6],
    [15, 16], [17, 14], [14, 16], [15, 17], // tetraedro
    [13, 14], [13, 15], [13, 16], [13, 17]
];

// --- 6. TUS PUNTOS 3D ---
// ⚠️ 
const puntos = [
    [-50, -50, -50], [50, -50, -50], [50, 50, -50], [-50, 50, -50],
    [-50, -50, 50], [50, -50, 50], [50, 50, 50], [-50, 50, 50],
    [0, -80, 0], [0, 80, 0], [-80, 0, 0], [80, 0, 0],
    [0, 0, -80], [0, -100, 100], [-30, -30, -30], [30, 30, 30],
    [-30, 30, 30], [30, -30, -30],
    [0, 0, 0] // 18: El núcleo
];
// --- 7. PINTAR UN POLIGONO DENTRO DEL PLANO ...
// Ejemplo: Un triángulo (3 puntos) y un cuadrado (4 puntos)
const misPoligonos = [
    { puntos: [13, 15, 16], color: "rgba(255, 0, 110, 0.5)" }, // Triángulo
    { puntos: [13, 17, 16], color: "rgba(255, 0, 110, 0.5)" },
    { puntos: [13, 14, 16], color: "rgba(255, 0, 110, 0.5)" },
    { puntos: [13, 14, 17], color: "rgba(255, 0, 110, 0.5)" },
    { puntos: [14, 17, 16, 15], color: "rgba(0, 251, 255, 0.5)" } // Cuadrado
];