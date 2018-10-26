import '../../../src/stylus/components/_jumbotrons.styl';
// Mixins
import Colorable from '../../mixins/colorable';
import Routable from '../../mixins/routable';
import Themeable from '../../mixins/themeable';
// Utils
import { deprecate } from '../../util/console';
/* @vue/component */
export default {
    name: 'v-jumbotron',
    mixins: [Colorable, Routable, Themeable],
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
        deprecate('v-jumbotron', this.src ? 'v-img' : 'v-responsive', this);
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
//# sourceMappingURL=VJumbotron.js.map