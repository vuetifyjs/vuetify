<template>
  <v-container
    class="px-0"
    fluid
  >
    <v-switch
      v-model="model"
      :label="`Switch: ${model.toString()}`"
    ></v-switch>
  </v-container>
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
