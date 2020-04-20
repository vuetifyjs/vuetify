<template>
  <v-row
    id="consulting"
    justify="space-between"
  >
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
