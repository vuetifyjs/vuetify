// Styles
import './VAvatarGroup.scss'

// Components
import { VAvatar } from '@/components/VAvatar'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { computed } from 'vue'
import { convertToUnit, genericComponent, getPropertyFromItem, isObject, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { SelectItemKey } from '@/util'

export type AvatarGroupItem = string | Record<string, any>

export type VAvatarGroupSlots = {
  default: never
  prepend: never
  append: never
  item: { props: any, index: number }
  overflow: { overflow: number }
}

export const makeVAvatarGroupProps = propsFactory({
  border: [Boolean, Number, String],
  gap: [Number, String],
  hoverable: Boolean,
  items: {
    type: Array as PropType<AvatarGroupItem[]>,
    default: () => ([]),
  },
  itemProps: {
    type: [Boolean, String, Array, Function] as PropType<SelectItemKey>,
    default: null,
  },
  limit: Number,
  overflowText: String,
  reverse: Boolean,
  size: [Number, String],
  vertical: Boolean,

  ...makeComponentProps(),
  ...makeTagProps(),
}, 'VAvatarGroup')

export const VAvatarGroup = genericComponent<VAvatarGroupSlots>()({
  name: 'VAvatarGroup',

  props: makeVAvatarGroupProps(),

  setup (props, { slots }) {
    const items = computed(() => {
      const visibleItems = props.limit
        ? props.items.slice(0, props.limit)
        : props.items

      const orderedItems = props.reverse
        ? visibleItems.toReversed()
        : visibleItems

      return orderedItems.map(item => {
        const avatarProps = props.itemProps === true
          ? (isObject(item) ? item : { image: item })
          : getPropertyFromItem(item, props.itemProps, item)

        if (avatarProps != null) return avatarProps

        if (!isObject(item)) return { image: item }

        return item
      })
    })

    const overflow = computed(() => props.limit ? Math.max(props.items.length - props.limit, 0) : 0)
    const overflowText = computed(() => props.overflowText ?? (overflow.value ? `+${overflow.value}` : ''))

    const overflowItem = () => (
      slots.overflow?.({ overflow: overflow.value }) ?? (
        <VAvatar class="v-avatar-group__overflow" text={ overflowText.value } />
      )
    )

    useRender(() => (
      <props.tag
        class={[
          'v-avatar-group',
          `v-avatar-group--${props.vertical ? 'vertical' : 'horizontal'}`,
          {
            'v-avatar-group--hoverable': props.hoverable,
            'v-avatar-group--reverse': props.reverse,
          },
          props.class,
        ]}
        style={[
          { '--v-avatar-group-gap': convertToUnit(props.gap) },
          props.style,
        ]}
      >
        { slots.prepend?.() }

        <div class="v-avatar-group__content">
          <VDefaultsProvider
            defaults={{
              VAvatar: {
                size: props.size,
                border: props.border,
              },
            }}
          >
            { slots.default?.() ?? (
              <>
                { props.reverse && overflowText.value && overflowItem() }
                { items.value.map((item, index) => (
                  slots.item?.({ props: item, index }) ?? (
                    <VAvatar
                      key={ index }
                      { ...item }
                    />
                  )
                ))}
                { !props.reverse && overflowText.value && overflowItem() }
              </>
            )}
          </VDefaultsProvider>
        </div>

        { slots.append?.() }
      </props.tag>
    ))

    return {}
  },
})

export type VAvatarGroup = InstanceType<typeof VAvatarGroup>
