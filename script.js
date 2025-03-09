// Sélection des éléments HTML nécessaires
const audio = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("play-pause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progress-bar");
const songTitle = document.getElementById("song-title");
const volumeControl = document.getElementById("volume-control");
const volumeUp = document.getElementById("volume-up");
const volumeDown = document.getElementById("volume-down");
const volumeIcon = document.getElementById("volume-icon");

// Liste des musiques disponibles
const songs = [
    { title: "Ballad of the Wind Fish by Koji Kondo - The Legend of Zelda: Link's Awakening", src: "music/ballad-of-the-wind-fish.mp3" },
    { title: "Kass' Theme by Manaka Kataoka - The Legend of Zelda: Breath of the Wild", src: "music/kass'-theme.mp3" },
    { title: "Emil's Sacrifice by MONACA - NieR Replicant", src: "music/emil's-sacrifice.mp3" },
    { title: "Dragonsong by Nobuo Uematsu - Final Fantasy XIV", src: "music/dragonsong.mp3" },
    { title: "Dawntrail Event Theme 10 by Masayoshi Soken - Final Fantasy XIV", src: "music/calm-music.mp3" },
    { title: "Ballad of the Goddess by Koji Kondo - The Legend of Zelda: Skyward Sword", src: "music/ballad-of-the-goddess.mp3" },
    { title: "Weight of the World by Keiichi Okabe - NieR: Automata", src: "music/weight-of-the-world.mp3" },
    { title: "Kainé by Keiichi Okabe - Final Fantasy XIV", src: "music/kaine.mp3" },
    { title: "The Legend of Zelda: Breath of the Wild 2017 Trailer by Manaka Kataoka", src: "music/botw-trailer.mp3" },
    { title: "Grandma by MONACA - NieR Replicant", src: "music/grandma.mp3" },
    { title: "Song of Stoms by Koji Kondo - The Legend of Zelda: Ocarina of Time", src: "music/song-of-storms.mp3" },
    { title: "Astral Observatory by Koji Kondo - The Legend of Zelda: Majora's Mask", src: "music/astral-observatory.mp3" },
    { title: "Lost Woods by Koji Kondo - The Legend of Zelda: Ocarina of Time", src: "music/lost-woods.mp3" },
    { title: "Sidon's Theme by Manaka Kataoka - The Legend of Zelda: Tears of the Kingdom", src: "music/sidon's-theme.mp3" },
    { title: "Gerudo Valley by Koji Kondo - The Legend of Zelda: Ocarina of Time", src: "music/gerudo-valley.mp3" },
    { title: "Nayru's Theme by Koji Kondo - The Legend of Zelda: Oracle of Ages", src: "music/nayru's-theme.mp3" },
    { title: "Lace by Christopher Larkin - Hollow Knight: Silksong", src: "music/lace.mp3" },
    { title: "Midna's Lament by Koji Kondo - The Legend of Zelda: Twilight Princess", src: "music/midna's-lament.mp3" },
    { title: "Song of the Ancients by MONACA - NieR Replicant", src: "music/song-of-the-ancients.mp3" }, 
];

let currentSongIndex = 0;

// Fonction pour charger une chanson spécifique
function loadSong(index) {
    audio.src = songs[index].src;
    songTitle.textContent = songs[index].title;
    audio.load();
}

// Augmenter le volume
volumeUp.addEventListener("click", () => {
    if (audio.volume < 1) {
        audio.volume = Math.min(audio.volume + 0.1, 1);
        volumeControl.value = audio.volume;
        updateVolumeIcon();
        updateVolumeBar();
    }
});

// Diminuer le volume
volumeDown.addEventListener("click", () => {
    if (audio.volume > 0) {
        audio.volume = Math.max(audio.volume - 0.1, 0);
        volumeControl.value = audio.volume;
        updateVolumeIcon();
        updateVolumeBar();
    }
});

// Met à jour l'icône du volume
function updateVolumeIcon() {
    if (audio.volume === 0) {
        volumeIcon.textContent = "🔇";
    } else if (audio.volume < 0.5) {
        volumeIcon.textContent = "🔉";
    } else {
        volumeIcon.textContent = "🔊";
    }
}

// Fonction de lecture/pause
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = "⏸";
    } else {
        audio.pause();
        playPauseBtn.innerHTML = "▶️";
    }
}

// Passer à la chanson suivante
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.innerHTML = "⏸";
}

// Lorsque la chanson se termine, passer à la suivante automatiquement
audio.addEventListener("ended", nextSong);

// Revenir à la chanson précédente
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.innerHTML = "⏸";
}

// Mettre à jour la barre de progression pendant la lecture
audio.addEventListener("timeupdate", () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    updateProgressBar();
});

// Permet de modifier la position de lecture via la barre de progression
progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
    updateProgressBar();
});

// Modifier le volume via le slider
volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
    updateVolumeIcon();
    updateVolumeBar();
});

// Ajout des événements sur les boutons
playPauseBtn.addEventListener("click", togglePlayPause);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Met à jour l'affichage de la barre de progression
function updateProgressBar() {
    let percentage = (audio.currentTime / audio.duration) * 100;
    progressBar.style.background = `linear-gradient(to right, #4a4e69 ${percentage}%, #f2e9e4 ${percentage}%)`;
}

// Met à jour l'affichage de la barre de volume
function updateVolumeBar() {
    let percentage = audio.volume * 100;
    volumeControl.style.background = `linear-gradient(to right, #4a4e69 ${percentage}%, #f2e9e4 ${percentage}%)`;
}

// Initialisation
updateVolumeBar();
updateProgressBar();
updateVolumeIcon();
loadSong(currentSongIndex);