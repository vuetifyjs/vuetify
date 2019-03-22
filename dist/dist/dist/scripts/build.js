"use strict";
var shell = require('shelljs');
var target = process.argv[2];
var alias = {
    api: '@vuetify/api-generator',
    docs: 'vuetifyjs.com'
};
target = alias[target] || target;
if (!target) {
    shell.exec('lerna run build --stream');
}
else {
    shell.exec("lerna run build --scope " + target + " --stream");
}
//# sourceMappingURL=build.js.map