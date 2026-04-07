// --- 3. LISTA DE CONEXIONES CURVAS ---
// Agrega aquí los pares de puntos que quieres unir
const conexiones_curvas = [0,1
   /*  [17, 1],[17, 2],[3, 19],[19,4],[4,20],[5,20],
    [6,21],[5,21],[6,22],[7,22],[7,23],[8,23],[1,24],[8,24] */
];

// --- 4. LISTA DE ESFERAS ---
// Elegir los punos para agregar esferas
const puntos_con_esfera = [0];

// --- 5. CONEXION DE LOS PUNTOS ---
const conexiones = [
    [1, 2],[2, 3],[3, 4],[4, 1], 
    [5, 6], [6, 7], [7, 8], [8,5],
    [3,5],[4,6]
];

// --- 6. TUS PUNTOS 3D ---
// ⚠️ 
const puntos = [
    // [X, -Y, z]
    [0,0,0], //centro

    [-50, -50, -50], [-50, 50, -50], [50, 50, -50], [50, -50, -50],
    [50, 50, 50], [50, -50, 50], [-50, -50, 50], [-50, 50, 50], // centro araña   

    [-65, 65, 65], [65,65,65], [65, -65, 65],[-65, -65, 65],  // cola araña
    [ -65,65, 195], [65,65,195], [ 65, -60, 195],[-65,-65,195],  // Puntos 9-16

    [-50, 50, -40],[-50, 50,-30], // delanteras 1 izq
    [50, 50,-40],[50, 50, -30], //der
    [-100, 45, -70],[-100, 45, -60],[-150, 100, -90], // pata
    [100, 45, -70],[100, 45, -60],[150, 100, -90],   // puntos de 16-26

    [-50, 50, -20], [-50, 50, -10], // delanteras 2 izq
    [50, 50, -20], [50, 50, -10],   // der
    [-100, 45, -30],[-100, 45, -20],[-150, 100, -45], // pata
    [100, 45, -30],[100, 45, -20],[150, 100, -45], // 26-36

    [-50, 50, 10],[-50, 50, 20], // traceras cetro 3 izq   
    [50, 50, 10],[ 50, 50, 20], // der
    [-100, 45, 30],[-100, 45, 20],[-150, 100, 35], // pata
    [100, 45, 30],[100, 45, 20],[150, 100, 35], //37 - 46

    [-50,50,30],[-50,50,40],
    [50,50,30],[50,50,40], // puntos petalos rojos
    [-100, 45, 70],[-100, 45, 60],[-150, 100, 90], // pata
    [100, 45, 70],[100, 45, 60],[150, 100, 90]

];
// --- 7. PINTAR UN POLIGONO DENTRO DEL PLANO ...
// Ejemplo: Un triángulo (3 puntos) y un cuadrado (4 puntos)
const misPoligonos = [
    { puntos: [1, 2, 3, 4], color: "rgba(191, 0, 255, 0.5)" }, // Triángulo
    { puntos: [5, 6, 7, 8], color: "rgba(191, 0, 255, 0.5)" },
    { puntos: [9, 10, 11, 12], color: "rgba(191, 0, 255, 0.5)" },
    { puntos: [13, 14, 15, 16], color: "rgba(191, 0, 255, 0.5)" }, 
    { puntos: [10, 11, 15, 14], color: "rgba(191, 0, 255, 0.5)" }, 
    { puntos: [1, 2, 8, 7], color: "rgba(191, 0, 255, 0.5)" },
    { puntos: [9, 12, 16, 13], color: "rgba(191,0, 255, 0.5)" }

];
// --- NUEVA CONSTANTE: pintarPetalos ---
// Formato: { puntos: [inicio, fin], color: "rgba(...)", altura: 50, angulo: 180 }
const pintarPetalos = [
    { puntos: [17, 21, 22,18 ], color: "rgba(255, 0, 110, 0.2)", altura: 0 }, // Patas delanteras 
    { puntos: [21, 22, 23], color: "rgba(255, 0, 110, 0.2)", altura: 0 },
    { puntos: [19, 24, 25, 20], color: "rgba(255, 0, 110, 0.2)", altura: 0 },
    { puntos: [24, 25, 26], color: "rgba(255, 0, 110, 0.2)", altura: 0 },

    { puntos: [27, 31, 32, 28], color: "rgba(255, 0, 110, 0.2)", altura: 0 }, // patas delanteras centro
    { puntos: [31, 33, 32], color: "rgba(255, 0, 110, 1.0)", altura: 0 },
    { puntos: [29, 34, 35, 30], color: "rgba(255, 0, 110, 0.2)", altura: 0 },
    { puntos: [34, 35, 36], color: "rgba(255, 0, 110, 1.0)", altura: 0 },

    { puntos: [37, 42, 41, 38], color: "rgba(255, 0, 110, 0.2)", altura: 0 },
    { puntos: [41, 43, 42], color: "rgba(255, 0, 110, 1.0)", altura: 0 },
    { puntos: [39, 45,44, 40], color: "rgba(255, 0, 110, 0.2)", altura: 0 },
    { puntos: [44, 46, 45], color: "rgba(255, 0, 110, 1.0)", altura: 0 },

    { puntos: [47, 52,51, 48], color: "rgba(255, 0, 110, 0.2)", altura: 0 },
    { puntos: [52, 53, 51], color: "rgba(255, 0, 110, 1.0)", altura: 0 },
    { puntos: [49, 55, 54, 50], color: "rgba(255, 0, 110, 0.2)", altura: 0 },
    { puntos: [55, 56, 54], color: "rgba(255, 0, 110, 1.0)", altura: 0 },
];
// --- CONFIGURACIÓN DE LAS EXTREMIDADES ---
const CONFIG_ARTICULACIONES = [
    {
        nombre: "Pata Delantera ", 
        indices: [21, 22, 23, 24,25,26],
        config: { altura: 20, avance: -40, velocidad: 0.01, desfase: 0.5 }
    },
    {
        nombre: "Pata Delantera centro", 
        indices: [34, 35, 36, 31,32,33],
        config: { altura: 20, avance: -20, velocidad: 0.01, desfase: 0.2 }
    },
    {
        nombre: "Pata traseras centro",
        indices: [41, 42, 43, 44, 45, 46],
        config: { altura: 20, avance: -30, velocidad: 0.01, desfase: 0.3 } // Desfasada 180°
    },
    {
        nombre: "Pata Traseras", 
        indices: [51, 52, 53, 54, 55, 56],
        config: { altura: 20, avance: -40, velocidad: 0.01, desfase: 0.5 }
    }
    // Puedes agregar Pata Trasera Der, Izq, etc.
];