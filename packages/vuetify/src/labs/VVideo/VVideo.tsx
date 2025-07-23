// Styles
import './VVideo.sass'

// Components
import { makeVVideoControlsProps, VVideoControls } from './VVideoControls'
import { VFadeTransition } from '@/components/transitions'
import { VSpacer } from '@/components/VGrid/VSpacer'
import { VImg } from '@/components/VImg/VImg'
import { VOverlay } from '@/components/VOverlay/VOverlay'
import { VProgressCircular } from '@/components/VProgressCircular/VProgressCircular'
import { VIconBtn } from '@/labs/VIconBtn/VIconBtn'

// Composables
import { useDisplay } from '@/composables'
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { useElevation } from '@/composables/elevation'
import { forwardRefs } from '@/composables/forwardRefs'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useRounded } from '@/composables/rounded'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { MaybeTransition } from '@/composables/transition'

// Utilities
import { nextTick, onBeforeUnmount, onMounted, ref, shallowRef, toRef, watch } from 'vue'
import { createRange, genericComponent, omit, pick, propsFactory, useRender } from '@/util'

// Types
import type { Component, PropType, TransitionProps } from 'vue'
import type { VVideoControlsActionsSlot, VVideoControlsVariant } from './VVideoControls'
import type { LoaderSlotProps } from '@/composables/loader'

export type VVideoSlots = {
  header: never
  controls: VVideoControlsActionsSlot
  prepend: VVideoControlsActionsSlot
  append: VVideoControlsActionsSlot
  loader: LoaderSlotProps
  sources: never
}

const allowedVariants = ['background', 'player'] as const
type Variant = typeof allowedVariants[number]

export const makeVVideoProps = propsFactory({
  autoplay: Boolean,
  muted: Boolean,
  eager: Boolean,
  src: String,
  type: String, // e.g. video/mp4
  image: String,
  hideOverlay: Boolean,
  noFullscreen: Boolean,
  startAt: [Number, String],
  variant: {
    type: String as PropType<Variant>,
    default: 'player',
    validator: (v: any) => allowedVariants.includes(v),
  },
  controlsTransition: {
    type: [Boolean, String, Object] as PropType<null | string | boolean | TransitionProps & { component?: any }>,
    component: VFadeTransition as Component,
  },
  controlsVariant: {
    type: String as PropType<VVideoControlsVariant>,
    default: 'default',
  },
  controlsProps: {
    type: Object as PropType<VVideoControls['$props']>,
  },
  rounded: [Boolean, Number, String, Array] as PropType<boolean | number | string | (boolean | number | string)[]>,

  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeThemeProps(),
  ...omit(makeVVideoControlsProps(), [
    'fullscreen',
    'variant',
  ]),
}, 'VVideo')

