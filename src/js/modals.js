import { Modal } from "bootstrap";
import Player from "/src/js/player";

const initModals = () => {
  const initVideoModal = () => {
    const modalNode = document.querySelector("#modal-video");

    if (modalNode) {
      const modalInstance = new Modal(modalNode);
      const playerNode = modalNode.querySelector(".player");

      const initPlayer = ({
        playerNode,
        videoUrl,
        videoPoster,
        videoDownloadUrl,
      }) => {
        const video = document.createElement("video");
        const source = document.createElement("source");

        source.setAttribute("src", videoUrl);
        source.setAttribute("type", "video/mp4");
        video.setAttribute("poster", videoPoster);
        video.setAttribute("playsinline", "");
        video.appendChild(source);
        playerNode.appendChild(video);

        const playerInstance = new Player(playerNode, {
          autoPlay: true,
          downloadUrl: videoDownloadUrl,
        });

        if (window.isPhone || window.isPhablet) {
          playerInstance.openFullscreen();

          playerNode.addEventListener("exitFullscreen", () => {
            modalInstance.hide();
          });
        }
      };

      const destroyPlayer = ({ playerNode }) => {
        playerNode.innerHTML = "";
      };

      modalNode.addEventListener("show.bs.modal", (event) => {
        const toggle = event.relatedTarget;
        const videoUrl = toggle.getAttribute("data-video-url");
        const videoPoster = toggle.getAttribute("data-video-poster");
        const videoDownloadUrl = toggle.getAttribute("data-video-download-url");

        initPlayer({
          playerNode,
          videoUrl,
          videoPoster,
          videoDownloadUrl,
        });
      });

      modalNode.addEventListener("hidden.bs.modal", () => {
        destroyPlayer({ playerNode });
      });
    }
  };

  initVideoModal();
};

export default initModals;
