// Styles
import '../../stylus/components/_forms.styl';
import { provide as RegistrableProvide } from '../../mixins/registrable';
/* @vue/component */
export default {
    name: 'v-form',
    mixins: [RegistrableProvide('form')],
    inheritAttrs: false,
    props: {
        value: Boolean,
        lazyValidation: Boolean
    },
    data: function () {
        return {
            inputs: [],
            watchers: [],
            errorBag: {}
        };
    },
    watch: {
        errorBag: {
            handler: function () {
                var errors = Object.values(this.errorBag).includes(true);
                this.$emit('input', !errors);
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        watchInput: function (input) {
            var _this = this;
            var watcher = function (input) {
                return input.$watch('hasError', function (val) {
                    _this.$set(_this.errorBag, input._uid, val);
                }, { immediate: true });
            };
            var watchers = {
                _uid: input._uid,
                valid: undefined,
                shouldValidate: undefined
            };
            if (this.lazyValidation) {
                // Only start watching inputs if we need to
                watchers.shouldValidate = input.$watch('shouldValidate', function (val) {
                    if (!val)
                        return;
                    // Only watch if we're not already doing it
                    if (_this.errorBag.hasOwnProperty(input._uid))
                        return;
                    watchers.valid = watcher(input);
                });
            }
            else {
                watchers.valid = watcher(input);
            }
            return watchers;
        },
        /** @public */
        validate: function () {
            var errors = this.inputs.filter(function (input) { return !input.validate(true); }).length;
            return !errors;
        },
        /** @public */
        reset: function () {
            var _this = this;
            for (var i = this.inputs.length; i--;) {
                this.inputs[i].reset();
            }
            if (this.lazyValidation) {
                // Account for timeout in validatable
                setTimeout(function () {
                    _this.errorBag = {};
                }, 0);
            }
        },
        /** @public */
        resetValidation: function () {
            var _this = this;
            for (var i = this.inputs.length; i--;) {
                this.inputs[i].resetValidation();
            }
            if (this.lazyValidation) {
                // Account for timeout in validatable
                setTimeout(function () {
                    _this.errorBag = {};
                }, 0);
            }
        },
        register: function (input) {
            var unwatch = this.watchInput(input);
            this.inputs.push(input);
            this.watchers.push(unwatch);
        },
        unregister: function (input) {
            var found = this.inputs.find(function (i) { return i._uid === input._uid; });
            if (!found)
                return;
            var unwatch = this.watchers.find(function (i) { return i._uid === found._uid; });
            unwatch.valid && unwatch.valid();
            unwatch.shouldValidate && unwatch.shouldValidate();
            this.watchers = this.watchers.filter(function (i) { return i._uid !== found._uid; });
            this.inputs = this.inputs.filter(function (i) { return i._uid !== found._uid; });
            this.$delete(this.errorBag, found._uid);
        }
    },
    render: function (h) {
        var _this = this;
        return h('form', {
            staticClass: 'v-form',
            attrs: Object.assign({
                novalidate: true
            }, this.$attrs),
            on: {
                submit: function (e) { return _this.$emit('submit', e); }
            }
        }, this.$slots.default);
    }
};
//# sourceMappingURL=VForm.js.map
//# sourceMappingURL=VForm.js.map
//# sourceMappingURL=VForm.js.map