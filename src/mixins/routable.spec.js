import Vue from 'vue'
import { test } from '~util/testing'
import { mount } from 'avoriaz'
import Routable from '~mixins/routable'

test('applicationable.js', () => {
  it('should generate exact route link with to="/" and undefined exact', async () => {
    const wrapper = mount({
      mixins: [ Routable ],
      render: h => h('div')
    }, {
      propsData: {
        to: '/',
        exact: undefined
      }
    })

    expect(wrapper.vm.generateRouteLink().data.props.exact).toBe(true)
  })
})
