<template>
  <div class="d-flex justify-center">
    <v-tooltip interactive>
      <template v-slot:activator="{ props: activatorProps }">
        <v-icon-btn icon="mdi-information-outline" v-bind="activatorProps"></v-icon-btn>
      </template>
      <div>
        <a class="text-primary font-weight-medium" href="/blog/announcing-vuetify-3.8/#vtooltip-interactive">
          Learn more
        </a>
        about interactive tooltip.
      </div>
    </v-tooltip>
  </div>
</template>
<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=1902-32416&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>