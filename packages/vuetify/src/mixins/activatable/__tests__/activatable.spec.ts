// Libraries
import Vue from 'vue'

// Mixins
import Activatable from '../'

// Utilities
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'
import toHaveBeenWarnedInit from '../../../../test/util/to-have-been-warned'

describe('activatable.ts', () => {
  const Mock = Activatable.extend({
    render: h => h('div'),
  })
  type Instance = InstanceType<typeof Mock>
  let vm: InstanceType<typeof Vue>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    vm = new Vue()

    mountFunction = (options = {} as MountOptions<Instance>): Wrapper<Instance> => {
      return mount(Mock, options)
    }
  })

  toHaveBeenWarnedInit()

  it('should render activator slot with listeners', () => {
    const wrapper = mountFunction({
      scopedSlots: {
        activator: props => vm.$createElement('button', props),
      },
      render (h) {
        return h('div', [this.genActivator()])
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.vm.isActive).toBeFalsy()

    wrapper.find('button').trigger('click')

    expect(wrapper.vm.isActive).toBeTruthy()
  })

  it('should pass value to the activator slot', () => {
    const wrapper = mountFunction({
      scopedSlots: {
        activator: scope => vm.$createElement('button', {
          on: {
            click () {
              scope.value = !scope.value
            },
          },
        }, [String(scope.value)]),
      },
      render (h) {
        return h('div', [this.genActivator()])
      },
    })

    expect(wrapper.find('button').text()).toBe('false')

    wrapper.find('button').trigger('click')

    expect(wrapper.find('button').text()).toBe('true')
  })

  it('should render activator slot with hover', async () => {
    const runDelay = jest.fn()

    const wrapper = mountFunction({
      propsData: {
        openOnHover: true,
      },
      scopedSlots: {
        activator: props => vm.$createElement('button', props),
      },
      render (h) {
        return h('div', [this.genActivator()])
      },
      methods: {
        runDelay,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    const btn = wrapper.find('button')

    btn.trigger('mouseenter')
    expect(runDelay).toHaveBeenLastCalledWith('open')

    btn.trigger('mouseleave')
    expect(runDelay).toHaveBeenLastCalledWith('close')
  })

  it('should warn when activator hasn\'t got a scope', () => {
    mountFunction({
      slots: {
        activator: '<div></div>',
      },
      scopedSlots: {
        activator: '<div></div>',
      },
    })

    expect(`The activator slot must be bound, try '<template v-slot:activator="{ on }"><v-btn v-on="on">'`).toHaveBeenWarned()
  })
})
