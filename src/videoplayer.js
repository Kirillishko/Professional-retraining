document.addEventListener("DOMContentLoaded", function() {
    const wrapper = document.querySelector('.wrapper'),
        player = document.querySelector('.player'),
        video = document.querySelector('.video'),
        playButton = document.querySelector('.controls-play'),
        controls = document.querySelector('.controls'),
        playButtonImg = document.querySelector('.controls-play-button'),
        progress = document.querySelector('.progress'),
        time = document.querySelector('.controls-time'),
        screen = document.querySelector('.controls-screen'),
        videoButtons = [...document.querySelectorAll('.big-image-wrapper-button'), ...document.querySelectorAll('.small-image-wrapper-button')];
        videoImages = [...document.querySelectorAll('.big-image-wrapper-button img'), ...document.querySelectorAll('.small-image-wrapper-button img')];

    let isFullScreen = false;

    function toggleVideoStatus() {
        if (video.paused) {
            video.play();
            playButtonImg.src = 'images/buttons/button-stop.png';
        }
        else {
            video.pause();
            playButtonImg.src = 'images/buttons/button-play.png';
        }
    }

    const formatTime = (time) => time >= 10 ? time.toString() : `0${time}`

    function setTime() {
        const currentTime = video.currentTime;
        const allTime = video.duration;
        progress.value = (currentTime / allTime) * 100;

        const currentMinutes = Math.floor(currentTime / 60);
        const allMinutes = Math.floor(allTime / 60);
        const currentSeconds = formatTime(Math.floor(currentTime % 60));
        const allSeconds = formatTime(Math.floor(allTime % 60));

        time.innerHTML = `${currentMinutes}:${currentSeconds} / ${allMinutes}:${allSeconds}`;
    }

    function setProgress() {
        video.currentTime = (progress.value * video.duration) / 100;
        video.play();
        video.addEventListener('timeupdate', setTime);
    }

    function onEnded() {
        playButtonImg.src = 'images/buttons/button-play.png';
    }

    function openVideo(src) {
        video.src = src;
    }

    function closeVideo() {
        video.pause();
        video.currentTime = 0;
        wrapper.classList.remove('active');
        playButtonImg.src = 'images/buttons/button-play.png';
    }

    function showVideo() {
        wrapper.classList.add('active');
        progress.value = 0;
        video.muted = true;

        const allMinutes = Math.floor(video.duration / 60);
        const allSeconds = formatTime(Math.floor(video.duration % 60));
        time.innerHTML = `0:00 / ${allMinutes}:${allSeconds}`;
    }

    function onProgressInput() {
        video.removeEventListener('timeupdate', setTime);
        video.pause();
    }

    function fullScreenToggle() {
        if (isFullScreen) {
            player.classList.remove('fullscreen');
            video.classList.remove('fullscreen');
            controls.classList.remove('fullscreen');
        } else {
            player.classList.add('fullscreen');
            video.classList.add('fullscreen');
            controls.classList.add('fullscreen');
        }

        isFullScreen = !isFullScreen;
    }

    playButton.addEventListener('click', toggleVideoStatus);
    video.addEventListener('click', toggleVideoStatus);
    video.addEventListener('timeupdate', setTime);
    progress.addEventListener('change', setProgress);
    video.addEventListener('ended', onEnded);
    wrapper.addEventListener('click', (event) => {
        if (event.target === wrapper)
            closeVideo();
    });
    videoButtons[0].addEventListener('click', () => openVideo('images/videos/IT%20forum%20в%20СФ%20УУНИТ%2021.02.2023.mp4'));
    videoButtons[1].addEventListener('click', () => openVideo('images/videos/Программисты%20из%20Стерлитамака.mp4'));
    videoButtons[2].addEventListener('click', () => openVideo('images/videos/Хакатон%20«КИБЕР%20102».mp4'));
    video.addEventListener('loadedmetadata', showVideo);
    screen.addEventListener('click', fullScreenToggle);
    progress.addEventListener('input', onProgressInput);
})