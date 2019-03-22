import '../../stylus/components/_jumbotrons.styl';
// Mixins
import Colorable from '../../mixins/colorable';
import Routable from '../../mixins/routable';
import Themeable from '../../mixins/themeable';
// Utils
import { deprecate } from '../../util/console';
/* @vue/component */
export default {
    name: 'v-jumbotron',
    mixins: [
        Colorable,
        Routable,
        Themeable
    ],
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
        backgroundStyles: function () {
            var styles = {};
            if (this.gradient) {
                styles.background = "linear-gradient(" + this.gradient + ")";
            }
            return styles;
        },
        classes: function () {
            return this.themeClasses;
        },
        styles: function () {
            return {
                height: this.height
            };
        }
    },
    mounted: function () {
        deprecate('v-jumbotron', this.src ? 'v-img' : 'v-responsive', this);
    },
    methods: {
        genBackground: function () {
            return this.$createElement('div', this.setBackgroundColor(this.color, {
                staticClass: 'v-jumbotron__background',
                style: this.backgroundStyles
            }));
        },
        genContent: function () {
            return this.$createElement('div', {
                staticClass: 'v-jumbotron__content'
            }, this.$slots.default);
        },
        genImage: function () {
            if (!this.src)
                return null;
            if (this.$slots.img)
                return this.$slots.img({ src: this.src });
            return this.$createElement('img', {
                staticClass: 'v-jumbotron__image',
                attrs: { src: this.src }
            });
        },
        genWrapper: function () {
            return this.$createElement('div', {
                staticClass: 'v-jumbotron__wrapper'
            }, [
                this.genImage(),
                this.genBackground(),
                this.genContent()
            ]);
        }
    },
    render: function (h) {
        var _a = this.generateRouteLink(this.classes), tag = _a.tag, data = _a.data;
        data.staticClass = 'v-jumbotron';
        data.style = this.styles;
        return h(tag, data, [this.genWrapper()]);
    }
};
//# sourceMappingURL=VJumbotron.js.map
//# sourceMappingURL=VJumbotron.js.map
//# sourceMappingURL=VJumbotron.js.map