// Molten Prism - Liquid Glass UI Interactive Engine & Audio Synthesizer

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Set Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

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
  let sfxEnabled = true;

  // Web Audio Context for Procedural Liquid Synthesizer & Soundscapes
  let audioCtx = null;
  let masterGain = null;
  let sfxGain = null;
  let synthActive = false;

  // Track Synth State (Procedural Generative Soundscape per track)
  let trackOscs = [];
  let trackFilterNode = null;
  let trackArpTimer = null;
  let trackChordIndex = 0;

  // Soundscape Musical Profiles for each track (Solfeggio tuned frequencies)
  const trackAudioProfiles = [
    {
      // 1: Vitreous Horizon - 432Hz Calm Harmonic Pad & Chimes
      rootFreq: 216,
      scale: [216, 270, 324, 378, 432, 540],
      droneWave: 'sine',
      cutoff: 750,
      filterQ: 2,
      lfoSpeed: 0.12,
      arpInterval: 1800,
      bellWave: 'sine',
      reverbLevel: 0.35
    },
    {
      // 2: Chromasphere Drift - 528Hz Transformation Synth Wave
      rootFreq: 132,
      scale: [132, 165, 198, 247.5, 264, 330, 396, 528],
      droneWave: 'triangle',
      cutoff: 1100,
      filterQ: 4,
      lfoSpeed: 0.22,
      arpInterval: 1300,
      bellWave: 'triangle',
      reverbLevel: 0.45
    },
    {
      // 3: Molten Silica Tide - 639Hz Warm Analog Hydro Swell
      rootFreq: 106.5,
      scale: [106.5, 159.75, 213, 266.25, 319.5, 426, 639],
      droneWave: 'sawtooth',
      cutoff: 520,
      filterQ: 1.8,
      lfoSpeed: 0.08,
      arpInterval: 2400,
      bellWave: 'sine',
      reverbLevel: 0.5
    },
    {
      // 4: Lucent Prism Echo - 741Hz Crystal Bells & Refraction
      rootFreq: 247,
      scale: [247, 293.66, 370, 440, 494, 587.33, 741],
      droneWave: 'sine',
      cutoff: 1400,
      filterQ: 3.5,
      lfoSpeed: 0.28,
      arpInterval: 950,
      bellWave: 'triangle',
      reverbLevel: 0.6
    },
    {
      // 5: Glass Cascade Neon - 852Hz Pulsing Cyber Euphoria
      rootFreq: 142,
      scale: [142, 177.5, 213, 284, 355, 426, 568, 852],
      droneWave: 'sawtooth',
      cutoff: 950,
      filterQ: 4.5,
      lfoSpeed: 0.4,
      arpInterval: 750,
      bellWave: 'triangle',
      reverbLevel: 0.4
    },
    {
      // 6: Deep Obsidian Flow - 963Hz Subterranean Binaural Hum
      rootFreq: 60.18,
      scale: [60.18, 90.27, 120.36, 180.54, 240.72, 481.5, 963],
      droneWave: 'sine',
      cutoff: 380,
      filterQ: 1.2,
      lfoSpeed: 0.05,
      arpInterval: 3000,
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
  const trackGrid = document.getElementById('track-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const themeToggle = document.getElementById('theme-toggle');
  const sfxToggleBtn = document.getElementById('sfx-toggle');
  const paramViscosity = document.getElementById('param-viscosity');
  const paramRefraction = document.getElementById('param-refraction');

  // Initialize Web Audio Subsystem (Single Central Node)
  function initAudioNodes() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();

      // Master output bus with limiter compressor
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.75, audioCtx.currentTime);

      sfxGain = audioCtx.createGain();
      sfxGain.gain.setValueAtTime(sfxEnabled ? 0.7 : 0, audioCtx.currentTime);
      sfxGain.connect(masterGain);

      const compressor = audioCtx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-16, audioCtx.currentTime);
      compressor.knee.setValueAtTime(10, audioCtx.currentTime);
      compressor.ratio.setValueAtTime(4, audioCtx.currentTime);
      compressor.attack.setValueAtTime(0.005, audioCtx.currentTime);
      compressor.release.setValueAtTime(0.2, audioCtx.currentTime);

      masterGain.connect(compressor);
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

  // Play High-Fidelity Crystalline Audio Tone
  function playUiTone(type = 'click') {
    if (!sfxEnabled) return;
    initAudioNodes();
    if (!audioCtx || !sfxGain) return;

    const t = audioCtx.currentTime;

    if (type === 'hover') {
      // Harmonic crystal glass bell chime
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
      // Crisp liquid droplet tap
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
      // Prismatic upward light refraction sweep
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
      // Shimmering launch chord triad
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
      // Soft slider tick
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

  // SFX Toggle button logic
  if (sfxToggleBtn) {
    sfxToggleBtn.addEventListener('click', () => {
      initAudioNodes();
      sfxEnabled = !sfxEnabled;
      if (sfxGain && audioCtx) {
        sfxGain.gain.setValueAtTime(sfxEnabled ? 0.7 : 0, audioCtx.currentTime);
      }
      playUiTone('click');
      const textEl = document.getElementById('sfx-text');
      if (textEl) textEl.textContent = sfxEnabled ? 'Audio Tones: ON' : 'Audio Tones: OFF';
      sfxToggleBtn.classList.toggle('sfx-muted', !sfxEnabled);
    });
  }

  // Render Track Catalog Cards
  function renderCatalog(filter = 'all') {
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
          <div class="card-meta-tag">${track.frequency}</div>
          <div class="card-play-hover">
            <i data-lucide="play" class="fill-current"></i>
          </div>
          <div class="card-soundwave-indicator">
            <span></span><span></span><span></span><span></span>
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

      card.addEventListener('mouseenter', () => playUiTone('hover'));
      card.addEventListener('click', () => {
        playUiTone('click');
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

  // Track Selection and Playback
  function selectTrack(index, autoPlay = true) {
    currentTrackIndex = index;
    const track = trackCatalog[currentTrackIndex];
    if (currentTitleEl) currentTitleEl.textContent = track.title;
    if (currentArtistEl) currentArtistEl.textContent = track.artist;
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

  // Stop currently playing soundscape
  function stopCurrentSoundscape() {
    if (trackArpTimer) {
      clearInterval(trackArpTimer);
      trackArpTimer = null;
    }
    trackOscs.forEach(node => {
      try {
        if (node.gain && audioCtx) {
          node.gain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.3);
        }
        setTimeout(() => {
          try {
            if (node.osc) {
              node.osc.stop();
              node.osc.disconnect();
            }
          } catch (e) {}
        }, 400);
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

    // Resonant Filter
    trackFilterNode = audioCtx.createBiquadFilter();
    trackFilterNode.type = 'lowpass';
    const viscMod = paramViscosity ? (paramViscosity.value / 100) : 0.65;
    trackFilterNode.frequency.setValueAtTime(profile.cutoff * (0.6 + viscMod * 0.8), t);
    trackFilterNode.Q.setValueAtTime(profile.filterQ, t);

    const droneGain = audioCtx.createGain();
    droneGain.gain.setValueAtTime(0.001, t);
    droneGain.gain.exponentialRampToValueAtTime(0.14, t + 1.2);

    trackFilterNode.connect(droneGain);
    droneGain.connect(masterGain);

    // Fundamental Voice
    const osc1 = audioCtx.createOscillator();
    osc1.type = profile.droneWave;
    osc1.frequency.setValueAtTime(profile.rootFreq, t);

    // 5th Harmonic Shimmer
    const osc2 = audioCtx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(profile.rootFreq * 1.503, t);

    // Deep Sub
    const oscSub = audioCtx.createOscillator();
    oscSub.type = 'sine';
    oscSub.frequency.setValueAtTime(profile.rootFreq * 0.5, t);

    // Organic LFO
    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(profile.lfoSpeed, t);
    lfoGain.gain.setValueAtTime(profile.cutoff * 0.3, t);
    lfo.connect(lfoGain);
    lfoGain.connect(trackFilterNode.frequency);
    lfo.start(t);

    osc1.connect(trackFilterNode);
    osc2.connect(trackFilterNode);
    oscSub.connect(trackFilterNode);

    osc1.start(t);
    osc2.start(t);
    oscSub.start(t);

    trackOscs.push(
      { osc: osc1, gain: droneGain },
      { osc: osc2, gain: droneGain },
      { osc: oscSub, gain: droneGain },
      { osc: lfo, gain: lfoGain }
    );

    // Procedural Prismatic Chimes
    trackChordIndex = 0;
    const playBellTone = () => {
      if (!isPlaying || !audioCtx) return;
      const noteFreq = profile.scale[trackChordIndex % profile.scale.length];
      trackChordIndex++;

      const bellOsc = audioCtx.createOscillator();
      const bellGain = audioCtx.createGain();
      const now = audioCtx.currentTime;

      bellOsc.type = profile.bellWave;
      const bellPitch = noteFreq > 380 ? noteFreq : noteFreq * 2;
      bellOsc.frequency.setValueAtTime(bellPitch, now);

      bellGain.gain.setValueAtTime(0.04, now);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

      bellOsc.connect(bellGain);
      bellGain.connect(masterGain);

      bellOsc.start(now);
      bellOsc.stop(now + 1.6);
    };

    setTimeout(playBellTone, 200);
    const refractMod = paramRefraction ? (1.3 - (paramRefraction.value / 100) * 0.6) : 1;
    trackArpTimer = setInterval(playBellTone, profile.arpInterval * refractMod);
  }

  // Real-time slider soundscape modulation
  if (paramViscosity) {
    paramViscosity.addEventListener('input', () => {
      playUiTone('tick');
      if (trackFilterNode && audioCtx) {
        const profile = trackAudioProfiles[currentTrackIndex] || trackAudioProfiles[0];
        const val = paramViscosity.value / 100;
        trackFilterNode.frequency.setTargetAtTime(profile.cutoff * (0.4 + val * 1.2), audioCtx.currentTime, 0.05);
        trackFilterNode.Q.setTargetAtTime(1 + val * 6, audioCtx.currentTime, 0.05);
      }
    });
  }

  if (paramRefraction) {
    paramRefraction.addEventListener('input', () => {
      playUiTone('tick');
    });
  }

  function startPlayback() {
    isPlaying = true;
    if (artDisc) artDisc.classList.add('spinning');
    updatePlayIcons(true);
    if (floatingDock) floatingDock.classList.add('visible');

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
    clearInterval(playProgressInterval);
    stopCurrentSoundscape();
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

  // Seek bar interaction
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

  // Dynamic Multi-Color Spectrum Waveform Canvas Animation
  const waveCanvas = document.getElementById('waveform-canvas');
  if (waveCanvas) {
    const waveCtx = waveCanvas.getContext('2d');
    let waveStep = 0;

    function resizeWaveCanvas() {
      waveCanvas.width = waveCanvas.parentElement.clientWidth * (window.devicePixelRatio || 1);
      waveCanvas.height = waveCanvas.parentElement.clientHeight * (window.devicePixelRatio || 1);
    }
    window.addEventListener('resize', resizeWaveCanvas);
    resizeWaveCanvas();

    function drawWaveform() {
      waveCtx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);
      const width = waveCanvas.width;
      const height = waveCanvas.height;
      const centerY = height / 2;

      const numBars = 52;
      const gap = 3;
      const barWidth = Math.max(2, (width - (numBars * gap)) / numBars);

      for (let i = 0; i < numBars; i++) {
        let barHeight;
        if (isPlaying) {
          const wave1 = Math.sin(waveStep * 0.08 + i * 0.28);
          const wave2 = Math.cos(waveStep * 0.05 + i * 0.18);
          const wave3 = Math.sin(waveStep * 0.12 + i * 0.45);
          barHeight = (Math.abs(wave1 * 0.5 + wave2 * 0.35 + wave3 * 0.15) * 0.72 + 0.12) * height;
        } else {
          barHeight = (Math.sin(waveStep * 0.03 + i * 0.2) * 0.12 + 0.18) * height;
        }

        const x = i * (barWidth + gap);
        const y = centerY - barHeight / 2;

        const grad = waveCtx.createLinearGradient(0, y, 0, y + barHeight);
        const colorOffset = (i / numBars + (waveStep * 0.005)) % 1;
        if (colorOffset < 0.33) {
          grad.addColorStop(0, '#38bdf8');
          grad.addColorStop(1, '#6366f1');
        } else if (colorOffset < 0.66) {
          grad.addColorStop(0, '#a855f7');
          grad.addColorStop(1, '#ec4899');
        } else {
          grad.addColorStop(0, '#f43f5e');
          grad.addColorStop(1, '#38bdf8');
        }

        waveCtx.fillStyle = grad;
        waveCtx.shadowColor = 'rgba(56, 189, 248, 0.4)';
        waveCtx.shadowBlur = isPlaying ? 8 : 2;
        waveCtx.beginPath();
        if (waveCtx.roundRect) {
          waveCtx.roundRect(x, y, barWidth, barHeight, 3);
        } else {
          waveCtx.rect(x, y, barWidth, barHeight);
        }
        waveCtx.fill();
      }

      waveStep++;
      requestAnimationFrame(drawWaveform);
    }
    drawWaveform();
  }

  // Background Liquid Fluid Canvas Simulation with Caustic Ripples
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

    // Interactive pointer fluid particles
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

      // Blobs
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

      // Pointer Liquid Sparkles
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

  // Prismatic Refraction Theme Toggle
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

      // 3D Tilt angles (-6deg to +6deg)
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
