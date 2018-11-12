/**
 * Tabs props
 *
 * @mixin
 */
/* @vue/component */
export default {
  props: {
    activeClass: {
      type: String,
      default: 'v-tabs__item--active'
    },
    alignWithTitle: Boolean,
    centered: Boolean,
    fixedTabs: Boolean,
    grow: Boolean,
    height: {
      type: [Number, String],
      default: undefined,
      validator: v => !isNaN(parseInt(v))
    },
    hideSlider: Boolean,
    iconsAndText: Boolean,
    mandatory: {
      type: Boolean,
      default: true
    },
    mobileBreakPoint: {
      type: [Number, String],
      default: 1264,
      validator: v => !isNaN(parseInt(v))
    },
    nextIcon: {
      type: String,
      default: '$vuetify.icons.next'
    },
    prevIcon: {
      type: String,
      default: '$vuetify.icons.prev'
    },
    right: Boolean,
    showArrows: Boolean,
    sliderColor: {
      type: String,
      default: 'accent'
    },
    value: [Number, String]
  }
}
