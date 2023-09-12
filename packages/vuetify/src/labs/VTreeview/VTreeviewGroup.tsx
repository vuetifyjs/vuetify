// Components
import { makeVListGroupProps, VListGroup } from "@/components/VList/VListGroup"
import { VDefaultsProvider } from '@/components/VDefaultsProvider'

// Utilities
import { computed, ref } from 'vue'
import { genericComponent, omit, propsFactory, useRender } from "@/util"

//Types
import type { VListGroupSlots } from "@/components/VList/VListGroup"

export const makeVTreeviewGroupProps = propsFactory({
  ...omit(makeVListGroupProps({
    collapseIcon: '$treeviewCollapse',
    expandIcon: '$treeviewExpand'
  }), ['subgroup'])
}, 'VTreeviewGroup')

export const VTreeviewGroup = genericComponent<VListGroupSlots>()({
  name: 'VTreeviewGroup',

  props: makeVTreeviewGroupProps(),

  setup (props, { slots }) {
    const toggleIcon = computed(() => vListGroupRef.value?.isOpen ? props.collapseIcon : props.expandIcon)

    const activatorDefaults = computed(() => ({
      VTreeviewItem: {
        prependIcon: undefined,
        appendIcon: undefined,
        toggleIcon: toggleIcon.value
      },
    }))

    const vListGroupRef = ref<VListGroup>()

    useRender(() => (
      <VListGroup
        ref={ vListGroupRef }
        { ...omit(props, ['class']) }
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
              {
                <VDefaultsProvider defaults={ activatorDefaults.value }>
                  { slots.activator?.(slotProps) }
                </VDefaultsProvider>
              }
            </>
          ) : undefined
        }}
      </VListGroup>
    ))

    return {}
  }
})

export type VTreeviewGroup = InstanceType<typeof VTreeviewGroup>