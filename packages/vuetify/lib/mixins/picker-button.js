/* @vue/component */
export default {
    methods: {
        genPickerButton: function genPickerButton(prop, value, content) {
            var _this = this;

            var readonly = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
            var staticClass = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

            var active = this[prop] === value;
            var click = function click(event) {
                event.stopPropagation();
                _this.$emit('update:' + prop, value);
            };
            return this.$createElement('div', {
                staticClass: ('v-picker__title__btn ' + staticClass).trim(),
                'class': {
                    'v-picker__title__btn--active': active,
                    'v-picker__title__btn--readonly': readonly
                },
                on: active || readonly ? undefined : { click: click }
            }, Array.isArray(content) ? content : [content]);
        }
    }
};
//# sourceMappingURL=picker-button.js.map