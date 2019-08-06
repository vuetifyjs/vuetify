import setup from "./bootstrap"

setup('VTabs', 'vtabs--default', test => {
  test('render', async (_, eyes) => {
    await eyes.checkWindow('Base')
  })

  test('switch tab', async (t, eyes) => {
    await eyes.checkWindow('Base')
    await t.click('#bar')
    await eyes.checkWindow('Click')
  })
})
