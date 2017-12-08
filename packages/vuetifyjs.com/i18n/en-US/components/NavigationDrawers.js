export default {
  header: 'Navigation drawer',
  headerText: 'The <code>v-navigation-drawer</code> component is what your users will utilize to navigate through the application. The navigation-drawer is pre-configured to work with or without **vue-router** right out the box.',
  components: ['v-navigation-drawer'],
  examples: [{
    permanent: {
      header: 'Default',
      desc: 'The navigation drawer is primarily used to house links to the pages in your application'
    },
    permanentClipped: {
      header: 'Colored drawer',
      desc: 'Navigation drawers can be customized to fit any application\'s design. While any component can be used within a drawer, the primary ones you will use are <code>v-list</code>, all of the **list** children components and <code>v-divider</code>'
    },
    permanentFloating: {
      header: 'Permanent floating drawer',
      desc: 'A navigation drawer can be placed inside of a card and float over the content background.'
    },
    persistent: {
      header: 'Avatars',
      desc: 'Since drawers support the <code>v-list</code> component, you can easily create customized dashboard solutions.'
    },
    mini: {
      header: 'Mini',
      desc: 'The navigation drawer also has a mini-variant which can be controlled using the prop <code>mini-variant.sync</code>.'
    },
    temporary: {
      header: 'Temporary',
      desc: 'A temporary drawer sits above its application and uses a scrim (overlay) to darken the background. This drawer behavior is mimicked on the persistent drawer when on mobile. Clicking outside of the drawer will cause it to close.'
    },
    dark: {
      header: 'Dark theme',
      desc: 'Vuetify also supports the dark application theme. This will not override components that have default themes so in some cases it will be necessary to manually set the dark theme accents.',
      uninverted: true
    }
  }]
}
