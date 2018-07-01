<template lang="pug">
  views-doc
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
                  translation-translatable(:i18n="`${template.namespace}.tag`" v-if="template.tag")
                    v-chip(label small color="indigo" text-color="white" ) {{ template.tag.toUpperCase() }}
                  translation-translatable(i18n="Layout.PreMadeThemes.free" v-else)
                    v-chip(label small color="blue-grey" text-color="white") {{ $t('Layout.PreMadeThemes.free').toUpperCase() }}
                v-spacer
              v-divider
              translation-translatable(:i18n="`${template.namespace}.description`")
                v-card-text(style="min-height: 95px") {{ template.description }}
              v-card-actions
                translation-translatable(i18n="Layout.PreMadeThemes.demo" v-if="!template.price")
                  v-btn(
                    flat
                    color="success"
                    :href="template.demoUrl"
                    target="_blank"
                    rel="noopener"
                  ) {{ $t('Layout.PreMadeThemes.demo') }}
                v-spacer
                translation-translatable(i18n="Layout.PreMadeThemes.buy" v-if="template.price")
                  v-btn(
                    color="primary"
                    flat
                    :to="{ name: 'store/Product', params: { id: '813199294506' }}"
                  ) {{ $t('Layout.PreMadeThemes.buy') }}
                    v-icon(right) mdi-arrow-right
                translation-translatable(i18n="Layout.PreMadeThemes.sourceCode" v-else)
                  v-btn(
                    flat
                    color="success"
                    :href="`https://github.com/${template.sourceUrl}/tree/master/template`"
                    target="_blank"
                    rel="noopener"
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
        const length = this.$t('Layout.PreMadeThemes.templates', 'en').length
        return [...Array(length).keys()].map(i => ({
          namespace: `Layout.PreMadeThemes.templates[${i}]`,
          screenshot: this.$t(`Layout.PreMadeThemes.templates[${i}].screenshot`),
          title: this.$t(`Layout.PreMadeThemes.templates[${i}].title`),
          tag: this.$te(`Layout.PreMadeThemes.templates[${i}].tag`, 'en') ? this.$t(`Layout.PreMadeThemes.templates[${i}].tag`) : null,
          description: this.$t(`Layout.PreMadeThemes.templates[${i}].description`),
          price: this.$te(`Layout.PreMadeThemes.templates[${i}].price`, 'en') ? this.$t(`Layout.PreMadeThemes.templates[${i}].price`) : null,
          sourceUrl: this.$t(`Layout.PreMadeThemes.templates[${i}].sourceUrl`),
          demoUrl: this.$t(`Layout.PreMadeThemes.templates[${i}].demoUrl`)
        }))
      }
    }
  }
</script>
