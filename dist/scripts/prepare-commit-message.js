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
var _a = __read(process.env.HUSKY_GIT_PARAMS.split(' '), 3), messageFile = _a[0], commitType = _a[1], commitHash = _a[2];
if (commitType == null) {
    var currentMessage = fs.readFileSync(messageFile);
    var newMessage = fs.readFileSync('.github/.git_commit_msg.txt');
    fs.writeFileSync(messageFile, newMessage);
    fs.appendFileSync(messageFile, currentMessage);
}
//# sourceMappingURL=prepare-commit-message.js.map