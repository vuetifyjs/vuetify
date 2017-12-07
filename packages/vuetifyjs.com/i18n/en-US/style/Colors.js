export default {
  header: 'Colors',
  headerText: 'Included with Vuetify is the entire Material Design color library. These color classes drastically help the prototyping phase or make the need for additional color declaration not needed.',
  classesHeader: 'Classes',
  classesText: 'You can change a background or text color by adding a class to the element. For background, use the name, for example, `<div class="red">`. To use a shade, just add the modifying type, such as, **darken-3**. Text is very similar, adding a modification class, **red--text**, you can change the color of text, or change the type with adding **text--lighten-2**. These colors are also available as javascript variables, just import colors from <code>vuetify/es5/util/colors</code>',
  colorPackHeader: 'Color pack',
  colorPackText: 'Vuetify comes pre-built with a Material Design Color Pack (thanks <a href="http://materializecss.com/color.html" target="_blank" rel="noopener">Materialize.css</a>) by default. While convenient, this also increases the css export size by ~30kb. This can be disabled in both the webpack and webpack-ssr Vue cli templates.',
  colorPackSubHeader1: 'Webpack',
  colorPackSubText1: 'Navigate to <kbd>src/App.vue</kbd>. Scroll to the style element and set <code>$color-pack = false</code> above the Vuetify css import.',
  colorPackSubHeader2: 'Webpack-SSR',
  colorPackSubText2: 'Navigate to <kbd>src/stylus/main.styl</kbd>. At the top of the file, declare <code>$color-pack = false</code>.',
  toc: [
    {
      text: 'Colors',
      href: 'introduction'
    },
    {
      text: 'Classes',
      href: 'classes'
    },
    {
      text: 'Color pack',
      href: 'color-pack'
    }
  ]
}
