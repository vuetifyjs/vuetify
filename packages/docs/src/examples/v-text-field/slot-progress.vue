<template>
  <v-container fluid>
    <v-checkbox-btn
      v-model="custom"
      label="Loading"
    ></v-checkbox-btn>

    <v-text-field
      v-model="value"
      label="Type characters to change the loader color"
      loading
      placeholder="Start typing..."
    >
      <template v-slot:loader>
        <v-progress-linear
          :active="custom"
          :model-value="progress"
          :color="color"
          absolute
          height="7"
          indeterminate
        ></v-progress-linear>
      </template>
    </v-text-field>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      value: '',
      custom: false,
    }),

    computed: {
      progress () {
        return Math.min(100, this.value.length * 10)
      },
      color () {
        return ['error', 'warning', 'success'][Math.floor(this.progress / 40)]
      },
    },
  }
</script>
