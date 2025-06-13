// Styles
import './VTreeviewItem.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VListItemAction } from '@/components/VList'
import { makeVListItemProps, VListItem } from '@/components/VList/VListItem'
import { VProgressCircular } from '@/components/VProgressCircular'

// Composables
import { IconValue } from '@/composables/icons'

// Utilities
import { computed, inject, ref, toRaw } from 'vue'
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import { VTreeviewSymbol } from './shared'
import type { ToggleListItemSlot } from './shared'
import type { VListItemSlots } from '@/components/VList/VListItem'

export const makeVTreeviewItemProps = propsFactory({
  loading: Boolean,
  toggleIcon: IconValue,

  ...makeVListItemProps({ slim: true }),
}, 'VTreeviewItem')

export type VTreeviewItemSlots = VListItemSlots & {
  toggle: ToggleListItemSlot
}

export const VTreeviewItem = genericComponent<VTreeviewItemSlots>()({
  name: 'VTreeviewItem',

  props: makeVTreeviewItemProps(),

  emits: {
    toggleExpand: (value: PointerEvent) => true,
  },

  setup (props, { slots, emit }) {
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

    function onClickAction (e: PointerEvent) {
      e.preventDefault()
      emit('toggleExpand', e)
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
                      <>
                        { !slots.toggle ? (
                          <VBtn
                            key="prepend-toggle"
                            density="compact"
                            icon={ props.toggleIcon }
                            loading={ props.loading }
                            variant="text"
                            onClick={ onClickAction }
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
                          <VDefaultsProvider
                            key="prepend-defaults"
                            defaults={{
                              VBtn: {
                                density: 'compact',
                                icon: props.toggleIcon,
                                variant: 'text',
                                loading: props.loading,
                              },
                              VProgressCircular: {
                                indeterminate: 'disable-shrink',
                                size: 20,
                                width: 2,
                              },
                            }}
                          >
                            { slots.toggle({
                              ...slotProps,
                              props: {
                                onClick: onClickAction,
                              },
                            }) }
                          </VDefaultsProvider>
                        )}
                      </>
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
