<template>
  <v-layout row justify-center align-center>
    <v-btn id="target1" color="green" large @click="model = !model">Toggle</v-btn>
    <v-feature-discovery
      v-model="model"
      color="primary"
      target="#target1"
      size="700"
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
        model: false
      }
    }
  }
</script>
