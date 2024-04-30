const initSearch = () => {
    const search = document.getElementById('header-search-popup');
    const searchToggle = document.getElementById('header-search-toggle');
    const searchInput = search.querySelector('input');
    const searchSuggestions = document.getElementById(
        'header-search-suggestion'
    );

    if (!(search || searchToggle)) {
        return;
    }

    const showSearch = () => {
        search.setAttribute('aria-hidden', false);
        searchToggle.setAttribute('aria-expanded', true);
    };

    const hideSearch = () => {
        search.setAttribute('aria-hidden', true);
        searchToggle.setAttribute('aria-expanded', false);
    };

    const showSuggestions = () => {
        searchSuggestions.setAttribute('aria-hidden', false);
    };

    const hideSuggestions = () => {
        searchSuggestions.setAttribute('aria-hidden', true);
    };

    if (window.device.isLaptop || window.device.isDesktop) {
        showSearch();
    }

    window.device.laptopMatchMedia.addEventListener('change', (event) => {
        event.matches ? showSearch() : hideSearch();
    });

    window.device.desktopMatchMedia.addEventListener('change', (event) => {
        if (event.matches) {
            showSearch();
        }
    });

    document.addEventListener('click', (event) => {
        const { target } = event;

        if (target.getAttribute('id') === 'header-search-popup') {
            hideSearch();
            return;
        }
    });

    searchInput.addEventListener('input', (event) => {
        const valueLength = event.target.value.length;

        valueLength ? showSuggestions() : hideSuggestions();
    });
};

export default initSearch;
