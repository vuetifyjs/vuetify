import Colorable from '../'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

describe('colorable.ts', () => {
  const Mock = Colorable.extend({
    render: h => h('div'),
  })

  type Instance = InstanceType<typeof Mock>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(Mock, options)
    }
  })

  it('should compute data with background theme color', async () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.setBackgroundColor('foo', {})).toEqual({
      class: {
        foo: true,
      },
    })
    expect(wrapper.vm.setBackgroundColor('foo darken-5', {})).toEqual({
      class: {
        'foo darken-5': true,
      },
    })
  })

  it('should compute data with text theme color', async () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.setTextColor('foo', {})).toEqual({
      class: {
        'foo--text': true,
      },
    })
    expect(wrapper.vm.setTextColor('foo darken-5', {})).toEqual({
      class: {
        'foo--text': true,
        'text--darken-5': true,
      },
    })
  })

  it('should compute data with background css color', async () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.setBackgroundColor('#01f', {})).toEqual({
      style: {
        'background-color': '#01f',
        'border-color': '#01f',
      },
    })
    expect(wrapper.vm.setBackgroundColor('rgba(0, 1, 2, 0.5)', {})).toEqual({
      style: {
        'background-color': 'rgba(0, 1, 2, 0.5)',
        'border-color': 'rgba(0, 1, 2, 0.5)',
      },
    })
  })

  it('should compute data with text css color', async () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.setTextColor('#01f', {})).toEqual({
      style: {
        color: '#01f',
        'caret-color': '#01f',
      },
    })
    expect(wrapper.vm.setTextColor('rgba(0, 1, 2, 0.5)', {})).toEqual({
      style: {
        color: 'rgba(0, 1, 2, 0.5)',
        'caret-color': 'rgba(0, 1, 2, 0.5)',
      },
    })
  })
})
