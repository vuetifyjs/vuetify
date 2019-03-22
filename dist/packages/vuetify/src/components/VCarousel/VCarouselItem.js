var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Extensions
import VWindowItem from '../VWindow/VWindowItem';
// Components
import { VImg } from '../VImg';
/* @vue/component */
export default VWindowItem.extend({
    name: 'v-carousel-item',
    inheritAttrs: false,
    methods: {
        genDefaultSlot: function () {
            return [
                this.$createElement(VImg, {
                    staticClass: 'v-carousel__item',
                    props: __assign({}, this.$attrs, { height: this.windowGroup.internalHeight }),
                    on: this.$listeners
                }, this.$slots.default)
            ];
        },
        onBeforeEnter: function () { },
        onEnter: function () { },
        onAfterEnter: function () { },
        onBeforeLeave: function () { },
        onEnterCancelled: function () { }
    }
});
//# sourceMappingURL=VCarouselItem.js.map