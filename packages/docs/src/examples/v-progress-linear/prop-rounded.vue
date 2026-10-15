<template>
  <v-container class="d-flex flex-column ga-3">
    <v-progress-linear
      color="red-darken-2"
      height="20"
      model-value="40"
      rounded
    ></v-progress-linear>

    <v-progress-linear
      color="orange-darken-2"
      height="20"
      model-value="40"
      rounded-bar
    ></v-progress-linear>

    <v-progress-linear
      color="lime-darken-1"
      height="20"
      model-value="40"
      rounded="lg"
      rounded-bar
    ></v-progress-linear>
  </v-container>
</template>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14461-95644"
  }
</example-meta>
