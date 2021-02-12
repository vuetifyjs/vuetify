'use strict'
const shell = require('shelljs')

shell.rm('-rf', 'lib')
shell.exec('yarn run cross-env NODE_ENV=lib babel src --out-dir lib --ignore "**/__tests__" --source-maps --extensions ".ts",".tsx",".snap" --copy-files --no-copy-ignored --out-file-extension .mjs')
