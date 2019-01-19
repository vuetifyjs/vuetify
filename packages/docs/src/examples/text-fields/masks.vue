<template>
  <v-card>
    <v-card-text>
      <v-text-field v-model="mask" label="Mask"></v-text-field>
    </v-card-text>
    <v-card-text>
      <v-text-field v-model="value" :mask="mask" label="Value"></v-text-field>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      mask: 'credit-card',
      value: '4444444444444444'
    })
  }
</script>
