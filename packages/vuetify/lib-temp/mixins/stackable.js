import { getZIndex } from '../util/helpers';
/* @vue/component */
export default {
    name: 'stackable',
    data() {
        return {
            stackBase: null,
            stackClass: 'unpecified',
            stackElement: null,
            stackExclude: null,
            stackMinZIndex: 0
        };
    },
    computed: {
        /**
         * Currently active z-index
         *
         * @return {number}
         */
        activeZIndex() {
            if (typeof window === 'undefined')
                return 0;
            const content = this.stackElement || this.$refs.content;
            // Return current zindex if not active
            const index = !this.isActive
                ? getZIndex(content)
                : this.getMaxZIndex(this.stackExclude || [content]) + 2;
            if (index == null)
                return index;
            // Return max current z-index (excluding self) + 2
            // (2 to leave room for an overlay below, if needed)
            return parseInt(index);
        }
    },
    methods: {
        getMaxZIndex(exclude = []) {
            const base = this.stackBase || this.$el;
            // Start with lowest allowed z-index or z-index of
            // base component's element, whichever is greater
            const zis = [this.stackMinZIndex, getZIndex(base)];
            // Convert the NodeList to an array to
            // prevent an Edge bug with Symbol.iterator
            // https://github.com/vuetifyjs/vuetify/issues/2146
            const activeElements = [...document.getElementsByClassName(this.stackClass)];
            // Get z-index for all active dialogs
            for (let index = 0; index < activeElements.length; index++) {
                if (!exclude.includes(activeElements[index])) {
                    zis.push(getZIndex(activeElements[index]));
                }
            }
            return Math.max(...zis);
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2thYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21peGlucy9zdGFja2FibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBRTNDLG9CQUFvQjtBQUNwQixlQUFlO0lBQ2IsSUFBSSxFQUFFLFdBQVc7SUFFakIsSUFBSTtRQUNGLE9BQU87WUFDTCxTQUFTLEVBQUUsSUFBSTtZQUNmLFVBQVUsRUFBRSxZQUFZO1lBQ3hCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLGNBQWMsRUFBRSxDQUFDO1NBQ2xCLENBQUE7SUFDSCxDQUFDO0lBQ0QsUUFBUSxFQUFFO1FBQ1I7Ozs7V0FJRztRQUNILFlBQVk7WUFDVixJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVc7Z0JBQUUsT0FBTyxDQUFDLENBQUE7WUFFM0MsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQTtZQUN2RCxzQ0FBc0M7WUFFdEMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUTtnQkFDMUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7Z0JBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUV6RCxJQUFJLEtBQUssSUFBSSxJQUFJO2dCQUFFLE9BQU8sS0FBSyxDQUFBO1lBRS9CLGtEQUFrRDtZQUNsRCxvREFBb0Q7WUFDcEQsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDeEIsQ0FBQztLQUNGO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsWUFBWSxDQUFFLE9BQU8sR0FBRyxFQUFFO1lBQ3hCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQTtZQUN2QyxrREFBa0Q7WUFDbEQsaURBQWlEO1lBQ2pELE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUNsRCxzQ0FBc0M7WUFDdEMsMkNBQTJDO1lBQzNDLG1EQUFtRDtZQUNuRCxNQUFNLGNBQWMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFBO1lBRTVFLHFDQUFxQztZQUNyQyxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDMUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQzVDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7aUJBQzNDO2FBQ0Y7WUFFRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQTtRQUN6QixDQUFDO0tBQ0Y7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0WkluZGV4IH0gZnJvbSAnLi4vdXRpbC9oZWxwZXJzJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3RhY2thYmxlJyxcblxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhY2tCYXNlOiBudWxsLFxuICAgICAgc3RhY2tDbGFzczogJ3VucGVjaWZpZWQnLFxuICAgICAgc3RhY2tFbGVtZW50OiBudWxsLFxuICAgICAgc3RhY2tFeGNsdWRlOiBudWxsLFxuICAgICAgc3RhY2tNaW5aSW5kZXg6IDBcbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgLyoqXG4gICAgICogQ3VycmVudGx5IGFjdGl2ZSB6LWluZGV4XG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG4gICAgYWN0aXZlWkluZGV4ICgpIHtcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgcmV0dXJuIDBcblxuICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuc3RhY2tFbGVtZW50IHx8IHRoaXMuJHJlZnMuY29udGVudFxuICAgICAgLy8gUmV0dXJuIGN1cnJlbnQgemluZGV4IGlmIG5vdCBhY3RpdmVcblxuICAgICAgY29uc3QgaW5kZXggPSAhdGhpcy5pc0FjdGl2ZVxuICAgICAgICA/IGdldFpJbmRleChjb250ZW50KVxuICAgICAgICA6IHRoaXMuZ2V0TWF4WkluZGV4KHRoaXMuc3RhY2tFeGNsdWRlIHx8IFtjb250ZW50XSkgKyAyXG5cbiAgICAgIGlmIChpbmRleCA9PSBudWxsKSByZXR1cm4gaW5kZXhcblxuICAgICAgLy8gUmV0dXJuIG1heCBjdXJyZW50IHotaW5kZXggKGV4Y2x1ZGluZyBzZWxmKSArIDJcbiAgICAgIC8vICgyIHRvIGxlYXZlIHJvb20gZm9yIGFuIG92ZXJsYXkgYmVsb3csIGlmIG5lZWRlZClcbiAgICAgIHJldHVybiBwYXJzZUludChpbmRleClcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBnZXRNYXhaSW5kZXggKGV4Y2x1ZGUgPSBbXSkge1xuICAgICAgY29uc3QgYmFzZSA9IHRoaXMuc3RhY2tCYXNlIHx8IHRoaXMuJGVsXG4gICAgICAvLyBTdGFydCB3aXRoIGxvd2VzdCBhbGxvd2VkIHotaW5kZXggb3Igei1pbmRleCBvZlxuICAgICAgLy8gYmFzZSBjb21wb25lbnQncyBlbGVtZW50LCB3aGljaGV2ZXIgaXMgZ3JlYXRlclxuICAgICAgY29uc3QgemlzID0gW3RoaXMuc3RhY2tNaW5aSW5kZXgsIGdldFpJbmRleChiYXNlKV1cbiAgICAgIC8vIENvbnZlcnQgdGhlIE5vZGVMaXN0IHRvIGFuIGFycmF5IHRvXG4gICAgICAvLyBwcmV2ZW50IGFuIEVkZ2UgYnVnIHdpdGggU3ltYm9sLml0ZXJhdG9yXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdnVldGlmeWpzL3Z1ZXRpZnkvaXNzdWVzLzIxNDZcbiAgICAgIGNvbnN0IGFjdGl2ZUVsZW1lbnRzID0gWy4uLmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5zdGFja0NsYXNzKV1cblxuICAgICAgLy8gR2V0IHotaW5kZXggZm9yIGFsbCBhY3RpdmUgZGlhbG9nc1xuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGFjdGl2ZUVsZW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBpZiAoIWV4Y2x1ZGUuaW5jbHVkZXMoYWN0aXZlRWxlbWVudHNbaW5kZXhdKSkge1xuICAgICAgICAgIHppcy5wdXNoKGdldFpJbmRleChhY3RpdmVFbGVtZW50c1tpbmRleF0pKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBNYXRoLm1heCguLi56aXMpXG4gICAgfVxuICB9XG59XG4iXX0=