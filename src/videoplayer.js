document.addEventListener("DOMContentLoaded", function() {
    const wrapper = document.querySelector('.wrapper'),
        video = document.querySelector('.video'),
        playButton = document.querySelector('.controls-play'),
        playButtonImg = document.querySelector('.controls-play-button'),
        progress = document.querySelector('.progress'),
        time = document.querySelector('.controls-time'),
        videoButtons = [...document.querySelectorAll('.big-image-wrapper-button'), ...document.querySelectorAll('.small-image-wrapper-button')];
        videoImages = [...document.querySelectorAll('.big-image-wrapper-button img'), ...document.querySelectorAll('.small-image-wrapper-button img')];

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
        const currentValue = video.currentTime;
        progress.value = (currentValue / video.duration) * 100;

        const minutes = Math.floor(currentValue / 60);
        const seconds = Math.floor(currentValue % 60);

        time.innerHTML = [minutes, seconds].map(formatTime).join(':');
    }

    function setProgress() {
        video.currentTime = (progress.value * video.duration) / 100;
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
})