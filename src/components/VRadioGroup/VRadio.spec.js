import { test } from '~util/testing'
import { /* VRadioGroup, */ VRadio } from '~components/VRadioGroup'

test('VRadio.vue', ({ mount }) => {
  it('should advise about v-radio-group being necessary', () => {
    mount(VRadio)

    expect('immediate parent of v-radio-group').toHaveBeenTipped()
    expect('Injection').toHaveBeenWarned() // TODO: testing library needs injection mock support
  })

  // TODO: Enable test when there's a way to test $parent.$vnode.tag
  // it('should not advise about v-radio-group being necessary in VRadioGroup', () => {
  //   const wrapper = mount(VRadioGroup, {
  //     slots: {
  //       default: [VRadio]
  //     }
  //   })
  //   // no expectation other than a lack of tip
  // })
})
