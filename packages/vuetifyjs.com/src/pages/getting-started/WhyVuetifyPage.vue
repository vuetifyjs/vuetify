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
                  md6
                  xl3
                  v-for="(p, i) in philosophies"
                  :key="i"
                )
                  v-card
                    v-layout(align-center justify-center).pt-5.pb-2
                      v-avatar(
                        :color="p.color"
                        size="150px"
                      ).elevation-12
                        v-icon(
                          v-text="p.icon"
                          dark
                          size="100px"
                        )
                    div.px-3
                    translatable(:i18n="`${namespace}.philosophies[${i}].title`")
                    v-card-title.headline.layout.justify-center
                      span(v-text="$t(`${namespace}.philosophies[${i}].title`)")
                    translatable(:i18n="`${namespace}.philosophies[${i}].caption`")
                    v-card-text.caption.text-xs-justify
                      markdown(:source="$t(`${namespace}.philosophies[${i}].caption`)")

      v-layout(row wrap).mb-5
        v-flex(xs12)
          v-container(fluid grid-list-md).pa-0
            v-layout(row wrap)
              v-flex(xs12 md7).mb-5
                section.text-xs-justify
                  div(v-for="(p, i) in whyText" :key="i")
                    translatable(:i18n="`${namespace}.whyText[${i}]`")
                      markdown(:source="$t(`${namespace}.whyText[${i}]`)")

                section#design-principles
                  section-head(:value="`${namespace}.designHeader`")
                  section-text(:value="`${namespace}.designText`")

                section#vibrant-community
                  section-head(:value="`${namespace}.communityHeader`")
                  section-text(:value="`${namespace}.communityText`")

                section#framework-comparison
                  section-head(:value="`${namespace}.comparisonHeader`")
                  section-text(:value="`${namespace}.comparisonText`")

                  translatable(:i18n="`${namespace}.featuresHeader`")
                    v-subheader {{ $t(`${namespace}.featuresHeader`) }}
                  v-layout(row wrap justify-center)
                    v-flex(xs12)
                      v-list(style="max-width: 400px;" dense).transparent.mb-5
                        v-list-tile(
                          tag="div"
                          :ripple="false"
                          v-for="(feature, i) in featuresList"
                          :key="i"
                          avatar
                          :class="{ 'grey lighten-3': i % 2 === 0 }"
                        )
                          translatable(:i18n="`${namespace}.featuresList[${i}]`")
                          v-list-tile-content
                            v-list-tile-title.subheading
                              span {{ $t(`${namespace}.featuresList[${i}]`) }}
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
                            img(src="/doc-images/john.jpg")
                        translatable(:i18n="`${namespace}.authorOfVuetify`")
                        v-list-tile-content
                          v-list-tile-title John Leider
                          v-list-tile-sub-title {{ $t(`${namespace}.authorOfVuetify`) }}
                        v-list-tile-action
                          v-tooltip(lazy left)
                            v-btn(
                              icon
                              href="mailto:john@vuetifyjs.com"
                              slot="activator"
                            ).grey--text
                              v-icon mail
                            span {{ $t(`${namespace}.contactMe`) }}
                    translatable(:i18n="`${namespace}.letterFromAuthor`")
                    v-card-text {{ $t(`${namespace}.letterFromAuthor`) }}
                    v-card-text.text-xs-right <em>&mdash;John Leider</em>

      div.text-xs-center.mb-5
        em {{ $t(`${namespace}.questionHeader`) }}<br>
        v-btn(flat outline round color="success" href="https://chat.vuetifyjs.com" target="_blank") {{ $t(`${namespace}.questionButton`) }}
</template>

<script>
  export default {
    data: () => ({
      icons: [
        {
          icon: 'mdi-account-multiple',
          color: 'indigo'
        },
        {
          icon: 'mdi-toolbox',
          color: 'purple'
        },
        {
          icon: 'mdi-update',
          color: 'red lighten-2'
        },
        {
          icon: 'mdi-flash',
          color: 'yellow darken-3'
        }
      ]
    }),

    computed: {
      philosophies () {
        return this.$t('GettingStarted.WhyVuetify.philosophies', 'en').map((o, i) => {
          return Object.assign({}, o, this.icons[i])
        })
      },
      whyText () {
        return this.$t('GettingStarted.WhyVuetify.whyText', 'en')
      },
      featuresList () {
        return this.$t('GettingStarted.WhyVuetify.featuresList', 'en')
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

      .v-card
        flex: 1 1 auto
</style>
