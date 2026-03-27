# backend/bio_engine.py
from Bio.Seq import Seq
from Bio.SeqUtils import gc_fraction, molecular_weight

class BioBrick:
    def __init__(self, category, name, sequence):
        self.category = category
        self.name = name
        self.sequence = sequence.upper()
        self.prefix = "GAATTCGCGGCCGCTTCTAG"  # Bio-Standard v1.0
        self.suffix = "TACTAGAGCGGCCGCCTGCAG"

    def assemble(self):
        """Ensambla la parte con sus flancos estándar"""
        full_seq = self.prefix + self.sequence + self.suffix
        return Seq(full_seq)

# Base de datos local (Simulada)
PART_DATABASE = {
    "pLac": {"cat": "Promotor", "seq": "GGTGCAAAACCTTTCGCGGTATGGCATGAT"},
    "GFP": {"cat": "ORF", "seq": "ATGAGTAAAGGAGAAGAACTTTTCACTGGA"},
    "B0015": {"cat": "Terminador", "seq": "CCAGGCATCAAATAAAACGAAAGGCTCAGTC"}
}

def analyze_construct(part_keys):
    """
    Recibe una lista de nombres de partes y las concatena 
    calculando sus propiedades bioinformáticas.
    """
    final_sequence = ""
    for key in part_keys:
        part_data = PART_DATABASE.get(key)
        if part_data:
            # En un ensamblaje real consideraríamos las cicatrices (scars)
            final_sequence += part_data["seq"]
    
    seq_obj = Seq(final_sequence)
    return {
        "sequence": str(seq_obj),
        "gc_content": round(gc_fraction(seq_obj) * 100, 2),
        "mw": round(molecular_weight(seq_obj), 2),
        "length": len(seq_obj)
    }