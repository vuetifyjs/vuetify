import VPagination from '../VPagination'

import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'

describe('VPagination.ts', () => {
  const vuetify = createVuetify()
  const mountFunction = (options?: any) => mount(VPagination, {
    ...options,
    global: {
      plugins: [vuetify],
    },
  })

  it('emits an event when next or previous is clicked', async () => {
    const wrapper = mountFunction({
      props: {
        length: 5,
        modelValue: 2,
      },
    })

    const prev = wrapper.find('.v-pagination__prev > .v-btn')
    await prev.trigger('click')

    expect(wrapper.emitted('prev')).toEqual([[1]])

    const next = wrapper.find('.v-pagination__next > .v-btn')
    await next.trigger('click')

    expect(wrapper.emitted('next')).toEqual([[3]])
  })

  it.skip('should render component in RTL mode and match snapshot', async () => {
    const wrapper = mountFunction({
      props: {
        length: 5,
        modelValue: 2,
      },
    })

    wrapper.vm.$vuetify.rtl = true
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    wrapper.vm.$vuetify.rtl = undefined
  })

  it('emits an event when pagination item is clicked', async () => {
    const wrapper = mountFunction({
      props: {
        length: 5,
        modelValue: 1,
      },
    })

    const navigation = wrapper.findAll('.v-pagination__item > .v-btn')
    navigation[1].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toEqual([[2]])
  })

  it('should render disabled buttons with length equals to 0', async () => {
    const wrapper = mountFunction({
      props: {
        length: 0,
        modelValue: 1,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should use totalVisible prop if defined', async () => {
    const wrapper = mountFunction({
      props: {
        length: 100,
        modelValue: 50,
        totalVisible: 10,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render correct pages when using start prop', async () => {
    const wrapper = mountFunction({
      props: {
        start: 3,
        length: 10,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  // https://github.com/vuetifyjs/vuetify/issues/7947
  it.skip('should never show more than the max number of allowed buttons', () => {
    const wrapper = mountFunction({
      data: () => ({
        maxButtons: 4,
      }),

      props: {
        length: 40,
        totalVisible: 10,
      },
    })

    expect(wrapper.vm.items).toHaveLength(4)

    wrapper.setData({ maxButtons: 12 })

    expect(wrapper.vm.items).toHaveLength(10)
  })

  it.skip('should never show more than the number of total visible buttons', () => {
    const wrapper = mountFunction({
      data: () => ({
        maxButtons: 0,
      }),

      props: {
        length: 5,
        totalVisible: undefined,
      },
    })

    expect(wrapper.vm.items).toHaveLength(5)

    wrapper.setProps({ length: 40 })

    wrapper.setData({ maxButtons: 0 })
    wrapper.setProps({ totalVisible: 10 })
    expect(wrapper.vm.items).toHaveLength(10)

    wrapper.setData({ maxButtons: 11 })
    wrapper.setProps({ totalVisible: undefined })
    expect(wrapper.vm.items).toHaveLength(11)

    wrapper.setData({ maxButtons: 12 })
    wrapper.setProps({ totalVisible: 13 })
    expect(wrapper.vm.items).toHaveLength(12)
  })

  it.skip('should return length when maxButtons is less than 1', () => {
    const wrapper = mountFunction({
      data: () => ({ maxButtons: -3 }),
      props: { length: 4 },
    })

    expect(wrapper.vm.items).toEqual([1, 2, 3, 4])
  })
})
