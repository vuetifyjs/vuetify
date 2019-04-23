import VData from '../VData'
import {
  mount,
  MountOptions,
  Wrapper
} from '@vue/test-utils'

describe('VData.ts', () => {
  type Instance = InstanceType<typeof VData>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VData, options)
    }
  })

  it('should render with scopedProps', async () => {
    const wrapper = mountFunction({
      computed: {
        scopedProps: () => 'test'
      },
      scopedSlots: {
        default (data) {
          return this.$createElement('div', [ data ])
        }
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should compute length', () => {
    const wrapper = mountFunction({
      propsData: {
        items: [ 'foo', 'bar' ]
      }
    })

    expect(wrapper.vm.itemsLength).toBe(2)

    wrapper.setProps({
      serverItemsLength: 10
    })

    expect(wrapper.vm.itemsLength).toBe(10)
  })

  it('should group items', () => {
    const updateOptions = jest.fn()

    const wrapper = mountFunction({
      methods: {
        updateOptions
      }
    })

    wrapper.vm.group('foo')
    expect(updateOptions.mock.calls[0][0]).toMatchSnapshot()

    wrapper.vm.group('bar')
    expect(updateOptions.mock.calls[1][0]).toMatchSnapshot()

    wrapper.setProps({
      groupBy: [ 'baz' ]
    })
    wrapper.vm.group('baz')
    expect(updateOptions.mock.calls[2][0]).toMatchSnapshot()
    wrapper.vm.group('qux')
    expect(updateOptions.mock.calls[3][0]).toMatchSnapshot()
  })

  it('should sort items', () => {
    const updateOptions = jest.fn()

    const wrapper = mountFunction({
      methods: {
        updateOptions
      }
    })

    wrapper.vm.sort('foo')
    expect(updateOptions.mock.calls[0][0]).toMatchSnapshot()

    wrapper.vm.sort('bar')
    expect(updateOptions.mock.calls[1][0]).toMatchSnapshot()

    wrapper.setProps({
      sortBy: [ 'baz' ]
    })
    wrapper.vm.sort('baz')
    expect(updateOptions.mock.calls[2][0]).toMatchSnapshot()
    wrapper.vm.sort('qux')
    expect(updateOptions.mock.calls[3][0]).toMatchSnapshot()
  })

  it('should sort items by array', () => {
    const updateOptions = jest.fn()

    const wrapper = mountFunction({
      methods: {
        updateOptions
      }
    })

    wrapper.vm.sortArray([ 'foo', 'test' ])
    expect(updateOptions.mock.calls[0][0]).toMatchSnapshot()

    wrapper.vm.sortArray([ 'bar', 'test' ])
    expect(updateOptions.mock.calls[1][0]).toMatchSnapshot()

    wrapper.setProps({
      sortBy: [ 'baz' ]
    })
    wrapper.vm.sortArray([ 'baz', 'test' ])
    expect(updateOptions.mock.calls[2][0]).toMatchSnapshot()
    wrapper.vm.sortArray([ 'qux', 'test' ])
    expect(updateOptions.mock.calls[3][0]).toMatchSnapshot()

    wrapper.vm.sort([ 'foo', 'test' ]) // sort should call sortArray
    expect(updateOptions.mock.calls[0][0]).toMatchSnapshot()
  })

  it('watchers should work', () => { // eslint-disable-line max-statements
    const updateOptions = jest.fn()
    const multiSort = jest.fn()
    const mustSort = jest.fn()
    const itemsPerPage = jest.fn()
    const page = jest.fn()

    const wrapper = mountFunction({
      methods: {
        updateOptions
      },
      listeners: {
        'update:multi-sort': multiSort,
        'update:must-sort': mustSort,
        'update:items-per-page': itemsPerPage,
        'update:page': page
      }
    })

    wrapper.setProps({
      multiSort: true
    })
    expect(updateOptions).toHaveBeenLastCalledWith({ multiSort: true })
    wrapper.vm.internalOptions.multiSort = true
    expect(multiSort).toHaveBeenLastCalledWith(true)

    wrapper.setProps({
      mustSort: true
    })
    expect(updateOptions).toHaveBeenLastCalledWith({ mustSort: true })
    wrapper.vm.internalOptions.mustSort = true
    expect(mustSort).toHaveBeenLastCalledWith(true)

    wrapper.setProps({
      itemsPerPage: 1337
    })
    expect(updateOptions).toHaveBeenLastCalledWith({ itemsPerPage: 1337 })
    wrapper.vm.internalOptions.itemsPerPage = 1337
    expect(itemsPerPage).toHaveBeenLastCalledWith(1337)

    wrapper.setProps({
      sortDesc: true
    })
    expect(updateOptions).toHaveBeenLastCalledWith({ sortDesc: [ true ] })
    wrapper.setProps({
      sortDesc: [ false, true, true ]
    })
    expect(updateOptions).toHaveBeenLastCalledWith({ sortDesc: [ false, true, true ] })

    wrapper.setProps({
      groupDesc: true
    })
    expect(updateOptions).toHaveBeenLastCalledWith({ groupDesc: [ true ] })
    wrapper.setProps({
      groupDesc: [ false, true, true ]
    })
    expect(updateOptions).toHaveBeenLastCalledWith({ groupDesc: [ false, true, true ] })

    wrapper.setProps({
      page: 123
    })
    expect(updateOptions).toHaveBeenLastCalledWith({ page: 123 })
    wrapper.vm.internalOptions.page = 123
    expect(page).toHaveBeenLastCalledWith(123)
  })

  it('should paginate items', () => {
    const test = [ 'foo', 'bar', 'baz', 'qux', 'fizz', 'buzz', 'foobar', 'barbaz', 'fizzbuzz', 1, 2, 3, 4, 5 ]

    const wrapper = mountFunction({
      data: () => ({
        pageStart: 1,
        pageStop: 10
      })
    })

    expect(wrapper.vm.paginateItems(test)).toEqual([ 'bar', 'baz', 'qux', 'fizz', 'buzz', 'foobar', 'barbaz', 'fizzbuzz', 1 ])
    wrapper.vm.pageStart = 3
    wrapper.vm.pageStop = 7
    expect(wrapper.vm.paginateItems(test)).toEqual([ 'qux', 'fizz', 'buzz', 'foobar' ])
    wrapper.vm.pageStart = 17
    wrapper.vm.internalOptions.page = 10
    expect(wrapper.vm.paginateItems(test)).toEqual([])
    expect(wrapper.vm.internalOptions.page).toBe(1)

    expect('[Vue warn]: The computed property "pageStart" is already defined in data.').toHaveBeenWarned()
    expect('[Vue warn]: The computed property "pageStop" is already defined in data.').toHaveBeenWarned()
  })

  it('should conditionally sort items', () => {
    const items = [
      { text: 'Foo', id: 1 },
      { text: 'Bar', id: 2 },
      { text: 'Fizz', id: 3 },
      { text: 'Buzz', id: 4 },
      { text: 'Fizzbuzz', id: 5 }
    ]
    const wrapper = mountFunction({
      propsData: { items }
    })

    expect(wrapper.vm.computedItems).toEqual(items)

    wrapper.setProps({ sortBy: 'text' })

    expect(wrapper.vm.computedItems[0]).toEqual(items[1])

    wrapper.setProps({ disableSort: true })

    expect(wrapper.vm.computedItems).toEqual(items)
  })

  it('should conditionally paginate items', () => {
    const items = [
      { text: 'Foo', id: 1 },
      { text: 'Bar', id: 2 },
      { text: 'Fizz', id: 3 },
      { text: 'Buzz', id: 4 },
      { text: 'Fizzbuzz', id: 5 }
    ]
    const wrapper = mountFunction({
      propsData: { items }
    })

    expect(wrapper.vm.computedItems).toEqual(items)

    wrapper.setProps({ itemsPerPage: 2 })

    expect(wrapper.vm.computedItems).toHaveLength(2)
    expect(wrapper.vm.computedItems).toEqual([
      items[0],
      items[1]
    ])

    wrapper.setProps({ disablePagination: true })

    expect(wrapper.vm.computedItems).toHaveLength(5)
  })
})
