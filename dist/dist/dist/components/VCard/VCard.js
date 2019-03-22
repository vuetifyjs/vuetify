var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles
import '../../stylus/components/_cards.styl';
// Extensions
import VSheet from '../VSheet';
// Mixins
import Routable from '../../mixins/routable';
// Helpers
import mixins from '../../util/mixins';
/* @vue/component */
export default mixins(Routable, VSheet).extend({
    name: 'v-card',
    props: {
        flat: Boolean,
        hover: Boolean,
        img: String,
        raised: Boolean
    },
    computed: {
        classes: function () {
            return __assign({ 'v-card': true, 'v-card--flat': this.flat, 'v-card--hover': this.hover }, VSheet.options.computed.classes.call(this));
        },
        styles: function () {
            var style = __assign({}, VSheet.options.computed.styles.call(this));
            if (this.img) {
                style.background = "url(\"" + this.img + "\") center center / cover no-repeat";
            }
            return style;
        }
    },
    render: function (h) {
        var _a = this.generateRouteLink(this.classes), tag = _a.tag, data = _a.data;
        data.style = this.styles;
        return h(tag, this.setBackgroundColor(this.color, data), this.$slots.default);
    }
});
//# sourceMappingURL=VCard.js.map
//# sourceMappingURL=VCard.js.map
//# sourceMappingURL=VCard.js.map