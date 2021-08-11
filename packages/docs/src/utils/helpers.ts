// Globals
import { IN_BROWSER } from '@/utils/globals'

export function getBranch () {
  const branch = IN_BROWSER
    ? window.location.hostname.split('.')[0]
    : 'master'

  return ['master', 'dev', 'next'].includes(branch) ? branch : 'master'
}
