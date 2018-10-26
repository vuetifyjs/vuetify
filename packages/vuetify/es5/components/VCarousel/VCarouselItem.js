'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Extensions

// Components


var _VWindowItem = require('../VWindow/VWindowItem');

var _VWindowItem2 = _interopRequireDefault(_VWindowItem);

var _VImg = require('../VImg');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */
exports.default = _VWindowItem2.default.extend({
    name: 'v-carousel-item',
    inheritAttrs: false,
    methods: {
        genDefaultSlot: function genDefaultSlot() {
            return [this.$createElement(_VImg.VImg, {
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