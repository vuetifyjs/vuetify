// Components
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VExpandTransition } from '@/components/transitions'

// Composables
import { useList } from './list'
import { IconValue } from '@/composables/icons'
import { makeTagProps } from '@/composables/tag'
import { useNestedGroupActivator, useNestedItem } from '@/composables/nested/nested'

// Utilities
import { computed, toRef } from 'vue'
import { defineComponent, genericComponent, pick, propsFactory, useRender } from '@/util'

// Types
import type { InternalListItem } from './VList'
import type { MakeSlots } from '@/util'
import type { ExtractPropTypes, Ref } from 'vue'

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

export const makeVListGroupProps = propsFactory({
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
  fluid: Boolean,
  value: null,

  ...makeTagProps(),
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

  props: makeVListGroupProps(),

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

    useRender(() => (
      <props.tag
        class={[
          'v-list-group',
          {
            'v-list-group--prepend': list?.hasPrepend.value,
            'v-list-group--fluid': props.fluid,
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
          <div class="v-list-group__items" v-show={ isOpen.value }>
            { slots.default?.() }
          </div>
        </VExpandTransition>
      </props.tag>
    ))

    return {}
  },
})

export function filterListGroupProps (props: ExtractPropTypes<ReturnType<typeof makeVListGroupProps>>) {
  return pick(props, Object.keys(VListGroup.props) as any)
}
