import VDataIterator from '../VDataIterator'
import { Lang } from '../../../services/lang'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'
import Vue from 'vue'
import { preset } from '../../../presets/default'

Vue.prototype.$vuetify = {
  icons: {
    values: {
      prev: 'mdi-chevron-left',
      next: 'mdi-chevron-right',
      dropdown: 'mdi-menu-down',
      first: 'mdi-page-first',
      last: 'mdi-page-last',
    },
  },
}

describe('VDataIterator.ts', () => {
  type Instance = InstanceType<typeof VDataIterator>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    document.body.setAttribute('data-app', '')

    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VDataIterator, {
        mocks: {
          $vuetify: {
            lang: new Lang(preset),
            theme: {
              dark: false,
            },
          },
        },
        sync: false,
        ...options,
      })
    }
  })

  it('should render and match snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render and match snapshot with data', () => {
    const wrapper = mountFunction({
      propsData: {
        items: [
          'foo',
          'bar',
          'baz',
          'qux',
        ],
      },
      scopedSlots: {
        item (props) {
          return this.$createElement('div', [props.item])
        },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render valid no-data, loading and no-results states', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: [],
        serverItemsLength: 0,
      },
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      loading: true,
      items: [],
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      loading: false,
      items: ['foo'],
      search: 'something',
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit when selection happens', async () => {
    const input = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        itemKey: 'id',
        items: [
          { id: 1, text: 'foo' },
          { id: 2, text: 'bar' },
        ],
      },
      listeners: {
        input,
      },
      scopedSlots: {
        item (props) {
          return this.$createElement('div', {
            attrs: {
              id: props.item.text,
            },
            on: {
              click: () => props.select(true),
            },
          }, [props.item.text])
        },
      },
    })

    const foo = wrapper.find('#foo')
    foo.element.click()

    await wrapper.vm.$nextTick()

    expect(input).toHaveBeenCalledWith([{ id: 1, text: 'foo' }])
  })

  it('should emit when expansion happens', async () => {
    const input = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        itemKey: 'id',
        items: [
          { id: 1, text: 'foo' },
          { id: 2, text: 'bar' },
        ],
      },
      listeners: {
        'update:expanded': input,
      },
      scopedSlots: {
        item (props) {
          return this.$createElement('div', {
            attrs: {
              id: props.item.text,
            },
            on: {
              click: () => props.expand(true),
            },
          }, [props.item.text])
        },
      },
    })

    const foo = wrapper.find('#bar')
    foo.element.click()

    await wrapper.vm.$nextTick()

    expect(input).toHaveBeenCalledWith([{ id: 2, text: 'bar' }])
  })

  it('should select all', async () => {
    const input = jest.fn()
    const items = [
      { id: 'foo' },
      { id: 'bar' },
    ]
    const toggleSelectAll = jest.fn()

    const wrapper = mountFunction({
      propsData: {
        items,
      },
      listeners: {
        input,
        'toggle-select-all': toggleSelectAll,
      },
      scopedSlots: {
        header (props) {
          return this.$createElement('div', {
            attrs: {
              id: 'header',
            },
            on: {
              click: () => props.toggleSelectAll(true),
            },
          })
        },
      },
    })

    const header = wrapper.find('#header')
    header.element.click()

    await wrapper.vm.$nextTick()

    expect(input).toHaveBeenCalledWith(items)
    expect(toggleSelectAll).toHaveBeenCalledWith({ items, value: true })
  })

  it('should update expansion from the outside', async () => {
    const mock = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        items: [
          { id: 'foo' },
          { id: 'bar' },
        ],
      },
      listeners: {
        'update:expanded': mock,
      },
    })

    wrapper.setProps({
      expanded: [{ id: 'foo' }],
    })
    await wrapper.vm.$nextTick()
    expect(mock).toHaveBeenLastCalledWith([{ id: 'foo' }])

    wrapper.setProps({
      expanded: [{ id: 'bar' }],
    })
    await wrapper.vm.$nextTick()
    expect(mock).toHaveBeenLastCalledWith([{ id: 'bar' }])
  })

  it('should update selection from the outside', async () => {
    const mock = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        items: [
          { id: 'foo' },
          { id: 'bar' },
        ],
      },
      listeners: {
        input: mock,
      },
    })

    wrapper.setProps({
      value: [{ id: 'foo' }],
    })
    await wrapper.vm.$nextTick()
    expect(mock).toHaveBeenLastCalledWith([{ id: 'foo' }])

    wrapper.setProps({
      value: [{ id: 'bar' }],
    })
    await wrapper.vm.$nextTick()
    expect(mock).toHaveBeenLastCalledWith([{ id: 'bar' }])
  })

  it('should check if all items are selected', async () => {
    const render = jest.fn()
    const items = [
      { id: 'foo' }, { id: 'bar' },
    ]

    const wrapper = mountFunction({
      propsData: {
        items,
      },
      scopedSlots: {
        header: render,
      },
    })

    wrapper.setProps({
      value: items,
    })
    await wrapper.vm.$nextTick()

    expect(render).toHaveBeenLastCalledWith(expect.objectContaining({
      everyItem: true,
      someItems: true,
    }))
  })

  it('should check if some items are selected', async () => {
    const render = jest.fn()
    const items = [
      { id: 'foo' }, { id: 'bar' },
    ]

    const wrapper = mountFunction({
      propsData: {
        items,
      },
      scopedSlots: {
        header: render,
      },
    })

    wrapper.setProps({
      value: items.slice(1),
    })
    await wrapper.vm.$nextTick()

    expect(render).toHaveBeenLastCalledWith(expect.objectContaining({
      everyItem: false,
      someItems: true,
    }))
  })

  it('should hide footer', () => {
    const wrapper = mountFunction({
      propsData: {
        hideDefaultFooter: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
