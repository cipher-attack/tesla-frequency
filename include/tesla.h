#ifndef TESLA_H
#define TESLA_H

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// የቴስላ ቁልፍ ቁጥሮች (The Divine Numbers)
#define KEY_3 3
#define KEY_6 6
#define KEY_9 9

// የፕሮጀክቱ ዋና ተግባራት (Function Prototypes)

// 1. Vortex Math: ቁጥሮችን ወደ 1-9 የሚቀይር የቴስላ ስሌት
int calculate_vortex(int data_byte);

// 2. Frequency Shift: ዳታውን በንዝረት (Vibration) መቀየር
void apply_frequency(char *data, int length);

// 3. Energy Transfer: ፋይሉን አንብቦ የመቀየር ሂደት
void process_energy(const char *input_file, const char *output_file);

#endif
