// Styles
import './VMediaVolume.sass'

// Components
import { VIcon } from '@/components/VIcon/VIcon'
import { VIconBtn } from '@/components/VIconBtn/VIconBtn'
import { VMenu } from '@/components/VMenu/VMenu'
import { VSlider } from '@/components/VSlider/VSlider'

// Composables
import { makeComponentProps } from '@/composables/component'
import { injectNestedDefaults } from '@/composables/defaults'
import { LocaleSymbol, useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { canSetVolume, getVolumeIcon, useMute } from '@/labs/composables/media'

// Directives
import vTooltip from '@/directives/tooltip'

// Utilities
import { provide, shallowRef, toRef } from 'vue'
import { convertToUnit, EventProp, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export type VMediaVolumeSlider = 'visible' | 'hover' | 'hidden'

export const makeVMediaVolumeProps = propsFactory({
  inline: [Boolean, String] as PropType<boolean | 'left' | 'right'>,
  slider: {
    type: String as PropType<VMediaVolumeSlider>,
    default: 'visible',
  },
  label: String,
  disabled: Boolean,
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'vertical',
  },
  modelValue: {
    type: Number,
    default: 0,
  },
  menuProps: Object as PropType<Pick<VMenu['$props'],
    'location' | 'offset' | 'openOnHover' | 'openDelay' | 'closeDelay' | 'contentClass' | 'zIndex'
  >>,
  sliderProps: Object as PropType<Pick<VSlider['$props'],
    'color' | 'disabled' | 'step' | 'thumbSize' | 'trackSize' | 'trackColor' | 'maxWidth' | 'width'
  >>,
  onClick: EventProp<[MouseEvent | KeyboardEvent]>(),

  ...makeComponentProps(),
}, 'VMediaVolume')

export const VMediaVolume = genericComponent()({
  name: 'VMediaVolume',

  directives: { vTooltip: vTooltip as any },

  inheritAttrs: false,

  props: makeVMediaVolumeProps(),

  emits: {
    'update:modelValue': (value: number) => true,
  },

  setup (props, { attrs }) {
    const locale = useLocale()
    const { t } = locale
    // VSlider mirrors from the injected locale, not from CSS direction
    provide(LocaleSymbol, { ...locale, isRtl: shallowRef(false), rtlClasses: shallowRef('v-locale--is-ltr') })
    const volume = useProxiedModel(props, 'modelValue')
    const dragging = shallowRef(false)
    const nestedSliderDefaults = injectNestedDefaults<VSlider['$props']>('VSlider')
    const { toggleMuted } = useMute(volume, dragging)

    const label = toRef(() => props.label ?? t(volume.value > 0 ? '$vuetify.media.mute' : '$vuetify.media.unmute'))

    const hideSlider = toRef(() => props.slider === 'hidden' || !canSetVolume())
    const isInline = toRef(() => !!props.inline)
    const isCollapsed = toRef(() => isInline.value && props.slider === 'hover')
    const hasMenu = toRef(() => !isInline.value && !hideSlider.value)
    const isSliderFirst = toRef(() => props.inline === 'left')

    const containerRef = shallowRef<HTMLElement>()
    const menu = shallowRef(false)

    let pointerType = ''

    function onClick (e: MouseEvent | KeyboardEvent) {
      if (hasMenu.value && pointerType === 'touch') {
        menu.value = !menu.value
      } else {
        toggleMuted()
      }
      props.onClick?.(e)
    }

    useRender(() => {
      const commonSliderProps = {
        'aria-label': t('$vuetify.media.volume'),
        modelValue: volume.value,
        'onUpdate:modelValue': (value: number) => volume.value = value,
        hideDetails: true,
        step: nestedSliderDefaults.value?.step ?? 5,
        thumbSize: nestedSliderDefaults.value?.thumbSize ?? 16,
        onStart: () => dragging.value = true,
        onEnd: () => dragging.value = false,
        onKeydown: (e: KeyboardEvent) => e.stopPropagation(),
      }

      const inlineSlider = isInline.value && (
        <VSlider
          class="v-media-volume__slider"
          minWidth="50"
          disabled={ props.disabled }
          { ...commonSliderProps }
          { ...props.sliderProps }
        />
      )

      const slider = !hideSlider.value && (isCollapsed.value ? (
        <div key="slider" class="v-media-volume__expand">
          <div>{ inlineSlider }</div>
        </div>
      ) : inlineSlider)

      return (
        <div
          class={[
            'v-media-volume',
            {
              'v-media-volume--inline': isInline.value,
              'v-media-volume--collapsed': isCollapsed.value,
            },
            props.class,
          ]}
          style={[
            { '--v-media-volume-thumb-size': convertToUnit(props.sliderProps?.thumbSize ?? commonSliderProps.thumbSize) },
            props.style,
          ]}
          ref={ containerRef }
        >
          { isSliderFirst.value && slider }

          <VIconBtn
            icon={ getVolumeIcon(volume.value) }
            aria-label={ label.value }
            disabled={ props.disabled }
            v-tooltip={[{
              text: props.label,
              location: 'top',
              disabled: !props.label || hasMenu.value,
            }]}
            onPointerdown={ (e: PointerEvent) => pointerType = e.pointerType }
            onClick={ onClick }
            { ...attrs }
          >
            <VIcon />
            { hasMenu.value && (
              <VMenu
                v-model={ menu.value }
                activator="parent"
                attach={ containerRef.value }
                closeOnContentClick={ false }
                location="top center"
                offset="8"
                openOnHover
                disabled={ props.disabled }
                { ...props.menuProps }
              >
                <div
                  class={[
                    'v-media-volume__menu',
                    `v-media-volume__menu--${props.direction}`,
                  ]}
                >
                  <VSlider
                    direction={ props.direction }
                    { ...commonSliderProps }
                    { ...props.sliderProps }
                  />
                </div>
              </VMenu>
            )}
          </VIconBtn>

          { !isSliderFirst.value && slider }
        </div>
      )
    })

    return { toggleMuted }
  },
})

export type VMediaVolume = InstanceType<typeof VMediaVolume>

export type VMediaVolumeOptions = Pick<VMediaVolume['$props'],
  'direction' | 'inline' | 'sliderProps' | 'menuProps'
>
