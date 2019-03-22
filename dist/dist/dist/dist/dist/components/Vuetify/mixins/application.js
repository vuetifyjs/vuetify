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
    bind: function (uid, target, value) {
        var _a;
        if (!this.components[target])
            return;
        this.components[target] = (_a = {}, _a[uid] = value, _a);
        this.update(target);
    },
    unbind: function (uid, target) {
        if (this.components[target][uid] == null)
            return;
        delete this.components[target][uid];
        this.update(target);
    },
    update: function (target) {
        this[target] = Object.values(this.components[target])
            .reduce(function (acc, cur) { return (acc + cur); }, 0);
    }
};
//# sourceMappingURL=application.js.map
//# sourceMappingURL=application.js.map
//# sourceMappingURL=application.js.map
//# sourceMappingURL=application.js.map
//# sourceMappingURL=application.js.map