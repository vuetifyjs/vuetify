// Components
import VBreadcrumbs from '../VBreadcrumbs'
import VBreadcrumbsItem from '../VBreadcrumbsItem'

// Utilities
import { compileToFunctions } from 'vue-template-compiler'
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

describe('VBreadcrumbs.ts', () => {
  type Instance = InstanceType<typeof VBreadcrumbs>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VBreadcrumbs, {
        ...options,
      })
    }
  })

  it('should have breadcrumbs classes', () => {
    const wrapper = mount(VBreadcrumbs)

    expect(wrapper.classes('v-breadcrumbs')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render items without slot', () => {
    const wrapper = mountFunction({
      propsData: {
        items: [
          { text: 'a' },
          { text: 'b' },
          { text: 'c' },
          { text: 'd' },
        ],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should not complain about identical keys', () => {
    mountFunction({
      propsData: {
        items: [
          { text: 'a' },
          { text: 'a' },
        ],
      },
    })

    expect(`Duplicate keys detected: 'a'`).not.toHaveBeenWarned()
  })

  it('should use slot to render items if present', () => {
    const wrapper = mountFunction({
      propsData: {
        items: [
          { text: 'a' },
          { text: 'b' },
          { text: 'c' },
          { text: 'd' },
        ],
      },
      scopedSlots: {
        item (props) {
          return this.$createElement(VBreadcrumbsItem, {
            key: props.item.text,
          }, props.item.text.toUpperCase())
        },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should use a custom divider slot', () => {
    const wrapper = mountFunction({
      propsData: {
        items: [
          { text: 'a' },
          { text: 'b' },
          { text: 'c' },
          { text: 'd' },
        ],
      },
      slots: {
        divider: '/divider/',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
