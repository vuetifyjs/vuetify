<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" sm="4">
        <h5 class="my-0">Default</h5>

        <v-number-input
          control-variant="default"
          reverse
        ></v-number-input>
      </v-col>

      <v-col cols="12" md="4" sm="4">
        <h5 class="my-0">Stacked</h5>

        <v-number-input
          control-variant="stacked"
          reverse
        ></v-number-input>
      </v-col>

      <v-col cols="12" md="4" sm="4">
        <h5 class="my-0">Split</h5>

        <v-number-input
          control-variant="split"
        ></v-number-input>
      </v-col>
    </v-row>
  </v-container>
</template>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2723-39727&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>
