const videoContainer = document.getElementById('jsVideoPlayer');
const videoPlayer = document.querySelector('#jsVideoPlayer video');
const playBtn = document.getElementById('jsPlayBtn');
const playIcon = document.getElementById('playIcon');
const volumeIcon = document.getElementById('volumeIcon');
const volumeBtn = document.getElementById('jsVolumeBtn');
const fullScreenBtn = document.getElementById('jsFullScreen');
const currentTime = document.getElementById('currentTime');
const totalTime = document.getElementById('totalTime');
const volumeRange = document.getElementById('jsVolume');

const registerView = () => {
  const videoId = window.location.href.split('/videos/')[1];
  console.log(videoId);
  fetch(`/api/${videoId}/view`, {
    method: 'post'
  });
};

function handlePlayClick() {
  if (videoPlayer.paused) {
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
    videoPlayer.play();
  } else {
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
    videoPlayer.pause();
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    volumeRange.value = videoPlayer.volume;
    volumeIcon.classList.remove('fa-volume-mute');
    volumeIcon.classList.add('fa-volume-up');
    videoPlayer.muted = false;
    //volumeBtn.innerHTML = '<i class="fas fa-volume-mute"><i>';
  } else {
    volumeRange.value = 0;
    volumeIcon.classList.remove('fa-volume-up');
    volumeIcon.classList.add('fa-volume-mute');
    videoPlayer.muted = true;
    //volumeBtn.innerHTML = '<i class="fas fa-volume-up"><i>';
  }
}

function exitFullScreen() {
  fullScreenBtn.innerHTML = '<i class="fas fa-expand"><i>';
  videoPlayer.style.width = '850px';
  fullScreenBtn.removeEventListener('click', exitFullScreen);
  fullScreenBtn.addEventListener('click', goFullScreen);

  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function goFullScreen() {
  videoPlayer.style.width = '100%';
  fullScreenBtn.innerHTML = '<i class="fas fa-compress"><i>';
  fullScreenBtn.removeEventListener('click', goFullScreen);
  fullScreenBtn.addEventListener('click', exitFullScreen);

  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
}

const formatDate = (seconds) => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function setTotalTime() {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 1000);
}

function getCurrentTime() {
  currentTime.innerHTML = formatDate(videoPlayer.currentTime);
}

function handleEnded() {
  registerView();
  videoPlayer.currentTime = 0;
  playIcon.classList.remove('fa-pause');
  playIcon.classList.add('fa-play');
}

function handleDrag(event) {
  const {
    target: { value }
  } = event;
  videoPlayer.volume = value;

  if (value > 0.6) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"><i>';
  } else if (value > 0) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"><i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"><i>';
  }
}

function init() {
  videoPlayer.volume = 0.5;
  playBtn.addEventListener('click', handlePlayClick);
  volumeBtn.addEventListener('click', handleVolumeClick);
  fullScreenBtn.addEventListener('click', goFullScreen);
  videoPlayer.addEventListener('loadedmetadata', setTotalTime);
  videoPlayer.addEventListener('ended', handleEnded);
  volumeRange.addEventListener('input', handleDrag);
}

if (videoContainer) {
  init();
}
