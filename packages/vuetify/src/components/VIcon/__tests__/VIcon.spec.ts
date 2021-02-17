// Components
import { VIcon } from '../'

// Utilities
import { mount } from '@vue/test-utils'
import { VuetifySymbol } from '@/framework'
import { defaultSets, VuetifyIconSymbol } from '@/composables/icons'
import { mdi } from '@/iconsets/mdi'
import { md } from '@/iconsets/md'
import { fa } from '@/iconsets/fa'
import { h, Text } from 'vue'

const globalOptions = {
  provide: {
    [VuetifySymbol as symbol]: {
      defaults: {
        global: {},
      },
    },
    [VuetifyIconSymbol as symbol]: {
      defaultSet: 'mdi',
      aliases: {
        checkboxOn: 'mdi-check',
      },
      sets: {
        ...defaultSets,
        mdi,
        md,
        fa,
      },
    },
  },
}

describe('VIcon', () => {
  it('should render ligature icon', () => {
    const wrapper = mount(VIcon, {
      props: {
        icon: 'md:add',
      },
      global: globalOptions,
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should support an icon name in the default slot', () => {
    const wrapper = mount(VIcon, {
      slots: {
        default: () => h(Text, null, 'md:add'),
      },
      global: globalOptions,
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  // eslint-disable-next-line jest/no-commented-out-tests
  // it('should render a colored component', () => {
  //   const wrapper = mount(VIcon, { props: { color: 'green lighten-1' } })

  //   expect(wrapper.element.classList).toContain('green--text')
  //   expect(wrapper.element.classList).toContain('text--lighten-1')
  // })

  it('should render a disabled component', () => {
    const wrapper = mount(VIcon, { props: { icon: 'mdi-add', disabled: true }, global: globalOptions })

    expect(wrapper.element.classList).toContain('v-icon--disabled')
  })

  it('should use default size if none provided', () => {
    const wrapper = mount(VIcon, { props: { icon: 'mdi-add' }, global: globalOptions })

    expect(wrapper.element.classList).toContain('v-icon--size-default')
  })

  it('should use provided size', () => {
    const wrapper = mount(VIcon, { props: { icon: 'mdi-add', size: 'x-small' }, global: globalOptions })

    expect(wrapper.element.classList).toContain('v-icon--size-x-small')
  })

  it('should render a specific size', () => {
    const wrapper = mount(VIcon, { props: { icon: 'mdi-add', size: '112px' }, global: globalOptions })

    expect(wrapper.element.style.fontSize).toBe('112px')
  })

  it('should render a left aligned component', () => {
    const wrapper = mount(VIcon, { props: { icon: 'mdi-add', left: true }, global: globalOptions })

    expect(wrapper.element.classList).toContain('v-icon--left')
  })

  it('should render a right aligned component', () => {
    const wrapper = mount(VIcon, { props: { icon: 'mdi-add', right: true }, global: globalOptions })

    expect(wrapper.element.classList).toContain('v-icon--right')
  })

  it('should render a component with aria-hidden attr', () => {
    const wrapper = mount(VIcon, { props: { icon: 'mdi-add' }, attrs: { 'aria-hidden': 'foo' }, global: globalOptions })

    expect(wrapper.element.getAttribute('aria-hidden')).toBe('foo')
  })

  it('should render a class icon', () => {
    const wrapper = mount(VIcon, { props: { icon: 'fa:fas fa-add' }, global: globalOptions })

    expect(wrapper.text()).toBe('')
    expect(wrapper.element.classList).toContain('fas')
    expect(wrapper.element.classList).toContain('fa-add')
  })

  it('should render globally defined icon', () => {
    const wrapper = mount(VIcon, { props: { icon: '$checkboxOn' }, global: globalOptions })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should use an <i> tag if none provided', () => {
    const wrapper = mount(VIcon, { props: { icon: 'mdi-add' }, global: globalOptions })

    expect(wrapper.element.localName).toBe('i')
  })

  it('should use tag from from prop if provided', () => {
    const wrapper = mount(VIcon, { props: { icon: 'mdi-add', tag: 'span' }, global: globalOptions })

    expect(wrapper.element.localName).toBe('span')
  })

  // eslint-disable-next-line jest/no-commented-out-tests
  //   it('should render a colored component', () => {
  //     const wrapper = mountFunction({ props: { color: 'green lighten-1' } }, '$testIcon')

  //     expect(wrapper.element.classList).toContain('green--text')
  //     expect(wrapper.element.classList).toContain('text--lighten-1')
  //   })

  it('should render an svg icon', async () => {
    const wrapper = mount(VIcon, {
      props: {
        icon: 'svg:M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z',
      },
      global: globalOptions,
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should add custom class', async () => {
    const wrapper = mount(VIcon, {
      props: {
        icon: 'mdi-add',
      },
      attrs: {
        class: 'custom',
      },
      global: globalOptions,
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should add custom style', async () => {
    const wrapper = mount(VIcon, {
      props: {
        icon: 'mdi-add',
      },
      attrs: {
        style: {
          color: 'red',
        },
      },
      global: globalOptions,
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
