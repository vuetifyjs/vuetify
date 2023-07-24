// Styles
import './VTreeviewItem.sass'

// Components
import { VIcon } from '@/components/VIcon'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'

// Composables
import { useList } from '@/components/VList/list'
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { IconValue } from '@/composables/icons'
import { useNestedItem } from '@/composables/nested/nested'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { genOverlays, makeVariantProps, useVariant } from '@/composables/variant'

// Directives
import { Ripple } from '@/directives/ripple'

// Utilities
import { computed } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { RippleDirectiveBinding } from '@/directives/ripple'

type TreeviewItemSlot = {
  isSelected: boolean
  isIndeterminate: boolean
  select: (value: boolean) => void
}

export type TreeviewItemTitleSlot = {
  title?: string | number | boolean
}

export type VTreeviewItemSlots = {
  prepend: TreeviewItemSlot
  append: TreeviewItemSlot
  default: TreeviewItemSlot
  title: TreeviewItemTitleSlot
}

export const makeVTreeviewItemProps = propsFactory({
  baseColor: String,
  collapseIcon: {
    type: IconValue,
    default: '$treeviewCollapse',
  },
  disabled: Boolean,
  expandIcon: {
    type: IconValue,
    default: '$treeviewExpand',
  },
  hoverable: Boolean,
  indeterminateIcon: {
    type: IconValue,
    default: '$checkboxIndeterminate',
  },
  offIcon: {
    type: IconValue,
    default: '$checkboxOff',
  },
  onIcon: {
    type: IconValue,
    default: '$checkboxOn',
  },
  openOnClick: Boolean,
  ripple: {
    type: [Boolean, Object] as PropType<RippleDirectiveBinding['value']>,
    default: true,
  },
  showSelectIcon: Boolean,
  selectable: Boolean,
  selectedColor: String,
  selectedClass: String,
  selectOnClick: Boolean,
  title: [String, Number, Boolean],
  value: null,

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeRoundedProps(),
  ...makeThemeProps(),
  ...makeVariantProps({ variant: 'text' } as const),
}, 'VTreeviewItem')

export const VTreeviewItem = genericComponent<VTreeviewItemSlots>()({
  name: 'VTreeviewItem',

  directives: { Ripple },

  props: makeVTreeviewItemProps(),

  emits: {
    click: (e: MouseEvent | KeyboardEvent) => true,
  },

  setup (props, { attrs, slots, emit }) {
    const id = computed(() => props.value)
    const { select, isSelected, isIndeterminate, isOpen, isLeaf } = useNestedItem(id, false)
    const list = useList()

    const isClickable = computed(() =>
      !props.disabled && (props.value != null && !!list)
    )

    const color = computed(() => props.color ?? props.selectedColor)

    const variantProps = computed(() => ({
      color: isSelected.value ? color.value ?? props.baseColor : props.baseColor,
      variant: props.variant,
    }))

    const toggleIcon = computed(() => isOpen.value ? props.collapseIcon : props.expandIcon)

    const selectIcon = computed(() => isSelected.value ?  props.onIcon : props.offIcon )

    const roundedProps = computed(() => props.rounded)

    const { themeClasses } = provideTheme(props)
    const { borderClasses } = useBorder(props)
    const { colorClasses, colorStyles, variantClasses } = useVariant(variantProps)
    const { densityClasses } = useDensity(props)
    const { dimensionStyles } = useDimension(props)
    const { roundedClasses } = useRounded(roundedProps)

    const slotProps = computed(() => ({
      isSelected: isSelected.value,
      isIndeterminate: isIndeterminate.value,
      select
    } satisfies TreeviewItemSlot))

    function openNode(e: MouseEvent){
      emit('click', e)
      e.stopPropagation()
    }

    function selectItem (e: MouseEvent){
      props.value != null && select(!isSelected.value, e)
      e.stopPropagation()
    }

    function onClick(e: MouseEvent){
      if(props.openOnClick) openNode(e);
      if(props.selectOnClick) selectItem(e);
    }

    useRender(() => {
      const hasTitle = (slots.title || props.title)
      return (
        <div
          class={[
            'v-treeview-item',
            {
              'v-treeview-item--selected': isSelected.value,
              'v-treeview-item--disabled': props.disabled,
              'v-treeview-item--link': isClickable.value,
              //'v-treeview-item--prepend': !hasPrepend && list?.hasPrepend.value,
              [`${props.selectedClass}`]: props.selectedClass && isSelected.value,
            },
            themeClasses.value,
            borderClasses.value,
            colorClasses.value,
            densityClasses.value,
            roundedClasses.value,
            variantClasses.value,
            props.class,
          ]}
          style={[
            colorStyles.value,
            dimensionStyles.value,
            props.style,
          ]}
          v-ripple={ isClickable.value && props.ripple }
          onClick= { onClick }
        >
          { genOverlays((isClickable.value || isSelected.value) && props.hoverable, 'v-treeview-item') }
          { (
            <div key="prepend" class="v-treeview-item__prepend">
              <VIcon onClick={ openNode } icon={ isLeaf.value ?  undefined : toggleIcon.value }></VIcon>
              { props.selectable && props.showSelectIcon && (
                <VIcon onClick={ selectItem } color={ props.selectedColor } icon={ isIndeterminate.value ?  props.indeterminateIcon : selectIcon.value }></VIcon>
              )}
              {
                slots.prepend && <VDefaultsProvider
                  key="prepend-defaults"
                >
                  { slots.prepend?.(slotProps.value) }
                </VDefaultsProvider>
              }
            </div>
          ) }

          <div class={['v-treeview-item__content']}>
            { hasTitle && (
              <VDefaultsProvider key="title">
                { slots.title?.({ title: props.title }) ?? props.title }
              </VDefaultsProvider>
            )}
            { slots.default?.(slotProps.value) }
          </div>
          { slots.append && (
            <div key="append" class="v-list-item__append">
              <VDefaultsProvider
                key="append-defaults"
              >
                { slots.append?.(slotProps.value) }
              </VDefaultsProvider>
            </div>)
          }
        </div>
      )
    })

    return {}
  },
})

export type VTreeviewItem = InstanceType<typeof VTreeviewItem>
