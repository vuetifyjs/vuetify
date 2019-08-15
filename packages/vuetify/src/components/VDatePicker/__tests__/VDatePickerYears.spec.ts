import VDatePickerYears from '../VDatePickerYears'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

describe('VDatePickerYears.ts', () => {
  type Instance = InstanceType<typeof VDatePickerYears>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VDatePickerYears, {
        ...options,
        mocks: {
          $vuetify: {
            rtl: false,
            lang: {
              t: () => {},
            },
          },
        },
      })
    }
  })

  it('should render component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2000',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should respect min/max props', async () => {
    const wrapper = mountFunction({
      propsData: {
        min: 1234,
        max: 1238,
      },
    })

    expect(wrapper.findAll('li:first-child').at(0).element.textContent).toBe('1238')
    expect(wrapper.findAll('li:last-child').at(0).element.textContent).toBe('1234')
  })

  it('should not allow min to be greater then max', async () => {
    const wrapper = mountFunction({
      propsData: {
        min: 1238,
        max: 1234,
      },
    })
    expect(wrapper.findAll('li')).toHaveLength(1)
    expect(wrapper.findAll('li').at(0).element.textContent).toBe('1234')
    expect(wrapper.findAll('li').at(0).element.textContent).toBe('1234')
  })

  it('should emit event on year click', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: 1999,
      },
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    wrapper.findAll('li.active + li').at(0).trigger('click')
    expect(input).toHaveBeenCalledWith(1998)
  })

  it('should format years', async () => {
    const wrapper = mountFunction({
      propsData: {
        format: year => `(${year})`,
        min: 1001,
        max: 1001,
      },
    })

    expect(wrapper.findAll('li').at(0).element.textContent).toBe('(1001)')
  })
})
