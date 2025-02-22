// Styles
import './VTreeviewItem.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VListItemAction } from '@/components/VList'
import { makeVListItemProps, VListItem } from '@/components/VList/VListItem'
import { VProgressCircular } from '@/components/VProgressCircular'

// Composables
import { IconValue } from '@/composables/icons'

// Utilities
import { computed, inject, ref, toRaw } from 'vue'
import { EventProp, genericComponent, noop, omit, propsFactory, useRender } from '@/util'

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

  setup (props, { slots }) {
    const visibleIds = inject(VTreeviewSymbol, { visibleIds: ref() }).visibleIds

    const vListItemRef = ref<VListItem>()

    const isActivatableGroupActivator = computed(() =>
      (vListItemRef.value?.root.activatable.value) &&
      vListItemRef.value?.isGroupActivator
    )
    const vListItemRefIsClickable = computed(() => (
      vListItemRef.value?.link.isClickable.value ||
      (props.value != null && !!vListItemRef.value?.list)
    ))
    const isClickable = computed(() =>
      !props.disabled &&
      props.link !== false &&
      (props.link || vListItemRefIsClickable.value || isActivatableGroupActivator.value)
    )
    const isFiltered = computed(() => visibleIds.value && !visibleIds.value.has(toRaw(vListItemRef.value?.id)))

    function activateGroupActivator (e: MouseEvent | KeyboardEvent) {
      if (isClickable.value && isActivatableGroupActivator.value) {
        vListItemRef.value?.activate(!vListItemRef.value?.isActivated, e)
      }
    }

    useRender(() => {
      const listItemProps = omit(VListItem.filterProps(props), ['onClick'])
      const hasPrepend = slots.prepend || props.toggleIcon

      return (
        <VListItem
          ref={ vListItemRef }
          { ...listItemProps }
          active={ vListItemRef.value?.isActivated }
          class={[
            'v-treeview-item',
            {
              'v-treeview-item--activatable-group-activator': isActivatableGroupActivator.value,
              'v-treeview-item--filtered': isFiltered.value,
            },
            props.class,
          ]}
          ripple={ false }
          onClick={ props.onClick ?? activateGroupActivator }
        >
          {{
            ...slots,
            prepend: hasPrepend ? slotProps => {
              return (
                <>
                  <VListItemAction start={ false }>
                    { props.toggleIcon ? (
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
                    ) : (
                      <div class="v-treeview-item__level" />
                    )}
                  </VListItemAction>

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
