<template>
  <v-container fluid>
    <v-checkbox label="Custom progress bar" v-model="custom"></v-checkbox>
    <v-text-field color="cyan darken" label="Text field" placeholder="Start typing..." v-model="value" loading>
      <v-progress-linear v-if="custom" slot="progress" :value="progress" height="7" :color="color"></v-progress-linear>
    </v-text-field>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    value: '',
    custom: true
  }),
  computed: {
    progress() {
      return Math.min(100, this.value.length * 10)
    },
    color() {
      return ['error', 'warning', 'success'][Math.floor(this.progress / 40)]
    }
  }
}
</script>
