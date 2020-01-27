import { reactive } from 'vue'

import {
  dimensionsFactory,
} from '../dimensions'

describe('dimensions.ts', () => {
  describe('dimensionsFactory', () => {
    it('should take a single prop to use', () => {
      const { useDimensions } = dimensionsFactory('width')

      const props = reactive({ width: 100 })
      const { dimensions } = useDimensions(props)

      expect(dimensions.value.style.width).toBeDefined()
    })

    it('should take a multiple props to use', () => {
      const { useDimensions } = dimensionsFactory('width', 'height')

      const props = reactive({ width: 100, height: 200 })
      const { dimensions } = useDimensions(props)

      expect(dimensions.value.style.width).toBeDefined()
      expect(dimensions.value.style.height).toBeDefined()
    })

    it('should default to all props when given no props', () => {
      const { useDimensions } = dimensionsFactory()

      const props = reactive({ width: 100, height: 200, maxWidth: 300, maxHeight: 400, minWidth: 500, minHeight: 600 })
      const { dimensions } = useDimensions(props)

      expect(dimensions.value.style.width).toBeDefined()
      expect(dimensions.value.style.height).toBeDefined()
      expect(dimensions.value.style.maxWidth).toBeDefined()
      expect(dimensions.value.style.maxHeight).toBeDefined()
      expect(dimensions.value.style.minWidth).toBeDefined()
      expect(dimensions.value.style.minHeight).toBeDefined()
    })
  })

  describe('useDimensions', () => {
    it('should have proper styles', () => {
      const { useDimensions } = dimensionsFactory()

      expect(useDimensions(reactive({ width: 100 })).dimensions.value).toEqual({
        style: {
          width: '100px',
        },
      })

      expect(useDimensions(reactive({ width: 100, height: '' })).dimensions.value).toEqual({
        style: {
          width: '100px',
        },
      })

      expect(useDimensions(reactive({ width: 100, height: null })).dimensions.value).toEqual({
        style: {
          width: '100px',
        },
      })

      expect(useDimensions(reactive({ width: 100, height: '200' })).dimensions.value).toEqual({
        style: {
          width: '100px',
          height: '200px',
        },
      })
    })
  })

  describe('dimensionsProps', () => {
    it('should have correct structure', () => {
      expect(dimensionsFactory('width').dimensionsProps()).toEqual({
        width: {
          type: [Number, String],
        },
      })

      expect(dimensionsFactory('width', 'minWidth').dimensionsProps()).toEqual({
        width: {
          type: [Number, String],
        },
        minWidth: {
          type: [Number, String],
        },
      })
    })

    it('should allow setting default values', () => {
      expect(dimensionsFactory('width').dimensionsProps({ width: 100 })).toEqual({
        width: {
          type: [Number, String],
          default: 100,
        },
      })

      expect(dimensionsFactory('width').dimensionsProps({ width: '200' })).toEqual({
        width: {
          type: [Number, String],
          default: '200',
        },
      })
    })
  })
})
