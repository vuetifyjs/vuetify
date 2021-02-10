// Styles
import './VIcon.sass'

// Utilities
import { defineComponent } from 'vue'
import { makeSizeProps, useSize } from '@/composables/size'
import { useIcon } from '@/composables/icons'
import makeProps from '@/util/makeProps'
import propsFactory from '@/util/propsFactory'

// Types
import type { IconValue } from '@/composables/icons'
import type { PropType } from 'vue'

export const makeIconProps = propsFactory({
  icon: {
    type: [String, Object] as PropType<IconValue>,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
})

export const VComponentIcon = defineComponent({
  name: 'VComponentIcon',

  props: makeIconProps(),

  setup (props) {
    return () => {
      const Icon = props.icon as string

      return (
        <props.tag>
          <Icon />
        </props.tag>
      )
    }
  },
})

export const VSvgIcon = defineComponent({
  name: 'VSvgIcon',

  inheritAttrs: false,

  props: makeIconProps(),

  setup (props, { attrs }) {
    return () => {
      return (
        <props.tag style={ null }>
          <svg
            v-bind={ attrs }
            class='v-icon__svg'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            role='img'
            aria-hidden
          >
            <path d={ props.icon as string }></path>
          </svg>
        </props.tag>
      )
    }
  },
})

export const VLigatureIcon = defineComponent({
  name: 'VLigatureIcon',

  props: makeIconProps(),

  setup (props) {
    return () => {
      return (<props.tag>{ props.icon }</props.tag>)
    }
  },
})

export const VClassIcon = defineComponent({
  name: 'VClassIcon',

  props: makeIconProps(),

  setup (props) {
    return () => {
      return (<props.tag class={ props.icon }></props.tag>)
    }
  },
})

export default defineComponent({
  name: 'VIcon',

  props: makeProps({
    disabled: Boolean,
    left: Boolean,
    right: Boolean,
    tag: {
      type: String,
      required: false,
      default: 'i',
    },
    icon: {
      type: [String, Object] as PropType<IconValue>,
      required: true,
    },
    ...makeSizeProps(),
  }),

  setup (props, context) {
    const { iconData } = useIcon(props)
    const { sizeClasses } = useSize(props)

    return () => {
      const hasClickListener = !!context.attrs.onClick
      const tag = hasClickListener ? 'button' : props.tag
      const Component = iconData.value.component as any as string // TODO: vuejs/vue-next#3218

      return (
        <Component
          tag={ tag }
          icon={ iconData.value.icon }
          class={[
            'v-icon',
            'notranslate',
            sizeClasses.value,
            {
              'v-icon--disabled': props.disabled,
              'v-icon--left': props.left,
              'v-icon--right': props.right,
              'v-icon--link': hasClickListener,
            },
          ]}
          style={ !sizeClasses.value ? ({
            'font-size': props.size,
            width: props.size,
            height: props.size,
          }) : undefined }
          type={ hasClickListener ? 'button' : undefined }
          aria-hidden={ !hasClickListener }
        />
      )
    }
  },
})
