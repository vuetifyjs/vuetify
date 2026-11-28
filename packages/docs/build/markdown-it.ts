import MarkdownIt from 'markdown-it'
import { configureMarkdown } from '../src/utils/markdown-it.ts'
export { configureMarkdown } from '../src/utils/markdown-it.ts'

export const md = configureMarkdown(new MarkdownIt())
