export interface VuetifyLanguage {
  locales: Record<string, VuetifyLocale>
  current: string
  t (key: string, ...params: Array<string | number>): string
}

// TODO: complete list of keys?
export interface VuetifyLocale {
  [key: string]: VuetifyLocale | string
}
