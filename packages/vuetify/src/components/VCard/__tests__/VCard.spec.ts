import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'
import VCard from '../VCard'
import { ExtractVue } from '../../../util/mixins'

describe('VCard.vue', () => {
  type Instance = ExtractVue<typeof VCard>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VCard, {
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

  it('should render loading card', () => {
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

  it('should render card, which is link', () => {
    const wrapper = mountFunction({
      // https://github.com/vuejs/vue-test-utils/issues/1130
      sync: false,
      listeners: {
        click: () => {},
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render card with img', () => {
    const wrapper = mountFunction({
      propsData: {
        img: 'image.jpg',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a flat card', () => {
    const wrapper = mountFunction({
      propsData: {
        flat: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a raised card', () => {
    const wrapper = mountFunction({
      propsData: {
        raised: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a card with custom height', async () => {
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
