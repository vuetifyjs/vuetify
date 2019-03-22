import '../../stylus/components/_speed-dial.styl';
import Toggleable from '../../mixins/toggleable';
import Positionable from '../../mixins/positionable';
import Transitionable from '../../mixins/transitionable';
import ClickOutside from '../../directives/click-outside';
/* @vue/component */
export default {
    name: 'v-speed-dial',
    directives: { ClickOutside: ClickOutside },
    mixins: [Positionable, Toggleable, Transitionable],
    props: {
        direction: {
            type: String,
            default: 'top',
            validator: function (val) {
                return ['top', 'right', 'bottom', 'left'].includes(val);
            }
        },
        openOnHover: Boolean,
        transition: {
            type: String,
            default: 'scale-transition'
        }
    },
    computed: {
        classes: function () {
            var _a;
            return _a = {
                'v-speed-dial': true,
                'v-speed-dial--top': this.top,
                'v-speed-dial--right': this.right,
                'v-speed-dial--bottom': this.bottom,
                'v-speed-dial--left': this.left,
                'v-speed-dial--absolute': this.absolute,
                'v-speed-dial--fixed': this.fixed
            },
                _a["v-speed-dial--direction-" + this.direction] = true,
                _a;
        }
    },
    render: function (h) {
        var _this = this;
        var children = [];
        var data = {
            'class': this.classes,
            directives: [{
                    name: 'click-outside',
                    value: function () { return (_this.isActive = false); }
                }],
            on: {
                click: function () { return (_this.isActive = !_this.isActive); }
            }
        };
        if (this.openOnHover) {
            data.on.mouseenter = function () { return (_this.isActive = true); };
            data.on.mouseleave = function () { return (_this.isActive = false); };
        }
        if (this.isActive) {
            var btnCount_1 = 0;
            children = (this.$slots.default || []).map(function (b, i) {
                if (b.tag && b.componentOptions.Ctor.options.name === 'v-btn') {
                    btnCount_1++;
                    return h('div', {
                        style: {
                            transitionDelay: btnCount_1 * 0.05 + 's'
                        },
                        key: i
                    }, [b]);
                }
                else {
                    b.key = i;
                    return b;
                }
            });
        }
        var list = h('transition-group', {
            'class': 'v-speed-dial__list',
            props: {
                name: this.transition,
                mode: this.mode,
                origin: this.origin,
                tag: 'div'
            }
        }, children);
        return h('div', data, [this.$slots.activator, list]);
    }
};
//# sourceMappingURL=VSpeedDial.js.map
//# sourceMappingURL=VSpeedDial.js.map
//# sourceMappingURL=VSpeedDial.js.map