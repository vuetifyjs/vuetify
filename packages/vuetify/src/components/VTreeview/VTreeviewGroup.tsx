// Components
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { makeVListGroupProps, VListGroup } from '@/components/VList/VListGroup'

// Utilities
import { computed, ref } from 'vue'
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { VListGroupSlots } from '@/components/VList/VListGroup'

export const makeVTreeviewGroupProps = propsFactory({
  ...omit(makeVListGroupProps({
    collapseIcon: '$treeviewCollapse',
    expandIcon: '$treeviewExpand',
  }), ['subgroup']),
}, 'VTreeviewGroup')

export const VTreeviewGroup = genericComponent<VListGroupSlots>()({
  name: 'VTreeviewGroup',

  props: makeVTreeviewGroupProps(),

  setup (props, { slots }) {
    const vListGroupRef = ref<VListGroup>()
    const toggleIcon = computed(() => vListGroupRef.value?.isOpen ? props.collapseIcon : props.expandIcon)

    const activatorDefaults = computed(() => ({
      VTreeviewItem: {
        prependIcon: undefined,
        appendIcon: undefined,
        active: vListGroupRef.value?.isOpen,
        toggleIcon: toggleIcon.value,
      },
    }))

    useRender(() => {
      const listGroupProps = VListGroup.filterProps(props)

      return (
        <VListGroup
          { ...listGroupProps }
          ref={ vListGroupRef }
          class={[
            'v-treeview-group',
            props.class,
          ]}
          subgroup
        >
          {{
            ...slots,
            activator: slots.activator ? slotProps => (
              <>
                <VDefaultsProvider defaults={ activatorDefaults.value }>
                  { slots.activator?.(slotProps) }
                </VDefaultsProvider>
              </>
            ) : undefined,
          }}
        </VListGroup>
      )
    })

    return {}
  },
})

export type VTreeviewGroup = InstanceType<typeof VTreeviewGroup>
