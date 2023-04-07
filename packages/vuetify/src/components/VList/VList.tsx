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
import { makeItemsProps, useItems } from '@/composables/items'
import { makeNestedProps, useNested } from '@/composables/nested/nested'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeVariantProps } from '@/composables/variant'
import { provideDefaults } from '@/composables/defaults'
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { computed, ref, toRef } from 'vue'
import { genericComponent, useRender } from '@/util'

// Types
import type { InternalItem } from '@/composables/items'
import type { SlotsToProps } from '@/util'
import type { PropType } from 'vue'
import type { VListGroupSlots } from './VListGroup'
import type { ListItemSlot } from './VListChildren'
import type { ListItemSubtitleSlot, ListItemTitleSlot } from './VListItem'

export interface InternalListItem<T> extends InternalItem<T> {
  type?: 'item'
}

export const VList = genericComponent<new <T>() => {
  $props: {
    items?: T[]
  } & SlotsToProps<{
    'no-data': [{ noDataText: string }]
    subheader: [{ props: Record<string, unknown> }]
    divider: [{ props: Record<string, unknown> }]
    header: [VListGroupSlots['activator']]
    item: [ListItemSlot<T>]
    title: [ListItemTitleSlot]
    subtitle: [ListItemSubtitleSlot]
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
    noDataText: {
      type: String,
      default: '$vuetify.noDataText',
    },
    hideNoData: Boolean,

    ...makeNestedProps({
      selectStrategy: 'single-leaf' as const,
      openStrategy: 'list' as const,
    }),
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
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
    const { items } = useItems(props)
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

      const focusable = [...contentRef.value.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )].filter(el => !el.hasAttribute('disabled')) as HTMLElement[]
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
          <VListChildren
            items={ items.value }
            noDataText={ !props.hideNoData ? props.noDataText : undefined }
            v-slots={ slots }
          ></VListChildren>
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
