// forge_logic.js

// Función para resaltar sitios PAM (CRISPR)
function highlightPAM(sequence) {
    // Busca cualquier nucleótido seguido de GG
    const pamRegex = /([ATGC]GG)/g;
    return sequence.replace(pamRegex, '<span style="background: var(--accent); color: white;">$1</span>');
}

// Efecto de escritura para la consola
function typeEffect(text, elementId) {
    let i = 0;
    const element = document.getElementById(elementId);
    element.innerHTML = "";
    
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, 20); // Velocidad de secuenciación
        } else {
            // Una vez terminado, resaltamos los sitios PAM
            element.innerHTML = highlightPAM(element.innerHTML);
        }
    }
    typing();
}

async function synthesize() {
    // Aquí conectaríamos con el Backend de Python (Flask/PyScript)
    const mockSequence = "GAATTCGCGGCCGCTTCTAGATGGTGAGCAAGGGCGAGGAGCTGTTCACCGGGTACTAGAGCGGCCGCCTGCAG";
    
    typeEffect(mockSequence, "output-text");
    
    // Simular actualización de estadísticas
    const stats = document.getElementById("stats");
    stats.innerHTML = `
        <p>Contenido GC: 58%</p>
        <p>Peso Molecular: 24.5 kDa</p>
        <p class="fluorescence-active">ESTADO: CÉLULA FLUORESCENTE DETECTADA</p>
    `;
}