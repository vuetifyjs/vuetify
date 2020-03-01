import VData from '../VData'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

describe('VData.ts', () => {
  type Instance = InstanceType<typeof VData>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VData, {
        ...options,
        sync: false,
      })
    }
  })

  it('should render data through default scoped slot', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: [
          { id: 1, text: 'foo' },
          { id: 2, text: 'bar' },
        ],
      },
      scopedSlots: {
        default (data) {
          return this.$createElement('div', data.items.map(item => this.$createElement('div', [item.text])))
        },
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should ignore items length if using server-items-length', async () => {
    const render = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        items: [
          { id: 1, text: 'foo' },
          { id: 2, text: 'bar' },
        ],
      },
      scopedSlots: {
        default: render,
      },
    })

    await wrapper.vm.$nextTick()
    expect(render).toHaveBeenCalledWith(expect.objectContaining({
      pagination: expect.objectContaining({
        itemsLength: 2,
      }),
    }))

    wrapper.setProps({
      serverItemsLength: 10,
    })

    await wrapper.vm.$nextTick()
    expect(render).toHaveBeenCalledWith(expect.objectContaining({
      pagination: expect.objectContaining({
        itemsLength: 10,
      }),
    }))
  })

  it('should group items', async () => {
    const render = jest.fn()
    const items = [
      { id: 1, text: 'foo', baz: 'one' },
      { id: 2, text: 'bar', baz: 'two' },
      { id: 3, text: 'baz', baz: 'one' },
    ]

    const wrapper = mountFunction({
      propsData: {
        items,
        groupBy: ['baz'],
      },
      scopedSlots: {
        default: render,
      },
    })

    expect(render).toHaveBeenCalledWith(expect.objectContaining({
      groupedItems: {
        one: [items[0], items[2]],
        two: [items[1]],
      },
    }))
  })

  it('should group items by deep keys', async () => {
    const render = jest.fn()
    const items = [
      { id: 1, text: 'foo', foo: { bar: 'one' } },
      { id: 2, text: 'bar', foo: { bar: 'two' } },
      { id: 3, text: 'baz', foo: { bar: 'one' } },
    ]

    const wrapper = mountFunction({
      propsData: {
        items,
        groupBy: ['foo.bar'],
      },
      scopedSlots: {
        default: render,
      },
    })

    expect(render).toHaveBeenCalledWith(expect.objectContaining({
      groupedItems: {
        one: [items[0], items[2]],
        two: [items[1]],
      },
    }))
  })

  it('should group items with a custom group function', async () => {
    const render = jest.fn()
    const items = [
      { id: 1, text: 'foo', value: 1 },
      { id: 2, text: 'bar', value: 4 },
      { id: 3, text: 'baz', value: 3 },
    ]

    const wrapper = mountFunction({
      propsData: {
        items,
        groupBy: ['value'],
        customGroup: function evenOddGrouper (items: any[], groupBy: string[]) {
          const key = groupBy[0]
          return items.reduce((rv, x) => {
            const group = x[key] % 2 ? 'odd' : 'even';
            (rv[group] = rv[group] || []).push(x)
            return rv
          }, {})
        },
      },
      scopedSlots: {
        default: render,
      },
    })

    expect(render).toHaveBeenCalledWith(expect.objectContaining({
      groupedItems: {
        even: [items[1]],
        odd: [items[0], items[2]],
      },
    }))
  })

  it('should sort items', () => {
    const render = jest.fn()

    const unsorted = [
      { id: 1, text: 'c' },
      { id: 2, text: 'a' },
      { id: 3, text: 'd' },
      { id: 4, text: 'b' },
    ]

    const sorted = [
      { id: 2, text: 'a' },
      { id: 4, text: 'b' },
      { id: 1, text: 'c' },
      { id: 3, text: 'd' },
    ]

    const wrapper = mountFunction({
      propsData: {
        items: unsorted,
        sortBy: ['text'],
      },
      scopedSlots: {
        default: render,
      },
    })

    expect(render).toHaveBeenCalledWith(expect.objectContaining({
      items: sorted,
    }))
  })

  it('should sort items by multiple properties', async () => {
    const render = jest.fn()

    const unsorted = [
      { id: 1, foo: 'a', bar: 'b' },
      { id: 2, foo: 'b', bar: 'b' },
      { id: 3, foo: 'b', bar: 'a' },
      { id: 4, foo: 'a', bar: 'a' },
    ]

    const sorted = [
      { id: 4, foo: 'a', bar: 'a' },
      { id: 1, foo: 'a', bar: 'b' },
      { id: 3, foo: 'b', bar: 'a' },
      { id: 2, foo: 'b', bar: 'b' },
    ]

    const wrapper = mountFunction({
      propsData: {
        items: unsorted,
        sortBy: ['foo'],
      },
      scopedSlots: {
        default: render,
      },
    })

    await wrapper.vm.$nextTick()

    wrapper.setProps({
      sortBy: ['foo', 'bar'],
    })
    await wrapper.vm.$nextTick()

    expect(render).toHaveBeenCalledWith(expect.objectContaining({
      items: sorted,
    }))
  })

  it('should paginate items', () => {
    const render = jest.fn()

    const items = [
      { id: 1, foo: 'a' },
      { id: 2, foo: 'b' },
      { id: 3, foo: 'c' },
      { id: 4, foo: 'd' },
      { id: 5, foo: 'e' },
      { id: 6, foo: 'f' },
      { id: 7, foo: 'g' },
      { id: 8, foo: 'h' },
      { id: 9, foo: 'i' },
      { id: 10, foo: 'j' },
    ]

    const wrapper = mountFunction({
      propsData: {
        items,
        itemsPerPage: 5,
        page: 2,
      },
      scopedSlots: {
        default: render,
      },
    })

    expect(render).toHaveBeenCalledWith(expect.objectContaining({
      items: items.slice(5),
    }))
  })

  it('should not sort items if disableSort is active', () => {
    const render = jest.fn()

    const items = [
      { text: 'Foo', id: 1 },
      { text: 'Bar', id: 2 },
      { text: 'Fizz', id: 3 },
      { text: 'Buzz', id: 4 },
      { text: 'Fizzbuzz', id: 5 },
    ]

    const wrapper = mountFunction({
      propsData: {
        items,
        sortBy: ['text'],
        disableSort: true,
      },
      scopedSlots: {
        default: render,
      },
    })

    expect(render).toHaveBeenCalledWith(expect.objectContaining({
      items,
    }))
  })

  it('should conditionally paginate items', async () => {
    const render = jest.fn()
    const items = [
      { text: 'Foo', id: 1 },
      { text: 'Bar', id: 2 },
      { text: 'Fizz', id: 3 },
      { text: 'Buzz', id: 4 },
      { text: 'Fizzbuzz', id: 5 },
    ]

    const wrapper = mountFunction({
      propsData: { items },
      scopedSlots: {
        default: render,
      },
    })

    expect(render).toHaveBeenCalledWith(expect.objectContaining({
      items,
    }))

    wrapper.setProps({ itemsPerPage: 2 })
    await wrapper.vm.$nextTick()

    expect(render).toHaveBeenCalledWith(expect.objectContaining({
      items: items.slice(0, 2),
    }))

    wrapper.setProps({ disablePagination: true })
    await wrapper.vm.$nextTick()

    expect(render).toHaveBeenCalledWith(expect.objectContaining({
      items,
    }))
  })

  it('should toggle sorting', async () => {
    const unsorted = [
      { id: 1, text: 'c' },
      { id: 2, text: 'a' },
      { id: 3, text: 'd' },
      { id: 4, text: 'b' },
    ]

    const wrapper = mountFunction({
      propsData: {
        items: unsorted,
      },
      scopedSlots: {
        default (props) {
          const items = props.items.map(item => this.$createElement('div', [item.text]))
          return this.$createElement('div', {
            attrs: {
              id: 'wrapper',
            },
            on: {
              click: () => props.sort('text'),
            },
          }, items)
        },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    const el = wrapper.find('#wrapper').element
    el.click()
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()

    el.click()
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should toggle sorting on multiple properties', async () => {
    const unsorted = [
      { id: 1, text: 'c', group: 'foo' },
      { id: 2, text: 'a', group: 'bar' },
      { id: 3, text: 'd', group: 'foo' },
      { id: 4, text: 'b', group: 'bar' },
    ]

    const wrapper = mountFunction({
      propsData: {
        items: unsorted,
      },
      scopedSlots: {
        default (props) {
          const items = props.items.map(item => this.$createElement('div', [`${item.group}-${item.text}`]))
          return this.$createElement('div', {
            attrs: {
              id: 'wrapper',
            },
            on: {
              click: () => props.sort(['group', 'text']),
            },
          }, items)
        },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    const el = wrapper.find('#wrapper').element
    el.click()
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should toggle grouping', async () => {
    const unsorted = [
      { id: 1, text: 'c', group: 'foo' },
      { id: 2, text: 'a', group: 'bar' },
      { id: 3, text: 'd', group: 'foo' },
      { id: 4, text: 'b', group: 'bar' },
    ]

    const wrapper = mountFunction({
      propsData: {
        items: unsorted,
      },
      scopedSlots: {
        default (props) {
          const items = props.groupedItems
            ? Object.keys(props.groupedItems)
            : props.items.map(item => item.text)

          return this.$createElement('div', {
            attrs: {
              id: 'wrapper',
            },
            on: {
              click: () => props.group('group'),
            },
          }, items.map(item => this.$createElement('div', [item])))
        },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    const el = wrapper.find('#wrapper').element
    el.click()
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  // https://github.com/vuetifyjs/vuetify/issues/10372
  it('should handle setting itemsPerPage to zero', async () => {
    const render = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        items: [
          { id: 1, text: 'foo' },
          { id: 2, text: 'bar' },
        ],
        itemsPerPage: 0,
      },
      scopedSlots: {
        default: render,
      },
    })

    await wrapper.vm.$nextTick()
    expect(render).toHaveBeenCalledWith(expect.objectContaining({
      pagination: expect.objectContaining({
        itemsPerPage: 0,
        page: 1,
        pageCount: 1,
        pageStart: 0,
        pageStop: 0,
      }),
    }))

    wrapper.setProps({
      itemsPerPage: 1,
    })

    await wrapper.vm.$nextTick()
    expect(render).toHaveBeenCalledWith(expect.objectContaining({
      pagination: expect.objectContaining({
        itemsPerPage: 1,
        page: 1,
        pageCount: 2,
        pageStart: 0,
        pageStop: 1,
      }),
    }))
  })
})
