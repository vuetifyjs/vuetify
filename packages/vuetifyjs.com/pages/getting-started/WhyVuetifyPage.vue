<template lang="pug">
  doc-view
    template(slot-scope="{ namespace }")
      section#why-vuetify
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
                        img(:src="p.img").grey.darken-4
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
                  markdown(
                    v-for="(p, i) in whyText"
                    :key="i"
                    :source="p"
                  )

                section#design-principles
                  section-head(:value="`${namespace}.designHeader`")
                  section-text(:value="`${namespace}.designText`")

                section#vibrant-community
                  section-head(:value="`${namespace}.communityHeader`")
                  section-text(:value="`${namespace}.communityText`")

                section#framework-comparison
                  section-head(:value="`${namespace}.comparisonHeader`")
                  section-text(:value="`${namespace}.comparisonText`")

                  v-subheader {{ $t(`${namespace}.featuresHeader`) }}
                  v-layout(row wrap justify-center)
                    v-flex(xs12)
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

              v-flex(xs12 md4 ofset-xs0 offset-md1).mb-5
                v-badge(color="error" overlap)
                  v-icon(slot="badge" small left overlap class="white--text") favorite
                  v-card(flat tile).red--after
                    v-list
                      v-list-tile(avatar tag="div")
                        v-list-tile-avatar
                          v-avatar
                            img(src="/static/doc-images/john.jpg")
                        v-list-tile-content
                          v-list-tile-title John Leider
                          v-list-tile-sub-title {{ $t(`${namespace}.authorOfVuetify`) }}
                        v-list-tile-action
                          v-tooltip(left)
                            v-btn(
                              icon
                              href="mailto:john@vuetifyjs.com"
                              slot="activator"
                            ).grey--text
                              v-icon mail
                            span {{ $t(`${namespace}.contactMe`) }}
                    v-card-text {{ $t(`${namespace}.letterFromAuthor`) }}
                    v-card-text.text-xs-right <em>&mdash;John Leider</em>

      div.text-xs-center.mb-5
        em {{ $t(`${namespace}.questionHeader`) }}<br>
        v-btn(flat outline round color="success" href="https://chat.vuetifyjs.com" target="_blank") {{ $t(`${namespace}.questionButton`) }}
</template>

<script>
  export default {
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
