<template>
  <v-sheet elevation="2">
    <v-tabs
      bg-color="indigo"
      next-icon="mdi-arrow-right-bold-box-outline"
      prev-icon="mdi-arrow-left-bold-box-outline"
      show-arrows
    >
      <v-tab
        v-for="i in 30"
        :key="i"
        :text="`Item ${i}`"
      ></v-tab>
    </v-tabs>
  </v-sheet>
</template>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14074-135747"
  }
</example-meta>
