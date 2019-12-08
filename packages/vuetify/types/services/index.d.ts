// Types
import Vue from 'vue'
import Framework from '../'
import { VuetifyPreset } from 'vuetify/types/services/presets'

export interface VuetifyServiceContract {
  framework: Record<string, VuetifyServiceContract>
  init: (root: Vue, ssrContext?: object) => void
}

export interface VuetifyService {
  property: string
  new (
    preset: VuetifyPreset,
    parent: InstanceType<typeof Framework>
  ): VuetifyServiceContract
}
