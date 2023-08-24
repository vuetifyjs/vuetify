// Styles
import './VTreeview.sass'

//Components
import { VTreeviewChildren } from "./VTreeviewChildren"

// Composables
import { createList } from '@/components/VList/list'
import { useBorder } from '@/composables/border'
import { useBackgroundColor } from '@/composables/color'
import { provideDefaults } from '@/composables/defaults'
import { useDensity } from '@/composables/density'
import { useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeFilterProps, useFilter } from '@/composables/filter'
import { makeItemsProps } from '@/composables/list-items'
import { makeNestedProps, useNested } from '@/composables/nested/nested'
import { useRounded } from '@/composables/rounded'
import { provideTheme } from '@/composables/theme'
import { makeVTreeviewItemProps } from './VTreeviewItem'

// Utilities
import { computed, onMounted, provide, ref, shallowRef, toRef } from 'vue'
import { focusChild, genericComponent, getPropertyFromItem, pick, propsFactory, useRender } from '@/util'

// Types
import { VTreeviewChildrenSlots } from "./VTreeviewChildren"
import type { ItemProps, ListItem } from '@/composables/list-items'
import type { GenericProps } from '@/util'
import type { ComputedRef, InjectionKey, PropType } from 'vue'

export interface InternalListItem<T = any> extends ListItem<T> {
  disabled?: true | false
}

export interface TreeviewProvide {
  visibleIds: ComputedRef<Set<unknown> | null>
}

export const VTreeviewSymbol: InjectionKey<TreeviewProvide> = Symbol.for('vuetify:v-treeview')

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

function flatten (items: ListItem[], flat: ListItem[] = []) {
  for (const item of items) {
    flat.push(item)

    if (item.children) flatten (item.children, flat)
  }

  return flat
}

export const makeVTreeviewProps = propsFactory({
  bgColor: String,
  itemDisabled: {
    type: String,
    default: 'disabled',
  },
  openOnMount: {
    type: String as PropType<'all' | 'root' | undefined>,
    validator: (v: any) => !v || ['all', 'root'].includes(v),
  },
  search: String,
  ...makeNestedProps({
    selectStrategy: 'classic' as const,
    openStrategy: 'single' as const,
  }),
  ...makeElevationProps(),
  ...makeFilterProps({ filterKeys: ['title'] }),
  ...makeItemsProps(),
  ...makeVTreeviewItemProps()
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
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'bgColor'))
    const { borderClasses } = useBorder(props)
    const { densityClasses } = useDensity(props)
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { getChildren, getPath, open, select, parents} = useNested(props)
    const { roundedClasses } = useRounded(props)
    const { themeClasses } = provideTheme(props)

    const baseColor = toRef(props, 'baseColor')
    const color = toRef(props, 'color')
    const selectedColor = toRef(props, 'selectedColor')

    const { items } = useListItems(props)
    const flatItems = computed(() => flatten(items.value))

    const search = toRef(props, 'search')
    const { filteredItems } = useFilter(props, flatItems, search)

    const visibleIds = computed(() => {
      if (!search) {
        return null
      }
      return new Set(filteredItems.value.flatMap((item) => {
        return [...getPath(item.props.value), ...getChildren(item.props.value)]
      }))
    })

    provide(VTreeviewSymbol, {visibleIds : visibleIds})

    createList()

    onMounted(() => {
      if (props.openOnMount === 'root') {
        parents.value.forEach(parent => {
          if (!parents.value.has(parent)) {
            open(parent, true)
          }
        })
      } else if (props.openOnMount === 'all') {
        parents.value.forEach(parent => {
          open(parent, true)
        })
      }
    })

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
