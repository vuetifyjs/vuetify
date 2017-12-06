export default {
  header: 'Theme',
  headerText: 'Easily change the colors of your application programmatically.',
  lightAndDarkHeader: 'Light and Dark',
  lightAndDarkText1: 'Vuetify supports both **light** and **dark** variants of the Material Design spec. This designation starts at the root application component, <code>v-app</code>.',
  lightAndDarkText2: 'When you designate a component as light or dark, all of its children will inherit and apply the same unless otherwise specified.',
  customizingHeader: 'Customizing',
  customizingText1: 'By default, Vuetify has a standard theme applied for all components.',
  customizingText2: 'This can be easily changed. Simply pass a **theme** property to the <code>Vue.use</code> function. You can choose to modify all or only some of the theme properties, with the remaining inheriting from the default.',
  customizingText3: 'You can also use the pre-defined material colors.',
  customizingText4: 'Under the hood, Vuetify will generate css classes based upon these values that will be accessible in the DOM. These classes will follow the same markup as other helper classes, <code>primary</code> or <code>secondary--text</code> for example.',
  customizingText5: 'These values will also be made available on the instance **$vuetify** object under the **theme** property. This allows you to _dynamically_ modify your theme. Behind the scenes, Vuetify will regenerate and update your theme classes, seemlessly updating your application.',
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
    }
  ]
}
