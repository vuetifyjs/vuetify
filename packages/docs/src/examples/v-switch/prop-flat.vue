<template>
  <v-switch
    v-model="model"
    hide-details
    flat
    :label="`Switch: ${model.toString()}`"
  ></v-switch>
</template>

<script>
  export default {
    data () {
      return {
        model: true,
      }
    },
  }
</script>
