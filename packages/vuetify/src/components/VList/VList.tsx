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
import { makeItemsProps, useItems } from '@/composables/list-items'
import { makeNestedProps, useNested } from '@/composables/nested/nested'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeVariantProps } from '@/composables/variant'

// Utilities
import { computed, ref, shallowRef, toRef } from 'vue'
import { focusChild, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VListChildrenSlots } from './VListChildren'
import type { GenericProps, SelectItemKey } from '@/util'

export const makeVListProps = propsFactory({
  baseColor: String,
  /* @deprecated */
  activeColor: String,
  activeClass: String,
  bgColor: String,
  disabled: Boolean,
  expandIcon: String,
  collapseIcon: String,
  lines: {
    type: [Boolean, String] as PropType<'one' | 'two' | 'three' | false>,
    default: 'one',
  },
  slim: Boolean,
  nav: Boolean,

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
    'click:open': (value: { id: unknown, value: boolean, path: unknown[] }) => true,
    'click:activate': (value: { id: unknown, value: boolean, path: unknown[] }) => true,
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
    const { children, open, parents, select } = useNested(props)
    const lineClasses = computed(() => props.lines ? `v-list--${props.lines}-line` : undefined)
    const activeColor = toRef(props, 'activeColor')
    const baseColor = toRef(props, 'baseColor')
    const color = toRef(props, 'color')

    createList()

    provideDefaults({
      VListGroup: {
        activeColor,
        baseColor,
        color,
        expandIcon: toRef(props, 'expandIcon'),
        collapseIcon: toRef(props, 'collapseIcon'),
      },
      VListItem: {
        activeClass: toRef(props, 'activeClass'),
        activeColor,
        baseColor,
        color,
        density: toRef(props, 'density'),
        disabled: toRef(props, 'disabled'),
        lines: toRef(props, 'lines'),
        nav: toRef(props, 'nav'),
        slim: toRef(props, 'slim'),
        variant: toRef(props, 'variant'),
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
      const target = e.target as HTMLElement

      if (!contentRef.value || ['INPUT', 'TEXTAREA'].includes(target.tagName)) return

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

    function onMousedown (e: MouseEvent) {
      isFocused.value = true
    }

    function focus (location?: 'next' | 'prev' | 'first' | 'last') {
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
          tabindex={ (props.disabled || isFocused.value) ? -1 : 0 }
          role="listbox"
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
    }
  },
})

export type VList = InstanceType<typeof VList>
