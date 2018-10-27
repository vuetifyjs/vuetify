import mixins from '../util/mixins';
import { provide as RegistrableProvide } from './registrable';
import { consoleWarn } from '../util/console';
/* @vue/component */
export default mixins(RegistrableProvide('buttonGroup')).extend({
    name: 'button-group',
    props: {
        mandatory: Boolean
    },
    data: () => ({
        buttons: [],
        listeners: [],
        isDestroying: false
    }),
    watch: {
        buttons: 'update'
    },
    mounted() {
        this.update();
    },
    beforeDestroy() {
        this.isDestroying = true;
    },
    methods: {
        /** @abstract */
        isSelected(i) {
            throw new Error('Not implemented !');
        },
        /** @abstract */
        updateValue(i) {
            throw new Error('Not implemented !');
        },
        /** @abstract */
        updateAllValues() {
            throw new Error('Not implemented !');
        },
        getValue(i) {
            if (this.buttons[i].value != null) {
                return this.buttons[i].value;
            }
            return i;
        },
        update() {
            const selected = [];
            for (let i = 0; i < this.buttons.length; i++) {
                const elm = this.buttons[i].$el;
                const button = this.buttons[i];
                elm.removeAttribute('data-only-child');
                if (this.isSelected(i)) {
                    !button.to && (button.isActive = true);
                    selected.push(i);
                }
                else {
                    !button.to && (button.isActive = false);
                }
            }
            if (selected.length === 1) {
                this.buttons[selected[0]].$el.setAttribute('data-only-child', 'true');
            }
            this.ensureMandatoryInvariant(selected.length > 0);
        },
        register(button) {
            const index = this.buttons.length;
            this.buttons.push(button);
            this.listeners.push(this.updateValue.bind(this, index));
            button.$on('click', this.listeners[index]);
        },
        unregister(buttonToUnregister) {
            // Basic cleanup if we're destroying
            if (this.isDestroying) {
                const index = this.buttons.indexOf(buttonToUnregister);
                if (index !== -1) {
                    buttonToUnregister.$off('click', this.listeners[index]);
                }
                return;
            }
            this.redoRegistrations(buttonToUnregister);
        },
        redoRegistrations(buttonToUnregister) {
            let selectedCount = 0;
            const buttons = [];
            for (let index = 0; index < this.buttons.length; ++index) {
                const button = this.buttons[index];
                if (button !== buttonToUnregister) {
                    buttons.push(button);
                    selectedCount += Number(this.isSelected(index));
                }
                button.$off('click', this.listeners[index]);
            }
            this.buttons = [];
            this.listeners = [];
            for (let index = 0; index < buttons.length; ++index) {
                this.register(buttons[index]);
            }
            this.ensureMandatoryInvariant(selectedCount > 0);
            this.updateAllValues && this.updateAllValues();
        },
        ensureMandatoryInvariant(hasSelectedAlready) {
            // Preserve the mandatory invariant by selecting the first tracked button, if needed
            if (!this.mandatory || hasSelectedAlready)
                return;
            if (!this.listeners.length) {
                consoleWarn('There must be at least one v-btn child if the mandatory property is true.', this);
                return;
            }
            this.listeners[0]();
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWdyb3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21peGlucy9idXR0b24tZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLE1BQU0sZ0JBQWdCLENBQUE7QUFFbkMsT0FBTyxFQUFFLE9BQU8sSUFBSSxrQkFBa0IsRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUM3RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFNN0Msb0JBQW9CO0FBQ3BCLGVBQWUsTUFBTSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQzlELElBQUksRUFBRSxjQUFjO0lBRXBCLEtBQUssRUFBRTtRQUNMLFNBQVMsRUFBRSxPQUFPO0tBQ25CO0lBRUQsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDWCxPQUFPLEVBQUUsRUFBb0I7UUFDN0IsU0FBUyxFQUFFLEVBQW9CO1FBQy9CLFlBQVksRUFBRSxLQUFLO0tBQ3BCLENBQUM7SUFFRixLQUFLLEVBQUU7UUFDTCxPQUFPLEVBQUUsUUFBUTtLQUNsQjtJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDZixDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFBO0lBQzFCLENBQUM7SUFFRCxPQUFPLEVBQUU7UUFDUCxnQkFBZ0I7UUFDaEIsVUFBVSxDQUFFLENBQVM7WUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO1FBQ3RDLENBQUM7UUFDRCxnQkFBZ0I7UUFDaEIsV0FBVyxDQUFFLENBQVM7WUFDcEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO1FBQ3RDLENBQUM7UUFDRCxnQkFBZ0I7UUFDaEIsZUFBZTtZQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FB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dCBtaXhpbnMgZnJvbSAnLi4vdXRpbC9taXhpbnMnXG5cbmltcG9ydCB7IHByb3ZpZGUgYXMgUmVnaXN0cmFibGVQcm92aWRlIH0gZnJvbSAnLi9yZWdpc3RyYWJsZSdcbmltcG9ydCB7IGNvbnNvbGVXYXJuIH0gZnJvbSAnLi4vdXRpbC9jb25zb2xlJ1xuXG5pbXBvcnQgVkJ0biBmcm9tICcuLi9jb21wb25lbnRzL1ZCdG4vVkJ0bidcblxudHlwZSBWQnRuSW5zdGFuY2UgPSBJbnN0YW5jZVR5cGU8dHlwZW9mIFZCdG4+XG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCBtaXhpbnMoUmVnaXN0cmFibGVQcm92aWRlKCdidXR0b25Hcm91cCcpKS5leHRlbmQoe1xuICBuYW1lOiAnYnV0dG9uLWdyb3VwJyxcblxuICBwcm9wczoge1xuICAgIG1hbmRhdG9yeTogQm9vbGVhblxuICB9LFxuXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgYnV0dG9uczogW10gYXMgVkJ0bkluc3RhbmNlW10sXG4gICAgbGlzdGVuZXJzOiBbXSBhcyAoKCkgPT4gdm9pZClbXSxcbiAgICBpc0Rlc3Ryb3lpbmc6IGZhbHNlXG4gIH0pLFxuXG4gIHdhdGNoOiB7XG4gICAgYnV0dG9uczogJ3VwZGF0ZSdcbiAgfSxcblxuICBtb3VudGVkICgpIHtcbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH0sXG5cbiAgYmVmb3JlRGVzdHJveSAoKSB7XG4gICAgdGhpcy5pc0Rlc3Ryb3lpbmcgPSB0cnVlXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIC8qKiBAYWJzdHJhY3QgKi9cbiAgICBpc1NlbGVjdGVkIChpOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkICEnKVxuICAgIH0sXG4gICAgLyoqIEBhYnN0cmFjdCAqL1xuICAgIHVwZGF0ZVZhbHVlIChpOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkICEnKVxuICAgIH0sXG4gICAgLyoqIEBhYnN0cmFjdCAqL1xuICAgIHVwZGF0ZUFsbFZhbHVlcyAoKTogdm9pZCB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCAhJylcbiAgICB9LFxuICAgIGdldFZhbHVlIChpOiBudW1iZXIpOiBhbnkge1xuICAgICAgaWYgKHRoaXMuYnV0dG9uc1tpXS52YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJ1dHRvbnNbaV0udmFsdWVcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGlcbiAgICB9LFxuICAgIHVwZGF0ZSAoKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZCA9IFtdXG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5idXR0b25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGVsbSA9IHRoaXMuYnV0dG9uc1tpXS4kZWxcbiAgICAgICAgY29uc3QgYnV0dG9uID0gdGhpcy5idXR0b25zW2ldXG5cbiAgICAgICAgZWxtLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1vbmx5LWNoaWxkJylcblxuICAgICAgICBpZiAodGhpcy5pc1NlbGVjdGVkKGkpKSB7XG4gICAgICAgICAgIWJ1dHRvbi50byAmJiAoYnV0dG9uLmlzQWN0aXZlID0gdHJ1ZSlcbiAgICAgICAgICBzZWxlY3RlZC5wdXNoKGkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgIWJ1dHRvbi50byAmJiAoYnV0dG9uLmlzQWN0aXZlID0gZmFsc2UpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0aGlzLmJ1dHRvbnNbc2VsZWN0ZWRbMF1dLiRlbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtb25seS1jaGlsZCcsICd0cnVlJylcbiAgICAgIH1cblxuICAgICAgdGhpcy5lbnN1cmVNYW5kYXRvcnlJbnZhcmlhbnQoc2VsZWN0ZWQubGVuZ3RoID4gMClcbiAgICB9LFxuICAgIHJlZ2lzdGVyIChidXR0b246IFZCdG5JbnN0YW5jZSk6IHZvaWQge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmJ1dHRvbnMubGVuZ3RoXG4gICAgICB0aGlzLmJ1dHRvbnMucHVzaChidXR0b24pXG4gICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKHRoaXMudXBkYXRlVmFsdWUuYmluZCh0aGlzLCBpbmRleCkpXG4gICAgICBidXR0b24uJG9uKCdjbGljaycsIHRoaXMubGlzdGVuZXJzW2luZGV4XSlcbiAgICB9LFxuICAgIHVucmVnaXN0ZXIgKGJ1dHRvblRvVW5yZWdpc3RlcjogVkJ0bkluc3RhbmNlKTogdm9pZCB7XG4gICAgICAvLyBCYXNpYyBjbGVhbnVwIGlmIHdlJ3JlIGRlc3Ryb3lpbmdcbiAgICAgIGlmICh0aGlzLmlzRGVzdHJveWluZykge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuYnV0dG9ucy5pbmRleE9mKGJ1dHRvblRvVW5yZWdpc3RlcilcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgIGJ1dHRvblRvVW5yZWdpc3Rlci4kb2ZmKCdjbGljaycsIHRoaXMubGlzdGVuZXJzW2luZGV4XSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgdGhpcy5yZWRvUmVnaXN0cmF0aW9ucyhidXR0b25Ub1VucmVnaXN0ZXIpXG4gICAgfSxcbiAgICByZWRvUmVnaXN0cmF0aW9ucyAoYnV0dG9uVG9VbnJlZ2lzdGVyOiBWQnRuSW5zdGFuY2UpOiB2b2lkIHtcbiAgICAgIGxldCBzZWxlY3RlZENvdW50ID0gMFxuXG4gICAgICBjb25zdCBidXR0b25zID0gW11cbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmJ1dHRvbnMubGVuZ3RoOyArK2luZGV4KSB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IHRoaXMuYnV0dG9uc1tpbmRleF1cbiAgICAgICAgaWYgKGJ1dHRvbiAhPT0gYnV0dG9uVG9VbnJlZ2lzdGVyKSB7XG4gICAgICAgICAgYnV0dG9ucy5wdXNoKGJ1dHRvbilcbiAgICAgICAgICBzZWxlY3RlZENvdW50ICs9IE51bWJlcih0aGlzLmlzU2VsZWN0ZWQoaW5kZXgpKVxuICAgICAgICB9XG5cbiAgICAgICAgYnV0dG9uLiRvZmYoJ2NsaWNrJywgdGhpcy5saXN0ZW5lcnNbaW5kZXhdKVxuICAgICAgfVxuXG4gICAgICB0aGlzLmJ1dHRvbnMgPSBbXVxuICAgICAgdGhpcy5saXN0ZW5lcnMgPSBbXVxuXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYnV0dG9ucy5sZW5ndGg7ICsraW5kZXgpIHtcbiAgICAgICAgdGhpcy5yZWdpc3RlcihidXR0b25zW2luZGV4XSlcbiAgICAgIH1cblxuICAgICAgdGhpcy5lbnN1cmVNYW5kYXRvcnlJbnZhcmlhbnQoc2VsZWN0ZWRDb3VudCA+IDApXG4gICAgICB0aGlzLnVwZGF0ZUFsbFZhbHVlcyAmJiB0aGlzLnVwZGF0ZUFsbFZhbHVlcygpXG4gICAgfSxcbiAgICBlbnN1cmVNYW5kYXRvcnlJbnZhcmlhbnQgKGhhc1NlbGVjdGVkQWxyZWFkeTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgLy8gUHJlc2VydmUgdGhlIG1hbmRhdG9yeSBpbnZhcmlhbnQgYnkgc2VsZWN0aW5nIHRoZSBmaXJzdCB0cmFja2VkIGJ1dHRvbiwgaWYgbmVlZGVkXG5cbiAgICAgIGlmICghdGhpcy5tYW5kYXRvcnkgfHwgaGFzU2VsZWN0ZWRBbHJlYWR5KSByZXR1cm5cblxuICAgICAgaWYgKCF0aGlzLmxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgY29uc29sZVdhcm4oJ1RoZXJlIG11c3QgYmUgYXQgbGVhc3Qgb25lIHYtYnRuIGNoaWxkIGlmIHRoZSBtYW5kYXRvcnkgcHJvcGVydHkgaXMgdHJ1ZS4nLCB0aGlzKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgdGhpcy5saXN0ZW5lcnNbMF0oKVxuICAgIH1cbiAgfVxufSlcbiJdfQ==