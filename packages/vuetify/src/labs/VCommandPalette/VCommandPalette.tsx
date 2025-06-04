// Styles
import './VCommandPalette.scss'

// Components
import { VCommandPaletteSearch } from './VCommandPaletteSearch'
import { VCard } from '@/components/VCard'
import { VDialog } from '@/components/VDialog'
import { makeVDialogProps } from '@/components/VDialog/VDialog'
import { VDivider } from '@/components/VDivider'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { ref } from 'vue'
import { VCommandPaletteList } from './VCommandPaletteList'
import { EventProp, genericComponent, propsFactory } from '@/util'
import { useRender } from '@/util/useRender'

export const makeVCommandPaletteProps = propsFactory({
  ...makeVDialogProps({
    maxHeight: 450,
    maxWidth: 720,
    absolute: true,
  }),
  modelValue: Boolean,
  afterEnter: EventProp<[]>(),
  afterLeave: EventProp<[]>(),
}, 'VCommandPalette')

export type VCommandPaletteSlots = {
  search: {
    modelValue: string
  }
}

export const VCommandPalette = genericComponent<VCommandPaletteSlots>()({
  name: 'VCommandPalette',
  props: makeVCommandPaletteProps(),
  emits: {
    afterEnter: () => true,
    afterLeave: () => true,
    'update:modelValue': (value: boolean) => true,
  },
  setup (props, { emit }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const dialogProps = VDialog.filterProps(props)

    const search = ref('')

    function onAfterEnter () {
      emit('afterEnter')
    }
    function onAfterLeave () {
      emit('afterLeave')
    }

    useRender(() => (
        <VDialog
        class={[
          props.class,
          'v-command-palette',
          'v-command-palette__dialog',
        ]}
        { ...dialogProps }
        modelValue={ isActive.value }
        onUpdate:modelValue={ (value: boolean) => isActive.value = value }
        onAfterEnter={ onAfterEnter }
        onAfterLeave={ onAfterLeave }
        >
          <VCard>
            <VCommandPaletteSearch
              v-model={ search.value }
            />
            <VDivider />
            <VCommandPaletteList />
          </VCard>
        </VDialog>
    ))
  },
})
