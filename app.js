// Molten Prism - Next-Gen Liquid Glass UI Engine v11.0

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
  let soundFxEnabled = true;

  // Web Audio Context for Procedural Liquid Synthesizer & Visualizer
  let audioCtx = null;
  let ambientOsc1 = null;
  let ambientOsc2 = null;
  let ambientGain = null;
  let synthActive = false;

  // DOM Elements
  const playBtn = document.getElementById('btn-play');
  const playIcon = document.getElementById('play-icon');
  const heroPlayTrigger = document.getElementById('hero-play-trigger');
  const artDisc = document.getElementById('art-disc');
  const currentTitleEl = document.getElementById('current-title');
  const currentArtistEl = document.getElementById('current-artist');
  const currentGenreBadge = document.getElementById('current-genre-badge');
  const seekFill = document.getElementById('seek-fill');
  const currentTimeEl = document.getElementById('current-time');
  const totalTimeEl = document.getElementById('total-time');
  const seekTrack = document.getElementById('seek-track');
  const floatingDock = document.getElementById('floating-dock');
  const dockTitle = document.getElementById('dock-title');
  const dockArtist = document.getElementById('dock-artist');
  const dockPlayBtn = document.getElementById('dock-btn-play');
  const dockPlayIcon = document.getElementById('dock-play-icon');
  const dockSeekTrack = document.getElementById('dock-seek-track');
  const dockSeekFill = document.getElementById('dock-seek-fill');
  const dockCurrentTimeEl = document.getElementById('dock-current-time');
  const dockTotalTimeEl = document.getElementById('dock-total-time');
  const trackGrid = document.getElementById('track-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const themeToggle = document.getElementById('theme-toggle');
  const sfxToggle = document.getElementById('sfx-toggle');
  const sfxText = document.getElementById('sfx-text');
  const cursorGlow = document.getElementById('cursor-glow');
  const vizFreqReadout = document.getElementById('viz-freq-readout');

  // Interactive Cursor Follower
  window.addEventListener('pointermove', (e) => {
    if (cursorGlow) {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    }
  });

  // 3D Tilt Parallax on Player Card
  const playerCard = document.getElementById('player-deck-card');
  if (playerCard) {
    playerCard.addEventListener('mousemove', (e) => {
      const rect = playerCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;
      playerCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    playerCard.addEventListener('mouseleave', () => {
      playerCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  }

  // SFX Toggle
  if (sfxToggle) {
    sfxToggle.addEventListener('click', () => {
      soundFxEnabled = !soundFxEnabled;
      sfxText.textContent = soundFxEnabled ? 'FX: ON' : 'FX: OFF';
      playChime(soundFxEnabled ? 741 : 330);
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
          <span class="yt-badge"><i data-lucide="sparkles" style="width:14px; height:14px;"></i> ${track.frequency}</span>
        </div>
      `;

      card.addEventListener('click', () => {
        playChime(639);
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
  if (filterBtns) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        playChime(528);
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCatalog(btn.dataset.genre);
      });
    });
  }

  // Track Selection and Playback Simulation
  function selectTrack(index, autoPlay = true) {
    currentTrackIndex = index;
    const track = trackCatalog[currentTrackIndex];
    if (currentTitleEl) currentTitleEl.textContent = track.title;
    if (currentArtistEl) currentArtistEl.textContent = track.artist;
    if (currentGenreBadge) currentGenreBadge.textContent = track.genre.toUpperCase();
    if (totalTimeEl) totalTimeEl.textContent = track.duration;
    if (dockTitle) dockTitle.textContent = track.title;
    if (dockArtist) dockArtist.textContent = track.artist;
    if (dockTotalTimeEl) dockTotalTimeEl.textContent = track.duration;
    if (vizFreqReadout) vizFreqReadout.textContent = `${track.frequency} HARMONIC`;
    
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
    if (dockSeekFill) dockSeekFill.style.width = `${pct}%`;
    if (currentTimeEl) currentTimeEl.textContent = formatTime(currentTimeSec);
    if (dockCurrentTimeEl) dockCurrentTimeEl.textContent = formatTime(currentTimeSec);
  }

  function startPlayback() {
    isPlaying = true;
    if (artDisc) artDisc.classList.add('spinning');
    updatePlayIcons(true);
    initAudioNodes();

    if (ambientGain && audioCtx) {
      ambientGain.gain.setTargetAtTime(0.08, audioCtx.currentTime, 0.5);
    }

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

    if (ambientGain && audioCtx) {
      ambientGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.4);
    }
  }

  function togglePlayback() {
    playChime(isPlaying ? 396 : 528);
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
      playChime(528);
      if (!isPlaying) startPlayback();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const nextBtn = document.getElementById('btn-next');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      playChime(639);
      selectTrack((currentTrackIndex + 1) % trackCatalog.length, isPlaying);
    });
  }
  const dockNextBtn = document.getElementById('dock-btn-next');
  if (dockNextBtn) {
    dockNextBtn.addEventListener('click', () => {
      playChime(639);
      selectTrack((currentTrackIndex + 1) % trackCatalog.length, isPlaying);
    });
  }

  const prevBtn = document.getElementById('btn-prev');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      playChime(432);
      selectTrack((currentTrackIndex - 1 + trackCatalog.length) % trackCatalog.length, isPlaying);
    });
  }
  const dockPrevBtn = document.getElementById('dock-btn-prev');
  if (dockPrevBtn) {
    dockPrevBtn.addEventListener('click', () => {
      playChime(432);
      selectTrack((currentTrackIndex - 1 + trackCatalog.length) % trackCatalog.length, isPlaying);
    });
  }

  // Shuffle button
  const shuffleBtn = document.getElementById('btn-shuffle');
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', () => {
      playChime(852);
      const rand = Math.floor(Math.random() * trackCatalog.length);
      selectTrack(rand, isPlaying);
    });
  }
  const dockShuffleBtn = document.getElementById('dock-btn-shuffle');
  if (dockShuffleBtn) {
    dockShuffleBtn.addEventListener('click', () => {
      playChime(852);
      const rand = Math.floor(Math.random() * trackCatalog.length);
      selectTrack(rand, isPlaying);
    });
  }

  // Seek bar interaction
  if (seekTrack) {
    seekTrack.addEventListener('click', (e) => {
      const rect = seekTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, clickX / rect.width));
      const track = trackCatalog[currentTrackIndex];
      currentTimeSec = Math.floor(pct * track.durationSec);
      updateProgressUI();
    });
  }

  if (dockSeekTrack) {
    dockSeekTrack.addEventListener('click', (e) => {
      const rect = dockSeekTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, clickX / rect.width));
      const track = trackCatalog[currentTrackIndex];
      currentTimeSec = Math.floor(pct * track.durationSec);
      updateProgressUI();
    });
  }

  // Waveform Canvas Animation
  const waveCanvas = document.getElementById('waveform-canvas');
  if (waveCanvas) {
    const waveCtx = waveCanvas.getContext('2d');
    let waveStep = 0;

    function resizeWaveCanvas() {
      const rect = waveCanvas.parentElement.getBoundingClientRect();
      waveCanvas.width = rect.width * (window.devicePixelRatio || 1);
      waveCanvas.height = rect.height * (window.devicePixelRatio || 1);
    }
    window.addEventListener('resize', resizeWaveCanvas);
    resizeWaveCanvas();

    function drawWaveform() {
      waveCtx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);
      const width = waveCanvas.width;
      const height = waveCanvas.height;
      const centerY = height / 2;

      const numBars = 52;
      const barWidth = width / numBars - 2;

      for (let i = 0; i < numBars; i++) {
        let barHeight;
        if (isPlaying) {
          const wave1 = Math.sin(waveStep * 0.05 + i * 0.22);
          const wave2 = Math.cos(waveStep * 0.03 + i * 0.14);
          barHeight = (Math.abs(wave1 + wave2) * 0.38 + 0.14) * height;
        } else {
          barHeight = (Math.sin(waveStep * 0.02 + i * 0.28) * 0.08 + 0.12) * height;
        }

        const x = i * (barWidth + 2);
        const y = centerY - barHeight / 2;

        const grad = waveCtx.createLinearGradient(0, y, 0, y + barHeight);
        grad.addColorStop(0, '#38bdf8');
        grad.addColorStop(0.5, '#a855f7');
        grad.addColorStop(1, '#ec4899');

        waveCtx.fillStyle = grad;
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

  // Circular Aura Particle Canvas
  const circCanvas = document.getElementById('circular-visualizer-canvas');
  if (circCanvas) {
    const cCtx = circCanvas.getContext('2d');
    circCanvas.width = 175;
    circCanvas.height = 175;
    let circStep = 0;

    function drawCircularAura() {
      cCtx.clearRect(0, 0, 175, 175);
      const centerX = 175 / 2;
      const centerY = 175 / 2;
      const radius = 64;

      const numPoints = 32;
      cCtx.beginPath();
      for (let i = 0; i <= numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        let offset = 0;
        if (isPlaying) {
          offset = Math.sin(circStep * 0.06 + i * 0.8) * 6;
        } else {
          offset = Math.sin(circStep * 0.02 + i * 0.4) * 2;
        }
        const r = radius + offset;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;

        if (i === 0) cCtx.moveTo(x, y);
        else cCtx.lineTo(x, y);
      }
      cCtx.closePath();
      cCtx.strokeStyle = 'rgba(56, 189, 248, 0.55)';
      cCtx.lineWidth = 2.5;
      cCtx.stroke();

      circStep++;
      requestAnimationFrame(drawCircularAura);
    }
    drawCircularAura();
  }

  // Background Liquid Fluid Canvas
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

    let fluidBlobs = [
      { x: 250, y: 320, vx: 0.7, vy: 0.5, radius: 240, color: 'rgba(56, 189, 248, 0.24)' },
      { x: 850, y: 450, vx: -0.5, vy: 0.8, radius: 280, color: 'rgba(168, 85, 247, 0.22)' },
      { x: 550, y: 750, vx: 0.6, vy: -0.6, radius: 260, color: 'rgba(236, 72, 153, 0.18)' },
      { x: 1100, y: 250, vx: -0.4, vy: -0.5, radius: 250, color: 'rgba(125, 211, 252, 0.2)' }
    ];

    window.updateFluidColors = function(palette) {
      if (!palette || !palette.length) return;
      fluidBlobs.forEach((b, idx) => {
        b.color = palette[idx % palette.length];
      });
    };

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
  }

  // Web Audio Synth & Pad Refraction
  function initAudioNodes() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();

      ambientGain = audioCtx.createGain();
      ambientGain.gain.setValueAtTime(0, audioCtx.currentTime);
      ambientGain.connect(audioCtx.destination);

      ambientOsc1 = audioCtx.createOscillator();
      ambientOsc1.type = 'sine';
      ambientOsc1.frequency.setValueAtTime(136.1, audioCtx.currentTime);
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

  function playChime(freq = 528) {
    if (!soundFxEnabled) return;
    initAudioNodes();
    if (!audioCtx) return;

    const chime = audioCtx.createOscillator();
    const chimeGain = audioCtx.createGain();
    chime.type = 'sine';
    chime.frequency.setValueAtTime(freq, audioCtx.currentTime);
    chimeGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.45);
    chime.connect(chimeGain);
    chimeGain.connect(audioCtx.destination);
    chime.start();
    chime.stop(audioCtx.currentTime + 0.45);
  }

  const synthPad = document.getElementById('synth-pad');
  const rippleBox = document.getElementById('ripple-box');
  const coordsText = document.getElementById('coords-text');
  const toggleSynthBtn = document.getElementById('toggle-synth-btn');

  let padOsc = null;
  let padGain = null;

  if (toggleSynthBtn) {
    toggleSynthBtn.addEventListener('click', () => {
      initAudioNodes();
      synthActive = !synthActive;
      playChime(synthActive ? 741 : 396);
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
      if (coordsText) coordsText.textContent = `Carrier: ${freq}Hz | Harmonic: ${harmonic}Hz`;

      if (synthActive && audioCtx) {
        if (!padOsc) {
          padOsc = audioCtx.createOscillator();
          padGain = audioCtx.createGain();
          padOsc.type = 'sine';
          padOsc.connect(padGain);
          padGain.connect(audioCtx.destination);
          padOsc.start();
        }
        padOsc.frequency.setTargetAtTime(freq, audioCtx.currentTime, 0.05);
        padGain.gain.setTargetAtTime(0.09, audioCtx.currentTime, 0.05);
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

      const ripple = document.createElement('div');
      ripple.className = 'synth-ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.width = '130px';
      ripple.style.height = '130px';
      if (rippleBox) rippleBox.appendChild(ripple);

      setTimeout(() => ripple.remove(), 1200);
      playChime(528 + Math.random() * 250);
    });
  }

  // Multi-Theme Liquid Switcher Logic
  const themeWrapper = document.querySelector('.theme-switcher-wrapper');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeOrbIndicator = document.getElementById('theme-orb-indicator');
  const themeBtnLabel = document.getElementById('theme-btn-label');
  const themeOptBtns = document.querySelectorAll('.theme-opt-btn');

  const themes = {
    'liquid-glass': {
      label: '✨ Pure Liquid Glass',
      color: 'linear-gradient(135deg, #ffffff, #7dd3fc, #c084fc)',
      palette: ['rgba(255, 255, 255, 0.28)', 'rgba(125, 211, 252, 0.26)', 'rgba(192, 132, 252, 0.22)', 'rgba(224, 242, 254, 0.25)']
    },
    violet: {
      label: 'Aurora Violet',
      color: 'linear-gradient(135deg, #a855f7, #ec4899)',
      palette: ['rgba(168, 85, 247, 0.22)', 'rgba(236, 72, 153, 0.20)', 'rgba(99, 102, 241, 0.22)', 'rgba(192, 132, 252, 0.18)']
    },
    cyan: {
      label: 'Cyber Cyan',
      color: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
      palette: ['rgba(6, 182, 212, 0.24)', 'rgba(59, 130, 246, 0.22)', 'rgba(14, 165, 233, 0.22)', 'rgba(45, 212, 191, 0.20)']
    },
    emerald: {
      label: 'Emerald Silica',
      color: 'linear-gradient(135deg, #10b981, #06b6d4)',
      palette: ['rgba(16, 185, 129, 0.24)', 'rgba(6, 182, 212, 0.22)', 'rgba(52, 211, 153, 0.22)', 'rgba(20, 184, 166, 0.20)']
    },
    amber: {
      label: 'Molten Amber',
      color: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      palette: ['rgba(245, 158, 11, 0.24)', 'rgba(239, 68, 68, 0.22)', 'rgba(251, 146, 60, 0.22)', 'rgba(234, 88, 12, 0.20)']
    },
    rose: {
      label: 'Rose Quartz',
      color: 'linear-gradient(135deg, #fb7185, #f43f5e)',
      palette: ['rgba(251, 113, 133, 0.24)', 'rgba(244, 63, 94, 0.22)', 'rgba(244, 114, 182, 0.22)', 'rgba(225, 29, 72, 0.20)']
    },
    obsidian: {
      label: 'Obsidian Vitre',
      color: 'linear-gradient(135deg, #64748b, #cbd5e1)',
      palette: ['rgba(100, 116, 139, 0.24)', 'rgba(203, 213, 225, 0.18)', 'rgba(71, 85, 105, 0.22)', 'rgba(148, 163, 184, 0.20)']
    }
  };

  function applyTheme(themeKey) {
    if (!themes[themeKey]) return;
    document.body.classList.remove(
      'theme-liquid-glass',
      'theme-violet',
      'theme-cyan',
      'theme-emerald',
      'theme-amber',
      'theme-rose',
      'theme-obsidian'
    );
    document.body.classList.add(`theme-${themeKey}`);
    
    if (themeBtnLabel) themeBtnLabel.textContent = themes[themeKey].label;
    if (themeOrbIndicator) themeOrbIndicator.style.background = themes[themeKey].color;

    themeOptBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === themeKey);
    });

    if (window.updateFluidColors && themes[themeKey].palette) {
      window.updateFluidColors(themes[themeKey].palette);
    }

    localStorage.setItem('molten-prism-theme', themeKey);
  }

  if (themeToggleBtn && themeWrapper) {
    themeToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      playChime(741);
      themeWrapper.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!themeWrapper.contains(e.target)) {
        themeWrapper.classList.remove('open');
      }
    });

    themeOptBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const selected = btn.dataset.theme;
        playChime(852);
        applyTheme(selected);
        themeWrapper.classList.remove('open');
      });
    });

    // Load saved or default theme
    const savedTheme = localStorage.getItem('molten-prism-theme') || 'violet';
    applyTheme(savedTheme);
  }

  // Auto / Light / Dark Color Mode Controller
  const modeBtns = document.querySelectorAll('.mode-seg-btn');
  let currentMode = localStorage.getItem('molten-prism-mode') || 'auto';
  const systemDarkMedia = window.matchMedia('(prefers-color-scheme: dark)');

  function updateColorModeUI(mode) {
    const isDark = mode === 'auto' ? systemDarkMedia.matches : mode === 'dark';
    
    if (isDark) {
      document.body.classList.remove('mode-light');
      document.body.classList.add('mode-dark');
    } else {
      document.body.classList.remove('mode-dark');
      document.body.classList.add('mode-light');
    }

    modeBtns.forEach(b => {
      b.classList.toggle('active', b.dataset.mode === mode);
    });
  }

  function setColorMode(mode, playSound = true) {
    currentMode = mode;
    localStorage.setItem('molten-prism-mode', mode);
    updateColorModeUI(mode);
    if (playSound) {
      playChime(mode === 'light' ? 852 : mode === 'dark' ? 432 : 639);
    }
  }

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setColorMode(btn.dataset.mode, true);
    });
  });

  systemDarkMedia.addEventListener('change', () => {
    if (currentMode === 'auto') {
      updateColorModeUI('auto');
    }
  });

  // Initialize Color Mode
  setColorMode(currentMode, false);

  // Smooth Navigation Scroll
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      playChime(639);
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

  // ==========================================================================
  // PREVIEW IMAGES GALLERY & WOW LIGHTBOX CONTROLLER
  // ==========================================================================
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightbox = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentGalleryIndex = 0;
  const galleryData = [];

  galleryCards.forEach((card, index) => {
    galleryData.push({
      src: card.dataset.full,
      caption: card.dataset.caption,
      desc: card.dataset.desc
    });

    // 3D Parallax Tilt effect on Gallery cards
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });

    card.addEventListener('click', () => {
      playChime(639);
      openLightbox(index);
    });
  });

  function openLightbox(index) {
    if (!lightbox || !galleryData[index]) return;
    currentGalleryIndex = index;
    updateLightboxUI();
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    playChime(432);
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function updateLightboxUI() {
    const item = galleryData[currentGalleryIndex];
    if (!item) return;

    if (lightboxImg) {
      lightboxImg.style.opacity = '0';
      lightboxImg.style.transform = 'scale(0.96)';
      setTimeout(() => {
        lightboxImg.src = item.src;
        lightboxImg.style.opacity = '1';
        lightboxImg.style.transform = 'scale(1)';
      }, 150);
    }
    if (lightboxTitle) lightboxTitle.textContent = item.caption;
    if (lightboxDesc) lightboxDesc.textContent = item.desc;
    if (lightboxCounter) lightboxCounter.textContent = `${currentGalleryIndex + 1} / ${galleryData.length}`;
  }

  function showNextImage() {
    playChime(741);
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryData.length;
    updateLightboxUI();
  }

  function showPrevImage() {
    playChime(741);
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
    updateLightboxUI();
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);

  window.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'ArrowLeft') showPrevImage();
  });
});
