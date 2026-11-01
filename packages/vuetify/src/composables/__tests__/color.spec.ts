// Composables
import { useBackgroundColor, useColor, useTextColor } from '../color'

// Utilities
import { reactive } from 'vue'

describe('color.ts', () => {
  describe('useBackgroundColor', () => {
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
      [{ bg: 'rgb(var(--v-theme-primary))' }, [[], { backgroundColor: 'rgb(var(--v-theme-primary))' }]],
      [{ bg: 'oklch(70% 0.2 150)' }, [[], { backgroundColor: 'oklch(70% 0.2 150)' }]],
      [{ bg: 'color-mix(in srgb, red 50%, blue)' }, [[], { backgroundColor: 'color-mix(in srgb, red 50%, blue)' }]],
      [{ bg: 'linear-gradient(90deg, #000, #fff)' }, [[], { backgroundImage: 'linear-gradient(90deg, #000, #fff)' }]],
      [{ bg: 'repeating-conic-gradient(#000, #fff)' }, [[], { backgroundImage: 'repeating-conic-gradient(#000, #fff)' }]],
      [{ bg: 'url(data:image/gif;base64,R0lGOD)' }, [[], { backgroundImage: 'url(data:image/gif;base64,R0lGOD)' }]],
      [{ bg: 'url("data:image/svg+xml,%3Csvg a=\'b\'/%3E")' }, [[], { backgroundImage: 'url("data:image/svg+xml,%3Csvg a=\'b\'/%3E")' }]],
      [{ bg: 'linear-gradient(rgb(var(--a)), #fff)' }, [[], { backgroundImage: 'linear-gradient(rgb(var(--a)), #fff)' }]],
      [{ bg: 'url(/pattern.svg)' }, [[], {}]], // ignores URL with path
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
      [{ color: 'oklch(70% 0.2 150)' }, [[], { caretColor: 'oklch(70% 0.2 150)', color: 'oklch(70% 0.2 150)' }]],
      [{ color: 'linear-gradient(90deg, #000, #fff)' }, [[], {}]],
      [{ color: 'url(#pattern)' }, [[], {}]],
    ])('should return correct data', (value, [classes, styles]) => {
      const { textColorClasses, textColorStyles } = useTextColor(() => value.color)

      expect(textColorClasses.value).toEqual(classes)
      expect(textColorStyles.value).toEqual(styles)
    })
  })
})
