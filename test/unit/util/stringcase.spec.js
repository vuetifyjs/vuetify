import { test } from '@/test'
import {
  camelize,
  capitalize,
  pascalize,
  hyphenate
} from '../../../src/util/stringcase'

const sampleStrings = ['hyphenated-string', 'PascalCase', 'camelCase']

test('stringcase.ts', () => {
  it('should camelize hyphenated string', () => {
    expect(sampleStrings.map(camelize)).toEqual([
      'hyphenatedString',
      'PascalCase',
      'camelCase'
    ])
  })

  it('should capitalize string', () => {
    expect(sampleStrings.map(capitalize)).toEqual([
      'Hyphenated-string',
      'PascalCase',
      'CamelCase'
    ])
  })

  it('should pascalize hyphenated string', () => {
    expect(sampleStrings.map(pascalize)).toEqual([
      'HyphenatedString',
      'PascalCase',
      'CamelCase'
    ])
  })

  it('should hyphenate PascalCase or camelCase string', () => {
    expect(sampleStrings.map(hyphenate)).toEqual([
      'hyphenated-string',
      'pascal-case',
      'camel-case'
    ])
  })
})
