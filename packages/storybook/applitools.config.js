const batchName = `${process.env.TRAVIS_COMMIT || 'manual'} - ${process.env.BATCH || 'unknown'}`

module.exports = {
  appName: 'vuetify-test',
  batchName,
  browser: [
    { width: 1024, height: 768, name: 'chrome' },
    { width: 1920, height: 1080, name: 'chrome' }
  ],
  waitBeforeScreenshots: 200
}
