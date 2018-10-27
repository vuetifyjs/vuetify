import * as Theme from '../../../util/theme';
export default {
    data: () => ({
        style: null
    }),
    computed: {
        parsedTheme() {
            return Theme.parse(this.$vuetify.theme);
        },
        /** @return string */
        generatedStyles() {
            const theme = this.parsedTheme;
            let css;
            if (this.$vuetify.options.themeCache != null) {
                css = this.$vuetify.options.themeCache.get(theme);
                if (css != null)
                    return css;
            }
            css = Theme.genStyles(theme);
            if (this.$vuetify.options.minifyTheme != null) {
                css = this.$vuetify.options.minifyTheme(css);
            }
            if (this.$vuetify.options.themeCache != null) {
                this.$vuetify.options.themeCache.set(theme, css);
            }
            return css;
        },
        vueMeta() {
            if (this.$vuetify.theme === false)
                return;
            const options = {
                cssText: this.generatedStyles,
                id: 'vuetify-theme-stylesheet',
                type: 'text/css'
            };
            if (this.$vuetify.options.cspNonce) {
                options.nonce = this.$vuetify.options.cspNonce;
            }
            return {
                style: [options]
            };
        }
    },
    // Regular vue-meta
    metaInfo() {
        return this.vueMeta;
    },
    // Nuxt
    head() {
        return this.vueMeta;
    },
    watch: {
        generatedStyles() {
            !this.meta && this.applyTheme();
        }
    },
    created() {
        if (this.$vuetify.theme === false)
            return;
        if (this.$meta) {
            // Vue-meta
            // Handled by metaInfo()/nuxt()
        }
        else if (typeof document === 'undefined' && this.$ssrContext) {
            // SSR
            const nonce = this.$vuetify.options.cspNonce
                ? ` nonce="${this.$vuetify.options.cspNonce}"`
                : '';
            this.$ssrContext.head = this.$ssrContext.head || '';
            this.$ssrContext.head += `<style type="text/css" id="vuetify-theme-stylesheet"${nonce}>${this.generatedStyles}</style>`;
        }
        else if (typeof document !== 'undefined') {
            // Client-side
            this.genStyle();
            this.applyTheme();
        }
    },
    methods: {
        applyTheme() {
            if (this.style)
                this.style.innerHTML = this.generatedStyles;
        },
        genStyle() {
            let style = document.getElementById('vuetify-theme-stylesheet');
            if (!style) {
                style = document.createElement('style');
                style.type = 'text/css';
                style.id = 'vuetify-theme-stylesheet';
                if (this.$vuetify.options.cspNonce) {
                    style.setAttribute('nonce', this.$vuetify.options.cspNonce);
                }
                document.head.appendChild(style);
            }
            this.style = style;
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXRoZW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVkFwcC9taXhpbnMvYXBwLXRoZW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxLQUFLLE1BQU0scUJBQXFCLENBQUE7QUFFNUMsZUFBZTtJQUNiLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ1gsS0FBSyxFQUFFLElBQUk7S0FDWixDQUFDO0lBRUYsUUFBUSxFQUFFO1FBQ1IsV0FBVztZQUNULE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3pDLENBQUM7UUFDRCxxQkFBcUI7UUFDckIsZUFBZTtZQUNiLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUE7WUFDOUIsSUFBSSxHQUFHLENBQUE7WUFFUCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7Z0JBQzVDLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUNqRCxJQUFJLEdBQUcsSUFBSSxJQUFJO29CQUFFLE9BQU8sR0FBRyxDQUFBO2FBQzVCO1lBRUQsR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUE7WUFFNUIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxXQUFXLElBQUksSUFBSSxFQUFFO2dCQUM3QyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQzdDO1lBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO2dCQUM1QyxJQUFJLENBQUMs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LENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFBO2FBQ2pDO1lBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7UUFDcEIsQ0FBQztLQUNGO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRoZW1lIGZyb20gJy4uLy4uLy4uL3V0aWwvdGhlbWUnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBzdHlsZTogbnVsbFxuICB9KSxcblxuICBjb21wdXRlZDoge1xuICAgIHBhcnNlZFRoZW1lICgpIHtcbiAgICAgIHJldHVybiBUaGVtZS5wYXJzZSh0aGlzLiR2dWV0aWZ5LnRoZW1lKVxuICAgIH0sXG4gICAgLyoqIEByZXR1cm4gc3RyaW5nICovXG4gICAgZ2VuZXJhdGVkU3R5bGVzICgpIHtcbiAgICAgIGNvbnN0IHRoZW1lID0gdGhpcy5wYXJzZWRUaGVtZVxuICAgICAgbGV0IGNzc1xuXG4gICAgICBpZiAodGhpcy4kdnVldGlmeS5vcHRpb25zLnRoZW1lQ2FjaGUgIT0gbnVsbCkge1xuICAgICAgICBjc3MgPSB0aGlzLiR2dWV0aWZ5Lm9wdGlvbnMudGhlbWVDYWNoZS5nZXQodGhlbWUpXG4gICAgICAgIGlmIChjc3MgIT0gbnVsbCkgcmV0dXJuIGNzc1xuICAgICAgfVxuXG4gICAgICBjc3MgPSBUaGVtZS5nZW5TdHlsZXModGhlbWUpXG5cbiAgICAgIGlmICh0aGlzLiR2dWV0aWZ5Lm9wdGlvbnMubWluaWZ5VGhlbWUgIT0gbnVsbCkge1xuICAgICAgICBjc3MgPSB0aGlzLiR2dWV0aWZ5Lm9wdGlvbnMubWluaWZ5VGhlbWUoY3NzKVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy4kdnVldGlmeS5vcHRpb25zLnRoZW1lQ2FjaGUgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLiR2dWV0aWZ5Lm9wdGlvbnMudGhlbWVDYWNoZS5zZXQodGhlbWUsIGNzcylcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNzc1xuICAgIH0sXG4gICAgdnVlTWV0YSAoKSB7XG4gICAgICBpZiAodGhpcy4kdnVldGlmeS50aGVtZSA9PT0gZmFsc2UpIHJldHVyblxuXG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBjc3NUZXh0OiB0aGlzLmdlbmVyYXRlZFN0eWxlcyxcbiAgICAgICAgaWQ6ICd2dWV0aWZ5LXRoZW1lLXN0eWxlc2hlZXQnLFxuICAgICAgICB0eXBlOiAndGV4dC9jc3MnXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLiR2dWV0aWZ5Lm9wdGlvbnMuY3NwTm9uY2UpIHtcbiAgICAgICAgb3B0aW9ucy5ub25jZSA9IHRoaXMuJHZ1ZXRpZnkub3B0aW9ucy5jc3BOb25jZVxuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdHlsZTogW29wdGlvbnNdXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIFJlZ3VsYXIgdnVlLW1ldGFcbiAgbWV0YUluZm8gKCkge1xuICAgIHJldHVybiB0aGlzLnZ1ZU1ldGFcbiAgfSxcblxuICAvLyBOdXh0XG4gIGhlYWQgKCkge1xuICAgIHJldHVybiB0aGlzLnZ1ZU1ldGFcbiAgfSxcblxuICB3YXRjaDoge1xuICAgIGdlbmVyYXRlZFN0eWxlcyAoKSB7XG4gICAgICAhdGhpcy5tZXRhICYmIHRoaXMuYXBwbHlUaGVtZSgpXG4gICAgfVxuICB9LFxuXG4gIGNyZWF0ZWQgKCkge1xuICAgIGlmICh0aGlzLiR2dWV0aWZ5LnRoZW1lID09PSBmYWxzZSkgcmV0dXJuXG5cbiAgICBpZiAodGhpcy4kbWV0YSkge1xuICAgICAgLy8gVnVlLW1ldGFcbiAgICAgIC8vIEhhbmRsZWQgYnkgbWV0YUluZm8oKS9udXh0KClcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy4kc3NyQ29udGV4dCkge1xuICAgICAgLy8gU1NSXG4gICAgICBjb25zdCBub25jZSA9IHRoaXMuJHZ1ZXRpZnkub3B0aW9ucy5jc3BOb25jZVxuICAgICAgICA/IGAgbm9uY2U9XCIke3RoaXMuJHZ1ZXRpZnkub3B0aW9ucy5jc3BOb25jZX1cImBcbiAgICAgICAgOiAnJ1xuICAgICAgdGhpcy4kc3NyQ29udGV4dC5oZWFkID0gdGhpcy4kc3NyQ29udGV4dC5oZWFkIHx8ICcnXG4gICAgICB0aGlzLiRzc3JDb250ZXh0LmhlYWQgKz0gYDxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIiBpZD1cInZ1ZXRpZnktdGhlbWUtc3R5bGVzaGVldFwiJHtub25jZX0+JHt0aGlzLmdlbmVyYXRlZFN0eWxlc308L3N0eWxlPmBcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIENsaWVudC1zaWRlXG4gICAgICB0aGlzLmdlblN0eWxlKClcbiAgICAgIHRoaXMuYXBwbHlUaGVtZSgpXG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBhcHBseVRoZW1lICgpIHtcbiAgICAgIGlmICh0aGlzLnN0eWxlKSB0aGlzLnN0eWxlLmlubmVySFRNTCA9IHRoaXMuZ2VuZXJhdGVkU3R5bGVzXG4gICAgfSxcbiAgICBnZW5TdHlsZSAoKSB7XG4gICAgICBsZXQgc3R5bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndnVldGlmeS10aGVtZS1zdHlsZXNoZWV0JylcblxuICAgICAgaWYgKCFzdHlsZSkge1xuICAgICAgICBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgICAgICAgc3R5bGUudHlwZSA9ICd0ZXh0L2NzcydcbiAgICAgICAgc3R5bGUuaWQgPSAndnVldGlmeS10aGVtZS1zdHlsZXNoZWV0J1xuICAgICAgICBpZiAodGhpcy4kdnVldGlmeS5vcHRpb25zLmNzcE5vbmNlKSB7XG4gICAgICAgICAgc3R5bGUuc2V0QXR0cmlidXRlKCdub25jZScsIHRoaXMuJHZ1ZXRpZnkub3B0aW9ucy5jc3BOb25jZSlcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKVxuICAgICAgfVxuXG4gICAgICB0aGlzLnN0eWxlID0gc3R5bGVcbiAgICB9XG4gIH1cbn1cbiJdfQ==