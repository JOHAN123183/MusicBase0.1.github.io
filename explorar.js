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
                <div class="player-header">
                    <img src="${img}" alt="Album Cover" class="player-thumbnail"> <!-- Imagen dinámica -->
                    <div class="player-info">
                        <p class="player-episode">${title}</p>
                        <p class="player-show">${artist}</p>
                    </div>
                </div>
                <div class="player-progress">
                    <div class="progress-bar-container">
                        <div id="progress-bar" class="progress-bar"></div>
                    </div>
                    <div class="time-info">
                        <span id="current-time">0:00</span>
                        <span id="total-duration">0:00</span>
                    </div>
                </div>
                <div class="player-controls">
                    <button aria-label="Rewind 10 seconds" class="control-button" onclick="rewindAudio()">
                        <i class="bi bi-skip-backward-fill"></i>
                    </button>
                    <button aria-label="Play/Pause" id="play-pause-btn" class="control-button main-control">
                        <i class="bi bi-play-circle-fill" id="play-icon"></i>
                        <i class="bi bi-pause-circle-fill d-none" id="pause-icon"></i>
                    </button>
                    <button aria-label="Skip 10 seconds" class="control-button" onclick="skipAudio()">
                        <i class="bi bi-skip-forward-fill"></i>
                    </button>
                    <button aria-label="Speed" class="control-button speed-control" onclick="toggleSpeed()">
                        <span id="speed-label">1x</span>
                    </button>
                </div>
                <button id="close-modal" class="close-button" aria-label="Cerrar">
                    <i class="bi bi-x-circle-fill"></i>
                </button>
                <audio id="audio-player" src="${src}" style="display: none;"></audio>
            </div>
        </div>
    `;

    const modal = document.getElementById('modal');
    modal.innerHTML = modalContent;
    modal.style.display = 'block';
    document.getElementById('overlay').style.display = 'block';

    setupAudioPlayer();
  
    document.getElementById('close-modal').addEventListener('click', closeModal);
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function setupAudioPlayer() {
    const audio = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
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
            playIcon.classList.add('d-none');
            pauseIcon.classList.remove('d-none');
        } else {
            audio.pause();
            playIcon.classList.remove('d-none');
            pauseIcon.classList.add('d-none');
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

function toggleSpeed() {
    const audio = document.getElementById('audio-player');
    const speedLabel = document.getElementById('speed-label');
    if (audio.playbackRate === 1) {
        audio.playbackRate = 1.5;
        speedLabel.textContent = '1.5x';
    } else {
        audio.playbackRate = 1;
        speedLabel.textContent = '1x';
    }
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