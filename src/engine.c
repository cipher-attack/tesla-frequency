#include "../include/tesla.h"

// 1. Vortex Math Implementation
// ማንኛውንም ቁጥር ወደ ዲጂታል ስር (Digital Root) ይቀይራል
// ምሳሌ: 12 -> 1+2 = 3. 
int calculate_vortex(int data_byte) {
    if (data_byte == 0) return 0;
    // ይህ የቴስላ "Modulus 9" ቀመር ነው
    int vibration = data_byte % 9;
    if (vibration == 0) return 9;
    return vibration;
}

// 2. The Frequency Shifter (PATCHED VERSION)
// ዳታውን በቦታው (Position) መሰረት ያናውጠዋል
void apply_frequency(char *data, int length) {
    printf("[*] Initiating 3-6-9 Resonance Frequency...\n");
    
    for (int i = 0; i < length; i++) {
        // የዳታውን ቦታ (Index) መሰረት ያደረገ ንዝረት
        // (i + 1) ያልነው፣ ከ 0 ስለሚጀምር ነው
        int position_energy = (i + 1); 
        int vortex = calculate_vortex(position_energy);
        
        // አሁን ቁልፉ ቋሚ ነው (Symmetric XOR Encryption)
        if (vortex == 3) {
            data[i] = data[i] ^ KEY_3; 
        } else if (vortex == 6) {
            data[i] = data[i] ^ KEY_6; 
        } else if (vortex == 9) {
            data[i] = data[i] ^ KEY_9; // እዚህ ጋር ^ 9 እናድርገው (More stable)
        }
        // ማስታወሻ: 3, 6, 9 ካልሆነ ምንም አይነካም (Pass through)
    }
    printf("[+] Frequency Applied Successfully.\n");
}

// 3. The Energy Processor (File Handling)
void process_energy(const char *input_file, const char *output_file) {
    FILE *in = fopen(input_file, "rb"); // Read Binary
    FILE *out = fopen(output_file, "wb"); // Write Binary
    
    if (!in || !out) {
        printf("[!] Error: Void cannot be opened.\n");
        return;
    }

    // የፋይሉን መጠን እንፈልግ (Seek Energy Level)
    fseek(in, 0, SEEK_END);
    long energy_level = ftell(in);
    fseek(in, 0, SEEK_SET);

    printf("[*] Detected Energy Level: %ld bytes\n", energy_level);

    // ሜሞሪ እንጠይቅ (malloc - The Space Creator)
    char *buffer = (char*) malloc(energy_level);
    if (!buffer) {
        printf("[!] Error: Not enough universal memory.\n");
        fclose(in);
        fclose(out);
        return;
    }

    // ዳታውን ወደ RAM እንሳብ
    fread(buffer, 1, energy_level, in);

    // ንዝረቱን እንልቀቅበት! (Main Action)
    apply_frequency(buffer, energy_level);

    // የተለወጠውን ዳታ ወደ አዲስ አለም እንፃፍ
    fwrite(buffer, 1, energy_level, out);

    // ማጽዳት (Clean up)
    free(buffer);
    fclose(in);
    fclose(out);
    
    printf("[SUCCESS] Matter Transmuted into Energy.\n");
}
