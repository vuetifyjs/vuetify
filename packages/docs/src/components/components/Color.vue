<template>
  <v-card class="mb-5">
    <pre>{{ color }}</pre>
  </v-card>
</template>

<script>
  import api from '@vuetify/api-generator'

  export default {
    data: () => ({
      color: api['v-color-picker'].events.find(e => e.name === 'input').value
    })
  }
</script>
