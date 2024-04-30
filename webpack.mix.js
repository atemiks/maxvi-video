let mix = require('laravel-mix');

// mix.js('src/app.js', 'dist').setPublicPath('dist');

mix.sass('src/scss/app.scss', 'public/css/').options({
    processCssUrls: false,
});

mix.js('src/js/app.js', 'public/js/app.js');

mix.browserSync({
    files: ['./**/*'],
    server: {
        baseDir: 'public',
        index: 'index.html',
    },
});

mix.disableSuccessNotifications();
