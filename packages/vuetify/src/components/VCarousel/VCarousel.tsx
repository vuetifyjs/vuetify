// Styles
import './VCarousel.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VProgressLinear } from '@/components/VProgressLinear'
import { VWindow } from '@/components/VWindow'

// Composables
import { IconValue } from '@/composables/icons'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { convertToUnit, genericComponent, useRender } from '@/util'
import { onMounted, ref, watch } from 'vue'

// Types
import type { GroupProvide } from '@/composables/group'
import type { PropType } from 'vue'
import type { VWindowSlots } from '../VWindow/VWindow'

export const VCarousel = genericComponent<VWindowSlots>()({
  name: 'VCarousel',

  props: {
    color: String,
    cycle: Boolean,
    delimiterIcon: {
      type: IconValue,
      default: '$delimiter',
    },
    height: {
      type: [Number, String],
      default: 500,
    },
    hideDelimiters: Boolean,
    hideDelimiterBackground: Boolean,
    interval: {
      type: [Number, String],
      default: 6000,
      validator: (value: string | number) => value > 0,
    },
    modelValue: null,
    progress: [Boolean, String],
    showArrows: {
      type: [Boolean, String],
      default: true,
      validator: (v: any) => typeof v === 'boolean' || v === 'hover',
    },
    verticalDelimiters: [Boolean, String] as PropType<boolean | 'left' | 'right'>,
  },

  emits: {
    'update:modelValue': (val: any) => true,
  },

  setup (props, { slots }) {
    const model = useProxiedModel(props, 'modelValue')
    const { t } = useLocale()
    const windowRef = ref<typeof VWindow>()

    let slideTimeout = -1
    watch(model, restartTimeout)
    watch(() => props.interval, restartTimeout)
    watch(() => props.cycle, val => {
      if (val) restartTimeout()
      else window.clearTimeout(slideTimeout)
    })

    onMounted(startTimeout)

    function startTimeout () {
      if (!props.cycle || !windowRef.value) return

      slideTimeout = window.setTimeout(windowRef.value.group.next, +props.interval > 0 ? +props.interval : 6000)
    }

    function restartTimeout () {
      window.clearTimeout(slideTimeout)
      window.requestAnimationFrame(startTimeout)
    }

    useRender(() => (
      <VWindow
        ref={ windowRef }
        v-model={ model.value }
        class={[
          'v-carousel',
          {
            'v-carousel--hide-delimiter-background': props.hideDelimiterBackground,
            'v-carousel--vertical-delimiters': props.verticalDelimiters,
          },
        ]}
        style={{ height: convertToUnit(props.height) }}
        continuous
        mandatory="force"
        showArrows={ props.showArrows }
      >
        {{
          default: slots.default,
          additional: ({ group }: { group: GroupProvide }) => (
            <>
              { !props.hideDelimiters && (
                <div
                  class="v-carousel__controls"
                  style={{
                    left: props.verticalDelimiters === 'left' && props.verticalDelimiters ? 0 : 'auto',
                    right: props.verticalDelimiters === 'right' ? 0 : 'auto',
                  }}
                >
                  { group.items.value.length > 0 && (
                    <VDefaultsProvider
                      defaults={{
                        VBtn: {
                          color: props.color,
                          icon: props.delimiterIcon,
                          size: 'x-small',
                          variant: 'text',
                        },
                      }}
                      scoped
                    >
                      { group.items.value.map((item, index) => {
                        const props = {
                          'aria-label': t('$vuetify.carousel.ariaLabel.delimiter', index + 1, group.items.value.length),
                          class: [group.isSelected(item.id) && 'v-btn--active'],
                          onClick: () => group.select(item.id, true),
                        }

                        return slots.item
                          ? slots.item({ props, item })
                          : (<VBtn { ...item } { ...props } />)
                      })}
                    </VDefaultsProvider>
                  )}
                </div>
              )}

              { props.progress && (
                <VProgressLinear
                  class="v-carousel__progress"
                  color={ typeof props.progress === 'string' ? props.progress : undefined }
                  modelValue={ (group.getItemIndex(model.value) + 1) / group.items.value.length * 100 }
                />
              )}
            </>
          ),
          prev: slots.prev,
          next: slots.next,
        }}
      </VWindow>
    ))

    return {}
  },
})

export type VCarousel = InstanceType<typeof VCarousel>
