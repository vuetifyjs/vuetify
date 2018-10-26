'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('../../../src/stylus/components/_jumbotrons.styl');

var _colorable = require('../../mixins/colorable');

var _colorable2 = _interopRequireDefault(_colorable);

var _routable = require('../../mixins/routable');

var _routable2 = _interopRequireDefault(_routable);

var _themeable = require('../../mixins/themeable');

var _themeable2 = _interopRequireDefault(_themeable);

var _console = require('../../util/console');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */

// Mixins
exports.default = {
    name: 'v-jumbotron',
    mixins: [_colorable2.default, _routable2.default, _themeable2.default],
    props: {
        gradient: String,
        height: {
            type: [Number, String],
            default: '400px'
        },
        src: String,
        tag: {
            type: String,
            default: 'div'
        }
    },
    computed: {
        backgroundStyles: function backgroundStyles() {
            var styles = {};
            if (this.gradient) {
                styles.background = 'linear-gradient(' + this.gradient + ')';
            }
            return styles;
        },
        classes: function classes() {
            return this.themeClasses;
        },
        styles: function styles() {
            return {
                height: this.height
            };
        }
    },
    mounted: function mounted() {
        (0, _console.deprecate)('v-jumbotron', this.src ? 'v-img' : 'v-responsive', this);
    },

    methods: {
        genBackground: function genBackground() {
            return this.$createElement('div', this.setBackgroundColor(this.color, {
                staticClass: 'v-jumbotron__background',
                style: this.backgroundStyles
            }));
        },
        genContent: function genContent() {
            return this.$createElement('div', {
                staticClass: 'v-jumbotron__content'
            }, this.$slots.default);
        },
        genImage: function genImage() {
            if (!this.src) return null;
            if (this.$slots.img) return this.$slots.img({ src: this.src });
            return this.$createElement('img', {
                staticClass: 'v-jumbotron__image',
                attrs: { src: this.src }
            });
        },
        genWrapper: function genWrapper() {
            return this.$createElement('div', {
                staticClass: 'v-jumbotron__wrapper'
            }, [this.genImage(), this.genBackground(), this.genContent()]);
        }
    },
    render: function render(h) {
        var _generateRouteLink = this.generateRouteLink(this.classes),
            tag = _generateRouteLink.tag,
            data = _generateRouteLink.data;

        data.staticClass = 'v-jumbotron';
        data.style = this.styles;
        return h(tag, data, [this.genWrapper()]);
    }
};
// Utils
//# sourceMappingURL=VJumbotron.js.map