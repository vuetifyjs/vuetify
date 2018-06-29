module.exports = {
  title: 'Layouts',
  id: 'layout-view',
  edit: 'LayoutsView',
  component: 'app',
  desc: 'The layout system is the heart of every application. Below are the officially supported examples, ranging from desktop to mobile applications.',
  examples: [
    {
      header: 'Structure',
      file: 'layouts/1',
      desc: `The default structure of the Vuetify layout is one of the few opinionated designs you will encounter in the framework. It is done so that each layout is easy to understand and works as expected for any given scenario. Below is the <strong>baseline</strong> structure for a layout. It includes a navigation drawer, toolbar, right navigation drawer, content and footer.`
    },
    {
      header: 'Permanent drawer',
      file: 'layouts/2',
      desc: `Permanent navigation drawers are default open. These are used for applications that are desktop only and are not openable or closeable.`
    },
    {
      header: 'Permanent clipped drawer',
      file: 'layouts/3'
    },
    {
      header: 'Permanent floating drawer',
      file: 'layouts/4'
    },
    {
      header: 'Permanent floating drawer in a card',
      file: 'layouts/5'
    },
    {
      header: 'Persistent',
      file: 'layouts/6',
      desc: `Permanent navigation drawers are default open. These are used for applications that are desktop only and are not openable or closeable.`
    },
    {
      header: 'Temporary',
      file: 'layouts/7'
    },
    {
      header: 'Dark theme',
      file: 'layouts/8',
      desc: `Vuetify also supports the dark application theme. This will not override components that have default themes so in some cases it will be necessary to manually set the dark theme accents.`
    }
  ],
  props: []
}