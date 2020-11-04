import VSimpleTable from '../VSimpleTable'
import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'

describe('VSimpleTable.ts', () => {
  type Instance = InstanceType<typeof VSimpleTable>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VSimpleTable, options)
    }
  })

  it('should render', () => {
    const wrapper = mountFunction({
      slots: {
        default: `
          <tr><th>Foo</th><th>Bar</th></tr>
          <tr><td>baz</td><td>qux</td></tr>
        `,
      },
    })

    expect(wrapper.findAll('.v-data-table')).toHaveLength(1)
    expect(wrapper.findAll('.v-data-table .v-data-table__wrapper')).toHaveLength(1)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with custom wrapper', () => {
    const wrapper = mountFunction({
      slots: {
        wrapper: `
          <table>
            <tr><th>Foo</th><th>Bar</th></tr>
            <tr><td>baz</td><td>qux</td></tr>
          </table>
        `,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with top & bottom slots', () => {
    const wrapper = mountFunction({
      slots: {
        top: '<div class="top">Header</div>',
        bottom: '<div class="bottom">Footer</div>',
      },
    })

    expect(wrapper.findAll('.top')).toHaveLength(1)
    expect(wrapper.findAll('.bottom')).toHaveLength(1)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with custom height', () => {
    const wrapper = mountFunction({
      slots: {
        default: `
          <tr><th>Foo</th><th>Bar</th></tr>
          <tr><td>baz</td><td>qux</td></tr>
        `,
      },
      propsData: {
        height: 1000,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should compute classes', () => {
    const wrapper = mountFunction()

    wrapper.setProps({
      dense: true,
    })
    expect(wrapper.vm.classes).toMatchObject({
      'v-data-table--dense': true,
    })
    wrapper.setProps({
      dark: true,
    })
    expect(wrapper.vm.classes).toMatchObject({
      'theme--dark': true,
      'theme--light': false,
    })
    wrapper.setProps({
      fixedHeader: true,
    })
    expect(wrapper.vm.classes).toMatchObject({
      'v-data-table--fixed-header': true,
    })
    wrapper.setProps({
      fixedHeader: false,
      height: 1000,
    })
    expect(wrapper.vm.classes).toMatchObject({
      'v-data-table--fixed-height': true,
    })
  })

  it('should compute classes with top & bottom slots', () => {
    const wrapper = mountFunction({
      slots: {
        top: '<div class="top">Header</div>',
        bottom: '<div class="bottom">Footer</div>',
      },
    })

    expect(wrapper.vm.classes).toMatchObject({
      'v-data-table--has-top': true,
      'v-data-table--has-bottom': true,
    })
  })
})
