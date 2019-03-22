var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
// Styles
import '../../stylus/components/_treeview.styl';
// Components
import VTreeviewNode, { VTreeviewNodeProps } from './VTreeviewNode';
// Mixins
import Themeable from '../../mixins/themeable';
import { provide as RegistrableProvide } from '../../mixins/registrable';
// Utils
import { arrayDiff, deepEqual, getObjectValueByPath } from '../../util/helpers';
import mixins from '../../util/mixins';
import { consoleWarn } from '../../util/console';
import { filterTreeItems, filterTreeItem } from './util/filterTreeItems';
export default mixins(RegistrableProvide('treeview'), Themeable
/* @vue/component */
).extend({
    name: 'v-treeview',
    provide: function () {
        return { treeview: this };
    },
    props: __assign({ active: {
            type: Array,
            default: function () { return ([]); }
        }, items: {
            type: Array,
            default: function () { return ([]); }
        }, hoverable: Boolean, multipleActive: Boolean, open: {
            type: Array,
            default: function () { return ([]); }
        }, openAll: Boolean, returnObject: {
            type: Boolean,
            default: false // TODO: Should be true in next major
        }, value: {
            type: Array,
            default: function () { return ([]); }
        }, search: String, filter: Function }, VTreeviewNodeProps),
    data: function () { return ({
        nodes: {},
        selectedCache: new Set(),
        activeCache: new Set(),
        openCache: new Set()
    }); },
    computed: {
        excludedItems: function () {
            var excluded = new Set();
            if (!this.search)
                return excluded;
            for (var i = 0; i < this.items.length; i++) {
                filterTreeItems(this.filter || filterTreeItem, this.items[i], this.search, this.itemKey, this.itemText, this.itemChildren, excluded);
            }
            return excluded;
        }
    },
    watch: {
        items: {
            handler: function () {
                var _this = this;
                var oldKeys = Object.keys(this.nodes).map(function (k) { return getObjectValueByPath(_this.nodes[k].item, _this.itemKey); });
                var newKeys = this.getKeys(this.items);
                var diff = arrayDiff(newKeys, oldKeys);
                // We only want to do stuff if items have changed
                if (!diff.length && newKeys.length < oldKeys.length)
                    return;
                // If nodes are removed we need to clear them from this.nodes
                diff.forEach(function (k) { return delete _this.nodes[k]; });
                var oldSelectedCache = __spread(this.selectedCache);
                this.selectedCache = new Set();
                this.activeCache = new Set();
                this.openCache = new Set();
                this.buildTree(this.items);
                // Only emit selected if selection has changed
                // as a result of items changing. This fixes a
                // potential double emit when selecting a node
                // with dynamic children
                if (!deepEqual(oldSelectedCache, __spread(this.selectedCache)))
                    this.emitSelected();
            },
            deep: true
        },
        active: function (value) {
            this.handleNodeCacheWatcher(value, this.activeCache, this.updateActive, this.emitActive);
        },
        value: function (value) {
            this.handleNodeCacheWatcher(value, this.selectedCache, this.updateSelected, this.emitSelected);
        },
        open: function (value) {
            this.handleNodeCacheWatcher(value, this.openCache, this.updateOpen, this.emitOpen);
        }
    },
    created: function () {
        var _this = this;
        this.buildTree(this.items);
        this.value.forEach(function (key) { return _this.updateSelected(key, true); });
        this.emitSelected();
        this.active.forEach(function (key) { return _this.updateActive(key, true); });
        this.emitActive();
    },
    mounted: function () {
        var _this = this;
        // Save the developer from themselves
        if (this.$slots.prepend || this.$slots.append) {
            consoleWarn('The prepend and append slots require a slot-scope attribute', this);
        }
        if (this.openAll) {
            this.updateAll(true);
        }
        else {
            this.open.forEach(function (key) { return _this.updateOpen(key, true); });
            this.emitOpen();
        }
    },
    methods: {
        /** @public */
        updateAll: function (value) {
            var _this = this;
            Object.keys(this.nodes).forEach(function (key) { return _this.updateOpen(getObjectValueByPath(_this.nodes[key].item, _this.itemKey), value); });
            this.emitOpen();
        },
        getKeys: function (items, keys) {
            if (keys === void 0) { keys = []; }
            for (var i = 0; i < items.length; i++) {
                var key = getObjectValueByPath(items[i], this.itemKey);
                keys.push(key);
                var children = getObjectValueByPath(items[i], this.itemChildren);
                if (children) {
                    keys.push.apply(keys, __spread(this.getKeys(children)));
                }
            }
            return keys;
        },
        buildTree: function (items, parent) {
            var _this = this;
            if (parent === void 0) { parent = null; }
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
                    children: children.map(function (c) { return getObjectValueByPath(c, _this.itemKey); }),
                    item: item
                };
                this.buildTree(children, key);
                // This fixed bug with dynamic children resetting selected parent state
                if (!this.nodes.hasOwnProperty(key) && parent !== null && this.nodes.hasOwnProperty(parent)) {
                    node.isSelected = this.nodes[parent].isSelected;
                    node.isIndeterminate = this.nodes[parent].isIndeterminate;
                }
                else {
                    node.isSelected = oldNode.isSelected;
                    node.isIndeterminate = oldNode.isIndeterminate;
                }
                node.isActive = oldNode.isActive;
                node.isOpen = oldNode.isOpen;
                this.nodes[key] = !children.length ? node : this.calculateState(node, this.nodes);
                // Don't forget to rebuild cache
                if (this.nodes[key].isSelected)
                    this.selectedCache.add(key);
                if (this.nodes[key].isActive)
                    this.activeCache.add(key);
                if (this.nodes[key].isOpen)
                    this.openCache.add(key);
                this.updateVnodeState(key);
            }
        },
        calculateState: function (node, state) {
            var counts = node.children.reduce(function (counts, child) {
                counts[0] += +Boolean(state[child].isSelected);
                counts[1] += +Boolean(state[child].isIndeterminate);
                return counts;
            }, [0, 0]);
            node.isSelected = !!node.children.length && counts[0] === node.children.length;
            node.isIndeterminate = !node.isSelected && (counts[0] > 0 || counts[1] > 0);
            return node;
        },
        emitOpen: function () {
            this.emitNodeCache('update:open', this.openCache);
        },
        emitSelected: function () {
            this.emitNodeCache('input', this.selectedCache);
        },
        emitActive: function () {
            this.emitNodeCache('update:active', this.activeCache);
        },
        emitNodeCache: function (event, cache) {
            var _this = this;
            this.$emit(event, this.returnObject ? __spread(cache).map(function (key) { return _this.nodes[key].item; }) : __spread(cache));
        },
        handleNodeCacheWatcher: function (value, cache, updateFn, emitFn) {
            var _this = this;
            value = this.returnObject ? value.map(function (v) { return getObjectValueByPath(v, _this.itemKey); }) : value;
            var old = __spread(cache);
            if (deepEqual(old, value))
                return;
            old.forEach(function (key) { return updateFn(key, false); });
            value.forEach(function (key) { return updateFn(key, true); });
            emitFn();
        },
        getDescendants: function (key, descendants) {
            if (descendants === void 0) { descendants = []; }
            var children = this.nodes[key].children;
            descendants.push.apply(descendants, __spread(children));
            for (var i = 0; i < children.length; i++) {
                descendants = this.getDescendants(children[i], descendants);
            }
            return descendants;
        },
        getParents: function (key) {
            var parent = this.nodes[key].parent;
            var parents = [];
            while (parent !== null) {
                parents.push(parent);
                parent = this.nodes[parent].parent;
            }
            return parents;
        },
        register: function (node) {
            var key = getObjectValueByPath(node.item, this.itemKey);
            this.nodes[key].vnode = node;
            this.updateVnodeState(key);
        },
        unregister: function (node) {
            var key = getObjectValueByPath(node.item, this.itemKey);
            if (this.nodes[key])
                this.nodes[key].vnode = null;
        },
        updateActive: function (key, isActive) {
            var _this = this;
            if (!this.nodes.hasOwnProperty(key))
                return;
            if (!this.multipleActive) {
                this.activeCache.forEach(function (active) {
                    _this.nodes[active].isActive = false;
                    _this.updateVnodeState(active);
                    _this.activeCache.delete(active);
                });
            }
            var node = this.nodes[key];
            if (!node)
                return;
            if (isActive)
                this.activeCache.add(key);
            else
                this.activeCache.delete(key);
            node.isActive = isActive;
            this.updateVnodeState(key);
        },
        updateSelected: function (key, isSelected) {
            var _this = this;
            var e_1, _a;
            if (!this.nodes.hasOwnProperty(key))
                return;
            var changed = new Map();
            var descendants = __spread([key], this.getDescendants(key));
            descendants.forEach(function (descendant) {
                _this.nodes[descendant].isSelected = isSelected;
                _this.nodes[descendant].isIndeterminate = false;
                changed.set(descendant, isSelected);
            });
            var parents = this.getParents(key);
            parents.forEach(function (parent) {
                _this.nodes[parent] = _this.calculateState(_this.nodes[parent], _this.nodes);
                changed.set(parent, _this.nodes[parent].isSelected);
            });
            var all = __spread([key], descendants, parents);
            all.forEach(this.updateVnodeState);
            try {
                for (var _b = __values(changed.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), key_1 = _d[0], value = _d[1];
                    value === true ? this.selectedCache.add(key_1) : this.selectedCache.delete(key_1);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        },
        updateOpen: function (key, isOpen) {
            var _this = this;
            if (!this.nodes.hasOwnProperty(key))
                return;
            var node = this.nodes[key];
            var children = getObjectValueByPath(node.item, this.itemChildren);
            if (children && !children.length && node.vnode && !node.vnode.hasLoaded) {
                node.vnode.checkChildren().then(function () { return _this.updateOpen(key, isOpen); });
            }
            else if (children && children.length) {
                node.isOpen = isOpen;
                node.isOpen ? this.openCache.add(key) : this.openCache.delete(key);
                this.updateVnodeState(key);
            }
        },
        updateVnodeState: function (key) {
            var node = this.nodes[key];
            if (node && node.vnode) {
                node.vnode.isSelected = node.isSelected;
                node.vnode.isIndeterminate = node.isIndeterminate;
                node.vnode.isActive = node.isActive;
                node.vnode.isOpen = node.isOpen;
            }
        },
        isExcluded: function (key) {
            return !!this.search && this.excludedItems.has(key);
        }
    },
    render: function (h) {
        var children = this.items.length
            ? this.items.map(VTreeviewNode.options.methods.genChild.bind(this))
            /* istanbul ignore next */
            : this.$slots.default; // TODO: remove type annotation with TS 3.2
        return h('div', {
            staticClass: 'v-treeview',
            class: __assign({ 'v-treeview--hoverable': this.hoverable }, this.themeClasses)
        }, children);
    }
});
//# sourceMappingURL=VTreeview.js.map