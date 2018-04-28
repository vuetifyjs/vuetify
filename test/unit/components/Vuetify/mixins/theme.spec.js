import theme from '@/components/Vuetify/mixins/theme'
import options from '@/components/Vuetify/mixins/options'
import { test } from '@/test'

test('theme.js', ({ mount }) => {
  const Mock = (o = {}, t = {}) => ({
    mixins: [
      options(o),
      theme(t)
    ],
    render: () => null
  })

  it('should watch theme', async () => {
    const wrapper = mount(Mock())

    expect(wrapper.vm.style).toMatchSnapshot()
    wrapper.vm.$vuetify.theme.primary = '#000'
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.style).toMatchSnapshot()
  })
})
