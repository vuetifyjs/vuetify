<template>
  <v-card>
    <v-card-text>
      <v-text-field label="Mask" v-model="mask"></v-text-field>
    </v-card-text>
    <v-card-text>
      <v-text-field label="Value" :mask="mask" v-model="value"></v-text-field>
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