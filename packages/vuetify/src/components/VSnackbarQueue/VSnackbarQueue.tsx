// Components
import { VBtn } from '@/components/VBtn'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { makeVSnackbarProps, VSnackbar } from '@/components/VSnackbar/VSnackbar'

// Composables
import { useSnackbarQueue } from './queue'
import { useLocale } from '@/composables/locale'

// Utilities
import { computed, nextTick, shallowRef, toRef, watch } from 'vue'
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { PropType, Ref, VNodeProps } from 'vue'
import type { GenericProps } from '@/util'

export type VSnackbarQueueSlots<T extends string | SnackbarMessage> = {
  item: { item: T }
  text: { item: T }
  actions: {
    item: T
    props: {
      onClick: () => void
    }
  }
}

export type SnackbarMessage =
  | string
  | (Omit<
    VSnackbar['$props'],
    | 'modelValue'
    | 'onUpdate:modelValue'
    | 'activator'
    | 'activatorProps'
    | 'closeDelay'
    | 'openDelay'
    | 'openOnClick'
    | 'openOnFocus'
    | 'openOnHover'
    | 'style'
    | '$children'
    | 'v-slots'
    | `v-slot:${string}`
    | keyof VNodeProps
  > & { style?: any })

export type SnackbarQueueItem = {
  id: number
  item: Exclude<SnackbarMessage, string>
  active: Ref<boolean>
}

export const makeVSnackbarQueueProps = propsFactory({
  // TODO: Port this to Snackbar on dev
  closable: [Boolean, String],
  closeText: {
    type: String,
    default: '$vuetify.dismiss',
  },
  modelValue: {
    type: Array as PropType<readonly SnackbarMessage[]>,
    default: () => [],
  },
  totalVisible: {
    type: [Number, String],
    default: 1,
  },
  gap: {
    type: [Number, String],
    default: 8,
  },
  ...omit(makeVSnackbarProps(), ['modelValue']),
}, 'VSnackbarQueue')

export const VSnackbarQueue = genericComponent<new <T extends readonly SnackbarMessage[]> (
  props: {
    modelValue?: T
    'onUpdate:modelValue'?: (val: T) => void
  },
  slots: VSnackbarQueueSlots<T[number]>,
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VSnackbarQueue',

  inheritAttrs: false,

  props: makeVSnackbarQueueProps(),

  emits: {
    'update:modelValue': (val: SnackbarMessage[]) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const { t } = useLocale()
    useSnackbarQueue(props)

    let _lastId = 0
    const visibleItems = shallowRef<SnackbarQueueItem[]>([])
    const limit = toRef(() => Number(props.totalVisible))

    watch(() => props.modelValue.length, showNext)

    function showNext () {
      visibleItems.value = visibleItems.value.filter(x => x.active.value)

      if (visibleItems.value.length >= limit.value || !props.modelValue.length) return

      const [next, ...rest] = props.modelValue
      emit('update:modelValue', rest)

      const newItem: SnackbarQueueItem = {
        id: _lastId++,
        item: typeof next === 'string' ? { text: next } : next,
        active: shallowRef(true),
      }
      visibleItems.value.unshift(newItem)
      nextTick(() => newItem.active.value = true)
    }

    const btnProps = computed(() => ({
      color: typeof props.closable === 'string' ? props.closable : undefined,
      text: t(props.closeText),
    }))

    useRender(() => {
      const hasActions = !!(props.closable || slots.actions)
      const { modelValue: _, ...snackbarProps } = VSnackbar.filterProps(props as any)

      return (
        <>
          { visibleItems.value.map(({ id, item, active }) => (
            slots.item
              ? (
                <VDefaultsProvider defaults={{ VSnackbar: item }}>
                  { slots.item({ item }) }
                </VDefaultsProvider>
              ) : (
                <VSnackbar
                  key={ id }
                  { ...attrs }
                  { ...snackbarProps }
                  { ...item }
                  v-model={ active.value }
                  onAfterLeave={ showNext }
                >
                  {{
                    text: slots.text ? () => slots.text?.({ item }) : undefined,
                    actions: hasActions ? () => (
                      <>
                        { !slots.actions ? (
                          <VBtn
                            { ...btnProps.value }
                            onClick={ () => active.value = false }
                          />
                        ) : (
                          <VDefaultsProvider defaults={{ VBtn: btnProps.value }}>
                            { slots.actions({
                              item,
                              props: { onClick: () => active.value = false },
                            })}
                          </VDefaultsProvider>
                        )}
                      </>
                    ) : undefined,
                  }}
                </VSnackbar>
              )
          ))}
        </>
      )
    })
  },
})

export type VSnackbarQueue = InstanceType<typeof VSnackbarQueue>
