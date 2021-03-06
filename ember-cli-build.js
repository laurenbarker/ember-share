'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Autoprefixer = require('autoprefixer');
const CSSNano = require('cssnano');


module.exports = function(defaults) {
    // Values chosen abritrarily, feel free to change
    const LEAN_BUILD = ['production'].includes(EmberApp.env());

    const app = new EmberApp(defaults, {
        'ember-font-awesome': {
            useScss: true,
        },
        'ember-bootstrap': {
            bootstrapVersion: 3,
            importBootstrapCSS: false,
            importBootstrapFont: false,
        },
        sassOptions: {
            includePaths: [
                'node_modules/font-awesome/scss',
                'node_modules/@centerforopenscience/osf-style/css',
                'node_modules/bootstrap-daterangepicker',
                'node_modules/c3',
            ],
        },
        inlineContent: {
            raven: {
                enabled: LEAN_BUILD,
                content: `
                    <script src="https://cdn.ravenjs.com/3.22.1/ember/raven.min.js"></script>
                    <script>
                        var encodedConfig = document.head.querySelector("meta[name$='/config/environment']").content;
                        var config = JSON.parse(unescape(encodedConfig));
                        if (config.sentryDSN) {
                            Raven.config(config.sentryDSN, config.sentryOptions || {}).install();
                        }
                    </script>
                `.trim().replace(/^\s{16}/gm, ''),
            },
        },
        'ember-cli-babel': {
            includePolyfill: true,
        },
        postcssOptions: {
            // Doesn't agree with SCSS; must be disabled
            compile: { enabled: false },
            filter: {
                browsers: ['last 4 versions'],
                enabled: LEAN_BUILD,
                include: ['**/*.css'],
                plugins: [{
                    module: Autoprefixer,
                }, {
                    module: CSSNano,
                }],
            },
        },
        babel: {
            optional: ['es6.spec.symbols'],
        },
    });

    // Use `app.import` to add additional libraries to the generated
    // output files.
    //
    // If you need to use different assets in different
    // environments, specify an object as the first parameter. That
    // object's keys should be the environment name and the values
    // should be the asset to use in that environment.
    //
    // If the library that you are including contains AMD or ES6
    // modules that you would like to import into your application
    // please specify an object with the list of modules as keys
    // along with the exports of each module as its value.

    app.import('node_modules/bootstrap-daterangepicker/daterangepicker.js');
    app.import('node_modules/d3/d3.js');
    app.import('node_modules/c3/c3.js');

    return app.toTree();
};
