<template lang="pug">
  doc-view
    template(slot-scope="{ namespace }")
      a(href="https://www.patreon.com/bePatron?u=6223325" target="_blank").d-inline-block.mb-5
        img(
          src="/static/doc-images/become_a_patron_button.png"
          alt="Become a Patron"
          width="175px"
        )
      section#sponsors-and-backers
        section-head(value="GettingStarted.SponsorsAndBackers.backersHeader")
        v-divider.mb-3
        v-list.transparent
          v-list-tile
            v-list-tile-title
              strong {{ $t('GettingStarted.SponsorsAndBackers.backersSubHeader') }}
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
              @click="$ga.event('backers page click', 'click', backer.title)"
            ).text-xs-center.mx-3
              img(
                :src="`/static/doc-images/${backer.src}`"
                :alt="backer.title"
              )

        v-list.transparent
          v-list-tile(tag="div")
            v-list-tile-title
              strong {{ $t('GettingStarted.SponsorsAndBackers.backersSubHeader2') }}
        v-container(fluid grid-list-md).mb-5
          v-layout(row wrap justify-start align-center)
            a(
              target="_blank"
              :class="[backer.dark ? 'black' : '']"
              :href="`${backer.href}?ref=vuetifyjs.com`"
              :title="backer.title"
              v-for="backer in palladium"
              v-bind:key="backer.title"
              @click="$ga.event('backers page click', 'click', backer.title)"
            ).text-xs-center.mx-3
              img(
                :src="`/static/doc-images/${backer.src}`"
                :alt="backer.title"
              )

        v-list.transparent
          v-list-tile(tag="div")
            v-list-tile-title
              strong {{ $t('GettingStarted.SponsorsAndBackers.backersSubHeader4') }}
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
              @click="$ga.event('backers page click', 'click', backer.title)"
            ).text-xs-center.mx-3
              img(
                :src="`/static/doc-images/${backer.src}`"
                :alt="backer.title"
                style="max-width: 150px;"
              )
        section-head(value="GettingStarted.SponsorsAndBackers.affiliatesHeader")
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
              @click="$ga.event('backers page click', 'click', affiliate.title)"
            ).text-xs-center.mx-3
              img(
                :src="`/static/doc-images/${affiliate.src}`"
                :alt="affiliate.title"
                style="max-width: 150px;"
              )
        section-head(value="GettingStarted.SponsorsAndBackers.sponsorsHeader")
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
              @click="$ga.event('backers page click', 'click', sponsor.title)"
            ).text-xs-center.mx-3
              img(
                :src="`/static/doc-images/${sponsor.src}`"
                alt="sponsor.title"
                style="max-width: 150px;"
              )
        div.text-xs-center
          div.mb-3 {{ $t('GettingStarted.SponsorsAndBackers.questionHeader') }}
          v-btn(
            outline
            color="success"
            round
            href="mailto:john@vuetifyjs.com"
          ) {{ $t('GettingStarted.SponsorsAndBackers.questionButton') }}
</template>

<script>
  import supporters from '@/assets/supporters'

  export default {
    data: () => ({
      diamond: supporters.diamond,
      gold: supporters.gold,
      palladium: supporters.palladium,
      affiliates: supporters.affiliates,
      sponsors: supporters.sponsors
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
