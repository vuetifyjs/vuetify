import Vue from 'vue'
import { test } from '@/test'
import Elevatable from '@/mixins/elevatable'

test('elevatable.js', ({ mount }) => {
  it('generate elevation classes', () => {
    const wrapper = mount({
      mixins: [ Elevatable ],
      render: h => h('div')
    })

    expect(wrapper.vm.computedElevation).toBe(undefined)
    expect(wrapper.vm.elevationClasses).toEqual({})

    wrapper.setProps({ elevation: 1 })
    expect(wrapper.vm.computedElevation).toBe(1)
    expect(wrapper.vm.elevationClasses).toEqual({
      'elevation-1': true
    })

    wrapper.setProps({ elevation: '12' })
    expect(wrapper.vm.computedElevation).toBe('12')
    expect(wrapper.vm.elevationClasses).toEqual({
      'elevation-12': true
    })

  })
})
