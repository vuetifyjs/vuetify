import '../../stylus/components/_subheaders.styl';
import Themeable from '../../mixins/themeable';
/* @vue/component */
export default {
    name: 'v-subheader',
    mixins: [Themeable],
    props: {
        inset: Boolean
    },
    render(h) {
        return h('div', {
            staticClass: 'v-subheader',
            class: {
                'v-subheader--inset': this.inset,
                ...this.themeClasses
            },
            attrs: this.$attrs,
            on: this.$listeners
        }, this.$slots.default);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlN1YmhlYWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZTdWJoZWFkZXIvVlN1YmhlYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLDBDQUEwQyxDQUFBO0FBRWpELE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFBO0FBRTlDLG9CQUFvQjtBQUNwQixlQUFlO0lBQ2IsSUFBSSxFQUFFLGFBQWE7SUFFbkIsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO0lBRW5CLEtBQUssRUFBRTtRQUNMLEtBQUssRUFBRSxPQUFPO0tBQ2Y7SUFFRCxNQUFNLENBQUUsQ0FBQztRQUNQLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUNkLFdBQVcsRUFBRSxhQUFhO1lBQzFCLEtBQUssRUFBRTtnQkFDTCxvQkFBb0IsRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDaEMsR0FBRyxJQUFJLENBQUMsWUFBWTthQUNyQjtZQUNELEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNsQixFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVU7U0FDcEIsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3pCLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fc3ViaGVhZGVycy5zdHlsJ1xuXG5pbXBvcnQgVGhlbWVhYmxlIGZyb20gJy4uLy4uL21peGlucy90aGVtZWFibGUnXG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICd2LXN1YmhlYWRlcicsXG5cbiAgbWl4aW5zOiBbVGhlbWVhYmxlXSxcblxuICBwcm9wczoge1xuICAgIGluc2V0OiBCb29sZWFuXG4gIH0sXG5cbiAgcmVuZGVyIChoKSB7XG4gICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAndi1zdWJoZWFkZXInLFxuICAgICAgY2xhc3M6IHtcbiAgICAgICAgJ3Ytc3ViaGVhZGVyLS1pbnNldCc6IHRoaXMuaW5zZXQsXG4gICAgICAgIC4uLnRoaXMudGhlbWVDbGFzc2VzXG4gICAgICB9LFxuICAgICAgYXR0cnM6IHRoaXMuJGF0dHJzLFxuICAgICAgb246IHRoaXMuJGxpc3RlbmVyc1xuICAgIH0sIHRoaXMuJHNsb3RzLmRlZmF1bHQpXG4gIH1cbn1cbiJdfQ==