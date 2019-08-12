<template>
  <v-container>
    <v-layout column>
      <main-header>Feature discovery</main-header>

      <core-title>Basic</core-title>
      <core-section>
        <v-layout justify-space-around align-center>
          <v-feature-discovery
            v-model="model1"
            color="primary"
          >
            <template v-slot:activator="{ on }">
              <v-sheet class="ma-5" color="warning" width="80" height="80" v-on="on" />
            </template>
            <div>
              <h2>Hey! New feature...</h2>
              <p>
                There's all sorts of new things that you can do with the great new features.
                Just click the buttons to check them out!
              </p>
              <div>
                <v-btn class="mx-1" color="white" depressed>Action</v-btn>
                <v-btn class="mx-1" outlined color="white" @click="model1 = false">Lesser action</v-btn>
              </div>
            </div>
          </v-feature-discovery>
        </v-layout>
      </core-section>

      <core-title>Flat</core-title>
      <core-section>
        <v-layout justify-space-around>
          <v-switch v-model="flat2" label="Flat" />
        </v-layout>

        <v-layout justify-center>
          <v-feature-discovery
            v-model="model2"
            color="primary"
            :flat="flat2"
          >
            <template v-slot:activator="{ on }">
              <v-sheet class="ma-5" color="warning" width="40" height="40" v-on="on" />
            </template>
            <div>
              <h2>Hey! New feature...</h2>
              <p>
                There's all sorts of new things that you can do with the great new features.
                Just click the buttons to check them out!
              </p>
              <div>
                <v-btn class="mx-1" color="white" depressed>Action</v-btn>
                <v-btn class="mx-1" outlined color="white" @click="model2 = false">Lesser action</v-btn>
              </div>
            </div>
          </v-feature-discovery>
        </v-layout>
      </core-section>

      <core-title>Colors</core-title>
      <core-section>
        <v-layout justify-space-around align-center>
          <v-layout column align-center>
            <v-feature-discovery
              v-model="model41"
              color="teal"
              highlight-color="blue"
            >
              <template v-slot:activator="{ on }">
                <v-sheet class="ma-5" color="green" width="40" height="40" v-on="on" />
              </template>
              <div>
                <h2>Hey! New feature...</h2>
                <p>
                  There's all sorts of new things that you can do with the great new features.
                  Just click the buttons to check them out!
                </p>
                <div>
                  <v-btn class="mx-1" color="white" depressed>Action</v-btn>
                  <v-btn class="mx-1" outlined color="white" @click="model41 = false">Lesser action</v-btn>
                </div>
              </div>
            </v-feature-discovery>
          </v-layout>
          <v-layout column align-center>
            <v-feature-discovery
              v-model="model42"
              color="green"
              text-color="warning lighten-2"
            >
              <template v-slot:activator="{ on }">
                <v-sheet class="ma-5" color="blue" width="80" height="80" v-on="on" />
              </template>
              <div>
                <h2>Hey! New feature...</h2>
                <p>
                  There's all sorts of new things that you can do with the great new features.
                  Just click the buttons to check them out!
                </p>
                <div>
                  <v-btn class="mx-1" color="white" depressed>Action</v-btn>
                  <v-btn class="mx-1" outlined color="white" @click="model42 = false">Lesser action</v-btn>
                </div>
              </div>
            </v-feature-discovery>
          </v-layout>
          <v-layout column align-center>
            <v-feature-discovery
              v-model="model43"
              color="warning lighten-2"
              highlight-color="error"
              text-color="error"
            >
              <template v-slot:activator="{ on }">
                <v-sheet class="ma-5" color="blue lighten-1" width="120" height="50" v-on="on" />
              </template>
              <div>
                <h2>Hey! New feature...</h2>
                <p>
                  There's all sorts of new things that you can do with the great new features.
                  Just click the buttons to check them out!
                </p>
                <div>
                  <v-btn class="mx-1" color="white" depressed>Action</v-btn>
                  <v-btn class="mx-1" outlined color="white" @click="model43 = false">Lesser action</v-btn>
                </div>
              </div>
            </v-feature-discovery>
          </v-layout>
        </v-layout>
      </core-section>

      <core-title>Custom elevation</core-title>
      <core-section>
        <v-layout justify-space-around>
          <v-slider v-model="elevation5" label="Elevation" min="0" max="24" />
        </v-layout>

        <v-layout justify-center>
          <v-feature-discovery
            v-model="model5"
            color="primary"
            :elevation="elevation5"
          >
            <template v-slot:activator="{ on }">
              <v-sheet class="ma-5" color="warning" width="40" height="40" v-on="on" />
            </template>
            <div>
              <h2>Hey! New feature...</h2>
              <p>
                There's all sorts of new things that you can do with the great new features.
                Just click the buttons to check them out!
              </p>
              <div>
                <v-btn class="mx-1" color="white" depressed>Action</v-btn>
                <v-btn class="mx-1" outlined color="white" @click="model5 = false">Lesser action</v-btn>
              </div>
            </div>
          </v-feature-discovery>
        </v-layout>
      </core-section>

      <core-title>Persistent</core-title>
      <core-section>
        <v-layout justify-start>
          <v-switch v-model="persistent6" label="Persistent" />
        </v-layout>

        <v-layout justify-center>
          <v-feature-discovery
            v-model="model6"
            color="primary"
            :persistent="persistent6"
          >
            <template v-slot:activator="{ on }">
              <v-sheet class="ma-5" color="warning" width="40" height="40" v-on="on" />
            </template>
            <div>
              <h2>Hey! New feature...</h2>
              <p>
                There's all sorts of new things that you can do with the great new features.
                Just click the buttons to check them out!
              </p>
              <div>
                <v-btn class="mx-1" color="white" depressed>Action</v-btn>
                <v-btn class="mx-1" outlined color="white" @click="model6 = false">Lesser action</v-btn>
              </div>
            </div>
          </v-feature-discovery>
        </v-layout>
      </core-section>

      <core-title>Disabling ripple</core-title>
      <core-section>
        <v-layout justify-space-around>
          <v-switch v-model="noRipple8" label="Disable ripple" />
        </v-layout>

        <v-layout justify-center>
          <v-feature-discovery
            v-model="model8"
            color="primary"
            :no-ripple="noRipple8"
          >
            <template v-slot:activator="{ on }">
              <v-sheet class="ma-5" color="warning" width="40" height="40" v-on="on" />
            </template>
            <div>
              <h2>Hey! New feature...</h2>
              <p>
                There's all sorts of new things that you can do with the great new features.
                Just click the buttons to check them out!
              </p>
              <template>
                <v-btn class="mx-1" color="white" depressed>Action</v-btn>
                <v-btn class="mx-1" outlined color="white" @click="model8 = false">Lesser action</v-btn>
              </template>
            </div>
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
      model8: false,
    }),
  }
</script>
