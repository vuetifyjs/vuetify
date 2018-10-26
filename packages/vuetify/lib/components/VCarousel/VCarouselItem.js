var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Extensions
import VWindowItem from '../VWindow/VWindowItem';
// Components
import { VImg } from '../VImg';
/* @vue/component */
export default VWindowItem.extend({
    name: 'v-carousel-item',
    inheritAttrs: false,
    methods: {
        genDefaultSlot: function genDefaultSlot() {
            return [this.$createElement(VImg, {
                staticClass: 'v-carousel__item',
                props: _extends({}, this.$attrs, {
                    height: this.windowGroup.internalHeight
                }),
                on: this.$listeners
            }, this.$slots.default)];
        },
        onBeforeEnter: function onBeforeEnter() {},
        onEnter: function onEnter() {},
        onAfterEnter: function onAfterEnter() {},
        onBeforeLeave: function onBeforeLeave() {},
        onEnterCancelled: function onEnterCancelled() {}
    }
});
//# sourceMappingURL=VCarouselItem.js.map