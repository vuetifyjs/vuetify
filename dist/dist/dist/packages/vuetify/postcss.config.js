"use strict";
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
module.exports = function (ctx) {
    return ({
        plugins: [
            autoprefixer({
                browsers: ['>0.5%', 'last 2 versions', 'not dead', 'not op_mini all']
            }),
            mqpacker()
        ]
    });
};
//# sourceMappingURL=postcss.config.js.map