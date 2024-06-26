class Player {
    iconPlay = `<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 -960 960 960"  fill="currentColor">
        <path d="M320-200v-560l440 280-440 280Z"/>
      </svg>`;
    iconPause = `<svg width="24" height="24" viewBox="-1 0 8 8" xmlns="http://www.w3.org/2000/svg"  fill="currentColor">
            <g transform="translate(-67.000000, -3765.000000)"><g transform="translate(56.000000, 160.000000)">
                <path d="M11,3613 L13,3613 L13,3605 L11,3605 L11,3613 Z M15,3613 L17,3613 L17,3605 L15,3605 L15,3613 Z" />
            </g></g>
        </svg>`;

    iconFullscreen = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor">
        <path d="M200-200v-200h80v120h120v80H200Zm0-360v-200h200v80H280v120h-80Zm360 360v-80h120v-120h80v200H560Zm120-360v-120H560v-80h200v200h-80Z"/>
      </svg>`;
    iconNoSound = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor" >
        <path d="m616-320-56-56 104-104-104-104 56-56 104 104 104-104 56 56-104 104 104 104-56 56-104-104-104 104Zm-496-40v-240h160l200-200v640L280-360H120Z"/>
      </svg>`;
    iconVolumeUp = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor" >
        <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320Z"/>
      </svg>`;
    iconDownload = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor" >
            <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/>
        </svg>`;

    playerTemplate = `
        <button type="button" class="player__handle">
          ${this.iconPlay}
        </button>
    
        <div class="player__island" >
          <div class="player__time" >
            <span class="player__currentTime" >0:00</span>
            /
            <span class="player__duration" >0:00</span>
          </div>
    
          <div class="player__seekbar" >
            <input type="range" class="player__progressbar player__range" min="0" value="0" step="0.01" max="100" >
          </div>
    
          <div class="player__volume" >
            <button type="button" class="player__volume-toggle player__control" >${this.iconVolumeUp}</button>
            
            <div class="player__volume-bar player__seekbar" >
              <input type="range" class="player__volume-range player__range" min="0" max="1" value="1" step="0.01" >
            </div>
          </div>
    
          <div class="player__controls" >
            <a class="player__control player__download" style="display: none;" download>${this.iconDownload}</a>
            <button type="button" class="player__control player__fullscreen" >${this.iconFullscreen}</button>
          </div>
        </div>
      `;

    constructor(playerElement, { autoPlay = false, downloadUrl } = {}) {
        this.playerElement = playerElement;
        this.autoPlay = autoPlay;
        this.downloadUrl = downloadUrl;
        this.playerVideo = undefined;
        this.playerHandle = undefined;
        this.playerIsland = undefined;
        this.playerCurrentTime = undefined;
        this.playerTotalTime = undefined;
        this.playerSeekbar = undefined;
        this.playerProgressbar = undefined;
        this.playerVolumeToggle = undefined;
        this.playerVolumeBar = undefined;
        this.playerVolumeRange = undefined;
        this.playerDownload = undefined;
        this.playerFullscreen = undefined;
        this.playerHideControlsTimeoutId = undefined;
        this.initialize();
    }

    initialize() {
        const { playerElement } = this;
        this.playerElement.classList.add('initialized');
        this.playerElement.innerHTML += this.playerTemplate;
        this.playerVideo = playerElement.querySelector('video');
        this.playerVideo.classList.add('player__video');
        this.playerHandle = playerElement.querySelector('.player__handle');
        this.playerIsland = playerElement.querySelector('.player__island');
        this.playerCurrentTime = playerElement.querySelector(
            '.player__currentTime'
        );
        this.playerTotalTime = playerElement.querySelector('.player__duration');
        this.playerSeekbar = playerElement.querySelector('.player__seekbar');
        this.playerProgressbar = playerElement.querySelector(
            '.player__progressbar'
        );
        this.playerVolumeToggle = playerElement.querySelector(
            '.player__volume-toggle'
        );
        this.playerVolumeBar = playerElement.querySelector(
            '.player__volume-bar'
        );
        this.playerVolumeRange = playerElement.querySelector(
            '.player__volume-range'
        );
        this.playerDownload = playerElement.querySelector('.player__download');
        this.playerFullscreen = playerElement.querySelector(
            '.player__fullscreen'
        );
        this.updateTimeInformation(
            this.playerVideo.currentTime,
            this.playerVideo.duration
        );

        this.initializeVideo();
        this.initializeProgressbar();
        this.initializeVolume();
        this.initializeAutoplay();
        this.initializeFullscreen();
    }

    initializeVideo() {
        this.playerElement.addEventListener('mousemove', () => {
            if (!this.playerVideo.paused) {
                this.showControls();
                this.hideControlsWithDelay();
            }
        });

        this.playerElement.addEventListener('touchmove', () => {
            if (!this.playerVideo.paused) {
                this.showControls();
                this.hideControlsWithDelay();
            }
        });

        this.playerElement.addEventListener('mouseenter', () => {
            if (!this.playerVideo.paused) {
                this.showControls();
            }
        });

        this.playerElement.addEventListener('mouseleave', () => {
            if (!this.playerVideo.paused) {
                this.hideControls();
            }
        });

        this.playerVideo.addEventListener('loadedmetadata', () => {
            this.initializeDownload();
        });

        this.playerVideo.addEventListener('play', () => {
            this.playerHandle.innerHTML = this.iconPause;
            this.hideControlsWithDelay();
        });

        this.playerVideo.addEventListener('pause', () => {
            this.playerHandle.innerHTML = this.iconPlay;
            this.showControls();
        });

        this.playerVideo.addEventListener('durationchange', ({ target }) => {
            const { currentTime, duration } = target;
            this.updateTimeInformation(currentTime, duration);
        });

        this.playerVideo.addEventListener('timeupdate', ({ target }) => {
            const { currentTime, duration } = target;
            this.updateTimeInformation(currentTime, duration);
        });

        this.playerVideo.addEventListener('ended', () => {
            this.pauseVideo();
            this.closeFullscreen();
        });

        this.playerVideo.addEventListener('volumechange', () => {
            this.updateVolumeInformation();
        });

        this.playerVideo.addEventListener('fullscreenchange', (event) => {
            if (!document.fullscreenElement) {
                this.closeFullscreen();
            }
        });

        // Video controls appear after exiting full screen mode on iOS
        this.playerVideo.addEventListener('webkitendfullscreen', () => {
            this.closeFullscreen();
            this.pauseVideo();
        });

        this.playerVideo.addEventListener('click', () => {
            if (this.playerVideo.paused) {
                this.unMuteVolume();
                this.playVideo();
                return;
            }

            this.pauseVideo();
        });
    }

    initializeProgressbar() {
        this.playerProgressbar.addEventListener('mousedown', () => {
            this.pauseVideo();
            console.log('mousedown');
        });

        this.playerProgressbar.addEventListener('mouseup', () => {
            this.playVideo();
        });

        this.playerProgressbar.addEventListener('touchstart', () => {
            this.pauseVideo();
        });

        this.playerProgressbar.addEventListener('touchend', () => {
            this.playVideo();
        });

        this.playerProgressbar.addEventListener('input', () => {
            const { value, max } = this.playerProgressbar;
            this.playerVideo.currentTime = value;
            this.updateProgressbarProgress(this.playerSeekbar, value, max);
        });
    }

    initializeVolume() {
        if (this.isIOS()) {
            this.playerVolumeBar.style.display = 'none ';
        }

        this.playerVolumeToggle.addEventListener('click', () => {
            if (this.playerVideo.muted) {
                this.unMuteVolume();
                return;
            }
            this.muteVolume();
        });

        this.playerVolumeRange.addEventListener('input', ({ target }) => {
            const { value } = target;
            this.playerVideo.muted = false;
            this.playerVideo.volume = Number(value);
        });
    }

    initializeAutoplay() {
        if (this.autoPlay) {
            const presentationObserver = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            this.autoPlayVideo();
                            return;
                        }

                        this.pauseVideo();
                    });
                },
                {
                    rootMargin: '-25% 0px -25% 0px',
                }
            );

            presentationObserver.observe(this.playerElement);
        }
    }

    initializeDownload() {
        this.playerDownload.style.display = 'block';
        this.playerDownload.href =
            this.downloadUrl || this.playerVideo.currentSrc;
    }

    initializeFullscreen() {
        this.playerFullscreen.addEventListener('click', () => {
            this.openFullscreen();
        });
    }

    secondsToMinutesAndSeconds(totalSeconds) {
        if (isNaN(totalSeconds)) {
            totalSeconds = 0;
        }

        const minutes = Math.floor(Number(totalSeconds) / 60);
        const seconds = Math.round(Number(totalSeconds) % 60);
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${minutes}:${formattedSeconds}`;
    }

    updateProgressbarProgress(target, currentValue, maxValue) {
        const progress = (currentValue / maxValue) * 100;
        target.style.setProperty(
            '--player-progressbar-complete',
            `${progress}%`
        );
    }

    updateTimeInformation(currentTime, duration) {
        this.playerCurrentTime.textContent =
            this.secondsToMinutesAndSeconds(currentTime);
        this.playerTotalTime.textContent =
            this.secondsToMinutesAndSeconds(duration);
        this.playerProgressbar.value = currentTime;
        this.playerProgressbar.max = duration;
        this.updateProgressbarProgress(
            this.playerSeekbar,
            currentTime,
            duration
        );
    }

    updateVolumeInformation(currentVolume, maxVolume = 1) {
        console.log([currentVolume, maxVolume]);
        const progress = this.playerVideo.muted ? 0 : this.playerVideo.volume;
        this.playerVolumeToggle.innerHTML = this.playerVideo.muted
            ? this.iconNoSound
            : this.iconVolumeUp;
        this.playerVolumeRange.value = this.playerVideo.muted
            ? 0
            : this.playerVideo.volume;
        this.updateProgressbarProgress(
            this.playerVolumeBar,
            progress,
            maxVolume
        );
    }

    playVideo() {
        this.playerVideo.play();
    }

    pauseVideo() {
        this.playerVideo.pause();
        console.log('pause');
    }

    autoPlayVideo() {
        this.muteVolume();
        this.playVideo();
    }

    muteVolume() {
        this.playerVideo.muted = true;
        this.updateVolumeInformation();
    }

    unMuteVolume() {
        this.playerVideo.muted = false;
        this.updateVolumeInformation();
    }

    showControls() {
        this.playerHandle.style.opacity = 1;
        this.playerHandle.style.visibility = 'visible';
        this.playerIsland.style.opacity = 1;
        this.playerIsland.style.visibility = 'visible';
        this.playerIsland.style.transform = 'translateY(0)';
    }

    hideControls() {
        this.playerHandle.style.opacity = 0;
        this.playerHandle.style.visibility = 'hidden';
        this.playerIsland.style.opacity = 0;
        this.playerIsland.style.visibility = 'hidden';
        this.playerIsland.style.transform = 'translateY(10px)';
    }

    hideControlsWithDelay() {
        clearTimeout(this.playerHideControlsTimeoutId);
        this.playerHideControlsTimeoutId = setTimeout(() => {
            if (!this.playerVideo.paused) {
                this.hideControls();
            }
        }, 1500);
    }

    openFullscreen() {
        if (this.playerVideo.requestFullscreen) {
            this.playerVideo.requestFullscreen();
            this.playerVideo.muted = false;
            this.playVideo();
        } else if (this.playerVideo.webkitEnterFullscreen) {
            this.playerVideo.webkitEnterFullscreen();
            this.playerVideo.muted = false;
            this.playVideo();
        } else if (this.playerVideo.webkitRequestFullscreen) {
            this.playerVideo.webkitRequestFullscreen();
            this.playerVideo.muted = false;
            this.playVideo();
        }
    }

    closeFullscreen() {
        if (this.playerVideo.exitFullscreen) {
            this.playerVideo.exitFullscreen();
        } else if (this.playerVideo.webkitExitFullscreen) {
            this.playerVideo.webkitExitFullscreen();
        }

        const exitFullscreenEvent = new Event('exitFullscreen');
        this.playerElement.dispatchEvent(exitFullscreenEvent);
    }

    isIOS() {
        return (
            [
                'iPad Simulator',
                'iPhone Simulator',
                'iPod Simulator',
                'iPad',
                'iPhone',
                'iPod',
            ].includes(navigator.platform) ||
            // iPad on iOS 13 detection
            (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
        );
    }
}

export default Player;
