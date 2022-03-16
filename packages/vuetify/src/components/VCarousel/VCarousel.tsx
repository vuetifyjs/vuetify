// Styles
import './VCarousel.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VProgressLinear } from '@/components/VProgressLinear'
import { VWindow } from '@/components/VWindow'

// Composables
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { convertToUnit, defineComponent, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import { onMounted, ref, watch } from 'vue'

export const VCarousel = defineComponent({
  name: 'VCarousel',

  props: {
    cycle: Boolean,
    delimiterIcon: {
      type: String,
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
    verticalDelimiters: [Boolean, String] as PropType<boolean | 'left' | 'right'>,
  },

  emits: {
    'update:modelValue': (val: any) => true,
  },

  setup (props, { slots }) {
    const model = useProxiedModel(props, 'modelValue')
    const { t } = useLocale()
    const windowRef = ref<VWindow>()

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
        showArrows
        mandatory="force"
      >
        {{
          default: slots.default,
          additional: ({ group }) => (
            <>
              { !props.hideDelimiters && (
                <div
                  v-model={ model.value }
                  class="v-carousel__controls"
                  style={{
                    left: props.verticalDelimiters === 'left' && props.verticalDelimiters ? 0 : 'auto',
                    right: props.verticalDelimiters === 'right' ? 0 : 'auto',
                  }}
                >
                  { group.items.value.map(item => (
                    <VBtn
                      class={['v-carousel__controls__item', { 'v-btn--selected': group.isSelected(item.id) }]}
                      color={ group.isSelected(item.id) ? 'surface' : 'surface-variant' }
                      aria-label={ t('$vuetify.carousel.ariaLabel.delimiter') }
                      icon={ props.delimiterIcon }
                      size="small"
                      onClick={ () => group.select(item.id, true) }
                    />
                  ))}
                </div>
              )}

              { props.progress && (
                <VProgressLinear
                  class="v-carousel__progress"
                  color={ typeof props.progress === 'string' ? props.progress : undefined }
                  modelValue={ (+model.value + 1) / group.items.value.length * 100 }
                />
              )}
            </>
          ),
        }}
      </VWindow>
    ))
  },
})
