require('ts-node').register({ transpileOnly: true });
const run = require('./worker.ts');

module.exports = run.default;
