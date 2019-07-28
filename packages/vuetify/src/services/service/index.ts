// Contracts
import { VuetifyServiceContract } from 'vuetify/types/services/index'

// Types
import Vue from 'vue'

export class Service implements VuetifyServiceContract {
  framework = {}

  init (root: Vue, ssrContext?: object) {}
}
