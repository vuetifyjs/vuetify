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
    match: /^@\/util|^vue$|^vue-|^@vue\/|^@jest/,
  },
  {
    label: 'Types',
    types: true,
  },
]
const innerOrder = ['./', '..', '@/']

module.exports = {
  meta: {
    fixable: 'code',
  },
  create (context) {
    const sourceCode = context.getSourceCode()
    const comments = sourceCode.getAllComments().filter(comment => comment.type === 'Line')
    const importMap = []

    return {
      ImportDeclaration (node) {
        const value = {
          node,
          source: node.source.value,
          types: node.importKind === 'type',
          code: sourceCode.lines.slice(node.loc.start.line - 1, node.loc.end.line).join('\n') + '\n',
        }
        const groupIdx = groups.findIndex(group => value.types ? group.types : group.match?.test(node.source.value))
        const innerIdx = innerOrder.findIndex(prefix => node.source.value.startsWith(prefix))
        value.groupOrder = ~groupIdx ? groupIdx : null
        value.innerOrder = innerIdx
        value.originalOrder = importMap.length

        const groupComment = comments.findLast(c => (
          c.range[1] < node.range[0] &&
          /^ [A-Z][a-z]+$/.test(c.value) &&
          !sourceCode.text.slice(c.range[1], node.range[0]).includes('\n\n')
        ))
        value.groupComment = groupComment
        value.originalGroup = groupComment?.value.trim()
        if (~groupIdx) {
          value.group = groups[groupIdx].label
        } else {
          const groupIdx = groups.findIndex(group => group.label === value.originalGroup)
          value.groupOrder = ~groupIdx ? groupIdx : null
          value.group = value.originalGroup
        }

        importMap.push(value)
      },
      'Program:exit' () {
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

        const isSorted = sorted.every((value, idx) => value.order === value.originalOrder && value.group === value.originalGroup)

        if (!isSorted) {
          const problemsForward = []
          const problemsReverse = []
          const problemNodes = importMap.filter(value => value.order !== value.originalOrder || value.group !== value.originalGroup)
          problemNodes.forEach(value => {
            if (value.group !== value.originalGroup) {
              problemsForward.push(`  ${value.source} should be in group ${value.group}`)
            } else if (value.order < value.originalOrder) {
              const correctNode = sorted.find(v => v.originalOrder === value.order)
              problemsForward.push(`  ${value.source} should appear before ${correctNode.source}`)
            }
          })
          ;[...problemNodes].reverse().forEach(value => {
            if (value.group !== value.originalGroup) {
              problemsReverse.push(`  ${value.source} should be in group ${value.group}`)
            } else if (value.order > value.originalOrder) {
              const correctNode = sorted.find(v => v.originalOrder === value.order)
              problemsReverse.push(`  ${value.source} should appear after ${correctNode.source}`)
            }
          })
          const problems = (problemsForward.length <= problemsReverse.length ? problemsForward : problemsReverse).join('\n')

          context.report({
            loc: {
              start: importMap.at(0).groupComment?.loc.start ?? importMap.at(0).node.loc.start,
              end: importMap.at(-1).node.loc.end,
            },
            message: 'Imports should be sorted\n' + problems,
            fix (fixer) {
              let newCode = ''
              let currentGroup = null
              sorted.forEach(value => {
                if (value.group && value.group !== currentGroup) {
                  currentGroup = value.group
                  newCode += `\n// ${currentGroup}\n`
                }
                newCode += value.code
              })
              return fixer.replaceTextRange([
                importMap.at(0).groupComment?.range[0] ?? importMap.at(0).node.range[0],
                importMap.at(-1).node.range[0] + importMap.at(-1).code.length,
              ], newCode.trimStart())
            },
          })
        }
      },
    }
  },
}
