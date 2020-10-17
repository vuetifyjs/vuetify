// Utilities
import { ref } from 'vue'
import deepmerge from 'deepmerge'

// Types
import type { VuetifyInstance } from '@/framework'

type NestedPartial<T> = {
  [P in keyof T]?: NestedPartial<T[P]>;
};

export const createMockVuetifyInstance = (obj: NestedPartial<VuetifyInstance> = {}) => {
  return {
    [Symbol.for('vuetify')]: deepmerge({
      defaults: {
        global: {},
      },
      theme: {
        themes: ref({}),
        defaultTheme: ref('light'),
        setTheme: jest.fn(),
      },
    },
    obj,
    { isMergeableObject: value => !(value as any).__v_isRef }),
  }
}
