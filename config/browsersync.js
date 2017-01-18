const bs = require('browser-sync').create();
const fs = require('fs');
const config = require('./storyblok.js');

// .init starts the server
bs.init({
    port: 4200,
    serveStatic: ['./views'],
    proxy: {
      target: 'https://' + config.blok.domain,
      reqHeaders: function (config) {
        return {
          'accept-encoding': 'identity',
          'agent': false,
          'browsersyncblok': true
        }
      }
    },
    https: fs.existsSync('./cert.js') ? require('./cert') : false,
    reloadDelay: 1000,
    notify: true,
    open: true,
    logLevel: 'silent'
});
