import dependent from '../'
import toggleable from '../../toggleable'
import { mount } from '@vue/test-utils'

function genDependentMixin () {
  return {
    mixins: [dependent, toggleable],

    props: {
      value: Boolean,
    },

    render (h) {
      return h('div', [
        h('div', {
          ref: 'content',
        }, 'foobar'),
        this.$slots.default,
      ])
    },
  }
}

describe('dependent.ts', () => {
  beforeEach(() => {
    document.body.setAttribute('data-app', 'true')
  })

  it('should set open dependents value to false when deactivated', async () => {
    const mock = { isActive: true }
    const getOpenDependents = jest.fn(() => [mock])
    const wrapper = mount(genDependentMixin(), {
      methods: { getOpenDependents },
    })

    wrapper.setProps({ value: true })

    await wrapper.vm.$nextTick()

    expect(getOpenDependents).not.toHaveBeenCalled()

    wrapper.setProps({ value: false })

    await wrapper.vm.$nextTick()

    expect(getOpenDependents).toHaveBeenCalled()
    expect(mock.isActive).toBe(false)
  })

  it('should conditionally get open dependents', async () => {
    const wrapper = mount(genDependentMixin(), {
      slots: {
        default: [{
          ...genDependentMixin(),
          data: () => ({
            isActive: true,
          }),
        }],
      },
    })

    const openDependents = wrapper.vm.getOpenDependents()

    expect(openDependents).toEqual(wrapper.vm.$children)

    wrapper.setData({ closeDependents: false })

    expect(wrapper.vm.getOpenDependents()).toEqual([])
  })

  it('should get open dependent elements', async () => {
    const wrapper = mount(genDependentMixin(), {
      slots: {
        default: [
          {
            ...genDependentMixin(),
            data: () => ({
              isActive: true,
            }),
          },
          {
            ...genDependentMixin(),
            data: () => ({
              isActive: true,
            }),
            render: h => h('div', 'fizzbuzz'),
          },
          { render: h => h('div') },
        ],
      },
    })

    const openDependentElements = wrapper.vm.getOpenDependentElements()

    expect(openDependentElements).toHaveLength(3)
  })
})
