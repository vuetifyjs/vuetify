import { test } from '~util/testing'
import maskable from './maskable'
import VTextField from '../components/VTextField'

const mask = () => {
  return {
    mixins: [maskable],

    render (h) {
      return h('div')
    }
  }
}

test('Maskable.js', ({ mount }) => {
  // Masks
  it('should add delimiter', () => {
    const wrapper = mount(mask(), {
      propsData: { mask: '(#' }
    })

    expect(wrapper.vm.maskText('5')).toBe('(5')
  })

  it('should add delimiters and masks', () => {
    const wrapper = mount(mask(), {
      propsData: { mask: '(###)#' }
    })

    wrapper.setProps({ mask: '(###) #'})
    wrapper.update()

    expect(wrapper.vm.maskText('4567')).toBe('(456) 7')

    wrapper.setProps({ mask: '#### - #### - #### - ####'})
    wrapper.update()

    expect(wrapper.vm.maskText('444444444')).toBe('4444 - 4444 - 4')

    wrapper.setProps({ mask: 'A## - ####'})
    wrapper.update()

    expect(wrapper.vm.maskText('A314444')).toBe('A31 - 4444')
  })

  it('should fill mask blanks', () => {
    const wrapper = mount(mask(), {
      propsData: {
        fillMaskBlanks: true,
        mask: '## - ##'
      }
    })

    expect(wrapper.vm.maskText('55')).toBe('55 - ')
  })

  it('should not fill if no value is provided', () => {
    const wrapper = mount(mask(), {
      propsData: {
        fillMaskBlanks: true,
        mask: '## - ##'
      }
    })

    expect(wrapper.vm.maskText('')).toBe('')
  })

  // // Unmasks
  it('should remove delimiter', () => {
    const wrapper = mount(mask(), {
      propsData: { mask: '(#' }
    })

    expect(wrapper.vm.unmaskText('(5')).toBe('5')
  })

  it('should return proper text length', () => {
    const wrapper = mount(mask(), {
      propsData: { mask: '###-##-####' }
    })

    expect(wrapper.vm.unmaskText('1111')).toBe('1111')
  })

  it('should remove delimiters and masks', () => {
    const wrapper = mount(mask(), {
      propsData: { mask: '(###)#' }
    })

    expect(wrapper.vm.unmaskText('(123)4')).toBe('1234')

    wrapper.setProps({ mask: '(###) #'})
    wrapper.update()

    expect(wrapper.vm.unmaskText('(456) 7')).toBe('4567')

    wrapper.setProps({ mask: '#### - #### - #### - ####'})
    wrapper.update()

    expect(wrapper.vm.unmaskText('4444 - 4444 - 4')).toBe('444444444')

    wrapper.setProps({ mask: 'A## - ####'})
    wrapper.update()

    expect(wrapper.vm.unmaskText('A31 - 4444')).toBe('A314444')
  })
})