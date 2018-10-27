/**
 * Tabs props
 *
 * @mixin
 */
/* @vue/component */
export default {
    props: {
        alignWithTitle: Boolean,
        centered: Boolean,
        fixedTabs: Boolean,
        grow: Boolean,
        height: {
            type: [Number, String],
            default: undefined,
            validator: v => !isNaN(parseInt(v))
        },
        hideSlider: Boolean,
        iconsAndText: Boolean,
        mobileBreakPoint: {
            type: [Number, String],
            default: 1264,
            validator: v => !isNaN(parseInt(v))
        },
        nextIcon: {
            type: String,
            default: '$vuetify.icons.next'
        },
        prevIcon: {
            type: String,
            default: '$vuetify.icons.prev'
        },
        right: Boolean,
        showArrows: Boolean,
        sliderColor: {
            type: String,
            default: 'accent'
        },
        value: [Number, String]
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy1wcm9wcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZUYWJzL21peGlucy90YWJzLXByb3BzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFDSCxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLEtBQUssRUFBRTtRQUNMLGNBQWMsRUFBRSxPQUFPO1FBQ3ZCLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLFNBQVMsRUFBRSxPQUFPO1FBQ2xCLElBQUksRUFBRSxPQUFPO1FBQ2IsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUN0QixPQUFPLEVBQUUsU0FBUztZQUNsQixTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEM7UUFDRCxVQUFVLEVBQUUsT0FBTztRQUNuQixZQUFZLEVBQUUsT0FBTztRQUNyQixnQkFBZ0IsRUFBRTtZQUNoQixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BDO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUscUJBQXFCO1NBQy9CO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUscUJBQXFCO1NBQy9CO1FBQ0QsS0FBSyxFQUFFLE9BQU87UUFDZCxVQUFVLEVBQUUsT0FBTztRQUNuQixXQUFXLEVBQUU7WUFDWCxJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxRQUFRO1NBQ2xCO1FBQ0QsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztLQUN4QjtDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRhYnMgcHJvcHNcbiAqXG4gKiBAbWl4aW5cbiAqL1xuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IHtcbiAgICBhbGlnbldpdGhUaXRsZTogQm9vbGVhbixcbiAgICBjZW50ZXJlZDogQm9vbGVhbixcbiAgICBmaXhlZFRhYnM6IEJvb2xlYW4sXG4gICAgZ3JvdzogQm9vbGVhbixcbiAgICBoZWlnaHQ6IHtcbiAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gIWlzTmFOKHBhcnNlSW50KHYpKVxuICAgIH0sXG4gICAgaGlkZVNsaWRlcjogQm9vbGVhbixcbiAgICBpY29uc0FuZFRleHQ6IEJvb2xlYW4sXG4gICAgbW9iaWxlQnJlYWtQb2ludDoge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IDEyNjQsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gIWlzTmFOKHBhcnNlSW50KHYpKVxuICAgIH0sXG4gICAgbmV4dEljb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICckdnVldGlmeS5pY29ucy5uZXh0J1xuICAgIH0sXG4gICAgcHJldkljb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICckdnVldGlmeS5pY29ucy5wcmV2J1xuICAgIH0sXG4gICAgcmlnaHQ6IEJvb2xlYW4sXG4gICAgc2hvd0Fycm93czogQm9vbGVhbixcbiAgICBzbGlkZXJDb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2FjY2VudCdcbiAgICB9LFxuICAgIHZhbHVlOiBbTnVtYmVyLCBTdHJpbmddXG4gIH1cbn1cbiJdfQ==