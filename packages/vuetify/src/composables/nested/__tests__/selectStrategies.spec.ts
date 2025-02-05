/* eslint-disable max-len */
/* eslint-disable sonarjs/no-identical-functions */
// Utilities
import { classicSelectStrategy, independentSelectStrategy, independentSingleSelectStrategy, leafSelectStrategy, leafSingleSelectStrategy } from '../selectStrategies'

describe('selectStrategies', () => {
  describe('independent', () => {
    it('should allow selection of multiple items', () => {
      const strategy = independentSelectStrategy(false)

      const children = new Map([
        ['1', ['2', '3']],
      ])

      const parents = new Map([
        ['2', '1'],
        ['3', '1'],
      ])
      let selected = new Map()

      selected = strategy.select({
        id: '2',
        value: true,
        children,
        disabled: new Set(),
        parents,
        selected,
      })

      selected = strategy.select({
        id: '3',
        value: true,
        children,
        disabled: new Set(),
        parents,
        selected,
      })

      expect(selected).toEqual(new Map([
        ['2', 'on'],
        ['3', 'on'],
      ]))
    })

    it('should allow selection of both branch and leaf nodes', () => {
      const strategy = independentSelectStrategy(false)

      const children = new Map([
        ['1', ['2', '3']],
      ])

      const parents = new Map([
        ['2', '1'],
        ['3', '1'],
      ])

      expect(strategy.select({
        id: '1',
        value: true,
        children,
        disabled: new Set(),
        parents,
        selected: new Map(),
      })).toEqual(new Map([
        ['1', 'on'],
      ]))

      expect(strategy.select({
        id: '2',
        value: true,
        children,
        disabled: new Set(),
        parents,
        selected: new Map(),
      })).toEqual(new Map([
        ['2', 'on'],
      ]))
    })

    it('should allow deselection of both branch and leaf nodes', () => {
      const strategy = independentSelectStrategy(false)

      const children = new Map([
        ['1', ['2', '3']],
      ])

      const parents = new Map([
        ['2', '1'],
        ['3', '1'],
      ])

      expect(strategy.select({
        id: '1',
        value: false,
        children,
        disabled: new Set(),
        parents,
        selected: new Map([
          ['1', 'on'],
        ]),
      })).toEqual(new Map([
        ['1', 'off'],
      ]))

      expect(strategy.select({
        id: '2',
        value: false,
        children,
        disabled: new Set(),
        parents,
        selected: new Map([
          ['2', 'on'],
        ]),
      })).toEqual(new Map([
        ['2', 'off'],
      ]))
    })

    it('should not allow deselection of last item when using mandatory', () => {
      const strategy = independentSelectStrategy(true)

      const children = new Map([
        ['1', ['2', '3']],
      ])

      const parents = new Map([
        ['2', '1'],
        ['3', '1'],
      ])

      expect(strategy.select({
        id: '2',
        value: false,
        children,
        disabled: new Set(),
        parents,
        selected: new Map([
          ['2', 'on'],
        ]),
      })).toEqual(new Map([
        ['2', 'on'],
      ]))
    })
  })

  describe('single-independent', () => {
    it('should not allow selection of multiple items', () => {
      const strategy = independentSingleSelectStrategy(false)

      const children = new Map([
        ['1', ['2', '3']],
      ])

      const parents = new Map([
        ['2', '1'],
        ['3', '1'],
      ])

      let selected = new Map()

      selected = strategy.select({
        id: '2',
        value: true,
        children,
        disabled: new Set(),
        parents,
        selected,
      })

      selected = strategy.select({
        id: '3',
        value: true,
        children,
        disabled: new Set(),
        parents,
        selected,
      })

      expect(selected).toEqual(new Map([
        ['3', 'on'],
      ]))
    })

    it('should allow selection of both branch and leaf nodes', () => {
      const strategy = independentSingleSelectStrategy(false)

      const children = new Map([
        ['1', ['2', '3']],
      ])

      const parents = new Map([
        ['2', '1'],
        ['3', '1'],
      ])

      expect(strategy.select({
        id: '1',
        value: true,
        children,
        disabled: new Set(),
        parents,
        selected: new Map(),
      })).toEqual(new Map([
        ['1', 'on'],
      ]))

      expect(strategy.select({
        id: '2',
        value: true,
        children,
        disabled: new Set(),
        parents,
        selected: new Map(),
      })).toEqual(new Map([
        ['2', 'on'],
      ]))
    })

    it('should allow deselection of both branch and leaf nodes', () => {
      const strategy = independentSingleSelectStrategy(false)

      const children = new Map([
        ['1', ['2', '3']],
      ])

      const parents = new Map([
        ['2', '1'],
        ['3', '1'],
      ])

      expect(strategy.select({
        id: '1',
        value: false,
        children,
        disabled: new Set(),
        parents,
        selected: new Map([
          ['1', 'on'],
        ]),
      })).toEqual(new Map([
        ['1', 'off'],
      ]))

      expect(strategy.select({
        id: '2',
        value: false,
        children,
        disabled: new Set(),
        parents,
        selected: new Map([
          ['2', 'on'],
        ]),
      })).toEqual(new Map([
        ['2', 'off'],
      ]))
    })

    it('should not allow deselection of last item when using mandatory', () => {
      const strategy = independentSingleSelectStrategy(true)

      const children = new Map([
        ['1', ['2', '3']],
      ])

      const parents = new Map([
        ['2', '1'],
        ['3', '1'],
      ])

      expect(strategy.select({
        id: '2',
        value: false,
        children,
        disabled: new Set(),
        parents,
        selected: new Map([
          ['2', 'on'],
        ]),
      })).toEqual(new Map([
        ['2', 'on'],
      ]))
    })
  })

  describe('single-leaf', () => {
    it('should not allow selection of multiple items', () => {
      const strategy = leafSingleSelectStrategy(false)

      const children = new Map([
        ['1', ['2', '3']],
      ])

      const parents = new Map([
        ['2', '1'],
        ['3', '1'],
      ])

      let selected = new Map()

      selected = strategy.select({
        id: '2',
        value: true,
        children,
        disabled: new Set(),
        parents,
        selected,
      })

      selected = strategy.select({
        id: '3',
        value: true,
        children,
        disabled: new Set(),
        parents,
        selected,
      })

      expect(selected).toEqual(new Map([
        ['3', 'on'],
      ]))
    })

    it('should allow selection of only leaf nodes', () => {
      const strategy = leafSingleSelectStrategy(false)

      const children = new Map([
        ['1', ['2', '3']],
      ])

      const parents = new Map([
        ['2', '1'],
        ['3', '1'],
      ])

      expect(strategy.select({
        id: '1',
        value: true,
        children,
        disabled: new Set(),
        parents,
        selected: new Map(),
      })).toEqual(new Map())

      expect(strategy.select({
        id: '2',
        value: true,
        children,
        disabled: new Set(),
        parents,
        selected: new Map(),
      })).toEqual(new Map([
        ['2', 'on'],
      ]))
    })

    it('should allow deselection of only leaf nodes', () => {
      const strategy = leafSingleSelectStrategy(false)

      const children = new Map([
        ['1', ['2', '3']],
      ])

      const parents = new Map([
        ['2', '1'],
        ['3', '1'],
      ])

      expect(strategy.select({
        id: '1',
        value: false,
        children,
        disabled: new Set(),
        parents,
        selected: new Map([
          ['1', 'on'],
        ]),
      })).toEqual(new Map([
        ['1', 'on'],
      ]))

      expect(strategy.select({
        id: '2',
        value: false,
        children,
        disabled: new Set(),
        parents,
        selected: new Map([
          ['2', 'on'],
        ]),
      })).toEqual(new Map([
        ['2', 'off'],
      ]))
    })

    it('should not allow deselection of last item when using mandatory', () => {
      const strategy = leafSingleSelectStrategy(true)

      const children = new Map([
        ['1', ['2', '3']],
      ])

      const parents = new Map([
        ['2', '1'],
        ['3', '1'],
      ])

      expect(strategy.select({
        id: '2',
        value: false,
        children,
        disabled: new Set(),
        parents,
        selected: new Map([
          ['2', 'on'],
        ]),
      })).toEqual(new Map([
        ['2', 'on'],
      ]))
    })
  })

  describe('leaf', () => {
    it('should allow selection of multiple items', () => {
      const strategy = leafSelectStrategy(false)

      const children = new Map([
        ['1', ['2', '3']],
      ])

      const parents = new Map([
        ['2', '1'],
        ['3', '1'],
      ])

      let selected = new Map()

      selected = strategy.select({
        id: '2',
        value: true,
        children,
        disabled: new Set(),
        parents,
        selected,
      })

      selected = strategy.select({
        id: '3',
        value: true,
        children,
        disabled: new Set(),
        parents,
        selected,
      })

      expect(selected).toEqual(new Map([
        ['2', 'on'],
        ['3', 'on'],
      ]))
    })

    it('should allow selection of only leaf nodes', () => {
      const strategy = leafSelectStrategy(false)

      const children = new Map([
        ['1', ['2', '3']],
      ])

      const parents = new Map([
        ['2', '1'],
        ['3', '1'],
      ])

      expect(strategy.select({
        id: '1',
        value: true,
        children,
        disabled: new Set(),
        parents,
        selected: new Map(),
      })).toEqual(new Map())

      expect(strategy.select({
        id: '2',
        value: true,
        children,
        disabled: new Set(),
        parents,
        selected: new Map(),
      })).toEqual(new Map([
        ['2', 'on'],
      ]))
    })

    it('should allow deselection of only leaf nodes', () => {
      const strategy = leafSelectStrategy(false)

      const children = new Map([
        ['1', ['2', '3']],
      ])

      const parents = new Map([
        ['2', '1'],
        ['3', '1'],
      ])

      expect(strategy.select({
        id: '1',
        value: false,
        children,
        disabled: new Set(),
        parents,
        selected: new Map([
          ['1', 'on'],
        ]),
      })).toEqual(new Map([
        ['1', 'on'],
      ]))

      expect(strategy.select({
        id: '2',
        value: false,
        children,
        disabled: new Set(),
        parents,
        selected: new Map([
          ['2', 'on'],
        ]),
      })).toEqual(new Map([
        ['2', 'off'],
      ]))
    })

    it('should not allow deselection of last item when using mandatory', () => {
      const strategy = leafSelectStrategy(true)

      const children = new Map([
        ['1', ['2', '3']],
      ])

      const parents = new Map([
        ['2', '1'],
        ['3', '1'],
      ])

      expect(strategy.select({
        id: '2',
        value: false,
        children,
        disabled: new Set(),
        parents,
        selected: new Map([
          ['2', 'on'],
        ]),
      })).toEqual(new Map([
        ['2', 'on'],
      ]))
    })
  })

  describe('classic', () => {
    it('should update parents of selected leaf', () => {
      const strategy = classicSelectStrategy(false)

      const children = new Map([
        ['1', ['2', '3']],
        ['3', ['4', '5']],
        ['5', ['6']],
      ])

      const parents = new Map([
        ['2', '1'],
        ['3', '1'],
        ['4', '3'],
        ['5', '3'],
        ['6', '5'],
      ])

      expect(strategy.select({
        id: '6',
        value: true,
        children,
        disabled: new Set(),
        parents,
        selected: new Map(),
      })).toEqual(new Map([
        ['1', 'indeterminate'],
        ['3', 'indeterminate'],
        ['5', 'on'],
        ['6', 'on'],
      ]))
    })

    it('should select children of a branch node', () => {
      const strategy = classicSelectStrategy(false)

      const children = new Map([
        ['1', ['2', '3']],
        ['3', ['4', '5']],
        ['5', ['6']],
      ])

      const parents = new Map([
        ['2', '1'],
        ['3', '1'],
        ['4', '3'],
        ['5', '3'],
        ['6', '5'],
      ])

      expect(strategy.select({
        id: '3',
        value: true,
        children,
        disabled: new Set(),
        parents,
        selected: new Map(),
      })).toEqual(new Map([
        ['1', 'indeterminate'],
        ['3', 'on'],
        ['4', 'on'],
        ['5', 'on'],
        ['6', 'on'],
      ]))
    })

    it('should deselect children of branch node', () => {
      const strategy = classicSelectStrategy(false)

      const children = new Map([
        ['1', ['2', '3']],
        ['3', ['4', '5']],
        ['5', ['6']],
      ])

      const parents = new Map([
        ['2', '1'],
        ['3', '1'],
        ['4', '3'],
        ['5', '3'],
        ['6', '5'],
      ])

      expect(strategy.select({
        id: '3',
        value: false,
        children,
        disabled: new Set(),
        parents,
        selected: new Map([
          ['1', 'indeterminate'],
          ['3', 'on'],
          ['4', 'on'],
          ['5', 'on'],
          ['6', 'on'],
        ]),
      })).toEqual(new Map([
        ['1', 'off'],
        ['3', 'off'],
        ['4', 'off'],
        ['5', 'off'],
        ['6', 'off'],
      ]))
    })

    it('should allow selection of multiple items', () => {
      const strategy = classicSelectStrategy(false)

      const children = new Map([
        ['1', ['2', '3']],
      ])

      const parents = new Map([
        ['2', '1'],
        ['3', '1'],
      ])

      let selected = new Map()

      selected = strategy.select({
        id: '2',
        value: true,
        children,
        disabled: new Set(),
        parents,
        selected,
      })

      expect(selected).toEqual(new Map([
        ['1', 'indeterminate'],
        ['2', 'on'],
      ]))

      selected = strategy.select({
        id: '3',
        value: true,
        children,
        disabled: new Set(),
        parents,
        selected,
      })

      expect(selected).toEqual(new Map([
        ['1', 'on'],
        ['2', 'on'],
        ['3', 'on'],
      ]))
    })

    it('should not allow deselection of last item when using mandatory', () => {
      const strategy = classicSelectStrategy(true)

      const children = new Map([
        ['1', ['2', '3']],
        ['3', ['4', '5']],
        ['5', ['6']],
      ])

      const parents = new Map([
        ['2', '1'],
        ['3', '1'],
        ['4', '3'],
        ['5', '3'],
        ['6', '5'],
      ])

      expect(strategy.select({
        id: '6',
        value: false,
        children,
        disabled: new Set(),
        parents,
        selected: new Map([
          ['1', 'indeterminate'],
          ['3', 'indeterminate'],
          ['5', 'on'],
          ['6', 'on'],
        ]),
      })).toEqual(new Map([
        ['1', 'indeterminate'],
        ['3', 'indeterminate'],
        ['5', 'on'],
        ['6', 'on'],
      ]))

      expect(strategy.select({
        id: '1',
        value: false,
        children,
        disabled: new Set(),
        parents,
        selected: new Map([
          ['1', 'on'],
          ['2', 'on'],
          ['3', 'on'],
          ['4', 'on'],
          ['5', 'on'],
          ['6', 'on'],
        ]),
      })).toEqual(new Map([
        ['1', 'on'],
        ['2', 'on'],
        ['3', 'on'],
        ['4', 'on'],
        ['5', 'on'],
        ['6', 'on'],
      ]))
    })

    it('should not select disabled children when parent is selected', () => {
      const strategy = classicSelectStrategy(false)

      const children = new Map([
        ['1', ['2', '3']],
        ['3', ['4', '5']],
      ])

      const parents = new Map([
        ['2', '1'],
        ['3', '1'],
        ['4', '3'],
        ['5', '3'],
      ])

      const disabled = new Set(['3'])

      let selected = new Map()

      selected = strategy.select({
        id: '1',
        value: true,
        children,
        disabled,
        parents,
        selected,
      })

      expect(selected.has('3')).toBe(false)

      disabled.delete('3')
      disabled.add('2')

      selected = strategy.select({
        id: '1',
        value: true,
        children,
        disabled,
        parents,
        selected: new Map(),
      })

      expect(selected.has('2')).toBe(false)
      expect(selected.has('3')).toBe(true)
    })
  })
})
