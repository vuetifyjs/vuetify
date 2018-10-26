'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Tabs props
 *
 * @mixin
 */
/* @vue/component */
exports.default = {
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
            validator: function validator(v) {
                return !isNaN(parseInt(v));
            }
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
            validator: function validator(v) {
                return !isNaN(parseInt(v));
            }
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
};
//# sourceMappingURL=tabs-props.js.map