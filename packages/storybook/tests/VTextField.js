import setup from "./bootstrap"

setup('VTextField', 'vtextfield--default', test => {
  test('should focus on click', async (t, eyes) => {
    await eyes.checkWindow('Base')
    await t.click('.v-text-field input')
    await eyes.checkWindow('Click')
  })
})
