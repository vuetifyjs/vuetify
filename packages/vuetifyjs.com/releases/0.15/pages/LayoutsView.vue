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
        v-alert(error value="true") In order for your application to work properly, you <strong>must</strong> wrap it in a <code>v-app</code> component. If you absolutely cannot wrap your application, you must add corresponding class for your chosen theme. <strong>"application--light"</strong> or <strong>"application--dark"</strong>. Also, keep note, all of the examples below have the <strong>absolute</strong> prop on <code>v-navigation-drawer</code> set to <strong>true</strong>. This is simply for the purpose of the documentation and in most cases <strong>SHOULD</strong> be removed when using these exact examples in your application.
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
              desc: 'The default structure of the Vuetify layout is one of the few opinionated designs you will encounter in the framework. It is done so that each layout is easy to understand and works as expected for any given scenario. Below is a <strong>baseline</strong> structure for a layout. It includes a navigation drawer, toolbar, content and footer.'
            },
            {
              header: 'Baseline - Flipped',
              file: 'layouts/2',
              desc: 'Here is a flipped version of the <strong>baseline</strong> layout.'
            },
            {
              header: 'Complex',
              file: 'layouts/3',
              desc: 'More complex layouts are also supported. This one includes a navigation drawer w/ right variant, toolbar, temporary navigation drawer w/ right variant, content and footer.'
            },
            {
              header: 'Dark theme',
              file: 'layouts/4',
              desc: 'Vuetify also supports the dark application theme. This will not override components that have default themes so in some cases it will be necessary to manually set the dark theme accents.'
            },
            {
              header: 'Example - Google Keep',
              file: 'layouts/5',
              desc: ''
            },
            {
              header: 'Example - Google Contacts',
              file: 'layouts/6',
              desc: ''
            },
            {
              header: 'Example - Youtube',
              file: 'layouts/7',
              desc: ''
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
                ],
                [
                  'fill-height',
                  'Boolean',
                  'False',
                  'Container will fill all available height and center its contents vertically'
                ]
              ]
            }
          },
          slots: {
            'v-app': {
              shared: ['default']
            }
          },
          functional: {
            'v-app': {
              params: [
                [
                 'v-spacer',
                 'Spacer for flexbox grids'
                ]
              ]
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
        elevation(2)

        .navigation-drawer, .toolbar:not(.elevation-0), .overlay
          position: absolute

        main .container
          min-height: calc(400px - 36px) !important

        .footer
          height: 36px
</style>
