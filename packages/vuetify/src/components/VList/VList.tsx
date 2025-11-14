// Styles
import './VList.sass'

// Components
import { VListChildren } from './VListChildren'

// Composables
import { createList } from './list'
import { makeBorderProps, useBorder } from '@/composables/border'
import { useBackgroundColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { IconValue } from '@/composables/icons'
import { makeItemsProps } from '@/composables/list-items'
import { makeNestedProps, useNested } from '@/composables/nested/nested'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeVariantProps } from '@/composables/variant'

// Utilities
import { computed, ref, shallowRef, toRef } from 'vue'
import {
  EventProp,
  focusChild,
  genericComponent,
  getPropertyFromItem,
  isPrimitive,
  omit,
  propsFactory,
  useRender,
} from '@/util'

// Types
import type { PropType } from 'vue'
import type { VListChildrenSlots } from './VListChildren'
import type { ItemProps, ListItem } from '@/composables/list-items'
import type { GenericProps, SelectItemKey } from '@/util'

export interface InternalListItem<T = any> extends ListItem<T> {}

const itemTypes = new Set(['item', 'divider', 'subheader'])

function transformItem (props: ItemProps, item: any): ListItem {
  const title = isPrimitive(item) ? item : getPropertyFromItem(item, props.itemTitle)
  const value = isPrimitive(item) ? item : getPropertyFromItem(item, props.itemValue, undefined)
  const children = getPropertyFromItem(item, props.itemChildren)
  const itemProps = props.itemProps === true
    ? omit(item, ['children'])
    : getPropertyFromItem(item, props.itemProps)

  let type = getPropertyFromItem(item, props.itemType, 'item')
  if (!itemTypes.has(type)) {
    type = 'item'
  }

  const _props = {
    title,
    value,
    ...itemProps,
  }

  return {
    type,
    title: _props.title,
    value: _props.value,
    props: _props,
    children: type === 'item' && children ? transformItems(props, children) : undefined,
    raw: item,
  }
}

function transformItems (props: ItemProps, items: (string | object)[]) {
  const array: InternalListItem[] = []

  for (const item of items) {
    array.push(transformItem(props, item))
  }

  return array
}

export function useListItems (props: ItemProps) {
  const items = computed(() => transformItems(props, props.items))

  return { items }
}

export const makeVListProps = propsFactory({
  baseColor: String,
  /* @deprecated */
  activeColor: String,
  activeClass: String,
  bgColor: String,
  disabled: Boolean,
  filterable: Boolean,
  expandIcon: IconValue,
  collapseIcon: IconValue,
  lines: {
    type: [Boolean, String] as PropType<'one' | 'two' | 'three' | false>,
    default: 'one',
  },
  slim: Boolean,
  nav: Boolean,
  navigationStrategy: {
    type: String as PropType<'focus' | 'track'>,
    default: 'focus',
  },
  navigationIndex: Number,

  'onClick:open': EventProp<[{ id: unknown, value: boolean, path: unknown[] }]>(),
  'onClick:select': EventProp<[{ id: unknown, value: boolean, path: unknown[] }]>(),
  'onUpdate:opened': EventProp<[unknown]>(),
  ...makeNestedProps({
    selectStrategy: 'single-leaf' as const,
    openStrategy: 'list' as const,
  }),
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeItemsProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({ variant: 'text' } as const),
}, 'VList')

type ItemType<T> = T extends readonly (infer U)[] ? U : never

export const VList = genericComponent<new <
  T extends readonly any[],
  S = unknown,
  O = unknown
