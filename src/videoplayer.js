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
        soundButton = document.querySelector('.controls-sound-buttons'),
        soundProgress = document.querySelector('.controls-sound-progress'),
        videoButtons = [...document.querySelectorAll('.big-image-wrapper-button'), ...document.querySelectorAll('.small-image-wrapper-button')];

    let isVideoPlaying = false;
    const progressMax = progress.max;

    function toggleVideoStatus() {
        if (video.paused) {
            video.play();
            playButtonImg.src = 'images/buttons/button-stop.png';
            isVideoPlaying = true;
        }
        else {
            video.pause();
            playButtonImg.src = 'images/buttons/button-play.png';
            isVideoPlaying = false;
        }
    }

    const formatTime = (time) => time >= 10 ? time.toString() : `0${time}`

    function setTime() {
        const currentTime = video.currentTime;
        const allTime = video.duration;
        progress.value = (currentTime / allTime) * progressMax;

        const currentMinutes = Math.floor(currentTime / 60);
        const allMinutes = Math.floor(allTime / 60);
        const currentSeconds = formatTime(Math.floor(currentTime % 60));
        const allSeconds = formatTime(Math.floor(allTime % 60));

        time.innerHTML = `${currentMinutes}:${currentSeconds} / ${allMinutes}:${allSeconds}`;
    }

    function setProgress() {
        video.currentTime = (progress.value * video.duration) / progressMax;

        if (isVideoPlaying)
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

        const allMinutes = Math.floor(video.duration / 60);
        const allSeconds = formatTime(Math.floor(video.duration % 60));
        time.innerHTML = `0:00 / ${allMinutes}:${allSeconds}`;
    }

    function onProgressInput() {
        video.removeEventListener('timeupdate', setTime);
        video.pause();
        video.currentTime = (progress.value * video.duration) / progressMax;
    }

    function toggleFullScreen() {
        if (document.fullscreenElement == null) {
            video.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    function toggleMute() {
        video.muted = !video.muted;
    }

    soundProgress.addEventListener('input', e => {
        video.volume = e.target.value;
        video.muted = e.target.value === 0;
    })

    video.addEventListener('volumechange', () => {
        soundProgress.value = video.volume;
        let volumeLevel;

        if (video.muted || video.volume === 0) {
            soundProgress.value = 0;
            volumeLevel = "off";
        } else if (video.volume >= 0.5) {
            volumeLevel = "high";
        } else {
            volumeLevel = "low";
        }

        player.dataset.volumeLevel = volumeLevel;
    })

    soundButton.addEventListener('click', toggleMute);

    playButton.addEventListener('click', toggleVideoStatus);
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
    screen.addEventListener('click', toggleFullScreen);
    progress.addEventListener('input', onProgressInput);

    let clickCount = 0;

    video.onclick = event => {
        clickCount++;
        console.log("e " + event.detail);
        console.log("c " + clickCount);

        setTimeout(() => {
            if (clickCount === 1) {
                toggleVideoStatus();
            } else if (clickCount === 2) {
                toggleFullScreen();
            }

            clickCount = 0;
        }, 200);
    };

})