// Styles
import './VBreadcrumbs.sass'

// Components
import { VBreadcrumbsDivider } from './VBreadcrumbsDivider'
import { VBreadcrumbsItem } from './VBreadcrumbsItem'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'
import { VList, VListItem } from '@/components/VList'
import { VMenu } from '@/components/VMenu'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'
import { makeDensityProps, useDensity } from '@/composables/density'
import { IconValue } from '@/composables/icons'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { computed, shallowRef, toRef, watch } from 'vue'
import { clamp, genericComponent, noop, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { LinkProps } from '@/composables/router'
import type { GenericProps } from '@/util'

export type InternalBreadcrumbItem = Partial<LinkProps> & {
  title: string
  disabled?: boolean
  ellipsis?: boolean
}

export type BreadcrumbItem = string | InternalBreadcrumbItem

export const makeVBreadcrumbsProps = propsFactory({
  activeClass: String,
  activeColor: String,
  bgColor: String,
  collapseInMenu: Boolean,
  collapseFrom: {
    type: Number,
    default: 0,
  },
  color: String,
  disabled: Boolean,
  divider: {
    type: String,
    default: '/',
  },
  ellipsis: {
    type: String,
    default: '...',
  },
  icon: IconValue,
  items: {
    type: Array as PropType<readonly BreadcrumbItem[]>,
    default: () => ([]),
  },
  listProps: Object as PropType<VList['$props']>,
  menuProps: Object as PropType<VMenu['$props']>,
  totalVisible: [Number, String],

  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeRoundedProps(),
  ...makeTagProps({ tag: 'nav' }),
}, 'VBreadcrumbs')

export const VBreadcrumbs = genericComponent<new <T extends BreadcrumbItem>(
  props: {
    items?: T[]
  },
  slots: {
    prepend: never
    title: { item: InternalBreadcrumbItem, index: number }
    divider: { item: T, index: number }
    item: { item: InternalBreadcrumbItem, index: number }
    'list-item': { item: InternalBreadcrumbItem, index: number, isCurrentPage: boolean }
    default: never
  }
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VBreadcrumbs',

  props: makeVBreadcrumbsProps(),

  setup (props, { slots }) {
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(() => props.bgColor)
    const { densityClasses } = useDensity(props)
    const { roundedClasses } = useRounded(props)

    provideDefaults({
      VBreadcrumbsDivider: {
        divider: toRef(() => props.divider),
      },
      VBreadcrumbsItem: {
        activeClass: toRef(() => props.activeClass),
        activeColor: toRef(() => props.activeColor),
        color: toRef(() => props.color),
        disabled: toRef(() => props.disabled),
      },
    })

    const totalVisible = computed(() => {
      return props.totalVisible != null
        ? parseInt(props.totalVisible, 10)
        : Number.MAX_SAFE_INTEGER
    })

    const items = computed(() => props.items
      .map(item =>
        typeof item === 'string'
          ? { item: { title: item } as InternalBreadcrumbItem, raw: item }
          : { item, raw: item }
      )
    )

    const ellipsisEnabled = toRef(() => items.value.length > totalVisible.value)
    const collapsed = shallowRef(ellipsisEnabled.value)
    const menu = shallowRef(false)

    const collapseStartIndex = toRef(() => clamp(props.collapseFrom, 0, totalVisible.value))
    const collapsedItemsCount = toRef(() => collapsed.value
      ? clamp(items.value.length - totalVisible.value, 0, items.value.length - collapseStartIndex.value)
      : 0
    )

    const menuItems = computed(() => collapsedItemsCount.value
      ? items.value.slice(collapseStartIndex.value, collapseStartIndex.value + collapsedItemsCount.value)
      : []
    )

    const visibleItems = computed(() => collapsedItemsCount.value
      ? [
        ...items.value.slice(0, collapseStartIndex.value),
        { item: { title: props.ellipsis, ellipsis: true }, raw: '' },
        ...items.value.slice(collapseStartIndex.value + collapsedItemsCount.value),
      ]
      : items.value
    )

    function collapse () {
      collapsed.value = ellipsisEnabled.value
      menu.value = false
    }

    function onClickEllipsis () {
      if (props.collapseInMenu) {
        menu.value = true
      } else {
        collapsed.value = false
      }
    }

    watch(ellipsisEnabled, collapse)

    const ellipsisItem = () => (
      <VBreadcrumbsItem
        tabindex="0"
        onClick={ props.collapseInMenu ? noop : onClickEllipsis }
        onKeydown={ (e: KeyboardEvent) => { ['Enter', ' '].includes(e.key) && onClickEllipsis() } }
        class="v-breadcrumbs-item--ellipsis"
        role="button"
        aria-haspopup={ props.collapseInMenu ? 'menu' : undefined }
        aria-expanded={ !collapsed.value || menu.value }
        aria-label="show more breadcrumb items"
      >
        { props.ellipsis }

        { props.collapseInMenu ? (
          <VMenu
            activator="parent"
            v-model={ menu.value }
            role="menu"
            aria-label="hidden breadcrumb items"
            { ...props.menuProps }
          >
            {{
              default: () => (
                <VList { ...props.listProps }>
                  { menuItems.value.map(({ item }, index) => {
                    const hasTrailingItems = collapseStartIndex.value + collapsedItemsCount.value < items.value.length
                    const isCurrentPage = !hasTrailingItems && index === menuItems.value.length - 1
                    return slots['list-item']?.({ item, index, isCurrentPage }) ?? (
                      <VListItem
                        key={ index }
                        value={ index }
                        active={ isCurrentPage }
                        aria-current={ isCurrentPage ? 'page' : undefined }
                        disabled={ isCurrentPage }
                        href={ 'href' in item ? item.href : undefined }
                        title={ item.title }
                        role="menuitem"
                      />
                    )
                  })}
                </VList>
              ),
            }}
          </VMenu>
        ) : null }
      </VBreadcrumbsItem>
    )

    useRender(() => {
      const hasPrepend = !!(slots.prepend || props.icon)

      return (
        <props.tag
          aria-label="breadcrumbs"
          class={[
            'v-breadcrumbs',
            backgroundColorClasses.value,
            densityClasses.value,
            roundedClasses.value,
            props.class,
          ]}
          style={[
            backgroundColorStyles.value,
            props.style,
          ]}
        >
          <ol>
          { hasPrepend && (
            <li key="prepend" class="v-breadcrumbs__prepend">
              { !slots.prepend ? (
                <VIcon
                  key="prepend-icon"
                  start
                  icon={ props.icon }
                />
              ) : (
                <VDefaultsProvider
                  key="prepend-defaults"
                  disabled={ !props.icon }
                  defaults={{
                    VIcon: {
                      icon: props.icon,
                      start: true,
                    },
                  }}
                  v-slots:default={ slots.prepend }
                />
              )}
            </li>
          )}

          { visibleItems.value.map(({ item, raw }, index, array) => (
            <>
              { item.ellipsis
                ? ellipsisItem()
                : slots.item?.({ item, index }) ?? (
                  <VBreadcrumbsItem
                    key={ index }
                    disabled={ index >= array.length - 1 }
                    active={ index === array.length - 1 }
                    { ...(typeof item === 'string' ? { title: item } : item) }
                    v-slots={{
                      default: slots.title ? () => slots.title?.({ item, index }) : undefined,
                    }}
                  />
                )
              }

              { index < array.length - 1 && (
                <VBreadcrumbsDivider
                  v-slots={{
                    default: slots.divider ? () => slots.divider?.({ item: raw, index }) : undefined,
                  }}
                />
              )}
            </>
          ))}

          { slots.default?.() }
          </ol>
        </props.tag>
      )
    })

    return {
      collapse,
    }
  },
})

export type VBreadcrumbs = InstanceType<typeof VBreadcrumbs>
