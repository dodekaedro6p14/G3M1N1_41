// --- 3. LISTA DE CONEXIONES CURVAS ---
// Agrega aquí los pares de puntos que quieres unir
const conexiones_curvas = [
    [2, 3], [3, 4], [4, 2], // tetaedro superior
];

// --- 4. LISTA DE ESFERAS ---
// Elegir los punos para agregar esferas
const puntos_con_esfera = [7,3];

// --- 5. CONEXION DE LOS PUNTOS ---
const conexiones = [
    /* [1, 2],[2, 3],[2, 4],[4, 1],[3,1],[4,3], // tetaedro superior
    [5,6],[5,7],[6,7],[7,8],[6,8],[8,5]  */

  /*   [1, 6], [7, 1], [8, 1], [8, 7], [7, 6], [6,8],
    [5, 2], [5, 3],[5, 4], [4, 3], [4, 2], // tetraedro
  */
   /*  [1, 2],[3,6],[7, 5],[6, 5],[1,4],[7,2], //cubo
    [5,8],[8,3],[4,6],[7,4],[3,1],[8,2]  */
];

// --- 6. TUS PUNTOS 3D ---
// ⚠️ 
const puntos = [
    /* [-50, -50, -50], [50, -50, -50], [50, 50, -50], [-50, 50, -50],
    [-50, -50, 50], [50, -50, 50], [50, 50, 50], [-50, 50, 50],
    [0, -80, 0], [0, 80, 0], [-80, 0, 0], [80, 0, 0],
    [0, 0, -80], [0, -100, 100], [-30, -30, -30], [30, 30, 30],
    [-30, 30, 30], [30, -30, -30], */
    [0, 0, 0], // 18: El núcleo

   /*  [0,-35,0],[-17.68, 15, 30.62],[35.36, 15, 0],[-17.68, 15, -30.62], // tetraedro superior
    [0, 35,0],[ 17.68,-15, -30.62],[-35.36,-15, 0],[17.68,-15, 30.62], 
  */
    [0, 21.2176,0],[ 20.0041, 7.0725,0],[-10.0020, 7.0725, 17.3241],[-10.0020, 7.0725,-17.3241],  // cubo
    [0,-21.2176,0],[-20.0041,-7.0725,0],[ 10.0020,-7.0725,-17.3241],[ 10.0020,-7.0725, 17.3241] 
/* 
    [0, 21.2176,0],[ 24.5,-13,0],[-12.25,-13,21.2176],[-12.25,-13,-21.2176], // tetraedro
    [0,-21.2176,0],[-24.5, 13,0],[12.25, 13,-21.2176],[ 12.25, 13,21.2176] */
];
// --- 7. PINTAR UN POLIGONO DENTRO DEL PLANO ...
// Ejemplo: Un triángulo (3 puntos) y un cuadrado (4 puntos)
const misPoligonos = [
   { puntos: [1, 2, 3], color: "rgba(255, 0, 110, 0.5)" }, // Triángulo
    { puntos: [5, 7, 6], color: "rgba(255, 0, 110, 0.5)" },
/*    { puntos: [13, 14, 16], color: "rgba(255, 0, 110, 0.5)" },
    { puntos: [13, 14, 17], color: "rgba(255, 0, 110, 0.5)" },
    { puntos: [14, 17, 16, 15], color: "rgba(0, 251, 255, 0.5)" } // Cuadrado */
];
const pintarPetalos = [
/*     { puntos: [1,2,3], color: "rgba(255, 0, 110, 1.2)", altura: 0 }, 
    { puntos: [2,3,4], color: "rgba(255, 0, 110, 1.2)", altura: 0 }, 
    { puntos: [2,1,4], color: "rgba(255, 0, 110, 1.2)", altura: 0 }, 
    { puntos: [5,6,7], color: "rgba(255, 0, 110, 1.2)", altura: 0 }, 
    { puntos: [6,7,8], color: "rgba(255, 0, 110, 1.2)", altura: 0 },   
    { puntos: [6,5,8], color: "rgba(255, 0, 110, 1.2)", altura: 0 }  */
];    