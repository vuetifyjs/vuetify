// Styles
import './VNavigationBtn.sass'

// Components
import { VBadge } from '@/components/VBadge/VBadge'
import { VBtnToggleSymbol } from '@/components/VBtnToggle/VBtnToggle'
import { VIcon } from '@/components/VIcon'

// Composables
import { useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { makeGroupItemProps, useGroupItem } from '@/composables/group'
import { IconValue } from '@/composables/icons'
import { useRtl } from '@/composables/locale'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeRouterProps, useLink } from '@/composables/router'
import { useSelectLink } from '@/composables/selectLink'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { computed, shallowRef, toRef } from 'vue'
import { genericComponent, isObject, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export type VNavigationBtnSlots = {
  default: never
  badge: never
  icon: { isActive: boolean }
}

const arrowSteps: Record<string, number> = {
  ArrowDown: 1,
  ArrowUp: -1,
  ArrowRight: 1,
  ArrowLeft: -1,
}

export const makeVNavigationBtnProps = propsFactory({
  active: {
    type: Boolean,
    default: undefined,
  },
  activeIcon: IconValue,
  badge: {
    type: [Boolean, Number, String, Object] as PropType<boolean | number | string | Record<string, any>>,
    default: false,
  },
  baseColor: String,
  color: String,
  icon: IconValue,
  labels: {
    type: String as PropType<'always' | 'selected' | 'none'>,
    default: 'always',
  },
  stacked: Boolean,
  text: [String, Number],

  ...makeComponentProps(),
  ...makeGroupItemProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeTagProps({ tag: 'button' }),
}, 'VNavigationBtn')

export const VNavigationBtn = genericComponent<VNavigationBtnSlots>()({
  name: 'VNavigationBtn',

  props: makeVNavigationBtnProps(),

  emits: {
    'group:selected': (val: { value: boolean }) => true,
  },

  setup (props, { attrs, slots }) {
    const { isRtl } = useRtl()
    const group = useGroupItem(props, VBtnToggleSymbol, false)
    const link = useLink(props, attrs)

    const isActive = computed(() => {
      if (props.active !== undefined) return props.active
      if (link.isRouterLink.value) return !!link.isActive?.value

      return !!group?.isSelected.value
    })
    const isDisabled = toRef(() => group?.disabled.value || props.disabled)

    const { roundedClasses, roundedStyles } = useRounded(props)
    const { textColorClasses, textColorStyles } = useTextColor(() => isActive.value ? props.color ?? props.baseColor : props.baseColor)

    const rootEl = shallowRef<HTMLElement>()

    const badgeProps = computed(() => {
      const badge: VBadge['$props'] = isObject(props.badge) ? props.badge : {
        content: props.badge === true || props.badge === false ? undefined : props.badge,
        modelValue: !!props.badge,
      }
      const dot = badge.dot ?? (!slots.badge && !badge.icon && (badge.content === undefined || badge.content === null))

      // VBadge places itself from dotSize and the offsets; these land it on the MD3 spots of a 24px icon.
      return {
        color: 'error',
        dotSize: dot ? 6 : undefined,
        offsetY: dot ? 0 : 2,
        ...badge,
        dot,
      }
    })

    function onClick (e: MouseEvent) {
      if (isDisabled.value) {
        e.preventDefault()
        return
      }

      if (
        link.isLink.value && (
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          (e.button !== 0) ||
          attrs.target === '_blank'
        )
      ) return

      if (link.isRouterLink.value) {
        link.navigate.value?.(e)
      } else {
        group?.toggle()
      }
    }

    function onKeydown (e: KeyboardEvent) {
      let step = arrowSteps[e.key]
      const parent = rootEl.value?.parentElement
      if (!step || !parent || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
      if (isRtl.value && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) step = -step

      const siblings = Array.from(parent.children)
        .filter(el => el.classList.contains('v-navigation-btn') && !el.classList.contains('v-navigation-btn--disabled')) as HTMLElement[]
      const index = siblings.indexOf(rootEl.value!)
      if (index < 0) return

      e.preventDefault()
      siblings.at((index + step) % siblings.length)?.focus()
    }

    useSelectLink(link, group?.select)

    useRender(() => {
      const Tag = link.isLink.value ? 'a' : props.tag
      const icon = isActive.value ? props.activeIcon ?? props.icon : props.icon
      const hasText = props.text != null || !!slots.default
      const iconContent = slots.icon?.({ isActive: isActive.value }) ?? (icon && <VIcon icon={ icon } />)

      return (
        <Tag
          ref={ rootEl }
          { ...link.linkProps }
          type={ Tag === 'button' ? 'button' : undefined }
          class={[
            'v-navigation-btn',
            group?.selectedClass.value,
            {
              'v-navigation-btn--active': isActive.value,
              'v-navigation-btn--disabled': isDisabled.value,
              'v-navigation-btn--stacked': props.stacked,
              'v-navigation-btn--labels-selected': props.labels === 'selected',
              'v-navigation-btn--labels-none': props.labels === 'none',
            },
            textColorClasses.value,
            props.class,
          ]}
          style={[
            textColorStyles.value,
            props.style,
          ]}
          aria-current={ isActive.value ? 'page' : undefined }
          disabled={ (isDisabled.value && Tag !== 'a') || undefined }
          aria-disabled={ (isDisabled.value && Tag === 'a') || undefined }
          tabindex={ isDisabled.value && Tag === 'a' ? -1 : undefined }
          onClick={ onClick }
          onKeydown={ onKeydown }
        >
          <span key="pill" class="v-navigation-btn__pill">
            <span
              class={['v-navigation-btn__indicator', roundedClasses.value]}
              style={ roundedStyles.value }
            />

            <span class="v-navigation-btn__icon">
              { props.badge !== false ? (
                <VBadge
                  { ...badgeProps.value }
                  v-slots={{
                    default: () => iconContent,
                    badge: slots.badge,
                  }}
                />
              ) : iconContent }
            </span>

            { hasText && (
              <span key="text" class="v-navigation-btn__text">{ slots.default?.() ?? props.text }</span>
            )}

            <span
              class={['v-navigation-btn__overlay', roundedClasses.value]}
              style={ roundedStyles.value }
            />
          </span>

          { hasText && (
            <span key="label" class="v-navigation-btn__label" aria-hidden="true">
              { slots.default?.() ?? props.text }
            </span>
          )}
        </Tag>
      )
    })

    return { group }
  },
})

export type VNavigationBtn = InstanceType<typeof VNavigationBtn>
