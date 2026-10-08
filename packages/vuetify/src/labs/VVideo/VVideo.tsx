/* eslint-disable complexity */
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
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { useElevation } from '@/composables/elevation'
import { forwardRefs } from '@/composables/forwardRefs'
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
    'variant',
  ]),
}, 'VVideo')

export const VVideo = genericComponent<VVideoSlots>()({
  name: 'VVideo',

  inheritAttrs: false,

  props: makeVVideoProps(),

  emits: {
    error: (val: MediaError | boolean) => true,
    loaded: (element: HTMLVideoElement) => true,
    'update:error': (val: MediaError | boolean) => true,
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
    const { roundedClasses: roundedContainerClasses, roundedStyles: roundedContainerStyles } = useRounded(roundedForContainer)
    const { roundedClasses: roundedControlsClasses, roundedStyles: roundedControlsStyles } = useRounded(roundedForControls)

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
      if (state.value === 'loaded') {
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
            themeClasses.value,
            densityClasses.value,
            roundedContainerClasses.value,
            props.class,
          ]}
          style={[
            { '--v-video-aspect-ratio': props.aspectRatio },
            props.variant === 'background' ? [] : pick(dimensionStyles.value, ['width', 'minWidth', 'maxWidth']),
            roundedContainerStyles.value,
            props.style,
          ]}
          tabindex="-1"
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
                onLoadeddata={ onLoadeddata }
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
                        ...roundedContainerClasses.value,
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
                class={ roundedControlsClasses.value }
                style={ roundedControlsStyles.value }
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
