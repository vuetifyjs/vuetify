import './VIcon.sass'

// Utilities
import { defineComponent, h } from 'vue'
import { makeSizeProps, useSize } from '@/composables/size'
import { useIcon } from '@/composables/icons'
import makeProps from '@/util/makeProps'

// Types
import type { Component, PropType } from 'vue'
import type { IconValue } from '@/composables/icons'

export const VComponentIcon = defineComponent({
  name: 'VComponentIcon',
  props: {
    icon: {
      type: [String, Object] as PropType<IconValue>,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
  },
  setup (props) {
    return () => h(props.tag, [h(props.icon as Component)])
  },
})

export const VSvgIcon = defineComponent({
  name: 'VSvgIcon',
  inheritAttrs: false,
  props: {
    icon: {
      type: [String, Object] as PropType<IconValue>,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
  },
  setup (props, context) {
    return () => h(props.tag, {
      ...context.attrs,
      style: null,
    }, [
      h('svg', {
        style: context.attrs.style,
        class: 'v-icon__svg',
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        role: 'img',
        'aria-hidden': true,
      }, [h('path', { d: props.icon })]),
    ])
  },
})

export const VLigatureIcon = defineComponent({
  name: 'VLigatureIcon',
  props: {
    icon: {
      type: [String, Object] as PropType<IconValue>,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
  },
  setup (props) {
    return () => h(props.tag, [props.icon as string])
  },
})

export const VClassIcon = defineComponent({
  name: 'VClassIcon',
  props: {
    icon: {
      type: [String, Object] as PropType<IconValue>,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
  },
  setup (props) {
    return () => h(props.tag, {
      class: [props.icon],
    })
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
    const { sizeClasses } = useSize(props)
    const { iconData } = useIcon(props)

    return () => {
      const hasClickListener = !!context.attrs.onClick
      const tag = hasClickListener ? 'button' : props.tag

      return <iconData.value.component
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
        }) : null }
        type={ hasClickListener ? 'button' : undefined }
        aria-hidden={ !hasClickListener }
      />
    }
  },
})
