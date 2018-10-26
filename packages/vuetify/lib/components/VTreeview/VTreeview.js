var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Styles
import '../../../src/stylus/components/_treeview.styl';
// Components
import VTreeviewNode, { VTreeviewNodeProps } from './VTreeviewNode';
// Mixins
import Themeable from '../../mixins/themeable';
import { provide as RegistrableProvide } from '../../mixins/registrable';
// Utils
import { getObjectValueByPath, deepEqual } from '../../util/helpers';
import mixins from '../../util/mixins';
import { consoleWarn } from '../../util/console';
function ston(s) {
    var n = Number(s);
    return !isNaN(n) ? n : s;
}
export default mixins(RegistrableProvide('treeview'), Themeable
/* @vue/component */
).extend({
    name: 'v-treeview',
    provide: function provide() {
        return { treeview: this };
    },

    props: _extends({
        active: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        items: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        hoverable: Boolean,
        multipleActive: Boolean,
        open: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        openAll: Boolean,
        value: {
            type: Array,
            default: function _default() {
                return [];
            }
        }
    }, VTreeviewNodeProps),
    data: function data() {
        return {
            nodes: {},
            selectedCache: new Set(),
            activeCache: new Set(),
            openCache: new Set()
        };
    },
    watch: {
        items: {
            handler: function handler() {
                // We only care if nodes are removed or added
                if (Object.keys(this.nodes).length === this.countItems(this.items)) return;
                var oldSelectedCache = [].concat(_toConsumableArray(this.selectedCache));
                this.selectedCache = new Set();
                this.activeCache = new Set();
                this.openCache = new Set();
                this.buildTree(this.items);
                // Only emit selected if selection has changed
                // as a result of items changing. This fixes a
                // potential double emit when selecting a node
                // with dynamic children
                if (!deepEqual(oldSelectedCache, [].concat(_toConsumableArray(this.selectedCache)))) this.emitSelected();
            },

            deep: true
        },
        active: function active(value) {
            var _this = this;

            var old = [].concat(_toConsumableArray(this.activeCache));
            if (!value || deepEqual(old, value)) return;
            old.forEach(function (key) {
                return _this.updateActive(key, false);
            });
            value.forEach(function (key) {
                return _this.updateActive(key, true);
            });
            this.emitActive();
        },
        value: function value(_value) {
            var _this2 = this;

            var old = [].concat(_toConsumableArray(this.selectedCache));
            if (!_value || deepEqual(old, _value)) return;
            old.forEach(function (key) {
                return _this2.updateSelected(key, false);
            });
            _value.forEach(function (key) {
                return _this2.updateSelected(key, true);
            });
            this.emitSelected();
        },
        open: function open(value) {
            var _this3 = this;

            var old = [].concat(_toConsumableArray(this.openCache));
            if (deepEqual(old, value)) return;
            old.forEach(function (key) {
                return _this3.updateOpen(key, false);
            });
            value.forEach(function (key) {
                return _this3.updateOpen(key, true);
            });
            this.emitOpen();
        }
    },
    created: function created() {
        var _this4 = this;

        this.buildTree(this.items);
        this.value.forEach(function (key) {
            return _this4.updateSelected(key, true);
        });
        this.emitSelected();
        this.active.forEach(function (key) {
            return _this4.updateActive(key, true);
        });
        this.emitActive();
    },
    mounted: function mounted() {
        var _this5 = this;

        // Save the developer from themselves
        if (this.$slots.prepend || this.$slots.append) {
            consoleWarn('The prepend and append slots require a slot-scope attribute', this);
        }
        if (this.openAll) {
            Object.keys(this.nodes).forEach(function (key) {
                return _this5.updateOpen(ston(key), true);
            });
        } else {
            this.open.forEach(function (key) {
                return _this5.updateOpen(key, true);
            });
        }
        this.emitOpen();
    },

    methods: {
        buildTree: function buildTree(items) {
            var _this6 = this;

            var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var key = getObjectValueByPath(item, this.itemKey);
                var children = getObjectValueByPath(item, this.itemChildren, []);
                var oldNode = this.nodes.hasOwnProperty(key) ? this.nodes[key] : {
                    isSelected: false, isIndeterminate: false, isActive: false, isOpen: false, vnode: null
                };
                var node = {
                    vnode: oldNode.vnode,
                    parent: parent,
                    children: children.map(function (c) {
                        return getObjectValueByPath(c, _this6.itemKey);
                    })
                };
                this.buildTree(children, key);
                // This fixed bug with dynamic children resetting selected parent state
                if (!this.nodes.hasOwnProperty(key) && parent !== null && this.nodes.hasOwnProperty(parent)) {
                    node.isSelected = this.nodes[parent].isSelected;
                    node.isIndeterminate = this.nodes[parent].isIndeterminate;
                } else {
                    node.isSelected = oldNode.isSelected;
                    node.isIndeterminate = oldNode.isIndeterminate;
                }
                node.isActive = oldNode.isActive;
                node.isOpen = oldNode.isOpen;
                this.nodes[key] = !children.length ? node : this.calculateState(node, this.nodes);
                // Don't forget to rebuild cache
                if (this.nodes[key].isSelected) this.selectedCache.add(key);
                if (this.nodes[key].isActive) this.activeCache.add(key);
                if (this.nodes[key].isOpen) this.openCache.add(key);
                this.updateVnodeState(key);
            }
        },
        countItems: function countItems(items) {
            var count = 0;
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                count += 1;
                count += item.children ? this.countItems(item.children) : 0;
            }
            return count;
        },
        calculateState: function calculateState(node, state) {
            var counts = node.children.reduce(function (counts, child) {
                counts[0] += +Boolean(state[child].isSelected);
                counts[1] += +Boolean(state[child].isIndeterminate);
                return counts;
            }, [0, 0]);
            node.isSelected = !!node.children.length && counts[0] === node.children.length;
            node.isIndeterminate = !node.isSelected && (counts[0] > 0 || counts[1] > 0);
            return node;
        },
        emitOpen: function emitOpen() {
            this.$emit('update:open', [].concat(_toConsumableArray(this.openCache)));
        },
        emitSelected: function emitSelected() {
            this.$emit('input', [].concat(_toConsumableArray(this.selectedCache)));
        },
        emitActive: function emitActive() {
            this.$emit('update:active', [].concat(_toConsumableArray(this.activeCache)));
        },
        getDescendants: function getDescendants(key) {
            var _descendants;

            var descendants = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            var children = this.nodes[key].children;
            (_descendants = descendants).push.apply(_descendants, _toConsumableArray(children));
            for (var i = 0; i < children.length; i++) {
                descendants = this.getDescendants(children[i], descendants);
            }
            return descendants;
        },
        getParents: function getParents(key) {
            var parent = this.nodes[key].parent;
            var parents = [];
            while (parent !== null) {
                parents.push(parent);
                parent = this.nodes[parent].parent;
            }
            return parents;
        },
        register: function register(node) {
            var key = getObjectValueByPath(node.item, this.itemKey);
            this.nodes[key].vnode = node;
            this.updateVnodeState(key);
        },
        unregister: function unregister(node) {
            var key = getObjectValueByPath(node.item, this.itemKey);
            this.nodes[key].vnode = null;
        },
        updateActive: function updateActive(key, isActive) {
            var _this7 = this;

            if (!this.nodes.hasOwnProperty(key)) return;
            if (!this.multipleActive) {
                this.activeCache.forEach(function (active) {
                    _this7.nodes[active].isActive = false;
                    _this7.updateVnodeState(active);
                    _this7.activeCache.delete(active);
                });
            }
            var node = this.nodes[key];
            if (!node) return;
            if (isActive) this.activeCache.add(key);else this.activeCache.delete(key);
            node.isActive = isActive;
            this.updateVnodeState(key);
        },
        updateSelected: function updateSelected(key, isSelected) {
            var _this8 = this;

            if (!this.nodes.hasOwnProperty(key)) return;
            var changed = {};
            var descendants = [key].concat(_toConsumableArray(this.getDescendants(key)));
            descendants.forEach(function (descendant) {
                _this8.nodes[descendant].isSelected = isSelected;
                _this8.nodes[descendant].isIndeterminate = false;
                changed[descendant] = isSelected;
            });
            var parents = this.getParents(key);
            parents.forEach(function (parent) {
                _this8.nodes[parent] = _this8.calculateState(_this8.nodes[parent], _this8.nodes);
                changed[parent] = _this8.nodes[parent].isSelected;
            });
            var all = [key].concat(_toConsumableArray(descendants), _toConsumableArray(parents));
            all.forEach(this.updateVnodeState);
            Object.keys(changed).forEach(function (k) {
                changed[k] === true ? _this8.selectedCache.add(ston(k)) : _this8.selectedCache.delete(ston(k));
            });
        },
        updateOpen: function updateOpen(key, isOpen) {
            var _this9 = this;

            if (!this.nodes.hasOwnProperty(key)) return;
            var node = this.nodes[key];
            if (node.children && !node.children.length && node.vnode && !node.vnode.hasLoaded) {
                node.vnode.checkChildren().then(function () {
                    return _this9.updateOpen(key, isOpen);
                });
            } else {
                node.isOpen = isOpen;
                node.isOpen ? this.openCache.add(key) : this.openCache.delete(key);
                this.updateVnodeState(key);
            }
        },
        updateVnodeState: function updateVnodeState(key) {
            var node = this.nodes[key];
            if (node && node.vnode) {
                node.vnode.isSelected = node.isSelected;
                node.vnode.isIndeterminate = node.isIndeterminate;
                node.vnode.isActive = node.isActive;
                node.vnode.isOpen = node.isOpen;
            }
        }
    },
    render: function render(h) {
        var children = this.items.length ? this.items.map(VTreeviewNode.options.methods.genChild.bind(this))
        /* istanbul ignore next */
        : this.$slots.default;
        return h('div', {
            staticClass: 'v-treeview',
            class: _extends({
                'v-treeview--hoverable': this.hoverable
            }, this.themeClasses)
        }, children);
    }
});
//# sourceMappingURL=VTreeview.js.map