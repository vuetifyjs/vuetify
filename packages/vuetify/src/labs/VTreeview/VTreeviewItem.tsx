// Styles
import './VTreeviewItem.sass'

// Components
import { VIcon } from '@/components/VIcon'
import { makeVListItemProps, VListItem } from '@/components/VList/VListItem'

// Composables
import { IconValue } from '@/composables/icons'
import { useLink } from '@/composables/router'

// Utilities
import { computed, inject, ref } from 'vue'
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import { VTreeviewSymbol } from './VTreeview'
import type { VListItemSlots } from '@/components/VList/VListItem'

export const makeVTreeviewItemProps = propsFactory({
  toggleIcon: IconValue,
  ...makeVListItemProps(),
}, 'VTreeviewItem')

export const VTreeviewItem = genericComponent<VListItemSlots>()({
  name: 'VTreeviewItem',

  props: makeVTreeviewItemProps(),

  emits: {
    click: (e: MouseEvent | KeyboardEvent) => true,
  },

  setup (props, { attrs, slots, emit }) {
    const link = useLink(props, attrs)
    const id = computed(() => props.value === undefined ? link.href.value : props.value)
    const vListItemRef = ref<VListItem>()

    const isClickable = computed(() =>
      !props.disabled &&
      props.link !== false &&
      (props.link || link.isClickable.value || (props.value != null && !!vListItemRef.value?.list))
    )

    function onClick (e: MouseEvent | KeyboardEvent) {
      if (e instanceof MouseEvent) {
        emit('click', e)
        if (!vListItemRef.value?.isGroupActivator || !isClickable.value) return
        props.value != null && vListItemRef.value?.select(!vListItemRef.value?.isSelected, e)
      }
    }

    function onKeyDown (e: KeyboardEvent) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onClick(e as any as MouseEvent)
      }
    }

    const visibleIds = inject(VTreeviewSymbol, { visibleIds: ref() }).visibleIds

    useRender(() => {
      return (
        <VListItem
          ref={ vListItemRef }
          { ...omit(props, ['class']) }
          class={[
            'v-treeview-item',
            props.class,
            {
              'v-treeview-item--filtered': visibleIds.value && !visibleIds.value.has(id.value),
            },
          ]}
          onClick={ onClick }
          onKeydown={ isClickable.value && onKeyDown }
        >
          {{
            ...slots,
            prepend: slotProps => (
              <>
                <VIcon
                  density={ props.density }
                  icon={ props.toggleIcon }
                />
                { slots.prepend?.(slotProps) }
              </>
            ),
          }}
        </VListItem>
      )
    })
    return {}
  }
})

export type VTreeviewItem = InstanceType<typeof VTreeviewItem>
