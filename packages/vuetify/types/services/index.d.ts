// Types
import Vue from 'vue'

export interface VuetifyServiceContract {
  framework: Record<string, VuetifyServiceContract>
  init: (root: Vue, ssrContext?: object) => void
}

export interface VuetifyService {
  property: string
  new (options?: any): VuetifyServiceContract
}
