// Components
import VIcon from '../VIcon'

// Utilities
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import * as framework from '@/framework'
import type { VuetifyIcons } from '@/composables'

describe('VIcon', () => {
  let vuetifyMock: jest.SpyInstance

  beforeEach(() => {
    vuetifyMock = jest.spyOn(framework, 'useVuetify').mockImplementation(() => ({
      defaults: {
        global: {},
      },
      icon: {
        icons: {
          checkboxOn: 'check_box',
          checkboxOff: {
            component: defineComponent({
              props: {
                foo: String,
              },
              setup (props) {
                return () => h('div', [props.foo])
              },
            }),
          },
        } as unknown as VuetifyIcons,
      },
    }))
  })

  afterEach(() => {
    vuetifyMock.mockClear()
  })

  it('should render component', () => {
    const wrapper = mount(VIcon, {
      props: {
        icon: 'add',
      },
    })

    expect(wrapper.text()).toBe('add')
    expect(wrapper.element.className).toBe('v-icon notranslate material-icons theme--light')
  })

  // it('should render a colored component', () => {
  //   const wrapper = mount(VIcon, { props: { color: 'green lighten-1' } })

  //   expect(wrapper.element.classList).toContain('green--text')
  //   expect(wrapper.element.classList).toContain('text--lighten-1')
  // })

  it('should render a disabled component', () => {
    const wrapper = mount(VIcon, { props: { icon: 'add', disabled: true } })

    expect(wrapper.element.classList).toContain('v-icon--disabled')
  })

  it('should use default size if none provided', () => {
    const wrapper = mount(VIcon, { props: { icon: 'add' } })

    expect(wrapper.element.classList).toContain('v-size--default')
  })

  it('should use provided size', () => {
    const wrapper = mount(VIcon, { props: { icon: 'add', size: 'x-small' } })

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
    const wrapper = mount(VIcon, { props: { icon: 'add', left: true } })

    expect(wrapper.element.classList).toContain('v-icon--left')
  })

  it('should render a right aligned component', () => {
    const wrapper = mount(VIcon, { props: { icon: 'add', right: true } })

    expect(wrapper.element.classList).toContain('v-icon--right')
  })

  it('should render a component with aria-hidden attr', () => {
    const wrapper = mount(VIcon, { props: { icon: 'add' }, attrs: { 'aria-hidden': 'foo' } })

    expect(wrapper.element.getAttribute('aria-hidden')).toBe('foo')
  })

  it('should allow third-party icons when using <icon>- prefix', () => {
    const wrapper = mount(VIcon, { props: { icon: 'fa-add' } })

    expect(wrapper.text()).toBe('')
    expect(wrapper.element.classList).toContain('fa')
    expect(wrapper.element.classList).toContain('fa-add')
  })

  it('should support font awesome 5 icons when using <icon>- prefix', () => {
    const wrapper = mount(VIcon, { props: { icon: 'fab fa-facebook' } })

    expect(wrapper.text()).toBe('')
    expect(wrapper.element.classList).toContain('fab')
    expect(wrapper.element.classList).toContain('fa-facebook')
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
    const wrapper = mount(VIcon, { props: { icon: '$checkboxOn' } })

    expect(wrapper.text()).toBe('check_box')
    expect(wrapper.element.className).toBe('v-icon notranslate material-icons theme--light')
  })

  //   it('should render MD left icon from $prev', () => {
  //     const wrapper = mountFunction({}, '$prev')

  //     expect(wrapper.text()).toBe('chevron_left')
  //     expect(wrapper.element.className).toBe('v-icon notranslate material-icons theme--light')
  //   })
  // })

  it('should use an <i> tag if none provided', () => {
    const wrapper = mount(VIcon, { props: { icon: 'add' } })

    expect(wrapper.element.localName).toBe('i')
  })

  it('sets tag from from prop if provided', () => {
    const wrapper = mount(VIcon, { props: { icon: 'add', tag: 'span' } })

    expect(wrapper.element.localName).toBe('span')
  })

  it('should render custom component', () => {
    const wrapper = mount(VIcon, { props: { icon: '$checkboxOff' } })

    expect(wrapper.html()).toMatchSnapshot()
  })

  //   it('should render a colored component', () => {
  //     const wrapper = mountFunction({ props: { color: 'green lighten-1' } }, '$testIcon')

  //     expect(wrapper.element.classList).toContain('green--text')
  //     expect(wrapper.element.classList).toContain('text--lighten-1')
  //   })

  it('should render a disabled icon', () => {
    const wrapper = mount(VIcon, { props: { icon: 'add', disabled: true } })

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
    const wrapper = mount(VIcon, { props: { icon: 'add', onClick: clickHandler } })
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
    const wrapper = mount(VIcon, { props: { icon: 'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z' } })

    expect(wrapper.html()).toMatchSnapshot()
  })
  // })
})
