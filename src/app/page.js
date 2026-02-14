"use client";

import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { useVortexWasm } from '../hooks/useVortexWasm';
import VortexScene from '../components/VortexScene';

export default function TeslaLab() {
  // --- 1. STATE MANAGEMENT ---
  const { isReady, getDigitalRoot, checkResonance } = useVortexWasm();
  const [inputVal, setInputVal] = useState("");
  const [digitalRoot, setDigitalRoot] = useState(0);
  const [isResonant, setIsResonant] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  
  // --- 2. AUDIO ENGINE (Tone.js) ---
  const synthRef = useRef(null);

  useEffect(() => {
    // Initialize Synthesizer (PolySynth for Sci-Fi chords)
    synthRef.current = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" }, // Pure Sine Waves (Tesla's preference)
      envelope: { attack: 0.1, decay: 0.3, sustain: 0.5, release: 1 }
    }).toDestination();

    return () => {
      if (synthRef.current) synthRef.current.dispose();
    };
  }, []);

  // Audio Context Activator (Browsers require user gesture)
  const activateSystem = async () => {
    await Tone.start();
    setAudioEnabled(true);
    console.log("🔊 Audio System: ENGAGED");
  };

  // Frequency Mapper based on Tesla's 3-6-9
  const playResonance = (root) => {
    if (!audioEnabled || !synthRef.current) return;

    // Release previous sounds
    synthRef.current.releaseAll();

    switch (root) {
      case 3:
        // 396 Hz: Liberating Guilt and Fear
        synthRef.current.triggerAttackRelease(["C4", "E4"], "2n"); // Approx to 396Hz scale
        break;
      case 6:
        // 639 Hz: Connecting Relationships
        synthRef.current.triggerAttackRelease(["F4", "A4"], "2n");
        break;
      case 9:
        // 963 Hz: Divine Consciousness (Pure High Frequency)
        synthRef.current.triggerAttackRelease(["B4", "D5", "F#5"], "1n");
        break;
      default:
        // Physical World (1, 2, 4, 8, 7, 5) - Low grounding drone
        synthRef.current.triggerAttackRelease("G2", "8n");
        break;
    }
  };

  // --- 3. LOGIC HANDLER ---
  const handleInput = (e) => {
    const val = e.target.value;
    setInputVal(val);

    if (!val) {
      setDigitalRoot(0);
      setIsResonant(false);
      return;
    }

    // Convert input to number (Handle Text Gematria later if needed)
    // For now, simple numeric input
    const num = parseInt(val);
    
    if (!isNaN(num) && isReady) {
      const root = getDigitalRoot(num);
      const resonant = checkResonance(num);
      
      setDigitalRoot(root);
      setIsResonant(resonant);
      
      // Trigger Sound
      playResonance(root);
    }
  };

  // --- 4. THE UI (CYBER-TESLA AESTHETIC) ---
  return (
    <main className="min-h-screen bg-[#050505] text-[#00F0FF] font-mono selection:bg-[#FFD700] selection:text-black overflow-hidden flex flex-col items-center">
      
      {/* HEADER */}
      <header className="w-full p-6 border-b border-gray-800 flex justify-between items-center bg-black/50 backdrop-blur-md z-50 fixed top-0">
        <h1 className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#FFD700]">
          TESLA<span className="text-xs align-top opacity-50">FREQ</span>
        </h1>
        <div className="flex items-center gap-4">
          <div className={`h-2 w-2 rounded-full ${isReady ? "bg-green-500 shadow-[0_0_10px_#00ff00]" : "bg-red-500 animate-pulse"}`} />
          <span className="text-xs text-gray-500">
            ENGINE: {isReady ? "WASM_ONLINE" : "INITIALIZING..."}
          </span>
        </div>
      </header>

      {/* MAIN CONTENT GRID */}
      <div className="mt-24 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
        
        {/* LEFT PANEL: CONTROLS & DATA */}
        <div className="flex flex-col gap-6 animate-in slide-in-from-left duration-700">
          
          {/* AUDIO ACTIVATOR */}
          {!audioEnabled && (
            <button 
              onClick={activateSystem}
              className="w-full py-4 border border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF] hover:text-black transition-all uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(0,240,255,0.2)]"
            >
              Initialize Audio System
            </button>
          )}

          {/* INPUT MODULE */}
          <div className="bg-[#0A0A0A] border border-gray-800 p-8 rounded-lg relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#00F0FF] to-transparent opacity-50" />
            <label className="text-xs text-gray-500 uppercase tracking-widest mb-2 block">
              Enter Variable (Frequency Input)
            </label>
            <input 
              type="number" 
              value={inputVal}
              onChange={handleInput}
              placeholder="369..."
              className="w-full bg-black border-b-2 border-gray-700 focus:border-[#FFD700] text-4xl py-2 text-white outline-none transition-colors placeholder-gray-800 font-bold"
            />
          </div>

          {/* ANALYSIS MODULE */}
          <div className="grid grid-cols-2 gap-4">
            {/* Digital Root Display */}
            <div className="bg-[#0A0A0A] border border-gray-800 p-6 rounded-lg flex flex-col items-center justify-center relative">
              <span className="text-gray-600 text-xs absolute top-2 left-2">DIGITAL ROOT</span>
              <span className="text-6xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                {digitalRoot || "-"}
              </span>
            </div>

            {/* Resonance Status */}
            <div className={`border p-6 rounded-lg flex flex-col items-center justify-center transition-all duration-500 ${isResonant ? "bg-[#FFD700]/10 border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.2)]" : "bg-[#0A0A0A] border-gray-800"}`}>
              <span className="text-gray-600 text-xs absolute top-2 left-2">FLUX STATE</span>
              <span className={`text-2xl font-bold ${isResonant ? "text-[#FFD700]" : "text-gray-500"}`}>
                {isResonant ? "DIVINE (3-6-9)" : "PHYSICAL"}
              </span>
              {isResonant && <span className="text-[10px] mt-2 text-[#FFD700] animate-pulse">AETHER NODE DETECTED</span>}
            </div>
          </div>

          {/* INFORMATION TERMINAL */}
          <div className="bg-black border border-gray-900 p-4 font-mono text-xs text-gray-400 h-40 overflow-y-auto">
            <p>> System initialized.</p>
            <p>> Waiting for user input...</p>
            {inputVal && <p>> Calculating Digital Root for input: <span className="text-white">{inputVal}</span></p>}
            {digitalRoot > 0 && <p>> Result: <span className="text-[#00F0FF]">{digitalRoot}</span></p>}
            {isResonant && <p>> <span className="text-[#FFD700]">ALERT: Resonant Frequency Match (Hz Generated)</span></p>}
          </div>
        </div>

        {/* RIGHT PANEL: VISUALIZATION */}
        <div className="h-[500px] lg:h-auto border border-gray-800 rounded-lg bg-black relative overflow-hidden shadow-2xl animate-in slide-in-from-right duration-700 delay-200">
           {/* Overlay Grid */}
           <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
                style={{backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
           </div>
           
           <div className="absolute top-4 right-4 z-10">
             <div className="flex flex-col items-end">
               <span className="text-[10px] text-[#00F0FF]">VISUALIZER: ACTIVE</span>
               <span className="text-[10px] text-gray-600">X: {digitalRoot} | Y: {isResonant ? "1" : "0"}</span>
             </div>
           </div>

           {/* THE 3D SCENE */}
           <VortexScene />
        </div>

      </div>
    </main>
  );
}
