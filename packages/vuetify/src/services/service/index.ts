// Contracts
import { VuetifyServiceContract } from 'vuetify/types/services/index'

// Types
import Vue from 'vue'

export abstract class Service implements VuetifyServiceContract {
  framework = {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  init (root: Vue, ssrContext?: object) {}
}
