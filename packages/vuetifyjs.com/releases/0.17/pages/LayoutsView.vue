<template lang="pug">
  component-view(v-bind:doc="doc")
    div(slot='top')
      section
        h2.display-1 Default application markup
        section-text This is an example of the default application markup for Vuetify. You can place your layout elements anywhere, as long as you designate them with the <strong>app</strong> property. The key component in all of this is the <code>v-content</code> element. This will be dynamically sized depending upon the structure of your designated <strong>app</strong> components. This allows you to create extremely customized solutions.
        markup(lang='html' xs12 sm6)
          |&lt;v-app&gt;
          |   &lt;v-navigation-drawer app&gt;&lt;/v-navigation-drawer&gt;
          |   &lt;v-toolbar app&gt;&lt;/v-toolbar&gt;
          |   &lt;v-content&gt;
          |     &lt;v-container fluid&gt;
          |       &lt;router-view&gt;&lt;/router-view&gt;
          |     &lt;/v-container&gt;
          |   &lt;/v-content&gt;
          |   &lt;v-footer app&gt;&lt;/v-footer&gt;
          |&lt;/v-app&gt;
        markup(lang='html' xs12 sm6)
          |&lt;v-app&gt;
          |   &lt;v-navigation-drawer app&gt;&lt;/v-navigation-drawer&gt;
          |   &lt;v-toolbar app&gt;&lt;/v-toolbar&gt;
          |   &lt;v-content&gt;
          |     &lt;router-view&gt;
          |       &lt;v-container fluid&gt;&lt;/v-container&gt;
          |     &lt;/router-view&gt;
          |   &lt;/v-content&gt;
          |   &lt;v-footer app&gt;&lt;/v-footer&gt;
          |&lt;/v-app&gt;
        v-alert(color="error" icon="warning" value="true") In order for your application to work properly, you <strong>must</strong> wrap it in a <code>v-app</code> component. This component is required for determining grid breakpoints for the layout. This can exist <strong>anywhere</strong> inside the body, but must be the parent of <strong>ALL</strong> Vuetify components.
    section#layouts
      v-container(fluid grid-list-xl).pa-0
        v-layout(row wrap)
          v-flex(
            xs12 sm4
            v-for="layout in layouts"
            :key="layout.name"
          )
            v-card(
              hover
              :href="layout.href"
              target="_blank"
              rel="noopener"
            )
              v-card-media(height="300px" :src="genSrc(layout.name)")
                v-layout(align-center)
                  v-flex.text-xs-center
                    div(:class="[layout.dark ? 'white--text' : '']").title {{ layout.name }}
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
          examples: [],
          props: {
            'v-app': {
              shared: ['theme'],
              params: [
                [
                  'id',
                  'String',
                  'app',
                  'The id for your application'
                ]
              ]
            },
            'v-content': {}
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
        },
        layouts: [
          { name: 'Baseline', href: '/examples/layouts/baseline' },
          { name: 'Baseline Flipped', href: '/examples/layouts/baseline-flipped' },
          { name: 'Complex', href: '/examples/layouts/complex' },
          { name: 'Dark', href: '/examples/layouts/dark', dark: true },
          { name: 'Google Contacts', href: '/examples/layouts/google-contacts' },
          { name: 'Google Keep', href: '/examples/layouts/google-keep'},
          { name: 'Google Youtube', href: '/examples/layouts/google-youtube', dark: true }
        ]
      }
    },

    methods: {
      genSrc (name) {
        return `'/static/doc-images/layouts/${name.toLowerCase().replace(' ', '-')}.png'`
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
