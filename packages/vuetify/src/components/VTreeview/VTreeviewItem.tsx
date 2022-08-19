import './VTreeviewItem.sass'

// Components
import { VBtn, VIcon, VProgressCircular, VCheckboxBtn } from '@/components'

// Composables
import { useNestedItem } from '@/composables/nested/nested'
import { makeTagProps } from '@/composables/tag'
import { makeRouterProps } from '@/composables/router'
import { useTextColor } from '@/composables/color'
import { genOverlays } from '@/composables/variant'
import { makeRoundedProps, useRounded } from '@/composables/rounded'

// Utilities
import { computed, inject, ref, watch } from 'vue'
import { defineComponent } from '@/util'
import { VTreeviewSymbol } from './shared'

export const VTreeviewItem = defineComponent({
  name: 'VTreeviewItem',

  props: {
    openOnClick: Boolean,
    title: String,
    selected: Boolean,
    loading: Boolean,
    selectOnClick: Boolean,
    hideExpand: Boolean,
    showSelect: Boolean,
    hover: {
      type: Boolean,
      default: true,
    },
    collapseIcon: {
      type: String,
      default: '$treeviewCollapse',
    },
    expandIcon: {
      type: String,
      default: '$treeviewExpand',
    },
    prependIcon: String,
    appendIcon: String,
    selectedColor: String,
    value: null,
    disabled: Boolean,
    ...makeTagProps(),
    ...makeRouterProps(),
    ...makeRoundedProps(),
  },

  emits: {
    'update:selected': (value: boolean, e: MouseEvent) => true,
    'update:indeterminate': (value: boolean) => true,
    'click:prepend': (data: { event: MouseEvent, isOpen: boolean, open: (value: boolean, e?: Event) => void }) => true,
    'click:dblclick': (data: { event: MouseEvent, isOpen: boolean, open: (value: boolean, e?: Event) => void }) => true,
    'click:contextmenu': (data: { event: MouseEvent, isOpen: boolean, open: (value: boolean, e?: Event) => void }) => true,
  },

  setup (props, { slots, emit, attrs }) {
    const id = computed(() => props.value)
    const {
      select,
      isSelected,
      isSelectable,
      isIndeterminate,
      isOpen,
      open,
      isLeaf,
      selectedClass,
      root,
    } = useNestedItem(id, false)
    const { visibleIds } = inject(VTreeviewSymbol, { visibleIds: ref(new Set()) })

    const slotProps = computed(() => ({
      ...props,
      ...attrs,
      open,
      isOpen: isOpen.value,
      select,
      isSelected: isSelected.value,
      isIndeterminate: isIndeterminate.value,
    }))

    function onItemClick (e: MouseEvent) {
      props.selectOnClick && select(!isSelected.value, e)

      props.openOnClick && !isLeaf.value && open(!isOpen.value, e)
    }

    function onOpenClick (e: MouseEvent) {
      e.stopPropagation()

      open(!isOpen.value, e)
    }

    function onSelectClick (e: MouseEvent) {
      e.stopPropagation()

      select(!isSelected.value, e)
    }

    function onDblclick (event: MouseEvent) {
      emit('click:dblclick', { event, isOpen: isOpen.value, open })
      root.emit('click:dblclick', { event, isOpen: isOpen.value, open }) // TODO: Better way to do this that is not re-emitting manually up the chain?
    }

    function onContextmenu (event: MouseEvent) {
      emit('click:contextmenu', { event, isOpen: isOpen.value, open })
      root.emit('click:contextmenu', { event, isOpen: isOpen.value, open })
    }

    const { textColorClasses, textColorStyles } = useTextColor(props, 'selectedColor')
    const { roundedClasses } = useRounded(props)

    return () => {
      const hasPrepend = !!(props.prependIcon || slots.prepend)
      const hasAppend = !!(props.appendIcon || slots.append)
      const hasTitle = !!(props.title || slots.title)

      return (
        <props.tag
          class={[
            'v-treeview-item',
            {
              'v-treeview-item--prepend': isLeaf.value,
              'v-treeview-item--clickable': (props.openOnClick && !isLeaf.value) || props.selectOnClick,
              'v-treeview-item--disabled': props.disabled,
              'v-treeview-item--filtered': !visibleIds.value.has(id.value),
            },
            selectedClass.value,
            roundedClasses.value,
            isSelected.value && textColorClasses.value,
          ]}
          style={isSelected.value ? textColorStyles.value : undefined}
          onClick={ onItemClick }
          onDblclick={ onDblclick }
          onContextmenu={ onContextmenu }
        >
          { genOverlays(props.hover, 'v-treeview') }

          { (!isLeaf.value && !props.hideExpand) && (
            <div key="expand" class="v-treeview-item__expand">
              { slots.expand ? slots.expand() : (
                <VBtn
                  variant="text"
                  size="x-small"
                  disabled={ props.loading }
                  icon={ isOpen.value ? props.collapseIcon : props.expandIcon }
                  onClick={ onOpenClick }
                />
              ) }
              { props.loading && (
                <VProgressCircular indeterminate class="v-treeview-item__loading" />
              ) }
            </div>
          ) }

          <div class="v-treeview-item__content">
            { props.showSelect && isSelectable.value && (slots.selection ? slots.selection(slotProps.value) : (
              <VCheckboxBtn
                density="compact"
                disabled={ props.disabled || props.loading }
                modelValue={ isSelected.value }
                indeterminate={ isIndeterminate.value }
                onClick={ onSelectClick }
              />
            )) }

            { hasPrepend && (
              <div key="prepend" class="v-treeview-item__prepend">
                { slots.prepend ? slots.prepend(slotProps.value) : props.prependIcon ? (
                  <VIcon icon={ props.prependIcon } />
                ) : undefined }
              </div>
            ) }

            { hasTitle && (
              <div key="title" class="v-treeview-item__title">
                { slots.title ? slots.title(slotProps.value) : props.title }
              </div>
            ) }

            { hasAppend && (
              <div key="append" class="v-treeview-item__append">
                { slots.append ? slots.append(slotProps.value) : (
                  <VIcon icon={ props.appendIcon } />
                ) }
              </div>
            ) }
          </div>
        </props.tag>
      )
    }
  },
})
