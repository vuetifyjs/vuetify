<template lang="pug">
  doc-view#sponsors-and-backers-view
    v-layout(row)
      v-flex(xs12)
        section-def
          dt(slot="title") Support Vuetify.js development
          dd(slot="desc") Vuetify.js is an open source project under the MIT license. It is and will always be free to use. However, the amount of effort it takes to maintain the core framework and all supplementing packages is quite considerable. With the goal to continue development of additional functionality even after the completion of Material Design spec, you can help by <a href="https://www.patreon.com/vuetify" target="_blank" rel="noreferrer">backing Vuetify on Patreon</a>.

    section#sponsors-and-backers
      h2.headline Patreon backers:
      v-divider
      v-list.transparent
        v-list-tile
          v-list-tile-title
            strong Diamond ($500/mo)
      v-container(fluid grid-list-md).mb-5
        v-layout(row wrap justify-start align-center)
          a(
            :href="`${backer.href}?ref=vuetifyjs.com`"
            target="_blank"
            :title="backer.title"
            v-for="backer in diamond"
            v-bind:key="backer.title"
          ).text-xs-center.mx-3
            img(
              :src="`/doc-images/backers/${backer.src}`"
              :alt="backer.title"
            )

      v-list.transparent
        v-list-tile(tag="div")
          v-list-tile-title
            strong Palladium ($250/mo)
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
              :src="`/doc-images/backers/${backer.src}`"
              :alt="backer.title"
            )

      v-list.transparent
        v-list-tile(tag="div")
          v-list-tile-title
            strong Gold ($50/mo)
      v-container(fluid grid-list-md).mb-5
        v-layout(row wrap justify-start align-center)
          a(
            target="_blank"
            :class="[backer.dark ? 'black' : '']"
            :href="`${backer.href}?ref=vuetifyjs.com`"
            :title="backer.title"
            v-for="backer in gold"
            v-bind:key="backer.title"
          ).text-xs-center.mx-3
            img(
              :src="`/doc-images/backers/${backer.src}`"
              :alt="backer.title"
              style="max-width: 175px;"
            )

      h2.headline Affiliates:
      v-divider.mb-3
      v-container(fluid grid-list-md).mb-5.affiliates
        v-layout(row wrap justify-start align-center)
          a(
            target="_blank"
            :class="[affiliate.dark ? 'black' : '']"
            :href="`${affiliate.href}${affiliate.noref ? '' : '?ref=vuetifyjs.com'}`"
            :title="affiliate.title"
            v-for="affiliate in affiliates"
            v-bind:key="affiliate.title"
          ).text-xs-center.mx-3
            img(
              :src="`/doc-images/affiliates/${affiliate.src}`"
              :alt="affiliate.title"
              style="max-width: 175px;"
            )

      h2.headline Service sponsors:
      v-divider.mb-3
      v-container(fluid).mb-5
        v-layout(row wrap justify-start align-center)
          a(
            :href="`${sponsor.href}?ref=vuetifyjs.com`"
            target="_blank"
            :title="sponsor.title"
            v-for="sponsor in sponsors"
            v-bind:key="sponsor.title"
          ).text-xs-center.mx-3
            img(
              :src="`/doc-images/${sponsor.src}`"
              alt="sponsor.title"
            )

      div.text-xs-center
        div.mb-3 Have additional questions?
        v-btn(outline color="success" round href="mailto:john@vuetifyjs.com") Contact Us
</template>

<script>
  export default {
    data: () => ({
      sponsors: [
        { title: 'BrowserStack', href: 'https://www.browserstack.com/', src: 'browser-stack.png' },
        { title: 'Cloudflare', href: 'https://www.cloudflare.com/', src: 'cloudflare.svg' }
      ],
      palladium: [
        { title: 'Eikos Partners', href: 'http://www.eikospartners.com/', src: 'eikos-partners.webp' },
        { title: 'rateGenius', href: 'https://application.rategenius.com/', src: 'rate-genius.png' },
        { title: 'quitt', href: 'https://quitt.ch/', src: 'quitt.png' }
      ],
      diamond: [
        { title: 'LMAX Exchange', href: 'https://careers.lmax.com/?utm_source=vuetify&utm_medium=logo-link&utm_campaign=lmax-careers', src: 'lmax-exchange.png' },
        { title: 'Intygrate', href: 'http://intygrate.com/', src: 'intygrate.png' }
      ],
      gold: [
        { title: 'Deister Software', href: 'http://www.deister.es/', src: 'deister-logo-light.png' },
        { title: 'Cocoatech', href: 'https://cocoatech.com/', src: 'cocoatechlogo.png' },
        { title: 'Cycloid', href: 'https://www.cycloid.io/', src: 'cycloid.png' },
        { title: 'Live Casino', href: 'https://livecasino.com/', src: 'casino.webp', dark: true },
        { title: 'Nate Controls', href: 'http://www.natecontrols.com/', src: 'n8controls.png' },
        { title: 'Trek10', href: 'https://www.trek10.com/', src: 'trek10.svg' }
      ],
      affiliates: [
        { title: 'VueJobs', href: 'https://vuejobs.com/?utm_source=vuejobs&utm_medium=affiliates&utm_campaign=linking', noref: true, src: 'vuejobs-logo.svg' },
        { title: 'Made with Vue.js', href: 'https://madewithvuejs.com', src: 'madewithvuejs.png' },
        { title: 'Vue.js Radar', href: 'https://vuejsradar.com', src: 'vueradar2.png' }
      ]
    })
  }
</script>

<style lang="stylus">
  #sponsors-and-backers-view
    img
      max-width: 225px
      width: 100%

    .affiliates img
      width: 80%
</style>
