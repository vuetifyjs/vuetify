<template>
  <div>
    <v-date-picker
      v-model="date"
      width="290"
      class="mt-3"
    ></v-date-picker>
    <v-date-picker
      v-model="date"
      full-width
      landscape
      class="mt-3"
    ></v-date-picker>
  </div>
</template>

<script>
  export default {
    data: () => ({
      date: new Date().toISOString().substr(0, 10)
    })
  }
</script>
