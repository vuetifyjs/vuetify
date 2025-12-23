<template>
  <v-window show-arrows>
    <template v-slot:prev="{ props }">
      <v-btn
        color="success"
        @click="props.onClick"
      >
        Previous slide
      </v-btn>
    </template>
    <template v-slot:next="{ props }">
      <v-btn
        color="info"
        @click="props.onClick"
      >
        Next slide
      </v-btn>
    </template>
    <v-window-item
      v-for="n in 3"
      :key="`card-${n}`"
    >
      <v-card
        class="d-flex align-center justify-center ma-2"
        elevation="1"
        height="200"
      >
        <h1
          class="text-h2"
        >
          Slide {{ n }}
        </h1>
      </v-card>
    </v-window-item>
  </v-window>
</template>
<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2800-83891&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>
