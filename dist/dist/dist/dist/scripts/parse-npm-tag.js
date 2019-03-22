"use strict";
var semver = require('semver');
var version = process.argv[2];
if (!semver.valid(version)) {
    console.error("Error: '" + version + "' is not a valid NPM version string");
    process.exit(9);
}
var prerelease = semver.prerelease(version);
if (prerelease == null) {
    console.log('latest');
}
else {
    console.log('next');
}
//# sourceMappingURL=parse-npm-tag.js.map