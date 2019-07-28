import Routable from '../'
import { mount } from '@vue/test-utils'

describe('routable.ts', () => {
  it('should generate exact route link with to="/" and undefined exact', async () => {
    const wrapper = mount({
      mixins: [Routable],
      render: h => h('div'),
    }, {
      propsData: {
        to: '/',
      },
    })

    expect(wrapper.vm.generateRouteLink().data.props.exact).toBe(true)
  })
})
