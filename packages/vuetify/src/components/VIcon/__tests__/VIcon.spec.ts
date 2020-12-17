// Components
import { VIcon, VClassIcon, VSvgIcon, VLigatureIcon } from '../'

// Utilities
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { VuetifySymbol } from '@/framework'
import { VuetifyIconSymbol } from '@/composables'

// Types
import type { IconProps } from '@/composables'

const globalOptions = {
  provide: {
    [VuetifySymbol as symbol]: {
      defaults: {
        global: {},
      },
    },
    [VuetifyIconSymbol as symbol]: {
      mdi: {
        component: (props: IconProps) => h(VClassIcon, props),
        values: {
          checkboxOn: 'mdi-check',
        },
      },
      fa: {
        component: (props: IconProps) => h(VClassIcon, props),
      },
      'material-icons': {
        component: (props: IconProps) => h(VLigatureIcon, props),
      },
      svg: {
        component: (props: IconProps) => h(VSvgIcon, props),
      },
    },
  },
}

describe('VIcon', () => {
  it('should render ligature icon', () => {
    const wrapper = mount(VIcon, {
      props: {
        set: 'material-icons',
        icon: 'add',
      },
      global: globalOptions,
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  // it('should render a colored component', () => {
  //   const wrapper = mount(VIcon, { props: { color: 'green lighten-1' } })

  //   expect(wrapper.element.classList).toContain('green--text')
  //   expect(wrapper.element.classList).toContain('text--lighten-1')
  // })

  it('should render a disabled component', () => {
    const wrapper = mount(VIcon, { props: { icon: 'add', disabled: true }, global: globalOptions })

    expect(wrapper.element.classList).toContain('v-icon--disabled')
  })

  it('should use default size if none provided', () => {
    const wrapper = mount(VIcon, { props: { icon: 'add' }, global: globalOptions })

    expect(wrapper.element.classList).toContain('v-size--default')
  })

  it('should use provided size', () => {
    const wrapper = mount(VIcon, { props: { icon: 'add', size: 'x-small' }, global: globalOptions })

    expect(wrapper.element.classList).toContain('v-size--x-small')
  })

  // it('should render a specific size with String type', () => {
  //   const wrapper = mountFunction({ props: { size: '112px' } })

  //   expect(wrapper.element.style.fontSize).toBe('112px')
  // })

  // it('should render a specific size with Number type', () => {
  //   const wrapper = mountFunction({ props: { size: '112' } })

  //   expect(wrapper.element.style.fontSize).toBe('112px')
  // })

  it('should render a left aligned component', () => {
    const wrapper = mount(VIcon, { props: { icon: 'add', left: true }, global: globalOptions })

    expect(wrapper.element.classList).toContain('v-icon--left')
  })

  it('should render a right aligned component', () => {
    const wrapper = mount(VIcon, { props: { icon: 'add', right: true }, global: globalOptions })

    expect(wrapper.element.classList).toContain('v-icon--right')
  })

  it('should render a component with aria-hidden attr', () => {
    const wrapper = mount(VIcon, { props: { icon: 'add' }, attrs: { 'aria-hidden': 'foo' }, global: globalOptions })

    expect(wrapper.element.getAttribute('aria-hidden')).toBe('foo')
  })

  it('should render a class icon', () => {
    const wrapper = mount(VIcon, { props: { set: 'fa', icon: 'fa-add' }, global: globalOptions })

    expect(wrapper.text()).toBe('')
    expect(wrapper.element.classList).toContain('fa')
    expect(wrapper.element.classList).toContain('fa-add')
  })

  // it('should allow the use of v-text', () => {
  //   const wrapper = mountFunction({
  //     domProps: { textContent: 'fa-home' },
  //   })

  //   expect(wrapper.text()).toBe('')
  //   expect(wrapper.element.className).toBe('v-icon notranslate fa fa-home theme--light')
  // })

  // it('should allow the use of v-html', () => {
  //   const wrapper = mountFunction({
  //     domProps: { innerHTML: 'fa-home' },
  //   })

  //   expect(wrapper.text()).toBe('')
  //   expect(wrapper.element.className).toBe('v-icon notranslate fa fa-home theme--light')
  // })

  // it('set font size from helper prop', async () => {
  //   const iconFactory = size => mountFunction({
  //     props: { [size]: true },
  //   })

  //   const small = iconFactory('small')
  //   expect(small.html()).toMatchSnapshot()

  //   const medium = iconFactory('medium')
  //   expect(medium.html()).toMatchSnapshot()

  //   const large = iconFactory('large')
  //   expect(large.html()).toMatchSnapshot()

  //   const xLarge = iconFactory('xLarge')
  //   expect(xLarge.html()).toMatchSnapshot()
  // })

  // it('should have proper classname', () => {
  //   const wrapper = mountFunction({
  //     props: {
  //       color: 'primary',
  //     },
  //     domProps: {
  //       innerHTML: 'fa-lock',
  //     },
  //   })

  //   expect(wrapper.element.className).toBe('v-icon notranslate fa fa-lock theme--light primary--text')
  // })

  it('should render globally defined icon', () => {
    const wrapper = mount(VIcon, { props: { icon: '$checkboxOn' }, global: globalOptions })

    expect(wrapper.html()).toMatchSnapshot()
  })

  //   it('should render MD left icon from $prev', () => {
  //     const wrapper = mountFunction({}, '$prev')

  //     expect(wrapper.text()).toBe('chevron_left')
  //     expect(wrapper.element.className).toBe('v-icon notranslate material-icons theme--light')
  //   })
  // })

  it('should use an <i> tag if none provided', () => {
    const wrapper = mount(VIcon, { props: { icon: 'add' }, global: globalOptions })

    expect(wrapper.element.localName).toBe('i')
  })

  it('should use tag from from prop if provided', () => {
    const wrapper = mount(VIcon, { props: { icon: 'add', tag: 'span' }, global: globalOptions })

    expect(wrapper.element.localName).toBe('span')
  })

  //   it('should render a colored component', () => {
  //     const wrapper = mountFunction({ props: { color: 'green lighten-1' } }, '$testIcon')

  //     expect(wrapper.element.classList).toContain('green--text')
  //     expect(wrapper.element.classList).toContain('text--lighten-1')
  //   })

  it('should render a disabled icon', () => {
    const wrapper = mount(VIcon, { props: { icon: 'add', disabled: true }, global: globalOptions })

    expect(wrapper.element.classList).toContain('v-icon--disabled')
  })

  //   it('should set font size from helper prop', async () => {
  //     const iconFactory = size => mountFunction({
  //       props: { [size]: true },
  //     }, '$testIcon')

  //     const small = iconFactory('small')
  //     expect(small.html()).toMatchSnapshot()

  //     const medium = iconFactory('medium')
  //     expect(medium.html()).toMatchSnapshot()

  //     const large = iconFactory('large')
  //     expect(large.html()).toMatchSnapshot()

  //     const xLarge = iconFactory('xLarge')
  //     expect(xLarge.html()).toMatchSnapshot()
  //   })

  //   it('should render a left aligned component', () => {
  //     const wrapper = mountFunction({ props: { left: true } }, '$testIcon')

  //     expect(wrapper.element.classList).toContain('v-icon--left')
  //   })

  //   it('should render a right aligned component', () => {
  //     const wrapper = mountFunction({ props: { right: true } }, '$testIcon')

  //     expect(wrapper.element.classList).toContain('v-icon--right')
  //   })

  it('should render clickable icon if click handler specified', () => {
    const clickHandler = jest.fn()
    const wrapper = mount(VIcon, { props: { set: 'mdi', icon: 'mdi-add', onClick: clickHandler }, global: globalOptions })
    wrapper.trigger('click')

    expect(wrapper.element.classList).toContain('v-icon--link')
    expect(clickHandler).toHaveBeenCalled()
    expect(wrapper.element.getAttribute('aria-hidden')).toBe('false')
    expect(wrapper.element.getAttribute('type')).toBe('button')
  })

  //   it('should trim name', () => {
  //     const wrapper = mountFunction({}, ' add ')

  //     expect(wrapper.text()).toBe('add')
  //   })

  it('should render an svg icon', async () => {
    const wrapper = mount(VIcon, {
      props: {
        set: 'svg',
        icon: 'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z',
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
  // })
})
