// Styles
import './VCarousel.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VProgressLinear } from '@/components/VProgressLinear'
import { makeVWindowProps, VWindow } from '@/components/VWindow/VWindow'

// Composables
import { IconValue } from '@/composables/icons'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { onMounted, ref, watch } from 'vue'
import { convertToUnit, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VWindowSlots } from '@/components/VWindow/VWindow'
import type { GroupProvide } from '@/composables/group'
import type { GenericProps } from '@/util'

export const makeVCarouselProps = propsFactory({
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
    validator: (value: string | number) => Number(value) > 0,
  },
  progress: [Boolean, String],
  verticalDelimiters: [Boolean, String] as PropType<boolean | 'left' | 'right'>,

  ...makeVWindowProps({
    continuous: true,
    mandatory: 'force' as const,
    showArrows: true,
  }),
}, 'VCarousel')

type VCarouselSlots = VWindowSlots & {
  item: {
    props: Record<string, any>
    item: {
      id: number
      value: unknown
      disabled: boolean | undefined
    }
  }
}

export const VCarousel = genericComponent<new <T>(
  props: {
    modelValue?: T
    'onUpdate:modelValue'?: (value: T) => void
  },
  slots: VCarouselSlots,
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VCarousel',

  props: makeVCarouselProps(),

  emits: {
    'update:modelValue': (value: any) => true,
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

      slideTimeout = window.setTimeout(
        windowRef.value.group.next,
        Number(props.interval) > 0 ? Number(props.interval) : 6000
      )
    }

    function restartTimeout () {
      window.clearTimeout(slideTimeout)
      window.requestAnimationFrame(startTimeout)
    }

    useRender(() => {
      const windowProps = VWindow.filterProps(props)

      return (
        <VWindow
          ref={ windowRef }
          { ...windowProps }
          v-model={ model.value }
          class={[
            'v-carousel',
            {
              'v-carousel--hide-delimiter-background': props.hideDelimiterBackground,
              'v-carousel--vertical-delimiters': props.verticalDelimiters,
            },
            props.class,
          ]}
          style={[
            { height: convertToUnit(props.height) },
            props.style,
          ]}
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
                            id: `carousel-item-${item.id}`,
                            'aria-label': t('$vuetify.carousel.ariaLabel.delimiter', index + 1, group.items.value.length),
                            class: [
                              'v-carousel__controls__item',
                              group.isSelected(item.id) && 'v-btn--active',
                            ],
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
      )
    })

    return {}
  },
})

export type VCarousel = InstanceType<typeof VCarousel>
