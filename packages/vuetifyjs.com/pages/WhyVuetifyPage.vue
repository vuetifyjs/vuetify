<template lang="pug">
  text-page(:data="$data")
    section-heading(value="GettingStarted.WhyVuetify.header")
    v-layout(row wrap).mb-5
      v-flex(xs12)
        v-container(fluid grid-list-md).pa-0
          v-layout(row wrap).pillars
            v-flex(
            xs12
            sm4
            v-for="(p, i) in philosophies"
              :key="i"
            )
              v-card
                v-layout(align-center justify-center).pa-5
                  v-avatar(size="150px")
                    img(
                    :src="p.img"
                    ).grey.darken-4
                div.px-3
                  v-divider.indigo.lighten-4
                v-card-title(primary).headline.layout.justify-center
                  span(v-text="p.title")
                v-card-text(v-html="p.caption").caption
    v-layout(row wrap).mb-5
      v-flex(xs12)
        v-container(fluid grid-list-md).pa-0
          v-layout(row wrap)
            v-flex(xs12 md7).mb-5

              section
                p(v-for="(p, i) in whyText" :key="i") {{p}}

              section#design-principles
                section-heading(value="GettingStarted.WhyVuetify.designHeader")
                section-text(value="GettingStarted.WhyVuetify.designText")

              section#vibrant-community
                section-heading(value="GettingStarted.WhyVuetify.communityHeader")
                section-text(value="GettingStarted.WhyVuetify.communityText")

              section#framework-comparison
                section-heading(value="GettingStarted.WhyVuetify.comparisonHeader")
                section-text(value="GettingStarted.WhyVuetify.comparisonText")

                v-subheader {{ $t('GettingStarted.WhyVuetify.featuresHeader') }}
                v-layout(row wrap)
                  v-flex(xs12 sm8)
                    v-list(style="max-width: 400px;" dense).transparent.mb-5
                      v-list-tile(
                      tag="div"
                        :ripple="false"
                      v-for="(feature, $index) in featuresList"
                        :key="$index"
                      avatar
                      :class="{ 'grey lighten-3': $index % 2 === 0 }"
                      )
                        v-list-tile-content
                          v-list-tile-title.subheading {{ feature }}
                        v-list-tile-action
                          v-icon(dark).green--text check
                  v-flex(xs12 sm4)
                    v-layout(fill-height column align-center justify-center)
                      img(
                      src="/static/doc-images/logo.svg"
                      alt="Vuetify"
                      width="150px"
                      ).flex.text-xs-center
            v-flex(xs12 md4 ofset-xs0 offset-md1).mb-5
              v-badge(color="error" overlap)
                v-icon(slot="badge" left overlap class="white--text") favorite
                v-card(
                flat
                tile
                ).red--after
                  v-list
                    v-list-tile(avatar tag="div")
                      v-list-tile-avatar
                        v-avatar
                          img(src="/static/doc-images/john.jpg")
                      v-list-tile-content
                        v-list-tile-title John Leider
                        v-list-tile-sub-title {{ $t('GettingStarted.WhyVuetify.authorOfVuetify') }}
                      v-list-tile-action
                        v-tooltip(left)
                          v-btn(
                          icon
                          href="mailto:john@vuetifyjs.com"
                          slot="activator"
                          )
                            v-icon mail
                          span {{ $t('GettingStarted.WhyVuetify.contactMe') }}
                  v-card-text {{ $t('GettingStarted.WhyVuetify.letterFromAuthor') }}
                  v-card-text.text-xs-right <em>&mdash;John Leider</em>

    div.text-xs-center.mb-5
      em {{ $t('GettingStarted.WhyVuetify.questionHeader') }}<br>
      v-btn(flat outline round color="success" href="https://chat.vuetifyjs.com" target="_blank") {{ $t('GettingStarted.WhyVuetify.questionButton') }}
</template>

<script>
  export default {
    data: () => ({
    }),

    computed: {
      philosophies () {
        return this.$t('GettingStarted.WhyVuetify.philosophies')
      },
      whyText () {
        return this.$t('GettingStarted.WhyVuetify.whyText')
      },
      featuresList () {
        return this.$t('GettingStarted.WhyVuetify.featuresList')
      }
    }
  }
</script>

<style lang="stylus">
  .pillars
    .flex
      display: flex
      flex: 1 1 auto
      flex-direction: column

      .card
        flex: 1 1 auto
</style>
