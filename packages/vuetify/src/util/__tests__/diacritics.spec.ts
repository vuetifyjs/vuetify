// Utilities
import { findMatchRanges } from '../diacritics'

describe('diacritics', () => {
  describe('findMatchRanges', () => {
    it('matches exactly when ignoreAccents is off', () => {
      expect(findMatchRanges('café', 'cafe', { all: true })).toStrictEqual([])
      expect(findMatchRanges('cafe', 'cafe', { all: true })).toStrictEqual([[0, 4]])
    })

    it('returns no ranges for an empty query', () => {
      expect(findMatchRanges('café', '', { ignoreAccents: true })).toStrictEqual([])
    })

    it('folds both sides when true', () => {
      expect(findMatchRanges('café', 'cafe', { ignoreAccents: true })).toStrictEqual([[0, 4]])
    })

    it('maps ranges back to a decomposed source', () => {
      const decomposed = 'cafe\u0301' // e + combining acute, 5 code units
      expect(decomposed).toHaveLength(5)
      expect(findMatchRanges(decomposed, 'cafe', { ignoreAccents: true })).toStrictEqual([[0, 5]])
    })

    it("'target' folds only the text", () => {
      expect(findMatchRanges('café', 'cafe', { ignoreAccents: 'target' })).toStrictEqual([[0, 4]])
      expect(findMatchRanges('cafe', 'café', { ignoreAccents: 'target' })).toStrictEqual([])
    })

    it("'query' folds only the query", () => {
      expect(findMatchRanges('cafe', 'café', { ignoreAccents: 'query' })).toStrictEqual([[0, 4]])
      expect(findMatchRanges('café', 'cafe', { ignoreAccents: 'query' })).toStrictEqual([])
    })

    it('finds the first occurrence only by default, all when requested', () => {
      expect(findMatchRanges('é é', 'e', { ignoreAccents: true })).toStrictEqual([[0, 1]])
      expect(findMatchRanges('é é', 'e', { ignoreAccents: true, all: true })).toStrictEqual([[0, 1], [2, 3]])
    })

    it('combines folding with case-insensitivity', () => {
      expect(findMatchRanges('RÉSUMÉ', 'resume', { ignoreAccents: true, ignoreCase: true }))
        .toStrictEqual([[0, 6]])
    })

    it('is case-sensitive unless ignoreCase is set', () => {
      expect(findMatchRanges('RÉSUMÉ', 'resume', { ignoreAccents: true })).toStrictEqual([])
    })

    it('folds letters that NFD leaves untouched', () => {
      expect(findMatchRanges('Łódź', 'lodz', { ignoreAccents: true, ignoreCase: true }))
        .toStrictEqual([[0, 4]])
      expect(findMatchRanges('Łódź', 'Lo', { ignoreAccents: 'target' })).toStrictEqual([[0, 2]])
    })

    it('maps ranges back across multi-character folds', () => {
      // 'ß' folds to 'ss', so the match spans a single source character
      expect(findMatchRanges('straße', 'strasse', { ignoreAccents: true })).toStrictEqual([[0, 6]])
    })

    describe('astral characters (surrogate pairs)', () => {
      // 3 capital Adlam letters (U+1E900..) case-fold to their lowercase forms.
      const adlam = String.fromCodePoint(0x1E900, 0x1E901, 0x1E902)
      // CJK compatibility ideograph (U+2F800), NFD-decomposes to U+4E3D.
      const cjkCompat = String.fromCodePoint(0x2F800)

      it('case-folds an astral bicameral script (Adlam)', () => {
        expect(findMatchRanges(adlam, adlam.toLowerCase(), { ignoreAccents: true, ignoreCase: true }))
          .toStrictEqual([[0, adlam.length]])
      })

      it('decomposes an astral NFD character back to its base', () => {
        expect(findMatchRanges(cjkCompat, cjkCompat.normalize('NFD'), { ignoreAccents: true }))
          .toStrictEqual([[0, cjkCompat.length]])
      })

      it('keeps emoji intact and maps ranges past them', () => {
        expect(findMatchRanges('👍 café', 'cafe', { ignoreAccents: true })).toStrictEqual([[3, 7]])
        expect(findMatchRanges('a👍b', 'b', { ignoreAccents: true })).toStrictEqual([[3, 4]])
      })
    })
  })
})
