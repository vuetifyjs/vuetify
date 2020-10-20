// @ts-nocheck
// eslint-disable

// Types
import Vue from 'vue'
import Framework from '../'
import { VuetifyPreset } from 'vuetify/types'

export interface VuetifyServiceContract {
  framework: Record<string, VuetifyServiceContract>
}

export interface VuetifyService {
  property: string
  new (preset: VuetifyPreset): VuetifyServiceContract
}
