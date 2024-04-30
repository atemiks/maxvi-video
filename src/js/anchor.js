const initAnchor = () => {
  const anchors = document.querySelectorAll("[data-anchor]");

  anchors.forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const { target } = event;
      const targetName = target.getAttribute("data-anchor");
      const targetContainer = document.querySelector(targetName);

      if (targetContainer) {
        const header = document.querySelector(".header-box");
        const headerHeight = header.offsetHeight;
        const targetContainerOffset = targetContainer.offsetTop;

        window.scrollTo({
          top: targetContainerOffset - headerHeight,
          behavior: "smooth",
        });
      }
    });
  });
};

export default initAnchor;
