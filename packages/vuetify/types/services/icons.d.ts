import { Icons } from '../../src/services/icons'

export interface VuetifyIconService {
  new (options?: VuetifyIconOptions): Icons
}

export interface VuetifyIconOptions {
  /**
   * Select a base icon font to use. Note that none of these are included, you must install them yourself
   *
   * md: <a href="https://material.io/icons">material.io</a> (default)
   * mdi: <a href="https://materialdesignicons.com">MDI</a>
   * fa: <a href="https://fontawesome.com/get-started/web-fonts-with-css">FontAwesome 5</a>
   * fa4: <a href="">FontAwesome 4</a> TODO: link
   */
  iconfont: 'md' | 'mdi' | 'fa' | 'fa4' // TODO: camelCase
  values?: VuetifyIcons
}

export interface VuetifyIconSets {
  [key: string]: VuetifyIcons
}

export interface VuetifyIcons {
  cancel?: string
  clear?: string
  close?: string
  complete?: string
  delete?: string // delete (e.g. v-chip close)
  success?: string
  info?: string
  warning?: string
  error?: string
  prev?: string
  next?: string
  checkboxOn?: string
  checkboxOff?: string
  checkboxIndeterminate?: string
  delimiter?: string // for carousel
  sort?: string
  expand?: string
  menu?: string
  subgroup?: string
  dropdown?: string
  radioOn?: string
  radioOff?: string
  edit?: string
  ratingEmpty?: string
  ratingFull?: string
  ratingHalf?: string
  loading?: string
}
