// Composables
import { makeMaskProps, useMask } from '../mask'

// Utilities
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from '@jest/globals'

describe('mask.ts', () => {
  it('should create mask props', () => {
    const wrapper = mount({
      props: makeMaskProps(),
      template: '<div/>',
    }, {
      propsData: {
        fillBlanks: false,
        mask: '####',
      },
    })

    expect(wrapper.props().fillBlanks).toBeDefined()
    expect(wrapper.props().mask).toBeDefined()
  })

  it('should take a string and return mask and unmask functions', () => {
    const { mask } = useMask({ mask: '##-##' })

    expect(mask(ref('5894'))).toBe('58-94')
    expect(mask(ref('58-94'))).toBe('58-94')
    expect(mask(ref('58- 94'))).toBe('58-94')
    expect(mask(ref('58 -94'))).toBe('58-94')
    expect(mask(ref('58 - 94'))).toBe('58-94')
    expect(mask(ref('58 - 9'))).toBe('58-9')
  })

  it('should take a string and return mask and unmask functions for letters', () => {
    const { mask } = useMask({ mask: '##aZ' })

    expect(mask(ref('58Zs'))).toBe('58zS')
  })
})
