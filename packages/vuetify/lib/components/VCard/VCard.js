var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Styles
import '../../../src/stylus/components/_cards.styl';
// Extensions
import VPaper from '../VPaper';
// Mixins
import Routable from '../../mixins/routable';
// Helpers
import mixins from '../../util/mixins';
/* @vue/component */
export default mixins(Routable, VPaper).extend({
    name: 'v-card',
    props: {
        elevation: {
            type: [Number, String],
            default: 2
        },
        flat: Boolean,
        hover: Boolean,
        img: String,
        raised: Boolean
    },
    computed: {
        classes: function classes() {
            return _extends({
                'v-card': true,
                'v-card--hover': this.hover
            }, VPaper.options.computed.classes.call(this));
        },
        computedElevation: function computedElevation() {
            if (this.flat) return 0;
            if (this.raised) return 3;
            return VPaper.options.computed.computedElevation.call(this);
        },
        styles: function styles() {
            var style = _extends({}, VPaper.options.computed.styles.call(this));
            if (this.img) {
                style.background = 'url("' + this.img + '") center center / cover no-repeat';
            }
            return style;
        }
    },
    render: function render(h) {
        var _generateRouteLink = this.generateRouteLink(this.classes),
            tag = _generateRouteLink.tag,
            data = _generateRouteLink.data;

        data.style = this.styles;
        return h(tag, this.setBackgroundColor(this.color, data), this.$slots.default);
    }
});
//# sourceMappingURL=VCard.js.map