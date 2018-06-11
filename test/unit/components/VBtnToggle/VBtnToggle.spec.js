import { test } from '@/test'
import VBtnToggle from '@/components/VBtnToggle'
import VBtn from '@/components/VBtn'
import VIcon from '@/components/VIcon'
import Vue from 'vue'

function createBtn (val = null, buttonProps = {}) {
  const options = {
    props: Object.assign({ flat: true }, buttonProps)
  }
  if (val) options.attrs = { value: val }

  return Vue.component('test', {
    render (h) {
      return h(VBtn, options, [h(VIcon, 'add')])
    }
  })
}

function createFakeBtn() {
  return Vue.component('v-btn', {
    inject: ['buttonGroup'],
    methods: {
      testUnregister() {
        this.buttonGroup.unregister(this)
      }
    },
    mounted() {
      this.buttonGroup.register(this)
    },
    render (h) {
      return h('div')
    }
  })
}

test('VBtnToggle.vue', ({ mount }) => {
  it('should not allow empty value when mandatory prop is used', async () => {
    const wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: 0,
        mandatory: true
      },
      slots: {
        default: [
          createBtn(),
          createBtn(),
          createBtn()
        ]
      }
    })

    const change = jest.fn()
    wrapper.instance().$on('change', change)

    wrapper.instance().updateValue(0)

    await wrapper.vm.$nextTick()

    expect(change).not.toBeCalled()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should allow new value when mandatory prop is used', async () => {
    const wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: 1,
        mandatory: true
      },
      slots: {
        default: [
          createBtn(),
          createBtn(),
          createBtn()
        ]
      }
    })

    const change = jest.fn()
    wrapper.instance().$on('change', change)

    wrapper.instance().updateValue(0)

    await wrapper.vm.$nextTick()

    expect(change).toBeCalledWith(0)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should not allow empty value when mandatory prop is used with multiple prop', async () => {
    const wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: [1],
        mandatory: true,
        multiple: true
      },
      slots: {
        default: [
          createBtn(),
          createBtn(),
          createBtn()
        ]
      }
    })

    const change = jest.fn()
    wrapper.instance().$on('change', change)

    wrapper.instance().updateValue(1)

    await wrapper.vm.$nextTick()

    expect(change).not.toBeCalled()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should allow new value when mandatory prop is used with multiple prop', async () => {
    const wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: [1],
        mandatory: true,
        multiple: true
      },
      slots: {
        default: [
          createBtn(),
          createBtn(),
          createBtn()
        ]
      }
    })

    const change = jest.fn()
    wrapper.instance().$on('change', change)

    wrapper.instance().updateValue(2)

    await wrapper.vm.$nextTick()

    expect(change).toBeCalledWith([1, 2])
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should use button value attribute if available', async () => {
    const wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: 'center'
      },
      slots: {
        default: [
          createBtn('left'),
          createBtn('center'),
          createBtn('right')
        ]
      }
    })

    const change = jest.fn()
    wrapper.instance().$on('change', change)

    wrapper.instance().updateValue(2)

    await wrapper.vm.$nextTick()

    expect(change).toBeCalledWith('right')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should allow deselecting a value when mandatory prop is used with multiple prop', async () => {
    const wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: [1, 2],
        mandatory: true,
        multiple: true
      },
      slots: {
        default: [
          createBtn(),
          createBtn(),
          createBtn()
        ]
      }
    })

    const change = jest.fn()
    wrapper.instance().$on('change', change)

    wrapper.instance().updateValue(2)

    await wrapper.vm.$nextTick()

    expect(change).toBeCalledWith([1])
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should preserve mandatory invariant when selected child is unregistered', async () => {
    const wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: 1,
        mandatory: true
      },
      slots: {
        default: [
          createBtn(),
          createFakeBtn()
        ]
      }
    })

    const change = jest.fn()
    wrapper.instance().$on('change', change)

    wrapper.vm.$children[1].testUnregister()
    wrapper.update()

    await wrapper.vm.$nextTick()

    expect(change).toBeCalledWith(0)
  })

  it('should not set new value when not mandatory and selected child is unregistered', async () => {
    const wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: 1,
      },
      slots: {
        default: [
          createBtn(),
          createFakeBtn()
        ]
      }
    })

    const change = jest.fn()
    wrapper.instance().$on('change', change)

    wrapper.vm.$children[1].testUnregister()
    wrapper.update()

    await wrapper.vm.$nextTick()

    expect(change).not.toBeCalled()
  })

  it('should have v-btn with data-only-child if only one selected', async () => {
    const wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: 0
      },
      slots: {
        default: [
          createBtn(),
          createBtn()
        ]
      }
    })

    const btn = wrapper.find('.v-btn')[0]

    expect(btn.getAttribute('data-only-child')).toBe('true')
  })

  it('should toggle values of any type', async () => {
    const values = [true, false, null, 6, 'foo', { key: 'value' }, ['arrayyy']]
    const verifyValues = [true, 1, 2, 6, 'foo', { key: 'value' }, ['arrayyy']]
    const buttons = values.map(v => createBtn(v))
    const wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: null
      },
      slots: { default: buttons }
    })

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    wrapper.find('button').forEach((button, i) => {
      button.trigger('click')

      expect(change).toBeCalledWith(verifyValues[i])
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should toggle active state of button', async () => {
    const wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: 'foo'
      },
      slots: {
        default: [
          createBtn('foo', { color: 'error' }),
          createBtn('bar', { color: 'success' })
        ]
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.buttons[0].$data.isActive).toBe(true)
    expect(wrapper.vm.buttons[1].$data.isActive).toBe(false)

    wrapper.setProps({ inputValue: 'bar' })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.buttons[0].$data.isActive).toBe(false)
    expect(wrapper.vm.buttons[1].$data.isActive).toBe(true)
  })

  it('should warn if mandatory is used without any buttons', async () => {
    const wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: '',
        mandatory: true
      }
    })

    expect('There must be at least one v-btn child if the mandatory property is true.').toHaveBeenTipped()
  })

  it('should warn about model binding type not being array if multiple is true', async () => {
    const wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: '',
        multiple: true
      }
    })

    expect('Model must be bound to an array if the multiple property is true.').toHaveBeenTipped()
  })
})
