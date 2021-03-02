// Styles
import './VBanner.sass'

// Composables
import { makeSheetProps, useSheet } from '@/components/VSheet/VSheet'

// Utilities
import { defineComponent } from 'vue'
import makeProps from '@/util/makeProps'

export default defineComponent({
  name: 'VBanner',

  props: makeProps({
    avatar: String,
    icon: String,
    mobile: Boolean,
    singleLine: Boolean,
    sticky: Boolean,
    ...makeSheetProps(),
  }),

  setup (props, { slots }) {
    const { sheetClasses, sheetStyles } = useSheet(props, 'v-banner')

    return () => {
      const hasThumbnail = (!!props.avatar || !!props.icon || !!slots.thumbnail)

      return (
        <props.tag
          class={[
            'v-banner',
            {
              'v-banner--has-thumbnail': hasThumbnail,
              'v-banner--is-mobile': props.mobile,
              'v-banner--single-line': props.singleLine,
              'v-banner--sticky': props.sticky,
            },
            sheetClasses.value,
          ]}
          style={ sheetStyles.value }
          role="banner"
        >
          <div class="v-banner__sizer">
            <div class="v-banner__content">
              { hasThumbnail && (
                <div class="v-banner__thumbnail">
                  { slots.thumbnail?.() }
                  { props.avatar && (
                    <img class="v-banner__avatar" src={ props.avatar } alt=""></img>
                  )}
                  { props.icon && <i class="v-banner__icon">{ props.icon }</i> }
                </div>
              )}
              <div class="v-banner__text">{ slots.default?.() }</div>
            </div>
            { slots.actions && (
              <div class="v-banner__actions">{ slots.actions?.() }</div>
            )}
          </div>
        </props.tag>
      )
    }
  },
})
