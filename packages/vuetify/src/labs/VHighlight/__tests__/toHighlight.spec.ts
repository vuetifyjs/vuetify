import { toHighlight } from '../toHighlight'

describe('toHighlight', () => {
  describe('with pre-computed matches', () => {
    it('does not emit a leading empty span when match starts at position 0', () => {
      expect(toHighlight('foobar', undefined, { matches: [[0, 3]] })).toStrictEqual([
        { text: 'foo', match: true },
        { text: 'bar', match: false },
      ])
    })

    it('does not emit a trailing empty span when match ends at text length', () => {
      expect(toHighlight('foobar', undefined, { matches: [[3, 6]] })).toStrictEqual([
        { text: 'foo', match: false },
        { text: 'bar', match: true },
      ])
    })

    it('sorts caller-supplied matches that arrive out of order', () => {
      expect(toHighlight('foobar', undefined, { matches: [[4, 6], [0, 2]] })).toStrictEqual([
        { text: 'fo', match: true },
        { text: 'ob', match: false },
        { text: 'ar', match: true },
      ])
    })

    it('merges caller-supplied matches that overlap', () => {
      expect(toHighlight('foobar', undefined, { matches: [[0, 4], [2, 6]] })).toStrictEqual([
        { text: 'foobar', match: true },
      ])
    })

    it('drops inverted ranges where start >= end', () => {
      expect(toHighlight('foobar', undefined, { matches: [[5, 3]] })).toStrictEqual([
        { text: 'foobar', match: false },
      ])
    })
  })

  describe('with query string', () => {
    it('is case-sensitive by default', () => {
      expect(toHighlight('Hello World', 'HELLO')).toStrictEqual([
        { text: 'Hello World', match: false },
      ])
    })

    it('matches case-insensitively when ignoreCase is true', () => {
      const chunks = toHighlight('Hello World', 'HELLO', { ignoreCase: true })
      expect(chunks[0]).toStrictEqual({ text: 'Hello', match: true })
    })

    it('finds only the first occurrence by default', () => {
      expect(toHighlight('aa bb aa', 'aa').filter(c => c.match).map(c => c.text))
        .toStrictEqual(['aa'])
    })

    it('finds every occurrence when matchAll is true', () => {
      expect(toHighlight('aa bb aa', 'aa', { matchAll: true }).filter(c => c.match).map(c => c.text))
        .toStrictEqual(['aa', 'aa'])
    })

    it('merges overlapping spans from multiple queries', () => {
      expect(toHighlight('foobar', ['foo', 'oba'])).toStrictEqual([
        { text: 'fooba', match: true },
        { text: 'r', match: false },
      ])
    })

    it('merges adjacent spans (end of one equals start of next)', () => {
      expect(toHighlight('foobar', ['foo', 'bar'])).toStrictEqual([
        { text: 'foobar', match: true },
      ])
    })

    it('ignores empty strings in a query array', () => {
      expect(toHighlight('hello', ['', 'ell'])).toStrictEqual([
        { text: 'h', match: false },
        { text: 'ell', match: true },
        { text: 'o', match: false },
      ])
    })
  })

  describe('with ignoreAccents', () => {
    it('does not fold accents by default', () => {
      expect(toHighlight('café', 'cafe')).toStrictEqual([
        { text: 'café', match: false },
      ])
    })

    it("folds both sides when ignoreAccents is true ('cafe' finds 'café')", () => {
      expect(toHighlight('a café here', 'cafe', { ignoreAccents: true }).filter(c => c.match).map(c => c.text))
        .toStrictEqual(['café'])
    })

    it('maps ranges back to the original text when the source is decomposed', () => {
      // "café" written as e + combining acute (5 code units)
      const decomposed = 'cafe\u0301' // e + combining acute => 5 code units
      const chunks = toHighlight(`a ${decomposed} here`, 'cafe', { ignoreAccents: true })
      expect(chunks.filter(c => c.match).map(c => c.text)).toStrictEqual([decomposed])
    })

    it("'target' folds only the text ('cafe' finds 'café')", () => {
      expect(toHighlight('café', 'cafe', { ignoreAccents: 'target' }).filter(c => c.match).map(c => c.text))
        .toStrictEqual(['café'])
    })

    it("'target' leaves the query accented ('café' does not match plain 'cafe')", () => {
      expect(toHighlight('cafe', 'café', { ignoreAccents: 'target' })).toStrictEqual([
        { text: 'cafe', match: false },
      ])
    })

    it("'query' folds only the query ('café' finds plain 'cafe')", () => {
      expect(toHighlight('cafe', 'café', { ignoreAccents: 'query' }).filter(c => c.match).map(c => c.text))
        .toStrictEqual(['cafe'])
    })

    it('combines with ignoreCase', () => {
      expect(toHighlight('RÉSUMÉ', 'resume', { ignoreAccents: true, ignoreCase: true, matchAll: true })
        .filter(c => c.match).map(c => c.text)).toStrictEqual(['RÉSUMÉ'])
    })
  })

  describe('matchAll is ignored when matches are pre-computed', () => {
    it('renders all provided spans regardless of matchAll: false', () => {
      expect(toHighlight('aa bb aa', undefined, { matches: [[0, 2], [6, 8]], matchAll: false })).toStrictEqual([
        { text: 'aa', match: true },
        { text: ' bb ', match: false },
        { text: 'aa', match: true },
      ])
    })
  })

  describe('priority', () => {
    it('uses pre-computed matches over query when both are provided', () => {
      expect(toHighlight('hello', 'hello', { matches: [[1, 3]] })).toStrictEqual([
        { text: 'h', match: false },
        { text: 'el', match: true },
        { text: 'lo', match: false },
      ])
    })

    it('falls through to query when matches is an empty array', () => {
      expect(toHighlight('hello', 'ell', { matches: [] })).toStrictEqual([
        { text: 'h', match: false },
        { text: 'ell', match: true },
        { text: 'o', match: false },
      ])
    })
  })
})
