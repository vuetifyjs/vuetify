// Components
import { VIcon } from '@/components/VIcon/VIcon'
import { VMenu } from '@/components/VMenu/VMenu'
import { VSlider } from '@/components/VSlider/VSlider'
import { VIconBtn } from '@/labs/VIconBtn/VIconBtn'

// Composables
import { makeComponentProps } from '@/composables/component'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { ref, toRef } from 'vue'
import { EventProp, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export const makeVVideoVolumeProps = propsFactory({
  inline: Boolean,
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'vertical',
  },
  modelValue: {
    type: Number,
    default: 0,
  },
  menuProps: Object as PropType<VMenu['$props']>,
  sliderProps: Object as PropType<Pick<VSlider['$props'], 'color' | 'disabled' | 'thumbSize' | 'trackColor' | 'maxWidth' | 'width'>>,
  onClick: EventProp<[MouseEvent | KeyboardEvent]>(),

  ...makeComponentProps(),
}, 'VVideoVolume')

export const VVideoVolume = genericComponent()({
  name: 'VVideoVolume',

  props: makeVVideoVolumeProps(),

  emits: {
    'update:modelValue': (val: number) => true,
  },

  setup (props, { attrs }) {
    const volume = useProxiedModel(props, 'modelValue')

    const volumeIcon = toRef(() => volume.value > 70 ? '$volumeHigh'
      : volume.value > 40 ? '$volumeMedium'
      : volume.value > 10 ? '$volumeLow'
      : '$volumeOff')

    const containerRef = ref<HTMLElement>()

    useRender(() => {
      const sliderDefaults = {
        hideDetails: true,
        step: 5,
        thumbSize: 16,
      }

      return (
        <div
          class={[
            'v-video-volume',
            { 'v-video-volume--inline': props.inline },
            props.class,
          ]}
          style={ props.style }
          ref={ containerRef }
        >
            <VIconBtn
              icon={ volumeIcon.value }
              onClick={ props.onClick as any }
              { ...attrs }
            >
              <VIcon />
              { !props.inline && (
                <VMenu
                  offset="8"
                  activator="parent"
                  attach={ containerRef.value }
                  location={ props.menuProps?.location ?? 'top center' }
                  closeOnContentClick={ false }
                >
                  <div
                    class={[
                      'v-video-volume__menu',
                      `v-video-volume__menu--${props.direction}`,
                    ]}
                  >
                    <VSlider
                      direction={ props.direction }
                      modelValue={ volume.value }
                      onUpdate:modelValue={ v => volume.value = v }
                      { ...sliderDefaults }
                      { ...props.sliderProps }
                    />
                  </div>
                </VMenu>
              )}
            </VIconBtn>

            { props.inline && (
              <VSlider
                class="v-video-volume-inline__slider"
                minWidth="50"
                modelValue={ volume.value }
                onUpdate:modelValue={ v => volume.value = v }
                onKeydown={ (e: KeyboardEvent) => { e.stopPropagation() } }
                { ...sliderDefaults }
                { ...props.sliderProps }
              />
            )}
        </div>
      )
    })
  },
})

export type VVideoVolume = InstanceType<typeof VVideoVolume>
