
// Components
import VFlex from '../VFlex'

// Utilities
import {
  mount,
  Wrapper
} from '@vue/test-utils'
import { functionalContext } from '../../../../test'

describe('VFlex.ts', () => {
  type Instance = InstanceType<typeof VFlex>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VFlex, {
        ...options
      })
    }
  })

  it('should conditionally apply if boolean is used', () => {
    const wrapper = mountFunction(functionalContext({
      attrs: {
        foo: '',
        bar: false
      }
    }))

    expect(wrapper.attributes('foo')).toBeUndefined()
    expect(wrapper.attributes('bar')).toBeUndefined()
    expect(wrapper.classes('foo')).toBe(true)
    expect(wrapper.classes('bar')).toBe(false)
  })

  it('should pass the id attr', () => {
    const wrapper = mountFunction(functionalContext({
      attrs: {
        id: 'test'
      }
    }))

    expect(wrapper.findAll('#test')).toHaveLength(1)
  })

  it('should not pass data-* attrs as classes', () => {
    const wrapper = mountFunction(
      functionalContext({
        attrs: {
          foo: 'bar',
          'data-test': 'foo'
        }
      })
    )

    expect(wrapper.classes('foo')).toBe(true)
    expect(wrapper.classes('data-test')).toBe(false)
    expect(wrapper.attributes('data-test')).toBe('foo')
  })

  // TODO: Remove once resolved
  // https://github.com/vuejs/vue/issues/7841
  it('should filter the slot attr', () => {
    const wrapper = mountFunction(functionalContext({
      attrs: { slot: 'content' }
    }))

    expect(wrapper.element.classList.contains('slot')).toBe(false)
  })
})
