<template lang="pug">
  doc-view#sponsors-and-backers-view
    v-layout(row)
      v-flex(xs12)
        section-def
          dt(slot="title") Support Vuetify.js development
          dd(slot="desc") Vuetify.js is an open source project under the MIT license. It is and will always be free to use. However, the amount of effort it takes to maintain the core framework and all supplementing packages is quite considerable. With the goal to continue development of additional functionality even after the completion of Material Design spec, you can help by <a href="https://www.patreon.com/vuetify" target="_blank" rel="noreferrer">pledging on Patreon</a> (recurring, with perks for different tiers) or <a href="https://paypal.me/vuetify" target="_blank" rel="noreferrer">donating with Paypal</a> (one time).

    section#sponsors-and-backers
      h2.headline Current sponsors:
      v-divider
      v-list.transparent
        v-list-tile(tag="div")
          v-list-tile-avatar
            v-avatar
              v-icon settings_ethernet
          v-list-tile-title Services
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
              :src="`/static/doc-images/${sponsor.src}`"
              alt="sponsor.title"
            )

      h2.headline Current backers:
      v-divider
      v-list.transparent
        v-list-tile
          v-list-tile-avatar
            v-avatar
              v-icon fa-diamond
          v-list-tile-title Diamond ($500/mo)
      v-container(fluid grid-list-md).mb-5
        v-layout(row wrap justify-start align-center)
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
          v-list-tile-title Gold ($50/mo)
      v-container(fluid grid-list-md).mb-5
        v-layout(row wrap justify-start align-center)
          a(
            :href="`${backer.href}?ref=vuetifyjs.com`"
            target="_blank"
            :title="backer.title"
            v-for="backer in backers2"
            v-bind:key="backer.title"
          ).text-xs-center.mx-3
            img(
              :src="`/static/doc-images/backers/${backer.src}`"
              :alt="backer.title"
            )

      div.text-xs-center
        div.mb-3 Have additional questions?
        v-btn(outline success round href="mailto:john@vuetifyjs.com") Contact Us
</template>

<script>
  export default {
    data: () => ({
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
        { title: 'Cycloid', href: 'https://www.cycloid.io/', src: 'cycloid.png' }
      ]
    })
  }
</script>

<style lang="stylus">
  #sponsors-and-backers-view
    img
      max-width: 225px
      width: 100%
</style>
