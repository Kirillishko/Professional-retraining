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
        soundProgress = document.querySelector('.controls-sound-wrap-range'),
        videoButtons = [...document.querySelectorAll('.big-image-wrapper-button'), ...document.querySelectorAll('.small-image-wrapper-button')];

    let isVideoPlaying = false;
    const progressMax = progress.max;

    let controlsInterval;

    function hideControls() {
        controls.classList.add('unactive');
        player.classList.add('unactive');
    }

    function showControls() {
        controls.classList.remove('unactive');
        player.classList.remove('unactive');
    }

    function toggleVideoStatus() {
        if (video.paused) {
            clearTimeout(controlsInterval);
            controlsInterval = setTimeout(hideControls, 5000);
            video.play();
            playButtonImg.src = 'images/buttons/button-stop.png';
            isVideoPlaying = true;
        }
        else {
            video.pause();
            playButtonImg.src = 'images/buttons/button-play.png';
            isVideoPlaying = false;
            showControls();
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
        window.removeEventListener("keydown", arrow_keys_handler, false);
    }

    function showVideo() {
        wrapper.classList.add('active');
        progress.value = 0;

        const allMinutes = Math.floor(video.duration / 60);
        const allSeconds = formatTime(Math.floor(video.duration % 60));
        time.innerHTML = `0:00 / ${allMinutes}:${allSeconds}`;

        window.addEventListener("keydown", arrow_keys_handler, false);
    }

    function onProgressInput() {
        video.removeEventListener('timeupdate', setTime);
        video.pause();
        const currentTime = (progress.value * video.duration) / progressMax;
        video.currentTime = currentTime;

        const allTime = video.duration;
        progress.value = (currentTime / allTime) * progressMax;

        const currentMinutes = Math.floor(currentTime / 60);
        const allMinutes = Math.floor(allTime / 60);
        const currentSeconds = formatTime(Math.floor(currentTime % 60));
        const allSeconds = formatTime(Math.floor(allTime % 60));

        time.innerHTML = `${currentMinutes}:${currentSeconds} / ${allMinutes}:${allSeconds}`;
    }

    function toggleFullScreen() {
        if (document.fullscreenElement == null) {
            player.requestFullscreen();
        } else {
            document.exitFullscreen();
        }

        player.classList.toggle('fullscreen');
        controls.classList.toggle('fullscreen');
        // bottom: -5.1vw;
    }

    document.addEventListener("fullscreenchange", () => {
        wrapper.classList.toggle("full-screen", document.fullscreenElement);
    })

    function toggleMute() {
        video.muted = !video.muted;
    }

    function moveSoundSlider() {
        let currentValue = soundProgress.value * soundProgress.max * 100;
        soundProgress.style.background =
            `linear-gradient(to right,
            #4B7EFE 0%, #4B7EFE ` + currentValue + `%,
            #0038C3 ` + currentValue + `%, #0038C3 100%)`;
    }

    moveSoundSlider();

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
    videoButtons[0].addEventListener('click', () => openVideo('images/videos/Программисты%20из%20Стерлитамака.mp4'));
    videoButtons[1].addEventListener('click', () => openVideo('images/videos/IT%20forum%20в%20СФ%20УУНИТ%2021.02.2023.mp4'));
    videoButtons[2].addEventListener('click', () => openVideo('images/videos/Хакатон%20«КИБЕР%20102».mp4'));
    video.addEventListener('loadedmetadata', showVideo);
    screen.addEventListener('click', toggleFullScreen);
    progress.addEventListener('input', onProgressInput);
    soundProgress.addEventListener('input', moveSoundSlider);
    soundButton.addEventListener('mouseover', () => soundProgress.classList.add('active'));
    soundButton.addEventListener('mouseout', (event) => {
        if (event.relatedTarget !== soundProgress)
            soundProgress.classList.remove('active')
    });
    soundProgress.addEventListener('mouseout', (event) => {
        if (event.relatedTarget !== soundButton)
            soundProgress.classList.remove('active')
    });

    let toHide = false;

    player.addEventListener('mousemove', (event) => {
        if (toHide)
            return;

        if (!video.paused) {
            showControls();
            clearTimeout(controlsInterval);
            controlsInterval = setTimeout(hideControls, 5000);
        }
    })

    controls.addEventListener('mouseenter', () => {
        showControls();
        clearTimeout(controlsInterval);
        toHide = true;
    });

    controls.addEventListener('mouseleave', () => {
        toHide = false;
    });

    function rewindVideo(value) {
        video.currentTime = (progress.value * video.duration) / progressMax + value;

        if (!video.paused) {
            showControls();
            clearTimeout(controlsInterval);
            controlsInterval = setTimeout(hideControls, 5000);
        }
    }

    let soundTimeout;

    function rewindSound(value) {
        value /= 100;

        if (video.volume + value < 0)
            video.volume = 0;
        else if (video.volume + value > 1)
            video.volume = 1;
        else
            video.volume = video.volume + value;

        video.muted = video.volume === 0;

        let currentValue = video.volume * soundProgress.max * 100;
        soundProgress.style.background =
            `linear-gradient(to right,
            #4B7EFE 0%, #4B7EFE ` + currentValue + `%,
            #0038C3 ` + currentValue + `%, #0038C3 100%)`;

        soundProgress.classList.add('active');
        clearTimeout(soundTimeout);
        soundTimeout = setTimeout(() => soundProgress.classList.remove('active'), 5000);

        if (!video.paused) {
            showControls();
            clearTimeout(controlsInterval);
            controlsInterval = setTimeout(hideControls, 5000);
        }
    }

    document.addEventListener('keydown', function (event) {
        if (!wrapper.classList.contains('active'))
            return;

        if (event.key === 'Escape')
            closeVideo();

        if (event.key === 'f')
            toggleFullScreen();

        if (event.key === ' ')
            toggleVideoStatus();

        if (event.key === 'ArrowRight')
            rewindVideo(5);

        if (event.key === 'ArrowLeft')
            rewindVideo(-5);

        if (event.key === 'ArrowUp')
            rewindSound(5);

        if (event.key === 'ArrowDown')
            rewindSound(-5);
    });

    let clickCount = 0;

    video.onclick = event => {
        clickCount++;

        setTimeout(() => {
            if (clickCount === 1) {
                toggleVideoStatus();
            } else if (clickCount === 2) {
                toggleFullScreen();
            }

            clickCount = 0;
        },       200);
    };

    const arrow_keys_handler = function(e) {
        switch(e.code){
            case "ArrowUp": case "ArrowDown": case "ArrowLeft": case "ArrowRight":
            case "Space": e.preventDefault(); break;
            default: break; // do not block other keys
        }
    };
})