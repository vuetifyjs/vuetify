import Colorable from '../../mixins/colorable';
/* @vue/component */
export default {
    name: 'v-tabs-slider',
    mixins: [Colorable],
    render: function render(h) {
        return h('div', this.setBackgroundColor(this.color || 'accent', {
            staticClass: 'v-tabs__slider'
        }));
    }
};
//# sourceMappingURL=VTabsSlider.js.map