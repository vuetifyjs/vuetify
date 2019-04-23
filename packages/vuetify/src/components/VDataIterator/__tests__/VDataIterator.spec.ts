import VDataIterator from '../VDataIterator'
import { Lang } from '../../../services/lang'
import {
  mount,
  MountOptions,
  Wrapper
} from '@vue/test-utils'
import Vue from 'vue'

Vue.prototype.$vuetify = {
  icons: {
    values: {
      prev: 'mdi-chevron-left',
      next: 'mdi-chevron-right',
      dropdown: 'mdi-menu-down',
      first: 'mdi-page-first',
      last: 'mdi-page-last'
    }
  }
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
            lang: new Lang(),
            theme: {
              dark: false
            }
          }
        },
        ...options
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
          'qux'
        ]
      },
      scopedSlots: {
        default: '<p slot-scope="item">{{ item }}</p>'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render valid no-data, loading and no-results states', () => {
    const wrapper = mountFunction({
      propsData: {
        items: [],
        serverItemsLength: 0
      }
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      loading: true,
      items: [ 'foo' ]
    })
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      loading: false,
      search: true
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should create valid item slot scope', () => {
    const wrapper = mountFunction({
      propsData: {
        items: [ 'foo', 'bar' ]
      },
      scopedSlots: {
        item: '<div slot-scope="item">{{ JSON.stringify(item) }}</div>'
      }
    })

    expect(wrapper.vm.createItemProps('bar')).toMatchSnapshot()

    wrapper.vm.createItemProps('foo').expand.on.input(true)
    expect(wrapper.vm.isExpanded('foo')).toBeTruthy()
    wrapper.vm.createItemProps('foo').expand.on.input(false)
    expect(wrapper.vm.isExpanded('foo')).toBeFalsy()

    wrapper.vm.createItemProps('bar').select.on.input(true)
    expect(wrapper.vm.isSelected('bar')).toBeTruthy()
    wrapper.vm.createItemProps('bar').select.on.input(false)
    expect(wrapper.vm.isSelected('bar')).toBeFalsy()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should select all', () => {
    const wrapper = mountFunction({
      propsData: {
        items: [ { id: 'foo' }, { id: 'bar' } ]
      }
    })

    expect(wrapper.vm.isSelected({ id: 'foo' })).toBeFalsy()
    expect(wrapper.vm.isSelected({ id: 'bar' })).toBeFalsy()

    wrapper.vm.toggleSelectAll(true)
    expect(wrapper.vm.isSelected({ id: 'foo' })).toBeTruthy()
    expect(wrapper.vm.isSelected({ id: 'bar' })).toBeTruthy()

    wrapper.vm.toggleSelectAll(false)
    expect(wrapper.vm.isSelected({ id: 'foo' })).toBeFalsy()
    expect(wrapper.vm.isSelected({ id: 'bar' })).toBeFalsy()
  })

  it('should update expansion', () => {
    const mock = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        items: [ { id: 'foo' }, { id: 'bar' } ]
      }
    })
    wrapper.vm.$watch('expansion', mock)

    wrapper.setProps({
      expanded: [ { id: 'foo' } ]
    })
    expect(mock).toHaveBeenLastCalledWith({ foo: true }, {})

    wrapper.setProps({
      expanded: [ { id: 'bar' } ]
    })
    expect(mock).toHaveBeenLastCalledWith({ bar: true }, { foo: true })
  })

  it('should update selection', () => {
    const mock = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        items: [ { id: 'foo' }, { id: 'bar' } ]
      }
    })
    wrapper.vm.$watch('selection', mock)

    wrapper.setProps({
      value: [ { id: 'foo' } ]
    })
    expect(mock).toHaveBeenLastCalledWith({ foo: true }, {})

    wrapper.setProps({
      value: [ { id: 'bar' } ]
    })
    expect(mock).toHaveBeenLastCalledWith({ bar: true }, { foo: true })
  })

  it('should check if all items are selected', () => {
    const wrapper = mountFunction({
      propsData: {
        items: [ { id: 'foo' }, { id: 'bar' } ]
      }
    })

    wrapper.setProps({
      value: [ { id: 'foo' } ]
    })
    expect(wrapper.vm.everyItem).toBeFalsy()

    wrapper.setProps({
      value: [ { id: 'bar' } ]
    })
    expect(wrapper.vm.everyItem).toBeFalsy()

    wrapper.setProps({
      value: [ { id: 'foo' }, { id: 'bar' } ]
    })
    expect(wrapper.vm.everyItem).toBeTruthy()

    wrapper.setProps({
      items: []
    })
    expect(wrapper.vm.everyItem).toBeFalsy()
  })

  it('should check if some items are selected', () => {
    const wrapper = mountFunction({
      propsData: {
        items: [ { id: 'foo' }, { id: 'bar' } ]
      }
    })

    wrapper.setProps({
      value: [ { id: 'foo' } ]
    })
    expect(wrapper.vm.someItems).toBeTruthy()

    wrapper.setProps({
      value: [ { id: 'bar' } ]
    })
    expect(wrapper.vm.someItems).toBeTruthy()

    wrapper.setProps({
      value: [ { id: 'foo' }, { id: 'bar' } ]
    })
    expect(wrapper.vm.someItems).toBeTruthy()

    wrapper.setProps({
      value: []
    })
    expect(wrapper.vm.someItems).toBeFalsy()

    wrapper.setProps({
      items: []
    })
    expect(wrapper.vm.someItems).toBeFalsy()
  })

  it('should hide footer', () => {
    const wrapper = mountFunction({
      propsData: {
        hideDefaultFooter: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
