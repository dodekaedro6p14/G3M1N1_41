// --- 3. LISTA DE CONEXIONES CURVAS ---
// Agrega aquí los pares de puntos que quieres unir
const conexiones_curvas = [
     [33, 58] /*,[17, 2],[3, 19],[19,4],[4,20],[5,20],
     [6,21],[5,21],[6,22],[7,22],[7,23],[8,23],[1,24],[8,24] */
];

// --- 4. LISTA DE ESFERAS ---
// Elegir los punos para agregar esferas
const puntos_con_esfera = [58];

// --- 5. CONEXION DE LOS PUNTOS ---
const conexiones = [
    [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 1],// poligono  petalos 

    [16, 9], [9, 10], [10, 12], [11, 13], [12, 11], [13, 14], [14, 15], [15, 16], // poligono nucelo  */

    [17,24], [18, 24], [19, 18], [20, 19], [21, 20], [22, 21],[23, 17], [23, 22], // raiz primera

    [28, 29], [27, 28], [26, 27], [29, 30], [30, 31], [31, 32], [32, 25], [25, 26], // petalos medios

    [50,57], [57, 56], [56, 55], [55, 54], [54, 53], [53, 52], [52, 51], [51, 50] // tallo

];

// --- 6. TUS PUNTOS 3D ---
// ⚠️ 
const puntos = [
    // [X, -Z, Y]
    [0, 0, 0], //centro

    [-35, 0, 0], [-25, 0, -25], [0, 0, -35], [25, 0, -25], // Punto petalos 1-8
    [35, 0, 0], [25, 0, 25], [0, 0, 35], [-25, 0, 25],

    [35, 10, 15], [14.14, 10, 35.36], [-35.36, 10, 14.14], [-14.15, 10, 35],   // 9-16
    [-35, 10, -15], [-14.14, 10, -35.36], [15, 10, -35], [35.36, 10, -14.14], // Raiz 1 

    [-30, -10, 12.5], [-12.5, -10, -30], [12.5, -10, -30], [30, -10, -12.5], // Raiz primera    17-24
    [30, -10, 12.5], [12.5, -10, 30], [-12.5, -10, 30], [-30, -10, -12.5],

    [-25, -18, 0], [-17.5, -18, 17.5], [0, -18, 25], [17.5, -18, 17.5], //  25-32 petalos medios
    [25, -18, 0], [17.5, -18, -17.5], [0, -18, -25], [-17.5, -18, -17.5], // poligono nucleo

   // puntos petalos rojos

    //para prueba
    [0, 30, 0], //33

    [-50, -30, 0], [-35, -30, 35], [0, -30, 50], [35, -30, 35],
    [50, -30, 0], [35, -30, -35], [0, -30, -50], [-35, -30, -35], // union raiz primera   34-41

    [35, -50, 15], [14.14, -50, 35.36], [-35.36, -50, 14.14], [-14.15, -50, 35], // union raiz segunda
    [-35, -50, -15], [-14.14, -50, -35.36], [15, -50, -35], [35.36, -50, -14.14], // 42-49

    [-35, -60, 0], [-25, -60, -25], [0, -60, -35], [25, -60, -25], // union raiz tercera
    [35, -60, 0], [25, -60, 25], [0, -60, 35], [-25, -60, 25], // 50-57

    [0, -30, 0] // 58 centro inferior para tallo

];
// --- 7. PINTAR UN POLIGONO DENTRO DEL PLANO ...
// Ejemplo: Un triángulo (3 puntos) y un cuadrado (4 puntos)
const misPoligonos = [
     { puntos: [24, 1, 8], color: "rgba(255, 0, 110, 0.5)" }, // Triángulo
/*     { puntos: [2,3, 18], color: "rgba(255, 0, 110, 0.5)" },
     { puntos: [13, 14, 16], color: "rgba(255, 0, 110, 0.5)" },
     { puntos: [17, 1, 2], color: "rgba(255, 0, 110, 0.5)" }, 
     { puntos: [ 9,10,11,12,13,14,15,16], color: "rgba(0, 251, 255, 0.5)" }, // Cuadrado
     { puntos: [ 1,2,3,4,5,6,7,8], color: "rgba(0, 251, 255, 0.5)" } */

];
// --- NUEVA CONSTANTE: pintarPetalos ---
// Formato: { puntos: [inicio, fin], color: "rgba(...)", altura: 50, angulo: 180 }
const pintarPetalos = [
 //   { puntos: [1, 8, 38], color: "rgba(255, 0, 110, 0.2)", altura: 10 }, // Pelas largos
    { puntos: [1, 2, 33], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
//    { puntos: [1, 2, 37], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [3, 2, 33], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
//    { puntos: [2, 4, 36], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [3, 4, 33], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
//    { puntos: [3, 4, 35], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [4, 5, 33], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
//    { puntos: [3, 5, 34], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [5, 6, 33], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
//    { puntos: [5, 6, 41], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [6, 7, 33], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
//{ puntos: [6, 7, 40], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [7, 8, 33], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
//    { puntos: [8, 7, 39], color: "rgba(255, 0, 110, 0.2)", altura: 10 },
    { puntos: [1, 8, 33], color: "rgba(255, 0, 110, 0.2)", altura: 10 },

        { puntos: [14,15, 40], color: "rgba(255, 128, 191, 0.4)", altura: 10 }, //Petalos medios
//       { puntos: [31, 30, 25], color: "rgba(255, 128, 191, 1.5)", altura: 10 },
       { puntos: [13, 14, 41], color: "rgba(255, 128, 191, 0.4)", altura: 10 },
//       { puntos: [29, 28, 25], color: "rgba(255, 128, 191, 1.5)", altura: 10 },
       { puntos: [11, 13, 34], color: "rgba(255, 128, 191, 0.4)", altura: 10 },
//       { puntos: [30, 28, 25], color: "rgba(255, 128, 191, 1.5)", altura: 10 },
       { puntos: [11, 12, 35], color: "rgba(255, 128, 191, 0.4)", altura: 10 },
//       { puntos: [27, 29, 25], color: "rgba(255, 128, 191, 1.5)", altura: 10 },
       { puntos: [12, 10, 36], color: "rgba(255, 128, 191, 0.4)", altura: 10 },
 //      { puntos: [27, 26, 25], color: "rgba(255, 128, 191, 1.5)", altura: 10 },
       { puntos: [9, 10, 37], color: "rgba(255, 128, 191, 0.4)", altura: 10 },
 //      { puntos: [26, 33, 25], color: "rgba(255, 128, 191, 1.5)", altura: 10 },
       { puntos: [9, 16, 38], color: "rgba(255, 128, 191, 0.4)", altura: 10 },
  //     { puntos: [32, 33, 25], color: "rgba(255, 128, 191, 1.5)", altura: 10 },
       { puntos: [15, 16, 39], color: "rgba(255, 128, 191, 0.4)", altura: 10 },
//      { puntos: [32, 31, 25], color: "rgba(255, 128, 191, 1.5)", altura: 10 }, 

        { puntos: [1,8, 44], color: "rgba(255, 179, 217, 0.4)", altura: 10 },// petalos superiores
//        { puntos: [9, 16, 25], color: "rgba(255, 179, 217, 1.4)", altura: 10 },
        { puntos: [8,7, 45], color: "rgba(255, 179, 217, 0.4)", altura: 10 },
//        { puntos: [15, 16, 25], color: "rgba(255, 179, 217, 1.4)", altura: 10 },
        { puntos: [6, 7, 43], color: "rgba(255, 179, 217, 0.4)", altura: 10 },
  //      { puntos: [15, 14, 25], color: "rgba(255, 179, 217, 1.4)", altura: 10 },
        { puntos: [6, 5, 42], color: "rgba(255, 179, 217, 0.4)", altura: 10 },
    //    { puntos: [13, 14, 25], color: "rgba(255, 179, 217, 1.4)", altura: 10 },
        { puntos: [5, 4, 49], color: "rgba(255, 179, 217, 0.4)", altura: 10 },
//        { puntos: [9, 10, 25], color: "rgba(255, 179, 217, 1.4)", altura: 10 },
        { puntos: [3, 4, 48], color: "rgba(255, 179, 217, 0.4)", altura: 10 },
  //      { puntos: [11, 10, 25], color: "rgba(255, 179, 217, 1.4)", altura: 10 },
       { puntos: [2, 3, 47], color: "rgba(255, 179, 217, 0.4)", altura: 10 },
//       { puntos: [11, 12, 25], color: "rgba(255, 179, 217, 1.4)", altura: 10 },
       { puntos: [1, 2, 46], color: "rgba(255, 179, 217, 0.4)", altura: 10 },
//       { puntos: [12, 13, 25], color: "rgba(255, 179, 217, 1.4)", altura: 10 },

       { puntos: [18,24, 51], color: "rgba(255, 179, 217, 0.4)", altura: 10 },
//       { puntos: [57, 56, 25], color: "rgba(0, 102, 0, 0.2)", altura: 10 },
       { puntos: [17,24,50], color: "rgba(255, 179, 217, 0.4)", altura: 10 },
//       { puntos: [57, 50, 25], color: "rgba(0, 102, 0, 0.2)", altura: 10 },
       { puntos: [18,19, 52], color: "rgba(255, 179, 217, 0.4)", altura: 10 },
//       { puntos: [50, 51, 25], color: "rgba(0, 102, 0, 0.2)", altura: 10 },
       { puntos: [19, 20, 53], color: "rgba(255, 179, 217, 0.4)", altura: 10 },
//       { puntos: [51, 53, 25], color: "rgba(0, 102, 0, 0.2)", altura: 10 },
       { puntos: [20, 21, 54], color: "rgba(255, 179, 217, 0.4)", altura: 10 },
//       { puntos: [53, 52, 25], color: "rgba(0, 102, 0, 0.2)", altura: 10 },
       { puntos: [21, 22, 55], color: "rgba(255, 179, 217, 0.4)", altura: 10 },
//       { puntos: [52, 54, 25], color: "rgba(0, 102, 0, 0.2)", altura: 10 },
       { puntos: [17, 23, 57], color: "rgba(255, 179, 217, 0.4)", altura: 10 },
//       { puntos: [55, 54, 25], color: "rgba(0, 102, 0, 0.2)", altura: 10 }, 
        { puntos: [22, 23, 56], color: "rgba(255, 179, 217, 0.4)", altura: 10 },

    /*   // Si pones ángulo 360 y el mismo punto de inicio/fin, hará un círculo
       { puntos: [22, 23], color: "rgba(0, 255, 255, 0.2)", altura: 10 },
       { puntos: [23, 22], color: "rgba(0, 255, 255, 0.2)", altura: -10} */
];
// --- CONFIGURACIÓN DE APERTURA ---
const configPetalos = {
    indices: [34, 35, 36, 37, 38, 39, 40, 41], // Los puntos que me pediste
    anguloMax: 100 * (Math.PI / 180),          // 100 grados convertidos a radianes
    puntoPivote: 25,                           // El centro desde donde nacen
    velocidadApertura: 0.02                    // Qué tan rápido se mueven
};