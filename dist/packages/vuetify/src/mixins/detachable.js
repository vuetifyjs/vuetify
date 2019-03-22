import Bootable from './bootable';
import { consoleWarn } from '../util/console';
function validateAttachTarget(val) {
    var type = typeof val;
    if (type === 'boolean' || type === 'string')
        return true;
    return val.nodeType === Node.ELEMENT_NODE;
}
/* @vue/component */
export default {
    name: 'detachable',
    mixins: [Bootable],
    props: {
        attach: {
            type: null,
            default: false,
            validator: validateAttachTarget
        },
        contentClass: {
            default: ''
        }
    },
    data: function () { return ({
        hasDetached: false
    }); },
    watch: {
        attach: function () {
            this.hasDetached = false;
            this.initDetach();
        },
        hasContent: 'initDetach'
    },
    beforeMount: function () {
        var _this = this;
        this.$nextTick(function () {
            if (_this.activatorNode) {
                var activator = Array.isArray(_this.activatorNode) ? _this.activatorNode : [_this.activatorNode];
                activator.forEach(function (node) {
                    node.elm && _this.$el.parentNode.insertBefore(node.elm, _this.$el);
                });
            }
        });
    },
    mounted: function () {
        !this.lazy && this.initDetach();
    },
    deactivated: function () {
        this.isActive = false;
    },
    beforeDestroy: function () {
        // IE11 Fix
        try {
            if (this.$refs.content) {
                this.$refs.content.parentNode.removeChild(this.$refs.content);
            }
            if (this.activatorNode) {
                var activator = Array.isArray(this.activatorNode) ? this.activatorNode : [this.activatorNode];
                activator.forEach(function (node) {
                    node.elm && node.elm.parentNode.removeChild(node.elm);
                });
            }
        }
        catch (e) {
            console.log(e);
        }
    },
    methods: {
        getScopeIdAttrs: function () {
            var _a;
            var scopeId = this.$vnode && this.$vnode.context.$options._scopeId;
            return scopeId && (_a = {},
                _a[scopeId] = '',
                _a);
        },
        initDetach: function () {
            if (this._isDestroyed ||
                !this.$refs.content ||
                this.hasDetached ||
                // Leave menu in place if attached
                // and dev has not changed target
                this.attach === '' || // If used as a boolean prop (<v-menu attach>)
                this.attach === true || // If bound to a boolean (<v-menu :attach="true">)
                this.attach === 'attach' // If bound as boolean prop in pug (v-menu(attach))
            )
                return;
            var target;
            if (this.attach === false) {
                // Default, detach to app
                target = document.querySelector('[data-app]');
            }
            else if (typeof this.attach === 'string') {
                // CSS selector
                target = document.querySelector(this.attach);
            }
            else {
                // DOM Element
                target = this.attach;
            }
            if (!target) {
                consoleWarn("Unable to locate target " + (this.attach || '[data-app]'), this);
                return;
            }
            target.insertBefore(this.$refs.content, target.firstChild);
            this.hasDetached = true;
        }
    }
};
//# sourceMappingURL=detachable.js.map