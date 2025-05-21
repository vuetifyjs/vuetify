import MarkdownIt from 'markdown-it'
import { configureMarkdown } from '../src/utils/markdown-it'
export { configureMarkdown } from '../src/utils/markdown-it'

export const md = configureMarkdown(new MarkdownIt())
