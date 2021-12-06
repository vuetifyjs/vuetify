<template>
  <div class="text-center d-flex align-center justify-space-around">
    <v-tooltip bottom color="primary">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          primary
        </v-btn>
      </template>
      <span>Primary tooltip</span>
    </v-tooltip>

    <v-tooltip bottom color="success">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="success"
          dark
          v-bind="attrs"
          v-on="on"
        >
          success
        </v-btn>
      </template>
      <span>Success tooltip</span>
    </v-tooltip>

    <v-tooltip bottom color="warning">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="warning"
          dark
          v-bind="attrs"
          v-on="on"
        >
          warning
        </v-btn>
      </template>
      <span>Warning tooltip</span>
    </v-tooltip>

    <v-tooltip bottom color="error">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="error"
          dark
          v-bind="attrs"
          v-on="on"
        >
          error
        </v-btn>
      </template>
      <span>Error tooltip</span>
    </v-tooltip>
  </div>
</template>
