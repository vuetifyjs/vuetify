// Components
import VTimeline from '../VTimeline'
import VTimelineItem from '../VTimelineItem'

// Helpers
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'
import { createRange } from '@/util'

describe('VTimeline', () => {
  const vuetify = createVuetify()
  const mountFunction = (options?: any) => mount(VTimeline, {
    ...options,
    global: {
      plugins: [vuetify],
    },
  })

  it('should match snapshot', () => {
    const wrapper = mountFunction({
      slots: {
        default: () => h(VTimelineItem, {}, () => 'item content'),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render in horizontal direction', () => {
    const wrapper = mountFunction({
      props: {
        direction: 'horizontal',
      },
      slots: {
        default: () => h(VTimelineItem, {}, () => 'item content'),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render opposite slot', () => {
    const wrapper = mountFunction({
      slots: {
        default: () => h(VTimelineItem, {}, {
          default: () => 'item content',
          opposite: () => 'opposite',
        }),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render icon slot', () => {
    const wrapper = mountFunction({
      slots: {
        default: () => h(VTimelineItem, {}, {
          default: () => 'item content',
          icon: () => 'icon',
        }),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should show all items on single side', () => {
    const wrapper = mountFunction({
      props: {
        side: 'after',
      },
      slots: {
        default: () => createRange(3).map(() => h(VTimelineItem, {}, () => 'item content')),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
