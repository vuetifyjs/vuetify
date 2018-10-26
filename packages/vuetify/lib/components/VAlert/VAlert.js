// Styles
import '../../../src/stylus/components/_alerts.styl';
// Components
import VIcon from '../VIcon';
// Mixins
import Colorable from '../../mixins/colorable';
import Toggleable from '../../mixins/toggleable';
import Transitionable from '../../mixins/transitionable';
import mixins from '../../util/mixins';
/* @vue/component */
export default mixins(Colorable, Toggleable, Transitionable).extend({
    name: 'v-alert',
    props: {
        dismissible: Boolean,
        icon: String,
        outline: Boolean,
        type: {
            type: String,
            validator: function validator(val) {
                return ['info', 'error', 'success', 'warning'].includes(val);
            }
        }
    },
    computed: {
        computedColor: function computedColor() {
            return this.type && !this.color ? this.type : this.color || 'error';
        },
        computedIcon: function computedIcon() {
            if (this.icon || !this.type) return this.icon;
            switch (this.type) {
                case 'info':
                    return '$vuetify.icons.info';
                case 'error':
                    return '$vuetify.icons.error';
                case 'success':
                    return '$vuetify.icons.success';
                case 'warning':
                    return '$vuetify.icons.warning';
            }
        }
    },
    methods: {
        genIcon: function genIcon() {
            if (!this.computedIcon) return null;
            return this.$createElement(VIcon, {
                'class': 'v-alert__icon'
            }, this.computedIcon);
        },
        genDismissible: function genDismissible() {
            var _this = this;

            if (!this.dismissible) return null;
            return this.$createElement('a', {
                'class': 'v-alert__dismissible',
                on: { click: function click() {
                        _this.isActive = false;
                    } }
            }, [this.$createElement(VIcon, {
                props: {
                    right: true
                }
            }, '$vuetify.icons.cancel')]);
        }
    },
    render: function render(h) {
        var children = [this.genIcon(), h('div', this.$slots.default), this.genDismissible()];
        var setColor = this.outline ? this.setTextColor : this.setBackgroundColor;
        var alert = h('div', setColor(this.computedColor, {
            staticClass: 'v-alert',
            'class': {
                'v-alert--outline': this.outline
            },
            directives: [{
                name: 'show',
                value: this.isActive
            }],
            on: this.$listeners
        }), children);
        if (!this.transition) return alert;
        return h('transition', {
            props: {
                name: this.transition,
                origin: this.origin,
                mode: this.mode
            }
        }, [alert]);
    }
});
//# sourceMappingURL=VAlert.js.map