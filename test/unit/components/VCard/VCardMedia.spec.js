import { test } from '@/test'
import { VCardMedia } from '@/components/VCard'

test('VCardMedia.js', ({ mount }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VCardMedia)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with contained background and match snapshot', () => {
    const wrapper = mount(VCardMedia, {
      propsData: {
        src: 'file.jpg',
        contain: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with images with urls that contain the ( & ) characters', () => {
    const wrapper = mount(VCardMedia, {
      propsData: {
        src: 'file(1).jpg',
        contain: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom height (string) and match snapshot', () => {
    const wrapper = mount(VCardMedia, {
      propsData: {
        height: '100px'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom height (number) and match snapshot', () => {
    const wrapper = mount(VCardMedia, {
      propsData: {
        height: 100
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render matching components with custom height', () => {
    const wrapper1 = mount(VCardMedia, {
      propsData: {
        height: '100px'
      }
    })
    const wrapper2 = mount(VCardMedia, {
      propsData: {
        height: 100
      }
    })

    expect(wrapper1.html()).toEqual(wrapper2.html())
  })

  it('should render component with custom background image and match snapshot', () => {
    const wrapper = mount(VCardMedia, {
      propsData: {
        src: 'https://vuetifyjs.com/static/doc-images/cards/sunshine.jpg'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
