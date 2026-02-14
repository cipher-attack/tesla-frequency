#include "../include/tesla.h"

int main(int argc, char *argv[]) {
    printf("\n=== TESLA FREQUENCY ENGINE v1.0 ===\n");
    printf("=== The Secret of 3, 6, 9 ===\n\n");

    if (argc != 3) {
        printf("Usage: ./tesla [input_file] [output_file]\n");
        printf("Example: ./tesla secret.txt encrypted.tesla\n");
        return 1;
    }

    printf("[*] Connecting to the Vortex...\n");
    
    // ሂደቱን ጀምር
    process_energy(argv[1], argv[2]);

    return 0;
}
