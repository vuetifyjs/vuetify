// import dependent from '@/mixins/dependent'
import { test } from '@/test'
import dependent from '@/mixins/dependent'
import toggleable from '@/mixins/toggleable'

function genDependentMixin () {
  return {
    mixins: [dependent, toggleable],

    props: {
      value: Boolean
    },

    render (h) {
      return h('div', [
        h('div', {
          ref: 'content'
        }, 'foobar'),
        this.$slots.default
      ])
    }
  }
}

test('dependent.js', ({ mount }) => {
  const el = document.createElement('div')
  el.setAttribute('data-app', true)
  document.body.appendChild(el)

  it('should set open dependents value to false when deactivated', async () => {
    const mock = { isActive: true }
    const getOpenDependents = jest.fn(() => [mock])
    const wrapper = mount(genDependentMixin(), {
      methods: { getOpenDependents }
    })

    wrapper.setProps({ value: true })

    await wrapper.vm.$nextTick()

    expect(getOpenDependents).not.toBeCalled()

    wrapper.setProps({ value: false })

    await wrapper.vm.$nextTick()

    expect(getOpenDependents).toBeCalled()
    expect(mock.isActive).toBe(false)
  })

  it('should conditionally get open dependents', async () => {
    const wrapper = mount(genDependentMixin(), {
      slots: {
        default: [{
          ...genDependentMixin(),
          data: () => ({
            isActive: true
          })
        }]
      }
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
              isActive: true
            })
          },
          {
            ...genDependentMixin(),
            data: () => ({
              isActive: true
            }),
            render: h => h('div', 'fizzbuzz')
          },
          { render: h => h('div') }
        ]
      }
    })

    const openDependentElements = wrapper.vm.getOpenDependentElements()

    expect(openDependentElements.length).toBe(3)
  })
})
