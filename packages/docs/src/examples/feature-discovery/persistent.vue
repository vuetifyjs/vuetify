<template>
  <v-layout row justify-space-between align-center>
    <div>
      <v-switch v-model="persistent" label="Persistent"></v-switch>
      <v-switch v-model="model" label="Model"></v-switch>
    </div>
    <v-btn id="target4" color="green" large @click="model = !model">Toggle</v-btn>
    <v-feature-discovery
      v-model="model"
      :persistent="persistent"
      color="primary"
      target="#target4"
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
        persistent: false
      }
    }
  }
</script>
