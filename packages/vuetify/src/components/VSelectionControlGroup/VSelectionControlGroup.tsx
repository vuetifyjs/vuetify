// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utility
import { computed, defineComponent, provide, toRef } from 'vue'
import { getUid, useRender } from '@/util'

// Types
import type { InjectionKey, Ref } from 'vue'

interface VSelectionGroupContext {
  name: Ref<string | undefined>
  modelValue: Ref<any>
  onIcon: Ref<string | undefined>
  offIcon: Ref<string | undefined>
  type: Ref<string | undefined>
}

export const VSelectionControlGroupSymbol: InjectionKey<VSelectionGroupContext> = Symbol.for('vuetify:selection-control-group')

export const VSelectionControlGroup = defineComponent({
  name: 'VSelectionControlGroup',

  props: {
    id: String,
    name: String,
    offIcon: String,
    onIcon: String,
    type: String,
    modelValue: {
      type: null,
      default: undefined as any,
    },
  },

  emits: {
    'update:modelValue': (val: any) => true,
  },

  setup (props, { slots }) {
    const modelValue = useProxiedModel(props, 'modelValue')
    const uid = getUid()
    const id = computed(() => props.id || `v-radio-group-id-${uid}`)
    const name = computed(() => props.name || `v-radio-group-name-${uid}`)

    provide(VSelectionControlGroupSymbol, {
      modelValue,
      name,
      offIcon: toRef(props, 'offIcon'),
      onIcon: toRef(props, 'onIcon'),
      type: toRef(props, 'type'),
    })

    useRender(() => {
      return (
        <div
          class="v-selection-control-group"
          aria-labelled-by={ id.value }
        >
          { slots?.default?.() }
        </div>
      )
    })

    return {}
  },
})

export type VSelectionControlGroup = InstanceType<typeof VSelectionControlGroup>
