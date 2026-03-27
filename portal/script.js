// --- MOTOR DE ANIMACIÓN Y PARALAJE ---
document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 50;
    const y = (window.innerHeight / 2 - e.pageY) / 50;

    // Efecto de movimiento sutil en los escalones según el mouse
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        const depth = (index + 1) * 5;
        step.style.marginLeft = `${x * depth}px`;
        step.style.marginTop = `${(y * depth) - 50}px`;
    });

    // Movimiento del fondo para dar profundidad
    const spiral = document.querySelector('.background-spiral');
    spiral.style.transform = `rotate(${window.scrollY * 0.1}deg) translate(${x}px, ${y}px)`;
});

// Mensaje de bienvenida de Fruta en consola
console.log("%c Fruta Art Engine: Sistema Cuántico Activado ", "color: #00d2ff; font-weight: bold; background: #000; padding: 5px;");