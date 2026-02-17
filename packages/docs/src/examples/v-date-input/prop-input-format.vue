<template>
  <div class="d-flex justify-center">
    <v-date-input
      v-model="model"
      input-format="yyyy-mm-dd"
      max-width="368"
      prefix="ISO Date:"
    ></v-date-input>
  </div>
</template>

<script setup>
  import { shallowRef } from 'vue'
  import { useDate } from 'vuetify'

  const adapter = useDate()
  const model = shallowRef(adapter.parseISO('2025-02-25'))
</script>
