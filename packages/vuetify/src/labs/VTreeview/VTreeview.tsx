// Styles
import './VTreeview.sass'

//Components
import { VTreeviewChildren } from "./VTreeviewChildren"

// Composables
import { createList } from '@/components/VList/list'
import { makeBorderProps, useBorder } from '@/composables/border'
import { useBackgroundColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeItemsProps } from '@/composables/list-items'
import { makeNestedProps, useNested } from '@/composables/nested/nested'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeVariantProps } from '@/composables/variant'

// Utilities
import { computed, ref, shallowRef, toRef } from 'vue'
import { focusChild, genericComponent, getPropertyFromItem, pick, propsFactory, useRender } from '@/util'

// Types
import { VTreeviewChildrenSlots } from "./VTreeviewChildren"
import type { ItemProps, ListItem } from '@/composables/list-items'
import { IconValue } from '@/composables/icons'
import type { GenericProps } from '@/util'

export interface InternalListItem<T = any> extends ListItem<T> {
  disabled?: true | false
}

function isPrimitive (value: unknown): value is string | number | boolean {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
}

function transformItem (props: ItemProps & { disabled: Boolean, itemDisabled: string }, item: any): InternalListItem {
  const disabled = props.disabled || getPropertyFromItem(item, props.itemDisabled, false)
  const title = isPrimitive(item) ? item : getPropertyFromItem(item, props.itemTitle)
  const value = getPropertyFromItem(item, props.itemValue, undefined)
  const children = getPropertyFromItem(item, props.itemChildren)
  const itemProps = props.itemProps === true ? pick(item, ['children'])[1] : getPropertyFromItem(item, props.itemProps)

  const _props = {
    disabled,
    title,
    value,
    ...itemProps,
  }

  return {
    disabled: _props.disabled,
    title: _props.title,
    value: _props.value,
    props: _props,
    children: children ? transformItems(props, children) : undefined,
    raw: item,
  }
}

function transformItems (props: ItemProps & { disabled: Boolean, itemDisabled: string }, items: (string | object)[]) {
  const array: ListItem[] = []

  for (const item of items) {
    array.push(transformItem(props, item))
  }

  return array
}

function useListItems (props: ItemProps & { disabled: Boolean, itemDisabled: string }) {
  const items = computed(() => transformItems(props, props.items))

  return { items }
}

export const makeVTreeviewProps = propsFactory({
  baseColor: String,
  bgColor: String,
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
  itemDisabled: {
    type: String,
    default: 'disabled',
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
  showSelectIcon: Boolean,
  selectable: Boolean,
  selectedClass: String,
  selectedColor: String,
  selectOnClick: Boolean,
  ...makeNestedProps({
    selectStrategy: 'classic' as const,
    openStrategy: 'single' as const,
  }),
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeItemsProps(),
  ...makeRoundedProps(),
  ...makeThemeProps(),
  ...makeVariantProps({ variant: 'text' } as const),
}, 'VTreeview')

export const VTreeview = genericComponent<new <T>(
  props: {
    items?: T[]
  },
  slots: VTreeviewChildrenSlots<T>
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VTreeview',

  props: makeVTreeviewProps(),

  emits: {
    'update:selected': (val: unknown[]) => true,
    'update:opened': (val: unknown[]) => true,
    'click:open': (value: { id: unknown, value: boolean, path: unknown[] }) => true,
    'click:select': (value: { id: unknown, value: boolean, path: unknown[] }) => true,
  },

  setup (props, { slots }) {
    const { items } = useListItems(props)
    const { themeClasses } = provideTheme(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'bgColor'))
    const { borderClasses } = useBorder(props)
    const { densityClasses } = useDensity(props)
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props)
    const { open, select } = useNested(props)
    const selectedColor = toRef(props, 'selectedColor')
    const baseColor = toRef(props, 'baseColor')
    const color = toRef(props, 'color')

    createList()

    provideDefaults({
      VTreeviewGroup: {
        baseColor,
        color,
        selectedColor
      },
      VTreeviewItem: {
        baseColor,
        collapseIcon: toRef(props, 'collapseIcon'),
        color,
        density: toRef(props, 'density'),
        disabled: toRef(props, 'disabled'),
        expandIcon: toRef(props, 'expandIcon'),
        hoverable: toRef(props, 'hoverable'),
        indeterminateIcon: toRef(props, 'indeterminateIcon'),
        offIcon: toRef(props, 'offIcon'),
        onIcon: toRef(props, 'onIcon'),
        openOnClick: toRef(props, 'openOnClick'),
        rounded: toRef(props, 'rounded'),
        showSelectIcon: toRef(props, 'showSelectIcon'),
        selectable: toRef(props, 'selectable'),
        selectedClass: toRef(props, 'selectedClass'),
        selectedColor,
        selectOnClick: toRef(props, 'selectOnClick'),
        variant: toRef(props, 'variant')
      },
    })

    const isFocused = shallowRef(false)
    const contentRef = ref<HTMLElement>()
    function onFocusin (e: FocusEvent) {
      isFocused.value = true
    }

    function onFocusout (e: FocusEvent) {
      isFocused.value = false
    }

    function onFocus (e: FocusEvent) {
      if (
        !isFocused.value &&
        !(e.relatedTarget && contentRef.value?.contains(e.relatedTarget as Node))
      ) focus()
    }

    function onKeydown (e: KeyboardEvent) {
      if (!contentRef.value) return

      if (e.key === 'ArrowDown') {
        focus('next')
      } else if (e.key === 'ArrowUp') {
        focus('prev')
      } else if (e.key === 'Home') {
        focus('first')
      } else if (e.key === 'End') {
        focus('last')
      } else {
        return
      }

      e.preventDefault()
    }

    function focus (location?: 'next' | 'prev' | 'first' | 'last') {
      if (contentRef.value) {
        return focusChild(contentRef.value, location)
      }
    }

    useRender(() => {
      return (
        <div
          ref={ contentRef }
          class={[
            'v-treeview',
            {
              'v-treeview--disabled': props.disabled,
            },
            themeClasses.value,
            backgroundColorClasses.value,
            borderClasses.value,
            densityClasses.value,
            elevationClasses.value,
            roundedClasses.value,
            props.class,
          ]}
          style={[
            backgroundColorStyles.value,
            dimensionStyles.value,
            props.style,
          ]}
          tabindex={ (props.disabled || isFocused.value) ? -1 : 0 }
          role="listbox"
          aria-activedescendant={ undefined }
          onFocusin={ onFocusin }
          onFocusout={ onFocusout }
          onFocus={ onFocus }
          onKeydown={ onKeydown }
        >
          <VTreeviewChildren items={ items.value } v-slots={ slots }></VTreeviewChildren>
        </div>
      )
    })

    return {
      open,
      select,
      focus,
    }
  },
})

export type VTreeview = InstanceType<typeof VTreeview>
