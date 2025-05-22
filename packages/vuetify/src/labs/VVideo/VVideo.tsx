// Styles
import './VVideo.sass'

// Components
import { makeVVideoControlsProps, VVideoControls } from './VVideoControls'
import { VSpacer } from '@/components/VGrid/VSpacer'
import { VIcon } from '@/components/VIcon/VIcon'
import { VImg } from '@/components/VImg/VImg'
import { VOverlay } from '@/components/VOverlay/VOverlay'
import { VProgressCircular } from '@/components/VProgressCircular/VProgressCircular'
import { VIconBtn } from '@/labs/VIconBtn/VIconBtn'

// Composables
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { MaybeTransition } from '@/composables/transition'

// Utilities
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VVideoControlsAppendSlot, VVideoControlsDefaultSlot } from './VVideoControls'
import type { LoaderSlotProps } from '@/composables/loader'

export type VVideoSlots = {
  controls: VVideoControlsDefaultSlot
  append: VVideoControlsAppendSlot
  loader: LoaderSlotProps
  sources: never
}

const allowedVariants = ['background', 'player'] as const
type Variant = typeof allowedVariants[number]

export const makeVVideoProps = propsFactory({
  // disabled: Boolean,
  // eager: Boolean,
  // lazySrc: String,
  src: String,
  type: String, // e.g. video/mp4
  image: String,
  variant: {
    type: String as PropType<Variant>,
    default: 'player',
    validator: (v: any) => allowedVariants.includes(v),
  },
  ...makeDimensionProps({ width: 400, height: 225 }),
  ...makeElevationProps({ elevation: 4 }),
  ...makeRoundedProps(),
  ...makeThemeProps(),
  ...makeVVideoControlsProps(),
}, 'VVideo')

