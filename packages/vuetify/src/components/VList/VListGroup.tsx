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
    class: string
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
  prependIcon: IconValue,
  appendIcon: IconValue,
  fluid: Boolean,
  subgroup: Boolean,
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

  props: {
    title: String,

    ...makeVListGroupProps(),
  },

  setup (props, { slots }) {
    const { isOpen, open } = useNestedItem(toRef(props, 'value'), true)
    const list = useList()

    const onClick = (e: Event) => {
      open(!isOpen.value, e)
    }

    const activatorProps: Ref<ListGroupActivatorSlot['props']> = computed(() => ({
      onClick,
      class: 'v-list-group__header',
    }))

    const toggleIcon = computed(() => isOpen.value ? props.collapseIcon : props.expandIcon)

    useRender(() => (
      <props.tag
        class={[
          'v-list-group',
          {
            'v-list-group--prepend': list?.hasPrepend.value,
            'v-list-group--fluid': props.fluid,
            'v-list-group--subgroup': props.subgroup,
          },
        ]}
      >
        { slots.activator && (
          <VDefaultsProvider
            defaults={{
              VListItem: {
                active: isOpen.value,
                activeColor: props.activeColor,
                color: props.color,
                prependIcon: props.prependIcon || (props.subgroup && toggleIcon.value),
                appendIcon: props.appendIcon || (!props.subgroup && toggleIcon.value),
                title: props.title,
                value: props.value,
              },
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

export type VListGroup = InstanceType<typeof VListGroup>

export function filterListGroupProps (props: ExtractPropTypes<ReturnType<typeof makeVListGroupProps>>) {
  return pick(props, Object.keys(VListGroup.props) as any)
}
