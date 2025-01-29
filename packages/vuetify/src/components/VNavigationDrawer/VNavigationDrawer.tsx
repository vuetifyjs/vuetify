// Styles
import './VNavigationDrawer.sass'

// Components
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VImg } from '@/components/VImg'

// Composables
import { useSticky } from './sticky'
import { useTouch } from './touch'
import { useRtl } from '@/composables'
import { makeBorderProps, useBorder } from '@/composables/border'
import { useBackgroundColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'
import { makeDelayProps, useDelay } from '@/composables/delay'
import { makeDisplayProps, useDisplay } from '@/composables/display'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { useRouter } from '@/composables/router'
import { useScopeId } from '@/composables/scopeId'
import { useSsrBoot } from '@/composables/ssrBoot'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useToggleScope } from '@/composables/toggleScope'

// Utilities
import { computed, nextTick, ref, shallowRef, toRef, Transition, watch } from 'vue'
import { genericComponent, propsFactory, toPhysical, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export type VNavigationDrawerImageSlot = {
  image: string | undefined
}

export type VNavigationDrawerSlots = {
  default: never
  prepend: never
  append: never
  image: VNavigationDrawerImageSlot
}

const locations = ['start', 'end', 'left', 'right', 'top', 'bottom'] as const

export const makeVNavigationDrawerProps = propsFactory({
  color: String,
  disableResizeWatcher: Boolean,
  disableRouteWatcher: Boolean,
  expandOnHover: Boolean,
  floating: Boolean,
  modelValue: {
    type: Boolean as PropType<boolean | null>,
    default: null,
  },
  permanent: Boolean,
  rail: {
    type: Boolean as PropType<boolean | null>,
    default: null,
  },
  railWidth: {
    type: [Number, String],
    default: 56,
  },
  scrim: {
    type: [Boolean, String],
    default: true,
  },
  image: String,
  temporary: Boolean,
  persistent: Boolean,
  touchless: Boolean,
  width: {
    type: [Number, String],
    default: 256,
  },
  location: {
    type: String as PropType<typeof locations[number]>,
    default: 'start',
    validator: (value: any) => locations.includes(value),
  },
  sticky: Boolean,

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDelayProps(),
  ...makeDisplayProps({ mobile: null }),
  ...makeElevationProps(),
  ...makeLayoutItemProps(),
  ...makeRoundedProps(),
  ...makeTagProps({ tag: 'nav' }),
  ...makeThemeProps(),
}, 'VNavigationDrawer')

export const VNavigationDrawer = genericComponent<VNavigationDrawerSlots>()({
  name: 'VNavigationDrawer',

  props: makeVNavigationDrawerProps(),

  emits: {
    'update:modelValue': (val: boolean) => true,
    'update:rail': (val: boolean) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const { isRtl } = useRtl()
    const { themeClasses } = provideTheme(props)
    const { borderClasses } = useBorder(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const { elevationClasses } = useElevation(props)
    const { displayClasses, mobile } = useDisplay(props)
    const { roundedClasses } = useRounded(props)
    const router = useRouter()
    const isActive = useProxiedModel(props, 'modelValue', null, v => !!v)
    const { ssrBootStyles } = useSsrBoot()
    const { scopeId } = useScopeId()

    const rootEl = ref<HTMLElement>()
    const isHovering = shallowRef(false)

    const { runOpenDelay, runCloseDelay } = useDelay(props, value => {
      isHovering.value = value
    })

    const width = computed(() => {
      return (props.rail && props.expandOnHover && isHovering.value)
        ? Number(props.width)
        : Number(props.rail ? props.railWidth : props.width)
    })
    const location = computed(() => {
      return toPhysical(props.location, isRtl.value) as 'left' | 'right' | 'bottom'
    })
    const isPersistent = computed(() => props.persistent)
    const isTemporary = computed(() => !props.permanent && (mobile.value || props.temporary))
    const isSticky = computed(() =>
      props.sticky &&
      !isTemporary.value &&
      location.value !== 'bottom'
    )

    useToggleScope(() => props.expandOnHover && props.rail != null, () => {
      watch(isHovering, val => emit('update:rail', !val))
    })

    useToggleScope(() => !props.disableResizeWatcher, () => {
      watch(isTemporary, val => !props.permanent && (nextTick(() => isActive.value = !val)))
    })

    useToggleScope(() => !props.disableRouteWatcher && !!router, () => {
      watch(router!.currentRoute, () => isTemporary.value && (isActive.value = false))
    })

    watch(() => props.permanent, val => {
      if (val) isActive.value = true
    })

    if (props.modelValue == null && !isTemporary.value) {
      isActive.value = props.permanent || !mobile.value
    }

    const { isDragging, dragProgress } = useTouch({
      el: rootEl,
      isActive,
      isTemporary,
      width,
      touchless: toRef(props, 'touchless'),
      position: location,
    })

    const layoutSize = computed(() => {
      const size = isTemporary.value ? 0
        : props.rail && props.expandOnHover ? Number(props.railWidth)
        : width.value

      return isDragging.value ? size * dragProgress.value : size
    })
    const elementSize = computed(() => ['top', 'bottom'].includes(props.location) ? 0 : width.value)
    const { layoutItemStyles, layoutItemScrimStyles } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: location,
      layoutSize,
      elementSize,
      active: computed(() => isActive.value || isDragging.value),
      disableTransitions: computed(() => isDragging.value),
      absolute: computed(() =>
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        props.absolute || (isSticky.value && typeof isStuck.value !== 'string')
      ),
    })

    const { isStuck, stickyStyles } = useSticky({ rootEl, isSticky, layoutItemStyles })

    const scrimColor = useBackgroundColor(computed(() => {
      return typeof props.scrim === 'string' ? props.scrim : null
    }))
    const scrimStyles = computed(() => ({
      ...isDragging.value ? {
        opacity: dragProgress.value * 0.2,
        transition: 'none',
      } : undefined,
      ...layoutItemScrimStyles.value,
    }))

    provideDefaults({
      VList: {
        bgColor: 'transparent',
      },
    })

    useRender(() => {
      const hasImage = (slots.image || props.image)

      return (
        <>
          <props.tag
            ref={ rootEl }
            onMouseenter={ runOpenDelay }
            onMouseleave={ runCloseDelay }
            class={[
              'v-navigation-drawer',
              `v-navigation-drawer--${location.value}`,
              {
                'v-navigation-drawer--expand-on-hover': props.expandOnHover,
                'v-navigation-drawer--floating': props.floating,
                'v-navigation-drawer--is-hovering': isHovering.value,
                'v-navigation-drawer--rail': props.rail,
                'v-navigation-drawer--temporary': isTemporary.value,
                'v-navigation-drawer--persistent': isPersistent.value,
                'v-navigation-drawer--active': isActive.value,
                'v-navigation-drawer--sticky': isSticky.value,
              },
              themeClasses.value,
              backgroundColorClasses.value,
              borderClasses.value,
              displayClasses.value,
              elevationClasses.value,
              roundedClasses.value,
              props.class,
            ]}
            style={[
              backgroundColorStyles.value,
              layoutItemStyles.value,
              ssrBootStyles.value,
              stickyStyles.value,
              props.style,
              ['top', 'bottom'].includes(location.value) ? { height: 'auto' } : {},
            ]}
            { ...scopeId }
            { ...attrs }
          >
            { hasImage && (
              <div key="image" class="v-navigation-drawer__img">
                { !slots.image ? (
                  <VImg
                    key="image-img"
                    alt=""
                    cover
                    height="inherit"
                    src={ props.image }
                  />
                ) : (
                  <VDefaultsProvider
                    key="image-defaults"
                    disabled={ !props.image }
                    defaults={{
                      VImg: {
                        alt: '',
                        cover: true,
                        height: 'inherit',
                        src: props.image,
                      },
                    }}
                    v-slots:default={ slots.image }
                  />
                )}
              </div>
            )}

            { slots.prepend && (
              <div class="v-navigation-drawer__prepend">
                { slots.prepend?.() }
              </div>
            )}

            <div class="v-navigation-drawer__content">
              { slots.default?.() }
            </div>

            { slots.append && (
              <div class="v-navigation-drawer__append">
                { slots.append?.() }
              </div>
            )}
          </props.tag>

          <Transition name="fade-transition">
            { isTemporary.value && (isDragging.value || isActive.value) && !!props.scrim && (
              <div
                class={['v-navigation-drawer__scrim', scrimColor.backgroundColorClasses.value]}
                style={[scrimStyles.value, scrimColor.backgroundColorStyles.value]}
                onClick={ () => {
                  if (isPersistent.value) return
                  isActive.value = false
                }}
                { ...scopeId }
              />
            )}
          </Transition>
        </>
      )
    })

    return {
      isStuck,
    }
  },
})

export type VNavigationDrawer = InstanceType<typeof VNavigationDrawer>
