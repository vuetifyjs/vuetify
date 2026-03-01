<template>
  <div>
    <v-mask-input
      v-model="model"
      :mask="['(AA)-###', '(##)-AAA']"
      hint="Type letters for (AA)-### or numbers for (##)-AAA"
      label="Letters or Numbers First"
      persistent-hint
    ></v-mask-input>
  </div>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const model = shallowRef(null)
</script>

<script>
  export default {
    data: () => ({
      model: null,
    }),
  }
</script>
