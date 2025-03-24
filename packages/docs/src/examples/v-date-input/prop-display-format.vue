<template>
  <div class="d-flex justify-center">
    <v-date-input
      v-model="model"
      :display-format="format"
      max-width="368"
      prefix="ISO Date:"
    ></v-date-input>
  </div>
</template>

<script setup>
  import { computed, shallowRef } from 'vue'
  import { useDate } from 'vuetify'

  const adapter = useDate()
  const model = shallowRef(adapter.parseISO('2025-02-25'))

  function format (date) {
    return adapter.toISO(date)
  }
</script>
