<template>
  <v-stepper model-value="3">
    <v-stepper-header>
      <v-stepper-item
        title="Job Search"
        value="1"
        complete
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
        :rules="[() => false]"
        subtitle="Missing Details"
        title="Submit Application"
        value="2"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
        title="Interview Process"
        value="3"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
        title="Hiring Decision"
        value="4"
      ></v-stepper-item>
    </v-stepper-header>
  </v-stepper>
</template>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2747-64572&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>
