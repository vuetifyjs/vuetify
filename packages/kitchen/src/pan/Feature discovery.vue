<template>
  <v-container>
    <v-layout column>
      <v-btn
        fab
        large
        color="success"
        fixed
        bottom
        right
      >
        <v-icon id="fab1">mdi-plus</v-icon>
      </v-btn>
      <v-btn
        fab
        large
        color="success"
        fixed
        bottom
      >
        <v-icon id="fab2">mdi-plus</v-icon>
      </v-btn>

      <main-header>Feature discovery</main-header>

      <core-title>Basic</core-title>
      <core-section>
        <v-select v-model="t1" :items="targets1" />
        <v-btn @click="model1 = true">Show</v-btn>
        <v-slider
          v-model="size1"
          min="200"
          max="1000"
          label="Size"
        />

        <v-layout justify-space-around align-center>
          <v-feature-discovery
            v-model="model1"
            color="primary"
            :target="t1"
            :size="size1"
            v-on="on"
          >
            <template v-slot:activator="{ on }">
              <v-sheet id="t1v1" class="ma-5" color="green" width="40" height="40" />
            </template>
            <h2 slot="title">Hey! New feature...</h2>
            <p>
              There's all sorts of new things that you can do with the great new features.
              Just click the buttons to check them out!
            </p>
            <div slot="actions">
              <v-btn class="mx-1" color="white" depressed>Action</v-btn>
              <v-btn class="mx-1" outlined color="white" @click="model1 = false">Lesser action</v-btn>
            </div>
          </v-feature-discovery>
          <v-sheet id="t1v2" class="ma-5" color="blue" width="80" height="80" />
          <v-sheet id="t1v3" class="ma-5" color="red" width="120" height="120" />
        </v-layout>
      </core-section>

      <core-title>Flat</core-title>
      <core-section>
        <v-layout justify-space-around>
          <v-switch v-model="flat2" label="Flat" />
          <v-btn @click="model2 = true">Show</v-btn>
        </v-layout>

        <v-layout justify-center>
          <v-feature-discovery
            v-model="model2"
            color="primary"
            target="#t2"
            :flat="flat2"
            v-on="on"
          >
            <template v-slot:activator="{ on }">
              <v-sheet id="t2" class="ma-5" color="warning" width="40" height="40" />
            </template>
            <h2 slot="title">Hey! New feature...</h2>
            <p>
              There's all sorts of new things that you can do with the great new features.
              Just click the buttons to check them out!
            </p>
            <div slot="actions">
              <v-btn class="mx-1" color="white" depressed>Action</v-btn>
              <v-btn class="mx-1" outlined color="white" @click="model2 = false">Lesser action</v-btn>
            </div>
          </v-feature-discovery>
        </v-layout>
      </core-section>

      <core-title>Custom size</core-title>
      <core-section>
        <v-slider
          v-model="size3"
          min="200"
          max="1000"
          label="Size"
        />
        <v-btn @click="model3 = true">Show</v-btn>

        <v-layout justify-center>
          <v-feature-discovery
            v-model="model3"
            color="primary"
            :size="size3"
            target="#t3"
            v-on="on"
          >
            <template v-slot:activator="{ on }">
              <v-sheet id="t3" class="ma-5" color="warning" width="40" height="40" />
            </template>
            <h2 slot="title">Hey! New feature...</h2>
            <p>
              There's all sorts of new things that you can do with the great new features.
              Just click the buttons to check them out!
            </p>
            <div slot="actions">
              <v-btn class="mx-1" color="white" depressed>Action</v-btn>
              <v-btn class="mx-1" outlined color="white" @click="model3 = false">Lesser action</v-btn>
            </div>
          </v-feature-discovery>
        </v-layout>
      </core-section>

      <core-title>Colors</core-title>
      <core-section>
        <v-layout justify-space-around align-center>
          <v-layout column align-center>
            <v-btn @click="model41 = true">Show</v-btn>
            <v-feature-discovery
              v-model="model41"
              color="teal"
              highlight-color="blue"
              target="#t4v1"
              v-on="on"
            >
              <template v-slot:activator="{ on }">
                <v-sheet id="t4v1" class="ma-5" color="green" width="40" height="40" />
              </template>
              <h2 slot="title">Hey! New feature...</h2>
              <p>
                There's all sorts of new things that you can do with the great new features.
                Just click the buttons to check them out!
              </p>
              <div slot="actions">
                <v-btn class="mx-1" color="white" depressed>Action</v-btn>
                <v-btn class="mx-1" outlined color="white" @click="model41 = false">Lesser action</v-btn>
              </div>
            </v-feature-discovery>
          </v-layout>
          <v-layout column align-center>
            <v-btn @click="model42 = true">Show</v-btn>
            <v-feature-discovery
              v-model="model42"
              color="green"
              text-color="warning lighten-2"
              target="#t4v2"
              v-on="on"
            >
              <template v-slot:activator="{ on }">
                <v-sheet id="t4v2" class="ma-5" color="blue" width="80" height="80" />
              </template>
              <h2 slot="title">Hey! New feature...</h2>
              <p>
                There's all sorts of new things that you can do with the great new features.
                Just click the buttons to check them out!
              </p>
              <div slot="actions">
                <v-btn class="mx-1" color="white" depressed>Action</v-btn>
                <v-btn class="mx-1" outlined color="white" @click="model42 = false">Lesser action</v-btn>
              </div>
            </v-feature-discovery>
          </v-layout>
          <v-layout column align-center>
            <v-btn @click="model43 = true">Show</v-btn>
            <v-feature-discovery
              v-model="model43"
              color="warning lighten-2"
              highlight-color="error"
              text-color="error"
              target="#t4v3"
              v-on="on"
            >
              <template v-slot:activator="{ on }">
                <v-sheet id="t4v3" class="ma-5" color="blue lighten-1" width="120" height="50" />
              </template>
              <h2 slot="title">Hey! New feature...</h2>
              <p>
                There's all sorts of new things that you can do with the great new features.
                Just click the buttons to check them out!
              </p>
              <div slot="actions">
                <v-btn class="mx-1" color="white" depressed>Action</v-btn>
                <v-btn class="mx-1" outlined color="white" @click="model43 = false">Lesser action</v-btn>
              </div>
            </v-feature-discovery>
          </v-layout>
        </v-layout>
      </core-section>

      <core-title>Custom elevation</core-title>
      <core-section>
        <v-layout justify-space-around>
          <v-slider v-model="elevation5" label="Elevation" min="0" max="24" />
          <v-btn @click="model5 = true">Show</v-btn>
        </v-layout>

        <v-layout justify-center>
          <v-feature-discovery
            v-model="model5"
            color="primary"
            target="#t5"
            :elevation="elevation5"
            v-on="on"
          >
            <template v-slot:activator="{ on }">
              <v-sheet id="t5" class="ma-5" color="warning" width="40" height="40" />
            </template>
            <h2 slot="title">Hey! New feature...</h2>
            <p>
              There's all sorts of new things that you can do with the great new features.
              Just click the buttons to check them out!
            </p>
            <div slot="actions">
              <v-btn class="mx-1" color="white" depressed>Action</v-btn>
              <v-btn class="mx-1" outlined color="white" @click="model5 = false">Lesser action</v-btn>
            </div>
          </v-feature-discovery>
        </v-layout>
      </core-section>

      <core-title>Persistent</core-title>
      <core-section>
        <v-layout justify-start align-center>
          <v-switch v-model="persistent6" label="Persistent" />
          <v-btn class="ml-4" @click="model6 = true">Show</v-btn>
        </v-layout>

        <v-layout justify-center>
          <v-feature-discovery
            v-model="model6"
            color="primary"
            target="#t6"
            :persistent="persistent6"
            v-on="on"
          >
            <template v-slot:activator="{ on }">
              <v-sheet id="t6" class="ma-5" color="warning" width="40" height="40" />
            </template>
            <h2 slot="title">Hey! New feature...</h2>
            <p>
              There's all sorts of new things that you can do with the great new features.
              Just click the buttons to check them out!
            </p>
            <div slot="actions">
              <v-btn class="mx-1" color="white" depressed>Action</v-btn>
              <v-btn class="mx-1" outlined color="white" @click="model6 = false">Lesser action</v-btn>
            </div>
          </v-feature-discovery>
        </v-layout>
      </core-section>

      <core-title>Scoped slots</core-title>
      <core-section>
        <v-layout justify-start>
          <v-btn class="px-2" @click="model7 = true">Show</v-btn>
        </v-layout>

        <v-layout justify-center>
          <v-feature-discovery
            v-model="model7"
            color="primary"
            target="#t7"
            v-on="on"
          >
            <template v-slot:activator="{ on }">
              <v-sheet id="t7" class="ma-5" color="warning" width="40" height="40" />
            </template>
            <h2 slot="title">Hey! New feature...</h2>
            <p>
              There's all sorts of new things that you can do with the great new features.
              Just click the buttons to check them out!
            </p>
            <template #actions="{ close }">
              <v-btn class="mx-1" color="white" depressed>Action</v-btn>
              <v-btn class="mx-1" outlined color="white" @click="close">Lesser action</v-btn>
            </template>
          </v-feature-discovery>
        </v-layout>
      </core-section>

      <core-title>Disabling ripple</core-title>
      <core-section>
        <v-layout justify-start align-center>
          <v-switch v-model="noRipple8" label="Disable ripple" />
          <v-btn class="ml-4" @click="model8 = true">Show</v-btn>
        </v-layout>

        <v-layout justify-center>
          <v-feature-discovery
            v-model="model8"
            color="primary"
            target="#t8"
            :no-ripple="noRipple8"
            v-on="on"
          >
            <template v-slot:activator="{ on }">
              <v-sheet id="t8" class="ma-5" color="warning" width="40" height="40" />
            </template>
            <h2 slot="title">Hey! New feature...</h2>
            <p>
              There's all sorts of new things that you can do with the great new features.
              Just click the buttons to check them out!
            </p>
            <template #actions="{ close }">
              <v-btn class="mx-1" color="white" depressed>Action</v-btn>
              <v-btn class="mx-1" outlined color="white" @click="close">Lesser action</v-btn>
            </template>
          </v-feature-discovery>
        </v-layout>
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
      targets1: ['#t1v1', '#t1v2', '#t1v3', '.v-btn', 'a.v-btn', '#fab1', '#fab2'],
      size1: 700,
      model2: false,
      flat2: true,
      model3: false,
      size3: 700,
      model41: false,
      model42: false,
      model43: false,
      model5: false,
      elevation5: 4,
      persistent6: false,
      model6: false,
      model7: false,
      noRipple8: false,
      model8: false
    })
  }
</script>
