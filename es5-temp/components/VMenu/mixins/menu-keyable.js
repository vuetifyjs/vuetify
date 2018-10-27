/**
 * Menu keyable
 *
 * @mixin
 *
 * Primarily used to support VSelect
 * Handles opening and closing of VMenu from keystrokes
 * Will conditionally highlight VListTiles for VSelect
 */
// Utils
import { keyCodes } from '../../../util/helpers';
/* @vue/component */
export default {
    data: () => ({
        listIndex: -1,
        tiles: []
    }),
    watch: {
        isActive(val) {
            if (!val)
                this.listIndex = -1;
        },
        listIndex(next, prev) {
            if (next in this.tiles) {
                const tile = this.tiles[next];
                tile.classList.add('v-list__tile--highlighted');
                this.$refs.content.scrollTop = tile.offsetTop - tile.clientHeight;
            }
            prev in this.tiles &&
                this.tiles[prev].classList.remove('v-list__tile--highlighted');
        }
    },
    methods: {
        changeListIndex(e) {
            if ([
                keyCodes.down,
                keyCodes.up,
                keyCodes.enter
            ].includes(e.keyCode))
                e.preventDefault();
            if ([keyCodes.esc, keyCodes.tab].includes(e.keyCode)) {
                return this.isActive = false;
            }
            // For infinite scroll and autocomplete, re-evaluate children
            this.getTiles();
            if (e.keyCode === keyCodes.down && this.listIndex < this.tiles.length - 1) {
                this.listIndex++;
                // Allow user to set listIndex to -1 so
                // that the list can be un-highlighted
            }
            else if (e.keyCode === keyCodes.up && this.listIndex > -1) {
                this.listIndex--;
            }
            else if (e.keyCode === keyCodes.enter && this.listIndex !== -1) {
                this.tiles[this.listIndex].click();
            }
        },
        getTiles() {
            this.tiles = this.$refs.content.querySelectorAll('.v-list__tile');
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1rZXlhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVk1lbnUvbWl4aW5zL21lbnUta2V5YWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7R0FRRztBQUVILFFBQVE7QUFDUixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUE7QUFFaEQsb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNYLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDYixLQUFLLEVBQUUsRUFBRTtLQUNWLENBQUM7SUFFRixLQUFLLEVBQUU7UUFDTCxRQUFRLENBQUUsR0FBRztZQUNYLElBQUksQ0FBQyxHQUFHO2dCQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDL0IsQ0FBQztRQUNELFNBQVMsQ0FBRSxJQUFJLEVBQUUsSUFBSTtZQUNuQixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUN0QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO2dCQUMvQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFBO2FBQ2xFO1lBRUQsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLO2dCQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsMkJBQTJCLENBQUMsQ0FBQTtRQUNsRSxDQUFDO0tBQ0Y7SUFFRCxPQUFPLEVBQUU7UUFDUCxlQUFlLENBQUUsQ0FBQztZQUNoQixJQUFJO2dCQUNGLFFBQVEsQ0FBQyxJQUFJO2dCQUNiLFFBQVEsQ0FBQyxFQUFFO2dCQUNYLFFBQVEsQ0FBQyxLQUFLO2FBQ2YsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDbkIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFBO1lBRXBCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNwRCxPQUFPLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBO2FBQzdCO1lBRUQsNkRBQTZEO1lBQzdELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtZQUVmLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxRQUFRLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN6RSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7Z0JBQ2hCLHVDQUF1QztnQkFDdkMsc0NBQXNDO2FBQ3ZDO2lCQUFNLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxRQUFRLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQzNELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTthQUNqQjtpQkFBTSxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssUUFBUSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUNoRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTthQUNuQztRQUNILENBQUM7UUFDRCxRQUFRO1lBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUNuRSxDQUFDO0tBQ0Y7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBNZW51IGtleWFibGVcbiAqXG4gKiBAbWl4aW5cbiAqXG4gKiBQcmltYXJpbHkgdXNlZCB0byBzdXBwb3J0IFZTZWxlY3RcbiAqIEhhbmRsZXMgb3BlbmluZyBhbmQgY2xvc2luZyBvZiBWTWVudSBmcm9tIGtleXN0cm9rZXNcbiAqIFdpbGwgY29uZGl0aW9uYWxseSBoaWdobGlnaHQgVkxpc3RUaWxlcyBmb3IgVlNlbGVjdFxuICovXG5cbi8vIFV0aWxzXG5pbXBvcnQgeyBrZXlDb2RlcyB9IGZyb20gJy4uLy4uLy4uL3V0aWwvaGVscGVycydcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBsaXN0SW5kZXg6IC0xLFxuICAgIHRpbGVzOiBbXVxuICB9KSxcblxuICB3YXRjaDoge1xuICAgIGlzQWN0aXZlICh2YWwpIHtcbiAgICAgIGlmICghdmFsKSB0aGlzLmxpc3RJbmRleCA9IC0xXG4gICAgfSxcbiAgICBsaXN0SW5kZXggKG5leHQsIHByZXYpIHtcbiAgICAgIGlmIChuZXh0IGluIHRoaXMudGlsZXMpIHtcbiAgICAgICAgY29uc3QgdGlsZSA9IHRoaXMudGlsZXNbbmV4dF1cbiAgICAgICAgdGlsZS5jbGFzc0xpc3QuYWRkKCd2LWxpc3RfX3RpbGUtLWhpZ2hsaWdodGVkJylcbiAgICAgICAgdGhpcy4kcmVmcy5jb250ZW50LnNjcm9sbFRvcCA9IHRpbGUub2Zmc2V0VG9wIC0gdGlsZS5jbGllbnRIZWlnaHRcbiAgICAgIH1cblxuICAgICAgcHJldiBpbiB0aGlzLnRpbGVzICYmXG4gICAgICAgIHRoaXMudGlsZXNbcHJldl0uY2xhc3NMaXN0LnJlbW92ZSgndi1saXN0X190aWxlLS1oaWdobGlnaHRlZCcpXG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBjaGFuZ2VMaXN0SW5kZXggKGUpIHtcbiAgICAgIGlmIChbXG4gICAgICAgIGtleUNvZGVzLmRvd24sXG4gICAgICAgIGtleUNvZGVzLnVwLFxuICAgICAgICBrZXlDb2Rlcy5lbnRlclxuICAgICAgXS5pbmNsdWRlcyhlLmtleUNvZGUpXG4gICAgICApIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBpZiAoW2tleUNvZGVzLmVzYywga2V5Q29kZXMudGFiXS5pbmNsdWRlcyhlLmtleUNvZGUpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzQWN0aXZlID0gZmFsc2VcbiAgICAgIH1cblxuICAgICAgLy8gRm9yIGluZmluaXRlIHNjcm9sbCBhbmQgYXV0b2NvbXBsZXRlLCByZS1ldmFsdWF0ZSBjaGlsZHJlblxuICAgICAgdGhpcy5nZXRUaWxlcygpXG5cbiAgICAgIGlmIChlLmtleUNvZGUgPT09IGtleUNvZGVzLmRvd24gJiYgdGhpcy5saXN0SW5kZXggPCB0aGlzLnRpbGVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgdGhpcy5saXN0SW5kZXgrK1xuICAgICAgICAvLyBBbGxvdyB1c2VyIHRvIHNldCBsaXN0SW5kZXggdG8gLTEgc29cbiAgICAgICAgLy8gdGhhdCB0aGUgbGlzdCBjYW4gYmUgdW4taGlnaGxpZ2h0ZWRcbiAgICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09PSBrZXlDb2Rlcy51cCAmJiB0aGlzLmxpc3RJbmRleCA+IC0xKSB7XG4gICAgICAgIHRoaXMubGlzdEluZGV4LS1cbiAgICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09PSBrZXlDb2Rlcy5lbnRlciAmJiB0aGlzLmxpc3RJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy50aWxlc1t0aGlzLmxpc3RJbmRleF0uY2xpY2soKVxuICAgICAgfVxuICAgIH0sXG4gICAgZ2V0VGlsZXMgKCkge1xuICAgICAgdGhpcy50aWxlcyA9IHRoaXMuJHJlZnMuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCcudi1saXN0X190aWxlJylcbiAgICB9XG4gIH1cbn1cbiJdfQ==