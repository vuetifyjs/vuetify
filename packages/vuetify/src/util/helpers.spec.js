import { test } from '@/test'
import { arrayDiff } from './helpers'

test('helpers.ts', () => {
  describe('arrayDiff', () => {
    it('should return set difference of arrays A and B', () => {

      expect(arrayDiff(['one', 'two'], ['one'])).toEqual([])
      expect(arrayDiff(['one'], ['one', 'two'])).toEqual(['two'])
      expect(arrayDiff([], [])).toEqual([])
      expect(arrayDiff([], ['one'])).toEqual(['one'])
      expect(arrayDiff(['one'], ['two'])).toEqual(['two'])
      expect(arrayDiff(['one', 'two'], ['one', 'three'])).toEqual(['three'])
    })
  })
})
