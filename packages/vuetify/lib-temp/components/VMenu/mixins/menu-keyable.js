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
        onKeyDown(e) {
            if ([
                keyCodes.down,
                keyCodes.up,
                keyCodes.enter
            ].includes(e.keyCode))
                e.preventDefault();
            if ([keyCodes.esc, keyCodes.tab].includes(e.keyCode)) {
                return this.isActive = false;
            }
            this.changeListIndex(e);
        },
        changeListIndex(e) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1rZXlhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVk1lbnUvbWl4aW5zL21lbnUta2V5YWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7R0FRRztBQUVILFFBQVE7QUFDUixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUE7QUFFaEQsb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNYLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDYixLQUFLLEVBQUUsRUFBRTtLQUNWLENBQUM7SUFFRixLQUFLLEVBQUU7UUFDTCxRQUFRLENBQUUsR0FBRztZQUNYLElBQUksQ0FBQyxHQUFHO2dCQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDL0IsQ0FBQztRQUNELFNBQVMsQ0FBRSxJQUFJLEVBQUUsSUFBSTtZQUNuQixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUN0QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO2dCQUMvQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFBO2FBQ2xFO1lBRUQsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLO2dCQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsMkJBQTJCLENBQUMsQ0FBQTtRQUNsRSxDQUFDO0tBQ0Y7SUFFRCxPQUFPLEVBQUU7UUFDUCxTQUFTLENBQUUsQ0FBQztZQUNWLElBQUk7Z0JBQ0YsUUFBUSxDQUFDLElBQUk7Z0JBQ2IsUUFBUSxDQUFDLEVBQUU7Z0JBQ1gsUUFBUSxDQUFDLEtBQUs7YUFDZixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUNuQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUE7WUFFcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3BELE9BQU8sSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUE7YUFDN0I7WUFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3pCLENBQUM7UUFDRCxlQUFlLENBQUUsQ0FBQztZQUNoQiw2REFBNkQ7WUFDN0QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO1lBRWYsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLFFBQVEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3pFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtnQkFDaEIsdUNBQXVDO2dCQUN2QyxzQ0FBc0M7YUFDdkM7aUJBQU0sSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLFFBQVEsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDM0QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFBO2FBQ2pCO2lCQUFNLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxRQUFRLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ2hFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO2FBQ25DO1FBQ0gsQ0FBQztRQUNELFFBQVE7WUFDTixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQ25FLENBQUM7S0FDRjtDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIE1lbnUga2V5YWJsZVxuICpcbiAqIEBtaXhpblxuICpcbiAqIFByaW1hcmlseSB1c2VkIHRvIHN1cHBvcnQgVlNlbGVjdFxuICogSGFuZGxlcyBvcGVuaW5nIGFuZCBjbG9zaW5nIG9mIFZNZW51IGZyb20ga2V5c3Ryb2tlc1xuICogV2lsbCBjb25kaXRpb25hbGx5IGhpZ2hsaWdodCBWTGlzdFRpbGVzIGZvciBWU2VsZWN0XG4gKi9cblxuLy8gVXRpbHNcbmltcG9ydCB7IGtleUNvZGVzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9oZWxwZXJzJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBkYXRhOiAoKSA9PiAoe1xuICAgIGxpc3RJbmRleDogLTEsXG4gICAgdGlsZXM6IFtdXG4gIH0pLFxuXG4gIHdhdGNoOiB7XG4gICAgaXNBY3RpdmUgKHZhbCkge1xuICAgICAgaWYgKCF2YWwpIHRoaXMubGlzdEluZGV4ID0gLTFcbiAgICB9LFxuICAgIGxpc3RJbmRleCAobmV4dCwgcHJldikge1xuICAgICAgaWYgKG5leHQgaW4gdGhpcy50aWxlcykge1xuICAgICAgICBjb25zdCB0aWxlID0gdGhpcy50aWxlc1tuZXh0XVxuICAgICAgICB0aWxlLmNsYXNzTGlzdC5hZGQoJ3YtbGlzdF9fdGlsZS0taGlnaGxpZ2h0ZWQnKVxuICAgICAgICB0aGlzLiRyZWZzLmNvbnRlbnQuc2Nyb2xsVG9wID0gdGlsZS5vZmZzZXRUb3AgLSB0aWxlLmNsaWVudEhlaWdodFxuICAgICAgfVxuXG4gICAgICBwcmV2IGluIHRoaXMudGlsZXMgJiZcbiAgICAgICAgdGhpcy50aWxlc1twcmV2XS5jbGFzc0xpc3QucmVtb3ZlKCd2LWxpc3RfX3RpbGUtLWhpZ2hsaWdodGVkJylcbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIG9uS2V5RG93biAoZSkge1xuICAgICAgaWYgKFtcbiAgICAgICAga2V5Q29kZXMuZG93bixcbiAgICAgICAga2V5Q29kZXMudXAsXG4gICAgICAgIGtleUNvZGVzLmVudGVyXG4gICAgICBdLmluY2x1ZGVzKGUua2V5Q29kZSlcbiAgICAgICkgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIGlmIChba2V5Q29kZXMuZXNjLCBrZXlDb2Rlcy50YWJdLmluY2x1ZGVzKGUua2V5Q29kZSkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgfVxuXG4gICAgICB0aGlzLmNoYW5nZUxpc3RJbmRleChlKVxuICAgIH0sXG4gICAgY2hhbmdlTGlzdEluZGV4IChlKSB7XG4gICAgICAvLyBGb3IgaW5maW5pdGUgc2Nyb2xsIGFuZCBhdXRvY29tcGxldGUsIHJlLWV2YWx1YXRlIGNoaWxkcmVuXG4gICAgICB0aGlzLmdldFRpbGVzKClcblxuICAgICAgaWYgKGUua2V5Q29kZSA9PT0ga2V5Q29kZXMuZG93biAmJiB0aGlzLmxpc3RJbmRleCA8IHRoaXMudGlsZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICB0aGlzLmxpc3RJbmRleCsrXG4gICAgICAgIC8vIEFsbG93IHVzZXIgdG8gc2V0IGxpc3RJbmRleCB0byAtMSBzb1xuICAgICAgICAvLyB0aGF0IHRoZSBsaXN0IGNhbiBiZSB1bi1oaWdobGlnaHRlZFxuICAgICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT09IGtleUNvZGVzLnVwICYmIHRoaXMubGlzdEluZGV4ID4gLTEpIHtcbiAgICAgICAgdGhpcy5saXN0SW5kZXgtLVxuICAgICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT09IGtleUNvZGVzLmVudGVyICYmIHRoaXMubGlzdEluZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLnRpbGVzW3RoaXMubGlzdEluZGV4XS5jbGljaygpXG4gICAgICB9XG4gICAgfSxcbiAgICBnZXRUaWxlcyAoKSB7XG4gICAgICB0aGlzLnRpbGVzID0gdGhpcy4kcmVmcy5jb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy52LWxpc3RfX3RpbGUnKVxuICAgIH1cbiAgfVxufVxuIl19