const initOffcanvas = () => {
    const offcanvas = document.getElementById('offcanvas');
    const offcanvasToggle = document.getElementById('offcanvas-toggle');

    if (!offcanvas || !offcanvasToggle) {
        return;
    }

    const hideOffcanvas = () => {
        offcanvas.setAttribute('aria-hidden', true);
        offcanvasToggle.setAttribute('aria-expanded', false);
    };

    if (window.device.isLaptop || window.device.isDesktop) {
        hideOffcanvas();
    }

    window.device.laptopMatchMedia.addEventListener('change', (event) => {
        if (event.matches) {
            hideOffcanvas();
        }
    });
};

export default initOffcanvas;
