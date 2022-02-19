import './VTab.sass'

// Mixins

// Utilities
import { makeRouterProps, useLink } from '@/composables/router'
import { makeTagProps } from '@/composables/tag'
import { defineComponent, pick } from '@/util'
import { VBtn } from '..'
import { provideDefaults } from '@/composables/defaults'
import { makeGroupItemProps, useGroupItem } from '@/composables/group'
import { VTabsSymbol } from '.'
import { computed, toRef } from 'vue'
import { makeThemeProps } from '@/composables/theme'

// Types

export const VTab = defineComponent({
  name: 'VTab',

  props: {
    fixed: Boolean,
    icon: [Boolean, String],
    prependIcon: String,
    appendIcon: String,

    stacked: Boolean,
    title: String,

    ripple: {
      type: Boolean,
      default: true,
    },
    color: String,
    ...makeTagProps(),
    ...makeRouterProps(),
    ...makeGroupItemProps({
      selectedClass: 'v-tab--selected',
    }),
    ...makeThemeProps(),
  },

  setup (props, { slots, attrs }) {
    const { isSelected, select, selectedClass } = useGroupItem(props, VTabsSymbol)

    provideDefaults({
      VBtn: {
        variant: 'text',
        rounded: 0,
        minWidth: 90,
        maxWidth: 360,
        block: toRef(props, 'fixed'),
        color: computed(() => isSelected.value ? props.color : undefined),
      },
    }, {
      scoped: true,
    })

    return () => {
      const [btnProps] = pick(props, [
        'href',
        'to',
        'replace',
        'icon',
        'stacked',
        'prependIcon',
        'appendIcon',
        'ripple',
        'theme',
        'disabled',
      ])

      return (
        <VBtn
          class={[
            'v-tab',
            selectedClass.value,
          ]}
          onClick={ () => !props.disabled && select(!isSelected.value) }
          { ...btnProps }
        >
          { slots.default ? slots.default() : props.title }
        </VBtn>
      )
    }
  },
})
