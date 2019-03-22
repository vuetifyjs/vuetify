// Styles
import '../../stylus/components/_carousel.styl';
// Extensions
import VWindow from '../VWindow/VWindow';
// Components
import VBtn from '../VBtn';
import VIcon from '../VIcon';
// Mixins
// TODO: Move this into core components v2.0
import ButtonGroup from '../../mixins/button-group';
// Utilities
import { convertToUnit } from '../../util/helpers';
import { deprecate } from '../../util/console';
export default VWindow.extend({
    name: 'v-carousel',
    props: {
        cycle: {
            type: Boolean,
            default: true
        },
        delimiterIcon: {
            type: String,
            default: '$vuetify.icons.delimiter'
        },
        height: {
            type: [Number, String],
            default: 500
        },
        hideControls: Boolean,
        hideDelimiters: Boolean,
        interval: {
            type: [Number, String],
            default: 6000,
            validator: function (value) { return value > 0; }
        },
        mandatory: {
            type: Boolean,
            default: true
        },
        nextIcon: {
            type: [Boolean, String],
            default: '$vuetify.icons.next'
        },
        prevIcon: {
            type: [Boolean, String],
            default: '$vuetify.icons.prev'
        }
    },
    data: function () {
        return {
            changedByDelimiters: false,
            internalHeight: this.height,
            slideTimeout: undefined
        };
    },
    computed: {
        isDark: function () {
            return this.dark || !this.light;
        }
    },
    watch: {
        internalValue: function (val) {
            this.restartTimeout();
            /* @deprecate */
            /* istanbul ignore else */
            if (!this.$listeners['input'])
                return;
            this.$emit('input', val);
        },
        interval: 'restartTimeout',
        height: function (val, oldVal) {
            if (val === oldVal || !val)
                return;
            this.internalHeight = val;
        },
        cycle: function (val) {
            if (val) {
                this.restartTimeout();
            }
            else {
                clearTimeout(this.slideTimeout);
                this.slideTimeout = undefined;
            }
        }
    },
    mounted: function () {
        /* @deprecate */
        /* istanbul ignore next */
        if (this.$listeners['input']) {
            deprecate('@input', '@change', this);
        }
        this.startTimeout();
    },
    methods: {
        genDelimiters: function () {
            return this.$createElement('div', {
                staticClass: 'v-carousel__controls'
            }, [this.genItems()]);
        },
        genIcon: function (direction, icon, fn) {
            var _this = this;
            return this.$createElement('div', {
                staticClass: "v-carousel__" + direction
            }, [
                this.$createElement(VBtn, {
                    props: {
                        icon: true
                    },
                    attrs: {
                        'aria-label': this.$vuetify.t("$vuetify.carousel." + direction)
                    },
                    on: {
                        click: function () {
                            _this.changedByDelimiters = true;
                            fn();
                        }
                    }
                }, [
                    this.$createElement(VIcon, {
                        props: { 'size': '46px' }
                    }, icon)
                ])
            ]);
        },
        genIcons: function () {
            var icons = [];
            var prevIcon = this.$vuetify.rtl
                ? this.nextIcon
                : this.prevIcon;
            if (prevIcon && typeof prevIcon === 'string') {
                icons.push(this.genIcon('prev', prevIcon, this.prev));
            }
            var nextIcon = this.$vuetify.rtl
                ? this.prevIcon
                : this.nextIcon;
            if (nextIcon && typeof nextIcon === 'string') {
                icons.push(this.genIcon('next', nextIcon, this.next));
            }
            return icons;
        },
        genItems: function () {
            var _this = this;
            var length = this.items.length;
            var children = [];
            for (var i = 0; i < length; i++) {
                var child = this.$createElement(VBtn, {
                    class: {
                        'v-carousel__controls__item': true
                    },
                    props: {
                        icon: true,
                        small: true,
                        value: this.getValue(this.items[i], i)
                    }
                }, [
                    this.$createElement(VIcon, {
                        props: { size: 18 }
                    }, this.delimiterIcon)
                ]);
                children.push(child);
            }
            return this.$createElement(ButtonGroup, {
                props: {
                    value: this.internalValue
                },
                on: {
                    change: function (val) {
                        _this.internalValue = val;
                    }
                }
            }, children);
        },
        restartTimeout: function () {
            this.slideTimeout && clearTimeout(this.slideTimeout);
            this.slideTimeout = undefined;
            var raf = requestAnimationFrame || setTimeout;
            raf(this.startTimeout);
        },
        startTimeout: function () {
            if (!this.cycle)
                return;
            this.slideTimeout = window.setTimeout(this.next, +this.interval > 0 ? +this.interval : 6000);
        },
        updateReverse: function (val, oldVal) {
            if (this.changedByDelimiters) {
                this.changedByDelimiters = false;
                return;
            }
            VWindow.options.methods.updateReverse.call(this, val, oldVal);
        }
    },
    render: function (h) {
        var children = [];
        var data = {
            staticClass: 'v-window v-carousel',
            style: {
                height: convertToUnit(this.height)
            },
            directives: []
        };
        if (!this.touchless) {
            data.directives.push({
                name: 'touch',
                value: {
                    left: this.next,
                    right: this.prev
                }
            });
        }
        if (!this.hideControls) {
            children.push(this.genIcons());
        }
        if (!this.hideDelimiters) {
            children.push(this.genDelimiters());
        }
        return h('div', data, [this.genContainer(), children]);
    }
});
//# sourceMappingURL=VCarousel.js.map
//# sourceMappingURL=VCarousel.js.map
//# sourceMappingURL=VCarousel.js.map
//# sourceMappingURL=VCarousel.js.map