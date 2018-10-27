import '../../stylus/components/_breadcrumbs.styl';
/* @vue/component */
export default {
    name: 'v-breadcrumbs',
    props: {
        divider: {
            type: String,
            default: '/'
        },
        large: Boolean,
        justifyCenter: Boolean,
        justifyEnd: Boolean
    },
    computed: {
        classes() {
            return {
                'v-breadcrumbs--large': this.large
            };
        },
        computedDivider() {
            return this.$slots.divider
                ? this.$slots.divider
                : this.divider;
        },
        styles() {
            const justify = this.justifyCenter
                ? 'center'
                : this.justifyEnd
                    ? 'flex-end'
                    : 'flex-start';
            return {
                'justify-content': justify
            };
        }
    },
    methods: {
        /**
         * Add dividers between
         * v-breadcrumbs-item
         *
         * @return {array}
         */
        genChildren() {
            if (!this.$slots.default)
                return null;
            const h = this.$createElement;
            const children = [];
            const dividerData = { staticClass: 'v-breadcrumbs__divider' };
            let createDividers = false;
            for (let i = 0; i < this.$slots.default.length; i++) {
                const elm = this.$slots.default[i];
                if (!elm.componentOptions ||
                    elm.componentOptions.Ctor.options.name !== 'v-breadcrumbs-item') {
                    children.push(elm);
                }
                else {
                    if (createDividers) {
                        children.push(h('li', dividerData, this.computedDivider));
                    }
                    children.push(elm);
                    createDividers = true;
                }
            }
            return children;
        }
    },
    render(h) {
        return h('ul', {
            staticClass: 'v-breadcrumbs',
            'class': this.classes,
            style: this.styles
        }, this.genChildren());
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkJyZWFkY3J1bWJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVkJyZWFkY3J1bWJzL1ZCcmVhZGNydW1icy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLDJDQUEyQyxDQUFBO0FBRWxELG9CQUFvQjtBQUNwQixlQUFlO0lBQ2IsSUFBSSxFQUFFLGVBQWU7SUFFckIsS0FBSyxFQUFFO1FBQ0wsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsR0FBRztTQUNiO1FBQ0QsS0FBSyxFQUFFLE9BQU87UUFDZCxhQUFhLEVBQUUsT0FBTztRQUN0QixVQUFVLEVBQUUsT0FBTztLQUNwQjtJQUVELFFBQVEsRUFBRTtRQUNSLE9BQU87WUFDTCxPQUFPO2dCQUNMLHNCQUFzQixFQUFFLElBQUksQ0FBQyxLQUFLO2FBQ25DLENBQUE7UUFDSCxDQUFDO1FBQ0QsZUFBZTtZQUNiLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPO2dCQUN4QixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPO2dCQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtRQUNsQixDQUFDO1FBQ0QsTUFBTTtZQUNKLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhO2dCQUNoQyxDQUFDLENBQUMsUUFBUTtnQkFDVixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVU7b0JBQ2YsQ0FBQyxDQUFDLFVBQVU7b0JBQ1osQ0FBQyxDQUFDLFlBQVksQ0FBQTtZQUVsQixPQUFPO2dCQUNMLGlCQUFpQixFQUFFLE9BQU87YUFDM0IsQ0FBQTtRQUNILENBQUM7S0FDRjtJQUVELE9BQU8sRUFBRTtRQUNQOzs7OztXQUtHO1FBQ0gsV0FBVztZQUNULElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87Z0JBQUUsT0FBTyxJQUFJLENBQUE7WUFFckMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQTtZQUM3QixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUE7WUFDbkIsTUFBTSxXQUFXLEdBQUcsRUFBRSxXQUFXLEVBQUUsd0JBQXdCLEVBQUUsQ0FBQTtZQUU3RCxJQUFJLGNBQWMsR0FBRyxLQUFLLENBQUE7WUFDMUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbkQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBRWxDLElBQ0UsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCO29CQUNyQixHQUFHLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssb0JBQW9CLEVBQy9EO29CQUNBLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7aUJBQ25CO3FCQUFNO29CQUNMLElBQUksY0FBYyxFQUFFO3dCQUNsQixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFBO3FCQUMxRDtvQkFDRCxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO29CQUNsQixjQUFjLEdBQUcsSUFBSSxDQUFBO2lCQUN0QjthQUNGO1lBRUQsT0FBTyxRQUFRLENBQUE7UUFDakIsQ0FBQztLQUNGO0lBRUQsTUFBTSxDQUFFLENBQUM7UUFDUCxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUU7WUFDYixXQUFXLEVBQUUsZUFBZTtZQUM1QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ25CLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUE7SUFDeEIsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uLy4uL3N0eWx1cy9jb21wb25lbnRzL19icmVhZGNydW1icy5zdHlsJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi1icmVhZGNydW1icycsXG5cbiAgcHJvcHM6IHtcbiAgICBkaXZpZGVyOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnLydcbiAgICB9LFxuICAgIGxhcmdlOiBCb29sZWFuLFxuICAgIGp1c3RpZnlDZW50ZXI6IEJvb2xlYW4sXG4gICAganVzdGlmeUVuZDogQm9vbGVhblxuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgY2xhc3NlcyAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAndi1icmVhZGNydW1icy0tbGFyZ2UnOiB0aGlzLmxhcmdlXG4gICAgICB9XG4gICAgfSxcbiAgICBjb21wdXRlZERpdmlkZXIgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJHNsb3RzLmRpdmlkZXJcbiAgICAgICAgPyB0aGlzLiRzbG90cy5kaXZpZGVyXG4gICAgICAgIDogdGhpcy5kaXZpZGVyXG4gICAgfSxcbiAgICBzdHlsZXMgKCkge1xuICAgICAgY29uc3QganVzdGlmeSA9IHRoaXMuanVzdGlmeUNlbnRlclxuICAgICAgICA/ICdjZW50ZXInXG4gICAgICAgIDogdGhpcy5qdXN0aWZ5RW5kXG4gICAgICAgICAgPyAnZmxleC1lbmQnXG4gICAgICAgICAgOiAnZmxleC1zdGFydCdcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6IGp1c3RpZnlcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIC8qKlxuICAgICAqIEFkZCBkaXZpZGVycyBiZXR3ZWVuXG4gICAgICogdi1icmVhZGNydW1icy1pdGVtXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHthcnJheX1cbiAgICAgKi9cbiAgICBnZW5DaGlsZHJlbiAoKSB7XG4gICAgICBpZiAoIXRoaXMuJHNsb3RzLmRlZmF1bHQpIHJldHVybiBudWxsXG5cbiAgICAgIGNvbnN0IGggPSB0aGlzLiRjcmVhdGVFbGVtZW50XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IFtdXG4gICAgICBjb25zdCBkaXZpZGVyRGF0YSA9IHsgc3RhdGljQ2xhc3M6ICd2LWJyZWFkY3J1bWJzX19kaXZpZGVyJyB9XG5cbiAgICAgIGxldCBjcmVhdGVEaXZpZGVycyA9IGZhbHNlXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuJHNsb3RzLmRlZmF1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZWxtID0gdGhpcy4kc2xvdHMuZGVmYXVsdFtpXVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAhZWxtLmNvbXBvbmVudE9wdGlvbnMgfHxcbiAgICAgICAgICBlbG0uY29tcG9uZW50T3B0aW9ucy5DdG9yLm9wdGlvbnMubmFtZSAhPT0gJ3YtYnJlYWRjcnVtYnMtaXRlbSdcbiAgICAgICAgKSB7XG4gICAgICAgICAgY2hpbGRyZW4ucHVzaChlbG0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGNyZWF0ZURpdmlkZXJzKSB7XG4gICAgICAgICAgICBjaGlsZHJlbi5wdXNoKGgoJ2xpJywgZGl2aWRlckRhdGEsIHRoaXMuY29tcHV0ZWREaXZpZGVyKSlcbiAgICAgICAgICB9XG4gICAgICAgICAgY2hpbGRyZW4ucHVzaChlbG0pXG4gICAgICAgICAgY3JlYXRlRGl2aWRlcnMgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNoaWxkcmVuXG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoaCkge1xuICAgIHJldHVybiBoKCd1bCcsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAndi1icmVhZGNydW1icycsXG4gICAgICAnY2xhc3MnOiB0aGlzLmNsYXNzZXMsXG4gICAgICBzdHlsZTogdGhpcy5zdHlsZXNcbiAgICB9LCB0aGlzLmdlbkNoaWxkcmVuKCkpXG4gIH1cbn1cbiJdfQ==