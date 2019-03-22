"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var fs = require('fs');
var reset = '\x1b[0m';
var red = '\x1b[31m';
var _a = __read(process.env.HUSKY_GIT_PARAMS.split(' '), 1), messageFile = _a[0];
var currentMessage = fs.readFileSync(messageFile, 'utf8').replace(/^# ------------------------ >8 ------------------------[\s\S]*$|^#.*\n/gm, '');
var errors = [];
function check(message, cb) {
    if (cb(currentMessage)) {
        errors.push(message);
    }
}
check('Whitespace at beginning of message', function (m) { return /^\s/.test(m); });
check('Title is too long. limit to 72 chars', function (m) { return m.trim().split(/\r?\n/, 1)[0].length > 72; });
check('Title and body must be separated by a blank line', function (m) {
    var s = m.trim().split(/\r?\n/, 3);
    return s[1] != null && !!s[1].length;
});
if (errors.length) {
    var s = errors.length > 1 ? 's' : '';
    console.log();
    console.log(red + ("Error" + s + " in commit message:") + reset);
    errors.forEach(function (err) {
        console.log('  - ' + err);
    });
    console.log();
    console.log('-'.repeat(72));
    console.log('Original message:');
    console.log('='.repeat(72));
    console.log(currentMessage.trimRight());
    console.log('='.repeat(72));
    process.exit(1);
}
//# sourceMappingURL=lint-commit-message.js.map