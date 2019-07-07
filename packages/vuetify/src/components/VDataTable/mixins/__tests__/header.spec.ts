import Header from '../header'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'
import { wrapInArray } from '../../../../util/helpers'

describe('VDataTable/header.ts', () => {
  type Instance = InstanceType<typeof Header>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(Header, {
        props: {
          headers: [],
          ...options.props,
        },
        render (h) {
          return h('div')
        },
        ...options,
      })
    }
  })

  it('should generate sort icon', async () => {
    const wrapper = mountFunction({
      propsData: {
        sortIcon: 'mdi-sort',
      },
      render () {
        return this.genSortIcon()
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should generate select', async () => {
    const wrapper = mountFunction({
      render (h) {
        return h('div', wrapInArray(this.genSelectAll()))
      },
    })

    wrapper.setProps({
      everyItem: false,
      someItems: false,
    })
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      everyItem: true,
      someItems: false,
    })
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      everyItem: false,
      someItems: true,
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should generate select scoped slot', async () => {
    const sel = jest.fn()
    const wrapper = mountFunction({
      render (h) {
        return h('div', wrapInArray(this.genSelectAll()))
      },
      scopedSlots: {
        'data-table-select' (props) {
          return this.$createElement('div', {
            on: props.on,
            staticClass: 'test',
          }, [JSON.stringify(props)])
        },
      },
      listeners: {
        'toggle-select-all': sel,
      },
    })

    wrapper.setProps({
      everyItem: false,
      someItems: false,
    })
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      everyItem: true,
      someItems: false,
    })
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      everyItem: false,
      someItems: true,
    })
    expect(wrapper.html()).toMatchSnapshot()

    const select = wrapper.find('.test')
    select.trigger('input', { value: true })
    expect(sel.mock.calls[0][0].value).toBeTruthy()
    select.trigger('input', { value: false })
    expect(sel.mock.calls[1][0].value).toBeFalsy()
  })
})
