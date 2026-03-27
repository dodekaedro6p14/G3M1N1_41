# Definición del modelo de ensamblaje Bio-Digital
class GeneticCircuit:
    def __init__(self):
        # Prefijo y Sufijo Estándar (RFC10)
        self.prefix = "GAATTCGCGGCCGCTTCTAG" 
        self.suffix = "TACTAGAGCGGCCGCCTGCAG"
        self.scar = "TACTAGAG" # Cicatriz de unión entre partes
        
        self.parts = []

    def add_part(self, name, sequence):
        """Añade una parte biológica al diseño"""
        self.parts.append({"name": name, "seq": sequence.upper()})

    def get_full_sequence(self):
        """Ensambla las partes concatenando secuencias y cicatrices"""
        # Iniciamos con el prefijo
        assembly = self.prefix
        
        # Unimos las partes con la cicatriz estándar entre ellas
        content = self.scar.join([p['seq'] for p in self.parts])
        
        # Cerramos con el sufijo
        return assembly + content + self.suffix

# Instanciando el detector de microplásticos
detector_mp = GeneticCircuit()
detector_mp.add_part("pPlastic", "ATGC...") # Promotor específico
detector_mp.add_part("RBS", "AAAGAGGAGAAA") # RBS fuerte
detector_mp.add_part("eGFP", "ATGAGTAAAG...") # Gen de fluorescencia