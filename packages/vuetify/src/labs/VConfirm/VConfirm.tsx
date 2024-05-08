// Composables
import { useBackgroundColor } from '@/composables/color'
import { makeLocationProps, useLocation } from '@/composables/location'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeVariantProps } from '@/composables/variant'

// Utilities
import { computed, ref, toRef, watch } from 'vue'
import {
  VBtn,
  VList,
  VListItem,
  VListItemAction,
  VListItemTitle,
  VMenu,
  VTextField,
} from '../allComponents'
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVConfirmProps = propsFactory(
  {
    title: String,
    text: String,
    input: [String, Boolean],
    onSubmit: Function,
    onCancel: Function,
    inputProps: Object,
    ...makeLocationProps({ location: 'bottom' } as const),
    ...makeVariantProps(),
    ...makeThemeProps(),
  },
  'VConfirm',
)

export const VConfirm = genericComponent()({
  name: 'VConfirm',

  props: makeVConfirmProps(),

  setup (props, { slots }) {
    const input = ref('')
    const isActive = ref(false)

    const { themeClasses } = provideTheme(props)
    const { backgroundColorClasses, backgroundColorStyles } =
      useBackgroundColor(toRef(props, 'color'))
    const { locationStyles } = useLocation(props)
    watch(isActive, value =>
      value
        ? (input.value = typeof props.input === 'string' ? props.input : '')
        : '',
    )

    const showInput = computed(() => props.input || props.input !== false)

    function onSubmit () {
      isActive.value = false
      if (props.onSubmit) {
        props.onSubmit(props.input ? input.value : undefined)
      }
    }
    function onCancel () {
      isActive.value = false
      if (props.onCancel) {
        props.onCancel()
      }
    }

    useRender(() => (
      <VMenu
        v-model={ isActive.value }
        close-on-content-click={ !showInput.value }
        style={[locationStyles.value]}
      >
        <VList
          class={[themeClasses.value, backgroundColorClasses.value]}
          style={[backgroundColorStyles.value]}
        >
          <VListItem
            lines="one"
            v-slots={{
              title: () => (
                <VListItemTitle>
                  { !showInput.value ? (
                    props.text
                  ) : (
                    <VTextField
                      v-model={ input.value }
                      variant="solo-filled"
                      clearable
                      hide-details
                      minWidth="200"
                      label={ props.text }
                      { ...props.inputProps }
                      onKeydown={ (e: KeyboardEvent) =>
                        e.key === 'Enter' && onSubmit()
                      }
                    />
                  )}
                </VListItemTitle>
              ),
              append: () => (
                <VListItemAction>
                  { props.onCancel && (
                    <VBtn
                      key="btnCancel"
                      prependIcon="$close"
                      text="Cancel"
                      variant="text"
                      onClick={ onCancel }
                    />
                  )}
                  { props.onSubmit && (
                    <VBtn
                      key="btnSubmit"
                      prependIcon="$success"
                      text="OK"
                      variant="text"
                      onClick={ onSubmit }
                    />
                  )}
                </VListItemAction>
              ),
            }}
          ></VListItem>
        </VList>
      </VMenu>
    ))

    return {}
  },
})

export type VConfirm = InstanceType<typeof VConfirm>;
