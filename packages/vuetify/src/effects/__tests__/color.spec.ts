import { reactive, computed } from 'vue'

import {
  ColorProps,
  useTextColor,
  useBackgroundColor,
} from '../color'

describe('color.ts', () => {
  describe('useTextColor', () => {
    it('should have proper classes', () => {
      const props = reactive<ColorProps>({})
      expect(useTextColor(props).textColor.value).toEqual({})

      props.color = 'primary'
      expect(useTextColor(props).textColor.value).toEqual({
        class: { 'primary--text': true },
      })

      props.color = ''
      expect(useTextColor(props).textColor.value).toEqual({})
    })

    it('should have proper styles', () => {
      const props = reactive<ColorProps>({})
      expect(useTextColor(props).textColor.value).toEqual({})

      props.color = '#ff0000'
      expect(useTextColor(props).textColor.value).toEqual({
        style: {
          'caret-color': '#ff0000',
          color: '#ff0000',
        },
      })

      props.color = ''
      expect(useTextColor(props).textColor.value).toEqual({})
    })

    it('should accept prop name as second argument', () => {
      const props = reactive({ foo: 'bar' })
      expect(useTextColor(props, 'foo').textColor.value).toEqual({
        class: { 'bar--text': true },
      })
    })

    it('should accept computed ref instead of props', () => {
      expect(useTextColor(computed(() => 'secondary')).textColor.value).toEqual({
        class: { 'secondary--text': true },
      })
    })
  })

  describe('useBackgroundColor', () => {
    it('should have proper classes', () => {
      const props = reactive<ColorProps>({})
      expect(useBackgroundColor(props).backgroundColor.value).toEqual({})

      props.color = 'primary'
      expect(useBackgroundColor(props).backgroundColor.value).toEqual({
        class: { primary: true },
      })

      props.color = ''
      expect(useBackgroundColor(props).backgroundColor.value).toEqual({})
    })

    it('should have proper styles', () => {
      const props = reactive<ColorProps>({})
      expect(useBackgroundColor(props).backgroundColor.value).toEqual({})

      props.color = '#ff0000'
      expect(useBackgroundColor(props).backgroundColor.value).toEqual({
        style: { 'background-color': '#ff0000' },
      })

      props.color = ''
      expect(useBackgroundColor(props).backgroundColor.value).toEqual({})
    })

    it('should accept prop name as second argument', () => {
      const props = reactive({ foo: 'bar' })
      expect(useBackgroundColor(props, 'foo').backgroundColor.value).toEqual({
        class: { bar: true },
      })
    })

    it('should accept computed ref instead of props', () => {
      expect(useBackgroundColor(computed(() => 'secondary')).backgroundColor.value).toEqual({
        class: { secondary: true },
      })
    })
  })
})
