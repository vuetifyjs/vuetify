// Types
import { Component } from 'vue'

export interface Icons {
  /**
   * Select a base icon font to use. Note that none of these are included, you must install them yourself
   *
   * md: <a href="https://material.io/icons">material.io</a> (default)
   * mdi: <a href="https://materialdesignicons.com">MDI</a>
   * fa: <a href="https://fontawesome.com/get-started/web-fonts-with-css">FontAwesome 5</a>
   * fa4: <a href="">FontAwesome 4</a> TODO: link
   */
  iconfont: 'mdi' | 'mdiSvg' | 'md' | 'fa' | 'fa4' // TODO: camelCase
  values?: Partial<VuetifyIcons>
}

export type VuetifyIconComponent = {
  component: Component | string
  props?: object
}

export type VuetifyIcon = string | VuetifyIconComponent

export interface VuetifyIcons {
  complete: VuetifyIcon
  cancel: VuetifyIcon
  close: VuetifyIcon
  delete: VuetifyIcon
  clear: VuetifyIcon
  success: VuetifyIcon
  info: VuetifyIcon
  warning: VuetifyIcon
  error: VuetifyIcon
  prev: VuetifyIcon
  next: VuetifyIcon
  checkboxOn: VuetifyIcon
  checkboxOff: VuetifyIcon
  checkboxIndeterminate: VuetifyIcon
  delimiter: VuetifyIcon
  sort: VuetifyIcon
  expand: VuetifyIcon
  menu: VuetifyIcon
  subgroup: VuetifyIcon
  dropdown: VuetifyIcon
  radioOn: VuetifyIcon
  radioOff: VuetifyIcon
  edit: VuetifyIcon
  ratingEmpty: VuetifyIcon
  ratingFull: VuetifyIcon
  ratingHalf: VuetifyIcon
  loading: VuetifyIcon
  first: VuetifyIcon
  last: VuetifyIcon
  unfold: VuetifyIcon
  [name: string]: VuetifyIcon
}
