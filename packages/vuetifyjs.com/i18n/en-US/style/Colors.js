export default {
  header: 'Colors',
  headerText: 'Included with Vuetify is the entire Material Design color library. These color classes drastically help the prototyping phase or make the need for additional color declaration not needed.',
  classesHeader: 'Classes',
  classesText: 'You can change a background or text color by adding a class to the element. For background, use just the name, for example, <code>&lt;div class="red"&gt;</code>. To use a shade, just add the modifying type, such as, <strong>darken-3</strong>. Text is very similar, adding a modification class, <strong>red--text</strong>, you can change the color of text, or change the type with adding <strong>text--lighten-2</strong>. For some elements like the <code>v-badge</code>, you can use the <em>--after</em> type for the background, <code>&lt;span class="green--after" v-badge:5&gt;</code>.',
  colorPackHeader: 'Color Pack',
  colorPackText: 'Vuetify comes pre-built with a Material Design Color Pack (thanks <a href="http://materializecss.com/color.html" target="_blank" rel="noopener">Materialize.css</a>) by default. While convenient, this also increases the css export size by ~30kb. This can be disabled in both the webpack and webpack-ssr Vue cli templates.',
  colorPackSubHeader1: 'Webpack',
  colorPackSubText1: 'Navigate to <kbd>src/App.vue</kbd>. Scroll to the style element and set <code>$color-pack = false</code> above the Vuetify css import.',
  colorPackSubHeader2: 'Webpack-SSR',
  colorPackSubText2: 'Navigate to <kbd>src/stylus/main.styl</kbd>. At the top of the file, declare <code>$color-pack = false</code>.'
}
