'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('../../../src/stylus/components/_range-sliders.styl');

var _VSlider = require('../VSlider');

var _VSlider2 = _interopRequireDefault(_VSlider);

var _helpers = require('../../util/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */

// Extensions
exports.default = {
    name: 'v-range-slider',
    extends: _VSlider2.default,
    props: {
        value: {
            type: Array,
            default: function _default() {
                return [];
            }
        }
    },
    data: function data(vm) {
        return {
            activeThumb: null,
            lazyValue: !vm.value.length ? [0, 0] : vm.value
        };
    },
    computed: {
        classes: function classes() {
            return Object.assign({}, {
                'v-input--range-slider': true
            }, _VSlider2.default.computed.classes.call(this));
        },

        internalValue: {
            get: function get() {
                return this.lazyValue;
            },
            set: function set(val) {
                var _this = this;

                var min = this.min,
                    max = this.max;
                // Round value to ensure the
                // entire slider range can
                // be selected with step

                var value = val.map(function (v) {
                    return _this.roundValue(Math.min(Math.max(v, min), max));
                });
                // Switch values if range and wrong order
                if (value[0] > value[1] || value[1] < value[0]) {
                    if (this.activeThumb !== null) this.activeThumb = this.activeThumb === 1 ? 0 : 1;
                    value = [value[1], value[0]];
                }
                this.lazyValue = value;
                if (!(0, _helpers.deepEqual)(value, this.value)) this.$emit('input', value);
                this.validate();
            }
        },
        inputWidth: function inputWidth() {
            var _this2 = this;

            return this.internalValue.map(function (v) {
                return (_this2.roundValue(v) - _this2.min) / (_this2.max - _this2.min) * 100;
            });
        },
        isDirty: function isDirty() {
            var _this3 = this;

            return this.internalValue.some(function (v) {
                return v !== _this3.min;
            }) || this.alwaysDirty;
        },
        trackFillStyles: function trackFillStyles() {
            var styles = _VSlider2.default.computed.trackFillStyles.call(this);
            var fillPercent = Math.abs(this.inputWidth[0] - this.inputWidth[1]);
            styles.width = 'calc(' + fillPercent + '% - ' + this.trackPadding + 'px)';
            styles[this.$vuetify.rtl ? 'right' : 'left'] = this.inputWidth[0] + '%';
            return styles;
        },
        trackPadding: function trackPadding() {
            if (this.isDirty || this.internalValue[0]) return 0;
            return _VSlider2.default.computed.trackPadding.call(this);
        }
    },
    methods: {
        getIndexOfClosestValue: function getIndexOfClosestValue(arr, v) {
            if (Math.abs(arr[0] - v) < Math.abs(arr[1] - v)) return 0;else return 1;
        },
        genInput: function genInput() {
            var _this4 = this;

            return (0, _helpers.createRange)(2).map(function (i) {
                var input = _VSlider2.default.methods.genInput.call(_this4);
                input.data.attrs.value = _this4.internalValue[i];
                input.data.on.focus = function (e) {
                    _this4.activeThumb = i;
                    _VSlider2.default.methods.onFocus.call(_this4, e);
                };
                return input;
            });
        },
        genChildren: function genChildren() {
            var _this5 = this;

            return [this.genInput(), this.genTrackContainer(), this.genSteps(), (0, _helpers.createRange)(2).map(function (i) {
                var value = _this5.internalValue[i];
                var onDrag = function onDrag(e) {
                    _this5.isActive = true;
                    _this5.activeThumb = i;
                    _this5.onThumbMouseDown(e);
                };
                var valueWidth = _this5.inputWidth[i];
                var isActive = (_this5.isFocused || _this5.isActive) && _this5.activeThumb === i;
                return _this5.genThumbContainer(value, valueWidth, isActive, onDrag);
            })];
        },
        onSliderClick: function onSliderClick(e) {
            if (!this.isActive) {
                this.isFocused = true;
                this.onMouseMove(e, true);
                this.$emit('change', this.internalValue);
            }
        },
        onMouseMove: function onMouseMove(e) {
            var trackClick = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var _parseMouseMove = this.parseMouseMove(e),
                value = _parseMouseMove.value,
                isInsideTrack = _parseMouseMove.isInsideTrack;

            if (isInsideTrack) {
                if (trackClick) this.activeThumb = this.getIndexOfClosestValue(this.internalValue, value);
                this.setInternalValue(value);
            }
        },
        onKeyDown: function onKeyDown(e) {
            var value = this.parseKeyDown(e, this.internalValue[this.activeThumb]);
            if (value == null) return;
            this.setInternalValue(value);
        },
        setInternalValue: function setInternalValue(value) {
            var _this6 = this;

            this.internalValue = this.internalValue.map(function (v, i) {
                if (i === _this6.activeThumb) return value;else return Number(v);
            });
        }
    }
}; // Styles
//# sourceMappingURL=VRangeSlider.js.map