// Styles
import './VAudioWaveform.sass'

// Components
import { makeVMediaProgressBarProps, VMediaProgressBar } from '@/labs/VMediaProgressBar/VMediaProgressBar'

// Composables
import { useTextColor } from '@/composables/color'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useElementSize } from '@/composables/resizeObserver'

// Utilities
import { computed, inject, onBeforeUnmount, shallowRef, toRef, watch } from 'vue'
import { decodePeaks, downsamplePeaks, normalizePeaks } from './peaks'
import { VAudioSymbol } from './shared'
import {
  clamp,
  consoleWarn,
  easingPatterns,
  genericComponent,
  IN_BROWSER,
  isNullOrUndefined,
  omit,
  PREFERS_REDUCED_MOTION,
  propsFactory,
  templateRef,
  useRender,
} from '@/util'

// Types
import type { PropType } from 'vue'
import type { SampleStrategy } from './peaks'
import type { VMediaProgressBarSlots } from '@/labs/VMediaProgressBar/VMediaProgressBar'

export type VAudioWaveformSlots = {
  tooltip: VMediaProgressBarSlots['tooltip']
}

const RISE_DURATION = 400
const RISE_STAGGER = 400
const LIVE_INTERVAL = 66

export const makeVAudioWaveformProps = propsFactory({
  peaks: Array as PropType<readonly number[]>,
  peaksSource: Blob,
  bars: [Number, String],
  barWidth: {
    type: [Number, String],
    default: 2,
  },
  barGap: {
    type: [Number, String],
    default: 1,
  },
  barRadius: {
    type: [Number, String],
    default: 1,
  },
  normalize: {
    type: Boolean,
    default: true,
  },
  sampleStrategy: {
    type: String as PropType<SampleStrategy>,
    default: 'peak',
  },
  mirror: [Boolean, Number, String],
  live: Boolean,

  ...omit(makeVMediaProgressBarProps({ height: 32 }), ['variant']),
}, 'VAudioWaveform')

