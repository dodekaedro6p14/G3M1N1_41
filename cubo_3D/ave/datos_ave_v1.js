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
     
    /* [16, 9], [9, 10], [10, 11], [11, 12], [12, 13],
    [13, 14], [14, 15], [15, 16], // poligono nucelo  */
     
   /*  [17, 1], [17, 2], [18, 2], [18, 3] */
];

// --- 6. TUS PUNTOS 3D ---
// ⚠️ 
const puntos = [
    // [X, -Y, z]
    [0,0,0], //centro

    [-50, -50, -50], [-50, 50, -50], [50, 50, -50], [50, -50, -50],
    [50, 50, 50], [50, -50, 50], [-50, -50, 50], [-50, 50, 50], // poligono 8 lados   

     [-125,-45, 20], [-125,-45,-20], [-250, -60, 0], 
     [ 125,-45, 20], [ 125,-45,-20], [ 250, -60, 0],
 /*   [25, -10, 0], [17.5, -10, -17.5], [0, -10, -25], [-17.5, -10, -17.5], // */ 

    /* [-129.7, -30, 61.6],[-62.5, -30, 129.4], // punto 18    
    [61.9,-30, 128.9],[129.3, -30, 60.4], //17 - 24
    [129.6,-30,-63.2],[61.7,-30,-130.7],[-61.9,-30,-130.3],[-128.7,-30,-61.9], // puntos petalos rojos

    //para prueba
    [0,20,0], //25
    [35,-5,15],[14.14,-5,35.36],[-35.36,-5,14.14],[-14.15,-5,35],
    [-35,-5,-15],[-14.14,-5,-35.36],[15,-5,-35],[35.36,-5,-14.14], //P 26-33 centro 

    [-100,-50,0],[-71,-50,-71],[0,-50,-100],[71,-50,-71], // Punto petalos rosados p 34-41
    [100,-50,0],[71,-50,71],[0,-50,100],[-71,-50,71], 

    [-70, -70,-35],[-35,-70,-70],[35,-70,-70],[70,-70,-35], 
    [70,-70,35],[35,-70,70],[-35,-70,70],[-70,-70,35],

    [35,10,15],[14.14,10,35.36],[-35.36,10,14.14],[-14.15,10,35], // tallo verde
    [-35,10,-15],[-14.14,10,-35.36],[15,10,-35],[35.36,10,-14.14],

    [-100,50,0],[-71,50,-71],[0,50,-100],[71,50,-71], // Punto petalos rosados p 34-41
    [100,50,0],[71,50,71],[0,50,100],[-71,50,71] */

];
// --- 7. PINTAR UN POLIGONO DENTRO DEL PLANO ...
// Ejemplo: Un triángulo (3 puntos) y un cuadrado (4 puntos)
const misPoligonos = [
    { puntos: [1, 2, 3, 4], color: "rgba(0, 255, 255, 0.5)" }, // Triángulo
    { puntos: [5, 6, 7, 8], color: "rgba(0, 255, 255, 0.5)" },
    { puntos: [3, 4, 6, 5], color: "rgba(0, 255, 255, 0.5)" },
    { puntos: [7, 8, 2, 1], color: "rgba(0,255, 1255, 0.5)" }, 
    { puntos: [1, 10, 9, 7], color: "rgba(0, 255, 255, 0.5)" }, 
    { puntos: [4, 13, 12, 6], color: "rgba(0, 255, 255, 0.5)" },
    { puntos: [10, 11, 9], color: "rgba(0, 255, 255, 0.5)" },  
    { puntos: [13, 12, 14], color: "rgba(0,255, 255, 0.5)" }, 
 /*   { puntos: [ 9,10,11,12,13,14,15,16], color: "rgba(0, 251, 255, 0.5)" }, // Cuadrado
    { puntos: [ 1,2,3,4,5,6,7,8], color: "rgba(0, 251, 255, 0.5)" } */

];
// --- NUEVA CONSTANTE: pintarPetalos ---
// Formato: { puntos: [inicio, fin], color: "rgba(...)", altura: 50, angulo: 180 }
const pintarPetalos = [
    { puntos: [1, 2, ], color: "rgba(255, 0, 110, 0.2)", altura: 10 }, // Pelas largos
/*    { puntos: [1, 2, 25], color: "rgba(255, 0, 110, 1.0)", altura: 10 },
    { puntos: [3, 2, 18], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [3, 2, 25], color: "rgba(255, 0, 110, 1.0)", altura: 10 },
    { puntos: [3, 4, 19], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [3, 4, 25], color: "rgba(255, 0, 110, 1.0)", altura: 10 },
    { puntos: [4, 5, 20], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [4, 5, 25], color: "rgba(255, 0, 110, 1.0)", altura: 10 },
    { puntos: [5, 6, 21], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [5, 6, 25], color: "rgba(255, 0, 110, 1.0)", altura: 10 },
    { puntos: [6, 7, 22], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [6, 7, 25], color: "rgba(255, 0, 110, 1.0)", altura: 10 },
    { puntos: [7, 8, 23], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [7, 8, 25], color: "rgba(255, 0, 110, 1.0)", altura: 10 },
    { puntos: [1, 8, 24], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [1, 8, 25], color: "rgba(255, 0, 110, 1.0)", altura: 10 },

    { puntos: [31, 30, 35], color: "rgba(255, 128, 191, 0.2)", altura: 10 }, //Petalos medios
    { puntos: [31, 30, 25], color: "rgba(255, 128, 191, 0.5)", altura: 10 },
    { puntos: [29, 28, 41], color: "rgba(255, 128, 191, 0.2)", altura: 10 },
    { puntos: [29, 28, 25], color: "rgba(255, 128, 191, 0.5)", altura: 10 },
    { puntos: [30, 28, 34], color: "rgba(255, 128, 191, 0.2)", altura: 10 },
    { puntos: [30, 28, 25], color: "rgba(255, 128, 191, 0.5)", altura: 10 },
    { puntos: [27, 29, 40], color: "rgba(255, 128, 191, 0.2)", altura: 10 },
    { puntos: [27, 29, 25], color: "rgba(255, 128, 191, 0.5)", altura: 10 },
    { puntos: [27, 26, 39], color: "rgba(255, 128, 191, 0.2)", altura: 10 },
    { puntos: [27, 26, 25], color: "rgba(255, 128, 191, 0.5)", altura: 10 },
    { puntos: [26, 33, 38], color: "rgba(255, 128, 191, 0.2)", altura: 10 },
    { puntos: [26, 33, 25], color: "rgba(255, 128, 191, 0.5)", altura: 10 },
    { puntos: [32, 33, 37], color: "rgba(255, 128, 191, 0.2)", altura: 10 },
    { puntos: [32, 33, 25], color: "rgba(255, 128, 191, 0.5)", altura: 10 },
    { puntos: [32, 31, 36], color: "rgba(255, 128, 191, 0.2)", altura: 10 },
    { puntos: [32, 31, 25], color: "rgba(255, 128, 191, 0.5)", altura: 10 }, */

   
];