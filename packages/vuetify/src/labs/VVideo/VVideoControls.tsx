// Components
import { VDefaultsProvider } from '@/components/VDefaultsProvider/VDefaultsProvider'
import { VSpacer } from '@/components/VGrid/VSpacer'
import { VIcon } from '@/components/VIcon/VIcon'
import { VMenu } from '@/components/VMenu/VMenu'
import { VSheet } from '@/components/VSheet/VSheet'
import { VSlider } from '@/components/VSlider/VSlider'
import { VIconBtn } from '@/labs/VIconBtn/VIconBtn'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { computed, ref } from 'vue'
import { formatTime, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType, Ref } from 'vue'

export type VVideoControlsDefaultSlot = {
  play: () => void
  pause: () => void
  skipTo: (v: number) => void
  volume: Ref<number>
  toggleFullscreen: () => void
}

export type VVideoControlsAppendSlot = {
  // ? sources: Array<{ quality }>
  toggleFullscreen: () => void
}

export type VVideoControlsSlots = {
  default: VVideoControlsDefaultSlot
  append: VVideoControlsAppendSlot
}

const allowedControlVariants = ['hidden', 'default', 'split', 'tube', 'floating'] as const
type ControlVariant = typeof allowedControlVariants[number]

export const makeVVideoControlsProps = propsFactory({
  color: String,
  backgroundColor: String,
  trackColor: String,
  // disabled: Boolean,
  playing: Boolean,
  hidePlay: Boolean,
  hideVolume: Boolean,
  progress: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 0,
  },
  volume: {
    type: Number,
    default: 0,
  },
  controlVariant: {
    type: String as PropType<ControlVariant>,
    default: 'default',
    validator: (v: any) => allowedControlVariants.includes(v),
  },
  ...makeElevationProps({ elevation: 4 }),
  ...makeThemeProps(),
}, 'VVideoControls')

export const VVideoControls = genericComponent<VVideoControlsSlots>()({
  name: 'VVideoControls',

  props: makeVVideoControlsProps(),

  emits: {
    'update:playing': (val: boolean) => true,
    'update:progress': (val: number) => true,
    'update:volume': (val: number) => true,
    skip: (val: number) => true,
    'click:fullscreen': () => true,
  },

  setup (props, { emit, slots }) {
    const { themeClasses } = provideTheme(props)
    const { elevationClasses } = useElevation(props)

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(() => {
      const fallbackBackground = props.controlVariant === 'floating' ? 'surface' : undefined
      return props.backgroundColor ?? fallbackBackground
    })

    const isPlaying = useProxiedModel(props, 'playing')
    const progress = useProxiedModel(props, 'progress')
    const volume = useProxiedModel(props, 'volume')

    const progressText = computed(() => {
      const secondsElapsed = Math.round(props.progress / 100 * props.duration)
      return {
        elapsed: formatTime(secondsElapsed),
        remaining: formatTime(props.duration - secondsElapsed),
        total: formatTime(props.duration),
      }
    })

    function play () {
      isPlaying.value = true
    }

    function pause () {
      isPlaying.value = false
    }

    function skipTo (v: number) {
      progress.value = v
    }

    function toggleFullscreen () {
      emit('click:fullscreen')
    }

    useRender(() => {
      const actionIconsDefaults = { VIconBtn: { size: 28, iconSize: 20, variant: 'text' } }

      return (
        <div
          class={[
            'v-video__controls',
            `v-video__controls--variant-${props.controlVariant}`,
            backgroundColorClasses.value,
            elevationClasses.value,
            themeClasses.value,
          ]}
          style={[
            backgroundColorStyles.value,
          ]}
        >
          <VDefaultsProvider defaults={ actionIconsDefaults }>
            { slots.default?.({ play, pause, skipTo, volume, toggleFullscreen }) ?? (
              <>
                { !props.hidePlay && (
                  <VIconBtn
                    icon={ isPlaying.value ? 'mdi-pause' : 'mdi-play' }
                    color={ props.color }
                    onClick={ () => isPlaying.value = !isPlaying.value }
                  />
                )}
                { props.controlVariant === 'split'
                  ? <span class="v-video__time">{ progressText.value.elapsed }</span>
                  : props.controlVariant !== 'default'
                    ? <span class="v-video__time">{ progressText.value.elapsed } / { progressText.value.total }</span>
                    : ''
                }
                <VSlider
                  modelValue={ props.progress }
                  hideDetails
                  thumbSize={ props.controlVariant === 'tube' ? 8 : 12 }
                  color={ props.trackColor ?? props.color }
                  trackColor={ props.controlVariant === 'tube' ? 'white' : undefined }
                  class="v-video__track"
                  onUpdate:modelValue={ skipTo }
                />
                { props.controlVariant === 'tube' && <VSpacer /> }
                { props.controlVariant === 'split'
                  ? <span class="v-video__time">{ progressText.value.remaining }</span>
                  : ''
                }
                { !props.hideVolume && (
                  <VIconBtn icon="mdi-volume-high" color={ props.color }>
                    <VIcon />
                    <VMenu
                      offset="8"
                      activator="parent"
                      location="top center"
                      contentClass="v-video__volume-menu"
                      close-on-content-click={ false }
                    >
                      <VSheet
                        class="pa-2 overflow-hidden"
                        height="124"
                        color="surface-variant"
                      >
                        <VSlider
                          direction="vertical"
                          hide-details
                          color={ props.color ?? 'surface' }
                          style="height: 100px"
                          class="my-1"
                          thumb-size="10"
                          modelValue={ volume.value }
                          onUpdate:modelValue={ v => volume.value = v }
                        />
                      </VSheet>
                    </VMenu>
                  </VIconBtn>
                )}
                { slots.append?.({ toggleFullscreen }) }
              </>
            )}
          </VDefaultsProvider>
        </div>
      )
    })
  },
})

export type VVideoControls = InstanceType<typeof VVideoControls>
