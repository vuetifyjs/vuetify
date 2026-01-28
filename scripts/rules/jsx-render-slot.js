export default {
  meta: {
    fixable: 'code',
  },
  create (context) {
    let hasImport = false
    let lastImport
    let utilImport

    return {
      ImportDeclaration(node) {
        lastImport = node
        if (node.source.value === '@/util' && node.importKind === 'value') {
          utilImport = node
          if (node.specifiers.some(s => s.imported.name === 'renderSlot')) {
            hasImport = true
          }
        }
      },
      CallExpression (node) {
        const callee = node.callee
        if (!(
          callee.type === 'MemberExpression' &&
          callee.object.type === 'Identifier' &&
          callee.object.name === 'slots'
        )) return

        const sourceCode = context.getSourceCode()

        let reportNode = node
        let fallback
        {
          let parent = node.parent
          if (parent.type === 'ChainExpression') {
            parent = parent.parent
          }
          if (parent.type === 'LogicalExpression' && ['??', '||'].includes(parent.operator)) {
            reportNode = parent
            fallback = parent
          }
        }

        const slotAccess = (!callee.computed && callee.property && callee.property.type === 'Identifier')
          ? `'${callee.property.name}'`
          : sourceCode.getText(callee.property)

        context.report({
          node: reportNode,
          message: fallback
            ? `Use renderSlot for slot fallback instead of "??"`
            : 'Use renderSlot instead of calling slot functions directly',
          fix (fixer) {
            let result = `renderSlot(slots, ${slotAccess}`
            if (node.arguments && node.arguments.length) {
              result += ', ' + sourceCode.getText(node.arguments[0])
            }
            if (fallback) {
              const prevToken = sourceCode.getTokenBefore(fallback.right)
              const isParanthesized = prevToken.value === '('
              result += `, () => `
              if (isParanthesized) {
                const nextToken = sourceCode.getTokenAfter(fallback.right)
                result += sourceCode.text.slice(prevToken.range[0], nextToken.range[1])
              } else {
                result += `${sourceCode.getText(fallback.right)}`
              }
            }
            result += ')'
            const fixes = [fixer.replaceText(reportNode, result)]
            if (!hasImport) {
              if (utilImport) {
                fixes.push(fixer.insertTextAfter(utilImport.specifiers.at(-1), ', renderSlot'))
              } else if (lastImport) {
                fixes.push(fixer.insertTextAfter(lastImport, `import { renderSlot } from '@/util'\n`))
              } else {
                fixes.push(fixer.insertTextBeforeRange([0, 0], `import { renderSlot } from '@/util'\n`))
              }
              hasImport = true
            }
            return fixes
          },
        })
      },
    }
  },
}
