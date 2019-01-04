import Vue from 'vue'
import { test } from '@/test'
import LinearGradient from '@/directives/linear-gradient'

test('VLinearGradient', ({ mount }) => {
  it('LinearGradient should render element with linear gradient', () => {
    const testComponent = Vue.component('test', {
      directives: {
        LinearGradient
      },
      render (h){
        const data = {
          directives: [{
            name: 'linear-gradient',
            value: {
              angle: 45,
              stops: [
                {
                  color: "#42f4e5",
                  percent: 20
                },
                {
                  color: "#409ced"
                }
              ]
            }
          }],
          style: {
            width: "200px",
            height: "200px"
          }
        }
        return h('div', data)
      }
    })

    const wrapper = mount(testComponent)

    expect(wrapper.html).toMatchSnapshot()
  })
})
