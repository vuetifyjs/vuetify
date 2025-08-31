// Styles
import './VCommandPaletteSearch.scss'

// Components
import { VTextField } from '@/components/VTextField'
import { makeVTextFieldProps, VTextFieldSlots } from '@/components/VTextField/VTextField'

// Composables
import { useLocale } from '@/composables'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { VIconBtn } from '@/labs/VIconBtn'
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVCommandPaletteSearchProps = propsFactory({
  showBack: Boolean,
  backIcon: {
    type: String,
    default: '$prev',
  },
  ...makeVTextFieldProps({
    autofocus: true,
    bgColor: 'transparent',
    hideDetails: true,
    flat: true,
    placeholder: '$vuetify.command.placeholder',
    prependInnerIcon: '$search',
    variant: 'solo' as const,
  }),
}, 'VCommandPaletteSearch')

export type VCommandPaletteSearchSlots = {
  append: VTextFieldSlots['append-inner']
  back: {
    props: {
      onClick: (e: Event) => void
    }
  }
}

export const VCommandPaletteSearch = genericComponent<VCommandPaletteSearchSlots>()({
  name: 'VCommandPaletteSearch',

  props: makeVCommandPaletteSearchProps(),

  emits: {
    'update:modelValue': (value: string) => true,
    'click:back': () => true,
  },

  setup (props, { attrs, emit, slots }) {
    const { t } = useLocale()
    const search = useProxiedModel(props, 'modelValue')

    useRender(() => {
      const backButtonProps = {
        ariaLabel: t('$vuetify.command.navigateBack'),
        onClick: () => emit('click:back'),
      }

      const textFieldProps = {
        ...attrs,
        ...VTextField.filterProps(props),
        placeholder: t(props.placeholder),
        prependInnerIcon: props.showBack ? undefined : props.prependInnerIcon,
      }

      return (
        <VTextField
          class="v-command-palette-search"
          { ...textFieldProps }
          v-model={ search.value }
          v-slots={{
            'append-inner': slots.append,
            'prepend-inner': props.showBack
              ? () => slots.back?.({ props: backButtonProps }) ?? (
                <VIconBtn
                  icon={ props.backIcon }
                  { ...backButtonProps }
                />
              )
              : undefined,
          }}
        />
      )
    })
  },
})

export type VCommandPaletteSearch = InstanceType<typeof VCommandPaletteSearch>
