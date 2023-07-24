// Components
import { VExpandTransition } from '@/components/transitions'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'

// Composables
import { useList } from '@/components/VList/list'
import { makeComponentProps } from '@/composables/component'
import { useNestedGroupActivator, useNestedItem } from '@/composables/nested/nested'
import { useSsrBoot } from '@/composables/ssrBoot'
import { makeTagProps } from '@/composables/tag'
import { MaybeTransition } from '@/composables/transition'

// Utilities
import { computed, toRef } from 'vue'
import { defineComponent, genericComponent, propsFactory, useRender } from '@/util'

export type VTreeviewGroupSlots = {
  default: never
  activator: { isOpen: boolean, props: Record<string, unknown> }
}

const VTreeviewGroupActivator = defineComponent({
  name: 'VTreeviewGroupActivator',

  setup (_, { slots }) {
    useNestedGroupActivator()

    return () => slots.default?.()
  },
})

export const makeVTreeviewGroupProps = propsFactory({
  baseColor: String,
  color: String,
  fluid: Boolean,
  selectedColor: String,
  title: String,
  value: null,

  ...makeComponentProps(),
  ...makeTagProps(),
}, 'VTreeviewGroup')

export const VTreeviewGroup = genericComponent<VTreeviewGroupSlots>()({
  name: 'VTreeviewGroup',

  props: makeVTreeviewGroupProps(),

  setup (props, { slots }) {
    const { isOpen, open, id: _id } = useNestedItem(toRef(props, 'value'), true)
    const id = computed(() => `v-treeview-group--id-${String(_id.value)}`)
    const list = useList()
    const { isBooted } = useSsrBoot()

    function onClick (e: Event) {
      open(!isOpen.value, e)
    }

    const activatorProps = computed(() => ({
      onClick,
      class: 'v-treeview-group__header',
      id: id.value,
    }))

    const activatorDefaults = computed(() => ({
      VTreeviewItem: {
        active: isOpen.value,
        baseColor: props.baseColor,
        color: props.color,
        selectedColor: props.selectedColor,
        title: props.title,
        value: props.value,
      },
    }))

    useRender(() => (
      <props.tag
        class={[
          'v-treeview-group',
          {
            'v-treeview-group--prepend': list?.hasPrepend.value,
            'v-treeview-group--fluid': props.fluid,
            'v-treeview-group--open': isOpen.value,
          },
          props.class,
        ]}
        style={ props.style }
      >
        { slots.activator && (
          <VDefaultsProvider defaults={ activatorDefaults.value }>
            <VTreeviewGroupActivator>
              { slots.activator({ props: activatorProps.value, isOpen: isOpen.value }) }
            </VTreeviewGroupActivator>
          </VDefaultsProvider>
        )}

        <MaybeTransition transition={{ component: VExpandTransition }} disabled={ !isBooted.value }>
          <div class="v-treeview-group__items" role="group" aria-labelledby={ id.value } v-show={ isOpen.value }>
            { slots.default?.() }
          </div>
        </MaybeTransition>
      </props.tag>
    ))

    return {}
  },
})

export type VTreeviewGroup = InstanceType<typeof VTreeviewGroup>
