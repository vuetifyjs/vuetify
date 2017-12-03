<template lang="pug">
  doc-view#roadmap-view
    v-layout(row wrap)
      v-flex(xs12 sm8 xl12)
        section-def
          dt(slot="title") Roadmap
          dd(slot="desc") Vuetify is always under development, working to improve the existing codebase, as well as add new features and functionality that help make building applications even easier. Below is a tentative list of planned features. This is <em>not</em> an exhaustive list and may change at any time without notice.
      ad
    section#roadmap
      v-container(grid-list-xl fluid).px-0
        v-layout(wrap)
          v-flex(
            xs12 md6
            v-for="(type, i) in [releases, cards]"
            :key="i"
          )
            v-layout(wrap)
              v-flex(
                xs12
                d-flex
                v-for="(card, i) in type"
                :key="i"
              )
                v-card(flat tile)
                  v-toolbar(dark prominent flat color="secondary")
                    v-list(dark).pa-0
                      v-list-tile(avatar)
                        v-list-tile-content
                          v-list-tile-title
                            strong.title {{ card.ver }}
                          v-list-tile-sub-title {{ card.rel }}
                    v-spacer
                    span {{ card.sem }}
                    v-icon(dark).ml-3.blue--text.text--lighten-2 {{ card.icon }}
                  v-card-text
                    v-subheader Highlights
                    v-divider
                    v-list(dense)
                      v-list-tile(
                        v-for="(highlight, i) in card.highlights"
                        :key="i"
                        inset
                      )
                        v-list-tile-action
                          v-icon(
                            style="font-size: 10px; margin-left: auto"
                          ).mr-3.secondary--text mdi-circle
                        v-list-tile-title {{ highlight }}
</template>

<script>
  export default {
    data: () => ({
      cards: [
        {
          ver: 'Alpha theme',
          sem: 'THEME',
          rel: 'January, 2018',
          icon: 'mdi-brush',
          highlights: [
            'Hand crafted pre-made Material Design theme',
            'Theme specific components',
            'more info coming soon...'
          ]
        },
        {
          ver: 'Front-end pack',
          sem: 'COMPONENT PACK',
          rel: 'April, 2018',
          icon: 'mdi-package-variant-closed',
          highlights: [
            '10+ new components:',
            'File upload',
            'Timeline',
            'Star rating',
            'Testimonial',
            'Gallery',
            'and more...'
          ]
        },
        {
          ver: 'Back-end pack',
          sem: 'COMPONENT PACK',
          rel: 'June, 2018',
          icon: 'mdi-package-variant-closed',
          highlights: [
            '10+ new components:',
            'Report card',
            'Charts (Chart.js integration)',
            'and more...'
          ]
        }
      ],
      releases: [
        {
          ver: 'v1.0.0',
          sem: 'MAJOR RELEASE',
          rel: 'December, 2017',
          icon: 'cake',
          highlights: [
            'New documentation',
            'Dynamic themes',
            'RTL & i18n support',
            'CSS collision improvements',
            'more to come...'
          ]
        },
        {
          ver: 'v1.1.0',
          sem: 'MINOR RELEASE',
          rel: 'February, 2018',
          icon: 'mdi-alert-circle',
          highlights: [
            'Form components refactor',
            'more to come...'
          ]
        }
      ]
    })
  }
</script>
