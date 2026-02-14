// src/engine/VortexMath.js

/**
 * TESLA FREQUENCY ENGINE
 * Core Logic for 3-6-9 Calculations
 */

// The "Physical" Cycle
const MATERIAL_CYCLE = [1, 2, 4, 8, 7, 5];

// The "Aether" Control
const AETHER_NODES = [3, 6, 9];

/**
 * Calculates the Digital Root of a number.
 * Example: 64 -> 6+4=10 -> 1+0=1
 * @param {number} n 
 * @returns {number} The digital root (1-9)
 */
export const getDigitalRoot = (n) => {
    if (n === 0) return 0;
    const root = n % 9;
    return root === 0 ? 9 : root;
};

/**
 * Generates the Doubling Sequence (Cellular Mitosis)
 * @param {number} steps - How many iterations
 * @returns {Array} Array of objects containing value and digital root
 */
export const generateVortexSequence = (steps = 12) => {
    let sequence = [];
    let current = 1;

    for (let i = 0; i < steps; i++) {
        const root = getDigitalRoot(current);
        const isAether = AETHER_NODES.includes(root);
        
        sequence.push({
            step: i + 1,
            rawValue: current,
            digitalRoot: root,
            type: isAether ? 'AETHER' : 'MATTER', // 3,6,9 vs 1,2,4,8,7,5
            color: isAether ? '#FFD700' : '#00F0FF' // Gold vs Tesla Blue
        });

        current = current * 2;
    }
    return sequence;
};

/**
 * The "Power of 9" Analyzer
 * Converts input (text/date) to its core frequency
 */
export const analyzeFrequency = (input) => {
    let sum = 0;

    // If input is text string
    if (typeof input === 'string') {
        const cleanStr = input.toUpperCase().replace(/[^A-Z0-9]/g, '');
        for (let i = 0; i < cleanStr.length; i++) {
            const code = cleanStr.charCodeAt(i);
            if (code >= 65 && code <= 90) { // A-Z
                sum += (code - 64);
            } else if (code >= 48 && code <= 57) { // 0-9
                sum += parseInt(cleanStr[i]);
            }
        }
    } 
    // If input is number
    else if (typeof input === 'number') {
        sum = input;
    }

    const coreFreq = getDigitalRoot(sum);
    
    // Determine the Solfeggio frequency match
    let solfeggioHz = 0;
    if (coreFreq === 3) solfeggioHz = 396;
    if (coreFreq === 6) solfeggioHz = 639;
    if (coreFreq === 9) solfeggioHz = 963;
    // Map others to nearest harmonic if necessary
    
    return {
        input: input,
        sum: sum,
        coreFrequency: coreFreq,
        solfeggioHz: solfeggioHz
    };
};
