import { test } from '~util/testing'
import VSlider from './VSlider'

const warning = 'The v-slider component requires the present of v-app or a non-body wrapping element with the [data-app] attribute.'
test('Vslider.vue', ({ mount }) => {
  it('shoud work', () => {
    const wrapper = mount(VSlider)

    expect(wrapper.html()).toMatchSnapshot()
    expect(warning).toHaveBeenTipped()
  })
})
