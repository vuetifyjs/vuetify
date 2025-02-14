<template>
  <div class="text-center d-flex align-center justify-space-around">
    <v-tooltip color="primary" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
        >
          primary
        </v-btn>
      </template>
      <span>Primary tooltip</span>
    </v-tooltip>

    <v-tooltip color="success" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn
          color="success"
          v-bind="props"
        >
          success
        </v-btn>
      </template>
      <span>Success tooltip</span>
    </v-tooltip>

    <v-tooltip color="warning" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn
          color="warning"
          v-bind="props"
        >
          warning
        </v-btn>
      </template>
      <span>Warning tooltip</span>
    </v-tooltip>

    <v-tooltip color="error" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn
          color="error"
          v-bind="props"
        >
          error
        </v-btn>
      </template>
      <span>Error tooltip</span>
    </v-tooltip>
  </div>
</template>
