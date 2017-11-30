<template lang="pug">
  doc-view
    section#themes-view
      v-container.pa-0(fluid grid-list-xl)
        v-layout(row wrap)
          v-flex(
            xs12 md6
            v-for="template in templates"
            v-bind:key="template.title"
          )
            v-card(height="100%")
              v-card-media(:src='template.screenshot' height="350px")
              v-card-title.align-center
                h2.headline.mb-0 {{ template.title }}
                  v-chip(label small color="indigo" text-color="white" v-if="template.tag") {{ template.tag }}
                  v-chip(label small color="blue-grey" text-color="white" v-else) {{ $t('Vuetify.PremadeThemes.free') }}
                v-spacer
                v-avatar(v-if="template.buy").green.lighten-2
                  span.white--text.title 25$
              v-divider
              v-card-text {{ template.description }}
              v-card-actions
                v-btn(
                  flat
                  color="success"
                  :href="template.demoUrl"
                  v-if="!template.price"
                  target="_blank"
                  rel="noopener"
                ) {{ $t('Vuetify.PremadeThemes.demo') }}
                v-spacer
                v-btn(
                  flat
                  href="javascript:;"
                  disabled
                  v-if="template.price"
                ) {{ $t('Vuetify.PremadeThemes.comingSoon') }}
                v-btn(
                  flat
                  color="success"
                  :href="`https://github.com/${template.sourceUrl}/tree/master/template`"
                  target="_blank"
                  rel="noopener"
                  v-else
                ) {{ $t('Vuetify.PremadeThemes.sourceCode') }}
                  v-icon(right success) chevron_right

</template>

<script>
  export default {
    data: () => ({
      header: "Vuetify.PremadeThemes.header",
      headerText: "Vuetify.PremadeThemes.headerText"
    }),
    computed: {
      templates() {
        return this.$t('Vuetify.PremadeThemes.templates')
      }
    }
  }
</script>
