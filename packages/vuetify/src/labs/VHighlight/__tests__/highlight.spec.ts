import { useHighlight } from '../highlight'

const run = (props: Parameters<typeof useHighlight>[0]) => useHighlight(props).value

describe('useHighlight', () => {
  describe('with pre-computed matches', () => {
    it('does not emit a leading empty span when match starts at position 0', () => {
      expect(run({ text: 'foobar', matches: [[0, 3]] })).toStrictEqual([
        { text: 'foo', match: true },
        { text: 'bar', match: false },
      ])
    })

    it('does not emit a trailing empty span when match ends at text length', () => {
      expect(run({ text: 'foobar', matches: [[3, 6]] })).toStrictEqual([
        { text: 'foo', match: false },
        { text: 'bar', match: true },
      ])
    })
  })

  describe('with query string', () => {
    it('matches case-insensitively', () => {
      const chunks = run({ text: 'Hello World', query: 'HELLO' })
      expect(chunks[0]).toStrictEqual({ text: 'Hello', match: true })
    })

    it('finds every occurrence when the query appears multiple times', () => {
      expect(run({ text: 'aa bb aa', query: 'aa' }).filter(c => c.match).map(c => c.text))
        .toStrictEqual(['aa', 'aa'])
    })

    it('merges overlapping spans from multiple queries', () => {
      // 'foo' → [0,3], 'oba' → [2,5]; overlap → [0,5]
      expect(run({ text: 'foobar', query: ['foo', 'oba'] })).toStrictEqual([
        { text: 'fooba', match: true },
        { text: 'r', match: false },
      ])
    })

    it('merges adjacent spans (end of one equals start of next)', () => {
      // 'foo' → [0,3], 'bar' → [3,6]; adjacent → [0,6]
      expect(run({ text: 'foobar', query: ['foo', 'bar'] })).toStrictEqual([
        { text: 'foobar', match: true },
      ])
    })

    it('ignores empty strings in a query array', () => {
      expect(run({ text: 'hello', query: ['', 'ell'] })).toStrictEqual([
        { text: 'h', match: false },
        { text: 'ell', match: true },
        { text: 'o', match: false },
      ])
    })
  })

  describe('priority', () => {
    it('uses pre-computed matches over query when both are provided', () => {
      // query 'hello' would highlight all, but matches says only [1,3]
      expect(run({ text: 'hello', matches: [[1, 3]], query: 'hello' })).toStrictEqual([
        { text: 'h', match: false },
        { text: 'el', match: true },
        { text: 'lo', match: false },
      ])
    })

    it('falls through to query when matches is an empty array', () => {
      expect(run({ text: 'hello', matches: [], query: 'ell' })).toStrictEqual([
        { text: 'h', match: false },
        { text: 'ell', match: true },
        { text: 'o', match: false },
      ])
    })
  })
})
