// Styles
import '../../../src/stylus/components/_carousel.styl';
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
            validator: function validator(value) {
                return value > 0;
            }
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
    data: function data() {
        return {
            changedByControls: false,
            internalHeight: this.height,
            slideTimeout: undefined
        };
    },

    computed: {
        isDark: function isDark() {
            return this.dark || !this.light;
        }
    },
    watch: {
        internalValue: 'restartTimeout',
        interval: 'restartTimeout',
        cycle: function cycle(val) {
            if (val) {
                this.restartTimeout();
            } else {
                clearTimeout(this.slideTimeout);
                this.slideTimeout = undefined;
            }
        }
    },
    mounted: function mounted() {
        this.startTimeout();
    },

    methods: {
        genDelimiters: function genDelimiters() {
            return this.$createElement('div', {
                staticClass: 'v-carousel__controls'
            }, [this.genItems()]);
        },
        genIcon: function genIcon(direction, icon, fn) {
            return this.$createElement('div', {
                staticClass: 'v-carousel__' + direction
            }, [this.$createElement(VBtn, {
                props: {
                    icon: true
                },
                on: { click: fn }
            }, [this.$createElement(VIcon, {
                props: { 'size': '46px' }
            }, icon)])]);
        },
        genIcons: function genIcons() {
            var icons = [];
            var prevIcon = this.$vuetify.rtl ? this.nextIcon : this.prevIcon;
            if (prevIcon && typeof prevIcon === 'string') {
                icons.push(this.genIcon('prev', prevIcon, this.prev));
            }
            var nextIcon = this.$vuetify.rtl ? this.prevIcon : this.nextIcon;
            if (nextIcon && typeof nextIcon === 'string') {
                icons.push(this.genIcon('next', nextIcon, this.next));
            }
            return icons;
        },
        genItems: function genItems() {
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
                        small: true
                    }
                }, [this.$createElement(VIcon, {
                    props: { size: 18 }
                }, this.delimiterIcon)]);
                children.push(child);
            }
            return this.$createElement(ButtonGroup, {
                props: {
                    value: this.internalValue
                },
                on: {
                    change: function change(val) {
                        _this.changedByControls = true;
                        _this.internalValue = val;
                    }
                }
            }, children);
        },
        restartTimeout: function restartTimeout() {
            this.slideTimeout && clearTimeout(this.slideTimeout);
            this.slideTimeout = undefined;
            var raf = requestAnimationFrame || setTimeout;
            raf(this.startTimeout);
        },
        startTimeout: function startTimeout() {
            if (!this.cycle) return;
            this.slideTimeout = window.setTimeout(this.next, +this.interval > 0 ? +this.interval : 6000);
        },
        updateReverse: function updateReverse(val, oldVal) {
            if (this.changedByControls) {
                this.changedByControls = false;
                VWindow.options.methods.updateReverse.call(this, val, oldVal);
            }
        }
    },
    render: function render(h) {
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
        return h('div', data, [children, this.genContainer()]);
    }
});
//# sourceMappingURL=VCarousel.js.map