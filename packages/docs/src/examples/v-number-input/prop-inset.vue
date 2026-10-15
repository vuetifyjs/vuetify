<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <h5 class="my-0">Default</h5>

        <v-number-input
          control-variant="default"
          inset
        ></v-number-input>
      </v-col>

      <v-col cols="12" sm="6">
        <h5 class="my-0">Stacked</h5>

        <v-number-input
          control-variant="stacked"
          inset
        ></v-number-input>
      </v-col>

      <v-col cols="12" sm="6">
        <h5 class="my-0">Split</h5>

        <v-number-input
          control-variant="split"
          inset
        ></v-number-input>
      </v-col>

      <v-col cols="12" sm="6">
        <h5 class="my-0">Hide-input</h5>

        <v-number-input
          hide-input
          inset
        ></v-number-input>
      </v-col>
    </v-row>
  </v-container>
</template>

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14181-42652"
}
</example-meta>
