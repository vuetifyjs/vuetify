import Vue from 'vue'
import VApp from '@/components/VApp'
import { test } from '@/test'

test('VApp.js', ({ mount }) => {
  it('should match a snapshot', () => {
    const wrapper = mount(VApp)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have data-app attribute', () => {
    const wrapper = mount(VApp)
    const app = wrapper.find('.application')[0]

    expect(app.getAttribute('data-app')).toBe('true')
  })

  it('should allow a custom id', () => {
    const wrapper = mount(VApp, {
      propsData: {
        id: 'inspire'
      }
    })
    const app = wrapper.find('.application')[0]

    expect(app.getAttribute('id')).toBe('inspire')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
