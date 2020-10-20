<template>
  <v-row id="acuity-calendar">
    <v-col cols="12">
      <v-lazy>
        <iframe
          frameBorder="0"
          height="1000"
          src="https://app.acuityscheduling.com/schedule.php?owner=19002891"
          width="100%"
        />
      </v-lazy>
    </v-col>

    <ad-script
      id="acuity"
      script-id="_acuity"
      src="//embed.acuityscheduling.com/js/embed.js"
    />
  </v-row>
</template>

<script>
  export default { name: 'AcuityCalendar' }
</script>
