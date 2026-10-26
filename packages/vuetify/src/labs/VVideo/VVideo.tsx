// Styles
import './VVideo.sass'

// Components
import { makeVVideoControlsProps, VVideoControls } from './VVideoControls'
import { VFadeTransition } from '@/components/transitions'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'
import { VIconBtn } from '@/components/VIconBtn/VIconBtn'
import { VImg } from '@/components/VImg/VImg'
import { VProgressCircular } from '@/components/VProgressCircular/VProgressCircular'

// Composables
import { useDisplay } from '@/composables'
import { makeComponentProps } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { useElevation } from '@/composables/elevation'
import { forwardRefs } from '@/composables/forwardRefs'
import { useHydration } from '@/composables/hydration'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useRounded } from '@/composables/rounded'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { MaybeTransition } from '@/composables/transition'
import { getSeekStep, useMedia, usePlayhead } from '@/labs/composables/media'

// Utilities
import { onBeforeUnmount, onMounted, shallowRef, toRef, Transition, watch } from 'vue'
import { createRange, genericComponent, omit, pick, propsFactory, useRender } from '@/util'

// Types
import type { Component, PropType, TransitionProps } from 'vue'
import type { VVideoControlsActionsSlot, VVideoControlsPropsSlot, VVideoControlsVariant } from './VVideoControls'
import type { LoaderSlotProps } from '@/composables/loader'

export type VVideoSlots = {
  [key: `action.${string}`]: VVideoControlsActionsSlot
  header: never
  controls: VVideoControlsActionsSlot
  play: VVideoControlsPropsSlot
  progress: VVideoControlsPropsSlot
  time: VVideoControlsActionsSlot
  'time.elapsed': VVideoControlsActionsSlot
  'time.remaining': VVideoControlsActionsSlot
  'time.total': VVideoControlsActionsSlot
  prepend: VVideoControlsActionsSlot
  append: VVideoControlsActionsSlot
  loader: LoaderSlotProps
  sources: never
  error: { error?: MediaError | boolean }
}

const allowedVariants = ['background', 'player'] as const
type Variant = typeof allowedVariants[number]

export const makeVVideoProps = propsFactory({
  aspectRatio: [String, Number],
  autoplay: Boolean,
  eager: Boolean,
  error: [Boolean, Object] as PropType<MediaError | boolean>,
  src: String,
  srcObject: [Object, null] as PropType<MediaProvider | null>,
  type: String, // e.g. video/mp4
  image: String,
  hideControls: Boolean,
  hideOverlay: Boolean,
  noFullscreen: Boolean,
  hideBuffer: Boolean,
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
  controlsHideDelay: {
    type: Number,
    default: 2000,
    validator: (value: number) => Number.isFinite(value) && value >= 0,
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
    'buffer',
    'fullscreen',
    'gap',
    'rounded',
    'tile',
    'variant',
  ]),
}, 'VVideo')

