// Styles
import './VSelectionControlGroup.sass'

// Composables
import { IconValue } from '@/composables/icons'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, provide, toRef } from 'vue'
import { defineComponent, getUid, useRender } from '@/util'

// Types
import type { InjectionKey, PropType, Ref } from 'vue'

export interface VSelectionGroupContext {
  disabled: Ref<boolean>
  inline: Ref<boolean>
  name: Ref<string | undefined>
  modelValue: Ref<any>
  multiple: Ref<boolean>
  trueIcon: Ref<IconValue | undefined>
  falseIcon: Ref<IconValue | undefined>
  readonly: Ref<boolean>
  type: Ref<string | undefined>
}

export const VSelectionControlGroupSymbol: InjectionKey<VSelectionGroupContext> = Symbol.for('vuetify:selection-control-group')

export const VSelectionControlGroup = defineComponent({
  name: 'VSelectionControlGroup',

  props: {
    disabled: Boolean,
    id: String,
    inline: Boolean,
    name: String,
    falseIcon: IconValue,
    trueIcon: IconValue,
    multiple: {
      type: Boolean as PropType<boolean | null>,
      default: null,
    },
    readonly: Boolean,
    type: String,
    modelValue: null,
  },

  emits: {
    'update:modelValue': (val: any) => true,
  },

  setup (props, { slots }) {
    const modelValue = useProxiedModel(props, 'modelValue')
    const uid = getUid()
    const id = computed(() => props.id || `v-selection-control-group-${uid}`)
    const name = computed(() => props.name || id.value)

    provide(VSelectionControlGroupSymbol, {
      disabled: toRef(props, 'disabled'),
      inline: toRef(props, 'inline'),
      modelValue,
      multiple: computed(() => !!props.multiple || (props.multiple == null && Array.isArray(modelValue.value))),
      name,
      falseIcon: toRef(props, 'falseIcon'),
      trueIcon: toRef(props, 'trueIcon'),
      readonly: toRef(props, 'readonly'),
      type: toRef(props, 'type'),
    })

    useRender(() => (
      <div
        class="v-selection-control-group"
        aria-labelled-by={ props.type === 'radio' ? id.value : undefined }
        role={ props.type === 'radio' ? 'radiogroup' : undefined }
      >
        { slots.default?.() }
      </div>
    ))

    return {}
  },
})

export type VSelectionControlGroup = InstanceType<typeof VSelectionControlGroup>
