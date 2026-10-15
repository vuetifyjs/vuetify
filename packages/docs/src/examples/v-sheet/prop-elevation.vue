<template>
  <v-container>
    <v-row class="justify-space-around">
      <v-col
        v-for="elevation in [0, 1, 2, 3, 4, 5]"
        :key="elevation"
        cols="12"
        md="4"
      >
        <v-sheet
          class="pa-12"
          color="grey-lighten-3"
        >
          <v-sheet
            :elevation="elevation"
            class="mx-auto"
            height="100"
            width="100"
          ></v-sheet>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=1875-78581"
  }
</example-meta>
