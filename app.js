// Molten Prism - Liquid Glass UI Interactive Engine & Audio Synthesizer

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Set Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Curated Soundscape Library Data
  const trackCatalog = [
    {
      id: 1,
      title: 'Vitreous Horizon',
      artist: 'Molten Prism • Vol. 1',
      genre: 'ambient',
      duration: '3:45',
      durationSec: 225,
      frequency: '432 Hz',
      gradient: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
      desc: 'Liquid acoustic reverb tuned to natural harmonic earth frequencies.'
    },
    {
      id: 2,
      title: 'Chromasphere Drift',
      artist: 'Prism Refractor',
      genre: 'synth',
      duration: '4:12',
      durationSec: 252,
      frequency: '528 Hz',
      gradient: 'linear-gradient(135deg, #a855f7, #ec4899)',
      desc: 'Sub-bass pulse traveling through high-viscosity optic chambers.'
    },
    {
      id: 3,
      title: 'Molten Silica Tide',
      artist: 'Hydros Sonics',
      genre: 'deep',
      duration: '5:20',
      durationSec: 320,
      frequency: '639 Hz',
      gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      desc: 'Dense, warm analog pads submerged in shimmering thermal fluid.'
    },
    {
      id: 4,
      title: 'Lucent Prism Echo',
      artist: 'Aura Glass',
      genre: 'ambient',
      duration: '3:18',
      durationSec: 198,
      frequency: '741 Hz',
      gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
      desc: 'Crystalline bell tones refracting through floating prismatic droplets.'
    },
    {
      id: 5,
      title: 'Glass Cascade Neon',
      artist: 'Vitreon BeatLab',
      genre: 'synth',
      duration: '3:50',
      durationSec: 230,
      frequency: '852 Hz',
      gradient: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
      desc: 'Hyper-fluid downtempo synth pulses with holographic delays.'
    },
    {
      id: 6,
      title: 'Deep Obsidian Flow',
      artist: 'Molten Prism Core',
      genre: 'deep',
      duration: '4:45',
      durationSec: 285,
      frequency: '963 Hz',
      gradient: 'linear-gradient(135deg, #64748b, #334155)',
      desc: 'Subterranean binaural hum designed for deep focus and meditation.'
    }
  ];

  let currentTrackIndex = 0;
  let isPlaying = false;
  let playProgressInterval = null;
  let currentTimeSec = 0;

  // Web Audio Context for Procedural Liquid Synthesizer & Soundscapes
  let audioCtx = null;
  let masterGain = null;
  let synthActive = false;

  // Track Synth State (Procedural Generative Soundscape per track)
  let trackOscs = [];
  let trackFilters = [];
  let trackArpTimer = null;
  let trackChordIndex = 0;

  // Soundscape Musical Profiles for each track
  const trackAudioProfiles = [
    {
      // 1: Vitreous Horizon - 432Hz Calm Harmonic Pad & Chimes
      rootFreq: 216, // A3 tuned harmonic
      scale: [216, 270, 324, 378, 432, 540], // Natural overtone series
      droneWave: 'sine',
      cutoff: 750,
      filterQ: 2,
      lfoSpeed: 0.12,
      arpInterval: 2200,
      bellWave: 'sine',
      reverbLevel: 0.35
    },
    {
      // 2: Chromasphere Drift - 528Hz Transformation / Solfeggio Synth Wave
      rootFreq: 132, // C3
      scale: [132, 165, 198, 247.5, 264, 330, 396, 528], // Lydian / Solfeggio shimmer
      droneWave: 'triangle',
      cutoff: 1100,
      filterQ: 4,
      lfoSpeed: 0.22,
      arpInterval: 1400,
      bellWave: 'triangle',
      reverbLevel: 0.45
    },
    {
      // 3: Molten Silica Tide - 639Hz Warm Analog Hydro Swell
      rootFreq: 106.5, // Warm F2/F3
      scale: [106.5, 159.75, 213, 266.25, 319.5, 426, 639], // Pentatonic warm tide
      droneWave: 'sawtooth',
      cutoff: 480,
      filterQ: 1.5,
      lfoSpeed: 0.08,
      arpInterval: 2800,
      bellWave: 'sine',
      reverbLevel: 0.5
    },
    {
      // 4: Lucent Prism Echo - 741Hz Crystal Bells & Refraction
      rootFreq: 247, // B3
      scale: [247, 293.66, 370, 440, 494, 587.33, 741], // Shimmering Crystal
      droneWave: 'sine',
      cutoff: 1400,
      filterQ: 3.5,
      lfoSpeed: 0.3,
      arpInterval: 1000,
      bellWave: 'triangle',
      reverbLevel: 0.6
    },
    {
      // 5: Glass Cascade Neon - 852Hz Pulsing Cyber Euphoria
      rootFreq: 142, // D3
      scale: [142, 177.5, 213, 284, 355, 426, 568, 852], // Minor pentatonic neon
      droneWave: 'sawtooth',
      cutoff: 920,
      filterQ: 5,
      lfoSpeed: 0.45,
      arpInterval: 800,
      bellWave: 'triangle',
      reverbLevel: 0.4
    },
    {
      // 6: Deep Obsidian Flow - 963Hz Subterranean Binaural Hum
      rootFreq: 60.18, // Deep Sub B1
      scale: [60.18, 90.27, 120.36, 180.54, 240.72, 481.5, 963], // Deep Sub Binaural
      droneWave: 'sine',
      cutoff: 350,
      filterQ: 1.2,
      lfoSpeed: 0.05,
      arpInterval: 3400,
      bellWave: 'sine',
      reverbLevel: 0.6
    }
  ];

  // DOM Elements
  const playBtn = document.getElementById('btn-play');
  const playIcon = document.getElementById('play-icon');
  const heroPlayTrigger = document.getElementById('hero-play-trigger');
  const artDisc = document.getElementById('art-disc');
  const currentTitleEl = document.getElementById('current-title');
  const currentArtistEl = document.getElementById('current-artist');
  const seekFill = document.getElementById('seek-fill');
  const currentTimeEl = document.getElementById('current-time');
  const totalTimeEl = document.getElementById('total-time');
  const seekTrack = document.getElementById('seek-track');
  const floatingDock = document.getElementById('floating-dock');
  const dockTitle = document.getElementById('dock-title');
  const dockArtist = document.getElementById('dock-artist');
  const dockPlayBtn = document.getElementById('dock-btn-play');
  const dockPlayIcon = document.getElementById('dock-play-icon');
  const trackGrid = document.getElementById('track-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const themeToggle = document.getElementById('theme-toggle');

  // Render Track Catalog Cards
  function renderCatalog(filter = 'all') {
    trackGrid.innerHTML = '';
    const filtered = filter === 'all' 
      ? trackCatalog 
      : trackCatalog.filter(t => t.genre === filter);

    filtered.forEach((track) => {
      const card = document.createElement('div');
      card.className = 'track-card liquid-card';
      card.innerHTML = `
        <div class="glass-glare"></div>
        <div class="card-art" style="background: ${track.gradient}">
          <img src="icon.png" alt="Molten Orb" class="card-art-orb-watermark">
          <div class="card-meta-tag">${track.frequency}</div>
          <div class="card-play-hover">
            <i data-lucide="play" class="fill-current"></i>
          </div>
        </div>
        <div class="card-info">
          <h4>${track.title}</h4>
          <p>${track.desc}</p>
        </div>
        <div class="card-bottom">
          <span class="duration-pill"><i data-lucide="clock" style="width:12px; height:12px; vertical-align:middle; margin-right:4px;"></i>${track.duration}</span>
          <span class="yt-badge"><i data-lucide="youtube" style="width:14px; height:14px;"></i> YT Music</span>
        </div>
      `;

      card.addEventListener('mouseenter', () => {
        playUiTone('hover');
      });

      card.addEventListener('click', () => {
        playUiTone('switch');
        const index = trackCatalog.findIndex(t => t.id === track.id);
        selectTrack(index, true);
      });

      trackGrid.appendChild(card);
    });

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => playUiTone('hover'));
    btn.addEventListener('click', () => {
      playUiTone('click');
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCatalog(btn.dataset.genre);
    });
  });

  // Track Selection and Playback Simulation
  function selectTrack(index, autoPlay = true) {
    currentTrackIndex = index;
    const track = trackCatalog[currentTrackIndex];
    currentTitleEl.textContent = track.title;
    currentArtistEl.textContent = track.artist;
    totalTimeEl.textContent = track.duration;
    dockTitle.textContent = track.title;
    dockArtist.textContent = track.artist;
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
    seekFill.style.width = `${pct}%`;
    currentTimeEl.textContent = formatTime(currentTimeSec);
  }

  // Initialize Web Audio Subsystem
  function initAudioNodes() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();

      // Master output with soft limiter / compressor
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.7, audioCtx.currentTime);

      const compressor = audioCtx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-18, audioCtx.currentTime);
      compressor.knee.setValueAtTime(12, audioCtx.currentTime);
      compressor.ratio.setValueAtTime(4, audioCtx.currentTime);
      compressor.attack.setValueAtTime(0.01, audioCtx.currentTime);
      compressor.release.setValueAtTime(0.25, audioCtx.currentTime);

      masterGain.connect(compressor);
      compressor.connect(audioCtx.destination);
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Play Subtle Crystalline UI Audio Feedback
  function playUiTone(type = 'click') {
    if (!audioCtx) initAudioNodes();
    if (!audioCtx) return;

    const t = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    if (type === 'click') {
      // Crisp glass droplet tap
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, t);
      osc.frequency.exponentialRampToValueAtTime(1760, t + 0.04);
      osc.frequency.exponentialRampToValueAtTime(440, t + 0.08);

      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(t);
      osc.stop(t + 0.08);
    } else if (type === 'hover') {
      // Extremely gentle soft glass resonance
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200 + Math.random() * 200, t);
      gain.gain.setValueAtTime(0.012, t);
      gain.gain.exponentialRampToValueAtTime(0.0005, t + 0.05);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(t);
      osc.stop(t + 0.05);
    } else if (type === 'switch') {
      // Prismatic frequency shift sweep
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(960, t + 0.14);

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(t);
      osc.stop(t + 0.15);
    }
  }

  // Stop currently playing soundscape
  function stopCurrentSoundscape() {
    if (trackArpTimer) {
      clearInterval(trackArpTimer);
      trackArpTimer = null;
    }
    trackOscs.forEach(node => {
      try {
        if (node.gain) {
          node.gain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.4);
        }
        setTimeout(() => {
          try {
            if (node.osc) {
              node.osc.stop();
              node.osc.disconnect();
            }
          } catch (e) {}
        }, 500);
      } catch (e) {}
    });
    trackOscs = [];
  }

  // Start rich procedural Soundscape for selected track
  function startCurrentSoundscape() {
    initAudioNodes();
    stopCurrentSoundscape();

    const profile = trackAudioProfiles[currentTrackIndex] || trackAudioProfiles[0];
    const t = audioCtx.currentTime;

    // 1. Dual Warm Harmonic Drone with Lowpass Filter
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(profile.cutoff, t);
    filter.Q.setValueAtTime(profile.filterQ, t);

    const droneGain = audioCtx.createGain();
    droneGain.gain.setValueAtTime(0.001, t);
    droneGain.gain.exponentialRampToValueAtTime(0.12, t + 1.5);

    filter.connect(droneGain);
    droneGain.connect(masterGain);

    // Fundamental Voice
    const osc1 = audioCtx.createOscillator();
    osc1.type = profile.droneWave;
    osc1.frequency.setValueAtTime(profile.rootFreq, t);

    // Perfect 5th Harmonics Voice (subtle detune for acoustic shimmer)
    const osc2 = audioCtx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(profile.rootFreq * 1.502, t);

    // Sub Octave / Undertone for deep warmth
    const oscSub = audioCtx.createOscillator();
    oscSub.type = 'sine';
    oscSub.frequency.setValueAtTime(profile.rootFreq * 0.5, t);

    // Slow organic LFO modulating cutoff for fluid wave sensation
    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(profile.lfoSpeed, t);
    lfoGain.gain.setValueAtTime(profile.cutoff * 0.35, t);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start(t);

    osc1.connect(filter);
    osc2.connect(filter);
    oscSub.connect(filter);

    osc1.start(t);
    osc2.start(t);
    oscSub.start(t);

    trackOscs.push(
      { osc: osc1, gain: droneGain },
      { osc: osc2, gain: droneGain },
      { osc: oscSub, gain: droneGain },
      { osc: lfo, gain: lfoGain }
    );

    // 2. Procedural Prismatic Bell Arpeggiator (tuned to track harmonic scale)
    trackChordIndex = 0;
    const playBellTone = () => {
      if (!isPlaying || !audioCtx) return;
      const noteFreq = profile.scale[trackChordIndex % profile.scale.length];
      trackChordIndex++;

      const bellOsc = audioCtx.createOscillator();
      const bellGain = audioCtx.createGain();
      const now = audioCtx.currentTime;

      bellOsc.type = profile.bellWave;
      // Octave harmonic transposition for bell chime
      const bellPitch = noteFreq > 400 ? noteFreq : noteFreq * 2;
      bellOsc.frequency.setValueAtTime(bellPitch, now);

      bellGain.gain.setValueAtTime(0.045, now);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      bellOsc.connect(bellGain);
      bellGain.connect(masterGain);

      bellOsc.start(now);
      bellOsc.stop(now + 1.8);
    };

    // Initial note chime
    setTimeout(playBellTone, 300);
    trackArpTimer = setInterval(playBellTone, profile.arpInterval);
  }

  function startPlayback() {
    isPlaying = true;
    artDisc.classList.add('spinning');
    updatePlayIcons(true);
    floatingDock.classList.add('visible');

    startCurrentSoundscape();

    clearInterval(playProgressInterval);
    playProgressInterval = setInterval(() => {
      currentTimeSec++;
      const track = trackCatalog[currentTrackIndex];
      if (currentTimeSec >= track.durationSec) {
        // Next track auto loop
        selectTrack((currentTrackIndex + 1) % trackCatalog.length, true);
      } else {
        updateProgressUI();
      }
    }, 1000);
  }

  function pausePlayback() {
    isPlaying = false;
    artDisc.classList.remove('spinning');
    updatePlayIcons(false);
    clearInterval(playProgressInterval);
    stopCurrentSoundscape();
  }

  function togglePlayback() {
    playUiTone('click');
    if (isPlaying) {
      pausePlayback();
    } else {
      startPlayback();
    }
  }

  function updatePlayIcons(playing) {
    const iconName = playing ? 'pause' : 'play';
    playBtn.innerHTML = `<i data-lucide="${iconName}"></i>`;
    dockPlayBtn.innerHTML = `<i data-lucide="${iconName}"></i>`;
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  playBtn.addEventListener('click', togglePlayback);
  dockPlayBtn.addEventListener('click', togglePlayback);
  heroPlayTrigger.addEventListener('click', () => {
    playUiTone('click');
    if (!isPlaying) startPlayback();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.getElementById('btn-next').addEventListener('click', () => {
    playUiTone('switch');
    selectTrack((currentTrackIndex + 1) % trackCatalog.length, isPlaying);
  });
  document.getElementById('dock-btn-next').addEventListener('click', () => {
    playUiTone('switch');
    selectTrack((currentTrackIndex + 1) % trackCatalog.length, isPlaying);
  });

  document.getElementById('btn-prev').addEventListener('click', () => {
    playUiTone('switch');
    selectTrack((currentTrackIndex - 1 + trackCatalog.length) % trackCatalog.length, isPlaying);
  });
  document.getElementById('dock-btn-prev').addEventListener('click', () => {
    playUiTone('switch');
    selectTrack((currentTrackIndex - 1 + trackCatalog.length) % trackCatalog.length, isPlaying);
  });

  // Seek bar interaction
  seekTrack.addEventListener('click', (e) => {
    playUiTone('click');
    const rect = seekTrack.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    const track = trackCatalog[currentTrackIndex];
    currentTimeSec = Math.floor(pct * track.durationSec);
    updateProgressUI();
  });

  // Liquid Waveform Canvas Animation
  const waveCanvas = document.getElementById('waveform-canvas');
  const waveCtx = waveCanvas.getContext('2d');
  let waveAnimationId;
  let waveStep = 0;

  function resizeWaveCanvas() {
    waveCanvas.width = waveCanvas.parentElement.clientWidth * window.devicePixelRatio;
    waveCanvas.height = waveCanvas.parentElement.clientHeight * window.devicePixelRatio;
  }
  window.addEventListener('resize', resizeWaveCanvas);
  resizeWaveCanvas();

  function drawWaveform() {
    waveCtx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);
    const width = waveCanvas.width;
    const height = waveCanvas.height;
    const centerY = height / 2;

    const numBars = 48;
    const barWidth = width / numBars - 2;

    for (let i = 0; i < numBars; i++) {
      let barHeight;
      if (isPlaying) {
        // Fluid harmonic wave movement
        const wave1 = Math.sin(waveStep * 0.05 + i * 0.25);
        const wave2 = Math.cos(waveStep * 0.03 + i * 0.15);
        barHeight = (Math.abs(wave1 + wave2) * 0.35 + 0.12) * height;
      } else {
        barHeight = (Math.sin(i * 0.3) * 0.08 + 0.1) * height;
      }

      const x = i * (barWidth + 2);
      const y = centerY - barHeight / 2;

      const grad = waveCtx.createLinearGradient(0, y, 0, y + barHeight);
      grad.addColorStop(0, '#38bdf8');
      grad.addColorStop(0.5, '#a855f7');
      grad.addColorStop(1, '#ec4899');

      waveCtx.fillStyle = grad;
      waveCtx.beginPath();
      waveCtx.roundRect(x, y, barWidth, barHeight, 4);
      waveCtx.fill();
    }

    waveStep++;
    waveAnimationId = requestAnimationFrame(drawWaveform);
  }
  drawWaveform();

  // Background Liquid Fluid Canvas Simulation
  const fluidCanvas = document.getElementById('liquid-canvas');
  const fluidCtx = fluidCanvas.getContext('2d');
  let fluidWidth, fluidHeight;

  function resizeFluid() {
    fluidWidth = fluidCanvas.width = window.innerWidth;
    fluidHeight = fluidCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeFluid);
  resizeFluid();

  const fluidBlobs = [
    { x: 200, y: 300, vx: 0.8, vy: 0.6, radius: 180, color: 'rgba(56, 189, 248, 0.15)' },
    { x: 800, y: 400, vx: -0.6, vy: 0.9, radius: 240, color: 'rgba(168, 85, 247, 0.12)' },
    { x: 500, y: 700, vx: 0.7, vy: -0.7, radius: 210, color: 'rgba(236, 72, 153, 0.14)' }
  ];

  function animateFluid() {
    fluidCtx.clearRect(0, 0, fluidWidth, fluidHeight);

    fluidBlobs.forEach(b => {
      b.x += b.vx;
      b.y += b.vy;

      if (b.x < 0 || b.x > fluidWidth) b.vx *= -1;
      if (b.y < 0 || b.y > fluidHeight) b.vy *= -1;

      const grad = fluidCtx.createRadialGradient(b.x, b.y, 10, b.x, b.y, b.radius);
      grad.addColorStop(0, b.color);
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      fluidCtx.fillStyle = grad;
      fluidCtx.beginPath();
      fluidCtx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      fluidCtx.fill();
    });

    requestAnimationFrame(animateFluid);
  }
  animateFluid();

  // Web Audio Synth & Pad Refraction
  function initAudioNodes() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();

      // Ambient warm drone
      ambientGain = audioCtx.createGain();
      ambientGain.gain.setValueAtTime(0, audioCtx.currentTime);
      ambientGain.connect(audioCtx.destination);

      ambientOsc1 = audioCtx.createOscillator();
      ambientOsc1.type = 'sine';
      ambientOsc1.frequency.setValueAtTime(136.1, audioCtx.currentTime); // Om frequency
      ambientOsc1.connect(ambientGain);
      ambientOsc1.start();

      ambientOsc2 = audioCtx.createOscillator();
      ambientOsc2.type = 'triangle';
      ambientOsc2.frequency.setValueAtTime(272.2, audioCtx.currentTime);
      ambientOsc2.connect(ambientGain);
      ambientOsc2.start();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  const synthPad = document.getElementById('synth-pad');
  const rippleBox = document.getElementById('ripple-box');
  const coordsText = document.getElementById('coords-text');
  const toggleSynthBtn = document.getElementById('toggle-synth-btn');

  let padOsc = null;
  let padGain = null;

  let padFilter = null;
  let padHarmonicOsc = null;

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
      if (padGain) {
        padGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.1);
      }
    }
  });

  synthPad.addEventListener('mousemove', (e) => {
    const rect = synthPad.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = Math.max(0, Math.min(1, x / rect.width));
    const normY = Math.max(0, Math.min(1, y / rect.height));

    const freq = Math.round(180 + normX * 600);
    const harmonic = Math.round(50 + (1 - normY) * 250);
    coordsText.textContent = `Carrier: ${freq}Hz | Refract: ${harmonic}Hz`;

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
        padGain.connect(masterGain || audioCtx.destination);

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

    // Spawn liquid ripple
    const ripple = document.createElement('div');
    ripple.className = 'synth-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = '120px';
    ripple.style.height = '120px';
    rippleBox.appendChild(ripple);

    setTimeout(() => ripple.remove(), 1200);

    // Play subtle chime on click
    if (audioCtx) {
      const chime = audioCtx.createOscillator();
      const chimeGain = audioCtx.createGain();
      chime.type = 'triangle';
      chime.frequency.setValueAtTime(528 + Math.random() * 200, audioCtx.currentTime);
      chimeGain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      chime.connect(chimeGain);
      chimeGain.connect(audioCtx.destination);
      chime.start();
      chime.stop(audioCtx.currentTime + 0.8);
    }
  });

  // Prismatic Refraction Theme Toggle
  themeToggle.addEventListener('mouseenter', () => playUiTone('hover'));
  themeToggle.addEventListener('click', () => {
    playUiTone('switch');
    document.body.classList.toggle('prism-refract-mode');
  });

  // Mouse Parallax glare on Liquid Cards
  const cards = document.querySelectorAll('.liquid-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPct = (x / rect.width) * 100;
      const yPct = (y / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${xPct}%`);
      card.style.setProperty('--mouse-y', `${yPct}%`);
    });
  });

  // Smooth Navigation Scroll
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