export const VVideo = genericComponent<VVideoSlots>()({
  name: 'VVideo',

  inheritAttrs: false,

  props: makeVVideoProps(),

  emits: {
    loaded: (element: HTMLVideoElement) => true,
    'update:playing': (val: boolean) => true,
    'update:progress': (val: number) => true,
    'update:volume': (val: number) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const { themeClasses } = provideTheme(props)
    const { densityClasses } = useDensity(props)
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { ssr } = useDisplay()

    const roundedForContainer = toRef(() => Array.isArray(props.rounded) ? props.rounded[0] : props.rounded)
    const roundedForControls = toRef(() => Array.isArray(props.rounded) ? props.rounded.at(-1) : props.rounded ?? false)
    const { roundedClasses: roundedContainerClasses } = useRounded(roundedForContainer)
    const { roundedClasses: roundedControlsClasses } = useRounded(roundedForControls)

    const containerRef = ref<HTMLDivElement>()
    const videoRef = ref<HTMLVideoElement>()
    const controlsRef = ref<VVideoControls>()

    const playing = useProxiedModel(props, 'playing')
    const progress = useProxiedModel(props, 'progress')
    const volume = useProxiedModel(props, 'volume', 0, (v?: number | string) => Number(v ?? 0))

    const fullscreen = shallowRef(false)
    const waiting = shallowRef(false)
    const triggered = shallowRef(false)
    const startAfterLoad = shallowRef(false)
    const state = shallowRef<'idle' | 'loading' | 'loaded' | 'error'>(props.autoplay ? 'loading' : 'idle')
    const duration = shallowRef(0)

    const fullscreenEnabled = toRef(() => !props.noFullscreen && !String(attrs.controlsList ?? '').includes('nofullscreen'))

    function onTimeupdate () {
      const { currentTime, duration } = videoRef.value!
      progress.value = duration === 0 ? 0 : 100 * currentTime / duration
    }

    async function onTriggered () {
      await nextTick()
      if (!videoRef.value) return
      videoRef.value.addEventListener('timeupdate', onTimeupdate)
      videoRef.value.volume = volume.value / 100
      if (state.value !== 'loaded') {
        state.value = 'loading'
      }
    }

    function onVideoLoaded () {
      state.value = 'loaded'
      duration.value = videoRef.value!.duration

      const startTime = Number(props.startAt ?? 0)
      if (startTime && startTime <= duration.value) {
        videoRef.value!.currentTime = startTime
        progress.value = duration.value === 0 ? 0 : 100 * startTime / duration.value
      }

      if (startAfterLoad.value) {
        setTimeout(() => playing.value = true, 100)
      }

      emit('loaded', videoRef.value!)
    }

    function onClick () {
      if (state.value !== 'loaded') {
        triggered.value = true
        startAfterLoad.value = !startAfterLoad.value
      }
    }

    function onKeydown (e: KeyboardEvent) {
      if (!videoRef.value || e.ctrlKey) return
      if (e.key.startsWith('Arrow')) {
        e.preventDefault()
      }
      switch (true) {
        case e.key === ' ': {
          if (!['A', 'BUTTON'].includes((e.target as Element)?.tagName)) {
            e.preventDefault()
            playing.value = !playing.value
          }
          break
        }
        case e.key === 'ArrowRight': {
          const step = 10 * (e.shiftKey ? 6 : 1)
          videoRef.value.currentTime = Math.min(videoRef.value.currentTime + step, duration.value)
          // TODO: show skip indicator
          break
        }
        case e.key === 'ArrowLeft': {
          const step = 10 * (e.shiftKey ? 6 : 1)
          videoRef.value.currentTime = Math.max(videoRef.value.currentTime - step, 0)
          // TODO: show skip indicator
          break
        }
        case createRange(10).map(String).includes(e.key): {
          skipTo(Number(e.key) * 10)
          break
        }
        case e.key === 'ArrowUp': {
          volume.value = Math.min(volume.value + 10, 100)
          // TODO: show volume change indicator
          break
        }
        case e.key === 'ArrowDown': {
          volume.value = Math.max(volume.value - 10, 0)
          // TODO: show volume change indicator
          break
        }
        case e.key === 'm': {
          controlsRef.value?.toggleMuted()
          break
        }
        case e.key === 'f': {
          toggleFullscreen()
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

    watch(playing, v => {
      if (!videoRef.value) return
      if (v) {
        videoRef.value.play()
      } else {
        videoRef.value.pause()
      }
    })

    watch(volume, v => {
      if (!videoRef.value) return
      videoRef.value.volume = v / 100
    })

    watch(triggered, () => onTriggered(), { once: true })

    watch(() => props.eager, v => v && (triggered.value = true), { immediate: true })

    onMounted(() => {
      if (props.autoplay && !ssr) {
        triggered.value = true
        startAfterLoad.value = true
      }
    })

    onBeforeUnmount(() => {
      videoRef.value?.removeEventListener('timeupdate', onTimeupdate)
    })

    function focusSlider () {
      const container = videoRef.value?.closest('.v-video') as HTMLElement
      const innerSlider = container?.querySelector('[role="slider"]') as HTMLElement
      innerSlider?.focus()
    }

    function fullscreenExitShortcut (e: KeyboardEvent) {
      if (['ESC', 'f'].includes(e.key)) {
        toggleFullscreen()
        document.body.removeEventListener('keydown', fullscreenExitShortcut)
      }
    }

    async function toggleFullscreen () {
      if (!fullscreenEnabled.value || !document.fullscreenEnabled) {
        return
      }
      if (document.fullscreenElement) {
        document.exitFullscreen()
        onFullscreenExit()
      } else {
        await containerRef.value?.requestFullscreen()
        document.body.addEventListener('keydown', fullscreenExitShortcut)
        document.addEventListener('fullscreenchange', onFullscreenExit)
        fullscreen.value = true
      }
    }

    function onFullscreenExit () {
      // event fires with a delay after requestFullscreen(), ignore first run
      if (document.fullscreenElement) return

      focusSlider()
      fullscreen.value = false
      document.body.removeEventListener('keydown', fullscreenExitShortcut)
      document.removeEventListener('fullscreenchange', onFullscreenExit)
    }

    function onVideoClick (e: Event) {
      e.preventDefault()
      if (state.value === 'loaded') {
        playing.value = !playing.value
        focusSlider()
      }
    }

    function onDoubleClick (e: Event) {
      e.preventDefault()
      toggleFullscreen()
    }

    let lastTap = 0
    function onTouchend (e: Event) {
      const now = performance.now()
      if ((now - lastTap) < 500) {
        e.preventDefault()
        toggleFullscreen()
      } else {
        lastTap = now
      }
    }

    useRender(() => {
      const showControls = state.value === 'loaded' &&
        props.variant === 'player' &&
        props.controlsVariant !== 'hidden'

      const posterTransition = props.variant === 'background'
        ? 'poster-fade-out'
        : 'fade-transition'

      const overlayProps = {
        contained: true,
        persistent: true,
        contentClass: 'v-video__overlay-fill',
      }

      const controlsProps = {
        ...VVideoControls.filterProps(omit(props, ['variant', 'rounded', 'hideVolume'])),
        rounded: Array.isArray(props.rounded) ? props.rounded.at(-1) : props.rounded,
        fullscreen: fullscreen.value,
        hideVolume: props.hideVolume || props.muted,
        hideFullscreen: props.hideFullscreen || !fullscreenEnabled.value,
        density: props.density,
        variant: props.controlsVariant,
        playing: playing.value,
        progress: progress.value,
        duration: duration.value,
        volume: volume.value,
        ...props.controlsProps,
      }

      const controlsEventHandlers = {
        onSkip: (v: number) => skipTo(v),
        'onClick:fullscreen': () => toggleFullscreen(),
        'onUpdate:playing': (v: boolean) => playing.value = v,
        'onUpdate:progress': (v: number) => skipTo(v),
        'onUpdate:volume': (v: number) => volume.value = v,
        onClick: (e: Event) => e.stopPropagation(),
      }

      const controlslist = [
        attrs.controlslist,
        props.noFullscreen ? 'nofullscreen' : '',
      ].filter(Boolean).join(' ')

      const loadingIndicator = (
        <VProgressCircular
          indeterminate
          color={ props.color }
          width="3"
          size={ Math.min(100, Number(props.height) / 2 || 50) }
        />
      )

      const overlayPlayIcon = (
        <VIconBtn
          icon="$play"
          size="80"
          color="#fff"
          variant="outlined"
          iconSize="50"
          class="v-video__center-icon"
        />
      )

      return (
        <div
          ref={ containerRef }
          class={[
            'v-video',
            `v-video--variant-${props.variant}`,
            `v-video--${state.value}`,
            { 'v-video--playing': playing.value },
            themeClasses.value,
            densityClasses.value,
            roundedContainerClasses.value,
            props.class,
          ]}
          style={[
            props.variant === 'background' ? [] : pick(dimensionStyles.value, ['width', 'min-width', 'max-width']),
            props.style,
          ]}
          onKeydown={ onKeydown }
          onClick={ onClick }
        >
          <div
            class={[
              'v-video__content',
              elevationClasses.value,
            ]}
            style={[
              props.variant === 'background' ? [] : dimensionStyles.value,
            ]}
          >
            { (props.eager || triggered.value) && (
              <video
                key="video-element"
                class={[
                  'v-video__video',
                  roundedContainerClasses.value,
                ]}
                { ...omit(attrs, ['controlslist', 'class', 'style']) }
                controlslist={ controlslist }
                autoplay={ props.autoplay }
                muted={ props.muted }
                playsinline
                ref={ videoRef }
                onLoadeddata={ onVideoLoaded }
                onPlay={ () => playing.value = true }
                onPause={ () => playing.value = false }
                onWaiting={ () => waiting.value = true }
                onPlaying={ () => waiting.value = false }
                onClick={ onVideoClick }
                onDblclick={ onDoubleClick }
                onTouchend={ onTouchend }
              >
                { slots.sources?.() ?? <source src={ props.src } type={ props.type } /> }
              </video>
            )}
            { props.variant === 'player' && !props.hideOverlay && (
              <VOverlay
                key="pause-overlay"
                modelValue={ state.value === 'loaded' }
                opacity="0"
                { ...overlayProps }
              >
                <VSpacer />
                <MaybeTransition name="fade-transition">
                  { !playing.value && overlayPlayIcon }
                </MaybeTransition>
                <VSpacer />
              </VOverlay>
            )}
            { props.variant === 'player' && !!slots.header
              ? (
                <div key="header" class="v-video__header">
                  { slots.header() }
                </div>
              )
              : '' }
            <VOverlay
              key="poster-overlay"
              modelValue={ state.value !== 'loaded' }
              transition={ posterTransition }
              { ...overlayProps }
            >
              <VImg cover src={ props.image }>
                <div
                  class={[
                    'v-video__overlay-fill',
                    ...roundedContainerClasses.value,
                  ]}
                >
                  { overlayPlayIcon }
                </div>
              </VImg>
            </VOverlay>
            <VOverlay
              key="loading-overlay"
              modelValue={ state.value === 'loading' || waiting.value }
              opacity=".1"
              { ...overlayProps }
            >
              { loadingIndicator }
            </VOverlay>
          </div>
          <MaybeTransition key="actions" transition={ props.controlsTransition }>
            { showControls && (
              <VVideoControls
                ref={ controlsRef }
                class={ roundedControlsClasses.value }
                { ...controlsProps }
                { ...controlsEventHandlers }
              >
                {{
                  default: slots.controls,
                  prepend: slots.prepend,
                  append: slots.append,
                }}
              </VVideoControls>
            )}
          </MaybeTransition>
        </div>
      )
    })

    return {
      video: videoRef,
      ...forwardRefs({
        skipTo,
        toggleFullscreen,
      }, controlsRef),
    }
  },
})

export type VVideo = InstanceType<typeof VVideo>
