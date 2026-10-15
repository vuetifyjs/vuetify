<template>
  <v-text-field>
    <template v-slot:append>
      <v-icon color="red">
        mdi-plus
      </v-icon>
    </template>
    <template v-slot:prepend>
      <v-icon color="green">
        mdi-minus
      </v-icon>
    </template>
  </v-text-field>
</template>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14177-39904"
  }
</example-meta>
