/**
 * Tabs props
 *
 * @mixin
 */
export default {
  props: {
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
    mobileBreakPoint: {
      type: [Number, String],
      default: 1264,
      validator: v => !isNaN(parseInt(v))
    },
    nextIcon: {
      type: String,
      default: 'chevron_right'
    },
    prevIcon: {
      type: String,
      default: 'chevron_left'
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
