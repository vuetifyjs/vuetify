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
