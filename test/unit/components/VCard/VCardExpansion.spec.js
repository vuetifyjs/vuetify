import { test } from '@/test'
import { VCardExpansion } from '@/components/VCard'

test('VCardExpansion.js', ({ mount }) => {
  it('should render dropdown class', () => {
    const wrapper = mount(VCardExpansion, {
      slots: {
        default: [{
          render: h => h('div', {
            staticClass: 'fake-text'
          })
        }]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with cover class', () => {
    const wrapper = mount(VCardExpansion, {
      propsData: {
        cover: true
      },
      slots: {
        default: [{
          render: h => h('div', {
            staticClass: 'fake-text'
          })
        }]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should warn if nothing is provided in slot', () => {
    const wrapper = mount(VCardExpansion)
    const warningTip = '[Vuetify] no text was provided in "v-card-expansion"'

    expect(warningTip).toHaveBeenTipped()
  })
})
