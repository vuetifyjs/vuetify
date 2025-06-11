// Styles
import './VCommandPaletteItem.scss'

// Composables
import { useCommandPaletteContext } from './composables/useCommandPaletteContext'
import { makeComponentProps } from '@/composables/component'

// Utilities
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export type VCommandPaletteItemSlots = {
  default: {
    item: any
    index: number
    selected: boolean
    props: Record<string, any>
  }
}

export const makeVCommandPaletteItemProps = propsFactory({
  item: {
    type: Object as PropType<any>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  tag: {
    type: String,
    default: 'div',
  },
  ...makeComponentProps(),
}, 'VCommandPaletteItem')

export const VCommandPaletteItem = genericComponent<VCommandPaletteItemSlots>()({
  name: 'VCommandPaletteItem',

  props: makeVCommandPaletteItemProps(),

  setup (props, { slots }) {
    const context = useCommandPaletteContext()
    const elementRef = ref<HTMLElement>()

    const itemId = computed(() => `command-palette-item-${props.index}`)
    const isSelected = computed(() => context.selectedIndex.value === props.index)

    // Track the current registered ID to handle re-registration
    let currentRegisteredId: string | null = null

    // Register this item with the parent context initially
    onMounted(() => {
      currentRegisteredId = itemId.value
      context.registerItem(currentRegisteredId, elementRef, props.item)
    })

    // Watch for changes in itemId and re-register when it changes
    watch(itemId, (newId, oldId) => {
      if (oldId && currentRegisteredId) {
        // Unregister the old key
        context.unregisterItem(currentRegisteredId)
      }
      // Register with the new key
      currentRegisteredId = newId
      onMounted(() => {
        context.registerItem(itemId.value, elementRef, props.item)
      })

      watch(itemId, (newId, oldId) => {
        if (oldId) context.unregisterItem(oldId)
        context.registerItem(newId, elementRef, props.item)
      })

      onBeforeUnmount(() => {
        context.unregisterItem(itemId.value)
      })
    })

    const itemProps = computed(() => context.getItemProps(props.item, props.index))

    useRender(() => {
      const Tag = props.tag as any

      return (
        <Tag
          ref={ elementRef }
          { ...itemProps.value }
          class={[
            'v-command-palette-item',
            {
              'v-command-palette-item--selected': isSelected.value,
            },
            props.class,
          ]}
          style={ props.style }
        >
          { slots.default?.({
            item: props.item,
            index: props.index,
            selected: isSelected.value,
            props: itemProps.value,
          })}
        </Tag>
      )
    })
  },
})

export type VCommandPaletteItem = InstanceType<typeof VCommandPaletteItem>