export const VAudioWaveform = genericComponent<VAudioWaveformSlots>()({
  name: 'VAudioWaveform',

  props: makeVAudioWaveformProps(),

  emits: {
    'update:modelValue': (value: number) => true,
    'drag:start': (value: number) => true,
    'drag:end': (value: number) => true,
  },

  setup (props, { emit, slots }) {
    const audio = inject(VAudioSymbol, null)
    const model = useProxiedModel(props, 'modelValue')
    const { textColorClasses: bgColorClasses, textColorStyles: bgColorStyles } = useTextColor(() => props.bgColor)
    const resizeRef = templateRef()
    const { width } = useElementSize(() => resizeRef.el)

    const decoded = shallowRef<number[]>()
    const history = shallowRef<number[]>([])

    const barWidth = toRef(() => Math.max(0.5, Number(props.barWidth) || 1))
    const barGap = toRef(() => Math.max(0, Number(props.barGap) || 0))
    const height = toRef(() => Math.max(1, Number(props.height) || 1))
    const mirror = toRef(() => props.mirror === true ? 1 : clamp(Number(props.mirror) || 0, 0, 1))

    const barCount = toRef(() => !isNullOrUndefined(props.bars)
      ? Math.max(1, Number(props.bars) || 1)
      : Math.floor((width.value + barGap.value) / (barWidth.value + barGap.value)))

    const bars = computed(() => {
      const source = props.live ? history.value : props.peaks ?? decoded.value
      if (!source?.length) return Array.from({ length: barCount.value }, () => 0)

      const fitted = source.length <= barCount.value
        ? source
        : props.live
          ? source.slice(-barCount.value)
          : downsamplePeaks(source, barCount.value, props.sampleStrategy)

      return props.normalize && !props.live
        ? normalizePeaks(fitted)
        : fitted.map(v => clamp(v, 0, 1))
    })

    watch(() => props.max > 0 && !props.live && !props.peaks?.length && props.peaksSource, (source, _, onCleanup) => {
      decoded.value = undefined
      if (!IN_BROWSER || !source) return

      const controller = new AbortController()
      onCleanup(() => controller.abort())
      decodePeaks(source, {
        buckets: 1024,
        strategy: props.sampleStrategy,
        duration: props.max,
        signal: controller.signal,
        onProgress: peaks => {
          decoded.value = peaks
        },
      }).then(
        peaks => {
          if (peaks) {
            decoded.value = peaks
          } else {
            consoleWarn('VAudioWaveform: peaks-source not decoded. Formats other than MP3 and AAC decode only up to 30 minutes.')
          }
        },
        error => {
          if (controller.signal.aborted) return

          consoleWarn(`VAudioWaveform: peaks-source not decoded. ${error}`)
        },
      )
    }, { immediate: true })

    watch(() => props.max, max => {
      if (!max) history.value = []
    })

    function connectAnalyser () {
      const el = audio?.media.value
      if (!props.live || !audio || !el) return

      if (!audio.graph) {
        // a cross-origin element without CORS taints the graph and goes silent
        if (!el.crossOrigin && new URL(el.currentSrc, location.href).origin !== location.origin) {
          consoleWarn('VAudioWaveform: live on a cross-origin src requires the crossorigin prop on v-audio')
          return
        }

        const audioContext = new AudioContext()
        const analyser = audioContext.createAnalyser()
        audioContext.createMediaElementSource(el).connect(analyser)
        analyser.connect(audioContext.destination)
        audio.graph = { audioContext, analyser, buffer: new Float32Array(analyser.fftSize) }
      }

      if (audio.graph.audioContext.state === 'suspended') {
        audio.graph.audioContext.resume()
      }
    }

    audio?.playHooks.add(connectAnalyser)

    let liveFrame = -1
    let lastPush = 0

    function sampleLevel (now: number) {
      const graph = audio?.graph
      if (graph) {
        graph.analyser.getFloatTimeDomainData(graph.buffer)
        const level = graph.buffer.reduce((max, value) => Math.max(max, Math.abs(value)), 0)

        // without a fixed `bars` the history is capped at 512, wider waveforms show an empty left edge
        const count = Math.max(1, Number(props.bars) || 512)
        if (now - lastPush >= LIVE_INTERVAL || history.value.length !== count) {
          const next = history.value.length === count ? history.value.slice(1) : Array(count - 1).fill(0)
          next.push(level)
          history.value = next
          lastPush = now
        }

        const shift = Math.min(1, (now - lastPush) / LIVE_INTERVAL)
        resizeRef.el?.style.setProperty('--v-audio-waveform-shift', String(shift))
      }
      liveFrame = requestAnimationFrame(sampleLevel)
    }

    watch(() => props.live && !!audio?.playing.value, active => {
      if (!IN_BROWSER) return

      cancelAnimationFrame(liveFrame)
      if (!active) return

      connectAnalyser()
      liveFrame = requestAnimationFrame(sampleLevel)
    }, { immediate: true })

    const heights = shallowRef<number[]>([])
    let riseFrame = -1
    let revealed = false

    watch(bars, target => {
      if (IN_BROWSER) {
        cancelAnimationFrame(riseFrame)
      }
      const from = heights.value.length === target.length
        ? heights.value
        : revealed ? undefined : target.map(() => 0)
      revealed = target.some(value => value > 0)

      if (!from || props.live || !IN_BROWSER || PREFERS_REDUCED_MOTION()) {
        heights.value = target
        return
      }

      const rising = target.flatMap((value, index) => !from[index] && value ? [index] : [])
      const delays = target.map(() => 0)
      rising.forEach((index, rank) => {
        delays[index] = rank / rising.length * RISE_STAGGER
      })

      const start = performance.now()
      function step (now: number) {
        let running = false
        heights.value = target.map((to, index) => {
          const progress = clamp((now - start - delays[index]) / RISE_DURATION, 0, 1)
          running ||= progress < 1
          return from![index] + (to - from![index]) * easingPatterns.easeOutCubic(progress)
        })
        if (running) {
          riseFrame = requestAnimationFrame(step)
        }
      }
      riseFrame = requestAnimationFrame(step)
    }, { immediate: true })

    onBeforeUnmount(() => {
      cancelAnimationFrame(riseFrame)
      cancelAnimationFrame(liveFrame)
      audio?.playHooks.delete(connectAnalyser)
    })

    const viewBox = computed(() => {
      const contentWidth = bars.value.length * barWidth.value + Math.max(0, bars.value.length - 1) * barGap.value
      return { width: Math.max(contentWidth, 1), height: height.value }
    })

    // one path, not a rect per bar: restyling hundreds of rects on every progress frame dominates the frame
    const path = computed(() => {
      const boxHeight = viewBox.value.height
      const baseline = boxHeight / (1 + mirror.value)
      const thickness = barWidth.value
      const scale = width.value ? width.value / viewBox.value.width : 1
      const renderedWidth = thickness * scale
      // rounded corners on narrow bars are invisible and multiply the path's raster cost
      const radius = renderedWidth < 4 ? 0 : Math.min(Number(props.barRadius) || 0, renderedWidth / 2)
      let d = ''

      heights.value.forEach((level, index) => {
        const barHeight = Math.max(1, level * baseline)
        const x = index * (thickness + barGap.value)
        const y = mirror.value ? baseline - barHeight : (boxHeight - barHeight) / 2
        const ry = Math.min(radius, barHeight / 2)
        const rx = ry / scale

        d += ry > 0
          ? `M${x + rx} ${y}h${thickness - 2 * rx}a${rx} ${ry} 0 0 1 ${rx} ${ry}v${barHeight - 2 * ry}a${rx} ${ry} 0 0 1 ${-rx} ${ry}` +
            `h${2 * rx - thickness}a${rx} ${ry} 0 0 1 ${-rx} ${-ry}v${2 * ry - barHeight}a${rx} ${ry} 0 0 1 ${rx} ${-ry}z`
          : `M${x} ${y}h${thickness}v${barHeight}h${-thickness}z`
      })

      return d
    })

    useRender(() => {
      const progressBarProps = VMediaProgressBar.filterProps(props)
      const layers = props.buffer > 0
        ? ['track', 'buffer', 'progress'] as const
        : ['track', 'progress'] as const

      return (
        <VMediaProgressBar
          ref={ resizeRef }
          { ...progressBarProps }
          class={[
            'v-audio-waveform',
            { 'v-audio-waveform--live': props.live },
            props.class,
          ]}
          style={[
            { '--v-audio-waveform-step': barWidth.value + barGap.value },
            props.style,
          ]}
          modelValue={ model.value }
          disabled={ props.disabled && !props.live }
          readonly={ props.readonly || props.live }
          tooltip={ !props.live && props.tooltip }
          onUpdate:modelValue={ (value: number) => model.value = value }
          onDrag:start={ (value: number) => emit('drag:start', value) }
          onDrag:end={ (value: number) => emit('drag:end', value) }
        >
          {{
            default: () => (
              <svg
                class="v-audio-waveform__svg"
                viewBox={ `0 0 ${viewBox.value.width} ${viewBox.value.height}` }
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                { layers.map(layer => (
                  <g
                    key={ layer }
                    class={[`v-audio-waveform__${layer}`, layer === 'track' && bgColorClasses.value]}
                    style={ layer === 'track' ? bgColorStyles.value : undefined }
                  >
                    <path class="v-audio-waveform__bars" d={ path.value } />
                    { !!mirror.value && (
                      <g
                        class="v-audio-waveform__mirror"
                        transform={ `translate(0, ${viewBox.value.height}) scale(1, ${-mirror.value})` }
                      >
                        <path class="v-audio-waveform__bars" d={ path.value } />
                      </g>
                    )}
                  </g>
                ))}
              </svg>
            ),
            tooltip: slots.tooltip,
          }}
        </VMediaProgressBar>
      )
    })

    return {}
  },
})

export type VAudioWaveform = InstanceType<typeof VAudioWaveform>
