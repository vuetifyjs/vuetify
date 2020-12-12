import './VIcon.sass'

// Utilities
import { computed, defineComponent, h } from 'vue'
import { useIcon, makeSizeProps, useSizeClass } from '@/composables'
import makeProps from '@/util/makeProps'

// Types
import type { PropType } from 'vue'
import type { VuetifyIcon } from '@/composables'

export const VSvgIcon = defineComponent({
  name: 'VSvgIcon',
  inheritAttrs: false,
  props: {
    icon: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    type: {
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
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  setup (props) {
    return () => h(props.tag, {
      class: props.type,
    }, [props.icon])
  },
})

export const VClassIcon = defineComponent({
  name: 'VClassIcon',
  props: {
    icon: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  setup (props) {
    return () => h(props.tag, {
      class: [props.type, props.icon],
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
      type: [String, Object] as PropType<VuetifyIcon>,
      required: true,
    },
    type: {
      type: String,
      default: 'mdi',
    },
    ...makeSizeProps(),
  }),

  setup (props, context) {
    const { sizeClass } = useSizeClass(props)
    const { icon } = useIcon(props)

    const styles = computed(() => !sizeClass.value ? ({
      'font-size': props.size,
      width: props.size,
      height: props.size,
    }) : null)

    const hasClickListener = !!context.attrs.onClick
    const tag = hasClickListener ? 'button' : props.tag

    const classes = computed(() => ([
      'v-icon',
      'notranslate',
      {
        'v-icon--disabled': props.disabled,
        'v-icon--left': props.left,
        'v-icon--right': props.right,
        'v-icon--link': hasClickListener,
      },
      sizeClass.value,
    ]))

    return () => {
      return icon.value.component({
        ...context.attrs,
        tag,
        type: props.type,
        icon: icon.value.icon,
        class: classes.value,
        style: styles.value,
      })
    }
  },
})
