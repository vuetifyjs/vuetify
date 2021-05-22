// @ts-nocheck
/* eslint-disable */

import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'
// import VList from '../VList'
// import { ExtractVue } from '../../../util/mixins'

describe.skip('VList.vue', () => {
  type Instance = ExtractVue<typeof VList>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VList, {
        // https://github.com/vuejs/vue-test-utils/issues/1130
        sync: false,
        ...options,
      })
    }
  })

  it('should render component and match snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render loading list', () => {
    const wrapper = mountFunction({
      propsData: {
        loading: true,
      },
      mocks: {
        $vuetify: {
          rtl: false,
        },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render list, which is link', () => {
    const wrapper = mountFunction({
      // https://github.com/vuejs/vue-test-utils/issues/1130
      sync: false,
      listeners: {
        click: () => {},
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render list with img', () => {
    const wrapper = mountFunction({
      propsData: {
        img: 'image.jpg',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a flat list', () => {
    const wrapper = mountFunction({
      propsData: {
        flat: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a raised list', () => {
    const wrapper = mountFunction({
      propsData: {
        raised: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a list with custom height', async () => {
    const heightpx = '400px'
    const wrapper = mountFunction({
      // https://github.com/vuejs/vue-test-utils/issues/1130
      sync: false,
      propsData: {
        height: heightpx,
      },
    })

    expect(wrapper.element.style.height).toBe(heightpx)
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      height: 401,
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.element.style.height).toBe('401px')
  })
})
