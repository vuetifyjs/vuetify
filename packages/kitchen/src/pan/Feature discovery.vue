<template>
  <v-container>
    <v-layout column>
      <main-header>Feature discovery</main-header>

      <core-title>Basic</core-title>
      <core-section>
        <v-select v-model="t1" :items="targets1" />
        <v-btn @click="model1 = true">Show</v-btn>

        <v-layout justify-space-around align-center>
          <v-sheet id="t1v1" class="ma-5" color="green" width="40" height="40" />
          <v-sheet id="t1v2" class="ma-5" color="blue" width="80" height="80" />
          <v-sheet id="t1v3" class="ma-5" color="red" width="120" height="120" />
        </v-layout>

        <v-feature-discovery
          v-model="model1"
          class="white--text"
          color="primary"
          :target="t1"
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
        <v-layout justify-space-around>
          <v-switch v-model="flat2" label="Flat" />
          <v-btn @click="model2 = true">Show</v-btn>
        </v-layout>

        <v-layout justify-center>
          <v-sheet id="t2" class="ma-5" color="warning" width="40" height="40" />
        </v-layout>

        <v-feature-discovery
          v-model="model2"
          class="white--text"
          color="primary"
          target="#t2"
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

      <core-title>Custom size</core-title>
      <core-section>
        <v-slider
          v-model="size3"
          min="200"
          max="1000"
        />
        <v-btn @click="model3 = true">Show</v-btn>

        <v-layout justify-center>
          <v-sheet id="t3" class="ma-5" color="warning" width="40" height="40" />
        </v-layout>

        <v-feature-discovery
          v-model="model3"
          class="white--text"
          color="primary"
          :size="size3"
          target="#t3"
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

      <core-title>Colors</core-title>
      <core-section>
        <v-layout justify-space-around align-center>
          <v-btn @click="model41 = true">Show 1</v-btn>
          <v-btn @click="model42 = true">Show 2</v-btn>
          <v-btn @click="model43 = true">Show 3</v-btn>
        </v-layout>

        <v-layout justify-space-around align-center>
          <v-sheet id="t4v1" class="ma-5" color="green" width="40" height="40" />
          <v-sheet id="t4v2" class="ma-5" color="blue" width="80" height="80" />
          <v-sheet id="t4v3" class="ma-5" color="red" width="120" height="50" />
        </v-layout>

        <v-feature-discovery
          v-model="model41"
          class="white--text"
          color="teal"
          target="#t4v1"
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

        <v-feature-discovery
          v-model="model42"
          class="white--text"
          color="green"
          target="#t4v2"
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

        <v-feature-discovery
          v-model="model43"
          class="white--text"
          color="warning lighten-2"
          target="#t4v3"
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
    </v-layout>
  </v-container>
</template>

<script>
    export default {
        name: 'FeatureDiscovery',

        data: () => ({
            model1: false,
            t1: '#t1v2',
            targets1: ['#t1v1', '#t1v2', '#t1v3'],
            model2: false,
            flat2: true,
            model3: false,
            size3: 500,
            model41: false,
            model42: false,
            model43: false
        })
    }
</script>
