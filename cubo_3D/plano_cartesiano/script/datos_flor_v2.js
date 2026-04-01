// --- 3. LISTA DE CONEXIONES CURVAS ---
// Agrega aquí los pares de puntos que quieres unir
const conexiones_curvas = [
   /*  [17, 1],[17, 2],[3, 19],[19,4],[4,20],[5,20],
    [6,21],[5,21],[6,22],[7,22],[7,23],[8,23],[1,24],[8,24] */
];

// --- 4. LISTA DE ESFERAS ---
// Elegir los punos para agregar esferas
const puntos_con_esfera = [0];

// --- 5. CONEXION DE LOS PUNTOS ---
const conexiones = [
    [1, 2],[8, 1],[2, 3],[3, 4],[4, 5], 
    [5, 6], [6, 7], [7, 8], // poligono  petalos 
    
    [16, 9], [9, 10], [10, 11], [11, 12], [12, 13],
    [13, 14], [14, 15], [15, 16], // poligono nucelo 
     
   /*  [17, 1], [17, 2], [18, 2], [18, 3] */
];

// --- 6. TUS PUNTOS 3D ---
// ⚠️ 
const puntos = [
    // [X, -Z, Y]
    [0,0,0], //centro

    [-50, 0, 0], [-35, 0, 35], [0, 0, 50], [35, 0, 35],
    [50, 0, 0], [35, 0, -35], [0, 0, -50], [-35, 0, -35], // poligono 8 lados   

    [-25, -10, 0], [-17.5, -10, 17.5], [0, -10, 25], [17.5, -10, 17.5],
    [25, -10, 0], [17.5, -10, -17.5], [0, -10, -25], [-17.5, -10, -17.5], // poligono nucleo

    [-149.7, -25, 61.6], [-62.5, -25, 149.4],[61.9,-25, 148.9],[149.3, -25, 60.4], //17 - 24
    [149.6,-25,-63.2],[61.7,-25,-150.7],[-61.9,-25,-150.3],[-148.7,-25,-61.9], // puntos petalos

    //para prueba
    [0,20,0],[0,-100,0],
     [35,-5,15],[14.14,-5,35.36],[-35.36,-5,14.14],[-14.15,-5,35],
     [-35,-5,-15],[-14.14,-5,-35.36],[15,-5,-35],[35.36,-5,-14.14] //P 27-34 centro 
];
// --- 7. PINTAR UN POLIGONO DENTRO DEL PLANO ...
// Ejemplo: Un triángulo (3 puntos) y un cuadrado (4 puntos)
const misPoligonos = [
   /*  { puntos: [24, 1, 8], color: "rgba(255, 0, 110, 0.5)" }, // Triángulo
    { puntos: [2,3, 18], color: "rgba(255, 0, 110, 0.5)" },
    { puntos: [13, 14, 16], color: "rgba(255, 0, 110, 0.5)" },
    { puntos: [17, 1, 2], color: "rgba(255, 0, 110, 0.5)" }, 
    { puntos: [ 9,10,11,12,13,14,15,16], color: "rgba(0, 251, 255, 0.5)" }, // Cuadrado
    { puntos: [ 1,2,3,4,5,6,7,8], color: "rgba(0, 251, 255, 0.5)" } */

];
// --- NUEVA CONSTANTE: pintarPetalos ---
// Formato: { puntos: [inicio, fin], color: "rgba(...)", altura: 50, angulo: 180 }
const pintarPetalos = [
    { puntos: [1, 2, 17], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [1, 2, 25], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [3, 2, 18], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [3, 2, 25], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [3, 4, 19], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [3, 4, 25], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [4, 5, 20], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [4, 5, 25], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [5, 6, 21], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [5, 6, 25], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [6, 7, 22], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [6, 7, 25], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [7, 8, 23], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [7, 8, 25], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [1, 8, 24], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [1, 8, 25], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    // Si pones ángulo 360 y el mismo punto de inicio/fin, hará un círculo
    { puntos: [22, 23], color: "rgba(0, 255, 255, 0.2)", altura: 10 },
    { puntos: [23, 22], color: "rgba(0, 255, 255, 0.2)", altura: -10}
];