// Components
import VFileInput from '../VFileInput'

// Services
import { Lang } from '../../../services/lang'

// Preset
import { preset } from '../../../presets/default'

// Libraries
import {
  Wrapper,
  mount,
  MountOptions,
} from '@vue/test-utils'

const oneMBFile = new File([new ArrayBuffer(1048576)], 'test')
const twoMBFile = new File([new ArrayBuffer(2097152)], 'test')

describe('VFileInput.ts', () => {
  type Instance = InstanceType<typeof VFileInput>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VFileInput, {
        // https://github.com/vuejs/vue-test-utils/issues/1130
        sync: false,
        mocks: {
          $vuetify: {
            lang: new Lang(preset),
          },
        },
        ...options,
      })
    }
  })

  it('should render', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render counter', () => {
    const wrapper = mountFunction({
      propsData: {
        counter: true,
        value: [oneMBFile],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should display file size', () => {
    const wrapper = mountFunction({
      propsData: {
        showSize: true,
        value: [twoMBFile],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      showSize: 1000,
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should display total size in counter', () => {
    const wrapper = mountFunction({
      propsData: {
        showSize: true,
        counter: true,
        value: [oneMBFile, twoMBFile],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      showSize: 1000,
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be unclearable', () => {
    const wrapper = mountFunction({
      propsData: {
        clearable: false,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should work with accept', () => {
    const wrapper = mountFunction({
      propsData: {
        accept: 'image/*',
      },
    })

    expect(wrapper.find('input').element.getAttribute('accept')).toBe('image/*')
  })

  it('should disable file input', () => {
    const wrapper = mountFunction({
      propsData: {
        disabled: true,
      },
    })

    expect(wrapper.find('input').element.getAttribute('disabled')).toBe('disabled')
  })

  it('should proxy icon and text click to input', () => {
    const fn = jest.fn()
    const wrapper = mountFunction()

    const input = wrapper.find('input').element
    input.click = fn

    const icon = wrapper.find('.v-icon')
    icon.trigger('click')
    expect(fn).toHaveBeenCalledTimes(1)

    const text = wrapper.find('.v-file-input__text')
    text.trigger('click')
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should clear', () => {
    const wrapper = mountFunction({
      propsData: { value: oneMBFile },
    })

    wrapper.vm.clearableCallback()
    expect(wrapper.vm.internalValue).toBeNull()

    const wrapper2 = mountFunction({
      attrs: { multiple: '' },
      propsData: { value: oneMBFile },
    })

    wrapper2.vm.clearableCallback()
    expect(wrapper2.vm.internalValue).toEqual([])
  })

  it('should react to setting fileValue', async () => {
    const wrapper = mountFunction()

    wrapper.setProps({
      value: [oneMBFile],
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalValue).toEqual([oneMBFile])
  })

  it('should render chips', () => {
    const wrapper = mountFunction({
      propsData: {
        chips: true,
        value: [oneMBFile],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render small chips', () => {
    const wrapper = mountFunction({
      propsData: {
        smallChips: true,
      },
      data: () => ({
        lazyValue: [oneMBFile],
      }),
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  // https://github.com/vuetifyjs/vuetify/issues/8049
  it('should render without icon', () => {
    const wrapper = mountFunction({
      propsData: {
        prependIcon: '',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  // https://github.com/vuetifyjs/vuetify/issues/8167
  it('should not emit change event when blurred', async () => {
    const change = jest.fn()
    const wrapper = mountFunction({
      listeners: {
        change,
      },
    })

    const input = wrapper.find('input')

    input.trigger('focus')
    await wrapper.vm.$nextTick()

    // TODO: Is there a better way to fake the file change event?
    wrapper.vm.onInput({ target: {} })

    input.trigger('blur')
    await wrapper.vm.$nextTick()

    expect(change).toHaveBeenCalledTimes(1)
  })

  it('should not emit change event when pressing enter', async () => {
    const change = jest.fn()
    const wrapper = mountFunction({
      listeners: {
        change,
      },
    })

    const input = wrapper.find('input')

    input.trigger('keydown.enter')
    await wrapper.vm.$nextTick()

    expect(change).not.toHaveBeenCalled()
  })

  it('should truncate correctly', async () => {
    const fifteenCharFile = new File(['V'.repeat(15)], 'testFile15Chars')
    const wrapper = mountFunction({
      propsData: {
        truncateLength: 1,
        value: fifteenCharFile,
      },
    })

    expect(wrapper.find('.v-file-input__text').text()).toBe('…')

    wrapper.setProps({
      truncateLength: 2,
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.v-file-input__text').text()).toBe('…')

    wrapper.setProps({
      truncateLength: 3,
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.v-file-input__text').text()).toBe('t…s')

    wrapper.setProps({
      truncateLength: 10,
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.v-file-input__text').text()).toBe('test…hars')
  })

  it('should filter internal array values for instanceof File', () => {
    const wrapper = mountFunction()

    const values = [null, undefined, {}, [null], [undefined], [{}]]

    for (const value of values) {
      wrapper.setProps({ value })

      expect(wrapper.vm.internalArrayValue).toEqual([])
    }
  })

  it('should set display none if hide-input prop is set', () => {
    const wrapper = mountFunction({
      propsData: { hideInput: true },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
