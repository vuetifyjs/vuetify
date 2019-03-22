"use strict";
var shell = require('shelljs');
var target = process.argv[2];
var alias = {
    docs: 'vuetifyjs.com'
};
target = alias[target] || target;
if (!target) {
    shell.exec('lerna run dev --scope vuetify --stream');
}
else {
    shell.exec("lerna run dev --scope " + target + " --stream");
}
//# sourceMappingURL=dev.js.map