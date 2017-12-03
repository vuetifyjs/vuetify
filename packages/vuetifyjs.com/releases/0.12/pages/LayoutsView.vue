<template lang="pug">
  component-view(v-bind:doc="doc")
    div(slot='top')
      section
        h2.display-1 Default application markup
        section-text This is the default application markup for Vuetify. The key is that drawer, toolbar, main and footer exist on the same level in the DOM. Using any one of the 5 pre-made vue-cli templates will automatically include this structure:
        markup(lang='html')
          |&lt;v-app&gt;
          |   &lt;v-navigation-drawer&gt;&lt;/v-navigation-drawer&gt;
          |   &lt;v-toolbar&gt;&lt;/v-toolbar&gt;
          |   &lt;main&gt;
          |     &lt;v-container fluid&gt;
          |       &lt;router-view&gt;&lt;/router-view&gt;
          |     &lt;/v-container&gt;
          |   &lt;/main&gt;
          |   &lt;v-footer&gt;&lt;/v-footer&gt;
          |&lt;/v-app&gt;
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          title: 'Layouts',
          edit: 'LayoutsView',
          component: 'app',
          desc: 'The layout system is the heart of every application. Below are the officially supported examples, ranging from desktop to mobile applications. While Vuetify.js aims to be as un-opinionated as possible, the layout structure must be <strong>explicitly</strong> followed to receive the expected results.',
          examples: [
            {
              header: 'Baseline',
              file: 'layouts/1',
              desc: `The default structure of the Vuetify layout is one of the few opinionated designs you will encounter in the framework. It is done so that each layout is easy to understand and works as expected for any given scenario. Below is the <strong>baseline</strong> structure for a layout. It includes a navigation drawer w/ right variant, toolbar, temporary navigation drawer w/ right variant, content and footer.`
            },
            {
              header: 'Permanent drawer',
              file: 'layouts/2',
              desc: `Permanent navigation drawers are default open. These are used for applications that are desktop only and are not openable or closeable.`
            },
            {
              header: 'Permanent clipped drawer',
              file: 'layouts/3',
              desc: `A clipped drawer rests under the application toolbar.`
            },
            {
              header: 'Permanent floating drawer',
              file: 'layouts/4',
              desc: `A floating drawer has no visible container (no border-right).`
            },
            {
              header: 'Permanent floating drawer in a card',
              file: 'layouts/5',
              desc: `A card can be used to contain a navigation drawer's items.`
            },
            {
              header: 'Persistent',
              file: 'layouts/6',
              desc: `A persistent drawer can be opened or closed. This is recommended sidebar for an application that supports both desktop and mobile.`
            },
            {
              header: 'Temporary',
              file: 'layouts/7',
              desc: `A temporary drawer sits above its application and uses a scrim (overlay) to darken the background. This drawer behavior is mimicked on the persistent drawer when on mobile. Clicking outside of the drawer will cause it to close.`
            },
            {
              header: 'Dark theme',
              file: 'layouts/8',
              desc: `Vuetify also supports the dark application theme. This will not override components that have default themes so in some cases it will be necessary to manually set the dark theme accents.`
            }
          ]
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import '../node_modules/vuetify/src/stylus/settings/_colors'
  @import '../node_modules/vuetify/src/stylus/tools/_elevations'

  #layouts-view
    .component-example
      position: relative
      z-index: 0

      [data-app]
        overflow: hidden
        height: 400px
        elevation(2)

        .navigation-drawer, .toolbar, .overlay
          position: absolute

        main .container
          min-height: calc(400px - 36px) !important

        .navigation-drawer
          height: 400px !important
</style>
