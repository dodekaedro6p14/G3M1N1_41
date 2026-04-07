// --- 3. LISTA DE CONEXIONES CURVAS ---
// Agrega aquí los pares de puntos que quieres unir
const conexiones_curvas = [
   /*  [17, 1],[17, 2],[3, 19],[19,4],[4,20],[5,20],
    [6,21],[5,21],[6,22],[7,22],[7,23],[8,23],[1,24],[8,24] */
];

// --- 4. LISTA DE ESFERAS ---
// Elegir los punos para agregar esferas
const puntos_con_esfera = [];

// --- 5. CONEXION DE LOS PUNTOS ---
const conexiones = [
    [1, 2],[8, 1],[2, 3],[3, 4],[4, 5], 
    [5, 6], [6, 7], [7, 8], // poligono  petalos 
    
    [16, 9], [9, 10], [10, 11], [11, 12], [12, 13],
    [13, 14], [14, 15], [15, 16], // poligono nucelo  */
     
    [28, 29], [27, 29], [26, 27], [28, 30],[30, 31], [31, 32], [32, 33], [33, 26], // petalos medios

   /*  [55,56], [55, 54],[52, 53],[52,54], [53, 51], [51, 50], [50, 57], [57, 56], // tallo verde */
];

// --- 6. TUS PUNTOS 3D ---
// ⚠️ 
const puntos = [
    // [X, -Z, Y]
    [0,0,0], //centro

    [-50, -30, 0], [-35, -30, 35], [0, -30, 50], [35, -30, 35],
    [50, -30, 0], [35, -30, -35], [0, -30, -50], [-35, -30, -35], // poligono 8 lados   

    [-25, -30, 0], [-17.5, -30, 17.5], [0, -30, 25], [17.5, -30, 17.5], //  9-16
    [25, -30, 0], [17.5, -30, -17.5], [0, -30, -25], [-17.5, -30, -17.5], // poligono nucleo

    [-129.7, -30, 61.6],[-62.5, -30, 129.4],[61.9,-30, 128.9],[129.3, -30, 60.4], //17 - 24
    [129.6,-30,-63.2],[61.7,-30,-130.7],[-61.9,-30,-130.3],[-128.7,-30,-61.9], // puntos petalos rojos

    //para prueba
    [0,30,0], //25
    [35,-30,15],[14.14,-30,35.36],[-35.36,-30,14.14],[-14.15,-30,35],
    [-35,-30,-15],[-14.14,-30,-35.36],[15,-30,-35],[35.36,-30,-14.14], //P 26-33 centro 

    [-100,-50,0],[-71,-50,-71],[0,-50,-100],[71,-50,-71], // Punto petalos rosados p 34-41
    [100,-50,0],[71,-50,71],[0,-50,100],[-71,-50,71], // 33-41

    [-25, 25, 0], [-17.5, 25, 17.5], [0, 25, 25], [17.5, 25, 17.5], //  
    [25, 25, 0], [17.5, 25, -17.5], [0, 25, -25], [-17.5, 25, -17.5],// 42-49

    [35,10,15],[14.14,10,35.36],[-35.36,10,14.14],[-14.15,10,35], // tallo verde
    [-35,10,-15],[-14.14,10,-35.36],[15,10,-35],[35.36,10,-14.14], // 50-57 

    [-50,-30,0],[-35,-30,-35],[0,-30,-50],[35,-30,-35], // Punto petalos
    [50,-30,0],[35,-30,35],[0,-30,50],[-35,-30,35], //58-65

    [0,-30,0] // 66 centro inferior para tallo

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
/*    { puntos: [8,1, 2,3, 17], color: "rgba(255, 0, 110, 0.2)", altura: 10 }, // Pelas largos
    { puntos: [1, 2, 25], color: "rgba(255, 0, 110, 0.0)", altura: 10 },
    { puntos: [4,3, 2,1, 18], color: "rgba(255, 0, 110, 1.2)", altura: 10 },
    { puntos: [3, 2, 25], color: "rgba(255, 0, 110, 1.0)", altura: 10 },
    { puntos: [2,3, 4,5, 19], color: "rgba(255, 0, 110, 1.2)", altura: 10 },
    { puntos: [3, 4, 25], color: "rgba(255, 0, 110, 1.0)", altura: 10 },
    { puntos: [3,4, 5,6, 20], color: "rgba(255, 0, 110, 1.2)", altura: 10 },
    { puntos: [4, 5, 25], color: "rgba(255, 0, 110, 1.0)", altura: 10 },
    { puntos: [4,5, 6,7, 21], color: "rgba(255, 0, 110, 1.2)", altura: 10 },
    { puntos: [5, 6, 25], color: "rgba(255, 0, 110, 1.0)", altura: 10 },
    { puntos: [5,6, 7,8, 22], color: "rgba(255, 0, 110, 1.2)", altura: 10 },
    { puntos: [6, 7, 25], color: "rgba(255, 0, 110, 1.0)", altura: 10 },
    { puntos: [6,7, 8,1, 23], color: "rgba(255, 0, 110, 1.2)", altura: 10 },
    { puntos: [7, 8, 25], color: "rgba(255, 0, 110, 1.0)", altura: 10 },
    { puntos: [2,1, 8,7, 24], color: "rgba(255, 0, 110, 1.2)", altura: 10 },
    { puntos: [1, 8, 25], color: "rgba(255, 0, 110, 1.0)", altura: 10 }, */

 /*    { puntos: [32,31, 30,29, 35], color: "rgba(255, 128, 191, 1.2)", altura: 10 }, //Petalos medios
    { puntos: [31, 30, 25], color: "rgba(255, 128, 191, 1.5)", altura: 10 },
    { puntos: [30,29, 28,27, 41], color: "rgba(255, 128, 191, 1.2)", altura: 10 },
    { puntos: [29, 28, 25], color: "rgba(255, 128, 191, 1.5)", altura: 10 },
    { puntos: [31,30, 28,29, 34], color: "rgba(255, 128, 191, 1.2)", altura: 10 },
    { puntos: [30, 28, 25], color: "rgba(255, 128, 191, 1.5)", altura: 10 },
    { puntos: [26,27, 29,28, 40], color: "rgba(255, 128, 191, 1.2)", altura: 10 },
    { puntos: [27, 29, 25], color: "rgba(255, 128, 191, 1.5)", altura: 10 },
    { puntos: [29,27, 26,33, 39], color: "rgba(255, 128, 191, 1.2)", altura: 10 },
    { puntos: [27, 26, 25], color: "rgba(255, 128, 191, 1.5)", altura: 10 },
    { puntos: [27,26, 33,32, 38], color: "rgba(255, 128, 191, 1.2)", altura: 10 },
    { puntos: [26, 33, 25], color: "rgba(255, 128, 191, 1.5)", altura: 10 },
    { puntos: [31,32, 33,26, 37], color: "rgba(255, 128, 191, 1.2)", altura: 10 },
    { puntos: [32, 33, 25], color: "rgba(255, 128, 191, 1.5)", altura: 10 },
    { puntos: [33,32, 31,30, 36], color: "rgba(255, 128, 191, 1.2)", altura: 10 },
    { puntos: [32, 31, 25], color: "rgba(255, 128, 191, 1.5)", altura: 10 }, */

/*     { puntos: [10,9, 16,15, 42], color: "rgb(255, 179, 217)", altura: 10 },// petalos superiores
    { puntos: [9, 16, 25], color: "rgba(255, 179, 217, 1.4)", altura: 10 },
    { puntos: [9,16, 15,14, 43], color: "rgb(255, 179, 217)", altura: 10 },
    { puntos: [15, 16, 25], color: "rgba(255, 179, 217, 1.4)", altura: 10 },
    { puntos: [16,15, 14,13, 44], color: "rgb(255, 179, 217)", altura: 10 },
    { puntos: [15, 14, 25], color: "rgba(255, 179, 217, 1.4)", altura: 10 },
    { puntos: [12,13, 14,15, 45], color: "rgb(255, 179, 217)", altura: 10 },
    { puntos: [13, 14, 25], color: "rgba(255, 179, 217, 1.4)", altura: 10 },
    { puntos: [16,9, 10,11, 49], color: "rgb(255, 179, 217)", altura: 10 },
    { puntos: [9, 10, 25], color: "rgba(255, 179, 217, 1.4)", altura: 10 },
    { puntos: [12,11, 10,9, 48], color: "rgb(255, 179, 217)", altura: 10 },
    { puntos: [11, 10, 25], color: "rgba(255, 179, 217, 1.4)", altura: 10 },
    { puntos: [10,11, 12,13, 47], color: "rgb(255, 179, 217)", altura: 10 },
    { puntos: [11, 12, 25], color: "rgba(255, 179, 217, 1.4)", altura: 10 },
    { puntos: [11,12, 13,14, 46], color: "rgb(255, 179, 217)", altura: 10 },
    { puntos: [12, 13, 25], color: "rgba(255, 179, 217, 1.4)", altura: 10 }, */

    { puntos: [57,55, 56,54, 60], color: "rgba(0, 102, 0, 0.4)", altura: 10 },
    { puntos: [55, 56, 25], color: "rgba(0, 102, 0, 0.2)", altura: 10 },
    { puntos: [50,57, 56,55, 61], color: "rgba(0, 102, 0, 0.4)", altura: 10 },
    { puntos: [57, 56, 25], color: "rgba(0, 102, 0, 0.2)", altura: 10 },
    { puntos: [51,50,57,56, 62], color: "rgba(0, 102, 0, 0.4)", altura: 10 },
    { puntos: [57, 50, 25], color: "rgba(0, 102, 0, 0.2)", altura: 10 },
    { puntos: [53,51,50,57, 63], color: "rgba(0, 102, 0, 0.4)", altura: 10 },
    { puntos: [50, 51, 25], color: "rgba(0, 102, 0, 0.2)", altura: 10 },
    { puntos: [52,51, 53,50, 64], color: "rgba(0, 102, 0, 0.4)", altura: 10 },
    { puntos: [51, 53, 25], color: "rgba(0, 102, 0, 0.2)", altura: 10 },
    { puntos: [54,53, 52,51, 65], color: "rgba(0, 102, 0, 0.4)", altura: 10 },
    { puntos: [53, 52, 25], color: "rgba(0, 102, 0, 0.2)", altura: 10 },
    { puntos: [55,52, 54, 53,58], color: "rgba(0, 102, 0, 0.4)", altura: 10 },
    { puntos: [52, 54, 25], color: "rgba(0, 102, 0, 0.2)", altura: 10 },
    { puntos: [56,55, 54,52, 59], color: "rgba(0, 102, 0, 0.4)", altura: 10 },
    { puntos: [55, 54, 25], color: "rgba(0, 102, 0, 0.2)", altura: 10 },

 /*   // Si pones ángulo 360 y el mismo punto de inicio/fin, hará un círculo
    { puntos: [22, 23], color: "rgba(0, 255, 255, 0.2)", altura: 10 },
    { puntos: [23, 22], color: "rgba(0, 255, 255, 0.2)", altura: -10} */
];