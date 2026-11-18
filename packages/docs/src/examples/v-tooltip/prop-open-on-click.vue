<template>
  <div class="text-center">
    <v-tooltip :open-on-hover="false" open-on-click>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props">Click me</v-btn>
      </template>
      <span>Open on click tooltip</span>
    </v-tooltip>
  </div>
</template>

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=13993-69433"
}
</example-meta>
