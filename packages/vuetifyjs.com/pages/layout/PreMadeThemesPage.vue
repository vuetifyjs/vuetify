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
                  v-chip(label small color="indigo" text-color="white" v-if="template.tag") {{ template.tag.toUpperCase() }}
                  v-chip(label small color="blue-grey" text-color="white" v-else) {{ $t('Layout.PreMadeThemes.free').toUpperCase() }}
                v-spacer
              v-divider
              v-card-text(style="min-height: 95px") {{ template.description }}
              v-card-actions
                v-btn(
                  flat
                  color="success"
                  :href="template.demoUrl"
                  v-if="!template.price"
                  target="_blank"
                  rel="noopener"
                ) {{ $t('Layout.PreMadeThemes.demo') }}
                v-spacer
                v-btn(
                  color="primary"
                  flat
                  :to="{ name: 'store/Product', params: { id: 813199294506 }}"
                  v-if="template.price"
                ) {{ $t('Layout.PreMadeThemes.buy') }}
                  v-icon(right) mdi-arrow-right
                v-btn(
                  flat
                  color="success"
                  :href="`https://github.com/${template.sourceUrl}/tree/master/template`"
                  target="_blank"
                  rel="noopener"
                  v-else
                ) {{ $t('Layout.PreMadeThemes.sourceCode') }}
                  v-icon(right success) mdi-arrow-right

</template>

<script>
  export default {
    data: () => ({
      header: 'Vuetify.PreMadeThemes.header',
      headerText: 'Vuetify.PreMadeThemes.headerText'
    }),
    computed: {
      templates () {
        return this.$t('Layout.PreMadeThemes.templates')
      }
    }
  }
</script>
