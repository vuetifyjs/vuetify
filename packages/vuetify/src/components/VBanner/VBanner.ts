// Styles
import './VBanner.scss'

// Composables
import { makeSheetProps, useSheet } from '@/components/VSheet/VSheet'

// Utilities
import { defineComponent, h } from 'vue'
import makeProps from '@/util/makeProps'

export default defineComponent({
  name: 'VBanner',

  props: makeProps({
    avatar: [Boolean, String],
    icon: [Boolean, String],
    mobile: Boolean,
    singleLine: Boolean,
    sticky: Boolean,
    ...makeSheetProps(),
  }),

  setup (props, { slots }) {
    const { sheetClasses, sheetStyles } = useSheet(props, 'v-banner')

    return () => {
      const hasThumbnail = (!!props.avatar || !!props.icon || !!slots.thumbnail)

      return h(props.tag, {
        class: [
          'v-banner',
          {
            'v-banner--has-thumbnail': hasThumbnail,
            'v-banner--is-mobile': props.mobile,
            'v-banner--single-line': props.singleLine,
            'v-banner--sticky': props.sticky,
          },
          sheetClasses.value,
        ],
        style: sheetStyles.value,
        role: 'banner',
      }, [
        h('div', { class: 'v-banner__sizer' }, [
          h('div', { class: 'v-banner__content' }, [
            hasThumbnail && h('div', { class: 'v-banner__thumbnail' }, [
              slots.thumbnail?.(),
              props.avatar && h('img', {
                class: 'v-banner__avatar',
                src: props.avatar,
              }),
              props.icon && h('i', {
                class: [
                  'v-banner__icon',
                  props.icon,
                ],
              }),
            ]),
            h('div', { class: 'v-banner__text' }, slots.default?.()),
          ]),

          slots.actions && h('div', {
            class: 'v-banner__actions',
          }, slots.actions?.()),
        ]),
      ])
    }
  },
})
