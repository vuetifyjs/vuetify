<template>
  <v-card>
    <v-tabs
      bg-color="teal-darken-3"
      slider-color="teal-lighten-3"
      show-arrows
    >
      <v-tab
        v-for="i in 30"
        :key="i"
        :text="'Item ' + i"
        :value="'tab-' + i"
      ></v-tab>
    </v-tabs>
  </v-card>
</template>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14074-135939"
  }
</example-meta>
