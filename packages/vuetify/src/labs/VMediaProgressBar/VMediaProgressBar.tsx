// Styles
import './VMediaProgressBar.sass'

// Composables
import { useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { computed, shallowRef, toRef } from 'vue'
import { clamp, convertToUnit, formatTime, genericComponent, isObject, keyValues, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export type VMediaProgressBarChapter = { start: number, title?: string }

export type VMediaProgressBarSlots = {
  default: never
  tooltip: { time: string, chapter: string | undefined, seconds: number }
}

export const makeVMediaProgressBarProps = propsFactory({
  modelValue: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 0,
  },
  buffer: {
    type: Number,
    default: 0,
  },
  chapters: {
    type: Array as PropType<readonly VMediaProgressBarChapter[]>,
    default: () => [],
  },
  chapterGap: {
    type: [Number, String],
    default: 2,
  },
  step: {
    type: Number,
    default: 5,
  },
  height: {
    type: [Number, String],
    default: 4,
  },
  color: String,
  bgColor: String,
  disabled: Boolean,
  readonly: Boolean,
  thumb: Boolean,
  tooltip: {
    type: [Boolean, Object] as PropType<boolean | {
      location?: 'top' | 'bottom'
      offset?: number | string
    }>,
    default: true,
  },

  ...makeComponentProps(),
  ...makeRoundedProps(),
  ...makeThemeProps(),
}, 'VMediaProgressBar')

export const VMediaProgressBar = genericComponent<VMediaProgressBarSlots>()({
  name: 'VMediaProgressBar',

  props: makeVMediaProgressBarProps(),

  emits: {
    'update:modelValue': (value: number) => true,
    start: (value: number) => true,
    end: (value: number) => true,
  },

  setup (props, { emit, slots }) {
    const { themeClasses } = provideTheme(props)
    const { t } = useLocale()
    const { roundedClasses, roundedStyles } = useRounded(props)
    const { textColorClasses, textColorStyles } = useTextColor(() => props.color)
    const { textColorClasses: bgColorClasses, textColorStyles: bgColorStyles } = useTextColor(() => props.bgColor)

    const model = useProxiedModel(props, 'modelValue')

    const rootRef = shallowRef<HTMLElement>()
    const hover = shallowRef<number | null>(null)
    const dragging = shallowRef(false)

    const interactive = toRef(() => !props.disabled && !props.readonly && props.max > 0)
    const percent = (seconds: number) => props.max > 0 ? clamp(seconds / props.max * 100, 0, 100) : 0

    const chapterStarts = computed(() => props.chapters
      .map(c => c.start)
      .filter(start => start > 0 && start < props.max)
    )

    function chapterAt (seconds: number) {
      return props.chapters.filter(c => c.start <= seconds).pop()?.title
    }

    const maskStyles = computed(() => {
      if (!chapterStarts.value.length) return undefined

      const half = convertToUnit(Number(props.chapterGap) / 2)
      const stops = chapterStarts.value.map(start => {
        const at = `${percent(start)}%`
        return `#000 calc(${at} - ${half}), transparent calc(${at} - ${half}) calc(${at} + ${half}), #000 calc(${at} + ${half})`
      })
      const mask = `linear-gradient(90deg, #000 0, ${stops.join(', ')}, #000 100%)`

      return { maskImage: mask, WebkitMaskImage: mask }
    })

    function ratioAt (e: PointerEvent) {
      const rect = rootRef.value!.getBoundingClientRect()
      return rect.width ? clamp((e.clientX - rect.left) / rect.width, 0, 1) : 0
    }

    function commit (seconds: number) {
      model.value = clamp(seconds, 0, props.max)
    }

    function onPointerdown (e: PointerEvent) {
      if (!interactive.value || e.button !== 0) return

      rootRef.value!.setPointerCapture(e.pointerId)
      dragging.value = true
      emit('start', model.value)
      commit(ratioAt(e) * props.max)
    }

    function onPointermove (e: PointerEvent) {
      if (!interactive.value) return

      hover.value = ratioAt(e)
      if (dragging.value) commit(hover.value * props.max)
    }

    function onPointerup (e: PointerEvent) {
      if (e.pointerType !== 'mouse') hover.value = null
      if (!dragging.value) return

      dragging.value = false
      emit('end', model.value)
    }

    function onKeydown (e: KeyboardEvent) {
      if (!interactive.value) return

      const { left, right, up, down, pageup, pagedown, home, end } = keyValues
      const step = props.step * (e.shiftKey ? 10 : 1)
      const page = props.max / 10
      const delta = {
        [right]: step,
        [up]: step,
        [left]: -step,
        [down]: -step,
        [pageup]: page,
        [pagedown]: -page,
      }[e.key]

      if (delta != null) commit(model.value + delta)
      else if (e.key === home) commit(0)
      else if (e.key === end) commit(props.max)
      else return

      e.preventDefault()
    }

    const valueText = computed(() => {
      const time = `${formatTime(model.value)} / ${formatTime(props.max)}`
      const chapter = chapterAt(model.value)
      return chapter ? `${time}, ${chapter}` : time
    })

    useRender(() => {
      const hoverSeconds = (hover.value ?? 0) * props.max
      const hoverChapter = chapterAt(hoverSeconds)
      const tooltip = isObject(props.tooltip) ? props.tooltip : {}
      const hasTooltip = !!props.tooltip && hover.value !== null

      return (
        <div
          ref={ rootRef }
          class={[
            'v-media-progress-bar',
            {
              'v-media-progress-bar--disabled': props.disabled,
              'v-media-progress-bar--dragging': dragging.value,
              'v-media-progress-bar--interactive': interactive.value,
              'v-media-progress-bar--tooltip-bottom': tooltip.location === 'bottom',
            },
            themeClasses.value,
            textColorClasses.value,
            props.class,
          ]}
          style={[
            {
              '--v-media-progress-bar-position': `${percent(model.value)}%`,
              '--v-media-progress-bar-buffer': `${percent(props.buffer)}%`,
              '--v-media-progress-bar-height': convertToUnit(props.height),
              '--v-media-progress-bar-tooltip-offset': convertToUnit(tooltip.offset),
            },
            textColorStyles.value,
            props.style,
          ]}
          role="slider"
          aria-orientation="horizontal"
          aria-label={ t('$vuetify.media.seek') }
          tabindex={ props.disabled ? -1 : 0 }
          aria-valuemin={ 0 }
          aria-valuemax={ Math.round(props.max) }
          aria-valuenow={ Math.round(model.value) }
          aria-valuetext={ valueText.value }
          aria-disabled={ props.disabled || undefined }
          aria-readonly={ props.readonly || undefined }
          onPointerdown={ onPointerdown }
          onPointermove={ onPointermove }
          onPointerup={ onPointerup }
          onPointercancel={ onPointerup }
          onPointerleave={ () => !dragging.value && (hover.value = null) }
          onKeydown={ onKeydown }
        >
          <div
            class={['v-media-progress-bar__track', roundedClasses.value]}
            style={[roundedStyles.value, maskStyles.value]}
          >
            { slots.default?.() ?? (
              <>
                <div class={['v-media-progress-bar__background', bgColorClasses.value]} style={ bgColorStyles.value } />
                <div class="v-media-progress-bar__buffer" />
                <div class="v-media-progress-bar__fill" />
              </>
            )}
          </div>

          { props.thumb && (
            <div key="thumb" class="v-media-progress-bar__thumb" />
          )}

          { hasTooltip && (
            <div
              key="tooltip"
              class="v-media-progress-bar__tooltip"
              style={{ left: `${hover.value! * 100}%` }}
            >
              { slots.tooltip?.({
                time: formatTime(hoverSeconds),
                chapter: hoverChapter,
                seconds: hoverSeconds,
              }) ?? (
                <>
                  { hoverChapter && (
                    <div key="chapter" class="v-media-progress-bar__chapter">{ hoverChapter }</div>
                  )}
                  { formatTime(hoverSeconds) }
                </>
              )}
            </div>
          )}
        </div>
      )
    })

    return {}
  },
})

export type VMediaProgressBar = InstanceType<typeof VMediaProgressBar>
