// Styles
import './VNavigationDrawer.sass'

// Composables
import { makeSheetProps, useSheet } from '@/components/VSheet/VSheet'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { defineComponent, onBeforeMount, ref } from 'vue'
import { makeTagProps } from '@/composables/tag'
import { convertToUnit } from '@/util/helpers'
import makeProps from '@/util/makeProps'

// Types
import { PropType } from 'vue'

const alignedValues = ['top', 'center', 'bottom'] as const

type Alignment = typeof alignedValues[number]

export default defineComponent({
  name: 'VNavigationDrawer',

  props: makeProps({
    ...makeSheetProps(),
    ...makeTagProps({ tag: 'nav' }),
    aligned: {
      type: String as PropType<Alignment>,
      default: 'top',
      validator: (v: any) => alignedValues.includes(v)
    },
    dense: Boolean,
    expandOnHover: Boolean,
    floating: Boolean,
    mobile: Boolean,
    modelValue: Boolean,
    permanent: Boolean,
    rail: Boolean,
    railWidth: [Number, String],
    src: String,
    temporary: Boolean,
    width: [Number, String]
  }),

  setup (props, { slots }) {
    const { sheetClasses, sheetStyles } = useSheet(props, 'v-navigation-drawer')
    const isActive = useProxiedModel(props, 'modelValue')
    const isHovering = ref(false)

    onBeforeMount(() => {
      if (isActive.value == null) isActive.value = !props.mobile
    })

    return () => {
      const hasImg = (slots.img || props.src)
      const hasRail = props.rail || props.expandOnHover
      const transform = props.bottom ? 'Y' : 'X'
      const width = hasRail ? props.railWidth : props.width

      const translate = (
        (isActive.value ? 0 : 100) * (!props.right && !props.bottom ? -1 : 1)
      )

      return (
        <props.tag
          onMouseenter={ () => (isHovering.value = true) }
          onMouseleave={ () => (isHovering.value = false) }
          class={[
            {
              'v-navigation-drawer': true,
              'v-navigation-drawer--bottom': props.bottom,
              'v-navigation-drawer--dense': props.dense,
              'v-navigation-drawer--end': props.right,
              'v-navigation-drawer--expand-on-hover': props.expandOnHover,
              'v-navigation-drawer--floating': props.floating,
              'v-navigation-drawer--is-hovering': isHovering.value,
              'v-navigation-drawer--is-mobile': props.mobile,
              'v-navigation-drawer--rail': props.rail,
              'v-navigation-drawer--right': props.right,
              'v-navigation-drawer--start': props.left || !props.right,
              'v-navigation-drawer--temporary': props.temporary,
            },
            sheetClasses.value,
          ]}
          style={[
            sheetStyles.value,
            {
              transform: `translate${transform}(${convertToUnit(translate, '%')})`,
              width: convertToUnit(width)
            },
          ]}
        >
          {
            hasImg && (
              <div class="v-navigation-drawer__img">
                { slots.img
                  ? slots.img?.({ src: props.src })
                  : (<img src={ props.src } />)
                }
              </div>
            )
          }

          { slots.prepend && (
            <div class="v-navigation-drawer__prepend">
              { slots.prepend?.() }
            </div>
          )}

          <div class="v-navigation-drawer__content">
            { slots.default?.() }
          </div>

          { slots.append && (
            <div class="v-navigation-drawer__append">
              { slots.append?.() }
            </div>
          )}
        </props.tag>
      )
    }
  },
})
