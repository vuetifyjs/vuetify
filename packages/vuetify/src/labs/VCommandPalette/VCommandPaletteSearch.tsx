// Components
import { VTextField } from '@/components/VTextField'

// Composables
import { useLocale } from '@/composables'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { Ref } from 'vue'

export const makeVCommandPaletteSearchProps = propsFactory({
  modelValue: String,
  placeholder: {
    type: String,
  },
  clearable: {
    type: Boolean,
  },
}, 'VCommandPaletteSearch')

export type VCommandPaletteSearchSlots = {
  default: {
    modelValue: Ref<string | undefined>
  }
}

export const VCommandPaletteSearch = genericComponent<VCommandPaletteSearchSlots>()({
  name: 'VCommandPaletteSearch',

  props: makeVCommandPaletteSearchProps(),

  emits: {
    'update:modelValue': (value: string) => true,
  },

  setup (props, { slots }) {
    const { t } = useLocale()
    const search = useProxiedModel(props, 'modelValue')

    useRender(() => {
      return (
        <>
          { slots.default?.({
            modelValue: search,
          }) ?? (
            <VTextField
              v-model={ search.value }
              placeholder={ props.placeholder ?? t('$vuetify.command.placeholder') }
              hideDetails
              variant="solo"
              flat
              clearable={ props.clearable }
              autofocus
            />
          )}
        </>
      )
    })
  },
})

export type VCommandPaletteSearch = InstanceType<typeof VCommandPaletteSearch>
