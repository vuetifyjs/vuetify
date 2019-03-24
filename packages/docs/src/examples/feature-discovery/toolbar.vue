<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn id="target31" text>Link 1</v-btn>
        <v-btn text>Link 2</v-btn>
        <v-btn text>Link 3</v-btn>
      </v-toolbar-items>

      <v-btn id="target32" icon>
        <v-icon>mdi-export-variant</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-delete-circle</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>
    </v-toolbar>

    <v-layout class="my-4" row justify-space-around align-center>
      <v-btn color="green" large @click="model1 = !model1">Toggle 1</v-btn>
      <v-feature-discovery
        v-model="model1"
        color="primary"
        target="#target31"
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
      <v-btn color="green" large @click="model2 = !model2">Toggle 2</v-btn>
      <v-feature-discovery
        v-model="model2"
        color="primary"
        target="#target32"
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
      <v-btn color="green" large @click="model3 = !model3">Toggle on language select</v-btn>
      <v-feature-discovery
        v-model="model3"
        color="primary"
        target="button.v-btn:nth-child(10) > span:nth-child(1)"
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
  </div>
</template>

<script>
  export default {
    data () {
      return {
        model1: false,
        model2: false,
        model3: false
      }
    }
  }
</script>
