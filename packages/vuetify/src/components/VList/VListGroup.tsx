// Components
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VExpandTransition } from '@/components/transitions'

// Composables
import { useList } from './list'
import { makeTagProps } from '@/composables/tag'
import { useNestedGroupActivator, useNestedItem } from '@/composables/nested/nested'
import { IconValue } from '@/composables/icons'

// Utilities
import { computed, toRef } from 'vue'
import { defineComponent, genericComponent } from '@/util'

// Types
import type { Ref } from 'vue'
import type { MakeSlots } from '@/util'
import type { InternalListItem } from './VList'

export type ListGroupActivatorSlot = {
  props: {
    onClick: (e: Event) => void
    appendIcon: IconValue
    class: string
    color?: string
  }
}

const VListGroupActivator = defineComponent({
  name: 'VListGroupActivator',

  setup (_, { slots }) {
    useNestedGroupActivator()

    return () => slots.default?.()
  },
})

export const VListGroup = genericComponent<new <T extends InternalListItem>() => {
  $props: {
    items?: T[]
  }
  $slots: MakeSlots<{
    activator: [ListGroupActivatorSlot]
    default: []
  }>
}>()({
  name: 'VListGroup',

  props: {
    activeColor: String,
    color: String,
    collapseIcon: {
      type: IconValue,
      default: '$collapse',
    },
    expandIcon: {
      type: IconValue,
      default: '$expand',
    },
    value: null,

    ...makeTagProps(),
  },

  setup (props, { slots }) {
    const { isOpen, open } = useNestedItem(toRef(props, 'value'), true)
    const list = useList()

    const onClick = (e: Event) => {
      open(!isOpen.value, e)
    }

    const activatorProps: Ref<ListGroupActivatorSlot['props']> = computed(() => ({
      onClick,
      active: isOpen.value,
      appendIcon: isOpen.value ? props.collapseIcon : props.expandIcon,
      class: 'v-list-group__header',
      color: isOpen.value ? props.activeColor ?? props.color : undefined,
    }))

    return () => {
      return (
        <props.tag
          class={[
            'v-list-group',
            {
              'v-list-group--prepend': list?.hasPrepend.value,
            },
          ]}
        >
          { slots.activator && (
            <VDefaultsProvider
              defaults={{
                VListItemIcon: { color: activatorProps.value.color },
              }}
            >
              <VListGroupActivator>
                { slots.activator({ props: activatorProps.value, isOpen }) }
              </VListGroupActivator>
            </VDefaultsProvider>
          ) }
          <VExpandTransition>
            <div class="v-list-group__items" v-show={isOpen.value}>
              { slots.default?.() }
            </div>
          </VExpandTransition>
        </props.tag>
      )
    }
  },
})
