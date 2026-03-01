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
          !hyphenatedRe.test(name) ||
          name.startsWith('v-') ||
          name.startsWith('aria-') ||
          name.startsWith('data-') ||
          svgTags.has(node.parent.name.name)
        ) return

        context.report({
          node,
          message: 'JSX props should be camelCase',
          fix (fixer) {
            return fixer.replaceText(node.name, camelCase(name))
          },
        })
      },
    }
  },
}
