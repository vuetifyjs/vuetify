import * as messages from '@/locale'

const locale = new URLSearchParams(globalThis.location?.search).get('locale')

export default {
  locale: locale || 'en',
  messages,
}
