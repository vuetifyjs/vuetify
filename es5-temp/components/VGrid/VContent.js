// Styles
import '../../stylus/components/_content.styl';
// Mixins
import SSRBootable from '../../mixins/ssr-bootable';
/* @vue/component */
export default {
    name: 'v-content',
    mixins: [SSRBootable],
    props: {
        tag: {
            type: String,
            default: 'main'
        }
    },
    computed: {
        styles() {
            const { bar, top, right, footer, bottom, left } = this.$vuetify.application;
            return {
                paddingTop: `${top + bar}px`,
                paddingRight: `${right}px`,
                paddingBottom: `${footer + bottom}px`,
                paddingLeft: `${left}px`
            };
        }
    },
    render(h) {
        const data = {
            staticClass: 'v-content',
            style: this.styles,
            ref: 'content'
        };
        return h(this.tag, data, [
            h('div', { staticClass: 'v-content__wrap' }, this.$slots.default)
        ]);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkNvbnRlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WR3JpZC9WQ29udGVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyx1Q0FBdUMsQ0FBQTtBQUU5QyxTQUFTO0FBQ1QsT0FBTyxXQUFXLE1BQU0sMkJBQTJCLENBQUE7QUFFbkQsb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsV0FBVztJQUVqQixNQUFNLEVBQUUsQ0FBQyxXQUFXLENBQUM7SUFFckIsS0FBSyxFQUFFO1FBQ0wsR0FBRyxFQUFFO1lBQ0gsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsTUFBTTtTQUNoQjtLQUNGO0lBRUQsUUFBUSxFQUFFO1FBQ1IsTUFBTTtZQUNKLE1BQU0sRUFDSixHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFDdEMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQTtZQUU3QixPQUFPO2dCQUNMLFVBQVUsRUFBRSxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUk7Z0JBQzVCLFlBQVksRUFBRSxHQUFHLEtBQUssSUFBSTtnQkFDMUIsYUFBYSxFQUFFLEdBQUcsTUFBTSxHQUFHLE1BQU0sSUFBSTtnQkFDckMsV0FBVyxFQUFFLEdBQUcsSUFBSSxJQUFJO2FBQ3pCLENBQUE7UUFDSCxDQUFDO0tBQ0Y7SUFFRCxNQUFNLENBQUUsQ0FBQztRQUNQLE1BQU0sSUFBSSxHQUFHO1lBQ1gsV0FBVyxFQUFFLFdBQVc7WUFDeEIsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ2xCLEdBQUcsRUFBRSxTQUFTO1NBQ2YsQ0FBQTtRQUVELE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFO1lBQ3ZCLENBQUMsQ0FDQyxLQUFLLEVBQ0wsRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsRUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQ3BCO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTdHlsZXNcbmltcG9ydCAnLi4vLi4vc3R5bHVzL2NvbXBvbmVudHMvX2NvbnRlbnQuc3R5bCdcblxuLy8gTWl4aW5zXG5pbXBvcnQgU1NSQm9vdGFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL3Nzci1ib290YWJsZSdcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3YtY29udGVudCcsXG5cbiAgbWl4aW5zOiBbU1NSQm9vdGFibGVdLFxuXG4gIHByb3BzOiB7XG4gICAgdGFnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnbWFpbidcbiAgICB9XG4gIH0sXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBzdHlsZXMgKCkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBiYXIsIHRvcCwgcmlnaHQsIGZvb3RlciwgYm90dG9tLCBsZWZ0XG4gICAgICB9ID0gdGhpcy4kdnVldGlmeS5hcHBsaWNhdGlvblxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYWRkaW5nVG9wOiBgJHt0b3AgKyBiYXJ9cHhgLFxuICAgICAgICBwYWRkaW5nUmlnaHQ6IGAke3JpZ2h0fXB4YCxcbiAgICAgICAgcGFkZGluZ0JvdHRvbTogYCR7Zm9vdGVyICsgYm90dG9tfXB4YCxcbiAgICAgICAgcGFkZGluZ0xlZnQ6IGAke2xlZnR9cHhgXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoaCkge1xuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBzdGF0aWNDbGFzczogJ3YtY29udGVudCcsXG4gICAgICBzdHlsZTogdGhpcy5zdHlsZXMsXG4gICAgICByZWY6ICdjb250ZW50J1xuICAgIH1cblxuICAgIHJldHVybiBoKHRoaXMudGFnLCBkYXRhLCBbXG4gICAgICBoKFxuICAgICAgICAnZGl2JyxcbiAgICAgICAgeyBzdGF0aWNDbGFzczogJ3YtY29udGVudF9fd3JhcCcgfSxcbiAgICAgICAgdGhpcy4kc2xvdHMuZGVmYXVsdFxuICAgICAgKVxuICAgIF0pXG4gIH1cbn1cbiJdfQ==