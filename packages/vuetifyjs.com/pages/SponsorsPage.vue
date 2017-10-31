<template lang="pug">
  text-page(:data="$data")
    section#sponsors-and-backers
      section-heading(value="GettingStarted.Sponsors.backersHeader")
      v-divider.mb-3
      v-list.transparent
        v-list-tile
          v-list-tile-avatar
            v-avatar
              v-icon fa-diamond
          v-list-tile-title {{ $t('GettingStarted.Sponsors.backersSubHeader') }}
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
            v-for="backer in backers"
            v-bind:key="backer.title"
          ).text-xs-center.mx-3
            img(
              :src="`/static/doc-images/backers/${backer.src}`"
              :alt="backer.title"
            )
      v-list.transparent
        v-list-tile(tag="div")
          v-list-tile-avatar
            v-avatar
              v-icon star
          v-list-tile-title {{ $t('GettingStarted.Sponsors.backersSubHeader2') }}
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
            v-for="backer in backers2"
            v-bind:key="backer.title"
          ).text-xs-center.mx-3
            img(
              :src="`/static/doc-images/backers/${backer.src}`"
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
              :src="`/static/doc-images/affiliates/${affiliate.src}`"
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
  export default {
    name: 'sponsors-page',
    data: () => ({
      header: "GettingStarted.Sponsors.header",
      headerText: "GettingStarted.Sponsors.headerText",
      sponsors: [
        { title: 'BrowserStack', href: 'https://www.browserstack.com/', src: 'browser-stack.png' },
        { title: 'Cloudflare', href: 'https://www.cloudflare.com/', src: 'cloudflare.svg' }
      ],
      backers: [
        { title: 'LMAX Exchange', href: 'https://careers.lmax.com/?utm_source=vuetify&utm_medium=logo-link&utm_campaign=lmax-careers', src: 'lmax-exchange.png' }
      ],
      backers2: [
        { title: 'Deister Software', href: 'http://www.deister.es/', src: 'deister-logo-light.png' },
        { title: 'Cocoatech', href: 'https://cocoatech.com/', src: 'cocoatechlogo.png' },
        { title: 'Cycloid', href: 'https://www.cycloid.io/', src: 'cycloid.png' },
        { title: 'Live Casino', href: 'https://livecasino.com/', src: 'casino.webp', dark: true },
        { title: 'Nate Controls', href: 'http://www.natecontrols.com/', src: 'n8controls.png' }
      ],
      affiliates: [
        { title: 'VueJobs', href: 'https://vuejobs.com/?utm_source=vuejobs&utm_medium=affiliates&utm_campaign=linking', noref: true, src: 'vuejobs-logo.svg' },
        { title: 'Vue.js Developers', href: 'https://vuejsdevelopers.com', src: 'vuejsdevelopers.png' },
        { title: 'Made with Vue.js', href: 'https://madewithvuejs.com', src: 'madewithvuejs.png' },
        { title: 'Vue.js Radar', href: 'https://vuejsradar.com', src: 'vueradar.png' }
      ]
    })
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
