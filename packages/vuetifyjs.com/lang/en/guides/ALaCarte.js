export default {
  header: 'Overview',
  headerText: 'Being a component framework, Vuetify will always grow horizontally. Depending on your project, a small **package size** may be a requirement. The A la carte system enables you to pick and choose which components to import, drastically _lowering_ your build size. **If you already have the `a-la-carte` template installed, you can skip to the [guide](/guides/a-la-carte#application)**.',
  headerText2: 'For a pre-built project demonstrating single component imports, install the **a-la-carte** template from the cli, using the command `vue init vuetifyjs/a-la-carte`. Some of our other templates also include options for enabling a-la-carte components. More information is located in the [Quick start guide](/getting-started/quick-start)',
  importHeader: 'Importing components',
  importText1: 'The `transform-imports` package is not necessary to use a-la-carte components, but simplifies the process of importing them, and is therefore **highly** recommended. It allows you to use a more concise syntax when importing components.',
  alert2: 'Keep in mind, both the `Vuetify` and `VApp` components are required to use Vuetify',
  alert3: 'The options object that you pass as the second argument to `Vue.use` can also include both a _directives_ and a _transitions_ property.',
  importText2: 'If you are not using the transform-imports package, you will need to import each component like this:',
  importText3: 'You can also import components in .vue files, as seen below.',
  styleHeader: 'Required styles',
  styleText1: 'In order to obtain all the required styles, we need to import them in stylus. In order for webpack to handle this, you will need to install `stylus` and the `stylus-loader` from **npm**.',
  alert4: 'For a more detailed explanation on how to setup your application to handle stylus, please navigate to the <a href="/style/themes">theme page</a>.',
  styleText2: 'Now you will need to require the stylus from the entry point of your application. This is the same place where you\'re importing Vue and Vuetify (usually `main.js` or `app.js`). Keep in mind, requiring this in your main `App.vue` can cause slow load times as it is re-processed when you make updates.',
  applicationHeader: 'Application',
  applicationText1: 'Navigate to the **src** folder and open up `main.js`. We see that in the template come some components already configured to load.',
  applicationText2: 'For example the code below tells the application that you use a `<v-app>`, `<v-navigation-drawer>`, `<v-footer>` and `<v-toolbar>`. Once defined, the markup can be used in any .vue file.',
  componentNameListHeader: 'UI Component Name List',
  componentNameListText1: 'Some components such as `VLayout` or `VFlex` are for organizational reasons included in other components, in this case `VGrid`. To know which component to import you can review the following table.',
  toc: [
    {
      text: 'Overview',
      href: 'introduction'
    },
    {
      text: 'Importing components',
      href: 'importing-components'
    },
    {
      text: 'Required styles',
      href: 'required-styles'
    },
    {
      text: 'Application',
      href: 'application'
    },
    {
      text: 'UI Component Name List',
      href: 'component-name-list'
    },
  ]
}
