// cpp/vortex.c
// ይሄ ፋይል የሚሰራው የ Tesla 3-6-9 ሂሳብን በ C language ነው።

#define EXPORT __attribute__((visibility("default")))

// 1. Digital Root Calculator (Recursive Sum until single digit)
// Example: 256 -> 2+5+6 = 13 -> 1+3 = 4
EXPORT
int get_digital_root(int n) {
    if (n == 0) return 0;
    int root = n % 9;
    return (root == 0) ? 9 : root;
}

// 2. Generate Next Doubling Sequence
// Input: 1 -> Returns 2
// Input: 2 -> Returns 4
// Input: 8 -> Returns 16 -> 1+6=7
EXPORT
int get_next_vortex(int current_val) {
    int doubled = current_val * 2;
    return get_digital_root(doubled);
}

// 3. Check Frequency Resonance (is it 3, 6, or 9?)
// Returns 1 (True) if it's a Tesla Number, 0 (False) if Material
EXPORT
int is_tesla_node(int n) {
    int root = get_digital_root(n);
    if (root == 3 || root == 6 || root == 9) {
        return 1;
    }
    return 0;
}
