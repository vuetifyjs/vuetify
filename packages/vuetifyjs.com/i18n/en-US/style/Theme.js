export default {
  header: 'Theme',
  headerText: 'Easily change the colors of your application programmatically. Rebuild the default stylesheet and customize various aspects of the framework for your particular needs. If you are looking for the **Theme Generator**, please navigate [here](/theme-generator).',
  lightAndDarkHeader: 'Light and Dark',
  lightAndDarkText1: 'Vuetify supports both **light** and **dark** variants of the Material Design spec. This designation starts at the root application component, `v-app` and is supported by majority of components. By default, your application will use the **light** theme, but this can be easily overwritten by adding the **dark** prop.',
  lightAndDarkText2: 'When you designate a component as light or dark, all of its children will inherit and apply the same unless otherwise specified. Due to CSS specificity, there are certain combinations that might prompt you to manually assign the _theme_ for nested children. This is most likely to occur when using the **dark** theme.',
  customizingHeader: 'Customizing',
  customizingText1: 'By default, Vuetify has a standard theme applied for all components.',
  customizingText2: 'This can be easily changed. Simply pass a **theme** property to the `Vue.use` function. You can choose to modify all or only some of the theme properties, with the remaining inheriting from the default.',
  customizingText3: 'You can also use the pre-defined material colors.',
  customizingText4: 'Under the hood, Vuetify will generate css classes based upon these values that will be accessible in the DOM. These classes will follow the same markup as other helper classes, `primary` or `secondary--text` for example.',
  customizingText5: 'These values will also be made available on the instance **$vuetify** object under the **theme** property. This allows you to _dynamically_ modify your theme. Behind the scenes, Vuetify will regenerate and update your theme classes, seamlessly updating your application.',
  stylusHeader: 'Modifying Stylus variables',
  stylusText1: 'Vuetify is built on top of **stylus**. Similar to **scss**, you can change variables and re-compile the style files. A list of available variables is located [here](https://github.com/vuetifyjs/vuetify/blob/master/src/stylus/settings/_variables.styl). In order to build the stylus file, you will need to configure your application to support stylus. If you are using one of the pre-made templates available on the [Quick Start](/getting-started/quick-start) guide, you can skip the next section.',
  stylusHeader2: 'Setup stylus-loader with Webpack',
  stylusText2: 'In the command line, run:',
  stylusText3: 'This will install the dependencies needed to import and parse stylus files. Once installed, open your webpack config and add a rule for stylus. For **SSR** based applications, ensure that the import is in your main `client-entry`.',
  stylusText4: 'Create a folder called `stylus` in your src directory (or appropriate assets directory) with a file named `main.styl`. This will serve as the entry point to import and rebuild the default Vuetify styles. Once created, open the .styl file and add this entry.',
  stylusText5: 'Keep in mind that the relative location of node_modules may differ in your project so adjust accordingly. It is recommended that the import be located in your main application `index.js` or `client-entry.js` file. **DO NOT** import your `main.styl` inside of a component. This _will_ cause performance issues and drastically slow down **HMR** (hot module reloading).',
  stylusText6: 'After you have decided on your import location, if you are requiring the Vuetify stylesheet by a `<link>` tag in your index file, remove it. Restart your build processes and re-open your project. You should see all of the styles working correctly.',
  stylusHeader3: 'Changing values',
  stylusText7: 'Now that stylus is configured, you can set default values for the stylus variables that you wish to change. These must be declared _before_ the import and will automatically override the Vuetify defaults.',
  toc: [
    {
      text: 'Theme',
      href: 'introduction'
    },
    {
      text: 'Light and Dark',
      href: 'light-and-dark'
    },
    {
      text: 'Customizing',
      href: 'customizing'
    },
    {
      text: 'Modifying Stylus variables',
      href: 'stylus-guide'
    }
  ]
}
