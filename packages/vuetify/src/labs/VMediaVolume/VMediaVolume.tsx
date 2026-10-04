// Styles
import './VMediaVolume.sass'

// Components
import { VIcon } from '@/components/VIcon/VIcon'
import { VIconBtn } from '@/components/VIconBtn/VIconBtn'
import { VMenu } from '@/components/VMenu/VMenu'
import { VSlider } from '@/components/VSlider/VSlider'

// Composables
import { makeComponentProps } from '@/composables/component'
import { useDisplay } from '@/composables/display'
import { useLocale, useRtl } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { canSetVolume, getVolumeIcon, useMute } from '@/labs/composables/media'

// Directives
import vTooltip from '@/directives/tooltip'

// Utilities
import { shallowRef, toRef } from 'vue'
import { EventProp, genericComponent, propsFactory, useRender } from '@/util'

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
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'vertical',
  },
  modelValue: {
    type: Number,
    default: 0,
  },
  volumeIcon: String,
  muteIcon: {
    type: String,
    default: '$volumeOff',
  },
  menuProps: Object as PropType<VMenu['$props']>,
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
    const { t } = useLocale()
    const { isRtl } = useRtl()
    const { platform } = useDisplay()
    const volume = useProxiedModel(props, 'modelValue')
    const dragging = shallowRef(false)
    const { toggleMuted } = useMute(volume, dragging)

    const icon = toRef(() => {
      if (volume.value <= 0) return props.muteIcon

      return props.volumeIcon ?? getVolumeIcon(volume.value)
    })

    const label = toRef(() => props.label ?? t(volume.value > 0 ? '$vuetify.media.mute' : '$vuetify.media.unmute'))

    const hideSlider = toRef(() => props.slider === 'hidden' || ((platform.value.ios || platform.value.mac) && !canSetVolume()))
    const isInline = toRef(() => !!props.inline)
    const isCollapsed = toRef(() => isInline.value && props.slider === 'hover')
    const hasMenu = toRef(() => !isInline.value && !hideSlider.value)
    const isSliderFirst = toRef(() => props.inline === (isRtl.value ? 'right' : 'left'))

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
      const sliderDefaults = {
        hideDetails: true,
        step: 5,
        thumbSize: 16,
        onStart: () => dragging.value = true,
        onEnd: () => dragging.value = false,
      }

      const inlineSlider = isInline.value && (
        <VSlider
          class="v-media-volume__slider"
          minWidth="50"
          aria-label={ t('$vuetify.media.volume') }
          modelValue={ volume.value }
          onUpdate:modelValue={ v => volume.value = v }
          onKeydown={ (e: KeyboardEvent) => { e.stopPropagation() } }
          { ...sliderDefaults }
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
          style={ props.style }
          ref={ containerRef }
        >
          { isSliderFirst.value && slider }

          <VIconBtn
            icon={ icon.value }
            aria-label={ label.value }
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
                    aria-label={ t('$vuetify.media.volume') }
                    modelValue={ volume.value }
                    onUpdate:modelValue={ v => volume.value = v }
                    { ...sliderDefaults }
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
  'direction' | 'inline' | 'sliderProps' | 'menuProps' | 'volumeIcon' | 'muteIcon'
>
