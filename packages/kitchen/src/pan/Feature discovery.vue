<template>
  <v-container>
    <v-layout column>
      <main-header>Feature discovery</main-header>

      <core-title>Basic</core-title>
      <core-section>
        <v-switch v-model="top1" label="Top" />
        <v-switch v-model="left1" label="Left" />
        <v-btn @click="model1 = true">Show</v-btn>

        <v-feature-discovery
          v-model="model1"
          class="white--text"
          color="primary"
          :top="top1"
          :left="left1"
        >
          <h2 slot="title">Hey! New feature...</h2>
          <p slot="text">
            There's all sorts of new things that you can do with the great new features.
            Just click the buttons to check them out!
          </p>
          <div slot="actions">
            <v-btn class="mx-1" color="white" depressed>Action</v-btn>
            <v-btn class="mx-1" outline color="white" @click="model1 = false">Lesser action</v-btn>
          </div>
        </v-feature-discovery>
      </core-section>

      <core-title>Flat</core-title>
      <core-section>
        <v-switch v-model="flat2" label="Flat" />
        <v-btn @click="model2 = true">Show</v-btn>

        <v-feature-discovery
          v-model="model2"
          class="white--text"
          color="primary"
          :flat="flat2"
        >
          <h2 slot="title">Hey! New feature...</h2>
          <p slot="text">
            There's all sorts of new things that you can do with the great new features.
            Just click the buttons to check them out!
          </p>
          <div slot="actions">
            <v-btn class="mx-1" color="white" depressed>Action</v-btn>
            <v-btn class="mx-1" outline color="white" @click="model2 = false">Lesser action</v-btn>
          </div>
        </v-feature-discovery>
      </core-section>

      <core-title>Custom height</core-title>
      <core-section>
        <v-slider
          v-model="height3"
          min="200"
          max="1000"
        />
        <v-btn @click="model3 = true">Show</v-btn>

        <v-feature-discovery
          v-model="model3"
          class="white--text"
          color="primary"
          :height="height3"
        >
          <h2 slot="title">Hey! New feature...</h2>
          <p slot="text">
            There's all sorts of new things that you can do with the great new features.
            Just click the buttons to check them out!
          </p>
          <div slot="actions">
            <v-btn class="mx-1" color="white" depressed>Action</v-btn>
            <v-btn class="mx-1" outline color="white" @click="model3 = false">Lesser action</v-btn>
          </div>
        </v-feature-discovery>
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
        name: 'FeatureDiscovery',

        data: () => ({
            model1: false,
            top1: false,
            left1: false,
            model2: false,
            flat2: true,
            model3: false,
            height3: 500
        })
    }
</script>
