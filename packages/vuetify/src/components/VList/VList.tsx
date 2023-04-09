// Styles
import './VList.sass'

// Components
import { VListChildren } from './VListChildren'

// Composables
import { createList } from './list'
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeItemsProps } from '@/composables/items'
import { makeNestedProps, useNested } from '@/composables/nested/nested'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeVariantProps } from '@/composables/variant'
import { provideDefaults } from '@/composables/defaults'
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { computed, ref, toRef } from 'vue'
import { genericComponent, getPropertyFromItem, pick, useRender } from '@/util'

// Types
import type { InternalItem, ItemProps } from '@/composables/items'
import type { SlotsToProps } from '@/util'
import type { PropType } from 'vue'

export interface InternalListItem extends InternalItem {
  type?: 'item' | 'subheader' | 'divider'
}

function isPrimitive (value: unknown): value is string | number | boolean {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
}

function transformItem (props: ItemProps & { itemType: string }, item: any): InternalListItem {
  const type = getPropertyFromItem(item, props.itemType, 'item')
  const title = isPrimitive(item) ? item : getPropertyFromItem(item, props.itemTitle)
  const value = getPropertyFromItem(item, props.itemValue, undefined)
  const children = getPropertyFromItem(item, props.itemChildren)
  const itemProps = props.itemProps === true ? pick(item, ['children'])[1] : getPropertyFromItem(item, props.itemProps)

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

function transformItems (props: ItemProps & { itemType: string }, items: (string | object)[]) {
  const array: InternalListItem[] = []

  for (const item of items) {
    array.push(transformItem(props, item))
  }

  return array
}

function useListItems (props: ItemProps & { itemType: string }) {
  const items = computed(() => transformItems(props, props.items))

  return { items }
}

export const VList = genericComponent<new <T>() => {
  $props: {
    items?: T[]
  } & SlotsToProps<{
    subheader: []
    header: [{ props: Record<string, unknown> }]
    item: [T]
  }>
}>()({
  name: 'VList',

  props: {
    activeColor: String,
    activeClass: String,
    bgColor: String,
    disabled: Boolean,
    lines: {
      type: [Boolean, String] as PropType<'one' | 'two' | 'three' | false>,
      default: 'one',
    },
    nav: Boolean,

    ...makeNestedProps({
      selectStrategy: 'single-leaf' as const,
      openStrategy: 'list' as const,
    }),
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    itemType: {
      type: String,
      default: 'type',
    },
    ...makeItemsProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({ variant: 'text' } as const),
  },

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
    const lineClasses = computed(() => props.lines ? `v-list--${props.lines}-line` : undefined)
    const activeColor = toRef(props, 'activeColor')
    const color = toRef(props, 'color')

    createList()

    provideDefaults({
      VListGroup: {
        activeColor,
        color,
      },
      VListItem: {
        activeClass: toRef(props, 'activeClass'),
        activeColor,
        color,
        density: toRef(props, 'density'),
        disabled: toRef(props, 'disabled'),
        lines: toRef(props, 'lines'),
        nav: toRef(props, 'nav'),
        variant: toRef(props, 'variant'),
      },
    })

    const isFocused = ref(false)
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
      if (!contentRef.value) return

      const targets = ['button', '[href]', 'input', 'select', 'textarea', '[tabindex]'].map(s => `${s}:not([tabindex="-1"])`).join(', ')
      const focusable = [...contentRef.value.querySelectorAll(targets)].filter(el => !el.hasAttribute('disabled')) as HTMLElement[]
      const idx = focusable.indexOf(document.activeElement as HTMLElement)

      if (!location) {
        if (!contentRef.value.contains(document.activeElement)) {
          focusable[0]?.focus()
        }
      } else if (location === 'first') {
        focusable[0]?.focus()
      } else if (location === 'last') {
        focusable.at(-1)?.focus()
      } else {
        let el
        let idxx = idx
        const inc = location === 'next' ? 1 : -1
        do {
          idxx += inc
          el = focusable[idxx]
        } while ((!el || el.offsetParent == null) && idxx < focusable.length && idxx >= 0)
        if (el) el.focus()
        else focus(location === 'next' ? 'first' : 'last')
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
            },
            themeClasses.value,
            backgroundColorClasses.value,
            borderClasses.value,
            densityClasses.value,
            elevationClasses.value,
            lineClasses.value,
            roundedClasses.value,
          ]}
          style={[
            backgroundColorStyles.value,
            dimensionStyles.value,
          ]}
          role="listbox"
          aria-activedescendant={ undefined }
          onFocusin={ onFocusin }
          onFocusout={ onFocusout }
          onFocus={ onFocus }
          onKeydown={ onKeydown }
        >
          <VListChildren items={ items.value } v-slots={ slots }></VListChildren>
        </props.tag>
      )
    })

    return {
      open,
      select,
      focus,
    }
  },
})

export type VList = InstanceType<typeof VList>
