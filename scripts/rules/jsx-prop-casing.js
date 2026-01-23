import { camelCase } from 'lodash-es'

const hyphenatedRe = /\w-\w/g
// eslint-disable-next-line max-len
const svgTags = new Set(['svg', 'animate', 'animateMotion', 'animateTransform', 'circle', 'clipPath', 'defs', 'desc', 'ellipse', 'filter', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'switch', 'symbol', 'text', 'textPath', 'tspan', 'use', 'view'])

export default {
  meta: {
    fixable: 'code',
  },
  create (context) {
    return {
      JSXAttribute (node) {
        const name = node.name.name

        if (
          name === 'v-slots' ||
          name === 'v-show' ||
          !hyphenatedRe.test(name) ||
          name.startsWith('v-model') ||
          name.startsWith('aria-') ||
          name.startsWith('data-') ||
          svgTags.has(node.parent.name.name)
        ) return

        context.report({
          node,
          message: 'JSX props should be camelCase',
          fix (fixer) {
            const parts = name.split(/(_)/)
            const newName = name.startsWith('v-')
              ? camelCase(parts[0]) + parts.slice(1).join('')
              : camelCase(name)
            return fixer.replaceText(node.name, newName)
          },
        })
      },
    }
  },
}
