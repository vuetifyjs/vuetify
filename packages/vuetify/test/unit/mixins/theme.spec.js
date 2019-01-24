import Vue from 'vue'
import { test } from '@/test'
import { extractCssColor } from '@/util/theme'
import { lighten } from '@/util/theme'
import { intToHex, colorToInt } from '@/util/colorUtils'

test('colorable.js', ({ mount }) => {
  it('should compute a css color', () => {
    const tests = {
      'firebrick': 'firebrick',
      'blue': '#2196f3',
      'blue lighten-1': '#42a5f5',
      'blue    lighten-1': '#42a5f5',
      'blue lighten1': '#42a5f5',
      'foo': '#335577',
      'foo lighten-1': intToHex(lighten(colorToInt('#335577'), 1)),
      'bar lighten-1': '#557799'
    }

    Object.keys(tests).forEach(color => expect(extractCssColor(color, {
      foo: '#335577',
      bar: {
        lighten1: '#557799'
      }
    })).toBe(tests[color]))
  })

  it('should throw on invalid color', () => {
    const tests = [
      'blue foo',
      'primary foo',
      'foo darken-1'
    ]

    tests.forEach(color => {
      expect(() => extractCssColor(color, {
        foo: {
          darken3: '#123'
        }
      })).toThrow(new TypeError(`Invalid color: ${color}`))
    })
  })
})
