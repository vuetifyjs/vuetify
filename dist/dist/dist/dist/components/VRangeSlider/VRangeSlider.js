// Styles
import '../../stylus/components/_range-sliders.styl';
// Extensions
import VSlider from '../VSlider';
import { createRange, deepEqual } from '../../util/helpers';
/* @vue/component */
export default {
    name: 'v-range-slider',
    extends: VSlider,
    props: {
        value: {
            type: Array,
            default: function () { return ([]); }
        }
    },
    data: function (vm) {
        return ({
            activeThumb: null,
            lazyValue: !vm.value.length
                ? [0, 0]
                : vm.value
        });
    },
    computed: {
        classes: function () {
            return Object.assign({}, {
                'v-input--range-slider': true
            }, VSlider.options.computed.classes.call(this));
        },
        internalValue: {
            get: function () {
                return this.lazyValue;
            },
            set: function (val) {
                var _this = this;
                var _a = this, min = _a.min, max = _a.max;
                // Round value to ensure the
                // entire slider range can
                // be selected with step
                var value = val.map(function (v) { return _this.roundValue(Math.min(Math.max(v, min), max)); });
                // Switch values if range and wrong order
                if (value[0] > value[1] || value[1] < value[0]) {
                    if (this.activeThumb !== null)
                        this.activeThumb = this.activeThumb === 1 ? 0 : 1;
                    value = [value[1], value[0]];
                }
                this.lazyValue = value;
                if (!deepEqual(value, this.value))
                    this.$emit('input', value);
                this.validate();
            }
        },
        inputWidth: function () {
            var _this = this;
            return this.internalValue.map(function (v) { return (_this.roundValue(v) - _this.min) / (_this.max - _this.min) * 100; });
        },
        isDirty: function () {
            var _this = this;
            return this.internalValue.some(function (v) { return v !== _this.min; }) || this.alwaysDirty;
        },
        trackFillStyles: function () {
            var styles = VSlider.options.computed.trackFillStyles.call(this);
            var fillPercent = Math.abs(this.inputWidth[0] - this.inputWidth[1]);
            styles.width = "calc(" + fillPercent + "% - " + this.trackPadding + "px)";
            styles[this.$vuetify.rtl ? 'right' : 'left'] = this.inputWidth[0] + "%";
            return styles;
        },
        trackPadding: function () {
            if (this.isDirty ||
                this.internalValue[0])
                return 0;
            return VSlider.options.computed.trackPadding.call(this);
        }
    },
    methods: {
        getIndexOfClosestValue: function (arr, v) {
            if (Math.abs(arr[0] - v) < Math.abs(arr[1] - v))
                return 0;
            else
                return 1;
        },
        genInput: function () {
            var _this = this;
            return createRange(2).map(function (i) {
                var input = VSlider.options.methods.genInput.call(_this);
                input.data.attrs.value = _this.internalValue[i];
                input.data.on.focus = function (e) {
                    _this.activeThumb = i;
                    VSlider.options.methods.onFocus.call(_this, e);
                };
                return input;
            });
        },
        genChildren: function () {
            var _this = this;
            return [
                this.genInput(),
                this.genTrackContainer(),
                this.genSteps(),
                createRange(2).map(function (i) {
                    var value = _this.internalValue[i];
                    var onDrag = function (e) {
                        _this.isActive = true;
                        _this.activeThumb = i;
                        _this.onThumbMouseDown(e);
                    };
                    var valueWidth = _this.inputWidth[i];
                    var isActive = (_this.isFocused || _this.isActive) && _this.activeThumb === i;
                    return _this.genThumbContainer(value, valueWidth, isActive, onDrag);
                })
            ];
        },
        onSliderClick: function (e) {
            if (!this.isActive) {
                this.isFocused = true;
                this.onMouseMove(e, true);
                this.$emit('change', this.internalValue);
            }
        },
        onMouseMove: function (e, trackClick) {
            if (trackClick === void 0) {
                trackClick = false;
            }
            var _a = this.parseMouseMove(e), value = _a.value, isInsideTrack = _a.isInsideTrack;
            if (isInsideTrack) {
                if (trackClick)
                    this.activeThumb = this.getIndexOfClosestValue(this.internalValue, value);
                this.setInternalValue(value);
            }
        },
        onKeyDown: function (e) {
            var value = this.parseKeyDown(e, this.internalValue[this.activeThumb]);
            if (value == null)
                return;
            this.setInternalValue(value);
        },
        setInternalValue: function (value) {
            var _this = this;
            this.internalValue = this.internalValue.map(function (v, i) {
                if (i === _this.activeThumb)
                    return value;
                else
                    return Number(v);
            });
        }
    }
};
//# sourceMappingURL=VRangeSlider.js.map
//# sourceMappingURL=VRangeSlider.js.map
//# sourceMappingURL=VRangeSlider.js.map
//# sourceMappingURL=VRangeSlider.js.map