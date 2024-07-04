// Styles
import './VTreeviewItem.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VListItemAction } from '@/components/VList'
import { makeVListItemProps, VListItem } from '@/components/VList/VListItem'
import { VProgressCircular } from '@/components/VProgressCircular'

// Composables
import { IconValue } from '@/composables/icons'
import { useNestedItem } from '@/composables/nested/nested'
import { useLink } from '@/composables/router'

// Utilities
import { computed, inject, ref } from 'vue'
import { EventProp, genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import { VTreeviewSymbol } from './shared'
import type { VListItemSlots } from '@/components/VList/VListItem'

export const makeVTreeviewItemProps = propsFactory({
  loading: Boolean,
  onToggleExpand: EventProp<[MouseEvent]>(),
  toggleIcon: IconValue,

  ...makeVListItemProps({ slim: true }),
}, 'VTreeviewItem')

export const VTreeviewItem = genericComponent<VListItemSlots>()({
  name: 'VTreeviewItem',

  props: makeVTreeviewItemProps(),

  setup (props, { attrs, slots, emit }) {
    const link = useLink(props, attrs)
    const rawId = computed(() => props.value === undefined ? link.href.value : props.value)
    const vListItemRef = ref<VListItem>()

    const {
      activate,
      isActivated,
      isGroupActivator,
      root,
      id,
    } = useNestedItem(rawId, false)

    const isActivatableGroupActivator = computed(() =>
      (root.activatable.value) &&
      isGroupActivator
    )

    const isClickable = computed(() =>
      !props.disabled &&
      props.link !== false &&
      (props.link || link.isClickable.value || (props.value != null && !!vListItemRef.value?.list) || isActivatableGroupActivator.value)
    )

    function activateItem (e: MouseEvent) {
      if (
        !isClickable.value ||
        (!isActivatableGroupActivator.value && isGroupActivator)
      ) return

      if (root.activatable.value) {
        if (isActivatableGroupActivator.value) {
          activate(!isActivated.value, e)
        } else {
          vListItemRef.value?.activate(!vListItemRef.value?.isActivated, e)
        }
      }
    }

    const visibleIds = inject(VTreeviewSymbol, { visibleIds: ref() }).visibleIds

    useRender(() => {
      const listItemProps = omit(VListItem.filterProps(props), ['onClick'])
      const hasPrepend = slots.prepend || props.toggleIcon

      return (
        <VListItem
          { ...listItemProps }
          active={ isActivated.value }
          class={[
            'v-treeview-item',
            {
              'v-treeview-item--activetable-group-activator': isActivatableGroupActivator.value,
              'v-treeview-item--filtered': visibleIds.value && !visibleIds.value.has(id.value),
            },
            props.class,
          ]}
          ripple={ false }
          onClick={ props.onClick ?? activateItem }
          value={ id.value }
        >
          {{
            ...slots,
            prepend: hasPrepend ? slotProps => {
              return (
                <>
                  { props.toggleIcon && (
                    <VListItemAction start={ false }>
                      <VBtn
                        density="compact"
                        icon={ props.toggleIcon }
                        loading={ props.loading }
                        variant="text"
                        onClick={ props.onToggleExpand }
                      >
                        {{
                          loader () {
                            return (
                              <VProgressCircular
                                indeterminate="disable-shrink"
                                size="20"
                                width="2"
                              />
                            )
                          },
                        }}
                      </VBtn>
                    </VListItemAction>
                  )}

                  { slots.prepend?.(slotProps) }
                </>
              )
            } : undefined,
          }}
        </VListItem>
      )
    })

    return {}
  },
})

export type VTreeviewItem = InstanceType<typeof VTreeviewItem>