export const VVideo = genericComponent<VVideoSlots>()({
  name: 'VVideo',

  props: makeVVideoProps(),

  emits: {
    'update:playing': (val: boolean) => true,
    'update:progress': (val: number) => true,
    'update:volume': (val: number) => true,
  },

  setup (props, { attrs, slots }) {
    const { themeClasses } = provideTheme(props)
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props)

    const videoRef = ref<HTMLVideoElement>()

    const isPlaying = useProxiedModel(props, 'playing')
    const progress = useProxiedModel(props, 'progress')
    const volume = useProxiedModel(props, 'volume')

    const isLoading = ref(true)
    const duration = ref(0)

    function onTimeupdate () {
      const { currentTime, duration } = videoRef.value!
      progress.value = duration === 0 ? 0 : 100 * currentTime / duration
    }

    function onVideoLoaded () {
      isLoading.value = false
      duration.value = videoRef.value!.duration
    }

    function onKeydown (e: KeyboardEvent) {
      if (!videoRef.value) return
      if (e.shiftKey || e.ctrlKey) return
      switch (e.key) {
        case 'ArrowRight': {
          videoRef.value.currentTime = Math.min(videoRef.value.currentTime + 5, duration.value)
          break
        }
        case 'ArrowLeft': {
          videoRef.value.currentTime = Math.max(videoRef.value.currentTime - 5, 0)
          break
        }
        case 'ArrowUp': {
          volume.value = Math.min(volume.value + 10, 100)
          // TODO: show volume change indicator
          break
        }
        case 'ArrowDown': {
          volume.value = Math.max(volume.value - 10, 0)
          // TODO: show volume change indicator
          break
        }
      }
    }

    function skipTo (v: number) {
      if (!videoRef.value) return
      progress.value = v
      videoRef.value.currentTime = duration.value * v / 100
    }

    watch(() => props.src, v => {
      progress.value = 0
    })

    watch(isPlaying, v => {
      if (!videoRef.value) return
      if (v && videoRef.value.paused) {
        videoRef.value.play()
      }
      if (!v && !videoRef.value.paused) {
        videoRef.value.pause()
      }
    })

    watch(volume, v => {
      if (!videoRef.value) return
      videoRef.value.volume = v / 100
    })

    onMounted(() => {
      if (!videoRef.value) return // TODO: defer when !eager
      videoRef.value.addEventListener('timeupdate', onTimeupdate)
      videoRef.value.volume = volume.value / 100
    })

    onBeforeUnmount(() => {
      videoRef.value?.removeEventListener('timeupdate', onTimeupdate)
    })

    function toggleFullscreen () {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.value?.requestFullscreen()
      }
    }

    useRender(() => {
      const showControls = !isLoading.value &&
        props.variant === 'player' &&
        props.controlVariant !== 'hidden'

      const posterTransition = props.variant === 'background'
        ? 'poster-fade-out'
        : 'fade-transition'

      const controlsTransition = props.controlVariant === 'floating'
        ? 'slide-y-transition'
        : 'slide-y-reverse-transition'

      const controlsProps = {
        ...VVideoControls.filterProps(props),
        playing: isPlaying.value,
        progress: progress.value,
        duration: duration.value,
        volume: volume.value,
      }

      const controlsEventHandlers = {
        onSkip: (v: number) => skipTo(v),
        'onClick:fullscreen': () => toggleFullscreen(),
        'onUpdate:playing': (v: boolean) => isPlaying.value = v,
        'onUpdate:progress': (v: number) => skipTo(v),
        'onUpdate:volume': (v: number) => volume.value = v,
      }

      return (
        <div
          class={[
            'v-video',
            `v-video--variant-${props.variant}`,
            { 'v-video--playing': isPlaying.value },
            themeClasses.value,
            roundedClasses.value,
          ]}
          onKeydown={ onKeydown }
        >
          <div
            class={[
              'v-video__content',
              elevationClasses.value,
            ]}
            style={[
              dimensionStyles.value,
            ]}
          >
            <video
              class={[
                'v-video__video',
                roundedClasses.value,
              ]}
              { ...attrs }
              playsinline
              ref={ videoRef }
              onLoadeddata={ onVideoLoaded }
              onPlay={ () => isPlaying.value = true }
              onPause={ () => isPlaying.value = false }
              // onWaiting={ showDataLoading }
              // onPlaying={ hideDataLoading } // ? onAbort, onSuspended, onStalled
              onClick={ () => isPlaying.value = !isPlaying.value }
            >
              { slots.sources?.() ?? <source src={ props.src } type={ props.type } /> }
            </video>
            { props.variant === 'player' && (
              <VOverlay
                key="pause-overlay"
                modelValue={ !isLoading.value }
                opacity="0"
                contained
                persistent
                contentClass="d-flex flex-column align-center justify-end w-100 h-100"
              >
                <VSpacer />
                <MaybeTransition name="fade-transition">
                  { !isPlaying.value && (
                    <VIconBtn
                      icon="mdi-play"
                      size="80"
                      color="#fff"
                      variant="outlined"
                      icon-size="50"
                      class="v-video__center-icon"
                    >
                      <VIcon style="transform: translateX(-2%)" />
                    </VIconBtn>
                  )}
                </MaybeTransition>
                <VSpacer />
              </VOverlay>
            )}
            <VOverlay
              key="poster-overlay"
              modelValue={ isLoading.value }
              contained
              persistent
              contentClass="w-100 h-100"
              transition={ posterTransition }
            >
              <VImg class="media-cover" cover src={ props.image }>
                <div class="d-flex align-center justify-center fill-height">
                  { isLoading.value && (
                    <VProgressCircular
                      indeterminate
                      color={ props.color }
                      width="3"
                      size={ Math.min(140, Number(props.height) / 2 || 80) }
                    />
                  )}
                </div>
              </VImg>
            </VOverlay>
          </div>
          <MaybeTransition key="actions" name={ controlsTransition }>
            { showControls && (
              <VVideoControls
                { ...controlsProps }
                { ...controlsEventHandlers }
              >
                {{
                  default: slots.controls,
                  append: slots.append,
                }}
              </VVideoControls>
            )}
          </MaybeTransition>
        </div>
      )
    })
  },
})

export type VVideo = InstanceType<typeof VVideo>
