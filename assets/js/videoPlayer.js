const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPalyBtn");
const volumeBtn = document.getElementById("jsVolumeBtn");
const screenBtn = document.getElementById("jsScreenBtn");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");

//https://developer.mozilla.org/ko/docs/Web/API/HTMLMediaElement
function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    //음소거일때
    videoPlayer.muted = false;
    if (volumeRange.value >= 0.8) {
      volumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
    } else if (volumeRange.value >= 0.4) {
      volumeBtn.innerHTML = `<i class="fas fa-volume-down"></i>`;
    } else if (volumeRange.value >= 0.1) {
      volumeBtn.innerHTML = `<i class="fas fa-volume-off"></i>`;
    } else {
      volumeBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
    }
    volumeRange.value = videoPlayer.volume;
  } else {
    //소리가 들릴 때
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    volumeRange.value = 0;
  }
}

//https://developer.mozilla.org/en-US/docs/Web/API/Document/exitFullscreen
function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  videoPlayer.classList.remove("fullScreen");
  videoPlayer.classList.add("smallScreen");
  screenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  screenBtn.removeEventListener("click", exitFullScreen);
  screenBtn.addEventListener("click", goFullScreen);
}

//https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen
function goFullScreen() {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
  videoPlayer.classList.remove("smallScreen");
  videoPlayer.classList.add("fullScreen");
  screenBtn.innerHTML = '<i class="fas fa-compress"></i>';
  screenBtn.removeEventListener("click", goFullScreen);
  screenBtn.addEventListener("click", exitFullScreen);
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

function getCurrentTime() {
  const currentTimeString = formatDate(Math.floor(videoPlayer.currentTime));
  currentTime.innerText = currentTimeString;
}

function setTotalTime() {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 1000);
  // => getCurrentTime 함수를 매초마다 실행해라~!~!~!~!
}

function handleEnded() {
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handleDrag(event) {
  const {
    target: { value },
  } = event;
  videoPlayer.volume = value;
  if (volumeRange.value >= 0.8) {
    volumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
  } else if (volumeRange.value >= 0.4) {
    volumeBtn.innerHTML = `<i class="fas fa-volume-down"></i>`;
  } else if (volumeRange.value >= 0.1) {
    volumeBtn.innerHTML = `<i class="fas fa-volume-off"></i>`;
  } else {
    volumeBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
  }
}

function init() {
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  screenBtn.addEventListener("click", goFullScreen);

  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  //https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadedmetadata_event

  videoPlayer.addEventListener("ended", handleEnded);
  //https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ended_event

  volumeRange.addEventListener("input", handleDrag);
  videoPlayer.volume = 0.5;
}

if (videoContainer) {
  init();
}
