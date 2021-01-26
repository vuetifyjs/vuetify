import { reactive, toRef } from 'vue'

import {
  useTextColor,
  useBackgroundColor,
} from '../color'

describe('color.ts', () => {
  describe('useTextColor', () => {
    it('should return correct data', () => {
      const props = reactive({
        color: null as string | null,
      })
      const data = useTextColor(toRef(props, 'color'))
      expect(data.textColorClasses.value).toBeNull()
      expect(data.textColorStyles.value).toEqual({})

      props.color = 'primary'
      expect(data.textColorClasses.value).toEqual('text-primary')
      expect(data.textColorStyles.value).toEqual({})

      props.color = ''
      expect(data.textColorClasses.value).toBeNull()
      expect(data.textColorStyles.value).toEqual({})

      props.color = '#ff00ff'
      expect(data.textColorClasses.value).toBeNull()
      expect(data.textColorStyles.value).toEqual({
        'caret-color': '#ff00ff',
        color: '#ff00ff',
      })
    })
  })

  describe('useBackgroundColor', () => {
    it('should return correct data', () => {
      const props = reactive({
        bg: null as string | null,
      })
      const data = useBackgroundColor(toRef(props, 'bg'))
      expect(data.backgroundColorClasses.value).toBeNull()
      expect(data.backgroundColorStyles.value).toEqual({})

      props.bg = 'primary'
      expect(data.backgroundColorClasses.value).toEqual('bg-primary')
      expect(data.backgroundColorStyles.value).toEqual({})

      props.bg = ''
      expect(data.backgroundColorClasses.value).toBeNull()
      expect(data.backgroundColorStyles.value).toEqual({})

      props.bg = '#ff00ff'
      expect(data.backgroundColorClasses.value).toBeNull()
      expect(data.backgroundColorStyles.value).toEqual({
        'background-color': '#ff00ff',
      })
    })
  })
})
