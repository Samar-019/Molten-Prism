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

      card.addEventListener('click', () => {
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
    btn.addEventListener('click', () => {
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

  function startPlayback() {
    isPlaying = true;
    artDisc.classList.add('spinning');
    updatePlayIcons(true);
    floatingDock.classList.add('visible');
    initAudioNodes();

    if (ambientGain) {
      ambientGain.gain.setTargetAtTime(0.08, audioCtx.currentTime, 0.5);
    }

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

    if (ambientGain && audioCtx) {
      ambientGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.4);
    }
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
    playBtn.innerHTML = `<i data-lucide="${iconName}"></i>`;
    dockPlayBtn.innerHTML = `<i data-lucide="${iconName}"></i>`;
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  playBtn.addEventListener('click', togglePlayback);
  dockPlayBtn.addEventListener('click', togglePlayback);
  heroPlayTrigger.addEventListener('click', () => {
    if (!isPlaying) startPlayback();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.getElementById('btn-next').addEventListener('click', () => {
    selectTrack((currentTrackIndex + 1) % trackCatalog.length, isPlaying);
  });
  document.getElementById('dock-btn-next').addEventListener('click', () => {
    selectTrack((currentTrackIndex + 1) % trackCatalog.length, isPlaying);
  });

  document.getElementById('btn-prev').addEventListener('click', () => {
    selectTrack((currentTrackIndex - 1 + trackCatalog.length) % trackCatalog.length, isPlaying);
  });
  document.getElementById('dock-btn-prev').addEventListener('click', () => {
    selectTrack((currentTrackIndex - 1 + trackCatalog.length) % trackCatalog.length, isPlaying);
  });

  // Seek bar interaction
  seekTrack.addEventListener('click', (e) => {
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

  toggleSynthBtn.addEventListener('click', () => {
    initAudioNodes();
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
        padGain = audioCtx.createGain();
        padOsc.type = 'sine';
        padOsc.connect(padGain);
        padGain.connect(audioCtx.destination);
        padOsc.start();
      }
      padOsc.frequency.setTargetAtTime(freq, audioCtx.currentTime, 0.05);
      padGain.gain.setTargetAtTime(0.08, audioCtx.currentTime, 0.05);
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
  themeToggle.addEventListener('click', () => {
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
    btn.addEventListener('click', () => {
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
