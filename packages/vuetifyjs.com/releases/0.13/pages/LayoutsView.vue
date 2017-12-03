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
        v-alert(info value="true") Keep in mind that for the purposes of these docs, the <code>v-navigation-drawer</code>'s have had their overflow removed and set to absolute positioning. In your application, you can choose to omit these properties.
    v-alert(error value="true") In order for your application to work properly, you <strong>must</strong> wrap it in a <code>v-app</code> component. If you absolutely cannot wrap your application, you must add corresponding class for your chosen theme. <strong>"application--light"</strong> or <strong>"application--dark"</strong>.
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
          ],
          props: {
            'v-app': {
              shared: ['theme'],
              params: [
                [
                  'id',
                  'String',
                  'app',
                  'The id for your application'
                ],
                [
                  'standalone',
                  'Boolean',
                  'False',
                  'This property is primarily for allowing to display examples properly in the documentation. This property will move the application theme classes from the body to the actual <code>v-app</code> component'
                ],
                [
                  'footer',
                  'Boolean',
                  'False',
                  'Configures the application to have a footer'
                ],
                [
                  'fixed-footer',
                  'Boolean',
                  'False',
                  'Configures the application to have a fixed footer'
                ],
                [
                  'toolbar',
                  'Boolean',
                  'False',
                  'Configures the application to have a fixed toolbar'
                ]
              ]
            }
          },
          slots: {
            'v-app': {
              shared: ['default']
            }
          }
        }
      }
    }
  }
</script>

<style lang="stylus">
  #layouts-view
    .component-example
      position: relative
      z-index: 0

      [data-app]
        border: 1px solid rgba(#000, .1)
        overflow: hidden
        height: 400px
        min-height: 0
        elevation(2)

        .navigation-drawer, .toolbar, .overlay
          position: absolute

        main .container
          min-height: calc(400px - 36px) !important

        .navigation-drawer
          height: 400px !important
</style>
