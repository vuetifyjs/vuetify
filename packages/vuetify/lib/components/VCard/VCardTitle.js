// Types
import Vue from 'vue';
/* @vue/component */
export default Vue.extend({
    name: 'v-card-title',
    functional: true,
    props: {
        primaryTitle: Boolean
    },
    render: function render(h, _ref) {
        var data = _ref.data,
            props = _ref.props,
            children = _ref.children;

        data.staticClass = ('v-card__title ' + (data.staticClass || '')).trim();
        if (props.primaryTitle) data.staticClass += ' v-card__title--primary';
        return h('div', data, children);
    }
});
//# sourceMappingURL=VCardTitle.js.map