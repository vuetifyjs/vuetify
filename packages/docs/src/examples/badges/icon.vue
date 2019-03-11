<template>
  <div class="text-xs-center">
    <v-badge left color="purple">
      <template v-slot:badge>
        <v-icon dark small>mdi-adjust</v-icon>
      </template>
      <span>
        MDI icon
      </span>
    </v-badge>

    &nbsp;&nbsp;

    <v-badge color="orange">
      <template v-slot:badge>
        <v-icon dark small>fas fa-fighter-jet</v-icon>
      </template>
      <span>
        Font Awesome icon
      </span>
    </v-badge>
  </div>
</template>

<codepen-resources lang="json">
  {
  "js": ["https://use.fontawesome.com/releases/v5.0.6/js/all.js"],
    "css": ["https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css"]
  }
</codepen-resources>
