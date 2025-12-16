<template>
  <v-stepper>
    <v-stepper-header>
      <v-stepper-item
        title="Select campaign settings"
        value="1"
        complete
        editable
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
        title="Create an ad group"
        value="2"
        complete
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
        title="Create an ad"
        value="3"
        editable
      ></v-stepper-item>
    </v-stepper-header>
  </v-stepper>
</template>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2747-64290&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>