import MarkdownItPrism from 'markdown-it-prism'
import MarkdownItLinkAttributes from 'markdown-it-link-attributes'
import MarkdownItAttrs from 'markdown-it-attrs'
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItHeaderSections from 'markdown-it-header-sections'
import markdownRules from './markdown-it-rules'
import Emoji from 'markdown-it-emoji/bare.js'
import type MarkdownIt from 'markdown-it'

export const configureMarkdown = (md: MarkdownIt) => {
  md.use(MarkdownItPrism)
    .use(MarkdownItLinkAttributes, {
      matcher (href: string) {
        return /^https?:\/\//.test(href)
      },
      attrs: {
        target: '_blank',
        rel: 'noopener',
      },
    })
    .use(MarkdownItAttrs)
    .use(MarkdownItAnchor, {
      tabIndex: false,
      permalink: MarkdownItAnchor.permalink.headerLink(),
      slugify: (str: unknown) => {
        let slug = String(str)
          .trim()
          .toLowerCase()
          .replace(/[\s,.[\]{}()/]+/g, '-')
          .replace(/[^a-z0-9 -]/g, c => c.charCodeAt(0).toString(16))
          .replace(/-{2,}/g, '-')
          .replace(/^-*|-*$/g, '')

        if (slug.charAt(0).match(/[^a-z]/g)) {
          slug = 'section-' + slug
        }

        return encodeURIComponent(slug)
      },
    })
    .use(MarkdownItHeaderSections)
    .use(Emoji, {
      defs: {
        rocket: '🚀',
        wrench: '🔧',
        microscope: '🔬',
        arrows_counterclockwise: '🔄',
        fire: '🔥',
        test_tube: '🧪',
      },
    })

  markdownRules.forEach(rule => rule(md))

  return md
}
