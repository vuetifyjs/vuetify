function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export default {
    bar: 0,
    bottom: 0,
    footer: 0,
    insetFooter: 0,
    left: 0,
    right: 0,
    top: 0,
    components: {
        bar: {},
        bottom: {},
        footer: {},
        insetFooter: {},
        left: {},
        right: {},
        top: {}
    },
    bind: function bind(uid, target, value) {
        if (!this.components[target]) return;
        this.components[target] = _defineProperty({}, uid, value);
        this.update(target);
    },
    unbind: function unbind(uid, target) {
        if (this.components[target][uid] == null) return;
        delete this.components[target][uid];
        this.update(target);
    },
    update: function update(target) {
        this[target] = Object.values(this.components[target]).reduce(function (acc, cur) {
            return acc + cur;
        }, 0);
    }
};
//# sourceMappingURL=application.js.map