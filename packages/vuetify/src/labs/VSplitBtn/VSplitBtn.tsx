// Styles
import './VSplitBtn.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { makeVBtnGroupProps, VBtnGroup } from '@/components/VBtnGroup/VBtnGroup'
import { VIcon } from '@/components/VIcon'
import { VMenu } from '@/components/VMenu'

// Composables
import { IconValue } from '@/composables/icons'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export type VSplitBtnSlots = {
  default: never
  menu: never
}

export const makeVSplitBtnProps = propsFactory({
  disabled: Boolean,
  icon: IconValue,
  loading: [Boolean, String],
  menu: Boolean,
  menuIcon: {
    type: IconValue,
    default: '$dropdown',
  },
  menuLabel: {
    type: String,
    default: '$vuetify.splitBtn.menu',
  },
  menuProps: Object as PropType<VMenu['$props']>,
  prependIcon: IconValue,
  text: [String, Number],

  ...omit(makeVBtnGroupProps(), ['connected', 'direction']),
}, 'VSplitBtn')

export const VSplitBtn = genericComponent<VSplitBtnSlots>()({
  name: 'VSplitBtn',

  props: makeVSplitBtnProps(),

  emits: {
    click: (e: MouseEvent) => true,
    'update:menu': (value: boolean) => true,
  },

  setup (props, { emit, slots }) {
    const { t } = useLocale()
    const isOpen = useProxiedModel(props, 'menu')

    useRender(() => (
      <VBtnGroup
        { ...VBtnGroup.filterProps(props) }
        class={['v-split-btn', props.class]}
        style={ props.style }
        connected
      >
        <VBtn
          class="v-split-btn__action"
          disabled={ props.disabled }
          icon={ props.icon }
          loading={ props.loading }
          prependIcon={ props.prependIcon }
          text={ props.text }
          onClick={ (e: MouseEvent) => emit('click', e) }
          v-slots={{ default: slots.default }}
        />

        <VMenu
          v-model={ isOpen.value }
          disabled={ props.disabled }
          location="bottom end"
          { ...props.menuProps }
        >
          {{
            activator: ({ props: activatorProps }) => (
              <VBtn
                class="v-split-btn__toggle"
                active={ isOpen.value }
                aria-label={ t(props.menuLabel) }
                disabled={ props.disabled }
                { ...activatorProps }
              >
                <VIcon icon={ props.menuIcon } />
              </VBtn>
            ),
            default: slots.menu,
          }}
        </VMenu>
      </VBtnGroup>
    ))

    return {}
  },
})

export type VSplitBtn = InstanceType<typeof VSplitBtn>
