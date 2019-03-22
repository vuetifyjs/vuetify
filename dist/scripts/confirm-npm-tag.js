"use strict";
var semver = require('semver');
var shell = require('shelljs');
var inquirer = require('inquirer');
var version = require('../lerna.json').version;
function exec(command) {
    var result = shell.exec(command, { silent: true });
    if (result.code) {
        shell.echo('');
        console.error(result.stdout.trim());
        shell.exit(1);
    }
    return result.stdout.trim();
}
var branch = exec('git symbolic-ref --short HEAD');
var tag = semver.prerelease(version) == null ? 'latest' : 'next';
shell.echo("Releasing " + version + " on " + branch);
shell.echo("Tag: " + tag);
inquirer.prompt({
    type: 'confirm',
    name: 'yes',
    message: 'Are you sure?',
    default: true
}).then(function (_a) {
    var yes = _a.yes;
    return yes || shell.exit(1);
});
//# sourceMappingURL=confirm-npm-tag.js.map