<template lang="pug">
  views-doc
    core-alert(error :value="`Layout.PreDefined.alert1`" slot="sup")

    template(slot-scope="{ namespace }")
      section#default-markup
        helpers-section-head(:value="`${namespace}.markupHeader`")
        helpers-section-text(:value="`${namespace}.markupText`")

        helpers-markup(lang='html')
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

        core-alert(info :value="`${namespace}.alert2`" slot="sup")

      section#all-about-app
        helpers-section-head(:value="`${namespace}.appHeader`")
        helpers-section-text(:value="`${namespace}.appText`")

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
                v-card-media(height="250px" :src="genSrc(layout.name)")
                  v-layout(align-center)
                    v-flex.text-xs-center
                      div(:class="[layout.dark ? 'white--text' : '']").title {{ layout.name }}
</template>

<script>
  export default {
    data: () => ({
      layouts: [
        { name: 'Baseline', href: '/examples/layouts/baseline' },
        { name: 'Baseline Flipped', href: '/examples/layouts/baselineFlipped' },
        { name: 'Centered', href: '/examples/layouts/centered' },
        { name: 'Complex', href: '/examples/layouts/complex' },
        { name: 'Dark', href: '/examples/layouts/dark', dark: true },
        { name: 'Google Contacts', href: '/examples/layouts/googleContacts' },
        { name: 'Google Keep', href: '/examples/layouts/googleKeep' },
        { name: 'Google Youtube', href: '/examples/layouts/googleYoutube', dark: true }
      ]
    }),

    methods: {
      genSrc (name) {
        return `/doc-images/layouts/${name.toLowerCase().replace(' ', '-')}.png`
      }
    }
  }
</script>
