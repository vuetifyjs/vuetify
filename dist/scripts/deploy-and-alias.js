"use strict";
var shell = require('shelljs');
var alias = process.argv[2];
if (!alias) {
    console.error('Alias not defined');
    process.exit(1);
}
var options = {
    env: process.env
};
var child = shell.exec('now --team=vuetifyjs --token=$NOW_TOKEN --npm', options);
if (child.code !== 0) {
    process.exit(child.code);
}
var instanceUrl = child.stdout;
shell.exec("now alias set " + instanceUrl + " " + alias + " --team=vuetifyjs --token=$NOW_TOKEN", options);
//# sourceMappingURL=deploy-and-alias.js.map