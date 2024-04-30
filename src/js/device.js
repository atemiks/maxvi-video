const initDevice = () => {
    const phoneQuery = '(max-width: 479px)';
    const phabletQuery = '(min-width: 480px) and (max-width: 639px)';
    const tabletQuery = '(min-width: 640px) and (max-width: 991px)';
    const laptopQuery = '(min-width: 992px) and (max-width: 1199px)';
    const desktopQuery = '(min-width: 1200px)';

    const phoneMatchMedia = window.matchMedia(phoneQuery);
    const phabletMatchMedia = window.matchMedia(phabletQuery);
    const tabletMatchMedia = window.matchMedia(tabletQuery);
    const laptopMatchMedia = window.matchMedia(laptopQuery);
    const desktopMatchMedia = window.matchMedia(desktopQuery);

    phoneMatchMedia.addEventListener('change', (event) => {
        window.device.isPhone = event.matches;
    });

    phabletMatchMedia.addEventListener('change', (event) => {
        window.device.isPhablet = event.matches;
    });

    tabletMatchMedia.addEventListener('change', (event) => {
        window.device.isTablet = event.matches;
    });

    laptopMatchMedia.addEventListener('change', (event) => {
        window.device.isLaptop = event.matches;
    });

    desktopMatchMedia.addEventListener('change', (event) => {
        window.device.isDesktop = event.matches;
    });

    window.device = {
        phoneMatchMedia,
        phabletMatchMedia,
        tabletMatchMedia,
        laptopMatchMedia,
        desktopMatchMedia,
        isPhone: phoneMatchMedia.matches,
        isPhablet: phabletMatchMedia.matches,
        isTablet: tabletMatchMedia.matches,
        isLaptop: laptopMatchMedia.matches,
        isDesktop: desktopMatchMedia.matches,
    };
};

export default initDevice;