>(
  props: {
    items?: T
    itemTitle?: SelectItemKey<ItemType<T>>
    itemValue?: SelectItemKey<ItemType<T>>
    itemChildren?: SelectItemKey<ItemType<T>>
    itemProps?: SelectItemKey<ItemType<T>>
    selected?: S
    'onUpdate:selected'?: (value: S) => void
    'onClick:open'?: (value: { id: unknown, value: boolean, path: unknown[] }) => void
    'onClick:select'?: (value: { id: unknown, value: boolean, path: unknown[] }) => void
    opened?: O
    'onUpdate:opened'?: (value: O) => void
  },
  slots: VListChildrenSlots<ItemType<T>>
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VList',

  props: makeVListProps(),

  emits: {
    'update:selected': (value: unknown) => true,
    'update:activated': (value: unknown) => true,
    'update:opened': (value: unknown) => true,
    'update:navigationIndex': (value: number) => true,
    'click:open': (value: { id: unknown, value: boolean, path: unknown[] }) => true,
    'click:activate': (value: { id: unknown, value: boolean, path: unknown[] }) => true,
    'click:select': (value: { id: unknown, value: boolean, path: unknown[] }) => true,
  },

  setup (props, { slots, emit }) {
    const { items } = useListItems(props)
    const { themeClasses } = provideTheme(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(() => props.bgColor)
    const { borderClasses } = useBorder(props)
    const { densityClasses } = useDensity(props)
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props)
    const { children, open, parents, select, getPath } = useNested(props)
    const lineClasses = toRef(() => props.lines ? `v-list--${props.lines}-line` : undefined)
    const activeColor = toRef(() => props.activeColor)
    const baseColor = toRef(() => props.baseColor)
    const color = toRef(() => props.color)
    const isSelectable = toRef(() => (props.selectable || props.activatable))

    const currentNavIndex = useProxiedModel(
      props,
      'navigationIndex',
      -1,
      v => v ?? -1
    )

    createList({
      filterable: props.filterable,
    })

    provideDefaults({
      VListGroup: {
        activeColor,
        baseColor,
        color,
        expandIcon: toRef(() => props.expandIcon),
        collapseIcon: toRef(() => props.collapseIcon),
      },
      VListItem: {
        activeClass: toRef(() => props.activeClass),
        activeColor,
        baseColor,
        color,
        density: toRef(() => props.density),
        disabled: toRef(() => props.disabled),
        lines: toRef(() => props.lines),
        nav: toRef(() => props.nav),
        slim: toRef(() => props.slim),
        variant: toRef(() => props.variant),
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

    function getNextIndex (direction: 'next' | 'prev' | 'first' | 'last'): number {
      const itemCount = items.value.length
      if (itemCount === 0) return -1

      let nextIndex: number

      if (direction === 'first') {
        nextIndex = 0
      } else if (direction === 'last') {
        nextIndex = itemCount - 1
      } else {
        nextIndex = currentNavIndex.value + (direction === 'next' ? 1 : -1)

        if (nextIndex < 0) nextIndex = itemCount - 1
        if (nextIndex >= itemCount) nextIndex = 0
      }

      const startIndex = nextIndex
      let attempts = 0
      while (attempts < itemCount) {
        const item = items.value[nextIndex]
        if (item && item.type !== 'divider' && item.type !== 'subheader') {
          return nextIndex
        }
        nextIndex += direction === 'next' || direction === 'last' ? 1 : -1
        if (nextIndex < 0) nextIndex = itemCount - 1
        if (nextIndex >= itemCount) nextIndex = 0
        if (nextIndex === startIndex) return -1
        attempts++
      }

      return -1
    }

    function onKeydown (e: KeyboardEvent) {
      const target = e.target as HTMLElement

      if (!contentRef.value ||
        (target.tagName === 'INPUT' && ['Home', 'End'].includes(e.key)) ||
        target.tagName === 'TEXTAREA') {
        return
      }

      let handled = false

      if (props.navigationStrategy === 'track') {
        let nextIdx: number | null = null

        if (e.key === 'ArrowDown') {
          nextIdx = getNextIndex('next')
          handled = true
        } else if (e.key === 'ArrowUp') {
          nextIdx = getNextIndex('prev')
          handled = true
        } else if (e.key === 'Home') {
          nextIdx = getNextIndex('first')
          handled = true
        } else if (e.key === 'End') {
          nextIdx = getNextIndex('last')
          handled = true
        }

        if (handled && nextIdx !== null && nextIdx !== -1) {
          currentNavIndex.value = nextIdx
        }
      } else {
        if (e.key === 'ArrowDown') {
          focus('next')
          handled = true
        } else if (e.key === 'ArrowUp') {
          focus('prev')
          handled = true
        } else if (e.key === 'Home') {
          focus('first')
          handled = true
        } else if (e.key === 'End') {
          focus('last')
          handled = true
        }
      }

      if (handled) {
        e.preventDefault()
      }
    }

    function onMousedown (e: MouseEvent) {
      isFocused.value = true
    }

    function focus (location?: 'next' | 'prev' | 'first' | 'last' | number) {
      if (contentRef.value) {
        return focusChild(contentRef.value, location)
      }
    }

    useRender(() => {
      return (
        <props.tag
          ref={ contentRef }
          class={[
            'v-list',
            {
              'v-list--disabled': props.disabled,
              'v-list--nav': props.nav,
              'v-list--slim': props.slim,
            },
            themeClasses.value,
            backgroundColorClasses.value,
            borderClasses.value,
            densityClasses.value,
            elevationClasses.value,
            lineClasses.value,
            roundedClasses.value,
            props.class,
          ]}
          style={[
            backgroundColorStyles.value,
            dimensionStyles.value,
            props.style,
          ]}
          tabindex={ props.disabled ? -1 : 0 }
          role={ isSelectable.value ? 'listbox' : 'list' }
          aria-activedescendant={ undefined }
          onFocusin={ onFocusin }
          onFocusout={ onFocusout }
          onFocus={ onFocus }
          onKeydown={ onKeydown }
          onMousedown={ onMousedown }
        >
          <VListChildren
            items={ items.value }
            returnObject={ props.returnObject }
            v-slots={ slots }
          />
        </props.tag>
      )
    })

    return {
      open,
      select,
      focus,
      children,
      parents,
      getPath,
      navigationIndex: computed(() => currentNavIndex.value),
    }
  },
})

export type VList = InstanceType<typeof VList>
