<template>
  <div class="text-center d-flex align-center justify-space-around">
    <v-tooltip color="#cc0" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn color="#cc0" v-bind="props" text="Custom Hex"></v-btn>
      </template>
      <span>Custom Hex</span>
    </v-tooltip>

    <v-btn color="success" text="success (from theme)">
      success
      <v-tooltip activator="parent" color="success" location="bottom">
        <span>Success (from theme)</span>
      </v-tooltip>
    </v-btn>

    <v-btn color="warning">
      warning (variable + opacity)
      <v-tooltip activator="parent" color="rgba(var(--v-theme-warning), .5)" location="bottom">
        <span>Warning (variable + opacity)</span>
      </v-tooltip>
    </v-btn>

    <v-btn
      color="error"
      text="Error (directive)"
      v-tooltip:bottom="{ text: 'Error (directive)', color: 'error' }"
    ></v-btn>
  </div>
</template>
