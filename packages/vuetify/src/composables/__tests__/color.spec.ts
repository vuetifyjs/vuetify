// Composables
import { useBackgroundColor, useTextColor } from '../color'

// Utilities
import { reactive, toRef } from 'vue'

describe('color.ts', () => {
  describe('useTextColor', () => {
    it('should return correct data', () => {
      const props = reactive({
        color: null as string | null,
      })
      const data = useTextColor(props, 'color')
      expect(data.textColorClasses.value).toBeNull()
      expect(data.textColorStyles.value).toBeNull()

      props.color = 'primary'
      expect(data.textColorClasses.value).toEqual('text-primary')
      expect(data.textColorStyles.value).toBeNull()

      props.color = ''
      expect(data.textColorClasses.value).toBeNull()
      expect(data.textColorStyles.value).toBeNull()

      props.color = '#ff00ff'
      expect(data.textColorClasses.value).toBeNull()
      expect(data.textColorStyles.value).toEqual({
        'caret-color': '#ff00ff',
        color: '#ff00ff',
      })
    })

    it('should allow ref argument', () => {
      const props = reactive({
        color: 'primary',
      })
      const data = useTextColor(toRef(props, 'color'))

      expect(data.textColorClasses.value).toEqual('text-primary')
      expect(data.textColorStyles.value).toBeNull()
    })
  })

  describe('useBackgroundColor', () => {
    it('should return correct data', () => {
      const props = reactive({
        bg: null as string | null,
      })
      const data = useBackgroundColor(props, 'bg')
      expect(data.backgroundColorClasses.value).toBeNull()
      expect(data.backgroundColorStyles.value).toBeNull()

      props.bg = 'primary'
      expect(data.backgroundColorClasses.value).toEqual('bg-primary')
      expect(data.backgroundColorStyles.value).toBeNull()

      props.bg = ''
      expect(data.backgroundColorClasses.value).toBeNull()
      expect(data.backgroundColorStyles.value).toBeNull()

      props.bg = '#ff00ff'
      expect(data.backgroundColorClasses.value).toBeNull()
      expect(data.backgroundColorStyles.value).toEqual({
        'background-color': '#ff00ff',
      })
    })

    it('should allow ref argument', () => {
      const props = reactive({
        color: 'primary',
      })
      const data = useBackgroundColor(toRef(props, 'color'))

      expect(data.backgroundColorClasses.value).toEqual('bg-primary')
      expect(data.backgroundColorStyles.value).toBeNull()
    })
  })
})
