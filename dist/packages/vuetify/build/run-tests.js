'use strict';
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var spawn = require('child_process').spawn;
var args = process.argv.slice(2);
var child;
if (process.platform === 'win32') {
    // yarn test -i
    child = spawn('yarn.cmd', __spread(['test:win32'], args), { stdio: 'inherit' });
}
else {
    // yarn test
    child = spawn('yarn', __spread(['test:unix'], args), { stdio: 'inherit' });
}
child.on('exit', process.exit);
//# sourceMappingURL=run-tests.js.map