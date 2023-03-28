<template>
  <v-switch
    v-model="model"
    hide-details
    inset
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
