import Bootable from './bootable';
import { consoleWarn } from '../util/console';
function validateAttachTarget(val) {
    const type = typeof val;
    if (type === 'boolean' || type === 'string')
        return true;
    return val.nodeType === Node.ELEMENT_NODE;
}
/* @vue/component */
export default {
    name: 'detachable',
    mixins: [Bootable],
    props: {
        attach: {
            type: null,
            default: false,
            validator: validateAttachTarget
        },
        contentClass: {
            default: ''
        }
    },
    data: () => ({
        hasDetached: false
    }),
    watch: {
        attach() {
            this.hasDetached = false;
            this.initDetach();
        },
        hasContent: 'initDetach'
    },
    mounted() {
        !this.lazy && this.initDetach();
    },
    deactivated() {
        this.isActive = false;
    },
    beforeDestroy() {
        if (!this.$refs.content)
            return;
        // IE11 Fix
        try {
            this.$refs.content.parentNode.removeChild(this.$refs.content);
        }
        catch (e) {
            console.log(e);
        }
    },
    methods: {
        getScopeIdAttrs() {
            const scopeId = this.$vnode && this.$vnode.context.$options._scopeId;
            return scopeId && {
                [scopeId]: ''
            };
        },
        initDetach() {
            if (this._isDestroyed ||
                !this.$refs.content ||
                this.hasDetached ||
                // Leave menu in place if attached
                // and dev has not changed target
                this.attach === '' || // If used as a boolean prop (<v-menu attach>)
                this.attach === true || // If bound to a boolean (<v-menu :attach="true">)
                this.attach === 'attach' // If bound as boolean prop in pug (v-menu(attach))
            )
                return;
            let target;
            if (this.attach === false) {
                // Default, detach to app
                target = document.querySelector('[data-app]');
            }
            else if (typeof this.attach === 'string') {
                // CSS selector
                target = document.querySelector(this.attach);
            }
            else {
                // DOM Element
                target = this.attach;
            }
            if (!target) {
                consoleWarn(`Unable to locate target ${this.attach || '[data-app]'}`, this);
                return;
            }
            target.insertBefore(this.$refs.content, target.firstChild);
            this.hasDetached = true;
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWNoYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taXhpbnMvZGV0YWNoYWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQVEsTUFBTSxZQUFZLENBQUE7QUFDakMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBRTdDLFNBQVMsb0JBQW9CLENBQUUsR0FBRztJQUNoQyxNQUFNLElBQUksR0FBRyxPQUFPLEdBQUcsQ0FBQTtJQUV2QixJQUFJLElBQUksS0FBSyxTQUFTLElBQUksSUFBSSxLQUFLLFFBQVE7UUFBRSxPQUFPLElBQUksQ0FBQTtJQUV4RCxPQUFPLEdBQUcsQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQTtBQUMzQyxDQUFDO0FBRUQsb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsWUFBWTtJQUVsQixNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUM7SUFFbEIsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLEVBQUUsS0FBSztZQUNkLFNBQVMsRUFBRSxvQkFBb0I7U0FDaEM7UUFDRCxZQUFZLEVBQUU7WUFDWixPQUFPLEVBQUUsRUFBRTtTQUNaO0tBQ0Y7SUFFRCxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNYLFdBQVcsRUFBRSxLQUFLO0tBQ25CLENBQUM7SUFFRixLQUFLLEVBQUU7UUFDTCxNQUFNO1lBQ0osSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUE7WUFDeEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO1FBQ25CLENBQUM7UUFDRCxVQUFVLEVBQUUsWUFBWTtLQUN6QjtJQUVELE9BQU87UUFDTCxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQ2pDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUE7SUFDdkIsQ0FBQztJQUVELGFBQWE7UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO1lBQUUsT0FBTTtRQUUvQixXQUFXO1FBQ1gsSUFBSTtZQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtTQUM5RDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUFFO0lBQ2hDLENBQUM7SUFFRCxPQUFPLEVBQUU7UUFDUCxlQUFlO1lBQ2IsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFBO1lBQ3BFLE9BQU8sT0FBTyxJQUFJO2dCQUNoQixDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUU7YUFDZCxDQUFBO1FBQ0gsQ0FBQztRQUNELFVBQVU7WUFDUixJQUFJLElBQUksQ0FBQyxZQUFZO2dCQUNuQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTztnQkFDbkIsSUFBSSxDQUFDLFdBQVc7Z0JBQ2hCLGtDQUFrQztnQkFDbEMsaUNBQWlDO2dCQUNqQyxJQUFJLENBQUMsTUFBTSxLQUFLLEVBQUUsSUFBSSw4Q0FBOEM7Z0JBQ3BFLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxJQUFJLGtEQUFrRDtnQkFDMUUsSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUMsbURBQW1EOztnQkFDNUUsT0FBTTtZQUVSLElBQUksTUFBTSxDQUFBO1lBQ1YsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLEtBQUssRUFBRTtnQkFDekIseUJBQXlCO2dCQUN6QixNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQTthQUM5QztpQkFBTSxJQUFJLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUU7Z0JBQzFDLGVBQWU7Z0JBQ2YsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO2FBQzdDO2lCQUFNO2dCQUNMLGNBQWM7Z0JBQ2QsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7YUFDckI7WUFFRCxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNYLFdBQVcsQ0FBQywyQkFBMkIsSUFBSSxDQUFDLE1BQU0sSUFBSSxZQUFZLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQTtnQkFDM0UsT0FBTTthQUNQO1lBRUQsTUFBTSxDQUFDLFlBQVksQ0FDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQ2xCLE1BQU0sQ0FBQyxVQUFVLENBQ2xCLENBQUE7WUFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQTtRQUN6QixDQUFDO0tBQ0Y7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJvb3RhYmxlIGZyb20gJy4vYm9vdGFibGUnXG5pbXBvcnQgeyBjb25zb2xlV2FybiB9IGZyb20gJy4uL3V0aWwvY29uc29sZSdcblxuZnVuY3Rpb24gdmFsaWRhdGVBdHRhY2hUYXJnZXQgKHZhbCkge1xuICBjb25zdCB0eXBlID0gdHlwZW9mIHZhbFxuXG4gIGlmICh0eXBlID09PSAnYm9vbGVhbicgfHwgdHlwZSA9PT0gJ3N0cmluZycpIHJldHVybiB0cnVlXG5cbiAgcmV0dXJuIHZhbC5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREVcbn1cblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2RldGFjaGFibGUnLFxuXG4gIG1peGluczogW0Jvb3RhYmxlXSxcblxuICBwcm9wczoge1xuICAgIGF0dGFjaDoge1xuICAgICAgdHlwZTogbnVsbCxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0ZUF0dGFjaFRhcmdldFxuICAgIH0sXG4gICAgY29udGVudENsYXNzOiB7XG4gICAgICBkZWZhdWx0OiAnJ1xuICAgIH1cbiAgfSxcblxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGhhc0RldGFjaGVkOiBmYWxzZVxuICB9KSxcblxuICB3YXRjaDoge1xuICAgIGF0dGFjaCAoKSB7XG4gICAgICB0aGlzLmhhc0RldGFjaGVkID0gZmFsc2VcbiAgICAgIHRoaXMuaW5pdERldGFjaCgpXG4gICAgfSxcbiAgICBoYXNDb250ZW50OiAnaW5pdERldGFjaCdcbiAgfSxcblxuICBtb3VudGVkICgpIHtcbiAgICAhdGhpcy5sYXp5ICYmIHRoaXMuaW5pdERldGFjaCgpXG4gIH0sXG5cbiAgZGVhY3RpdmF0ZWQgKCkge1xuICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZVxuICB9LFxuXG4gIGJlZm9yZURlc3Ryb3kgKCkge1xuICAgIGlmICghdGhpcy4kcmVmcy5jb250ZW50KSByZXR1cm5cblxuICAgIC8vIElFMTEgRml4XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuJHJlZnMuY29udGVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuJHJlZnMuY29udGVudClcbiAgICB9IGNhdGNoIChlKSB7IGNvbnNvbGUubG9nKGUpIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgZ2V0U2NvcGVJZEF0dHJzICgpIHtcbiAgICAgIGNvbnN0IHNjb3BlSWQgPSB0aGlzLiR2bm9kZSAmJiB0aGlzLiR2bm9kZS5jb250ZXh0LiRvcHRpb25zLl9zY29wZUlkXG4gICAgICByZXR1cm4gc2NvcGVJZCAmJiB7XG4gICAgICAgIFtzY29wZUlkXTogJydcbiAgICAgIH1cbiAgICB9LFxuICAgIGluaXREZXRhY2ggKCkge1xuICAgICAgaWYgKHRoaXMuX2lzRGVzdHJveWVkIHx8XG4gICAgICAgICF0aGlzLiRyZWZzLmNvbnRlbnQgfHxcbiAgICAgICAgdGhpcy5oYXNEZXRhY2hlZCB8fFxuICAgICAgICAvLyBMZWF2ZSBtZW51IGluIHBsYWNlIGlmIGF0dGFjaGVkXG4gICAgICAgIC8vIGFuZCBkZXYgaGFzIG5vdCBjaGFuZ2VkIHRhcmdldFxuICAgICAgICB0aGlzLmF0dGFjaCA9PT0gJycgfHwgLy8gSWYgdXNlZCBhcyBhIGJvb2xlYW4gcHJvcCAoPHYtbWVudSBhdHRhY2g+KVxuICAgICAgICB0aGlzLmF0dGFjaCA9PT0gdHJ1ZSB8fCAvLyBJZiBib3VuZCB0byBhIGJvb2xlYW4gKDx2LW1lbnUgOmF0dGFjaD1cInRydWVcIj4pXG4gICAgICAgIHRoaXMuYXR0YWNoID09PSAnYXR0YWNoJyAvLyBJZiBib3VuZCBhcyBib29sZWFuIHByb3AgaW4gcHVnICh2LW1lbnUoYXR0YWNoKSlcbiAgICAgICkgcmV0dXJuXG5cbiAgICAgIGxldCB0YXJnZXRcbiAgICAgIGlmICh0aGlzLmF0dGFjaCA9PT0gZmFsc2UpIHtcbiAgICAgICAgLy8gRGVmYXVsdCwgZGV0YWNoIHRvIGFwcFxuICAgICAgICB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1hcHBdJylcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuYXR0YWNoID09PSAnc3RyaW5nJykge1xuICAgICAgICAvLyBDU1Mgc2VsZWN0b3JcbiAgICAgICAgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmF0dGFjaClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIERPTSBFbGVtZW50XG4gICAgICAgIHRhcmdldCA9IHRoaXMuYXR0YWNoXG4gICAgICB9XG5cbiAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgIGNvbnNvbGVXYXJuKGBVbmFibGUgdG8gbG9jYXRlIHRhcmdldCAke3RoaXMuYXR0YWNoIHx8ICdbZGF0YS1hcHBdJ31gLCB0aGlzKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgdGFyZ2V0Lmluc2VydEJlZm9yZShcbiAgICAgICAgdGhpcy4kcmVmcy5jb250ZW50LFxuICAgICAgICB0YXJnZXQuZmlyc3RDaGlsZFxuICAgICAgKVxuXG4gICAgICB0aGlzLmhhc0RldGFjaGVkID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuIl19