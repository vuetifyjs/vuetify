<template>
  <usage-example
    v-model="model"
    name="v-progress-circular"
  >
    <v-defaults-provider
      :defaults="{
        VProgressCircular: {
          color: 'primary'
        }
      }"
    >
      <v-progress-circular model-value="20"></v-progress-circular>
      <v-progress-circular model-value="40"></v-progress-circular>
      <v-progress-circular model-value="60"></v-progress-circular>
      <v-progress-circular model-value="80"></v-progress-circular>
      <v-progress-circular model-value="100"></v-progress-circular>
    </v-defaults-provider>
  </usage-example>
</template>
<script>
  export default {
    name: 'ProgressCircularExample',

    data: () => ({
      model: 'default',
    }),
  }
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
