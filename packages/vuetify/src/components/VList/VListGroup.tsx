// Components
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VExpandTransition } from '@/components/transitions'

// Composables
import { useList } from './list'
import { IconValue } from '@/composables/icons'
import { makeTagProps } from '@/composables/tag'
import { MaybeTransition } from '@/composables/transition'
import { useNestedGroupActivator, useNestedItem } from '@/composables/nested/nested'
import { useSsrBoot } from '@/composables/ssrBoot'

// Utilities
import { computed, toRef } from 'vue'
import { defineComponent, genericComponent, useRender } from '@/util'

// Types
import type { InternalListItem } from './VList'
import type { MakeSlots } from '@/util'
import type { Ref } from 'vue'

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
    const { isBooted } = useSsrBoot()

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

    useRender(() => (
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
        <MaybeTransition transition={ isBooted.value && { component: VExpandTransition }}>
          <div class="v-list-group__items" v-show={ isOpen.value }>
            { slots.default?.() }
          </div>
        </MaybeTransition>
      </props.tag>
    ))

    return {}
  },
})
