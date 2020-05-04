// Libraries
import Vue from 'vue'

// Components
import VHover from '../VHover'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'
import { wait } from '../../../../test'

describe('VHover.ts', () => {
  let mountFunction: (options?: object) => Wrapper<Vue>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VHover, {
        ...options,
      })
    }
  })

  it('should change class when hovered', async () => {
    const vm = new Vue()
    const item = props => vm.$createElement('div', {
      staticClass: 'foobar',
      class: { fizzbuzz: props.hover },
    })

    const wrapper = mountFunction({
      scopedSlots: {
        default: item,
      },
    })

    const div = wrapper.find('.foobar')

    div.trigger('mouseenter')

    await wait()

    expect(div.element.classList.contains('fizzbuzz')).toBe(true)

    div.trigger('mouseleave')

    // Wait for runDelay
    await wait(200)

    expect(div.element.classList.contains('fizzbuzz')).toBe(false)
  })

  it('should not react to changes when disable', async () => {
    const vm = new Vue()
    const item = props => vm.$createElement('div', {
      staticClass: 'foobar',
      class: { fizzbuzz: props.hover },
    })

    const wrapper = mountFunction({
      propsData: {
        disabled: true,
        value: true,
      },
      scopedSlots: {
        default: item,
      },
    })

    const div = wrapper.find('.foobar')

    div.trigger('mouseenter')

    await wait()

    expect(div.classes('fizzbuzz')).toBe(true)

    div.trigger('mouseleave')

    // Wait for runDelay
    await wait(200)

    expect(div.classes('fizzbuzz')).toBe(true)
  })

  it('should warn when missing scoped slot and bound value', () => {
    mountFunction()

    expect('v-hover is missing a default scopedSlot or bound value').toHaveBeenTipped()
  })

  it('should warn when using multiple root elements', () => {
    mountFunction({
      propsData: {
        value: false,
      },
      slots: {
        default: [
          { render: h => h('div') },
          { render: h => h('div') },
        ],
      },
    })

    expect('v-hover should only contain a single element').toHaveBeenTipped()
    expect('[Vue warn]: Multiple root nodes returned from render function. Render function should return a single root node.').toHaveBeenWarned()
  })
})
