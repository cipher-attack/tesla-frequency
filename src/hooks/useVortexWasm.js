// src/hooks/useVortexWasm.js
import { useEffect, useState, useRef } from 'react';

export const useVortexWasm = () => {
  const [isReady, setIsReady] = useState(false);
  const wasmInstance = useRef(null);

  useEffect(() => {
    const loadWasm = async () => {
      try {
        // 1. Fetch the binary from the public folder
        const response = await fetch('/vortex.wasm');
        const bytes = await response.arrayBuffer();

        // 2. Instantiate the WebAssembly Module
        const { instance } = await WebAssembly.instantiate(bytes, {
            env: {
                memory: new WebAssembly.Memory({ initial: 256 }),
                // C code ስህተት ሲኖረው እዚህ ጋር እንዲናገር
                abort: () => console.error("Tesla Engine Overload (Abort Called)")
            }
        });

        // 3. Store the instance
        wasmInstance.current = instance.exports;
        setIsReady(true);
        console.log("⚡ Tesla Vortex Engine: ONLINE ⚡");

      } catch (error) {
        console.error("Failed to load Vortex Engine:", error);
        // Fallback Logic (if WASM fails, utilize JS backup - optional)
      }
    };

    loadWasm();
  }, []);

  // Wrapper functions to make it easy to use in UI
  const getDigitalRoot = (n) => {
    if (!isReady) return 0;
    return wasmInstance.current.get_digital_root(n);
  };

  const checkResonance = (n) => {
      if (!isReady) return false;
      return wasmInstance.current.is_tesla_node(n) === 1;
  };

  return { isReady, getDigitalRoot, checkResonance };
};
