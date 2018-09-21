<template lang="pug">
  views-doc
    section#consulting
      v-layout(
        justify-between
        wrap
      )
        v-flex(xs12 md8)
          p.subheading.font-weight-medium John, is available for the following consulting services:
          v-list.transparent
            v-list-tile(
              v-for="(tile, i) in tiles"
              :key="i"
            )
              v-list-tile-action
                v-icon mdi-record

              v-list-tile-title(v-text="tile")
        v-flex(xs12 md4).text-xs-right
          div.text-xs-center.d-inline-block
            v-avatar(size="156").mx-3.mb-2.mt-3.elevation-8
              v-img(src="https://cdn.vuetifyjs.com/images/john.png")
            div.body-2 John Leider
            div.caption Creator
        v-flex(xs12 mt-4)
          v-card(color="transparent").elevation-0
            v-card-title.pb-3.primary
              h3.title.white--text
                v-icon(color="white").mr-2 mdi-calendar
                span Schedule an Appointment
            div(
              class="calendly-inline-widget"
              data-url="https://calendly.com/vuetify"
              style="min-width:320px;height:580px;"
            )
</template>

<script>
  export default {
    data: () => ({
      tiles: [
        'Application Hardening and Unit Tests',
        'Custom component creation and integration',
        'Application performance and structure review',
        'Live Company training',
        'General Vue/Vuetify application support'
      ]
    }),

    mounted () {
      this.attachScript()
    },

    methods: {
      attachScript () {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = '//assets.calendly.com/assets/external/widget.js'

        this.$el.append(script)
      }
    }
  }
</script>

<style lang="stylus">
  #consulting
    .v-list__tile
      height: 32px !important
</style>
