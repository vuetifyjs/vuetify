// Composables
import { useBackgroundColor, useColor, useTextColor } from '../color'

// Utilities
import { describe, expect, it } from '@jest/globals'
import { reactive, toRef } from 'vue'

describe('color.ts', () => {
  describe('useBackgroundColor', () => {
    it('should allow ref argument or return null', () => {
      const props = reactive({ color: 'primary' })
      const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))

      expect(backgroundColorClasses.value).toEqual(['bg-primary'])
      expect(backgroundColorStyles.value).toEqual({})
    })

    it.each([
      [{ bg: null }, [[], {}]],
      [{ bg: '' }, [[], {}]],
      [{ bg: 'primary' }, [['bg-primary'], {}]],
      [{ bg: '#FF00FF' }, [[], { backgroundColor: '#FF00FF' }]],
      // [{ bg: '#FF00FF' }, [[], { backgroundColor: '#FF00FF' }]],
    ])('should return correct color classes and styles', (value, [classes, styles]) => {
      const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(value as any, 'bg')

      expect(backgroundColorClasses.value).toEqual(classes)
      expect(backgroundColorStyles.value).toEqual(styles)
    })
  })

  describe('useColor', () => {
    it.each([
      [{ background: null }, [[], {}]],
      [{ background: '' }, [[], {}]],
      [{ background: 'primary' }, [['bg-primary'], {}]],
      [{ background: '#FF00FF' }, [[], { backgroundColor: '#FF00FF' }]],
      [{ text: null }, [[], {}]],
      [{ text: '' }, [[], {}]],
      [{ text: 'primary' }, [['text-primary'], {}]],
      [{ text: '#FF00FF' }, [[], { caretColor: '#FF00FF', color: '#FF00FF' }]],
    ])('should return correct color classes and styles', (value, [classes, styles]) => {
      const { colorClasses, colorStyles } = useColor({ value } as any)

      expect(colorClasses.value).toEqual(classes)
      expect(colorStyles.value).toEqual(styles)
    })
  })

  describe('useTextColor', () => {
    it('should allow ref argument or return null', () => {
      const props = reactive({ color: 'primary' })
      const { textColorClasses, textColorStyles } = useTextColor(toRef(props, 'color'))

      expect(textColorClasses.value).toEqual(['text-primary'])
      expect(textColorStyles.value).toEqual({})
    })

    it.each([
      [{ color: '' }, [[], {}]],
      [{ color: null }, [[], {}]],
      [{ color: 'primary' }, [['text-primary'], {}]],
      [{ color: '#FF00FF' }, [[], { caretColor: '#FF00FF', color: '#FF00FF' }]],
    ])('should return correct data', (value, [classes, styles]) => {
      const { textColorClasses, textColorStyles } = useTextColor(value as any, 'color')

      expect(textColorClasses.value).toEqual(classes)
      expect(textColorStyles.value).toEqual(styles)
    })
  })
})
