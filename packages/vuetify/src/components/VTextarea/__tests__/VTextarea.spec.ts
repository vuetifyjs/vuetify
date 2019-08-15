import { keyCodes } from '../../../util/helpers'
import VTextarea from '../VTextarea'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

describe('VTextarea.ts', () => {
  type Instance = InstanceType<typeof VTextarea>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VTextarea, options)
    }
  })

  it('should calculate element height when using auto-grow prop', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        value: '',
        autoGrow: true,
      },
    })
    const input = jest.fn(value => wrapper.setProps({ value }))
    wrapper.vm.$on('input', input)

    const el = wrapper.findAll('textarea').at(0)

    el.trigger('focus')
    await wrapper.vm.$nextTick()
    el.element.value = 'this is a really long text that should hopefully make auto-grow kick in. maybe?'.replace(/\s/g, '\n')
    el.trigger('input')
    await wrapper.vm.$nextTick()

    // TODO: switch to e2e, jest doesn't do inline styles
    expect(wrapper.html()).toMatchSnapshot()
    expect(el.element.style.getPropertyValue('height').length).not.toBe(0)
  })

  it('should watch lazy value', async () => {
    const wrapper = mountFunction()

    const calculateInputHeight = jest.fn()
    wrapper.setMethods({ calculateInputHeight })

    wrapper.vm.lazyValue = 'foo'

    expect(calculateInputHeight).not.toHaveBeenCalled()

    wrapper.setProps({ autoGrow: true })

    wrapper.vm.lazyValue = 'bar'

    // wait for watcher
    await wrapper.vm.$nextTick()

    expect(calculateInputHeight).toHaveBeenCalled()
  })

  it('should calculate height on mounted', async () => {
    const calculateInputHeight = jest.fn()

    mountFunction({
      attachToDocument: true,
      propsData: {
        autoGrow: true,
      },
      methods: { calculateInputHeight },
    })

    await new Promise(resolve => setTimeout(resolve, 0))
    expect(calculateInputHeight).toHaveBeenCalled()
  })

  it('should stop propagation', async () => {
    const wrapper = mountFunction()

    const stopPropagation = jest.fn()
    const onKeyDown = {
      keyCode: keyCodes.enter,
      stopPropagation,
    }
    wrapper.vm.onKeyDown(onKeyDown)

    expect(stopPropagation).not.toHaveBeenCalled()

    wrapper.setData({ isFocused: true })

    wrapper.vm.onKeyDown(onKeyDown)

    expect(stopPropagation).toHaveBeenCalled()
  })

  it('should render no-resize the same if already auto-grow', () => {
    const wrappers = [
      { autoGrow: true, outlined: false },
      { autoGrow: true, outlined: true },
    ].map(propsData => mountFunction({ propsData }))

    wrappers.forEach(async wrapper => {
      await wrapper.vm.$nextTick()
      const html1 = wrapper.html()

      wrapper.setProps({ noResize: true })
      // will still pass without this, do not remove
      await wrapper.vm.$nextTick()
      const html2 = wrapper.html()

      expect(html2).toBe(html1)
    })
  })

  it('should emit keydown event', () => {
    const wrapper = mountFunction()
    const keydown = jest.fn()
    const textarea = wrapper.find('textarea')
    wrapper.vm.$on('keydown', keydown)

    textarea.trigger('focus')
    textarea.element.value = 'foobar'
    textarea.trigger('input')
    textarea.trigger('keydown.enter')

    expect(keydown).toHaveBeenCalled()
  })

  it('should dynamically adjust row-height', async () => {
    const wrapper = mountFunction({
      propsData: {
        autoGrow: true,
      },
    })

    await new Promise(resolve => setTimeout(resolve, 0))

    expect(wrapper.vm.$refs.input.style.height).toBe('120px')

    wrapper.setProps({ rowHeight: 30 })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$refs.input.style.height).toBe('150px')
  })
})
