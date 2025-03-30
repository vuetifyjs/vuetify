// Components
import { VScrollYReverseTransition } from '@/components/transitions'
import { VAvatar } from '@/components/VAvatar'
import { VListItem } from '@/components/VList/VListItem'
import { makeVTooltipProps, VTooltip } from '@/components/VTooltip/VTooltip'

// Utilities
import { computed } from 'vue'
import { genericComponent, pick, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VPieSeries } from './types'

export type VPieTooltipSlots = {
  default: { segment: VPieSeries }
}

export const makeVPieTooltipProps = propsFactory({
  segment: {
    type: Object as PropType<VPieSeries | null>,
    default: null,
  },
  titleFormat: {
    type: [String, Function] as PropType<string | ((segment: VPieSeries) => string)>,
    default: '[title]',
  },
  subtitleFormat: {
    type: [String, Function] as PropType<string | ((segment: VPieSeries) => string)>,
    default: '[value]',
  },
  ...pick(makeVTooltipProps(), [
    'modelValue',
    'target',
  ]),
}, 'VPieTooltip')

export const VPieTooltip = genericComponent<VPieTooltipSlots>()({
  name: 'VPieTooltip',

  props: makeVPieTooltipProps(),

  setup (props, { slots }) {
    function formatTextTemplate (template: string, segment?: VPieSeries) {
      return segment
        ? template
          .replaceAll('[title]', segment.title)
          .replaceAll('[value]', String(segment.value))
        : undefined
    }

    const tooltipTitleFormatFunction = computed(() => (segment: VPieSeries) => {
      return typeof props.titleFormat === 'function'
        ? props.titleFormat(segment)
        : formatTextTemplate(props.titleFormat, segment)
    })

    const tooltipSubtitleFormatFunction = computed(() => (segment: VPieSeries) => {
      return typeof props.subtitleFormat === 'function'
        ? props.subtitleFormat(segment)
        : formatTextTemplate(props.subtitleFormat, segment)
    })

    return () => (
      <VTooltip
        absolute={ false }
        offset={ 16 }
        model-value={ props.modelValue }
        target={ props.target }
        content-class="v-pie__tooltip-content"
      >
        { !!props.segment && (
          slots.default?.({ segment: props.segment }) ?? (
            <VScrollYReverseTransition duration={ 150 } mode="out-in">
              <VListItem
                key={ props.segment.id }
                class="px-0"
                density="compact"
                style="zoom: 0.88"
                title={ tooltipTitleFormatFunction.value(props.segment) }
                subtitle={ tooltipSubtitleFormatFunction.value(props.segment) }
                v-slots={{
                  prepend: () => (
                    <VAvatar
                      color={ props.segment!.color }
                      size="28"
                      border="thin opacity-25"
                    >
                      { !!props.segment!.pattern && (
                        <svg height="40" width="40">
                          <circle r="40" fill={ props.segment!.pattern } />
                        </svg>
                      )}
                    </VAvatar>
                  ),
                }}
              />
            </VScrollYReverseTransition>
          )
        )}
      </VTooltip>
    )
  },
})

export type VPieTooltip = InstanceType<typeof VPieTooltip>
