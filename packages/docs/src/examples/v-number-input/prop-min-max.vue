<template>
  <v-container>
    <v-row>
      <v-col>
        <h5 class="my-0">min:10/max:20</h5>

        <v-number-input
          :max="20"
          :min="10"
          :model-value="15"
        ></v-number-input>
      </v-col>
    </v-row>
  </v-container>
</template>

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14181-42700"
}
</example-meta>
