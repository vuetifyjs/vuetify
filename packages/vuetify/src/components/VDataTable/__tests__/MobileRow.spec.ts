// @ts-nocheck
/* eslint-disable */

// import MobileRow from '../MobileRow'
import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'
// import Vue from 'vue'

describe.skip('MobileRow', () => {
  type Instance = InstanceType<typeof MobileRow>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(MobileRow, options)
    }
  })

  it('should render without slots', () => {
    const wrapper = mountFunction({
      context: {
        props: {
          headers: [
            { text: 'Petrol', value: 'petrol' },
            { text: 'Diesel', value: 'diesel' },
          ],
          item: {
            petrol: 0.68,
            diesel: 0.65,
          },
        },
      },
    })

    expect(wrapper.findAll('tr')).toHaveLength(1)
    expect(wrapper.findAll('td')).toHaveLength(2)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render non-string values', () => {
    const wrapper = mountFunction({
      context: {
        props: {
          headers: [
            { value: 'string' },
            { value: 'number' },
            { value: 'array' },
            { value: 'boolean' },
            { value: 'object' },
            { value: 'undefined' },
            { value: 'null' },
          ],
          item: {
            string: 'string',
            number: 12.34,
            array: [1, 2],
            boolean: false,
            object: { foo: 'bar' },
            null: null,
          },
        },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with regular slots', () => {
    const wrapper = mountFunction({
      context: {
        props: {
          headers: [
            { text: 'Petrol', value: 'petrol' },
            { text: 'Diesel', value: 'diesel' },
          ],
        },
      },
      slots: {
        petrol: '<p class="test">$0.68</p>',
        diesel: '<p class="test">$0.65</p>',
      },
    })

    expect(wrapper.findAll('tr')).toHaveLength(1)
    expect(wrapper.findAll('td')).toHaveLength(2)
    expect(wrapper.findAll('p.test')).toHaveLength(2)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with scoped slots', () => {
    const vm = new Vue()
    const wrapper = mountFunction({
      context: {
        props: {
          headers: [
            { text: 'Petrol', value: 'petrol' },
            { text: 'Diesel', value: 'diesel' },
          ],
          item: {
            petrol: 0.68,
            diesel: 0.65,
          },
        },
      },
      scopedSlots: {
        petrol: props => vm.$createElement('p', { staticClass: `test ${props.header.value}` }, [props.value]),
        diesel: props => vm.$createElement('p', { staticClass: `test ${props.header.value}` }, [props.value]),
      },
    })

    expect(wrapper.findAll('tr')).toHaveLength(1)
    expect(wrapper.findAll('td')).toHaveLength(2)
    expect(wrapper.findAll('p.test')).toHaveLength(2)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render without header when hideDefaultHeader: true', () => {
    const wrapper = mountFunction({
      context: {
        props: {
          headers: [
            { text: 'Petrol', value: 'petrol' },
            { text: 'Diesel', value: 'diesel' },
          ],
          hideDefaultHeader: true,
          item: {
            petrol: 0.68,
            diesel: 0.65,
          },
        },
      },
    })

    expect(wrapper.findAll('tr')).toHaveLength(1)
    expect(wrapper.findAll('td')).toHaveLength(2)
    expect(wrapper.findAll('.v-data-table__mobile-row__header')).toHaveLength(0)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
