import { VuetifyOptions } from '../../../../types'

const OPTIONS_DEFAULTS = {
  minifyTheme: null,
  themeCache: null,
  customProperties: false,
  cspNonce: null
} as VuetifyOptions

export default function options (options: Partial<VuetifyOptions> = {}): VuetifyOptions {
  return {
    ...OPTIONS_DEFAULTS,
    ...options
  }
}
