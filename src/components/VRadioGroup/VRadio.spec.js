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

  it('should render role and aria-checked attributes on input group', () => {
    const wrapper = mount(VRadio, {
      data: {
        isActive: false
      }
    })

    let inputGroup = wrapper.find('.input-group')[0]
    expect(inputGroup.getAttribute('role')).toBe('radio')
    expect(inputGroup.getAttribute('aria-checked')).toBe('false')

    wrapper.setData({ 'isActive': true })
    inputGroup = wrapper.find('.input-group')[0]
    expect(inputGroup.getAttribute('aria-checked')).toBe('true')

    expect('immediate parent of v-radio-group').toHaveBeenTipped()
    expect('Injection').toHaveBeenWarned() // TODO: testing library needs injection mock support
  })

  it('should render aria-label attribute with label value on input group', () => {
    const wrapper = mount(VRadio, {
      propsData: {
        label: 'Test'
      },
      attrs: {}
    })

    const inputGroup = wrapper.find('.input-group')[0]
    expect(inputGroup.getAttribute('aria-label')).toBe('Test')

    expect('immediate parent of v-radio-group').toHaveBeenTipped()
    expect('Injection').toHaveBeenWarned() // TODO: testing library needs injection mock support
  })

  it('should not render aria-label attribute with no label value on input group', () => {
    const wrapper = mount(VRadio, {
      propsData: {
        label: null
      }
    })

    const inputGroup = wrapper.find('.input-group')[0]
    expect(inputGroup.element.getAttribute('aria-label')).toBeFalsy()

    expect('immediate parent of v-radio-group').toHaveBeenTipped()
    expect('Injection').toHaveBeenWarned() // TODO: testing library needs injection mock support
  })
})
