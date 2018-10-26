var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Mixins
import { factory as GroupableFactory } from '../../mixins/groupable';
import Routable from '../../mixins/routable';
import Themeable from '../../mixins/themeable';
// Utilities
import { getObjectValueByPath } from '../../util/helpers';
/* @vue/component */
export default {
    name: 'v-tab',
    mixins: [Routable,
    // Must be after routable
    // to overwrite activeClass
    GroupableFactory('tabGroup'), Themeable],
    props: {
        ripple: {
            type: [Boolean, Object],
            default: true
        }
    },
    computed: {
        classes: function classes() {
            return _extends({
                'v-tabs__item': true,
                'v-tabs__item--disabled': this.disabled
            }, this.groupClasses);
        },
        value: function value() {
            var to = this.to || this.href || '';
            if (this.$router && this.to === Object(this.to)) {
                var resolve = this.$router.resolve(this.to, this.$route, this.append);
                to = resolve.href;
            }
            return to.replace('#', '');
        }
    },
    watch: {
        $route: 'onRouteChange'
    },
    mounted: function mounted() {
        this.onRouteChange();
    },

    methods: {
        click: function click(e) {
            // If user provides an
            // actual link, do not
            // prevent default
            if (this.href && this.href.indexOf('#') > -1) e.preventDefault();
            this.$emit('click', e);
            this.to || this.toggle();
        },
        onRouteChange: function onRouteChange() {
            var _this = this;

            if (!this.to || !this.$refs.link) return;
            var path = '_vnode.data.class.' + this.activeClass;
            this.$nextTick(function () {
                if (getObjectValueByPath(_this.$refs.link, path)) {
                    _this.toggle();
                }
            });
        }
    },
    render: function render(h) {
        var link = this.generateRouteLink(this.classes);
        var data = link.data;
        // If disabled, use div as anchor tags do not support
        // being disabled

        var tag = this.disabled ? 'div' : link.tag;
        data.ref = 'link';
        return h('div', {
            staticClass: 'v-tabs__div'
        }, [h(tag, data, this.$slots.default)]);
    }
};
//# sourceMappingURL=VTab.js.map