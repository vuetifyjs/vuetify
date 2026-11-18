<template>
  <div class="d-flex justify-space-around align-center">
    <div class="ma-4">
      <div class="text-title-small">Default</div>
      <v-img
        :aspect-ratio="1"
        class="bg-surface elevation-3"
        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        width="300"
      ></v-img>
    </div>

    <div class="ma-4">
      <div class="text-title-small">Cover</div>
      <v-img
        :aspect-ratio="1"
        class="bg-surface elevation-3"
        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        width="300"
        cover
      ></v-img>
    </div>
  </div>
</template>

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14747-284433"
}
</example-meta>
