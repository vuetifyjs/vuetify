// Styles
import '../../stylus/components/_lists.styl';
// Mixins
import Themeable from '../../mixins/themeable';
import { provide as RegistrableProvide } from '../../mixins/registrable';
/* @vue/component */
export default {
    name: 'v-list',
    mixins: [
        RegistrableProvide('list'),
        Themeable
    ],
    provide() {
        return {
            'listClick': this.listClick
        };
    },
    props: {
        dense: Boolean,
        expand: Boolean,
        subheader: Boolean,
        threeLine: Boolean,
        twoLine: Boolean
    },
    data: () => ({
        groups: []
    }),
    computed: {
        classes() {
            return {
                'v-list--dense': this.dense,
                'v-list--subheader': this.subheader,
                'v-list--two-line': this.twoLine,
                'v-list--three-line': this.threeLine,
                ...this.themeClasses
            };
        }
    },
    methods: {
        register(uid, cb) {
            this.groups.push({ uid, cb });
        },
        unregister(uid) {
            const index = this.groups.findIndex(g => g.uid === uid);
            if (index > -1) {
                this.groups.splice(index, 1);
            }
        },
        listClick(uid) {
            if (this.expand)
                return;
            for (let i = this.groups.length; i--;) {
                this.groups[i].cb(uid);
            }
        }
    },
    render(h) {
        const data = {
            staticClass: 'v-list',
            'class': this.classes
        };
        return h('div', data, [this.$slots.default]);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WTGlzdC9WTGlzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyxxQ0FBcUMsQ0FBQTtBQUU1QyxTQUFTO0FBQ1QsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUE7QUFDOUMsT0FBTyxFQUNMLE9BQU8sSUFBSSxrQkFBa0IsRUFDOUIsTUFBTSwwQkFBMEIsQ0FBQTtBQUVqQyxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxRQUFRO0lBRWQsTUFBTSxFQUFFO1FBQ04sa0JBQWtCLENBQUMsTUFBTSxDQUFDO1FBQzFCLFNBQVM7S0FDVjtJQUVELE9BQU87UUFDTCxPQUFPO1lBQ0wsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQzVCLENBQUE7SUFDSCxDQUFDO0lBRUQsS0FBSyxFQUFFO1FBQ0wsS0FBSyxFQUFFLE9BQU87UUFDZCxNQUFNLEVBQUUsT0FBTztRQUNmLFNBQVMsRUFBRSxPQUFPO1FBQ2xCLFNBQVMsRUFBRSxPQUFPO1FBQ2xCLE9BQU8sRUFBRSxPQUFPO0tBQ2pCO0lBRUQsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDWCxNQUFNLEVBQUUsRUFBRTtLQUNYLENBQUM7SUFFRixRQUFRLEVBQUU7UUFDUixPQUFPO1lBQ0wsT0FBTztnQkFDTCxlQUFlLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQzNCLG1CQUFtQixFQUFFLElBQUksQ0FBQyxTQUFTO2dCQUNuQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDaEMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLFNBQVM7Z0JBQ3BDLEdBQUcsSUFBSSxDQUFDLFlBQVk7YUFDckIsQ0FBQTtRQUNILENBQUM7S0FDRjtJQUVELE9BQU8sRUFBRTtRQUNQLFFBQVEsQ0FBRSxHQUFHLEVBQUUsRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDL0IsQ0FBQztRQUNELFVBQVUsQ0FBRSxHQUFHO1lBQ2IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFBO1lBRXZELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQTthQUM3QjtRQUNILENBQUM7UUFDRCxTQUFTLENBQUUsR0FBRztZQUNaLElBQUksSUFBSSxDQUFDLE1BQU07Z0JBQUUsT0FBTTtZQUV2QixLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHO2dCQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUN2QjtRQUNILENBQUM7S0FDRjtJQUVELE1BQU0sQ0FBRSxDQUFDO1FBQ1AsTUFBTSxJQUFJLEdBQUc7WUFDWCxXQUFXLEVBQUUsUUFBUTtZQUNyQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDdEIsQ0FBQTtRQUVELE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDOUMsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTdHlsZXNcbmltcG9ydCAnLi4vLi4vc3R5bHVzL2NvbXBvbmVudHMvX2xpc3RzLnN0eWwnXG5cbi8vIE1peGluc1xuaW1wb3J0IFRoZW1lYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvdGhlbWVhYmxlJ1xuaW1wb3J0IHtcbiAgcHJvdmlkZSBhcyBSZWdpc3RyYWJsZVByb3ZpZGVcbn0gZnJvbSAnLi4vLi4vbWl4aW5zL3JlZ2lzdHJhYmxlJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi1saXN0JyxcblxuICBtaXhpbnM6IFtcbiAgICBSZWdpc3RyYWJsZVByb3ZpZGUoJ2xpc3QnKSxcbiAgICBUaGVtZWFibGVcbiAgXSxcblxuICBwcm92aWRlICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2xpc3RDbGljayc6IHRoaXMubGlzdENsaWNrXG4gICAgfVxuICB9LFxuXG4gIHByb3BzOiB7XG4gICAgZGVuc2U6IEJvb2xlYW4sXG4gICAgZXhwYW5kOiBCb29sZWFuLFxuICAgIHN1YmhlYWRlcjogQm9vbGVhbixcbiAgICB0aHJlZUxpbmU6IEJvb2xlYW4sXG4gICAgdHdvTGluZTogQm9vbGVhblxuICB9LFxuXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgZ3JvdXBzOiBbXVxuICB9KSxcblxuICBjb21wdXRlZDoge1xuICAgIGNsYXNzZXMgKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ3YtbGlzdC0tZGVuc2UnOiB0aGlzLmRlbnNlLFxuICAgICAgICAndi1saXN0LS1zdWJoZWFkZXInOiB0aGlzLnN1YmhlYWRlcixcbiAgICAgICAgJ3YtbGlzdC0tdHdvLWxpbmUnOiB0aGlzLnR3b0xpbmUsXG4gICAgICAgICd2LWxpc3QtLXRocmVlLWxpbmUnOiB0aGlzLnRocmVlTGluZSxcbiAgICAgICAgLi4udGhpcy50aGVtZUNsYXNzZXNcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIHJlZ2lzdGVyICh1aWQsIGNiKSB7XG4gICAgICB0aGlzLmdyb3Vwcy5wdXNoKHsgdWlkLCBjYiB9KVxuICAgIH0sXG4gICAgdW5yZWdpc3RlciAodWlkKSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuZ3JvdXBzLmZpbmRJbmRleChnID0+IGcudWlkID09PSB1aWQpXG5cbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIHRoaXMuZ3JvdXBzLnNwbGljZShpbmRleCwgMSlcbiAgICAgIH1cbiAgICB9LFxuICAgIGxpc3RDbGljayAodWlkKSB7XG4gICAgICBpZiAodGhpcy5leHBhbmQpIHJldHVyblxuXG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5ncm91cHMubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgIHRoaXMuZ3JvdXBzW2ldLmNiKHVpZClcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyIChoKSB7XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIHN0YXRpY0NsYXNzOiAndi1saXN0JyxcbiAgICAgICdjbGFzcyc6IHRoaXMuY2xhc3Nlc1xuICAgIH1cblxuICAgIHJldHVybiBoKCdkaXYnLCBkYXRhLCBbdGhpcy4kc2xvdHMuZGVmYXVsdF0pXG4gIH1cbn1cbiJdfQ==