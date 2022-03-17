<template>
  <usage-example
    v-model="model"
    name="v-progress-linear"
  >
    <v-defaults-provider
      :defaults="{
        VProgressLinear: {

        }
      }"
    >
      <v-progress-linear model-value="15"></v-progress-linear>
    </v-defaults-provider>
  </usage-example>
</template>
<script>
  export default {
    name: 'ProgressUsageExample',

    data: () => ({
      model: 'default',
      line: 15,
    }),
  }
</script>
