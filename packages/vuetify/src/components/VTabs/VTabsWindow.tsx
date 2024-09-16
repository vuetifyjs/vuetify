// Components
import { makeVWindowProps, VWindow } from '@/components/VWindow/VWindow'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, inject } from 'vue'
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import { VTabsSymbol } from './shared'

export const makeVTabsWindowProps = propsFactory({
  ...omit(makeVWindowProps(), ['continuous', 'nextIcon', 'prevIcon', 'showArrows', 'touch', 'mandatory']),
}, 'VTabsWindow')

export const VTabsWindow = genericComponent()({
  name: 'VTabsWindow',

  props: makeVTabsWindowProps(),

  emits: {
    'update:modelValue': (v: unknown) => true,
  },

  setup (props, { slots }) {
    const group = inject(VTabsSymbol, null)
    const _model = useProxiedModel(props, 'modelValue')

    const model = computed({
      get () {
        // Always return modelValue if defined
        // or if not within a VTabs group
        if (_model.value != null || !group) return _model.value

        // If inside of a VTabs, find the currently selected
        // item by id. Item value may be assigned by its index
        return group.items.value.find(item => group.selected.value.includes(item.id))?.value
      },
      set (val) {
        _model.value = val
      },
    })

    useRender(() => {
      const windowProps = VWindow.filterProps(props)

      return (
        <VWindow
          _as="VTabsWindow"
          { ...windowProps }
          v-model={ model.value }
          class={[
            'v-tabs-window',
            props.class,
          ]}
          style={ props.style }
          mandatory={ false }
          touch={ false }
          v-slots={ slots }
        />
      )
    })

    return {}
  },
})

export type VTabsWindow = InstanceType<typeof VTabsWindow>
