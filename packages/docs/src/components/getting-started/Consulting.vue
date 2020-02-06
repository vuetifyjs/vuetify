<template>
  <v-row
    id="consulting"
    justify="space-between"
  >
    <v-col
      cols="12"
      md="8"
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
    </v-col>

    <v-col
      cols="12"
      md="4"
    >
      <div class="text-center d-inline-block">
        <v-avatar
          size="156"
          class="mx-4 mb-2 mt-4 elevation-8"
        >
          <v-img src="https://cdn.vuetifyjs.com/images/john.png" />
        </v-avatar>
        <div class="body-1">John Leider</div>

        <div class="caption grey--text">Creator</div>
      </div>
    </v-col>

    <v-col cols="12">
      <v-lazy>
        <iframe
          src="https://app.acuityscheduling.com/schedule.php?owner=19002891"
          width="100%"
          height="1000"
          frameBorder="0"
        />
      </v-lazy>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      tiles: [
        'Paired Programming Sessions',
        'Application Hardening and Unit Tests',
        'Custom component creation and integration',
        'Application performance and structure review',
        'Live Company / Individual training',
        'Best practices and procedures',
        'General Vue/Vuetify application support',
      ],
    }),

    mounted () {
      this.attachScript()
    },

    methods: {
      attachScript () {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = '//embed.acuityscheduling.com/js/embed.js'

        this.$el.append(script)
      },
    },
  }
</script>

<style lang="sass">
#consulting
  .v-list-item
    height: 32px !important

.booking-container.booking-wrapper
  width: 100% !important
</style>
