// Molten Prism - Liquid Glass UI Interactive Engine & Melodic Instrumental Synthesizer

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Set Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Musical Note to Frequency Helper (Base A4 = 432Hz / 440Hz)
  const noteOffsets = {
    'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4,
    'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11
  };

  function noteFreq(name, baseA4 = 432) {
    if (!name || name === 'REST') return 0;
    const match = name.match(/^([A-G][#b]?)([0-8])$/);
    if (!match) return 432;
    const semitones = noteOffsets[match[1]] + (parseInt(match[2], 10) + 1) * 12;
    return baseA4 * Math.pow(2, (semitones - 69) / 12);
  }

  // Curated Instrumental Tracks & Ringtones Library Data
  const trackCatalog = [
    {
      id: 1,
      title: 'Vitreous Horizon',
      artist: 'Molten Prism • Vol. 1',
      genre: 'ambient',
      toneTag: 'Lofi Piano & Chimes',
      duration: '3:45',
      durationSec: 225,
      frequency: '432 Hz',
      baseA4: 432,
      bpm: 74,
      gradient: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
      desc: 'Serene Japanese-inspired lofi piano chords with shimmering crystal bells.',
      instrument: 'rhodes',
      chords: [
        { bass: 'F#2', notes: ['F#3', 'A3', 'C#4', 'E4'] }, // F#m7
        { bass: 'D2',  notes: ['D3', 'F#3', 'A3', 'C#4'] },  // Dmaj7
        { bass: 'A2',  notes: ['E3', 'A3', 'B3', 'C#4'] },   // Aadd9
        { bass: 'E2',  notes: ['E3', 'G#3', 'B3', 'D4'] }    // E7
      ],
      melody: [
        { n: 'C#5', b: 1 }, { n: 'B4', b: 0.5 }, { n: 'A4', b: 0.5 }, { n: 'F#4', b: 1 }, { n: 'A4', b: 1 },
        { n: 'C#5', b: 1 }, { n: 'E5', b: 1 }, { n: 'C#5', b: 1 }, { n: 'B4', b: 1 },
        { n: 'A4', b: 0.75 }, { n: 'B4', b: 0.25 }, { n: 'C#5', b: 0.5 }, { n: 'E5', b: 0.5 }, { n: 'F#5', b: 1 }, { n: 'E5', b: 1 },
        { n: 'C#5', b: 1.5 }, { n: 'B4', b: 0.5 }, { n: 'A4', b: 2 }
      ]
    },
    {
      id: 2,
      title: 'Chromasphere Drift',
      artist: 'Prism Refractor',
      genre: 'synth',
      toneTag: 'Cyber Synthwave Harp',
      duration: '4:12',
      durationSec: 252,
      frequency: '528 Hz',
      baseA4: 440,
      bpm: 104,
      gradient: 'linear-gradient(135deg, #a855f7, #ec4899)',
      desc: 'Catchy 80s neon synthwave arpeggio hook with pulsing sub-bass.',
      instrument: 'synthwave',
      chords: [
        { bass: 'C2',  notes: ['C3', 'G3', 'Bb3', 'Eb4'] }, // Cm7
        { bass: 'Ab2', notes: ['Ab2', 'Eb3', 'C4', 'G4'] }, // Abmaj7
        { bass: 'Bb2', notes: ['Bb2', 'F3', 'D4', 'F4'] },  // Bb
        { bass: 'G2',  notes: ['G2', 'D3', 'Bb3', 'F4'] }   // Gm7
      ],
      melody: [
        { n: 'G4', b: 0.5 }, { n: 'Bb4', b: 0.5 }, { n: 'C5', b: 0.5 }, { n: 'Eb5', b: 0.5 }, { n: 'D5', b: 1 }, { n: 'C5', b: 1 },
        { n: 'Bb4', b: 0.5 }, { n: 'C5', b: 0.5 }, { n: 'D5', b: 1 }, { n: 'F5', b: 1 }, { n: 'Eb5', b: 1 },
        { n: 'G5', b: 1 }, { n: 'F5', b: 0.5 }, { n: 'Eb5', b: 0.5 }, { n: 'D5', b: 1 }, { n: 'C5', b: 1 },
        { n: 'D5', b: 1 }, { n: 'C5', b: 0.5 }, { n: 'Bb4', b: 0.5 }, { n: 'C5', b: 2 }
      ]
    },
    {
      id: 3,
      title: 'Molten Silica Tide',
      artist: 'Hydros Sonics',
      genre: 'deep',
      toneTag: 'Acoustic Kalimba',
      duration: '5:20',
      durationSec: 320,
      frequency: '639 Hz',
      baseA4: 432,
      bpm: 78,
      gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      desc: 'Sunny acoustic thumb piano (kalimba) melody with organic harmonic waves.',
      instrument: 'kalimba',
      chords: [
        { bass: 'D2',  notes: ['D3', 'A3', 'F4', 'C5'] },    // Dm7
        { bass: 'Bb2', notes: ['Bb2', 'F3', 'D4', 'A4'] },   // Bbmaj7
        { bass: 'G2',  notes: ['G2', 'D3', 'Bb3', 'F4'] },   // Gm7
        { bass: 'C2',  notes: ['C3', 'G3', 'E4', 'D5'] }     // Cadd9
      ],
      melody: [
        { n: 'F5', b: 0.75 }, { n: 'E5', b: 0.25 }, { n: 'D5', b: 0.5 }, { n: 'A4', b: 0.5 }, { n: 'C5', b: 1 }, { n: 'D5', b: 1 },
        { n: 'F5', b: 1 }, { n: 'G5', b: 0.5 }, { n: 'A5', b: 0.5 }, { n: 'G5', b: 1 }, { n: 'F5', b: 1 },
        { n: 'D5', b: 0.75 }, { n: 'E5', b: 0.25 }, { n: 'F5', b: 0.5 }, { n: 'G5', b: 0.5 }, { n: 'A5', b: 1 }, { n: 'C6', b: 1 },
        { n: 'A5', b: 1.5 }, { n: 'F5', b: 0.5 }, { n: 'D5', b: 2 }
      ]
    },
    {
      id: 4,
      title: 'Lucent Prism Echo',
      artist: 'Aura Glass',
      genre: 'ambient',
      toneTag: 'Celesta Music Box',
      duration: '3:18',
      durationSec: 198,
      frequency: '741 Hz',
      baseA4: 440,
      bpm: 82,
      gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
      desc: 'Dreamy, comforting music box bells — perfect luxury notification tone.',
      instrument: 'celesta',
      chords: [
        { bass: 'E2',  notes: ['E3', 'B3', 'E4', 'G#4'] },  // E
        { bass: 'D#2', notes: ['D#3', 'B3', 'F#4', 'D#5'] },// B/D#
        { bass: 'C#2', notes: ['C#3', 'G#3', 'E4', 'B4'] }, // C#m7
        { bass: 'A2',  notes: ['A2', 'E3', 'B3', 'C#4'] }   // Aadd9
      ],
      melody: [
        { n: 'G#5', b: 1 }, { n: 'B5', b: 0.5 }, { n: 'F#5', b: 0.5 }, { n: 'E5', b: 1 }, { n: 'G#5', b: 1 },
        { n: 'F#5', b: 1 }, { n: 'E5', b: 0.5 }, { n: 'D#5', b: 0.5 }, { n: 'E5', b: 2 },
        { n: 'B5', b: 1 }, { n: 'C#6', b: 0.5 }, { n: 'B5', b: 0.5 }, { n: 'G#5', b: 1 }, { n: 'F#5', b: 1 },
        { n: 'E5', b: 1 }, { n: 'F#5', b: 1 }, { n: 'E5', b: 2 }
      ]
    },
    {
      id: 5,
      title: 'Glass Cascade Neon',
      artist: 'Vitreon BeatLab',
      genre: 'synth',
      toneTag: 'Chillhop Marimba',
      duration: '3:50',
      durationSec: 230,
      frequency: '852 Hz',
      baseA4: 432,
      bpm: 90,
      gradient: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
      desc: 'Warm wooden marimba mallet groove with relaxing lofi cafe vibes.',
      instrument: 'marimba',
      chords: [
        { bass: 'D2', notes: ['D3', 'A3', 'C4', 'E4', 'F4'] }, // Dm9
        { bass: 'G2', notes: ['G2', 'D3', 'Bb3', 'F4'] },       // Gm7
        { bass: 'A2', notes: ['A2', 'E3', 'C4', 'G4'] },        // Am7
        { bass: 'Bb2',notes: ['Bb2', 'F3', 'D4', 'A4'] }        // Bbmaj7
      ],
      melody: [
        { n: 'D5', b: 0.5 }, { n: 'F5', b: 0.5 }, { n: 'A5', b: 1 }, { n: 'G5', b: 0.5 }, { n: 'F5', b: 0.5 }, { n: 'E5', b: 1 },
        { n: 'F5', b: 1 }, { n: 'D5', b: 1 }, { n: 'C5', b: 1 }, { n: 'D5', b: 1 },
        { n: 'A5', b: 0.5 }, { n: 'C6', b: 0.5 }, { n: 'D6', b: 1 }, { n: 'C6', b: 0.5 }, { n: 'A5', b: 0.5 }, { n: 'G5', b: 1 },
        { n: 'F5', b: 1 }, { n: 'G5', b: 0.5 }, { n: 'F5', b: 0.5 }, { n: 'D5', b: 2 }
      ]
    },
    {
      id: 6,
      title: 'Deep Obsidian Flow',
      artist: 'Molten Prism Core',
      genre: 'deep',
      toneTag: 'Tibetan Zen Bowl',
      duration: '4:45',
      durationSec: 285,
      frequency: '963 Hz',
      baseA4: 432,
      bpm: 52,
      gradient: 'linear-gradient(135deg, #64748b, #334155)',
      desc: 'Meditative Tibetan singing bowl harmonics with grounding deep cello drone.',
      instrument: 'singingBowl',
      chords: [
        { bass: 'B1', notes: ['B2', 'F#3', 'D4', 'A4', 'C#5'] }, // Bm9
        { bass: 'G1', notes: ['G2', 'D3', 'B3', 'F#4'] },         // Gmaj7
        { bass: 'E1', notes: ['E2', 'B2', 'G3', 'D4', 'F#4'] },   // Em9
        { bass: 'F#1',notes: ['F#2', 'C#3', 'A3', 'E4'] }         // F#m7
      ],
      melody: [
        { n: 'F#4', b: 2 }, { n: 'A4', b: 1 }, { n: 'B4', b: 1 },
        { n: 'D5', b: 2 }, { n: 'C#5', b: 1 }, { n: 'B4', b: 1 },
        { n: 'A4', b: 2 }, { n: 'B4', b: 1 }, { n: 'F#4', b: 1 },
        { n: 'E4', b: 2 }, { n: 'F#4', b: 2 }
      ]
    }
  ];

  let currentTrackIndex = 0;
  let isPlaying = false;
  let playProgressInterval = null;
  let currentTimeSec = 0;
  let sfxEnabled = true;

  // Web Audio Context
  let audioCtx = null;
  let masterGain = null;
  let sfxGain = null;
  let musicGain = null;
  let analyser = null;
  let analyserData = null;

  // Active Instrumental Loop Timer & Nodes
  let activeMusicTimer = null;
  let activeNodes = [];
  let previewingTrackId = null;

  // Initialize Web Audio Subsystem
  function initAudioNodes() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();

      // Analyser Node for Real-time FFT Visualizer
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 128; // 64 frequency bins
      analyser.smoothingTimeConstant = 0.82;
      analyserData = new Uint8Array(analyser.frequencyBinCount);

      // Master output bus with limiter compressor
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.8, audioCtx.currentTime);

      musicGain = audioCtx.createGain();
      musicGain.gain.setValueAtTime(0.7, audioCtx.currentTime);
      musicGain.connect(masterGain);

      sfxGain = audioCtx.createGain();
      sfxGain.gain.setValueAtTime(sfxEnabled ? 0.65 : 0, audioCtx.currentTime);
      sfxGain.connect(masterGain);

      const compressor = audioCtx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-14, audioCtx.currentTime);
      compressor.knee.setValueAtTime(10, audioCtx.currentTime);
      compressor.ratio.setValueAtTime(4, audioCtx.currentTime);
      compressor.attack.setValueAtTime(0.005, audioCtx.currentTime);
      compressor.release.setValueAtTime(0.25, audioCtx.currentTime);

      masterGain.connect(analyser);
      analyser.connect(compressor);
      compressor.connect(audioCtx.destination);
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Auto unlock on first user gesture anywhere
  const unlockAudio = () => {
    initAudioNodes();
    window.removeEventListener('pointerdown', unlockAudio);
    window.removeEventListener('keydown', unlockAudio);
  };
  window.addEventListener('pointerdown', unlockAudio);
  window.addEventListener('keydown', unlockAudio);

  // Solfeggio harmonic chime scale for interactive mouse hover melody
  const chimeNotes = [528, 594, 660, 792, 880, 1056, 1188, 1320];
  let chimeIndex = 0;

  // UI Sound Effects
  function playUiTone(type = 'click') {
    if (!sfxEnabled) return;
    initAudioNodes();
    if (!audioCtx || !sfxGain) return;

    const t = audioCtx.currentTime;

    if (type === 'hover') {
      const osc = audioCtx.createOscillator();
      const oscHarmonic = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      const baseFreq = chimeNotes[chimeIndex % chimeNotes.length];
      chimeIndex++;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, t);

      oscHarmonic.type = 'triangle';
      oscHarmonic.frequency.setValueAtTime(baseFreq * 2, t);

      gain.gain.setValueAtTime(0.02, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);

      osc.connect(gain);
      oscHarmonic.connect(gain);
      gain.connect(sfxGain);

      osc.start(t);
      oscHarmonic.start(t);
      osc.stop(t + 0.18);
      oscHarmonic.stop(t + 0.18);
    } else if (type === 'click') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1080, t);
      osc.frequency.exponentialRampToValueAtTime(2160, t + 0.03);
      osc.frequency.exponentialRampToValueAtTime(540, t + 0.09);

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);

      osc.connect(gain);
      gain.connect(sfxGain);
      osc.start(t);
      osc.stop(t + 0.09);
    } else if (type === 'switch') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, t);
      osc.frequency.exponentialRampToValueAtTime(1140, t + 0.16);

      gain.gain.setValueAtTime(0.07, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);

      osc.connect(gain);
      gain.connect(sfxGain);
      osc.start(t);
      osc.stop(t + 0.16);
    } else if (type === 'playChord') {
      [432, 540, 648, 864].forEach((f, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, t + idx * 0.04);

        gain.gain.setValueAtTime(0.001, t + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.05, t + idx * 0.04 + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);

        osc.connect(gain);
        gain.connect(sfxGain);
        osc.start(t + idx * 0.04);
        osc.stop(t + 1.2);
      });
    } else if (type === 'tick') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, t);
      gain.gain.setValueAtTime(0.02, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
      osc.connect(gain);
      gain.connect(sfxGain);
      osc.start(t);
      osc.stop(t + 0.03);
    }
  }

  // Toast Notification
  function showToast(message) {
    const existing = document.querySelector('.molten-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'molten-toast';
    toast.innerHTML = `<i data-lucide="sparkles"></i> <span>${message}</span>`;
    document.body.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      setTimeout(() => toast.remove(), 400);
    }, 2800);
  }

  // ==========================================
  // REAL-TIME INSTRUMENT VOICE SYNTHESIZERS
  // ==========================================

  // Rhodes Electric Piano Voice
  function synthRhodesNote(ctx, dest, freq, time, duration, vol = 0.09) {
    if (freq <= 0) return;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, time);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1600, time);
    filter.frequency.exponentialRampToValueAtTime(450, time + duration);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.exponentialRampToValueAtTime(vol, time + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(dest);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration);
    osc2.stop(time + duration);
  }

  // Synthwave Pluck Voice
  function synthPluckNote(ctx, dest, freq, time, duration, vol = 0.08) {
    if (freq <= 0) return;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.Q.setValueAtTime(4, time);
    filter.frequency.setValueAtTime(2600, time);
    filter.frequency.exponentialRampToValueAtTime(320, time + duration);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.exponentialRampToValueAtTime(vol, time + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(dest);

    osc.start(time);
    osc.stop(time + duration);
  }

  // Acoustic Kalimba / Thumb Piano Voice
  function synthKalimbaNote(ctx, dest, freq, time, duration, vol = 0.1) {
    if (freq <= 0) return;
    const osc = ctx.createOscillator();
    const overtone = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq + 40, time);
    osc.frequency.exponentialRampToValueAtTime(freq, time + 0.04);

    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(freq * 3, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.exponentialRampToValueAtTime(vol, time + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(gain);
    overtone.connect(gain);
    gain.connect(dest);

    osc.start(time);
    overtone.start(time);
    osc.stop(time + duration);
    overtone.stop(time + duration);
  }

  // Celesta / Music Box Bell Voice
  function synthCelestaNote(ctx, dest, freq, time, duration, vol = 0.07) {
    if (freq <= 0) return;
    const osc = ctx.createOscillator();
    const bellOsc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    bellOsc.type = 'sine';
    bellOsc.frequency.setValueAtTime(freq * 2.76, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.exponentialRampToValueAtTime(vol, time + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(gain);
    bellOsc.connect(gain);
    gain.connect(dest);

    osc.start(time);
    bellOsc.start(time);
    osc.stop(time + duration);
    bellOsc.stop(time + duration);
  }

  // Marimba Mallet Voice
  function synthMarimbaNote(ctx, dest, freq, time, duration, vol = 0.11) {
    if (freq <= 0) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq + 60, time);
    osc.frequency.exponentialRampToValueAtTime(freq, time + 0.02);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.exponentialRampToValueAtTime(vol, time + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(gain);
    gain.connect(dest);

    osc.start(time);
    osc.stop(time + duration);
  }

  // Tibetan Singing Bowl Voice
  function synthBowlNote(ctx, dest, freq, time, duration, vol = 0.09) {
    if (freq <= 0) return;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, time);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 1.503, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.exponentialRampToValueAtTime(vol, time + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(dest);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration);
    osc2.stop(time + duration);
  }

  // Play Note by Instrument Type
  function playInstrumentNote(inst, ctx, dest, freq, time, duration, vol) {
    switch (inst) {
      case 'synthwave':
        synthPluckNote(ctx, dest, freq, time, duration, vol);
        break;
      case 'kalimba':
        synthKalimbaNote(ctx, dest, freq, time, duration, vol);
        break;
      case 'celesta':
        synthCelestaNote(ctx, dest, freq, time, duration, vol);
        break;
      case 'marimba':
        synthMarimbaNote(ctx, dest, freq, time, duration, vol);
        break;
      case 'singingBowl':
        synthBowlNote(ctx, dest, freq, time, duration, vol);
        break;
      case 'rhodes':
      default:
        synthRhodesNote(ctx, dest, freq, time, duration, vol);
        break;
    }
  }

  // Warm Sub-Bass Voice
  function synthBassNote(ctx, dest, freq, time, duration, vol = 0.16) {
    if (freq <= 0) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.exponentialRampToValueAtTime(vol, time + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(gain);
    gain.connect(dest);

    osc.start(time);
    osc.stop(time + duration);
  }

  // Lush Harmonic Chord Pad
  function synthChordPad(ctx, dest, chord, baseA4, time, duration, vol = 0.045) {
    chord.notes.forEach((noteName, idx) => {
      const f = noteFreq(noteName, baseA4);
      if (f <= 0) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.exponentialRampToValueAtTime(vol / chord.notes.length, time + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(gain);
      gain.connect(dest);

      osc.start(time);
      osc.stop(time + duration);
    });
  }

  // Schedule One Full Musical Loop (Chords + Bass + Melody)
  function scheduleMelodicLoop(ctx, dest, track, startTime) {
    const secondsPerBeat = 60 / track.bpm;
    const baseA4 = track.baseA4 || 432;
    const totalBars = 4;
    const beatsPerBar = 4;
    const loopDuration = totalBars * beatsPerBar * secondsPerBeat;

    // 1. Chords & Bassline
    track.chords.forEach((chord, barIdx) => {
      const barStartTime = startTime + barIdx * beatsPerBar * secondsPerBeat;
      const chordDuration = beatsPerBar * secondsPerBeat * 0.96;

      // Bass note
      const bassF = noteFreq(chord.bass, baseA4);
      synthBassNote(ctx, dest, bassF, barStartTime, chordDuration, 0.18);

      // Lush Chord Pad
      synthChordPad(ctx, dest, chord, baseA4, barStartTime, chordDuration, 0.05);
    });

    // 2. Lead Instrumental Melody
    let currentBeat = 0;
    track.melody.forEach(item => {
      const noteTime = startTime + currentBeat * secondsPerBeat;
      const durationSeconds = item.b * secondsPerBeat * 0.9;
      const f = noteFreq(item.n, baseA4);

      playInstrumentNote(track.instrument, ctx, dest, f, noteTime, durationSeconds, 0.12);

      currentBeat += item.b;
    });

    return loopDuration;
  }

  // Stop any active music or ringtone preview
  function stopActiveMusic() {
    if (activeMusicTimer) {
      clearInterval(activeMusicTimer);
      activeMusicTimer = null;
    }
    previewingTrackId = null;
    document.querySelectorAll('.card-tone-btn.btn-preview-tone').forEach(b => {
      b.classList.remove('playing');
      b.querySelector('span').textContent = 'Preview Ringtone';
    });
  }

  // Start continuous instrumental player stream
  function startCurrentSoundscape() {
    initAudioNodes();
    stopActiveMusic();

    const track = trackCatalog[currentTrackIndex];
    const loopSec = (16 * 60) / track.bpm;

    // Immediate first loop
    scheduleMelodicLoop(audioCtx, musicGain, track, audioCtx.currentTime + 0.05);

    // Continuous loop timer
    activeMusicTimer = setInterval(() => {
      if (!isPlaying || !audioCtx) return;
      scheduleMelodicLoop(audioCtx, musicGain, track, audioCtx.currentTime + 0.05);
    }, loopSec * 1000 - 150);
  }

  // ==========================================
  // RINGTONE PREVIEW & OFFLINE WAV EXPORT
  // ==========================================

  // Play 15s Ringtone Hook Preview
  function previewRingtone(trackId) {
    initAudioNodes();
    const track = trackCatalog.find(t => t.id === trackId);
    if (!track) return;

    if (previewingTrackId === trackId) {
      stopActiveMusic();
      playUiTone('click');
      return;
    }

    // Stop main playback if running
    if (isPlaying) {
      pausePlayback();
    }
    stopActiveMusic();

    previewingTrackId = trackId;
    const btn = document.querySelector(`.btn-preview-tone[data-id="${trackId}"]`);
    if (btn) {
      btn.classList.add('playing');
      btn.querySelector('span').textContent = 'Stop Tone';
    }

    playUiTone('click');
    showToast(`Playing Ringtone: ${track.title} (${track.toneTag})`);

    const loopSec = scheduleMelodicLoop(audioCtx, musicGain, track, audioCtx.currentTime + 0.05);

    // Auto reset button after ringtone loop completes
    setTimeout(() => {
      if (previewingTrackId === trackId) {
        stopActiveMusic();
      }
    }, loopSec * 1000);
  }

  // Convert AudioBuffer to standard 16-bit PCM WAV Blob
  function audioBufferToWavBlob(buffer) {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;
    const bytesPerSample = bitDepth / 8;
    const blockAlign = numChannels * bytesPerSample;
    const length = buffer.length;
    const dataSize = length * blockAlign;
    const totalSize = 44 + dataSize;
    const arrayBuffer = new ArrayBuffer(totalSize);
    const view = new DataView(arrayBuffer);

    function writeString(offset, string) {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    }

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    writeString(36, 'data');
    view.setUint32(40, dataSize, true);

    let offset = 44;
    const channelData = [];
    for (let ch = 0; ch < numChannels; ch++) {
      channelData.push(buffer.getChannelData(ch));
    }

    for (let i = 0; i < length; i++) {
      for (let ch = 0; ch < numChannels; ch++) {
        let sample = channelData[ch][i];
        sample = Math.max(-1, Math.min(1, sample));
        const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
        view.setInt16(offset, intSample, true);
        offset += 2;
      }
    }

    return new Blob([view], { type: 'audio/wav' });
  }

  // Synthesize and Download Studio Quality .WAV Ringtone in-browser
  async function downloadRingtone(trackId) {
    const track = trackCatalog.find(t => t.id === trackId);
    if (!track) return;

    playUiTone('click');
    showToast(`Synthesizing HD Ringtone: ${track.title}.wav...`);

    try {
      const sampleRate = 44100;
      const loopDuration = (16 * 60) / track.bpm;
      const totalDuration = loopDuration + 1.2; // include reverb tail

      const OfflineCtx = window.OfflineAudioContext || window.webkitOfflineAudioContext;
      const offlineCtx = new OfflineCtx(2, Math.ceil(sampleRate * totalDuration), sampleRate);

      const offGain = offlineCtx.createGain();
      offGain.gain.setValueAtTime(0.85, 0);

      const comp = offlineCtx.createDynamicsCompressor();
      offGain.connect(comp);
      comp.connect(offlineCtx.destination);

      scheduleMelodicLoop(offlineCtx, offGain, track, 0.05);

      const renderedBuffer = await offlineCtx.startRendering();
      const wavBlob = audioBufferToWavBlob(renderedBuffer);

      const url = URL.createObjectURL(wavBlob);
      const a = document.createElement('a');
      const filename = `MoltenPrism_${track.title.replace(/\s+/g, '')}_Ringtone.wav`;
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        a.remove();
        URL.revokeObjectURL(url);
      }, 1000);

      showToast(`✨ Ringtone downloaded: ${filename}`);
    } catch (err) {
      console.error('Error generating WAV ringtone:', err);
      showToast(`Error rendering audio: ${err.message}`);
    }
  }

  // ==========================================
  // UI CONTROLS & EVENT LISTENERS
  // ==========================================

  // SFX Toggle button logic
  const sfxToggleBtn = document.getElementById('sfx-toggle');
  if (sfxToggleBtn) {
    sfxToggleBtn.addEventListener('click', () => {
      initAudioNodes();
      sfxEnabled = !sfxEnabled;
      if (sfxGain && audioCtx) {
        sfxGain.gain.setValueAtTime(sfxEnabled ? 0.65 : 0, audioCtx.currentTime);
      }
      playUiTone('click');
      const textEl = document.getElementById('sfx-text');
      if (textEl) textEl.textContent = sfxEnabled ? 'Audio Tones: ON' : 'Audio Tones: OFF';
      sfxToggleBtn.classList.toggle('sfx-muted', !sfxEnabled);
    });
  }

  // Render Track Catalog Cards with Tone Preview & Download Buttons
  function renderCatalog(filter = 'all') {
    const trackGrid = document.getElementById('track-grid');
    if (!trackGrid) return;
    trackGrid.innerHTML = '';
    const filtered = filter === 'all' 
      ? trackCatalog 
      : trackCatalog.filter(t => t.genre === filter);

    filtered.forEach((track) => {
      const card = document.createElement('div');
      card.className = 'track-card liquid-card';
      card.innerHTML = `
        <div class="card-art-preview" style="background: ${track.gradient}">
          <img src="icon.png" alt="Molten Orb" class="card-art-orb-watermark">
          <div class="card-meta-tag"><i data-lucide="music" style="width:12px; height:12px;"></i> ${track.frequency}</div>
          <div class="card-play-hover">
            <i data-lucide="play" class="fill-current"></i>
          </div>
          <div class="card-soundwave-indicator">
            <span></span><span></span><span></span><span></span>
          </div>
        </div>
        <div class="card-info">
          <h4>${track.title}</h4>
          <div class="card-tone-type"><span class="tone-badge">♫ ${track.toneTag}</span></div>
          <p>${track.desc}</p>
        </div>
        <div class="card-actions">
          <button class="card-tone-btn btn-preview-tone" data-id="${track.id}" title="Listen to 15s Catchy Instrumental Ringtone">
            <i data-lucide="bell"></i> <span>Preview Ringtone</span>
          </button>
          <button class="card-tone-btn btn-download-tone" data-id="${track.id}" title="Download Instrumental Ringtone as .WAV file">
            <i data-lucide="download"></i> <span>Get Tone</span>
          </button>
        </div>
        <div class="card-bottom">
          <span class="duration-pill"><i data-lucide="clock" style="width:12px; height:12px; vertical-align:middle; margin-right:4px;"></i>${track.duration}</span>
          <span class="yt-badge"><i data-lucide="sparkles" style="width:14px; height:14px;"></i> ${track.bpm} BPM</span>
        </div>
      `;

      card.addEventListener('mouseenter', () => playUiTone('hover'));

      // Card click opens player
      card.addEventListener('click', (e) => {
        if (e.target.closest('.card-actions')) return;
        playUiTone('click');
        const index = trackCatalog.findIndex(t => t.id === track.id);
        selectTrack(index, true);
      });

      // Preview Tone Button
      const previewBtn = card.querySelector('.btn-preview-tone');
      previewBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        previewRingtone(track.id);
      });

      // Download Tone Button
      const downloadBtn = card.querySelector('.btn-download-tone');
      downloadBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        downloadRingtone(track.id);
      });

      trackGrid.appendChild(card);
    });

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => playUiTone('hover'));
    btn.addEventListener('click', () => {
      playUiTone('click');
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCatalog(btn.dataset.genre);
    });
  });

  // Track Selection and Playback
  const currentTitleEl = document.getElementById('current-title');
  const currentArtistEl = document.getElementById('current-artist');
  const totalTimeEl = document.getElementById('total-time');
  const dockTitle = document.getElementById('dock-title');
  const dockArtist = document.getElementById('dock-artist');
  const seekFill = document.getElementById('seek-fill');
  const currentTimeEl = document.getElementById('current-time');
  const artDisc = document.getElementById('art-disc');
  const playBtn = document.getElementById('btn-play');
  const dockPlayBtn = document.getElementById('dock-btn-play');
  const floatingDock = document.getElementById('floating-dock');
  const heroPlayTrigger = document.getElementById('hero-play-trigger');
  const seekTrack = document.getElementById('seek-track');

  // Volume & Shuffle state
  let currentVolume = 0.85;
  let isMuted = false;
  let isShuffle = false;

  const btnVolume = document.getElementById('btn-volume');
  const dockBtnVolume = document.getElementById('dock-btn-volume');
  const volumeSlider = document.getElementById('volume-slider');
  const volumeText = document.getElementById('volume-text');
  const btnShuffle = document.getElementById('btn-shuffle');
  const dockBtnShuffle = document.getElementById('dock-btn-shuffle');

  function updateVolumeUI() {
    initAudioNodes();
    const effectiveVol = isMuted ? 0 : currentVolume;
    if (masterGain && audioCtx) {
      masterGain.gain.setValueAtTime(effectiveVol, audioCtx.currentTime);
    }

    const pct = Math.round(effectiveVol * 100);
    if (volumeSlider) volumeSlider.value = pct;
    if (volumeText) volumeText.textContent = `${pct}%`;

    const iconName = isMuted || effectiveVol === 0 ? 'volume-x' : (effectiveVol < 0.45 ? 'volume-1' : 'volume-2');
    if (btnVolume) {
      btnVolume.innerHTML = `<i data-lucide="${iconName}"></i>`;
      btnVolume.classList.toggle('muted', isMuted || effectiveVol === 0);
    }
    if (dockBtnVolume) {
      dockBtnVolume.innerHTML = `<i data-lucide="${iconName}"></i>`;
      dockBtnVolume.classList.toggle('muted', isMuted || effectiveVol === 0);
    }
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  function toggleMute() {
    initAudioNodes();
    isMuted = !isMuted;
    playUiTone(isMuted ? 'click' : 'switch');
    showToast(isMuted ? '🔇 Audio Muted' : `🔊 Volume: ${Math.round(currentVolume * 100)}%`);
    updateVolumeUI();
  }

  if (btnVolume) {
    btnVolume.addEventListener('click', (e) => {
      // Toggle mute on click
      toggleMute();
    });
  }

  if (dockBtnVolume) {
    dockBtnVolume.addEventListener('click', toggleMute);
  }

  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      initAudioNodes();
      const val = parseInt(e.target.value, 10);
      currentVolume = val / 100;
      if (currentVolume > 0 && isMuted) {
        isMuted = false;
      }
      updateVolumeUI();
    });
  }

  // Shuffle Tracks
  function triggerShuffle() {
    playUiTone('switch');
    isShuffle = !isShuffle;
    if (btnShuffle) btnShuffle.classList.toggle('shuffle-active', isShuffle);
    if (dockBtnShuffle) dockBtnShuffle.classList.toggle('shuffle-active', isShuffle);

    let nextIndex;
    if (trackCatalog.length > 1) {
      do {
        nextIndex = Math.floor(Math.random() * trackCatalog.length);
      } while (nextIndex === currentTrackIndex);
    } else {
      nextIndex = 0;
    }

    showToast(`🔀 Shuffled to: ${trackCatalog[nextIndex].title}`);
    selectTrack(nextIndex, isPlaying);
  }

  if (btnShuffle) btnShuffle.addEventListener('click', triggerShuffle);
  if (dockBtnShuffle) dockBtnShuffle.addEventListener('click', triggerShuffle);

  function selectTrack(index, autoPlay = true) {
    currentTrackIndex = index;
    const track = trackCatalog[currentTrackIndex];
    if (currentTitleEl) currentTitleEl.textContent = track.title;
    if (currentArtistEl) currentArtistEl.textContent = `${track.artist} • ${track.toneTag}`;
    if (totalTimeEl) totalTimeEl.textContent = track.duration;
    if (dockTitle) dockTitle.textContent = track.title;
    if (dockArtist) dockArtist.textContent = track.artist;
    currentTimeSec = 0;
    updateProgressUI();

    if (autoPlay) {
      startPlayback();
    }
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function updateProgressUI() {
    const track = trackCatalog[currentTrackIndex];
    const pct = (currentTimeSec / track.durationSec) * 100;
    if (seekFill) seekFill.style.width = `${pct}%`;
    if (currentTimeEl) currentTimeEl.textContent = formatTime(currentTimeSec);
  }

  function startPlayback() {
    isPlaying = true;
    if (artDisc) artDisc.classList.add('spinning');
    updatePlayIcons(true);
    if (floatingDock) floatingDock.classList.add('visible');
    const dockBars = document.getElementById('dock-bars');
    if (dockBars) dockBars.classList.add('active');

    playUiTone('playChord');
    startCurrentSoundscape();

    clearInterval(playProgressInterval);
    playProgressInterval = setInterval(() => {
      currentTimeSec++;
      const track = trackCatalog[currentTrackIndex];
      if (currentTimeSec >= track.durationSec) {
        selectTrack((currentTrackIndex + 1) % trackCatalog.length, true);
      } else {
        updateProgressUI();
      }
    }, 1000);
  }

  function pausePlayback() {
    isPlaying = false;
    if (artDisc) artDisc.classList.remove('spinning');
    updatePlayIcons(false);
    const dockBars = document.getElementById('dock-bars');
    if (dockBars) dockBars.classList.remove('active');
    clearInterval(playProgressInterval);
    stopActiveMusic();
    playUiTone('click');
  }

  function togglePlayback() {
    if (isPlaying) {
      pausePlayback();
    } else {
      startPlayback();
    }
  }

  function updatePlayIcons(playing) {
    const iconName = playing ? 'pause' : 'play';
    if (playBtn) playBtn.innerHTML = `<i data-lucide="${iconName}"></i>`;
    if (dockPlayBtn) dockPlayBtn.innerHTML = `<i data-lucide="${iconName}"></i>`;
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  if (playBtn) playBtn.addEventListener('click', togglePlayback);
  if (dockPlayBtn) dockPlayBtn.addEventListener('click', togglePlayback);
  if (heroPlayTrigger) {
    heroPlayTrigger.addEventListener('click', () => {
      if (!isPlaying) startPlayback();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const btnNext = document.getElementById('btn-next');
  if (btnNext) btnNext.addEventListener('click', () => {
    playUiTone('switch');
    selectTrack((currentTrackIndex + 1) % trackCatalog.length, isPlaying);
  });
  const dockBtnNext = document.getElementById('dock-btn-next');
  if (dockBtnNext) dockBtnNext.addEventListener('click', () => {
    playUiTone('switch');
    selectTrack((currentTrackIndex + 1) % trackCatalog.length, isPlaying);
  });

  const btnPrev = document.getElementById('btn-prev');
  if (btnPrev) btnPrev.addEventListener('click', () => {
    playUiTone('switch');
    selectTrack((currentTrackIndex - 1 + trackCatalog.length) % trackCatalog.length, isPlaying);
  });
  const dockBtnPrev = document.getElementById('dock-btn-prev');
  if (dockBtnPrev) dockBtnPrev.addEventListener('click', () => {
    playUiTone('switch');
    selectTrack((currentTrackIndex - 1 + trackCatalog.length) % trackCatalog.length, isPlaying);
  });

  if (seekTrack) {
    seekTrack.addEventListener('click', (e) => {
      playUiTone('click');
      const rect = seekTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, clickX / rect.width));
      const track = trackCatalog[currentTrackIndex];
      currentTimeSec = Math.floor(pct * track.durationSec);
      updateProgressUI();
    });
  }

  // ==========================================
  // REAL-TIME AUDIO SPECTRUM & AURA VISUALIZERS
  // ==========================================

  // 1. Dynamic Spectrum Visualizer Canvas Animation (Waveform container)
  const waveCanvas = document.getElementById('waveform-canvas');
  const vizFreqReadout = document.getElementById('viz-freq-readout');

  // Peak caps array for high-end audio visualizer bounce effect
  const numBars = 48;
  const peakCaps = new Array(numBars).fill(0);
  const capSpeeds = new Array(numBars).fill(0.6);

  if (waveCanvas) {
    const waveCtx = waveCanvas.getContext('2d');
    let waveStep = 0;

    function resizeWaveCanvas() {
      const rect = waveCanvas.getBoundingClientRect();
      const w = rect.width || waveCanvas.parentElement.clientWidth || 320;
      const h = rect.height || 64;
      const dpr = window.devicePixelRatio || 1;
      waveCanvas.width = Math.floor(w * dpr);
      waveCanvas.height = Math.floor(h * dpr);
      waveCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    window.addEventListener('resize', resizeWaveCanvas);
    setTimeout(resizeWaveCanvas, 50);
    resizeWaveCanvas();

    function drawWaveform() {
      const rect = waveCanvas.getBoundingClientRect();
      const width = rect.width || 320;
      const height = rect.height || 64;

      waveCtx.clearRect(0, 0, width, height);
      const centerY = height / 2;

      const gap = 3;
      const barWidth = Math.max(2, (width - (numBars * gap)) / numBars);

      let freqData = null;
      let hasRealAudio = false;

      if (analyser && analyserData && (isPlaying || previewingTrackId !== null || synthActive)) {
        analyser.getByteFrequencyData(analyserData);
        freqData = analyserData;
        hasRealAudio = true;
      }

      for (let i = 0; i < numBars; i++) {
        let barHeight;
        if (hasRealAudio && freqData) {
          const binIndex = Math.min(Math.floor((i / numBars) * freqData.length), freqData.length - 1);
          const rawVal = freqData[binIndex] / 255; // 0 to 1
          // Combine real FFT data with slight organic molten breathing
          barHeight = Math.max(4, (rawVal * 0.85 + 0.12) * height);
        } else if (isPlaying || previewingTrackId !== null) {
          const wave1 = Math.sin(waveStep * 0.08 + i * 0.28);
          const wave2 = Math.cos(waveStep * 0.05 + i * 0.18);
          const wave3 = Math.sin(waveStep * 0.12 + i * 0.45);
          barHeight = Math.max(4, (Math.abs(wave1 * 0.5 + wave2 * 0.35 + wave3 * 0.15) * 0.72 + 0.14) * height);
        } else {
          // Animated standby state when paused so user always sees the vibrant visualizer!
          barHeight = Math.max(3, (Math.sin(waveStep * 0.04 + i * 0.22) * 0.16 + 0.24) * height);
        }

        // Peak cap physics (falls gracefully like high-end DJ equipment)
        if (barHeight > peakCaps[i]) {
          peakCaps[i] = barHeight;
          capSpeeds[i] = 0.5;
        } else {
          capSpeeds[i] += 0.08;
          peakCaps[i] = Math.max(0, peakCaps[i] - capSpeeds[i]);
        }

        const x = i * (barWidth + gap);
        const y = centerY - barHeight / 2;

        // Vivid Prismatic Gradient
        const grad = waveCtx.createLinearGradient(0, y, 0, y + barHeight);
        const colorOffset = (i / numBars + (waveStep * 0.006)) % 1;
        if (colorOffset < 0.33) {
          grad.addColorStop(0, '#38bdf8');
          grad.addColorStop(0.5, '#818cf8');
          grad.addColorStop(1, '#6366f1');
        } else if (colorOffset < 0.66) {
          grad.addColorStop(0, '#a855f7');
          grad.addColorStop(0.5, '#ec4899');
          grad.addColorStop(1, '#f43f5e');
        } else {
          grad.addColorStop(0, '#34d399');
          grad.addColorStop(0.5, '#06b6d4');
          grad.addColorStop(1, '#38bdf8');
        }

        waveCtx.fillStyle = grad;
        waveCtx.shadowColor = (isPlaying || previewingTrackId) ? 'rgba(56, 189, 248, 0.6)' : 'rgba(56, 189, 248, 0.2)';
        waveCtx.shadowBlur = (isPlaying || previewingTrackId) ? 10 : 3;

        waveCtx.beginPath();
        if (waveCtx.roundRect) {
          waveCtx.roundRect(x, y, barWidth, barHeight, 3);
        } else {
          waveCtx.rect(x, y, barWidth, barHeight);
        }
        waveCtx.fill();

        // Draw Peak Floating Cap
        if (isPlaying || previewingTrackId) {
          const capY = centerY - peakCaps[i] / 2 - 3;
          waveCtx.fillStyle = '#ffffff';
          waveCtx.shadowColor = '#38bdf8';
          waveCtx.shadowBlur = 6;
          waveCtx.fillRect(x, Math.max(2, capY), barWidth, 2);
        }
      }

      // Update frequency readout live badge
      if (waveStep % 30 === 0 && vizFreqReadout) {
        const track = trackCatalog[currentTrackIndex];
        if (isPlaying) {
          vizFreqReadout.textContent = `${track.frequency} TUNED`;
        } else {
          vizFreqReadout.textContent = 'STANDBY';
        }
      }

      waveStep++;
      requestAnimationFrame(drawWaveform);
    }
    drawWaveform();
  }

  // 2. Circular Holographic Aura Visualizer Canvas (Surrounding Hero Glass Orb)
  const auraCanvas = document.getElementById('circular-visualizer-canvas');
  if (auraCanvas) {
    const auraCtx = auraCanvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    auraCanvas.width = 190 * dpr;
    auraCanvas.height = 190 * dpr;
    auraCtx.scale(dpr, dpr);

    let auraAngle = 0;
    const numRays = 42;

    function drawCircularAura() {
      auraCtx.clearRect(0, 0, 190, 190);
      const cx = 95;
      const cy = 95;
      const baseRadius = 66; // wraps snugly around 124px disc

      let freqData = null;
      if (analyser && analyserData && (isPlaying || previewingTrackId !== null)) {
        freqData = analyserData;
      }

      for (let i = 0; i < numRays; i++) {
        const angle = (i / numRays) * Math.PI * 2 + auraAngle;
        let rayLen;

        if (freqData) {
          const bin = Math.floor((i / numRays) * freqData.length);
          const val = freqData[bin] / 255;
          rayLen = 4 + val * 24;
        } else if (isPlaying || previewingTrackId) {
          rayLen = 4 + Math.sin(auraAngle * 2 + i * 0.4) * 8 + 6;
        } else {
          rayLen = 2 + Math.sin(auraAngle * 0.5 + i * 0.3) * 2;
        }

        const x1 = cx + Math.cos(angle) * baseRadius;
        const y1 = cy + Math.sin(angle) * baseRadius;
        const x2 = cx + Math.cos(angle) * (baseRadius + rayLen);
        const y2 = cy + Math.sin(angle) * (baseRadius + rayLen);

        const hue = (i / numRays) * 360 + (auraAngle * 20);
        auraCtx.strokeStyle = `hsla(${hue % 360}, 90%, 65%, ${isPlaying ? 0.85 : 0.25})`;
        auraCtx.lineWidth = 2.2;
        auraCtx.lineCap = 'round';
        auraCtx.shadowColor = `hsla(${hue % 360}, 90%, 65%, 0.8)`;
        auraCtx.shadowBlur = isPlaying ? 8 : 2;

        auraCtx.beginPath();
        auraCtx.moveTo(x1, y1);
        auraCtx.lineTo(x2, y2);
        auraCtx.stroke();
      }

      auraAngle += isPlaying ? 0.018 : 0.005;
      requestAnimationFrame(drawCircularAura);
    }
    drawCircularAura();
  }

  // 3. Mini Dock Circular Radial Visualizer (Wraps around dock orb)
  const dockVizCanvas = document.getElementById('dock-visualizer-canvas');
  if (dockVizCanvas) {
    const dockVizCtx = dockVizCanvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    dockVizCanvas.width = 60 * dpr;
    dockVizCanvas.height = 60 * dpr;
    dockVizCtx.scale(dpr, dpr);

    let dockAngle = 0;

    function drawDockVisualizer() {
      dockVizCtx.clearRect(0, 0, 60, 60);
      const cx = 30;
      const cy = 30;
      const r = 18;
      const points = 24;

      let freqData = null;
      if (analyser && analyserData && (isPlaying || previewingTrackId !== null)) {
        freqData = analyserData;
      }

      for (let i = 0; i < points; i++) {
        const theta = (i / points) * Math.PI * 2 + dockAngle;
        let len = 2;
        if (freqData) {
          const bin = Math.floor((i / points) * freqData.length);
          len = 2 + (freqData[bin] / 255) * 8;
        } else if (isPlaying || previewingTrackId) {
          len = 2 + Math.abs(Math.sin(dockAngle * 3 + i * 0.5)) * 6;
        } else {
          len = 1.5;
        }

        const x1 = cx + Math.cos(theta) * r;
        const y1 = cy + Math.sin(theta) * r;
        const x2 = cx + Math.cos(theta) * (r + len);
        const y2 = cy + Math.sin(theta) * (r + len);

        const hue = (i / points) * 360 + (dockAngle * 30);
        dockVizCtx.strokeStyle = isPlaying ? `hsla(${hue % 360}, 90%, 65%, 0.95)` : 'rgba(255,255,255,0.2)';
        dockVizCtx.lineWidth = 1.8;
        dockVizCtx.lineCap = 'round';
        dockVizCtx.shadowColor = isPlaying ? `hsla(${hue % 360}, 90%, 65%, 0.8)` : 'transparent';
        dockVizCtx.shadowBlur = isPlaying ? 6 : 0;
        dockVizCtx.beginPath();
        dockVizCtx.moveTo(x1, y1);
        dockVizCtx.lineTo(x2, y2);
        dockVizCtx.stroke();
      }

      dockAngle += isPlaying ? 0.025 : 0.006;
      requestAnimationFrame(drawDockVisualizer);
    }
    drawDockVisualizer();
  }

  // Background Fluid Canvas Simulation
  const fluidCanvas = document.getElementById('liquid-canvas');
  if (fluidCanvas) {
    const fluidCtx = fluidCanvas.getContext('2d');
    let fluidWidth, fluidHeight;

    function resizeFluid() {
      fluidWidth = fluidCanvas.width = window.innerWidth;
      fluidHeight = fluidCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeFluid);
    resizeFluid();

    const fluidBlobs = [
      { x: 250, y: 250, vx: 0.7, vy: 0.5, radius: 260, color: 'rgba(56, 189, 248, 0.18)' },
      { x: 900, y: 350, vx: -0.5, vy: 0.7, radius: 300, color: 'rgba(168, 85, 247, 0.16)' },
      { x: 550, y: 650, vx: 0.6, vy: -0.6, radius: 280, color: 'rgba(236, 72, 153, 0.15)' },
      { x: 150, y: 700, vx: 0.4, vy: -0.4, radius: 220, color: 'rgba(52, 211, 153, 0.12)' }
    ];

    const pointerParticles = [];
    let lastPointerX = 0;
    let lastPointerY = 0;

    window.addEventListener('pointermove', (e) => {
      const dist = Math.hypot(e.clientX - lastPointerX, e.clientY - lastPointerY);
      if (dist > 18 && pointerParticles.length < 35) {
        lastPointerX = e.clientX;
        lastPointerY = e.clientY;
        pointerParticles.push({
          x: e.clientX,
          y: e.clientY,
          radius: Math.random() * 24 + 14,
          alpha: 0.35,
          color: ['#38bdf8', '#a855f7', '#ec4899', '#34d399'][Math.floor(Math.random() * 4)],
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.8
        });
      }
    });

    function animateFluid() {
      fluidCtx.clearRect(0, 0, fluidWidth, fluidHeight);

      fluidBlobs.forEach(b => {
        b.x += b.vx;
        b.y += b.vy;

        if (b.x < -100 || b.x > fluidWidth + 100) b.vx *= -1;
        if (b.y < -100 || b.y > fluidHeight + 100) b.vy *= -1;

        const grad = fluidCtx.createRadialGradient(b.x, b.y, 20, b.x, b.y, b.radius);
        grad.addColorStop(0, b.color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        fluidCtx.fillStyle = grad;
        fluidCtx.beginPath();
        fluidCtx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        fluidCtx.fill();
      });

      for (let i = pointerParticles.length - 1; i >= 0; i--) {
        const p = pointerParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.009;
        p.radius *= 0.985;

        if (p.alpha <= 0.01) {
          pointerParticles.splice(i, 1);
          continue;
        }

        fluidCtx.save();
        fluidCtx.globalAlpha = p.alpha;
        fluidCtx.fillStyle = p.color;
        fluidCtx.shadowColor = p.color;
        fluidCtx.shadowBlur = 12;
        fluidCtx.beginPath();
        fluidCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        fluidCtx.fill();
        fluidCtx.restore();
      }

      requestAnimationFrame(animateFluid);
    }
    animateFluid();
  }

  // Interactive Prismatic Synthesizer Pad
  const synthPad = document.getElementById('synth-pad');
  const rippleBox = document.getElementById('ripple-box');
  const coordsText = document.getElementById('coords-text');
  const toggleSynthBtn = document.getElementById('toggle-synth-btn');

  let padOsc = null;
  let padGain = null;
  let padFilter = null;
  let padHarmonicOsc = null;

  if (toggleSynthBtn) {
    toggleSynthBtn.addEventListener('click', () => {
      initAudioNodes();
      playUiTone('click');
      synthActive = !synthActive;
      if (synthActive) {
        toggleSynthBtn.classList.add('primary-glow');
        toggleSynthBtn.classList.remove('glass-secondary');
        toggleSynthBtn.querySelector('span').textContent = 'Audio Node Active (Move Cursor)';
      } else {
        toggleSynthBtn.classList.remove('primary-glow');
        toggleSynthBtn.classList.add('glass-secondary');
        toggleSynthBtn.querySelector('span').textContent = 'Enable Pure Audio Node';
        if (padGain && audioCtx) {
          padGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.1);
        }
      }
    });
  }

  if (synthPad) {
    synthPad.addEventListener('mousemove', (e) => {
      const rect = synthPad.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const normX = Math.max(0, Math.min(1, x / rect.width));
      const normY = Math.max(0, Math.min(1, y / rect.height));

      const freq = Math.round(180 + normX * 600);
      const harmonic = Math.round(50 + (1 - normY) * 250);
      if (coordsText) coordsText.textContent = `Carrier: ${freq}Hz | Refract: ${harmonic}Hz`;

      if (synthActive && audioCtx) {
        if (!padOsc) {
          padOsc = audioCtx.createOscillator();
          padHarmonicOsc = audioCtx.createOscillator();
          padFilter = audioCtx.createBiquadFilter();
          padGain = audioCtx.createGain();

          padFilter.type = 'lowpass';
          padFilter.frequency.setValueAtTime(1200, audioCtx.currentTime);
          padFilter.Q.setValueAtTime(3, audioCtx.currentTime);

          padOsc.type = 'sine';
          padHarmonicOsc.type = 'triangle';

          padOsc.connect(padFilter);
          padHarmonicOsc.connect(padFilter);
          padFilter.connect(padGain);
          padGain.connect(masterGain);

          padOsc.start();
          padHarmonicOsc.start();
        }
        padOsc.frequency.setTargetAtTime(freq, audioCtx.currentTime, 0.04);
        padHarmonicOsc.frequency.setTargetAtTime(freq * 1.5, audioCtx.currentTime, 0.04);
        padFilter.frequency.setTargetAtTime(600 + normY * 1800, audioCtx.currentTime, 0.04);
        padGain.gain.setTargetAtTime(0.09, audioCtx.currentTime, 0.04);
      }
    });

    synthPad.addEventListener('mouseleave', () => {
      if (padGain && audioCtx) {
        padGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.2);
      }
    });

    synthPad.addEventListener('click', (e) => {
      const rect = synthPad.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (rippleBox) {
        const ripple = document.createElement('div');
        ripple.className = 'synth-ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.width = '140px';
        ripple.style.height = '140px';
        rippleBox.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1200);
      }

      playUiTone('click');
    });
  }

  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('mouseenter', () => playUiTone('hover'));
    themeToggle.addEventListener('click', () => {
      playUiTone('switch');
      document.body.classList.toggle('prism-refract-mode');
    });
  }

  // 3D Parallax Tilt & Holographic Specular Glare on Liquid Cards
  const cards = document.querySelectorAll('.liquid-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => playUiTone('hover'));

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPct = (x / rect.width) * 100;
      const yPct = (y / rect.height) * 100;

      const rotX = ((y / rect.height) - 0.5) * -10;
      const rotY = ((x / rect.width) - 0.5) * 10;

      card.style.setProperty('--mouse-x', `${xPct}%`);
      card.style.setProperty('--mouse-y', `${yPct}%`);
      card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // Smooth Navigation Scroll & Sound
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => playUiTone('hover'));
    btn.addEventListener('click', () => {
      playUiTone('click');
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      const target = document.getElementById(tab);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Initial render
  renderCatalog('all');
});
