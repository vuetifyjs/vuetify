/**
 * Menu position
 *
 * @mixin
 *
 * Used for calculating an automatic position (used for VSelect)
 * Will position the VMenu content properly over the VSelect
 */
/* @vue/component */
export default {
    methods: {
        // Revisit this
        calculateScroll() {
            if (this.selectedIndex === null)
                return;
            let scrollTop = 0;
            if (this.selectedIndex >= this.stopIndex) {
                scrollTop = this.$refs.content.scrollHeight;
            }
            else if (this.selectedIndex > this.startIndex) {
                scrollTop = (
                // Top position of selected item
                (this.selectedIndex * this.tileHeight) +
                    // Remove half of a tile's height
                    (this.tileHeight / 2) +
                    // Account for padding offset on lists
                    (this.defaultOffset / 2) -
                    // Half of the auto content's height
                    100);
            }
            if (this.$refs.content) {
                this.$refs.content.scrollTop = scrollTop;
            }
        },
        calcLeftAuto() {
            if (this.isAttached)
                return 0;
            return parseInt(this.dimensions.activator.left - this.defaultOffset * 2);
        },
        calcTopAuto() {
            const selectedIndex = Array.from(this.tiles)
                .findIndex(n => n.classList.contains('v-list__tile--active'));
            if (selectedIndex === -1) {
                this.selectedIndex = null;
                return this.computedTop;
            }
            this.selectedIndex = selectedIndex;
            this.stopIndex = this.tiles.length > 4
                ? this.tiles.length - 4
                : this.tiles.length;
            let additionalOffset = this.defaultOffset;
            let offsetPadding;
            // Menu should be centered
            if (selectedIndex > this.startIndex &&
                selectedIndex < this.stopIndex) {
                offsetPadding = 1.5 * this.tileHeight;
                // Menu should be offset top
            }
            else if (selectedIndex >= this.stopIndex) {
                // Being offset top means
                // we have to account for top
                // and bottom list padding
                additionalOffset *= 2;
                offsetPadding = (selectedIndex - this.stopIndex) * this.tileHeight;
                // Menu should be offset bottom
            }
            else {
                offsetPadding = selectedIndex * this.tileHeight;
            }
            return (this.computedTop +
                additionalOffset -
                offsetPadding -
                (this.tileHeight / 2));
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1wb3NpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZNZW51L21peGlucy9tZW51LXBvc2l0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0dBT0c7QUFDSCxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLE9BQU8sRUFBRTtRQUNQLGVBQWU7UUFDZixlQUFlO1lBQ2IsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLElBQUk7Z0JBQUUsT0FBTTtZQUV2QyxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUE7WUFFakIsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ3hDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUE7YUFDNUM7aUJBQU0sSUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQy9DLFNBQVMsR0FBRztnQkFDVixnQ0FBZ0M7Z0JBQ2hDLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO29CQUN0QyxpQ0FBaUM7b0JBQ2pDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7b0JBQ3JCLHNDQUFzQztvQkFDdEMsQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztvQkFDeEIsb0NBQW9DO29CQUNwQyxHQUFHLENBQ0osQ0FBQTthQUNGO1lBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQTthQUN6QztRQUNILENBQUM7UUFDRCxZQUFZO1lBQ1YsSUFBSSxJQUFJLENBQUMsVUFBVTtnQkFBRSxPQUFPLENBQUMsQ0FBQTtZQUU3QixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUMxRSxDQUFDO1FBQ0QsV0FBVztZQUNULE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztpQkFDekMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFBO1lBRS9ELElBQUksYUFBYSxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQTtnQkFFekIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFBO2FBQ3hCO1lBRUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUE7WUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUNwQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFDdkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFBO1lBQ3JCLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQTtZQUN6QyxJQUFJLGFBQWEsQ0FBQTtZQUVqQiwwQkFBMEI7WUFDMUIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVU7Z0JBQ2pDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUM5QjtnQkFDQSxhQUFhLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUE7Z0JBQ3ZDLDRCQUE0QjthQUMzQjtpQkFBTSxJQUFJLGFBQWEsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUMxQyx5QkFBeUI7Z0JBQ3pCLDZCQUE2QjtnQkFDN0IsMEJBQTBCO2dCQUMxQixnQkFBZ0IsSUFBSSxDQUFDLENBQUE7Z0JBQ3JCLGFBQWEsR0FBRyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQTtnQkFDcEUsK0JBQStCO2FBQzlCO2lCQUFNO2dCQUNMLGFBQWEsR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQTthQUNoRDtZQUVELE9BQU8sQ0FDTCxJQUFJLENBQUMsV0FBVztnQkFDaEIsZ0JBQWdCO2dCQUNoQixhQUFhO2dCQUNiLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FDdEIsQ0FBQTtRQUNILENBQUM7S0FDRjtDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIE1lbnUgcG9zaXRpb25cbiAqXG4gKiBAbWl4aW5cbiAqXG4gKiBVc2VkIGZvciBjYWxjdWxhdGluZyBhbiBhdXRvbWF0aWMgcG9zaXRpb24gKHVzZWQgZm9yIFZTZWxlY3QpXG4gKiBXaWxsIHBvc2l0aW9uIHRoZSBWTWVudSBjb250ZW50IHByb3Blcmx5IG92ZXIgdGhlIFZTZWxlY3RcbiAqL1xuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWV0aG9kczoge1xuICAgIC8vIFJldmlzaXQgdGhpc1xuICAgIGNhbGN1bGF0ZVNjcm9sbCAoKSB7XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZEluZGV4ID09PSBudWxsKSByZXR1cm5cblxuICAgICAgbGV0IHNjcm9sbFRvcCA9IDBcblxuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleCA+PSB0aGlzLnN0b3BJbmRleCkge1xuICAgICAgICBzY3JvbGxUb3AgPSB0aGlzLiRyZWZzLmNvbnRlbnQuc2Nyb2xsSGVpZ2h0XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleCA+IHRoaXMuc3RhcnRJbmRleCkge1xuICAgICAgICBzY3JvbGxUb3AgPSAoXG4gICAgICAgICAgLy8gVG9wIHBvc2l0aW9uIG9mIHNlbGVjdGVkIGl0ZW1cbiAgICAgICAgICAodGhpcy5zZWxlY3RlZEluZGV4ICogdGhpcy50aWxlSGVpZ2h0KSArXG4gICAgICAgICAgLy8gUmVtb3ZlIGhhbGYgb2YgYSB0aWxlJ3MgaGVpZ2h0XG4gICAgICAgICAgKHRoaXMudGlsZUhlaWdodCAvIDIpICtcbiAgICAgICAgICAvLyBBY2NvdW50IGZvciBwYWRkaW5nIG9mZnNldCBvbiBsaXN0c1xuICAgICAgICAgICh0aGlzLmRlZmF1bHRPZmZzZXQgLyAyKSAtXG4gICAgICAgICAgLy8gSGFsZiBvZiB0aGUgYXV0byBjb250ZW50J3MgaGVpZ2h0XG4gICAgICAgICAgMTAwXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuJHJlZnMuY29udGVudCkge1xuICAgICAgICB0aGlzLiRyZWZzLmNvbnRlbnQuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wXG4gICAgICB9XG4gICAgfSxcbiAgICBjYWxjTGVmdEF1dG8gKCkge1xuICAgICAgaWYgKHRoaXMuaXNBdHRhY2hlZCkgcmV0dXJuIDBcblxuICAgICAgcmV0dXJuIHBhcnNlSW50KHRoaXMuZGltZW5zaW9ucy5hY3RpdmF0b3IubGVmdCAtIHRoaXMuZGVmYXVsdE9mZnNldCAqIDIpXG4gICAgfSxcbiAgICBjYWxjVG9wQXV0byAoKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gQXJyYXkuZnJvbSh0aGlzLnRpbGVzKVxuICAgICAgICAuZmluZEluZGV4KG4gPT4gbi5jbGFzc0xpc3QuY29udGFpbnMoJ3YtbGlzdF9fdGlsZS0tYWN0aXZlJykpXG5cbiAgICAgIGlmIChzZWxlY3RlZEluZGV4ID09PSAtMSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBudWxsXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcHV0ZWRUb3BcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gc2VsZWN0ZWRJbmRleFxuICAgICAgdGhpcy5zdG9wSW5kZXggPSB0aGlzLnRpbGVzLmxlbmd0aCA+IDRcbiAgICAgICAgPyB0aGlzLnRpbGVzLmxlbmd0aCAtIDRcbiAgICAgICAgOiB0aGlzLnRpbGVzLmxlbmd0aFxuICAgICAgbGV0IGFkZGl0aW9uYWxPZmZzZXQgPSB0aGlzLmRlZmF1bHRPZmZzZXRcbiAgICAgIGxldCBvZmZzZXRQYWRkaW5nXG5cbiAgICAgIC8vIE1lbnUgc2hvdWxkIGJlIGNlbnRlcmVkXG4gICAgICBpZiAoc2VsZWN0ZWRJbmRleCA+IHRoaXMuc3RhcnRJbmRleCAmJlxuICAgICAgICBzZWxlY3RlZEluZGV4IDwgdGhpcy5zdG9wSW5kZXhcbiAgICAgICkge1xuICAgICAgICBvZmZzZXRQYWRkaW5nID0gMS41ICogdGhpcy50aWxlSGVpZ2h0XG4gICAgICAvLyBNZW51IHNob3VsZCBiZSBvZmZzZXQgdG9wXG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkSW5kZXggPj0gdGhpcy5zdG9wSW5kZXgpIHtcbiAgICAgICAgLy8gQmVpbmcgb2Zmc2V0IHRvcCBtZWFuc1xuICAgICAgICAvLyB3ZSBoYXZlIHRvIGFjY291bnQgZm9yIHRvcFxuICAgICAgICAvLyBhbmQgYm90dG9tIGxpc3QgcGFkZGluZ1xuICAgICAgICBhZGRpdGlvbmFsT2Zmc2V0ICo9IDJcbiAgICAgICAgb2Zmc2V0UGFkZGluZyA9IChzZWxlY3RlZEluZGV4IC0gdGhpcy5zdG9wSW5kZXgpICogdGhpcy50aWxlSGVpZ2h0XG4gICAgICAvLyBNZW51IHNob3VsZCBiZSBvZmZzZXQgYm90dG9tXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvZmZzZXRQYWRkaW5nID0gc2VsZWN0ZWRJbmRleCAqIHRoaXMudGlsZUhlaWdodFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gKFxuICAgICAgICB0aGlzLmNvbXB1dGVkVG9wICtcbiAgICAgICAgYWRkaXRpb25hbE9mZnNldCAtXG4gICAgICAgIG9mZnNldFBhZGRpbmcgLVxuICAgICAgICAodGhpcy50aWxlSGVpZ2h0IC8gMilcbiAgICAgIClcbiAgICB9XG4gIH1cbn1cbiJdfQ==