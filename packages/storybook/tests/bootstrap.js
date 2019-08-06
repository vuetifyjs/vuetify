import Eyes from '@applitools/eyes-testcafe'

const batchId = Math.random().toString(36).slice(2, 9);

const fixture = (...args) => global.fixture(...args)
const test = (...args) => global.test(...args)

export default function setup(fixtureName, storyUrl, callback) {
  const eyes = new Eyes()

  fixture(fixtureName)
    .page(`http://localhost:6006/?path=/story/${storyUrl}`)
    .beforeEach(async t => {
      await eyes.open({
        testName: `${t.testRun.test.testFile.currentFixture.name}: ${t.testRun.test.name}`,
        batchId,
        t
      })

      await t.switchToIframe('#storybook-preview-iframe')
    })
    .afterEach(async () => {
      eyes.close()
    })
    .after(async () => eyes.waitForResults())

  callback((name, cb) => test(name, async t => cb(t, eyes)))
}
