import Vue from 'vue'
import { test } from '@/test'
import Routable from '@/mixins/routable'

test('routable.js', ({ mount }) => {
  it('should generate exact route link with to="/" and undefined exact', async () => {
    const wrapper = mount({
      mixins: [ Routable ],
      render: h => h('div')
    }, {
      propsData: {
        to: '/'
      }
    })

    expect(wrapper.vm.generateRouteLink().data.props.exact).toBe(true)
  })
})
