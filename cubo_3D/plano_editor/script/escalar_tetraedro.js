// Supongamos un factor de escala de 2
const s = 2;
const vertices = [
  {x: 0, y: -35, z: 0},
  {x: -17.68, y: 15, z: 30.62},
  {x: 35.36, y: 15, z: 0},
  {x: -17.68, y: 15, z: -30.62}
];

const escalados = vertices.map(v => ({
  x: v.x * s,
  y: v.y * s,
  z: v.z * s
}));