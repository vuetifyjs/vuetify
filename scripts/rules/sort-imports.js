const groups = [
  {
    label: 'Styles',
    match: /\.s[ac]ss$/,
  },
  {
    label: 'Components',
    match: /^@\/components/,
  },
  {
    label: 'Composables',
    match: /^@\/composables/,
  },
  {
    label: 'Directives',
    match: /^@\/directives/,
  },
  {
    label: 'Utilities',
    match: /^@\/util|^vue$/,
  },
  {
    label: 'Types',
    types: true,
  },
]
const innerOrder = ['vue', './', '../', '@/']

module.exports = {
  meta: {
    fixable: 'code',
  },
  create (context) {
    const importMap = []
    function registerImport (node) {
      const value = {
        node,
        source: node.source.value,
        types: node.importKind === 'type',
      }
      const groupIdx = groups.findIndex(group => value.types ? group.types : group.match?.test(node.source.value))
      const innerIdx = innerOrder.findIndex(prefix => node.source.value.startsWith(prefix))
      value.groupOrder = ~groupIdx ? groupIdx : null
      value.innerOrder = ~innerIdx ? innerIdx : null
      value.originalOrder = importMap.length
      importMap.push(value)
    }

    return {
      ImportDeclaration (node) {
        registerImport(node)
      },
      'Program:exit' () {
        // const comments = context.getSourceCode().getAllComments().filter(comment => comment.type === 'Line')
        const sorted = [...importMap].sort((a, b) => {
          if ([a.groupOrder, b.groupOrder].includes(null)) return 0
          if (a.groupOrder === b.groupOrder) {
            if ([a.innerOrder, b.innerOrder].includes(null)) return 0
            if (a.innerOrder === b.innerOrder) {
              return a.source.toLowerCase().localeCompare(b.source.toLowerCase())
            }
            return a.innerOrder - b.innerOrder
          }
          return a.groupOrder - b.groupOrder
        }).map((value, idx) => ({
          ...value,
          order: idx,
        }))
        sorted.forEach(value => {
          importMap[value.originalOrder] = value
        })

        importMap.forEach(value => {
          // if (value.groupOrder != null) {
          //   const groupLabel = groups[value.groupOrder].label
          //   const blockComments = comments.filter(comment => comment.loc.start.line < value.node.loc.start.line)
          //   console.log(groupLabel, blockComments)
          // }
          if (value.order < value.originalOrder) {
            const correctNode = sorted.find(v => v.originalOrder === value.order)
            context.report({
              node: value.node,
              message: `${value.source} should appear before ${correctNode.source}`,
              fix (fixer) {
                return [
                  fixer.removeRange([value.node.range[0], value.node.range[1] + 1]),
                  fixer.insertTextBefore(correctNode.node, context.getSourceCode().getText(value.node) + '\n'),
                ]
              },
            })
          }
        })
      },
    }
  },
}
