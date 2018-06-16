import VBottomNav from '@/components/VBottomNav'
import VBtn from '@/components/VBtn'
import { test } from '@/test'
import Vue from 'vue'

function createBtn (val = null) {
  const options = {
    props: { flat: true }
  }
  if (val) options.attrs = { value: val }

  return Vue.component('test', {
    render (h) {
      return h(VBtn, options)
    }
  })
}

test('VBottomNav.js', ({ mount }) => {
  it('should have a v-bottom-nav class', () => {
    const wrapper = mount(VBottomNav, {
      slots: {
        default: [VBtn, VBtn]
      }
    })

    expect(wrapper.classes()).toContain('v-bottom-nav')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have prop classes', () => {
    const wrapper = mount(VBottomNav, {
      propsData: {
        absolute: true,
        shift: true
      },
      slots: {
        default: [VBtn, VBtn]
      }
    })

    expect(wrapper.classes()).toContain('v-bottom-nav--absolute')
    expect(wrapper.classes()).toContain('v-bottom-nav--shift')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be hidden with a false value', () => {
    const wrapper = mount(VBottomNav, {
      propsData: { value: false },
      slots: {
        default: [VBtn, VBtn]
      }
    })

    expect(wrapper.classes()).not.toContain('v-bottom-nav--active')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be visible with a true value', () => {
    const wrapper = mount(VBottomNav, {
      propsData: { value: true },
      slots: {
        default: [VBtn, VBtn]
      }
    })

    expect(wrapper.classes()).toContain('v-bottom-nav--active')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should output active v-btn when clicked', () => {
    const wrapper = mount(VBottomNav, {
      propsData: { value: true, active: 1 },
      slots: {
        default: [
          createBtn(),
          createBtn()
        ]
      }
    })

    const btn = wrapper.find('.v-btn')

    const change = jest.fn()
    wrapper.vm.$on('update:active', change)

    btn.trigger('click')
    expect(change).toBeCalledWith(0)
  })

  it('should set the application bottom', () => {
    const wrapper = mount(VBottomNav, {
      propsData: {
        app: true,
        height: 80,
        value: true
      },
      slots: {
        default: [VBtn, VBtn]
      }
    })

    expect(wrapper.vm.$vuetify.application.bottom).toBe(80)
  })

  it('should emit update when active changes', async () => {
    const update = jest.fn()
    const wrapper = mount(VBottomNav, {
      slots: {
        default: [VBtn, VBtn]
      }
    })

    wrapper.vm.$on('update:active', update)

    const btn = wrapper.findAll('.v-btn')[1]
    btn.trigger('click')

    await wrapper.vm.$nextTick()
    expect(update).toBeCalledWith(1)
  })
})
