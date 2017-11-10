<template lang="pug">
  text-page(:data="$data")
    section#sponsors-and-backers
      section-heading(value="GettingStarted.Sponsors.backersHeader")
      v-divider.mb-3
      v-list.transparent
        v-list-tile
          v-list-tile-title 
            strong {{ $t('GettingStarted.Sponsors.backersSubHeader') }}
      v-container(fluid grid-list-md).mb-5
        v-layout(
          row
          wrap
          justify-start
          align-center
        )
          a(
            :href="`${backer.href}?ref=vuetifyjs.com`"
            target="_blank"
            :title="backer.title"
            v-for="backer in diamond"
            v-bind:key="backer.title"
          ).text-xs-center.mx-3
            img(
              :src="`/static/doc-images/${backer.src}`"
              :alt="backer.title"
            )

      v-list.transparent
        v-list-tile(tag="div")
          v-list-tile-title
            strong {{ $t('GettingStarted.Sponsors.backersSubHeader2') }}
      v-container(fluid grid-list-md).mb-5
        v-layout(row wrap justify-start align-center)
          a(
            target="_blank"
            :class="[backer.dark ? 'black' : '']"
            :href="`${backer.href}?ref=vuetifyjs.com`"
            :title="backer.title"
            v-for="backer in palladium"
            v-bind:key="backer.title"
          ).text-xs-center.mx-3
            img(
              :src="`/static/doc-images/${backer.src}`"
              :alt="backer.title"
            )

      v-list.transparent
        v-list-tile(tag="div")
          v-list-tile-title
            strong {{ $t('GettingStarted.Sponsors.backersSubHeader4') }}
      v-container(fluid grid-list-md).mb-5
        v-layout(
          row
          wrap
          justify-start
          align-center
        )
          a(
          target="_blank"
            :class="[backer.dark ? 'black' : '']"
            :href="`${backer.href}?ref=vuetifyjs.com`"
            :title="backer.title"
            v-for="backer in gold"
            v-bind:key="backer.title"
          ).text-xs-center.mx-3
            img(
              :src="`/static/doc-images/${backer.src}`"
              :alt="backer.title"
            )
      section-heading(value="GettingStarted.Sponsors.affiliatesHeader")
      v-divider.mb-3
      v-container(fluid grid-list-md).mb-5.affiliates
        v-layout(
          row
          wrap
          justify-start
          align-center
        )
          a(
            target="_blank"
            :class="[affiliate.dark ? 'black' : '']"
            :href="`${affiliate.href}${affiliate.noref ? '' : '?ref=vuetifyjs.com'}`"
            :title="affiliate.title"
            v-for="affiliate in affiliates"
            v-bind:key="affiliate.title"
          ).text-xs-center.mx-3
            img(
              :src="`/static/doc-images/${affiliate.src}`"
              :alt="affiliate.title"
              width="150px"
            )
      section-heading(value="GettingStarted.Sponsors.sponsorsHeader")
      v-divider.mb-3
      v-container(fluid).mb-5
        v-layout(
          row
          wrap
          justify-start
          align-center
        )
          a(
            :href="`${sponsor.href}?ref=vuetifyjs.com`"
            target="_blank"
            :title="sponsor.title"
            v-for="sponsor in sponsors"
            v-bind:key="sponsor.title"
          ).text-xs-center.mx-3
            img(
              :src="`/static/doc-images/${sponsor.src}`"
              alt="sponsor.title"
            )
      div.text-xs-center
        div.mb-3 {{ $t('GettingStarted.Sponsors.questionHeader') }}
        v-btn(
          outline
          color="success"
          round
          href="mailto:john@vuetifyjs.com"
        ) {{ $t('GettingStarted.Sponsors.questionButton') }}
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'sponsors-page',

    data: () => ({
      header: "GettingStarted.Sponsors.header",
      headerText: "GettingStarted.Sponsors.headerText"
    }),

    computed: {
      ...mapState({
        diamond: state => state.supporters.diamond,
        gold: state => state.supporters.gold,
        palladium: state => state.supporters.palladium,
        affiliates: state => state.supporters.affiliates,
        sponsors: state => state.supporters.sponsors
      })
    }
  }
</script>

<style lang="stylus">
  #sponsors-and-backers
    img
      max-width: 225px
      width: 100%
    .affiliates img
      width: 80%
</style>