export const VVideo = genericComponent<VVideoSlots>()({
  name: 'VVideo',

  inheritAttrs: false,

  props: makeVVideoProps(),

  emits: {
    error: (value: MediaError | boolean) => true,
    loaded: (element: HTMLVideoElement) => true,
    'update:error': (value: MediaError | boolean) => true,
    'update:playing': (value: boolean) => true,
    'update:progress': (value: number) => true,
    'update:volume': (value: number) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const { themeClasses } = provideTheme(props)
    const { densityClasses } = useDensity(props)
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { ssr } = useDisplay()

    const roundedForContainer = toRef(() => Array.isArray(props.rounded) ? props.rounded[0] : props.rounded)
    const { roundedClasses, roundedStyles } = useRounded(roundedForContainer)

    const containerRef = shallowRef<HTMLDivElement>()
    const videoRef = shallowRef<HTMLVideoElement>()
    const controlsRef = shallowRef<VVideoControls>()

    const playing = useProxiedModel(props, 'playing')
    const progress = useProxiedModel(props, 'progress')
    const volume = useProxiedModel(props, 'volume', 100, (v?: number | string) => Number(v ?? 100))
    const error = useProxiedModel(props, 'error')

    const fullscreen = shallowRef(false)
    const triggered = shallowRef(false)
    const loaded = shallowRef(false)
    const startAfterLoad = shallowRef(false)

    const { duration, buffered, waiting, play, seek, retry: reload } = useMedia(videoRef, props, {
      playing,
      progress,
      volume,
      error,
      onError: value => emit('error', value),
    })

    const hasControls = toRef(() => props.variant === 'player' && !props.hideControls && props.controlsVariant !== 'hidden')
    usePlayhead(videoRef, () => hasControls.value ? containerRef.value : undefined, { waiting })

    const state = toRef(() => error.value ? 'error'
      : loaded.value ? 'loaded'
      : triggered.value || props.autoplay ? 'loading'
      : 'idle')

    const isHydrated = useHydration()
    const controlsIdle = shallowRef(false)
    const controlsPointer = shallowRef<number>()
    const controlsAutoHide = toRef(() => hasControls.value &&
      !(props.controlsProps?.detached ?? props.detached) &&
      Number.isFinite(props.controlsHideDelay) && props.controlsHideDelay > 0)
    const controlsClasses = toRef(() => ({
      'v-video--controls-auto-hide': controlsAutoHide.value,
      'v-video--controls-idle': controlsAutoHide.value && controlsIdle.value,
      'v-video--controls-interacting': controlsAutoHide.value && controlsPointer.value !== undefined,
    }))

    provideDefaults({
      VTooltip: {
        disabled: toRef(() => (controlsAutoHide.value && controlsIdle.value) || undefined),
      },
    })

    let controlsTimer: ReturnType<typeof setTimeout> | undefined
    let controlsDocument: Document | undefined
    let wakeTap = false

    function releaseControlsPointer () {
      controlsDocument?.removeEventListener('pointerup', onControlsPointerRelease, true)
      controlsDocument?.removeEventListener('pointercancel', onControlsPointerRelease, true)
      controlsDocument = undefined
      controlsPointer.value = undefined
    }

    function stopIdleTracking () {
      clearTimeout(controlsTimer)
      controlsTimer = undefined
      controlsIdle.value = false
      releaseControlsPointer()
    }

    function canHideControls () {
      return isHydrated.value && controlsAutoHide.value && state.value === 'loaded' && playing.value &&
        !waiting.value && !error.value && controlsPointer.value === undefined
    }

    function onControlsActivity () {
      clearTimeout(controlsTimer)
      controlsTimer = undefined
      controlsIdle.value = false

      if (!controlsAutoHide.value) {
        releaseControlsPointer()
      } else if (canHideControls()) {
        controlsTimer = setTimeout(() => {
          controlsTimer = undefined
          if (canHideControls()) controlsIdle.value = true
        }, props.controlsHideDelay)
      }
    }

    function onControlsPointerDown (e: PointerEvent) {
      wakeTap = controlsIdle.value && e.pointerType !== 'mouse'
      if (!controlsAutoHide.value || e.button !== 0 || !e.isPrimary) return

      releaseControlsPointer()
      controlsPointer.value = e.pointerId
      controlsDocument = containerRef.value?.ownerDocument
      controlsDocument?.addEventListener('pointerup', onControlsPointerRelease, true)
      controlsDocument?.addEventListener('pointercancel', onControlsPointerRelease, true)
      onControlsActivity()
    }

    function onControlsPointerRelease (e: PointerEvent) {
      if (e.pointerId !== controlsPointer.value) return

      releaseControlsPointer()
      onControlsActivity()
    }

    watch([playing, state, waiting, error, fullscreen, isHydrated, controlsAutoHide, () => props.controlsHideDelay], onControlsActivity)
    watch([() => props.src, () => props.srcObject, videoRef], stopIdleTracking)

    function onLoadeddata () {
      loaded.value = true

      if (startAfterLoad.value) {
        setTimeout(() => playing.value = true, 100)
      }

      emit('loaded', videoRef.value!)
    }

    function retry () {
      if (state.value !== 'error') return

      loaded.value = false
      triggered.value = true

      reload()
      if (!props.srcObject) {
        play()
      }
    }

    function skipTo (percent: number) {
      seek({ to: `${percent}%` })
    }

    function onClick () {
      if (['loaded', 'error'].includes(state.value)) return

      triggered.value = true
      startAfterLoad.value = !startAfterLoad.value
    }

    function onKeydown (e: KeyboardEvent) {
      if (!videoRef.value || e.ctrlKey || e.defaultPrevented) return
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
          seek({ by: getSeekStep(props.seekStep, e.shiftKey) })
          break
        }
        case e.key === 'ArrowLeft': {
          seek({ by: -getSeekStep(props.seekStep, e.shiftKey) })
          break
        }
        case createRange(10).map(String).includes(e.key): {
          seek({ to: `${Number(e.key) * 10}%` })
          break
        }
        case e.key === 'ArrowUp': {
          if (props.muted) break
          volume.value = Math.min(volume.value + 10, 100)
          break
        }
        case e.key === 'ArrowDown': {
          if (props.muted) break
          volume.value = Math.max(volume.value - 10, 0)
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

    watch(() => props.srcObject, v => v && (triggered.value = true))

    watch(() => props.eager, v => v && (triggered.value = true), { immediate: true })

    onMounted(() => {
      if (props.autoplay && !ssr) {
        triggered.value = true
        startAfterLoad.value = true
      }
    })

    onBeforeUnmount(() => {
      stopIdleTracking()
      document.body.removeEventListener('keydown', fullscreenExitShortcut)
      document.removeEventListener('fullscreenchange', onFullscreenExit)
    })

    function focusContainer () {
      containerRef.value?.focus({ preventScroll: true })
    }

    function fullscreenExitShortcut (e: KeyboardEvent) {
      if (['ESC', 'f'].includes(e.key)) {
        toggleFullscreen()
        document.body.removeEventListener('keydown', fullscreenExitShortcut)
      }
    }

    async function toggleFullscreen () {
      if (props.noFullscreen || !document.fullscreenEnabled) {
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

      focusContainer()
      fullscreen.value = false
      document.body.removeEventListener('keydown', fullscreenExitShortcut)
      document.removeEventListener('fullscreenchange', onFullscreenExit)
    }

    function onVideoClick (e: Event) {
      e.preventDefault()
      if (state.value === 'loaded' && !wakeTap) {
        playing.value = !playing.value
        focusContainer()
      }
    }

    function onDoubleClick (e: Event) {
      e.preventDefault()
      toggleFullscreen()
    }

    let lastTap = 0
    function onTouchend (e: Event) {
      if (wakeTap) return
      const now = performance.now()
      if ((now - lastTap) < 500) {
        e.preventDefault()
        toggleFullscreen()
      } else {
        lastTap = now
      }
    }

    useRender(() => {
      const showControls = state.value === 'loaded' && hasControls.value

      const posterTransition = props.variant === 'background'
        ? 'poster-fade-out'
        : 'fade-transition'

      const controlsProps = {
        ...VVideoControls.filterProps(omit(props, ['variant', 'rounded'])),
        rounded: Array.isArray(props.rounded) ? props.rounded.at(-1) : props.rounded,
        density: props.density,
        variant: props.controlsVariant,
        ...props.controlsProps,
        fullscreen: fullscreen.value,
        hideFullscreen: props.hideFullscreen || props.noFullscreen,
        playing: playing.value,
        progress: progress.value,
        duration: duration.value,
        buffer: props.hideBuffer ? 0 : buffered.value,
        volume: volume.value,
      }

      const controlsEventHandlers = {
        'onClick:fullscreen': () => toggleFullscreen(),
        'onUpdate:playing': (v: boolean) => playing.value = v,
        'onUpdate:progress': (v: number) => seek({ to: `${v}%` }),
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
          class={[
            'v-video__center-icon',
            'v-video__center-icon--play',
          ]}
          onClick={ onVideoClick }
        />
      )

      const errorIconProps = {
        icon: '$warning',
        size: '70',
      }

      const activeOverlays = {
        playIcon: props.variant === 'player' &&
          state.value === 'loaded' &&
          !props.hideOverlay &&
          !playing.value,
        poster: state.value !== 'loaded' && state.value !== 'error',
        loading: props.variant === 'player' &&
          state.value !== 'error' &&
          (
            state.value === 'loading' ||
            waiting.value
          ),
        error: props.variant === 'player' && state.value === 'error',
      }

      return (
        <div
          ref={ containerRef }
          class={[
            'v-video',
            `v-video--variant-${props.variant}`,
            `v-video--${state.value}`,
            { 'v-video--playing': playing.value },
            controlsClasses.value,
            themeClasses.value,
            densityClasses.value,
            roundedClasses.value,
            props.class,
          ]}
          style={[
            { '--v-video-aspect-ratio': props.aspectRatio },
            props.variant === 'background' ? [] : pick(dimensionStyles.value, ['width', 'minWidth', 'maxWidth']),
            roundedStyles.value,
            props.style,
          ]}
          tabindex="-1"
          onKeydown={ onKeydown }
          onKeydownCapture={ onControlsActivity }
          onPointermoveCapture={ onControlsActivity }
          onPointerdownCapture={ onControlsPointerDown }
          onFocusinCapture={ onControlsActivity }
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
                  roundedClasses.value,
                ]}
                { ...omit(attrs, ['controlslist', 'class', 'style']) }
                controlslist={ controlslist }
                autoplay={ props.autoplay }
                muted={ props.muted }
                playsinline
                ref={ videoRef }
                onLoadeddata={ onLoadeddata }
                onEmptied={ stopIdleTracking }
                onClick={ onVideoClick }
                onDblclick={ onDoubleClick }
                onTouchend={ onTouchend }
              >
                { slots.sources?.() ?? <source src={ props.src } type={ props.type } /> }
              </video>
            )}
            <Transition name="fade-transition">
              { activeOverlays.playIcon && (
                <div class="v-video__overlay-fill">
                  { overlayPlayIcon }
                </div>
              )}
            </Transition>
            { props.variant === 'player' &&
              !!slots.header &&
              (
                <div key="header" class="v-video__header">
                  { slots.header() }
                </div>
              )
            }
            <MaybeTransition transition={ posterTransition }>
              { activeOverlays.poster && (
                <div class="v-video__overlay-fill v-video__poster">
                  <VImg cover src={ props.image }>
                    <div
                      class={[
                        'v-video__overlay-fill',
                        ...roundedClasses.value,
                      ]}
                    >
                      { props.variant === 'player' && overlayPlayIcon }
                    </div>
                  </VImg>
                </div>
              )}
            </MaybeTransition>
            { activeOverlays.loading && (
              <div key="loading-overlay" class="v-video__overlay-fill">
                { slots.loader?.({ color: props.color, isActive: true }) ?? loadingIndicator }
              </div>
            )}
            { activeOverlays.error && (
              <div key="error-overlay" class="v-video__overlay-fill">
                {
                  slots.error
                    ? (
                      <VDefaultsProvider defaults={{ VIcon: errorIconProps }}>
                        { slots.error?.({ error: error.value }) }
                      </VDefaultsProvider>
                    )
                    : <VIcon { ...errorIconProps } />
                }
              </div>
            )}
          </div>
          <MaybeTransition key="actions" transition={ props.controlsTransition }>
            { showControls && (
              <VVideoControls
                ref={ controlsRef }
                { ...controlsProps }
                { ...controlsEventHandlers }
              >
                {{
                  ...omit(slots, ['header', 'controls', 'loader', 'sources', 'error']),
                  default: slots.controls,
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
        retry,
        seek,
        skipTo,
        toggleFullscreen,
      }, controlsRef),
    }
  },
})

export type VVideo = InstanceType<typeof VVideo>
