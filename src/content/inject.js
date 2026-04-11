(function() {
    const originalFetch = window.fetch;

    window.fetch = function(...args) {
        return originalFetch.apply(this, args);
    };
})();