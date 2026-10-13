// Styles
import './VAudio.sass'

// Components
import { makeVAudioControlsProps, VAudioControls } from './VAudioControls'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'
import { VProgressLinear } from '@/components/VProgressLinear'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { forwardRefs } from '@/composables/forwardRefs'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useMedia, usePlayhead } from '@/labs/composables/media'

// Utilities
import { onBeforeUnmount, provide, shallowRef } from 'vue'
import { VAudioSymbol } from './shared'
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { AudioProvide } from './shared'
import type { VAudioControlsActionsSlot, VAudioControlsSlots } from './VAudioControls'
import type { LoaderSlotProps } from '@/composables/loader'

export type VAudioSlots = Omit<VAudioControlsSlots, 'default'> & {
  controls: VAudioControlsActionsSlot
  loader: LoaderSlotProps
  error: { error?: MediaError | boolean }
  sources: never
}

export const makeVAudioProps = propsFactory({
  src: String,
  srcObject: [Object, null] as PropType<MediaProvider | null>,
  type: String,
  crossorigin: String as PropType<'anonymous' | 'use-credentials'>,
  preload: {
    type: String as PropType<'none' | 'metadata' | 'auto'>,
    default: 'metadata',
  },
  error: [Boolean, Object] as PropType<MediaError | boolean>,
  autoplay: Boolean,
  loop: Boolean,
  startAt: [Number, String],
  disabled: Boolean,
  hideBuffer: Boolean,
  bgColor: String,

  ...omit(makeVAudioControlsProps(), ['duration', 'buffer']),
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeRoundedProps(),
  ...makeThemeProps(),
}, 'VAudio')

export const VAudio = genericComponent<VAudioSlots>()({
  name: 'VAudio',

  props: makeVAudioProps(),

  emits: {
    loaded: (element: HTMLAudioElement) => true,
    ended: () => true,
    error: (value: MediaError | boolean) => true,
    'update:playing': (value: boolean) => true,
    'update:progress': (value: number) => true,
    'update:volume': (value: number) => true,
    'update:playbackRate': (value: number) => true,
    'update:error': (value: MediaError | boolean) => true,
  },

  setup (props, { emit, slots }) {
    const { themeClasses } = provideTheme(props)
    const { dimensionStyles } = useDimension(props)
    const { roundedClasses, roundedStyles } = useRounded(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(() => props.bgColor)

    const audioRef = shallowRef<HTMLAudioElement>()
    const containerRef = shallowRef<HTMLElement>()
    const controlsRef = shallowRef<VAudioControls>()

    const playing = useProxiedModel(props, 'playing')
    const progress = useProxiedModel(props, 'progress')
    const volume = useProxiedModel(props, 'volume', 100, v => Number(v ?? 100))
    const playbackRate = useProxiedModel(props, 'playbackRate')
    const error = useProxiedModel(props, 'error')

    const scrubbing = shallowRef(false)

    const context: AudioProvide = {
      media: audioRef,
      playing,
      playHooks: new Set(),
    }
    provide(VAudioSymbol, context)

    const {
      duration,
      buffered,
      waiting,
      play,
      pause,
      stop,
      seek,
      retry,
    } = useMedia(audioRef, props, {
      playing,
      progress,
      volume,
      playbackRate,
      error,
      scrubbing,
      onPlay: () => context.playHooks.forEach(hook => hook()),
      onLoaded: element => emit('loaded', element),
      onEnded: () => emit('ended'),
      onError: value => emit('error', value),
    })

    usePlayhead(audioRef, () => containerRef.value, { waiting, scrubbing })

    onBeforeUnmount(() => {
      context.graph?.audioContext.close()
    })

    useRender(() => {
      const controlsProps = VAudioControls.filterProps(omit(props, ['class', 'style', 'theme']))

      const isLoading = waiting.value && !error.value
      const hasError = !!error.value

      return (
        <div
          ref={ containerRef }
          class={[
            'v-audio',
            {
              'v-audio--playing': playing.value,
              'v-audio--loading': isLoading,
              'v-audio--error': hasError,
              'v-audio--scrubbing': scrubbing.value,
              'v-audio--disabled': props.disabled,
            },
            themeClasses.value,
            roundedClasses.value,
            backgroundColorClasses.value,
            props.class,
          ]}
          style={[
            dimensionStyles.value,
            roundedStyles.value,
            backgroundColorStyles.value,
            props.style,
          ]}
        >
          <audio
            ref={ audioRef }
            class="v-audio__native"
            src={ props.srcObject || props.type ? undefined : props.src }
            crossorigin={ props.crossorigin }
            preload={ props.preload }
            autoplay={ props.autoplay }
            loop={ props.loop }
            muted={ props.muted }
          >
            { props.src && props.type && (
              <source key="source" src={ props.src } type={ props.type } />
            )}
            { slots.sources?.() }
          </audio>

          <VAudioControls
            key="controls"
            { ...controlsProps }
            ref={ controlsRef }
            class="v-audio__controls"
            v-model:playing={ playing.value }
            v-model:volume={ volume.value }
            v-model:playbackRate={ playbackRate.value }
            progress={ progress.value }
            duration={ duration.value }
            buffer={ props.hideBuffer ? 0 : buffered.value }
            readonly={ props.readonly || props.disabled }
            onUpdate:progress={ (percent: number) => seek({ to: `${percent}%` }) }
            onDrag:start={ () => scrubbing.value = true }
            onDrag:end={ () => scrubbing.value = false }
            onClick:stop={ stop }
          >
            {{
              ...omit(slots, ['controls', 'loader', 'error', 'sources']),
              default: slots.controls,
            }}
          </VAudioControls>

          { hasError && (
            <div key="error" class="v-audio__error">
              { slots.error
                ? (
                  <VDefaultsProvider defaults={{ VIcon: { icon: '$warning' } }}>
                    { slots.error({ error: error.value }) }
                  </VDefaultsProvider>
                )
                : <VIcon icon="$warning" />
              }
            </div>
          )}

          { isLoading && (
            <div class="v-audio__loader">
              { slots.loader?.({ color: props.color, isActive: true }) ?? (
                <VProgressLinear
                  color={ props.color }
                  height={ 2 }
                  indeterminate
                />
              )}
            </div>
          )}
        </div>
      )
    })

    return forwardRefs({
      audio: audioRef,
      play,
      pause,
      stop,
      seek,
      retry,
    }, controlsRef)
  },
})

export type VAudio = InstanceType<typeof VAudio>
