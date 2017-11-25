<template lang="pug">
  text-page(:data="$data" id="starter-templates-page")
    section#default-markup
      section-heading(value="GettingStarted.StarterTemplates.defaultHeader")
      section-text(value="GettingStarted.StarterTemplates.defaultText")

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

      app-alert(error value="GettingStarted.StarterTemplates.alert1")

    section#layouts
      section-heading(value="GettingStarted.StarterTemplates.layoutsHeader")
      section-text(value="GettingStarted.StarterTemplates.layoutsText")

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
        header: 'GettingStarted.StarterTemplates.header',
        headerText: 'GettingStarted.StarterTemplates.headerText',
        toc: 'GettingStarted.StarterTemplates.toc',
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
  #starter-templates-page
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
