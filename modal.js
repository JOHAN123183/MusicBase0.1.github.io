document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card'); // Seleccionar todas las tarjetas

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const src = card.getAttribute('data-src');
            const title = card.getAttribute('data-title');
            const artist = card.getAttribute('data-artist');
            const img = card.getAttribute('data-img');

            openModal(src, title, artist, img);
        });
    });
});

function openModal(src, title, artist, img) {
    const modalContent = `
    <div class="player-container">
    <div class="player-card">
      <!-- Encabezado con imagen y texto -->
      <div class="player-header">
        <div class="player-thumbnail-container">
          <img src="${img}" alt="Track Thumbnail" class="player-thumbnail">
        </div>
        <div class="player-info">
          <h2 class="player-title">${title}</h2>
          <p class="player-artist">${artist}</p>
        </div>
      </div>
      <!-- Barra de progreso -->
      <audio id="audio-player" src="${src}"></audio>
      <div class="player-progress">
        <div class="progress-bar-container">
          <div id="progress-bar" class="progress-bar" style="width: 0%;"></div>
        </div>
        <div class="time-info">
          <span id="current-time">0:00</span>
          <span id="total-duration">0:00</span>
        </div>
      </div>
      <!-- Controles -->
      <div class="player-controls">
        <button class="control-button" onclick="rewindAudio()">
          <i class="bi bi-skip-backward-fill"></i>
        </button>
        <button id="play-pause-btn" class="control-button main-control">
          <i class="bi bi-play-circle-fill" id="play-icon"></i>
        </button>
        <button class="control-button" onclick="skipAudio()">
          <i class="bi bi-skip-forward-fill"></i>
        </button>
      </div>
    </div>
  </div>
    `;

    const modal = document.getElementById('modal');
    modal.innerHTML = modalContent;
    modal.style.display = 'block';
    document.getElementById('overlay').style.display = 'block';

    setupAudioPlayer();
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

// Configuración del reproductor
function setupAudioPlayer() {
    const audio = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = playPauseBtn.querySelector('.bi-play-circle-fill');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const totalDurationEl = document.getElementById('total-duration');

    audio.addEventListener('loadedmetadata', () => {
        totalDurationEl.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progress}%`;
        currentTimeEl.textContent = formatTime(audio.currentTime);
    });

    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playIcon.classList.replace('bi-play-circle-fill', 'bi-pause-circle-fill');
        } else {
            audio.pause();
            playIcon.classList.replace('bi-pause-circle-fill', 'bi-play-circle-fill');
        }
    });
}

function rewindAudio() {
    const audio = document.getElementById('audio-player');
    audio.currentTime = Math.max(0, audio.currentTime - 10);
}

function skipAudio() {
    const audio = document.getElementById('audio-player');
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
}
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('modal');

    // Cerrar el modal al hacer clic en el overlay (fondo oscuro)
    overlay.addEventListener('click', () => {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    });
});
