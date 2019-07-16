
// Components
import Grid from '../grid'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

const Mock = Grid('test')

describe('VGrid.ts', () => {
  type Instance = InstanceType<typeof Mock>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(Mock, {
        context: {
          ...options,
        },
      })
    }
  })

  it('should conditionally apply if boolean is used', () => {
    const wrapper = mountFunction({
      attrs: {
        foo: '',
        bar: false,
      },
    })

    expect(wrapper.attributes('foo')).toBeUndefined()
    expect(wrapper.attributes('bar')).toBeUndefined()
    expect(wrapper.classes('foo')).toBe(true)
    expect(wrapper.classes('bar')).toBe(false)
  })

  it('should pass the id attr', () => {
    const wrapper = mountFunction({
      attrs: {
        id: 'test',
      },
    })

    expect(wrapper.findAll('#test')).toHaveLength(1)
  })

  it('should not pass data-* attrs as classes', () => {
    const wrapper = mountFunction({
      attrs: {
        foo: 'bar',
        'data-test': 'foo',
      },
    })

    expect(wrapper.classes('foo')).toBe(true)
    expect(wrapper.classes('data-test')).toBe(false)
    expect(wrapper.attributes('data-test')).toBe('foo')
  })

  // TODO: Remove once resolved
  // https://github.com/vuejs/vue/issues/7841
  it('should filter the slot attr', () => {
    const wrapper = mountFunction({
      attrs: { slot: 'content' },
    })

    expect(wrapper.element.classList.contains('slot')).toBe(false)
  })
})
