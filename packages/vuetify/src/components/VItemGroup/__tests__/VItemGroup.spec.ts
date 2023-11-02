// Components
import { VItem } from '../VItem'
import { VItemGroup } from '../VItemGroup'

// Utilities
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { createVuetify } from '@/framework'

// Types
import type { VueWrapper } from '@vue/test-utils'

describe('VItemGroup', () => {
  const vuetify = createVuetify()
  const mountFunction = (options = {}) => {
    return mount<any>(VItemGroup, {
      ...options,
      global: {
        plugins: [vuetify],
      },
    }) as VueWrapper<VItemGroup>
  }

  const defaultSlot = () => [
    h(VItem, { value: 'foo' }, {
      default: ({ toggle }: any) => h('div', { id: 'item', onClick: toggle }, ['foo']),
    }),
    h(VItem, { value: 'bar' }, {
      default: ({ toggle }: any) => h('div', { id: 'item', onClick: toggle }, ['bar']),
    }),
  ]

  it('should update state from child clicks', async () => {
    const wrapper = mountFunction({
      slots: {
        default: defaultSlot,
      },
    })

    const items = wrapper.findAll('#item')

    await items[0].trigger('click')
    await items[1].trigger('click')

    const events = wrapper.emitted('update:modelValue')

    expect(events).toEqual([['foo'], ['bar']])
  })

  it('should not deselect value when using mandatory prop', async () => {
    const wrapper = mountFunction({
      props: {
        mandatory: true,
        modelValue: 'foo',
      },
      slots: {
        default: defaultSlot,
      },
    })

    const items = wrapper.findAll('#item')

    await items[0].trigger('click')

    const events = wrapper.emitted('update:modelValue')

    expect(events).toBeUndefined()
  })

  it('should update a multiple item group', async () => {
    const wrapper = mountFunction({
      props: {
        multiple: true,
        modelValue: ['foo'],
      },
      slots: {
        default: defaultSlot,
      },
    })

    const items = wrapper.findAll('#item')

    await items[0].trigger('click')
    await items[1].trigger('click')

    const events = wrapper.emitted('update:modelValue')

    expect(events).toEqual([
      [[]],
      [['bar']],
    ])
  })

  it('should ignore disabled items', async () => {
    const wrapper = mountFunction({
      props: {
        multiple: true,
      },
      slots: {
        default: () => [
          h(VItem, { value: 'foo', disabled: true }, {
            default: ({ toggle }: any) => h('div', { id: 'item', onClick: toggle }, ['foo']),
          }),
          h(VItem, { value: 'bar' }, {
            default: ({ toggle }: any) => h('div', { id: 'item', onClick: toggle }, ['bar']),
          }),
        ],
      },
    })

    const items = wrapper.findAll('#item')

    await items[0].trigger('click')
    await items[1].trigger('click')

    const events = wrapper.emitted('update:modelValue')

    expect(events).toEqual([
      [['bar']],
    ])
  })

  // https://github.com/vuetifyjs/vuetify/issues/5384
  it('should not unregister children when is destroyed', async () => {
    const change = jest.fn()
    const wrapper = mountFunction({
      props: {
        modelValue: 'foo',
        'onUpdate:modelValue': change,
      },
      slots: {
        default: () => h(VItem, { value: 'foo' }, () => ['foo']),
      },
    })

    wrapper.unmount()

    expect(change).not.toHaveBeenCalled()
  })

  it('should render with a specified tag when the tag prop is provided with a value', () => {
    const wrapper = mountFunction({
      props: {
        tag: 'button',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
