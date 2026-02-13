const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// 2. Get the audio player element and playlist container
const audioPlayer = document.getElementById('audioPlayer');
const playlistElement = document.getElementById('playlist');


//songs
const songs = ['happy', 'cool', 'medieval', 'western', 'italian', 'classical'];
let songIndex = 0;

function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.JPEG`;

}

loadSong(songs[songIndex]);

///add play and pause controls
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas'). classList.replace('fa-play', 'fa-pause' );
    audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.replace('fa-pause', 'fa-play');
  audio.pause();
}

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  isPlaying ? pauseSong() : playSong();
});

///add next and previous song logic

function prevSong(){
    songIndex = (songIndex -1 + songs.length) % songs.length;
    loadSong(songs [songIndex]);
    playSong();
}

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
     loadSong(songs[songIndex]);
  playSong();
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//update prgress bar
function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const percent = (currentTime/ duration) * 100;
    progress.style.width = '${percent}%';

}
audio.addEventListener('timeupdate', updateProgress);

//click to seek in track
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
}

progressContainer.addEventListener('click', setProgress);

//auto-play next song on end
audio.addEventListener('ended', nextSong);

//keyboard controls
document.addEventListener('keydown', (event) => {
  if (event.key === "ArrowRight") {
    nextSong()
  }
  if (event.key === "ArrowLeft"){
    prevSong()
  }
  if (event.key === " ") {
  const isPlaying = musicContainer.classList.contains('play');
  isPlaying ? pauseSong() : playSong();
  }
});



