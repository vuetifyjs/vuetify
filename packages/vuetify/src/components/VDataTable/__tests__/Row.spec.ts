import Row from '../Row'
import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'
import Vue from 'vue'

describe('Table Row', () => {
  type Instance = InstanceType<typeof Row>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(Row, options)
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

  it.skip('should render with regular slots', () => {
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
        'column.petrol': '<p class="test">$0.68</p>',
        'column.diesel': '<p class="test">$0.65</p>',
      },
    })

    expect(wrapper.findAll('tr')).toHaveLength(1)
    expect(wrapper.findAll('td')).toHaveLength(2)
    expect(wrapper.findAll('p.test')).toHaveLength(2)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it.skip('should render with scoped slots', () => {
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
        'column.petrol': props => vm.$createElement('p', { staticClass: `test ${props.header.value}` }, [props.value]),
        'column.diesel': props => vm.$createElement('p', { staticClass: `test ${props.header.value}` }, [props.value]),
      },
    })

    expect(wrapper.findAll('tr')).toHaveLength(1)
    expect(wrapper.findAll('td')).toHaveLength(2)
    expect(wrapper.findAll('p.test')).toHaveLength(2)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
