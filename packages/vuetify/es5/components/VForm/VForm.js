'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('../../../src/stylus/components/_forms.styl');

var _registrable = require('../../mixins/registrable');

/* @vue/component */
// Styles
exports.default = {
    name: 'v-form',
    mixins: [(0, _registrable.provide)('form')],
    inheritAttrs: false,
    props: {
        value: Boolean,
        lazyValidation: Boolean
    },
    data: function data() {
        return {
            inputs: [],
            watchers: [],
            errorBag: {}
        };
    },

    watch: {
        errorBag: {
            handler: function handler() {
                var errors = Object.values(this.errorBag).includes(true);
                this.$emit('input', !errors);
            },

            deep: true,
            immediate: true
        }
    },
    methods: {
        watchInput: function watchInput(input) {
            var _this = this;

            var watcher = function watcher(input) {
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
                    if (!val) return;
                    // Only watch if we're not already doing it
                    if (_this.errorBag.hasOwnProperty(input._uid)) return;
                    watchers.valid = watcher(input);
                });
            } else {
                watchers.valid = watcher(input);
            }
            return watchers;
        },

        /** @public */
        validate: function validate() {
            var errors = this.inputs.filter(function (input) {
                return !input.validate(true);
            }).length;
            return !errors;
        },

        /** @public */
        reset: function reset() {
            var _this2 = this;

            for (var i = this.inputs.length; i--;) {
                this.inputs[i].reset();
            }
            if (this.lazyValidation) {
                // Account for timeout in validatable
                setTimeout(function () {
                    _this2.errorBag = {};
                }, 0);
            }
        },

        /** @public */
        resetValidation: function resetValidation() {
            var _this3 = this;

            for (var i = this.inputs.length; i--;) {
                this.inputs[i].resetValidation();
            }
            if (this.lazyValidation) {
                // Account for timeout in validatable
                setTimeout(function () {
                    _this3.errorBag = {};
                }, 0);
            }
        },
        register: function register(input) {
            var unwatch = this.watchInput(input);
            this.inputs.push(input);
            this.watchers.push(unwatch);
        },
        unregister: function unregister(input) {
            var found = this.inputs.find(function (i) {
                return i._uid === input._uid;
            });
            if (!found) return;
            var unwatch = this.watchers.find(function (i) {
                return i._uid === found._uid;
            });
            unwatch.valid && unwatch.valid();
            unwatch.shouldValidate && unwatch.shouldValidate();
            this.watchers = this.watchers.filter(function (i) {
                return i._uid !== found._uid;
            });
            this.inputs = this.inputs.filter(function (i) {
                return i._uid !== found._uid;
            });
            this.$delete(this.errorBag, found._uid);
        }
    },
    render: function render(h) {
        var _this4 = this;

        return h('form', {
            staticClass: 'v-form',
            attrs: Object.assign({
                novalidate: true
            }, this.$attrs),
            on: {
                submit: function submit(e) {
                    return _this4.$emit('submit', e);
                }
            }
        }, this.$slots.default);
    }
};
//# sourceMappingURL=VForm.js.map