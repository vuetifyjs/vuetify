// Styles
import './VTreeviewItem.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VListItemAction } from '@/components/VList'
import { makeVListItemProps, VListItem } from '@/components/VList/VListItem'
import { VProgressCircular } from '@/components/VProgressCircular'

// Composables
import { forwardRefs } from '@/composables/forwardRefs'
import { IconValue } from '@/composables/icons'

// Utilities
import { computed, inject, ref, toRaw } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import { VTreeviewSymbol } from './shared'
import { VAvatar } from '../VAvatar'
import { VDefaultsProvider } from '../VDefaultsProvider'
import { VIcon } from '../VIcon'
import type { VListItemSlots } from '@/components/VList/VListItem'
import type { IndentLineType } from '@/util'

export const makeVTreeviewItemProps = propsFactory({
  loading: Boolean,
  hideActions: Boolean,
  hasCustomPrepend: Boolean,
  indentLines: Array as PropType<IndentLineType[]>,
  toggleIcon: IconValue,

  ...makeVListItemProps({ slim: true }),
}, 'VTreeviewItem')

export const VTreeviewItem = genericComponent<VListItemSlots>()({
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
      e.stopPropagation()
      emit('toggleExpand', e)
    }

    useRender(() => {
      const listItemProps = VListItem.filterProps(props)
      const hasPrepend = slots.prepend ||
        props.toggleIcon ||
        props.indentLines ||
        props.prependIcon ||
        props.prependAvatar

      return (
        <VListItem
          ref={ vListItemRef }
          { ...listItemProps }
          active={ vListItemRef.value?.isActivated || undefined }
          class={[
            'v-treeview-item',
            {
              'v-treeview-item--activatable-group-activator': isActivatableGroupActivator.value,
              'v-treeview-item--filtered': isFiltered.value,
            },
            props.class,
          ]}
          ripple={ false }
          onClick={ activateGroupActivator }
        >
          {{
            ...slots,
            prepend: hasPrepend ? slotProps => {
              return (
                <>
                  { props.indentLines && props.indentLines.length > 0 ? (
                    <div
                      key="indent-lines"
                      class="v-treeview-indent-lines"
                      style={{ '--v-indent-parts': props.indentLines.length }}
                    >
                      { props.indentLines.map(type => (
                        <div class={ `v-treeview-indent-line v-treeview-indent-line--${type}` } />
                      ))}
                    </div>
                  ) : '' }
                  { !props.hideActions && (
                    <VListItemAction start>
                      { props.toggleIcon ? (
                        <VBtn
                          density="compact"
                          icon={ props.toggleIcon }
                          loading={ props.loading }
                          variant="text"
                          onClick={ onClickAction }
                        >
                          {{
                            loader: () => (
                              <VProgressCircular
                                indeterminate="disable-shrink"
                                size="20"
                                width="2"
                              />
                            ),
                          }}
                        </VBtn>
                      ) : (
                        <div class="v-treeview-item__level" />
                      )}
                    </VListItemAction>
                  )}

                  { !props.hasCustomPrepend ? (
                    <>
                      { slots.prepend?.(slotProps) }
                      { props.prependAvatar && (
                        <VAvatar
                          key="prepend-avatar"
                          density={ props.density }
                          image={ props.prependAvatar }
                        />
                      )}

                      { props.prependIcon && (
                        <VIcon
                          key="prepend-icon"
                          density={ props.density }
                          icon={ props.prependIcon }
                        />
                      )}
                    </>
                  ) : (
                    <VDefaultsProvider
                      key="prepend-defaults"
                      defaults={{
                        VAvatar: {
                          density: props.density,
                          image: props.appendAvatar,
                        },
                        VIcon: {
                          density: props.density,
                          icon: props.appendIcon,
                        },
                        VListItemAction: {
                          start: true,
                        },
                      }}
                    >
                      { slots.prepend?.(slotProps) }
                    </VDefaultsProvider>
                  )}
                </>
              )
            } : undefined,
          }}
        </VListItem>
      )
    })

    return forwardRefs({}, vListItemRef)
  },
})

export type VTreeviewItem = InstanceType<typeof VTreeviewItem>
