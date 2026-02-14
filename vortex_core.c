// vortex_core.c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// EMSCRIPTEN_KEEPALIVE ensures functions are exported to JS
#include <emscripten/emscripten.h>

// ---------------------------------------------------------
// CONSTANTS & DEFINITIONS
// ---------------------------------------------------------
#define MAGNIFICENCE_3 3
#define MAGNIFICENCE_6 6
#define MAGNIFICENCE_9 9

// ---------------------------------------------------------
// CORE MATH LOGIC
// ---------------------------------------------------------

// Calculate the Digital Root (The "Tesla Modulo")
// Input: 256 -> 2+5+6 = 13 -> 1+3 = 4
EMSCRIPTEN_KEEPALIVE
int get_digital_root(long long n) {
    if (n == 0) return 0;
    // The mathematical shortcut for digital root is 1 + ((n - 1) % 9)
    // However, we ensure 9 returns 9, not 0.
    int root = n % 9;
    return (root == 0) ? 9 : root;
}

// Generate the Doubling Sequence (The Physical World: 1, 2, 4, 8, 7, 5)
// Returns a pointer to an array of size 'steps'
EMSCRIPTEN_KEEPALIVE
int* generate_doubling_sequence(int start_value, int steps) {
    int* sequence = (int*)malloc(steps * sizeof(int));
    long long current = start_value;

    for (int i = 0; i < steps; i++) {
        // Store the Digital Root of the current number
        sequence[i] = get_digital_root(current);
        
        // Double the number for the next iteration
        current = current * 2;
    }
    
    return sequence;
}

// Analyze Resonance (Check if a number is part of the 3-6-9 Flux)
// Returns: 1 (Resonant), 0 (Physical/Material)
EMSCRIPTEN_KEEPALIVE
int is_flux_field(int digital_root) {
    if (digital_root == 3 || digital_root == 6 || digital_root == 9) {
        return 1; // It belongs to the Aether
    }
    return 0; // It belongs to the Material world (1, 2, 4, 8, 7, 5)
}

// Gematria Calculator: Converts Text to Core Frequency
EMSCRIPTEN_KEEPALIVE
int calculate_gematria(char* text) {
    int sum = 0;
    int i = 0;
    while (text[i] != '\0') {
        char c = text[i];
        // Simple English Gematria: A=1, B=2... Z=26
        if (c >= 'a' && c <= 'z') {
            sum += (c - 'a' + 1);
        } else if (c >= 'A' && c <= 'Z') {
            sum += (c - 'A' + 1);
        }
        i++;
    }
    return get_digital_root(sum);
}
