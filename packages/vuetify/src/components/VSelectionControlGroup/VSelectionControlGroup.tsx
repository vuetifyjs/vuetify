// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utility
import { computed, defineComponent, provide, toRef } from 'vue'
import { getUid, useRender } from '@/util'

// Types
import type { InjectionKey, Ref } from 'vue'

interface VSelectionGroupContext {
  inline: Ref<boolean>
  name: Ref<string | undefined>
  modelValue: Ref<any>
  multiple: Ref<boolean>
  onIcon: Ref<string | undefined>
  offIcon: Ref<string | undefined>
  type: Ref<string | undefined>
}

export const VSelectionControlGroupSymbol: InjectionKey<VSelectionGroupContext> = Symbol.for('vuetify:selection-control-group')

export const VSelectionControlGroup = defineComponent({
  name: 'VSelectionControlGroup',

  props: {
    id: String,
    inline: Boolean,
    name: String,
    offIcon: String,
    onIcon: String,
    multiple: {
      type: Boolean,
      default: null,
    },
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
      inline: toRef(props, 'inline'),
      modelValue,
      multiple: toRef(props, 'multiple'),
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
