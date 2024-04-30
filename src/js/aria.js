const initAria = () => {
  const expanders = document.querySelectorAll(
    "[aria-expanded]:not([data-bs-toggle])",
  );

  const toggleExpander = (toggle) => {
    const target = toggle.getAttribute("aria-controls");
    const targetContainer = document.getElementById(target);
    const toggleExpandedText = toggle.getAttribute("data-expanded-text");
    const toggleCollapsedText = toggle.getAttribute("data-collapsed-text");
    const toggleTargetInject =
      toggle.querySelector("[data-target-inject]") || toggle;
    const isExpanded = toggle.getAttribute("aria-expanded") === "true";
    const expand = () => {
      toggle.setAttribute("aria-expanded", true);
      if (toggleCollapsedText) {
        toggleTargetInject.textContent = toggleCollapsedText;
      }
      if (targetContainer) {
        targetContainer.setAttribute("aria-hidden", false);
        targetContainer.focus();
      }
    };
    const collapse = () => {
      toggle.setAttribute("aria-expanded", false);
      if (toggleExpandedText) {
        toggleTargetInject.textContent = toggleExpandedText;
      }
      if (targetContainer) {
        targetContainer.setAttribute("aria-hidden", true);
      }
    };
    isExpanded ? collapse() : expand();
  };
  expanders.forEach((expander) => {
    expander.addEventListener("click", () => {
      toggleExpander(expander);
    });
  });
};

export default initAria;
