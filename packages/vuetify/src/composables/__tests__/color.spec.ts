// Composables
import { useBackgroundColor, useColor, useTextColor } from '../color'

// Utilities
import { reactive, ref, toRef } from 'vue'

describe('color', () => {
  describe('useColor', () => {
    it('should return correct data', () => {
      const colors = ref<{ background?: string | null, text?: string | null }>({
        background: 'primary',
        text: 'secondary',
      })

      const data = useColor(colors)
      expect(data.colorClasses.value).toEqual(['bg-primary', 'text-secondary'])
      expect(data.colorStyles.value).toEqual({})

      colors.value.text = null
      expect(data.colorClasses.value).toEqual(['bg-primary'])
      expect(data.colorStyles.value).toEqual({})

      colors.value.background = '#ff00ff'
      expect(data.colorClasses.value).toEqual([])
      expect(data.colorStyles.value).toEqual({
        backgroundColor: '#ff00ff',
      })

      colors.value.text = 'primary'
      expect(data.colorClasses.value).toEqual(['text-primary'])
      expect(data.colorStyles.value).toEqual({
        backgroundColor: '#ff00ff',
      })
    })
  })

  describe('useTextColor', () => {
    it('should return correct data', () => {
      const props = reactive({
        color: null as string | null,
      })
      const data = useTextColor(props, 'color')
      expect(data.textColorClasses.value).toEqual([])
      expect(data.textColorStyles.value).toEqual({})

      props.color = 'primary'
      expect(data.textColorClasses.value).toEqual(['text-primary'])
      expect(data.textColorStyles.value).toEqual({})

      props.color = ''
      expect(data.textColorClasses.value).toEqual([])
      expect(data.textColorStyles.value).toEqual({})

      props.color = '#ff00ff'
      expect(data.textColorClasses.value).toEqual([])
      expect(data.textColorStyles.value).toEqual({
        caretColor: '#ff00ff',
        color: '#ff00ff',
      })
    })

    it('should allow ref argument', () => {
      const props = reactive({
        color: 'primary',
      })
      const data = useTextColor(toRef(props, 'color'))

      expect(data.textColorClasses.value).toEqual(['text-primary'])
      expect(data.textColorStyles.value).toEqual({})
    })
  })

  describe('useBackgroundColor', () => {
    it('should return correct data', () => {
      const props = reactive({
        bg: null as string | null,
      })
      const data = useBackgroundColor(props, 'bg')
      expect(data.backgroundColorClasses.value).toEqual([])
      expect(data.backgroundColorStyles.value).toEqual({})

      props.bg = 'primary'
      expect(data.backgroundColorClasses.value).toEqual(['bg-primary'])
      expect(data.backgroundColorStyles.value).toEqual({})

      props.bg = ''
      expect(data.backgroundColorClasses.value).toEqual([])
      expect(data.backgroundColorStyles.value).toEqual({})

      props.bg = '#ff00ff'
      expect(data.backgroundColorClasses.value).toEqual([])
      expect(data.backgroundColorStyles.value).toEqual({
        backgroundColor: '#ff00ff',
      })
    })

    it('should allow ref argument', () => {
      const props = reactive({
        color: 'primary',
      })
      const data = useBackgroundColor(toRef(props, 'color'))

      expect(data.backgroundColorClasses.value).toEqual(['bg-primary'])
      expect(data.backgroundColorStyles.value).toEqual({})
    })
  })
})
