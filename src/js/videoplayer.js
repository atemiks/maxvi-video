import Player from '/src/js/player';

const initPlayer = () => {
    const players = document.querySelectorAll('.player');

    players.forEach((player) => {
        const video = player.querySelector('video');
        const autoPlay = player.getAttribute('data-video-autoplay') === 'true';
        const downloadUrl = player.getAttribute('data-video-download-url');

        if (!video) {
            return;
        }

        new Player(player, { autoPlay, downloadUrl });
    });
};

export default initPlayer;
