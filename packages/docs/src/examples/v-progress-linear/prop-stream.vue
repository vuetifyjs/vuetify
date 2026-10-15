<template>
  <div>
    <v-progress-linear
      buffer-value="0"
      color="red-lighten-2"
      stream
    ></v-progress-linear>
    <br>
    <v-progress-linear
      buffer-value="0"
      color="teal"
      model-value="20"
      stream
    ></v-progress-linear>
    <br>
    <v-progress-linear
      buffer-value="50"
      color="cyan"
      stream
    ></v-progress-linear>
    <br>
    <v-progress-linear
      buffer-value="60"
      color="orange"
      model-value="40"
      stream
    ></v-progress-linear>
  </div>
</template>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14461-95745"
  }
</example-meta>
