// Composables
import { useBackgroundColor, useColor, useTextColor } from '../color'

// Utilities
import { reactive, shallowRef } from 'vue'

describe('color.ts', () => {
  describe('useBackgroundColor', () => {
    it('should mix CSS colors without discarding their alpha', () => {
      const { backgroundColorStyles } = useBackgroundColor('rgba(255, 0, 0, 0.5)', 0.4)

      expect(backgroundColorStyles.value).toEqual({
        '--v-background-opacity': 0.4,
        backgroundColor: 'color-mix(in srgb, rgba(255, 0, 0, 0.5) calc(var(--v-background-opacity) * 100%), transparent)',
      })
    })

    it('should react to color and opacity changes including zero and undefined', () => {
      const color = shallowRef('primary')
      const opacity = shallowRef<number | string | undefined>(0.4)
      const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(color, () => opacity.value)

      expect(backgroundColorClasses.value).toEqual(['bg-primary'])
      expect(backgroundColorStyles.value).toEqual({ '--v-background-opacity': 0.4 })

      opacity.value = 0
      expect(backgroundColorStyles.value).toEqual({ '--v-background-opacity': 0 })

      color.value = '#FF00FF'
      opacity.value = 'var(--v-scrim-opacity)'
      expect(backgroundColorStyles.value.backgroundColor).toContain('color-mix(in srgb, #FF00FF')
      expect(backgroundColorStyles.value['--v-background-opacity']).toBe('var(--v-scrim-opacity)')

      opacity.value = undefined
      expect(backgroundColorStyles.value).toEqual({ backgroundColor: '#FF00FF' })
    })

    it('should allow ref argument or return null', () => {
      const props = reactive({ color: 'primary' })
      const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(() => props.color)

      expect(backgroundColorClasses.value).toEqual(['bg-primary'])
      expect(backgroundColorStyles.value).toEqual({})
    })

    it.each([
      [{ bg: null }, [[], {}]],
      [{ bg: '' }, [[], {}]],
      [{ bg: 'primary' }, [['bg-primary'], {}]],
      [{ bg: 'bg-primary' }, [['bg-primary'], {}]],
      [{ bg: '#FF00FF' }, [['v-theme-on-dark'], { backgroundColor: '#FF00FF' }]],
    ])('should return correct color classes and styles', (value, [classes, styles]) => {
      const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(() => value.bg)

      expect(backgroundColorClasses.value).toEqual(classes)
      expect(backgroundColorStyles.value).toEqual(styles)
    })
  })

  describe('useColor', () => {
    it.each([
      [{ background: null }, [[], {}]],
      [{ background: '' }, [[], {}]],
      [{ background: 'primary' }, [['bg-primary'], {}]],
      [{ background: 'bg-primary' }, [['bg-primary'], {}]],
      [{ background: '#FF00FF' }, [['v-theme-on-dark'], { backgroundColor: '#FF00FF' }]],
      [{ text: null }, [[], {}]],
      [{ text: '' }, [[], {}]],
      [{ text: 'primary' }, [['text-primary'], {}]],
      [{ text: 'text-primary' }, [['text-primary'], {}]],
      [{ text: '#FF00FF' }, [[], { caretColor: '#FF00FF', color: '#FF00FF' }]],
    ])('should return correct color classes and styles', (value, [classes, styles]) => {
      const { colorClasses, colorStyles } = useColor(value)

      expect(colorClasses.value).toEqual(classes)
      expect(colorStyles.value).toEqual(styles)
    })
  })

  describe('useTextColor', () => {
    it('should allow ref argument or return null', () => {
      const props = reactive({ color: 'primary' })
      const { textColorClasses, textColorStyles } = useTextColor(() => props.color)

      expect(textColorClasses.value).toEqual(['text-primary'])
      expect(textColorStyles.value).toEqual({})
    })

    it.each([
      [{ color: '' }, [[], {}]],
      [{ color: null }, [[], {}]],
      [{ color: 'primary' }, [['text-primary'], {}]],
      [{ color: 'text-primary' }, [['text-primary'], {}]],
      [{ color: '#FF00FF' }, [[], { caretColor: '#FF00FF', color: '#FF00FF' }]],
    ])('should return correct data', (value, [classes, styles]) => {
      const { textColorClasses, textColorStyles } = useTextColor(() => value.color)

      expect(textColorClasses.value).toEqual(classes)
      expect(textColorStyles.value).toEqual(styles)
    })
  })
})
