module.exports = {
  cliOptions: {
    ext: ['.js', '.ts', '.tsx', '.vue'],
    maxWarnings: 0,
    fix: process.env.JEST_FIX === 'true',
  },
}
