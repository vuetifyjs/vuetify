<template>
  <v-layout row justify-space-between align-center>
    <v-switch v-model="noRipple" label="No ripple"></v-switch>
    <v-btn id="target6" color="green" large @click="model = !model">Toggle</v-btn>
    <v-feature-discovery
      v-model="model"
      :no-ripple="noRipple"
      color="primary"
      target="#target6"
    >
      <template #title>
        <h2>Hey! New feature...</h2>
      </template>
      <p>
        There's all sorts of new things that you can do with the great new features.
        Just click the buttons to check them out!
      </p>
      <template #actions="{ close }">
        <v-btn class="mx-1" color="white" depressed>Action</v-btn>
        <v-btn class="mx-1" outline color="white" @click="close">Lesser action</v-btn>
      </template>
    </v-feature-discovery>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        model: false,
        noRipple: false,
      }
    },
  }
</script>
