export default {
  header: 'Layouts',
  headerText: `The layout system is the heart of every application. Below are the officially supported examples, ranging from desktop to mobile applications. While Vuetify.js aims to be as un-opinionated as possible, the layout structure must be **explicitly** followed to receive the expected results.`,
  markupHeader: 'Default application markup',
  markupText: `This is an example of the default application markup for Vuetify. You can place your layout elements anywhere, as long as you designate them with the **app** property. The key component in all of this is the <code>v-content</code> element. This will be dynamically sized depending upon the structure of your designated **app** components. This allows you to create extremely customed solutions.`,
  appHeader: 'All about _app_',
  appText: `In Vuetify, the <code>v-app</code> component and the **app** help bootstrap your application with the proper sizing around <code>v-content</code>. This allows you to create truly unique interfaces without the hassle of managing your layout. The <code>v-app</code> component is **REQUIRED** for all applications. This is the mount point for many of Vuetify's components and functionality.`,
  alert1: `In order for your application to work properly, you **must** wrap it in a <code>v-app</code> component. This component is required for determining grid breakpoints for the layout. This can exist **anywhere** inside the body, but must be the parent of **ALL** Vuetify components.`,
  toc: [
    {
      text: 'Layouts',
      href: 'introduction'
    },
    {
      text: 'Default app markup',
      href: 'default-markup'
    },
    {
      text: 'All about app',
      href: 'all-about-app'
    }
  ]
}
