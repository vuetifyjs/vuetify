<template>
  <v-layout
    justify-between
    wrap
  >
    <v-flex
      xs12
      md8
    >
      <p class="subheading font-weight-medium">
        John, is available for the following consulting services:
      </p>
      <v-list class="transparent">
        <v-list-item
          v-for="(tile, i) in tiles"
          :key="i"
        >
          <v-list-item-action>
            <v-icon>mdi-record</v-icon>
          </v-list-item-action>
          <v-list-item-title v-text="tile" />
        </v-list-item>
      </v-list>
    </v-flex>
    <v-flex
      xs12
      md4
    >
      <div class="text-xs-center d-inline-block">
        <v-avatar size="156" class="mx-3 mb-2 mt-3 elevation-8">
          <v-img src="https://cdn.vuetifyjs.com/images/john.png" />
        </v-avatar>
        <div class="body-2">John Leider</div>
        <div class="caption">Creator</div>
      </div>
    </v-flex>
    <v-flex
      xs12
      mt-4
    >
      <v-card
        color="transparent"
        class="elevation-0"
      >
        <v-card-title class="pb-3 primary">
          <h3 class="title white--text">
            <v-icon color="white" class="mr-2">mdi-calendar</v-icon>
            <span>Schedule an Appointment</span>
          </h3>
        </v-card-title>
        <div
          class="calendly-inline-widget"
          data-url="https://calendly.com/vuetify"
          style="min-width:320px;height:580px;"
        />
      </v-card>
    </v-flex>
  </v-layout>
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

<style lang="sass">
#consulting
  .v-list-item
    height: 32px !important
</style>
