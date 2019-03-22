// Types
import Vue from 'vue';
/* @vue/component */
export default Vue.extend({
    name: 'v-card-title',
    functional: true,
    props: {
        primaryTitle: Boolean
    },
    render: function (h, _a) {
        var data = _a.data, props = _a.props, children = _a.children;
        data.staticClass = ("v-card__title " + (data.staticClass || '')).trim();
        if (props.primaryTitle)
            data.staticClass += ' v-card__title--primary';
        return h('div', data, children);
    }
});
//# sourceMappingURL=VCardTitle.js.map
//# sourceMappingURL=VCardTitle.js.map
//# sourceMappingURL=VCardTitle.js.map
//# sourceMappingURL=VCardTitle.js.map