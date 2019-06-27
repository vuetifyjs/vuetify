// Components
import VFileInput from '../VFileInput'

// Services
import { Lang } from '../../../services/lang'

// Libraries
import {
  Wrapper,
  mount,
  MountOptions,
} from '@vue/test-utils'

const oneMBFile = { name: 'test', size: 1048576 }
const twoMBFile = { name: 'test', size: 2097152 }

describe('VFileInput.ts', () => {
  type Instance = InstanceType<typeof VFileInput>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VFileInput, {
        mocks: {
          $vuetify: {
            lang: new Lang(),
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
      },
    })

    wrapper.setData({
      lazyFileValue: [ oneMBFile ],
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should display file size', () => {
    const wrapper = mountFunction({
      propsData: {
        displaySize: true,
      },
    })

    wrapper.setData({
      lazyFileValue: [ twoMBFile ],
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      displaySize: 1000,
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should display total size in counter', () => {
    const wrapper = mountFunction({
      propsData: {
        displaySize: true,
        counter: true,
      },
    })

    wrapper.setData({
      lazyFileValue: [ oneMBFile, twoMBFile ],
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      displaySize: 1000,
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

  it('should emit event on change', () => {
    const fn = jest.fn()
    const wrapper = mountFunction({
      listeners: {
        'update:fileValue': fn,
      },
    })

    wrapper.setData({
      lazyFileValue: [ oneMBFile ],
    })

    expect(fn).toHaveBeenLastCalledWith([ oneMBFile ])
  })

  it('should display progress', () => {
    const wrapper = mountFunction({
      propsData: {
        progress: 30,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      progress: '70',
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
})
