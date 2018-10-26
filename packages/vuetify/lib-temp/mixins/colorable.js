import Vue from 'vue';
function isCssColor(color) {
    return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/);
}
export default Vue.extend({
    name: 'colorable',
    props: {
        color: String
    },
    methods: {
        setBackgroundColor(color, data = {}) {
            if (isCssColor(color)) {
                data.style = {
                    ...data.style,
                    'background-color': `${color}`,
                    'border-color': `${color}`
                };
            }
            else if (color) {
                data.class = {
                    ...data.class,
                    [color]: true
                };
            }
            return data;
        },
        setTextColor(color, data = {}) {
            if (isCssColor(color)) {
                data.style = {
                    ...data.style,
                    'color': `${color}`,
                    'caret-color': `${color}`
                };
            }
            else if (color) {
                const [colorName, colorModifier] = color.toString().trim().split(' ', 2);
                data.class = {
                    ...data.class,
                    [colorName + '--text']: true
                };
                if (colorModifier) {
                    data.class['text--' + colorModifier] = true;
                }
            }
            return data;
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3JhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21peGlucy9jb2xvcmFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFHLE1BQU0sS0FBSyxDQUFBO0FBR3JCLFNBQVMsVUFBVSxDQUFFLEtBQXNCO0lBQ3pDLE9BQU8sQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0FBQ3ZELENBQUM7QUFFRCxlQUFlLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDeEIsSUFBSSxFQUFFLFdBQVc7SUFFakIsS0FBSyxFQUFFO1FBQ0wsS0FBSyxFQUFFLE1BQU07S0FDZDtJQUVELE9BQU8sRUFBRTtRQUNQLGtCQUFrQixDQUFFLEtBQXNCLEVBQUUsT0FBa0IsRUFBRTtZQUM5RCxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDckIsSUFBSSxDQUFDLEtBQUssR0FBRztvQkFDWCxHQUFHLElBQUksQ0FBQyxLQUFLO29CQUNiLGtCQUFrQixFQUFFLEdBQUcsS0FBSyxFQUFFO29CQUM5QixjQUFjLEVBQUUsR0FBRyxLQUFLLEVBQUU7aUJBQzNCLENBQUE7YUFDRjtpQkFBTSxJQUFJLEtBQUssRUFBRTtnQkFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRztvQkFDWCxHQUFHLElBQUksQ0FBQyxLQUFLO29CQUNiLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSTtpQkFDZCxDQUFBO2FBQ0Y7WUFFRCxPQUFPLElBQUksQ0FBQTtRQUNiLENBQUM7UUFFRCxZQUFZLENBQUUsS0FBc0IsRUFBRSxPQUFrQixFQUFFO1lBQ3hELElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHO29CQUNYLEdBQUcsSUFBSSxDQUFDLEtBQUs7b0JBQ2IsT0FBTyxFQUFFLEdBQUcsS0FBSyxFQUFFO29CQUNuQixhQUFhLEVBQUUsR0FBRyxLQUFLLEVBQUU7aUJBQzFCLENBQUE7YUFDRjtpQkFBTSxJQUFJLEtBQUssRUFBRTtnQkFDaEIsTUFBTSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQTJCLENBQUE7Z0JBQ2xHLElBQUksQ0FBQyxLQUFLLEdBQUc7b0JBQ1gsR0FBRyxJQUFJLENBQUMsS0FBSztvQkFDYixDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsRUFBRSxJQUFJO2lCQUM3QixDQUFBO2dCQUNELElBQUksYUFBYSxFQUFFO29CQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUE7aUJBQzVDO2FBQ0Y7WUFDRCxPQUFPLElBQUksQ0FBQTtRQUNiLENBQUM7S0FDRjtDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWdWUgZnJvbSAndnVlJ1xuaW1wb3J0IHsgVk5vZGVEYXRhIH0gZnJvbSAndnVlL3R5cGVzL3Zub2RlJ1xuXG5mdW5jdGlvbiBpc0Nzc0NvbG9yIChjb2xvcj86IHN0cmluZyB8IGZhbHNlKTogYm9vbGVhbiB7XG4gIHJldHVybiAhIWNvbG9yICYmICEhY29sb3IubWF0Y2goL14oI3wocmdifGhzbClhP1xcKCkvKVxufVxuXG5leHBvcnQgZGVmYXVsdCBWdWUuZXh0ZW5kKHtcbiAgbmFtZTogJ2NvbG9yYWJsZScsXG5cbiAgcHJvcHM6IHtcbiAgICBjb2xvcjogU3RyaW5nXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIHNldEJhY2tncm91bmRDb2xvciAoY29sb3I/OiBzdHJpbmcgfCBmYWxzZSwgZGF0YTogVk5vZGVEYXRhID0ge30pOiBWTm9kZURhdGEge1xuICAgICAgaWYgKGlzQ3NzQ29sb3IoY29sb3IpKSB7XG4gICAgICAgIGRhdGEuc3R5bGUgPSB7XG4gICAgICAgICAgLi4uZGF0YS5zdHlsZSxcbiAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IGAke2NvbG9yfWAsXG4gICAgICAgICAgJ2JvcmRlci1jb2xvcic6IGAke2NvbG9yfWBcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChjb2xvcikge1xuICAgICAgICBkYXRhLmNsYXNzID0ge1xuICAgICAgICAgIC4uLmRhdGEuY2xhc3MsXG4gICAgICAgICAgW2NvbG9yXTogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXRhXG4gICAgfSxcblxuICAgIHNldFRleHRDb2xvciAoY29sb3I/OiBzdHJpbmcgfCBmYWxzZSwgZGF0YTogVk5vZGVEYXRhID0ge30pOiBWTm9kZURhdGEge1xuICAgICAgaWYgKGlzQ3NzQ29sb3IoY29sb3IpKSB7XG4gICAgICAgIGRhdGEuc3R5bGUgPSB7XG4gICAgICAgICAgLi4uZGF0YS5zdHlsZSxcbiAgICAgICAgICAnY29sb3InOiBgJHtjb2xvcn1gLFxuICAgICAgICAgICdjYXJldC1jb2xvcic6IGAke2NvbG9yfWBcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChjb2xvcikge1xuICAgICAgICBjb25zdCBbY29sb3JOYW1lLCBjb2xvck1vZGlmaWVyXSA9IGNvbG9yLnRvU3RyaW5nKCkudHJpbSgpLnNwbGl0KCcgJywgMikgYXMgKHN0cmluZyB8IHVuZGVmaW5lZClbXVxuICAgICAgICBkYXRhLmNsYXNzID0ge1xuICAgICAgICAgIC4uLmRhdGEuY2xhc3MsXG4gICAgICAgICAgW2NvbG9yTmFtZSArICctLXRleHQnXTogdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGlmIChjb2xvck1vZGlmaWVyKSB7XG4gICAgICAgICAgZGF0YS5jbGFzc1sndGV4dC0tJyArIGNvbG9yTW9kaWZpZXJdID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZGF0YVxuICAgIH1cbiAgfVxufSlcbiJdfQ==